import React from "react";
import { User, Shield, Key, Mail, Calendar, CheckCircle, Smartphone } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      {/* Profile Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-blue-500/20 shrink-0">
          EA
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Engineering Admin</h1>
            <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-medium">
              Lead Architect
            </span>
          </div>

          <p className="text-slate-400 text-sm">
            Frontend AI Engineering Track Capstone Contributor
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" /> lead.dev@fly-capstone.internal
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" /> Joined August 2026
            </span>
          </div>
        </div>
      </div>

      {/* Account Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security & Auth */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" /> Security & Credentials
          </h2>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Key className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-xs font-semibold text-white">Two-Factor Authentication</div>
                  <div className="text-[11px] text-slate-400">TOTP Authenticator Enabled</div>
                </div>
              </div>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Active
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-xs font-semibold text-white">Active Sessions</div>
                  <div className="text-[11px] text-slate-400">1 Device Connected (VS Code / Web)</div>
                </div>
              </div>
              <span className="text-xs text-slate-400">Current</span>
            </div>
          </div>
        </div>

        {/* Roles & Permissions */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-purple-400" /> Role & Permissions
          </h2>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 text-xs flex justify-between items-center">
              <span className="text-slate-300 font-medium">Deployment Scopes</span>
              <span className="text-blue-400 font-mono text-[11px]">Vercel / Netlify Full Access</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 text-xs flex justify-between items-center">
              <span className="text-slate-300 font-medium">Repo Authority</span>
              <span className="text-purple-400 font-mono text-[11px]">Maintainer</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 text-xs flex justify-between items-center">
              <span className="text-slate-300 font-medium">Environment Access</span>
              <span className="text-emerald-400 font-mono text-[11px]">Preview & Production</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
