"use client";

import React, { useState } from "react";
import { Settings, Save, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

interface FormValues {
  displayName: string;
  emailNotifications: "daily" | "weekly" | "never";
  theme: "dark" | "light" | "system";
  rateLimit: number;
}

interface FormErrors {
  displayName?: string;
  emailNotifications?: string;
}

export function validateSettings(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.displayName || values.displayName.trim() === "") {
    errors.displayName = "Display name is required.";
  } else if (values.displayName.trim().length < 3) {
    errors.displayName = "Display name must be at least 3 characters.";
  }

  const allowedCadences = ["daily", "weekly", "never"];
  if (!allowedCadences.includes(values.emailNotifications)) {
    errors.emailNotifications = "Please select a valid notification cadence.";
  }

  return errors;
}

export default function SettingsPage() {
  const [formValues, setFormValues] = useState<FormValues>({
    displayName: "Engineering Team",
    emailNotifications: "daily",
    theme: "dark",
    rateLimit: 1000,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors as user edits
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    const validationErrors = validateSettings(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate async API save
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Settings saved successfully! Preview environment synced.");
    }, 400);
  };

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Capstone Settings</h1>
          <p className="text-slate-400 text-sm">
            Manage your dashboard preferences, display name, notification cadences, and system parameters.
          </p>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMessage && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-between animate-fade-in"
        >
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage("")}
            className="text-xs hover:underline text-emerald-300"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Form Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Display Name */}
          <div className="space-y-2">
            <label
              htmlFor="displayName"
              className="block text-sm font-semibold text-slate-200"
            >
              Display Name <span className="text-rose-400">*</span>
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              value={formValues.displayName}
              onChange={handleChange}
              aria-invalid={!!errors.displayName}
              aria-describedby={errors.displayName ? "displayName-error" : undefined}
              className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                errors.displayName
                  ? "border-rose-500/70 focus:ring-2 focus:ring-rose-500/20"
                  : "border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              placeholder="Enter display name"
            />
            {errors.displayName && (
              <p
                id="displayName-error"
                role="alert"
                className="text-xs text-rose-400 flex items-center gap-1.5 font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.displayName}
              </p>
            )}
          </div>

          {/* Email Notifications */}
          <div className="space-y-2">
            <label
              htmlFor="emailNotifications"
              className="block text-sm font-semibold text-slate-200"
            >
              Email Notifications Cadence
            </label>
            <select
              id="emailNotifications"
              name="emailNotifications"
              value={formValues.emailNotifications}
              onChange={handleChange}
              aria-invalid={!!errors.emailNotifications}
              aria-describedby={
                errors.emailNotifications ? "emailNotifications-error" : undefined
              }
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="daily">Daily summary</option>
              <option value="weekly">Weekly digest</option>
              <option value="never">Never</option>
            </select>
            {errors.emailNotifications && (
              <p
                id="emailNotifications-error"
                role="alert"
                className="text-xs text-rose-400 flex items-center gap-1.5 font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.emailNotifications}
              </p>
            )}
          </div>

          {/* Theme Preference */}
          <div className="space-y-2">
            <label
              htmlFor="theme"
              className="block text-sm font-semibold text-slate-200"
            >
              Interface Theme
            </label>
            <select
              id="theme"
              name="theme"
              value={formValues.theme}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="dark">Dark Mode (Default Glassmorphism)</option>
              <option value="light">Light Mode</option>
              <option value="system">Follow System</option>
            </select>
          </div>

          {/* Rate Limit Slider */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-200">
              <label htmlFor="rateLimit">API Rate Limit (Req/min)</label>
              <span className="font-mono text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/20">
                {formValues.rateLimit}
              </span>
            </div>
            <input
              id="rateLimit"
              name="rateLimit"
              type="range"
              min="100"
              max="5000"
              step="100"
              value={formValues.rateLimit}
              onChange={handleChange}
              className="w-full accent-blue-500 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex items-center justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
