"use client";

import React, { useState } from "react";
import { CustomModal } from "../../../playground/components/CustomModal";
import { CustomTabs, TabItem } from "../../../playground/components/CustomTabs";
import { CustomDisclosure } from "../../../playground/components/CustomDisclosure";
import { RadixModal } from "../../../playground/components/RadixModal";
import { RadixTabs } from "../../../playground/components/RadixTabs";
import { Code, Eye, Keyboard, ShieldCheck, Layers, FileText } from "lucide-react";
import Link from "next/link";

export default function PlaygroundPage() {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isRadixModalOpen, setIsRadixModalOpen] = useState(false);

  const sampleTabs: TabItem[] = [
    {
      id: "overview",
      label: "1. ARIA Overview",
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-300">
          <h4 className="font-semibold text-white">W3C ARIA Tablist Pattern</h4>
          <p>
            This tabpanel is linked to the tab trigger via <code className="text-blue-400 font-mono">aria-controls</code> and <code className="text-blue-400 font-mono">aria-labelledby</code> attributes.
          </p>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5 font-mono text-[11px] text-emerald-400">
            Keyboard Nav: ArrowRight / ArrowLeft to switch tabs, Home / End to jump, Tab to enter panel.
          </div>
        </div>
      ),
    },
    {
      id: "keyboard",
      label: "2. Keyboard Testing",
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-300">
          <h4 className="font-semibold text-white">Focus Management & Roving Index</h4>
          <p>
            Only the active tab has <code className="text-blue-400 font-mono">tabIndex="0"</code>. Inactive tabs use <code className="text-blue-400 font-mono">tabIndex="-1"</code> so tabbing passes over them into the panel.
          </p>
          <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium">
            Sample Focusable Inside Panel
          </button>
        </div>
      ),
    },
    {
      id: "accessibility",
      label: "3. Screen Readers",
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-300">
          <h4 className="font-semibold text-white">Semantic Tree Announcement</h4>
          <p>
            Screen readers announce "Tab 3 of 3, selected" and indicate panel relationship automatically.
          </p>
        </div>
      ),
    },
    {
      id: "disabled-sample",
      label: "4. Disabled Tab",
      content: <p>Disabled Content</p>,
      disabled: true,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-3">
            <Keyboard className="w-3.5 h-3.5" /> Component Foundations Phase
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Accessible Component Playground
          </h1>
          <p className="mt-2 text-slate-400 text-sm max-w-2xl leading-relaxed">
            Hand-written React + TypeScript implementations of W3C ARIA patterns (Modal Dialog with focus trap, Arrow-navigated Tabs, and Disclosure), side-by-side with Radix/shadcn primitives.
          </p>
        </div>

        <Link
          href="/playground#notes"
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-medium transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 shrink-0"
        >
          <FileText className="w-4 h-4" /> View NOTES.md
        </Link>
      </div>

      {/* Grid of Interactive Custom Components */}
      <div className="space-y-8">
        {/* Section 1: Modal Dialog */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" /> 1. Modal Dialog Pattern
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                W3C ARIA Dialog with focus trap, focus restoration on close, Escape key handler, and backdrop dismiss.
              </p>
            </div>
            <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full font-mono">
              Keyboard Tested
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/30"
            >
              Open Hand-Written Modal
            </button>

            <button
              onClick={() => setIsRadixModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all shadow-lg shadow-purple-600/30"
            >
              Open Radix / shadcn Modal
            </button>
          </div>

          {/* Hand-written Modal Instance */}
          <CustomModal
            isOpen={isCustomModalOpen}
            onClose={() => setIsCustomModalOpen(false)}
            title="Custom Modal (Focus Trap Active)"
            description="Press Tab repeatedly to verify focus is trapped inside. Press Escape or click close to restore focus."
          >
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                Try tabbing between these focusable controls. Focus will cycle wrap from last control to first control.
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sample Focusable Input 1
                  </label>
                  <input
                    type="text"
                    placeholder="Type inside modal..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sample Select 2
                  </label>
                  <select className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Option Alpha</option>
                    <option>Option Beta</option>
                  </select>
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
                >
                  Confirm Action
                </button>
              </div>
            </div>
          </CustomModal>

          {/* Radix Modal Instance */}
          <RadixModal
            isOpen={isRadixModalOpen}
            onClose={() => setIsRadixModalOpen(false)}
            title="Radix UI / shadcn Modal Dialog"
            description="Mounted via React Portal with body scroll locking and focus scope guards."
          >
            <div className="space-y-4 text-sm text-slate-300">
              <p className="text-xs text-purple-300">
                Notice how body scrolling is locked and content is teleported to document.body root.
              </p>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRadixModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium"
                >
                  Close Radix Modal
                </button>
              </div>
            </div>
          </RadixModal>
        </div>

        {/* Section 2: Tabs */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" /> 2. Tabs Pattern
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                W3C ARIA Tablist pattern. Focus a tab header and use ArrowRight, ArrowLeft, Home, and End keys.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
                <Code className="w-4 h-4" /> Hand-Written Custom Tabs
              </h3>
              <CustomTabs tabs={sampleTabs} ariaLabel="Hand written ARIA demonstration" />
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-purple-400 flex items-center gap-2">
                <Eye className="w-4 h-4" /> Radix UI / shadcn Tabs Primitive
              </h3>
              <RadixTabs tabs={sampleTabs} ariaLabel="Radix ARIA demonstration" />
            </div>
          </div>
        </div>

        {/* Section 3: Disclosure / Accordion */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-emerald-400" /> 3. Disclosure Pattern
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Accessible collapsible trigger button with aria-expanded state and Enter/Space toggle.
              </p>
            </div>
          </div>

          <div className="space-y-3 max-w-2xl">
            <CustomDisclosure title="What keyboard controls are supported for Disclosure?" defaultExpanded={true}>
              Disclosure triggers are <code className="text-emerald-400 font-mono">&lt;button&gt;</code> elements with <code className="text-emerald-400 font-mono">aria-expanded</code> attributes. Users can press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-white text-[10px] font-mono border border-white/10">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-white text-[10px] font-mono border border-white/10">Space</kbd> to toggle open and closed states.
            </CustomDisclosure>

            <CustomDisclosure title="How does the screen reader announce disclosure state changes?">
              When toggled, the accessibility tree updates <code className="text-emerald-400 font-mono">aria-expanded="true"</code> or <code className="text-emerald-400 font-mono">aria-expanded="false"</code>. Screen readers immediately announce "Expanded" or "Collapsed".
            </CustomDisclosure>
          </div>
        </div>

        {/* NOTES.md Embed Section */}
        <div id="notes" className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" /> NOTES.md: Concrete Implementation Gaps
          </h2>

          <div className="p-4 sm:p-6 rounded-xl bg-slate-950/80 border border-white/10 text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed font-mono">
            <div>
              <span className="text-amber-400 font-bold">1. React Portal Mounting & Stacking Context Isolation:</span> Hand-written components render inline in parent DOM, vulnerable to parent z-index and overflow clipping. Radix uses `Dialog.Portal` mounting at document.body.
            </div>
            <div>
              <span className="text-amber-400 font-bold">2. Body Scroll Locking & Scrollbar Shift:</span> Radix locks `document.body` scrolling and injects compensatory `padding-right` for scrollbar width to prevent page layout jitter.
            </div>
            <div>
              <span className="text-amber-400 font-bold">3. Focus Scope Guards:</span> Radix uses invisible focus guard sentinel elements (`<span data-radix-focus-guard />`) ensuring focus containment even if children dynamically re-render.
            </div>
            <div>
              <span className="text-amber-400 font-bold">4. Pointer Event Dismissal Tracking:</span> Radix tracks `onPointerDownOutside` vs `onPointerUpOutside` to avoid closing when drag-selecting text.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
