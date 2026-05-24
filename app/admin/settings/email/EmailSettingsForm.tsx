"use client";

import { useState } from "react";
import { Mail, Trash2, CheckCircle, AlertCircle, Send } from "lucide-react";

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none font-mono";
const labelClass =
  "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5";

export default function EmailSettingsForm({
  hasSmtp,
  fromEmail,
}: {
  hasSmtp: boolean;
  fromEmail: string;
}) {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("465");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [from, setFrom] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [disconnecting, setDisconnecting] = useState(false);
  const [testing, setTesting] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!host || !user || !pass) return;

    setStatus("saving");
    setMsg("");
    try {
      const res = await fetch("/api/agency/email-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          smtpHost: host,
          smtpPort: port,
          smtpUser: user,
          smtpPass: pass,
          fromEmail: from || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || "Failed to save");
        setStatus("error");
        return;
      }
      setMsg("SMTP settings saved and verified");
      setStatus("success");
      setPass("");
      setTimeout(() => window.location.reload(), 1500);
    } catch {
      setMsg("Network error");
      setStatus("error");
    }
  }

  async function handleTest() {
    setTesting(true);
    setMsg("");
    try {
      const res = await fetch("/api/agency/email-settings", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || "Test failed");
        setStatus("error");
      } else {
        setMsg(`Test email sent to ${data.sentTo}`);
        setStatus("success");
      }
    } catch {
      setMsg("Network error");
      setStatus("error");
    } finally {
      setTesting(false);
    }
  }

  async function handleDisconnect() {
    if (!confirm("Remove SMTP configuration? Report emails will fall back to the platform default.")) return;
    setDisconnecting(true);
    try {
      const res = await fetch("/api/agency/email-settings", { method: "DELETE" });
      if (res.ok) {
        window.location.reload();
      } else {
        const data = await res.json().catch(() => ({}));
        setMsg(data.error || "Failed to remove SMTP configuration");
        setStatus("error");
        setDisconnecting(false);
      }
    } catch {
      setMsg("Network error");
      setStatus("error");
      setDisconnecting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Mail size={18} className="text-emerald-400" />
          <h2 className="font-display text-base font-semibold text-white">SMTP Configuration</h2>
        </div>

        {/* Current status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg px-4 py-3">
            <div className="text-xs text-slate-400 mb-1">SMTP Connection</div>
            <div className="text-sm text-white font-mono">
              {hasSmtp ? "Configured" : "Not set — using platform default"}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg px-4 py-3">
            <div className="text-xs text-slate-400 mb-1">From Address</div>
            <div className="text-sm text-white font-mono">
              {fromEmail || "Not set"}
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="smtp-host" className={labelClass}>SMTP Host</label>
              <input
                id="smtp-host"
                className={inputClass}
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder="smtp.gmail.com"
                required
              />
            </div>
            <div>
              <label htmlFor="smtp-port" className={labelClass}>Port</label>
              <input
                id="smtp-port"
                className={inputClass}
                value={port}
                onChange={(e) => setPort(e.target.value)}
                placeholder="465"
              />
            </div>
          </div>
          <div>
            <label htmlFor="smtp-username" className={labelClass}>Username</label>
            <input
              id="smtp-username"
              className={inputClass}
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="you@youragency.com"
              required
            />
          </div>
          <div>
            <label htmlFor="smtp-password" className={labelClass}>Password</label>
            <input
              id="smtp-password"
              className={inputClass}
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder={hasSmtp ? "••••••••" : "App password or SMTP password"}
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Encrypted at rest. Connection is tested before saving.
            </p>
          </div>
          <div>
            <label htmlFor="smtp-from-email" className={labelClass}>From Email (optional)</label>
            <input
              id="smtp-from-email"
              className={inputClass}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Agency Name <reports@youragency.com>"
            />
            <p className="text-xs text-slate-500 mt-1">
              Display name and address for outgoing report emails.
            </p>
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

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="submit"
              disabled={status === "saving" || !host || !user || !pass}
              className="px-6 py-2.5 rounded-lg bg-emerald-500 text-slate-950 text-sm font-display font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {status === "saving" ? "Saving..." : "Save & Verify"}
            </button>

            {hasSmtp && (
              <>
                <button
                  type="button"
                  onClick={handleTest}
                  disabled={testing}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-emerald-400/30 text-emerald-400 text-sm font-display font-semibold uppercase tracking-wider hover:bg-emerald-400/10 transition-colors disabled:opacity-50"
                >
                  <Send size={14} />
                  {testing ? "Sending..." : "Send Test Email"}
                </button>

                <button
                  type="button"
                  onClick={handleDisconnect}
                  disabled={disconnecting}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-red-400/30 text-red-400 text-sm font-display font-semibold uppercase tracking-wider hover:bg-red-400/10 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  {disconnecting ? "Removing..." : "Disconnect"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
