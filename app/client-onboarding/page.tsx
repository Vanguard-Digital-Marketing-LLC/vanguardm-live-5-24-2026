"use client";

import { useState } from "react";
import { Bell, MessageSquare, FileCheck, LifeBuoy, Loader2 } from "lucide-react";

interface Preference {
  key: string;
  label: string;
  description: string;
  icon: typeof Bell;
  default: boolean;
}

const PREFERENCES: Preference[] = [
  {
    key: "emailOnNewReport",
    label: "New Reports",
    description: "Get notified when a new report is published",
    icon: FileCheck,
    default: true,
  },
  {
    key: "emailOnApprovalRequest",
    label: "Approval Requests",
    description: "Get notified when items need your approval",
    icon: Bell,
    default: true,
  },
  {
    key: "emailOnTicketUpdate",
    label: "Ticket Updates",
    description: "Get notified when your support tickets are updated",
    icon: LifeBuoy,
    default: true,
  },
  {
    key: "emailOnNewMessage",
    label: "New Messages",
    description: "Get notified when you receive a new message",
    icon: MessageSquare,
    default: true,
  },
];

export default function OnboardingPage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(PREFERENCES.map((p) => [p.key, p.default])),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGetStarted() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/portal/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...prefs,
          portalOnboarded: true,
        }),
      });

      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Portal layout checks DB directly — no JWT refresh needed
      window.location.href = "/portal";
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-teal-400">M</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome to the Client Portal
          </h1>
          <p className="text-slate-400 text-sm">
            Set your notification preferences to get started.
          </p>
        </div>

        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-medium text-slate-300 mb-2">
            Email Notifications
          </h2>

          {PREFERENCES.map((pref) => {
            const Icon = pref.icon;
            return (
              <label
                key={pref.key}
                className="flex items-center justify-between p-3 rounded-lg bg-white/3 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-slate-400" />
                  <div>
                    <p className="text-sm text-white">{pref.label}</p>
                    <p className="text-xs text-slate-500">{pref.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={prefs[pref.key]}
                  onClick={() =>
                    setPrefs((prev) => ({ ...prev, [pref.key]: !prev[pref.key] }))
                  }
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    prefs[pref.key] ? "bg-teal-500" : "bg-slate-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      prefs[pref.key] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </label>
            );
          })}
        </div>

        {error && (
          <p className="text-center text-sm text-red-400 mt-3">{error}</p>
        )}

        <button
          onClick={handleGetStarted}
          disabled={loading}
          className="w-full mt-6 px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Setting up...
            </>
          ) : (
            "Get Started"
          )}
        </button>

        <p className="text-center text-xs text-slate-600 mt-4">
          You can change these settings later from the portal settings page.
        </p>
      </div>
    </div>
  );
}
