import React from "react";
import { BarChart3, TrendingUp, Users, Zap, Clock, ArrowUpRight } from "lucide-react";

export default function AnalyticsPage() {
  const metrics = [
    { label: "Total Requests (24h)", value: "1,248,920", change: "+14.2%", icon: Zap },
    { label: "Avg Latency", value: "42ms", change: "-8.5%", icon: Clock },
    { label: "Active Sessions", value: "4,821", change: "+22.1%", icon: Users },
    { label: "System Uptime", value: "99.98%", change: "Stable", icon: TrendingUp },
  ];

  const regionalData = [
    { region: "US-East (N. Virginia)", requests: "482,100", p99: "38ms", status: "Optimal" },
    { region: "US-West (Oregon)", requests: "310,450", p99: "44ms", status: "Optimal" },
    { region: "EU-Central (Frankfurt)", requests: "298,120", p99: "41ms", status: "Optimal" },
    { region: "AP-East (Tokyo)", requests: "158,250", p99: "52ms", status: "Optimal" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Analytics</h1>
          <p className="text-slate-400 text-sm">
            Real-time telemetry overview, request rates, regional performance, and user traffic distribution.
          </p>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="glass-panel glass-panel-hover p-5 rounded-xl">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{m.label}</span>
                <Icon className="w-4 h-4 text-purple-400" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">{m.value}</span>
                <span className="text-xs text-emerald-400 flex items-center font-medium">
                  {m.change} <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Regional Performance Table */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Edge Node Regional Performance</h2>
          <span className="text-xs text-slate-400">Last updated: Just now</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Region</th>
                <th className="py-3 px-4">Total Requests</th>
                <th className="py-3 px-4">p99 Latency</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {regionalData.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-white">{row.region}</td>
                  <td className="py-3.5 px-4 font-mono">{row.requests}</td>
                  <td className="py-3.5 px-4 font-mono text-purple-400">{row.p99}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
