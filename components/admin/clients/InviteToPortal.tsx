"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle, AlertCircle, Users } from "lucide-react";

interface PortalUser {
  id: string;
  name: string | null;
  email: string;
}

interface InviteToPortalProps {
  clientId: string;
  defaultEmail: string | null;
  portalUsers: PortalUser[];
}

export default function InviteToPortal({
  clientId,
  defaultEmail,
  portalUsers,
}: InviteToPortalProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(defaultEmail || "");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || sending) return;

    setSending(true);
    setResult(null);

    try {
      const res = await fetch(`/api/admin/clients/${clientId}/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setResult({
          type: "error",
          message: `Active invite already exists (expires ${new Date(data.invite.expiresAt).toLocaleDateString()})`,
        });
      } else if (!res.ok) {
        throw new Error(data.error || "Failed to send invite");
      } else {
        setResult({
          type: "success",
          message: `Invite sent to ${data.email}`,
        });
      }
    } catch (err) {
      setResult({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to send invite",
      });
    } finally {
      setSending(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2"
      >
        <Mail size={14} />
        Invite to Portal
      </button>
    );
  }

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl p-4 space-y-3">
      {portalUsers.length > 0 && (
        <div className="flex items-start gap-2 pb-3 border-b border-white/6">
          <Users size={14} className="text-emerald mt-0.5" />
          <div>
            <p className="text-xs text-slate-400 mb-1">Active portal users</p>
            {portalUsers.map((u) => (
              <p key={u.id} className="text-sm text-slate-300">
                {u.name || u.email}{" "}
                <span className="text-xs text-slate-500">({u.email})</span>
              </p>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleInvite} className="flex items-end gap-2">
        <div className="flex-1">
          <label htmlFor="invite-email" className="text-xs text-slate-400 mb-1 block">
            Invite email
          </label>
          <input
            id="invite-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="client@example.com"
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald/50 transition-colors"
            disabled={sending}
          />
        </div>
        <button
          type="submit"
          disabled={sending || !email.trim()}
          className="px-4 py-2 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {sending ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />}
          Send
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setResult(null);
          }}
          className="px-3 py-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </form>

      {result && (
        <div
          className={`flex items-center gap-2 text-sm ${
            result.type === "success" ? "text-emerald" : "text-red-400"
          }`}
        >
          {result.type === "success" ? (
            <CheckCircle size={14} />
          ) : (
            <AlertCircle size={14} />
          )}
          {result.message}
        </div>
      )}
    </div>
  );
}
