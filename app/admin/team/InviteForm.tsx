"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import SidePanel from "@/components/admin/shared/SidePanel";

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";
const labelClass =
  "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5";

export default function InviteForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("TEAM");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function reset() {
    setEmail("");
    setInviteRole("TEAM");
    setStatus("idle");
    setMessage("");
  }

  function handleClose() {
    setOpen(false);
    reset();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/admin/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, inviteRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to send invite");
        setStatus("error");
        return;
      }

      setMessage(`Invite sent to ${email}`);
      setStatus("success");
      setEmail("");
      setInviteRole("TEAM");

      // Refresh server data so the pending invites list updates
      router.refresh();
    } catch {
      setMessage("Network error");
      setStatus("error");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-display font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors"
      >
        <UserPlus size={16} />
        Invite Member
      </button>

      <SidePanel open={open} onClose={handleClose} title="Invite Team Member">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="invite-email" className={labelClass}>Email Address *</label>
            <input
              id="invite-email"
              className={inputClass}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teammate@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="invite-role" className={labelClass}>Role *</label>
            <select
              id="invite-role"
              className={inputClass}
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
            >
              <option value="TEAM">Team Member</option>
              <option value="ADMIN">Admin</option>
            </select>
            <p className="text-xs text-slate-500 mt-1.5">
              {inviteRole === "ADMIN"
                ? "Full access to all admin features including billing and team management."
                : "Access to clients, projects, and tasks. Cannot manage billing or team."}
            </p>
          </div>

          {message && (
            <div
              className={`rounded-lg px-4 py-3 text-sm ${
                status === "success"
                  ? "bg-emerald/10 border border-emerald/20 text-emerald-400"
                  : "bg-red-400/10 border border-red-400/20 text-red-400"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === "loading" || !email}
              className="flex-1 px-6 py-2.5 rounded-lg bg-emerald-500 text-slate-950 text-sm font-display font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Invite"}
            </button>
          </div>
        </form>
      </SidePanel>
    </>
  );
}
