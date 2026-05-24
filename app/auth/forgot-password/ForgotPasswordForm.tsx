"use client";

import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  }

  if (sent) {
    return (
      <div className="rounded-lg bg-teal/10 border border-teal/20 p-6 text-center">
        <p className="text-sm text-teal-400 font-medium">Check your email</p>
        <p className="text-xs text-slate-400 mt-2">
          If an account exists with that email, we&apos;ve sent a password reset link.
          It expires in 1 hour.
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
          htmlFor="email"
          className="block text-xs font-display font-semibold uppercase tracking-wider text-slate-400 mb-1.5"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal/50 transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-teal text-slate-950 font-display text-xs font-semibold uppercase tracking-wider hover:bg-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
}
