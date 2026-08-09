"use client";

import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface RadixTabsProps {
  tabs: TabItem[];
  defaultActiveId?: string;
  ariaLabel?: string;
}

export function RadixTabs({ tabs, defaultActiveId, ariaLabel }: RadixTabsProps) {
  const initialTabId = defaultActiveId || tabs[0]?.id;

  return (
    <Tabs.Root defaultValue={initialTabId} className="w-full space-y-4">
      <Tabs.List
        aria-label={ariaLabel || "Radix Navigation Tabs"}
        className="flex space-x-1 p-1.5 rounded-xl bg-slate-900/80 border border-white/10 overflow-x-auto"
      >
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            disabled={tab.disabled}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:font-semibold data-[disabled]:text-slate-600 data-[disabled]:cursor-not-allowed text-slate-400 hover:text-slate-200 hover:bg-white/5"
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Content
          key={tab.id}
          value={tab.id}
          className="p-5 rounded-2xl glass-panel border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 animate-fade-in"
        >
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
