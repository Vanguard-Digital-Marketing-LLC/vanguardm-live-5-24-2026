"use client";

import { useState, useCallback, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Turnstile from "@/components/ui/Turnstile";
import { trackEvent } from "@/lib/gtm";
import { safeCallbackUrl } from "@/lib/safe-callback-url";

/** Only allow same-origin relative paths as a post-login redirect target. */
function safeCallbackUrl(raw: string | null): string {
  if (
    raw &&
    raw.startsWith("/") &&
    !raw.startsWith("//") &&
    !raw.startsWith("/\\")
  ) {
    return raw;
  }
  return "/academy";
}

export default function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackUrl(searchParams.get("callbackUrl"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);

  const handleVerify = useCallback((token: string) => {
    setTurnstileToken(token);
    setTurnstileReady(true);
  }, []);
  const handleExpire = useCallback(() => {
    setTurnstileToken("");
    setTurnstileReady(true);
  }, []);

  // Allow submit after 3 seconds even if Turnstile hasn't loaded
  useEffect(() => {
    const timer = setTimeout(() => setTurnstileReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      turnstileToken,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    trackEvent("sign_in_complete");

    // Route users to the correct dashboard based on role
    // Hard navigation ensures the new session cookie is sent with the first request
    const session = await getSession();
    const role = (session?.user as Record<string, unknown>)?.role;
    if (role === "CLIENT") {
      window.location.href = "/portal";
    } else if (role === "ADMIN" || role === "TEAM") {
      window.location.href = "/admin";
    } else {
      window.location.href = safeCallbackUrl(callbackUrl, window.location.origin);
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
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="password"
            className="block text-xs font-display font-semibold uppercase tracking-wider text-slate-400"
          >
            Password
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-xs text-teal hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal/50 transition-colors"
          placeholder="Your password"
        />
      </div>

      <Turnstile onVerify={handleVerify} onExpire={handleExpire} className="flex justify-center" />

      <button
        type="submit"
        disabled={loading || !turnstileReady}
        className="w-full py-3 rounded-lg bg-teal text-slate-950 font-display text-xs font-semibold uppercase tracking-wider hover:bg-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Signing in..." : "Sign In"}
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
