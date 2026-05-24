"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({ agencyName: "", name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup-agency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      // Redirect to agency subdomain
      window.location.href = data.redirectUrl;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Start Your Agency</h1>
          <p className="text-slate-400 mt-2">14-day free trial. No credit card required.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111827] border border-white/6 rounded-xl p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="agency-name" className="block text-sm font-medium text-slate-300 mb-1.5">Agency Name</label>
            <input
              id="agency-name"
              type="text"
              required
              value={form.agencyName}
              onChange={(e) => setForm({ ...form, agencyName: e.target.value })}
              placeholder="Acme Marketing"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
            {form.agencyName && (
              <p className="text-xs text-slate-500 mt-1">
                Your URL: {form.agencyName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.vanguardm.com
              </p>
            )}
          </div>

          <div>
            <label htmlFor="signup-name" className="block text-sm font-medium text-slate-300 mb-1.5">Your Name</label>
            <input
              id="signup-name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Smith"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <input
              id="signup-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="john@acmemarketing.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <input
              id="signup-password"
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Min. 8 characters"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Agency"}
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-emerald-400 hover:text-emerald-300">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
