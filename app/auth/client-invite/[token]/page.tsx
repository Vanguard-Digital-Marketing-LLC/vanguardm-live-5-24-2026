"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Turnstile from "@/components/ui/Turnstile";

export default function ClientInvitePage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);

  const handleVerify = useCallback((t: string) => {
    setTurnstileToken(t);
    setTurnstileReady(true);
  }, []);
  const handleExpire = useCallback(() => {
    setTurnstileToken("");
    setTurnstileReady(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setTurnstileReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/accept-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, name, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      const data = await res.json();

      // Auto sign-in after accepting invite using bypass token (avoids Turnstile expiry)
      const result = await signIn("credentials", {
        email: data.email,
        password,
        bypassToken: data.bypassToken,
        redirect: false,
      });

      if (result?.ok) {
        // Hard navigation ensures the new session cookie is sent
        window.location.href = "/portal";
      } else {
        window.location.href = "/auth/sign-in";
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="pt-24">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-md mx-auto">
          <div className="glass rounded-2xl p-8 md:p-10">
            <h1 className="font-display text-2xl font-bold text-white mb-2 text-center">
              Accept Invitation
            </h1>
            <p className="text-sm text-slate-400 text-center mb-8">
              Set up your client portal account to view projects, tickets, and
              reports.
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-400 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="invite-name" className="block text-xs font-display font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Your Name
                </label>
                <input
                  id="invite-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/25 focus-glow"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label htmlFor="invite-password" className="block text-xs font-display font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Create Password
                </label>
                <input
                  id="invite-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/25 focus-glow"
                  placeholder="Min 8 characters"
                />
              </div>
              <Turnstile onVerify={handleVerify} onExpire={handleExpire} className="flex justify-center" />

              <button
                type="submit"
                disabled={loading || !turnstileReady}
                className="w-full px-6 py-3 rounded-lg bg-teal text-slate-950 font-display text-sm font-semibold uppercase tracking-wider hover:bg-teal-400 transition-colors disabled:opacity-50 cursor-pointer active:scale-[0.98]"
              >
                {loading ? "Setting up..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
