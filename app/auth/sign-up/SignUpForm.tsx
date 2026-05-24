"use client";

import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Turnstile from "@/components/ui/Turnstile";
import { trackEvent } from "@/lib/gtm";

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/academy";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleVerify = useCallback((token: string) => setTurnstileToken(token), []);
  const handleExpire = useCallback(() => setTurnstileToken(""), []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!turnstileToken) {
      setError("Please complete the verification.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, turnstileToken }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      // Auto sign-in after registration
      const result = await signIn("credentials", {
        email,
        password,
        turnstileToken,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created but sign-in failed. Please sign in manually.");
        setLoading(false);
        return;
      }

      trackEvent("sign_up_complete");
      router.push("/academy");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
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
          htmlFor="name"
          className="block text-xs font-display font-semibold uppercase tracking-wider text-slate-400 mb-1.5"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal/50 transition-colors"
          placeholder="Your name"
        />
      </div>

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

      <div>
        <label
          htmlFor="password"
          className="block text-xs font-display font-semibold uppercase tracking-wider text-slate-400 mb-1.5"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal/50 transition-colors"
          placeholder="At least 8 characters"
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
          title="Must include uppercase, lowercase, and a number"
        />
      </div>

      <Turnstile onVerify={handleVerify} onExpire={handleExpire} className="flex justify-center" />

      <button
        type="submit"
        disabled={loading || !turnstileToken}
        className="w-full py-3 rounded-lg bg-teal text-slate-950 font-display text-xs font-semibold uppercase tracking-wider hover:bg-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

      {process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true" && (
        <>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-slate-950 px-3 text-slate-500">or</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full py-3 rounded-lg border border-white/10 text-white font-display text-xs font-semibold uppercase tracking-wider hover:bg-white/5 transition-all cursor-pointer"
          >
            Continue with Google
          </button>
        </>
      )}
    </form>
  );
}
