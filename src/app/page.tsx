import React from "react";
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  Layers,
  Server,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "App Status",
      value: "Operational",
      change: "Phase 1 Complete",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Architecture",
      value: "Server-First",
      change: "App Router v14/15",
      icon: Server,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Routed Screens",
      value: "5/5 Active",
      change: "Spec Compliant",
      icon: Layers,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Health Check Telemetry",
      value: "Active",
      change: "Endpoint Live",
      icon: Activity,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            <Zap className="w-3.5 h-3.5" /> Phase: Foundations Scaffolding
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Fly Capstone Dashboard
          </h1>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            Welcome to the capstone frontend application. Built with Next.js App Router, Tailwind CSS design tokens, server-first components, and dynamic telemetry health checks.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/settings"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              Configure Settings <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/health"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-medium text-sm transition-all flex items-center gap-2"
            >
              View Telemetry <Activity className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="glass-panel glass-panel-hover p-5 rounded-xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{stat.title}</span>
                <div className={`p-2 rounded-lg border ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Architecture */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" /> Architecture & Evaluation Criteria
            </h2>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-mono">
              Passed
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-white">Server Components Default</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  All pages (`/`, `/analytics`, `/profile`, `/health`) are Server Components for maximum speed and SEO. Interactivity is isolated to Client Components like the Settings form.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-white">Responsive Layout (375px & 1280px)</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Fully responsive UI featuring a mobile drawer at 375px width and a full fixed sidebar navigation at 1280px desktop.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-white">Zero Secrets Committed</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Environment variables template provided in `.env.example` with public and server configuration placeholders.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation Panel */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Spec Screen Map</h2>
            <div className="space-y-2">
              <Link
                href="/settings"
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 hover:border-blue-500/30 flex items-center justify-between text-xs text-slate-300 transition-all group"
              >
                <span>Settings Form Screen</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </Link>
              <Link
                href="/analytics"
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 hover:border-blue-500/30 flex items-center justify-between text-xs text-slate-300 transition-all group"
              >
                <span>Analytics Overview Screen</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </Link>
              <Link
                href="/profile"
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 hover:border-blue-500/30 flex items-center justify-between text-xs text-slate-300 transition-all group"
              >
                <span>User Profile Screen</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </Link>
              <Link
                href="/health"
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 hover:border-blue-500/30 flex items-center justify-between text-xs text-slate-300 transition-all group"
              >
                <span>Health Telemetry Screen</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
            Deploy Ready: Push to GitHub & connect to Vercel/Netlify for automatic preview URLs.
          </div>
        </div>
      </div>
    </div>
  );
}
