"use client";

import { useState } from "react";
import { CreditCard, Trash2, CheckCircle, AlertCircle } from "lucide-react";

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none font-mono";
const labelClass =
  "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5";

export default function StripeSettingsForm({
  publishableKey,
  hasSecretKey,
  hasWebhookSecret,
}: {
  publishableKey: string;
  hasSecretKey: boolean;
  hasWebhookSecret: boolean;
}) {
  const [pk, setPk] = useState("");
  const [sk, setSk] = useState("");
  const [whs, setWhs] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [disconnecting, setDisconnecting] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!pk && !sk && !whs) return;

    setStatus("saving");
    setMsg("");
    try {
      const res = await fetch("/api/agency/stripe-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publishableKey: pk || undefined,
          secretKey: sk || undefined,
          webhookSecret: whs || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || "Failed to save");
        setStatus("error");
        return;
      }
      setMsg("Stripe settings saved successfully");
      setStatus("success");
      setSk("");
      setWhs("");
      setTimeout(() => window.location.reload(), 1500);
    } catch {
      setMsg("Network error");
      setStatus("error");
    }
  }

  async function handleDisconnect() {
    if (!confirm("Are you sure you want to disconnect Stripe? This will clear all stored keys.")) return;
    setDisconnecting(true);
    try {
      const res = await fetch("/api/agency/stripe-settings", { method: "DELETE" });
      if (res.ok) window.location.reload();
    } catch {
      setDisconnecting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard size={18} className="text-emerald-400" />
          <h2 className="font-display text-base font-semibold text-white">Stripe API Keys</h2>
        </div>

        {/* Current status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg px-4 py-3">
            <div className="text-xs text-slate-400 mb-1">Publishable Key</div>
            <div className="text-sm text-white font-mono">
              {publishableKey ? `${publishableKey.slice(0, 7)}...${publishableKey.slice(-4)}` : "Not set"}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg px-4 py-3">
            <div className="text-xs text-slate-400 mb-1">Secret Key</div>
            <div className="text-sm text-white font-mono">
              {hasSecretKey ? "sk_...configured" : "Not set"}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg px-4 py-3">
            <div className="text-xs text-slate-400 mb-1">Webhook Secret</div>
            <div className="text-sm text-white font-mono">
              {hasWebhookSecret ? "whsec_...configured" : "Not set"}
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="stripe-pk" className={labelClass}>Publishable Key</label>
            <input
              id="stripe-pk"
              className={inputClass}
              value={pk}
              onChange={(e) => setPk(e.target.value)}
              placeholder="pk_live_..."
            />
          </div>
          <div>
            <label htmlFor="stripe-sk" className={labelClass}>Secret Key</label>
            <input
              id="stripe-sk"
              className={inputClass}
              type="password"
              value={sk}
              onChange={(e) => setSk(e.target.value)}
              placeholder="sk_live_..."
            />
            <p className="text-xs text-slate-500 mt-1">
              Will be encrypted at rest. Connection is tested before saving.
            </p>
          </div>
          <div>
            <label htmlFor="stripe-webhook-secret" className={labelClass}>Webhook Secret</label>
            <input
              id="stripe-webhook-secret"
              className={inputClass}
              type="password"
              value={whs}
              onChange={(e) => setWhs(e.target.value)}
              placeholder="whsec_..."
            />
          </div>

          {msg && (
            <div
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm ${
                status === "success"
                  ? "bg-emerald/10 border border-emerald/20 text-emerald-400"
                  : "bg-red-400/10 border border-red-400/20 text-red-400"
              }`}
            >
              {status === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {msg}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === "saving" || (!pk && !sk && !whs)}
              className="px-6 py-2.5 rounded-lg bg-emerald-500 text-slate-950 text-sm font-display font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {status === "saving" ? "Saving..." : "Save Keys"}
            </button>

            {(hasSecretKey || publishableKey) && (
              <button
                type="button"
                onClick={handleDisconnect}
                disabled={disconnecting}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-red-400/30 text-red-400 text-sm font-display font-semibold uppercase tracking-wider hover:bg-red-400/10 transition-colors disabled:opacity-50"
              >
                <Trash2 size={14} />
                {disconnecting ? "Disconnecting..." : "Disconnect"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
