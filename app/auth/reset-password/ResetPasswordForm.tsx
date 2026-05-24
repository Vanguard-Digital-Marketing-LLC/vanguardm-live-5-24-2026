"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="rounded-lg bg-red-400/10 border border-red-400/20 p-6 text-center">
        <p className="text-sm text-red-400 font-medium">Invalid reset link</p>
        <p className="text-xs text-slate-400 mt-2">
          This link is missing or malformed. Please request a new password reset.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/auth/sign-in"), 3000);
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  }

  if (success) {
    return (
      <div className="rounded-lg bg-teal/10 border border-teal/20 p-6 text-center">
        <p className="text-sm text-teal-400 font-medium">Password reset successful</p>
        <p className="text-xs text-slate-400 mt-2">
          Redirecting you to sign in...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-400/10 border border-red-400/20 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="password"
          className="block text-xs font-display font-semibold uppercase tracking-wider text-slate-400 mb-1.5"
        >
          New Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal/50 transition-colors"
          placeholder="Minimum 8 characters"
        />
      </div>

      <div>
        <label
          htmlFor="confirm"
          className="block text-xs font-display font-semibold uppercase tracking-wider text-slate-400 mb-1.5"
        >
          Confirm Password
        </label>
        <input
          id="confirm"
          type="password"
          required
          minLength={8}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal/50 transition-colors"
          placeholder="Re-enter your password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-teal text-slate-950 font-display text-xs font-semibold uppercase tracking-wider hover:bg-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
