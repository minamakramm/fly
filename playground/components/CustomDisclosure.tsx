"use client";

import React, { useState, useId } from "react";
import { ChevronDown } from "lucide-react";

export interface CustomDisclosureProps {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

export function CustomDisclosure({
  title,
  defaultExpanded = false,
  children,
}: CustomDisclosureProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const buttonId = useId();
  const panelId = useId();

  return (
    <div className="w-full rounded-2xl glass-panel border border-white/10 overflow-hidden transition-all">
      {/* Disclosure Trigger Button */}
      <button
        id={buttonId}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between text-left text-sm font-semibold text-slate-100 hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
            isExpanded ? "rotate-180 text-blue-400" : ""
          }`}
        />
      </button>

      {/* Content Panel */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isExpanded}
        className={`px-5 py-4 border-t border-white/10 text-sm text-slate-300 leading-relaxed ${
          isExpanded ? "block animate-fade-in" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
