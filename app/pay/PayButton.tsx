"use client";

import { useState, useCallback } from "react";
import Turnstile from "@/components/ui/Turnstile";

interface PayButtonProps {
  amount: number;
  description: string;
  signature: string;
  exp: number;
  email?: string;
  agencyId?: string;
}

export default function PayButton({ amount, description, signature, exp, email, agencyId }: PayButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleVerify = useCallback((token: string) => setTurnstileToken(token), []);
  const handleExpire = useCallback(() => setTurnstileToken(""), []);

  async function handlePay() {
    if (!turnstileToken) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, description, signature, exp, email, agencyId, turnstileToken }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Payment failed. Please try again.");
        setStatus("error");
        return;
      }

      window.location.href = data.url;
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const dollars = (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6 text-center">
        <p className="text-xs font-display font-semibold uppercase tracking-wider text-slate-400 mb-1">Amount Due</p>
        <p className="text-4xl font-display font-bold text-emerald">{dollars}</p>
        <p className="text-sm text-slate-400 mt-2">{description}</p>
      </div>

      <Turnstile onVerify={handleVerify} onExpire={handleExpire} className="flex justify-center" />

      <button
        onClick={handlePay}
        disabled={status === "loading" || !turnstileToken}
        className="w-full py-3.5 rounded-lg bg-amber text-slate-950 font-display text-sm font-semibold uppercase tracking-wider hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25 transition-all disabled:opacity-50 cursor-pointer"
      >
        {status === "loading" ? "Redirecting to Stripe..." : `Pay ${dollars}`}
      </button>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">{errorMsg}</p>
      )}

      <p className="text-xs text-slate-500 text-center">
        Secure checkout powered by Stripe. You&apos;ll be redirected to complete payment.
      </p>
    </div>
  );
}
