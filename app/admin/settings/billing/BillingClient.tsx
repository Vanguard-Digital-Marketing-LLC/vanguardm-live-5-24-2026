"use client";

import { useState } from "react";

interface BillingClientProps {
  plan: string;
  status: string;
  maxClients: number;
  clientCount: number;
  currentPeriodEnd: string | null;
  isAdmin: boolean;
}

const PLANS = [
  { key: "STARTER", name: "Starter", price: 49, clients: 5, features: ["CRM", "Client Portal", "Tickets", "Messages"] },
  { key: "PRO", name: "Pro", price: 149, clients: 25, features: ["+ Reports", "+ Blog", "+ Leads", "+ Approvals"] },
  { key: "ENTERPRISE", name: "Enterprise", price: 349, clients: "Unlimited", features: ["+ AI Agent", "+ White-label", "+ Priority Support"] },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  TRIALING: { label: "Trial", color: "text-amber-400" },
  ACTIVE: { label: "Active", color: "text-emerald-400" },
  PAST_DUE: { label: "Past Due", color: "text-red-400" },
  CANCELED: { label: "Canceled", color: "text-slate-400" },
  UNPAID: { label: "Unpaid", color: "text-red-400" },
};

export default function BillingClient({ plan, status, maxClients, clientCount, currentPeriodEnd, isAdmin }: BillingClientProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const statusInfo = STATUS_LABELS[status] ?? { label: status, color: "text-slate-400" };

  async function handleCheckout(planKey: string) {
    setLoading(planKey);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  }

  async function handlePortal() {
    setLoading("portal");
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  }

  const usagePercent = maxClients > 0 ? Math.min(100, Math.round((clientCount / maxClients) * 100)) : 0;

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-white">Current Plan</h2>
            <p className="text-sm text-slate-400 mt-1">
              <span className="text-emerald-400 font-semibold">{plan}</span>
              {" "}
              <span className={statusInfo.color}>({statusInfo.label})</span>
            </p>
          </div>
          {status !== "CANCELED" && (
            <button
              onClick={handlePortal}
              disabled={!!loading}
              className="text-sm text-slate-400 hover:text-white border border-white/10 rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
            >
              {loading === "portal" ? "Loading..." : "Manage Billing"}
            </button>
          )}
        </div>

        {currentPeriodEnd && (
          <p className="text-xs text-slate-500">
            Current period ends: {new Date(currentPeriodEnd).toLocaleDateString()}
          </p>
        )}

        {/* Usage bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Clients: {clientCount} / {maxClients === 999 ? "Unlimited" : maxClients}</span>
            <span>{usagePercent}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${usagePercent >= 90 ? "bg-red-500" : usagePercent >= 70 ? "bg-amber-500" : "bg-emerald-500"}`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Plan comparison */}
      {isAdmin && (
        <div className="grid md:grid-cols-3 gap-4">
          {PLANS.map((p) => {
            const isCurrent = p.key === plan;
            return (
              <div
                key={p.key}
                className={`bg-[#111827] border rounded-xl p-6 ${isCurrent ? "border-emerald-500/50" : "border-white/6"}`}
              >
                <h3 className="font-display text-lg font-semibold text-white">{p.name}</h3>
                <p className="text-3xl font-bold text-white mt-2">
                  ${p.price}<span className="text-sm font-normal text-slate-400">/mo</span>
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  Up to {p.clients} clients
                </p>
                <ul className="mt-4 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm text-slate-300 flex items-center gap-2">
                      <span className="text-emerald-400">&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => !isCurrent && handleCheckout(p.key)}
                  disabled={isCurrent || !!loading}
                  className={`mt-6 w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                    isCurrent
                      ? "bg-white/5 text-slate-500 cursor-default"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50"
                  }`}
                >
                  {isCurrent ? "Current Plan" : loading === p.key ? "Loading..." : "Upgrade"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
