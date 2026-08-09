"use client";

import React, { useEffect, useRef, useId } from "react";
import { X } from "lucide-react";

export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function CustomModal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: CustomModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const titleId = useId();
  const descriptionId = useId();

  // Focus Restoration & Initial Focus
  useEffect(() => {
    if (isOpen) {
      // 1. Capture previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement | null;

      // 2. Move focus into modal on next tick
      const timer = setTimeout(() => {
        if (modalRef.current) {
          const focusables = getFocusableElements(modalRef.current);
          if (focusables.length > 0) {
            focusables[0].focus();
          } else {
            modalRef.current.focus();
          }
        }
      }, 50);

      return () => clearTimeout(timer);
    } else {
      // 3. Restore focus when modal closes
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  // Focus Trap & Keydown Listeners (Escape key, Tab wrap)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key closes modal
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Tab Key Focus Trap
      if (e.key === "Tab" && modalRef.current) {
        const focusables = getFocusableElements(modalRef.current);
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];
        const activeElement = document.activeElement;

        if (e.shiftKey) {
          // Shift + Tab: Wrap from first to last
          if (activeElement === firstElement || !modalRef.current.contains(activeElement)) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: Wrap from last to first
          if (activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg p-6 rounded-2xl glass-panel border border-white/10 shadow-2xl bg-surface-900 text-slate-100 focus:outline-none"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div>
            <h2 id={titleId} className="text-xl font-bold text-white tracking-tight">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="mt-1 text-sm text-slate-400">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 space-y-4">{children}</div>
      </div>
    </div>
  );
}

// Helper: Query focusable DOM elements
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0
  );
}
