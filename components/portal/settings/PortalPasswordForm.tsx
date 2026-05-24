"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Lock, Loader2, CheckCircle2 } from "lucide-react";

export default function PortalPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changing, setChanging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!currentPassword || !newPassword) {
      setError("Both current and new password are required");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setChanging(true);
    try {
      const res = await fetch("/api/portal/settings/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to change password");
      }

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        signOut({ callbackUrl: "/auth/sign-in?message=password-changed" });
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setChanging(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#111827] border border-white/6 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400">
          <Lock size={16} />
        </div>
        <h2 className="font-display text-base font-semibold text-white">Change password</h2>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-sm text-red-400 mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-sm text-emerald-400 mb-4 flex items-center gap-2">
          <CheckCircle2 size={16} />
          Password changed — signing you out…
        </div>
      )}

      <div className="space-y-3">
        <Pw id="portal-current-password" label="Current password" value={currentPassword} onChange={setCurrentPassword} disabled={changing} />
        <Pw id="portal-new-password" label="New password" value={newPassword} onChange={setNewPassword} disabled={changing} placeholder="At least 8 characters" />
        <Pw id="portal-confirm-password" label="Confirm new password" value={confirmPassword} onChange={setConfirmPassword} disabled={changing} />
      </div>

      <div className="flex justify-end mt-5">
        <button
          type="submit"
          disabled={changing}
          className="inline-flex items-center gap-2 px-5 h-10 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold rounded-lg disabled:opacity-50"
        >
          {changing && <Loader2 size={14} className="animate-spin" />}
          Change password
        </button>
      </div>
    </form>
  );
}

function Pw({
  label,
  value,
  onChange,
  disabled,
  placeholder,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  placeholder?: string;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        disabled={disabled}
        className="w-full h-10 px-3 rounded-md bg-[#0D1117] border border-white/8 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-400/40 disabled:opacity-50"
      />
    </div>
  );
}
