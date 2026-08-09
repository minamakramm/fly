"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AI_CONFIG, ChatMessage } from "@/lib/ai-config";
import {
  Send,
  Square,
  Sparkles,
  User,
  Zap,
  ArrowDown,
  Trash2,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";

export function StreamingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [status, setStatus] = useState<"idle" | "thinking" | "streaming">("idle");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 1. Load Conversation from LocalStorage on Mount
  useEffect(() => {
    const saved = localStorage.getItem("fly_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      } catch (e) {
        // Ignore parse error
      }
    }
    // Default initial message
    setMessages([AI_CONFIG.welcomeMessage]);
  }, []);

  // 2. Persist Conversation to LocalStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("fly_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // 3. Auto-Scroll Logic & Pinning Engine
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      });
    }
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;
      // Pin to bottom if user is within 60px of the bottom
      setIsAtBottom(distanceToBottom < 60);
    }
  };

  // Scroll to bottom when new streaming chunks arrive (only if pinned to bottom)
  useEffect(() => {
    if (isAtBottom && (status === "streaming" || status === "thinking")) {
      scrollToBottom("auto");
    }
  }, [messages, status, isAtBottom, scrollToBottom]);

  // 4. Send Message & Handle Token Stream
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const promptText = inputPrompt.trim();
    if (!promptText || status !== "idle") return;

    // Create user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: promptText,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputPrompt("");
    setStatus("thinking");

    // Re-pin scroll to bottom when sending a message
    setIsAtBottom(true);
    setTimeout(() => scrollToBottom("smooth"), 50);

    // Create AbortController for cancel / stop capability
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    // Placeholder assistant message ID
    const assistantMsgId = `assistant-${Date.now()}`;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
        signal: abortController.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("Streaming endpoint returned error");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let accumulatedContent = "";
      let isFirstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        accumulatedContent += chunkText;

        // Smooth Thinking-to-Streaming handoff on first token chunk
        if (isFirstChunk) {
          isFirstChunk = false;
          setStatus("streaming");

          // Initialize assistant message entry
          setMessages((prev) => [
            ...prev,
            {
              id: assistantMsgId,
              role: "assistant",
              content: accumulatedContent,
              timestamp: new Date().toISOString(),
              isStreaming: true,
            },
          ]);
        } else {
          // Update existing streaming message
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? { ...msg, content: accumulatedContent }
                : msg
            )
          );
        }
      }

      // Stream completed normally
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId ? { ...msg, isStreaming: false } : msg
        )
      );
    } catch (err: any) {
      if (err.name === "AbortError") {
        // Stream aborted by user via Stop button: preserve partial message
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId ? { ...msg, isStreaming: false } : msg
          )
        );
      }
    } finally {
      setStatus("idle");
      abortControllerRef.current = null;
    }
  };

  // 5. Working Stop Button Handler (State machine termination)
  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setStatus("idle");
    }
  };

  // 6. Clear Conversation History
  const handleClearHistory = () => {
    localStorage.removeItem("fly_chat_history");
    setMessages([AI_CONFIG.welcomeMessage]);
    setStatus("idle");
  };

  // 7. Copy Message Content
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] md:h-[calc(100vh-5rem)] max-w-5xl mx-auto rounded-2xl glass-panel border border-white/10 overflow-hidden relative">
      {/* Top Chat Bar */}
      <div className="px-5 py-3.5 bg-surface-900/90 border-b border-white/10 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight">Streaming AI Assistant</h2>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-mono">
                {AI_CONFIG.model}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Token-by-token SSE Stream & AbortController</p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          title="Clear Conversation"
          className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors focus:outline-none"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 relative scroll-smooth"
      >
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 max-w-3xl animate-fade-in ${
                isUser ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  isUser
                    ? "bg-blue-600 text-white"
                    : "bg-gradient-to-tr from-indigo-600 to-purple-600 text-white"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1 max-w-[85%] sm:max-w-[80%]">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/20"
                      : "glass-panel bg-slate-900/90 text-slate-200 border border-white/10 rounded-tl-none"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                  {/* Streaming Pulse Indicator */}
                  {msg.isStreaming && (
                    <span className="inline-block w-2 h-4 ml-1 bg-blue-400 animate-pulse align-middle" />
                  )}
                </div>

                {/* Message Controls Footer */}
                <div
                  className={`flex items-center gap-2 text-[10px] text-slate-500 px-1 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="hover:text-slate-300 transition-colors flex items-center gap-1"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Thinking Indicator (Handoff before first token) */}
        {status === "thinking" && (
          <div className="flex gap-3 max-w-3xl mr-auto animate-fade-in">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl glass-panel bg-slate-900/90 text-slate-300 border border-white/10 rounded-tl-none flex items-center space-x-3">
              <div className="flex space-x-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
              </div>
              <span className="text-xs text-slate-400 font-medium">Thinking & preparing stream...</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating "Jump to Latest" Button (Appears when user scrolls up) */}
      {!isAtBottom && (
        <button
          onClick={() => {
            setIsAtBottom(true);
            scrollToBottom("smooth");
          }}
          className="absolute bottom-20 right-6 z-20 px-3.5 py-2 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-medium backdrop-blur-md shadow-xl border border-blue-400/30 flex items-center gap-2 transition-all animate-fade-in"
        >
          <ArrowDown className="w-3.5 h-3.5" /> Jump to latest
        </button>
      )}

      {/* Bottom Fixed Input Form */}
      <div className="p-3 sm:p-4 bg-surface-900/95 border-t border-white/10 shrink-0 z-10">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={status !== "idle"}
            placeholder={
              status === "idle"
                ? "Ask Fly AI Assistant anything about your capstone..."
                : "AI is streaming response..."
            }
            className="flex-1 px-4 py-3 rounded-xl bg-slate-950/90 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60 transition-all"
          />

          {/* Morphing Send / Stop Button */}
          {status !== "idle" ? (
            <button
              type="button"
              onClick={handleStopStream}
              className="px-4 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs sm:text-sm transition-all shadow-lg shadow-rose-600/30 flex items-center gap-2 shrink-0"
              title="Stop Generation (AbortController)"
            >
              <Square className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">Stop</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!inputPrompt.trim()}
              className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          )}
        </form>

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-emerald-400" /> SSE Token Stream Active
          </span>
          <span>Press Enter to send</span>
        </div>
      </div>
    </div>
  );
}
