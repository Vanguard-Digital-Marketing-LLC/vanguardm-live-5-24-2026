"use client";

import { useState } from "react";
import { RefreshCw, XCircle } from "lucide-react";

interface InviteData {
  id: string;
  email: string;
  clientId: string;
  clientName: string;
  status: string;
  createdAt: string;
  expiresAt: string;
  acceptedAt: string | null;
  revokedAt: string | null;
}

const STATUS_BADGES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-amber-500/10", text: "text-amber-400", label: "Pending" },
  accepted: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Accepted" },
  expired: { bg: "bg-slate-500/10", text: "text-slate-400", label: "Expired" },
  revoked: { bg: "bg-red-500/10", text: "text-red-400", label: "Revoked" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function InviteRow({ invite }: { invite: InviteData }) {
  const [loading, setLoading] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState(invite.status);

  const badge = STATUS_BADGES[currentStatus] || STATUS_BADGES.pending;

  async function handleAction(action: "resend" | "revoke") {
    setLoading(action);
    try {
      const res = await fetch(`/api/admin/invites/${invite.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        if (action === "revoke") setCurrentStatus("revoked");
        else setCurrentStatus("pending");
      }
    } catch {
      // silent
    } finally {
      setLoading(null);
    }
  }

  // Resolved date (accepted or revoked date, or expires date)
  const resolvedDate = invite.acceptedAt || invite.revokedAt || invite.expiresAt;

  return (
    <tr className="hover:bg-slate-700/20 transition-colors">
      <td className="px-4 py-3">
        <a
          href={`/admin/clients/${invite.clientId}`}
          className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          {invite.clientName}
        </a>
      </td>
      <td className="px-4 py-3 text-sm text-white">{invite.email}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-slate-400">{formatDate(invite.createdAt)}</td>
      <td className="px-4 py-3 text-sm text-slate-400">{formatDate(resolvedDate)}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {(currentStatus === "pending" || currentStatus === "expired") && (
            <button
              onClick={() => handleAction("resend")}
              disabled={loading !== null}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${loading === "resend" ? "animate-spin" : ""}`} />
              {currentStatus === "expired" ? "Re-invite" : "Resend"}
            </button>
          )}
          {currentStatus === "pending" && (
            <button
              onClick={() => handleAction("revoke")}
              disabled={loading !== null}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-400 bg-red-500/10 rounded hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              <XCircle className="w-3 h-3" />
              Revoke
            </button>
          )}
          {currentStatus === "accepted" && (
            <span className="text-xs text-slate-500">—</span>
          )}
          {currentStatus === "revoked" && (
            <button
              onClick={() => handleAction("resend")}
              disabled={loading !== null}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${loading === "resend" ? "animate-spin" : ""}`} />
              Re-invite
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
