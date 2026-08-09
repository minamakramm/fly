"use client";

import React, { useState, useRef } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface CustomTabsProps {
  tabs: TabItem[];
  defaultActiveId?: string;
  ariaLabel?: string;
}

export function CustomTabs({ tabs, defaultActiveId, ariaLabel }: CustomTabsProps) {
  const enabledTabs = tabs.filter((t) => !t.disabled);
  const initialTabId = defaultActiveId || (enabledTabs.length > 0 ? enabledTabs[0].id : tabs[0]?.id);

  const [activeTabId, setActiveTabId] = useState<string>(initialTabId);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const enabledIndices = tabs
      .map((tab, idx) => (!tab.disabled ? idx : -1))
      .filter((idx) => idx !== -1);

    if (enabledIndices.length === 0) return;

    const currentPos = enabledIndices.indexOf(currentIndex);
    let targetIndex = -1;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        targetIndex = enabledIndices[(currentPos + 1) % enabledIndices.length];
        break;
      case "ArrowLeft":
        e.preventDefault();
        targetIndex = enabledIndices[(currentPos - 1 + enabledIndices.length) % enabledIndices.length];
        break;
      case "Home":
        e.preventDefault();
        targetIndex = enabledIndices[0];
        break;
      case "End":
        e.preventDefault();
        targetIndex = enabledIndices[enabledIndices.length - 1];
        break;
      default:
        return;
    }

    if (targetIndex !== -1) {
      const nextTab = tabs[targetIndex];
      setActiveTabId(nextTab.id);
      const targetBtn = tabRefs.current.get(nextTab.id);
      if (targetBtn) {
        targetBtn.focus();
      }
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Tablist Header */}
      <div
        role="tablist"
        aria-label={ariaLabel || "Component navigation tabs"}
        className="flex space-x-1 p-1.5 rounded-xl bg-slate-900/80 border border-white/10 overflow-x-auto"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTabId === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
                else tabRefs.current.delete(tab.id);
              }}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && setActiveTabId(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold"
                  : tab.disabled
                  ? "text-slate-600 cursor-not-allowed"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        return (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            tabIndex={0}
            hidden={!isActive}
            className={`p-5 rounded-2xl glass-panel border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
              isActive ? "block animate-fade-in" : "hidden"
            }`}
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
}
