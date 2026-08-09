"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  BarChart3,
  User,
  Activity,
  Menu,
  X,
  Zap,
  Globe,
} from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Playground (A11y)", path: "/playground", icon: Zap },
    { label: "Settings", path: "/settings", icon: Settings },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
    { label: "Profile", path: "/profile", icon: User },
    { label: "Health Check", path: "/health", icon: Activity },
  ];

  return (
    <>
      {/* Top Mobile Bar (Visible below md) */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface-900/90 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            <Zap className="w-4 h-4" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            Fly Capstone
          </span>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <aside
        className={`md:hidden fixed top-16 right-0 bottom-0 w-64 bg-surface-900 border-l border-white/10 z-40 p-4 transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4 p-3 rounded-lg bg-slate-900/80 border border-white/5">
          <div className="flex items-center space-x-2 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Vercel Preview Live</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Foundations Phase 1</p>
        </div>
      </aside>

      {/* Desktop Sidebar (Visible on md and above) */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 bottom-0 w-64 bg-surface-900/80 backdrop-blur-xl border-r border-white/10 z-30 p-5">
        <div className="flex items-center space-x-3 pb-6 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/25">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base text-white tracking-tight">Fly Capstone</h1>
            <span className="text-[11px] text-slate-400 font-mono">v0.1.0-preview</span>
          </div>
        </div>

        <div className="mt-6 text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Navigation
        </div>

        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-900/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* System & Deployment Card */}
        <div className="pt-4 border-t border-white/10">
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" /> Environment
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                Preview
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>System Operational</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
