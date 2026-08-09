/**
 * AI Model Configuration & System Persona Module
 * Centralizes model parameters, system prompts, and message data structures.
 */

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

export const AI_CONFIG = {
  // Model Parameters
  model: "claude-3-5-sonnet-20240620",
  fallbackModel: "gpt-4o-mini",
  temperature: 0.7,
  maxTokens: 2048,

  // Capstone System Prompt Persona
  systemPrompt: `You are Fly AI Assistant, an expert senior frontend engineer and architecture consultant for the Frontend AI Engineering track capstone project.
Your goal is to provide concise, clear, and highly accurate guidance on React Server Components, Next.js App Router, Tailwind CSS design tokens, W3C ARIA accessibility patterns, and high-performance web development.
Be encouraging, format code cleanly with Markdown syntax, and keep answers focused and actionable.`,

  // Initial Welcome Messages
  welcomeMessage: {
    id: "welcome-1",
    role: "assistant" as const,
    content: `Hello! I am your **Fly AI Assistant**. I can help you test streaming AI interactions, debug Next.js App Router components, analyze W3C ARIA accessibility patterns, or review your capstone frontend code.

Try asking me:
- *"Explain the difference between Server Components and Client Components"*
- *"How does the focus trap work in a W3C modal dialog?"*
- *"Give me a code snippet for an auto-scrolling streaming chat in React"*`,
    timestamp: new Date().toISOString(),
  },
};
