"use client";

import { useState, useCallback } from "react";
import Turnstile from "@/components/ui/Turnstile";
import { trackEvent } from "@/lib/gtm";

interface AuditFormProps {
  formId?: string;
}

export default function AuditForm({ formId = "audit-form-top" }: AuditFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleVerify = useCallback((token: string) => setTurnstileToken(token), []);
  const handleExpire = useCallback(() => setTurnstileToken(""), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!turnstileToken) {
      setStatus("error");
      return;
    }
    setStatus("loading");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const company = (form.elements.namedItem("company") as HTMLInputElement).value;
    const website = (form.elements.namedItem("website") as HTMLInputElement).value;

    const payload = {
      name,
      email,
      phone,
      company,
      service: "Free PPC Audit (LP: texas-ppc-audit)",
      message: `Website/URL: ${website || "(not provided)"}\n\nRequested free Google Ads audit from the Texas PPC Audit landing page.`,
      turnstileToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        // GTM conversion event — wire to Google Ads conversion import
        trackEvent("audit_form_submit", {
          form_id: formId,
          service: "ppc_audit",
          value: 50,
          currency: "USD",
        });
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/25 transition-colors";

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-emerald/10 border border-emerald/30 p-6 md:p-8 text-center">
        <div className="text-4xl mb-3">✓</div>
        <h3 className="font-display text-xl font-bold text-emerald mb-2">
          You&apos;re on the list.
        </h3>
        <p className="text-sm text-slate-300">
          We&apos;ll reach out within 24 business hours to schedule your free
          15-minute audit. Check your inbox (and spam folder) for a confirmation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 md:p-6 space-y-3 backdrop-blur"
    >
      <div className="text-center mb-2">
        <p className="font-display text-base font-bold text-white">
          Get Your Free Audit
        </p>
        <p className="text-xs text-slate-400">Takes 30 seconds. No spam.</p>
      </div>

      <div>
        <label htmlFor={`${formId}-name`} className="sr-only">Name</label>
        <input
          type="text"
          id={`${formId}-name`}
          name="name"
          required
          placeholder="Your name *"
          className={inputClass}
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-email`} className="sr-only">Email</label>
        <input
          type="email"
          id={`${formId}-email`}
          name="email"
          required
          placeholder="Email *"
          className={inputClass}
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-phone`} className="sr-only">Phone</label>
        <input
          type="tel"
          id={`${formId}-phone`}
          name="phone"
          required
          placeholder="Phone *"
          className={inputClass}
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-company`} className="sr-only">Business name</label>
        <input
          type="text"
          id={`${formId}-company`}
          name="company"
          required
          placeholder="Business name *"
          className={inputClass}
          autoComplete="organization"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-website`} className="sr-only">Website URL</label>
        <input
          type="url"
          id={`${formId}-website`}
          name="website"
          placeholder="Website URL (optional)"
          className={inputClass}
          autoComplete="url"
        />
      </div>

      <Turnstile
        onVerify={handleVerify}
        onExpire={handleExpire}
        className="flex justify-center"
      />

      <button
        type="submit"
        disabled={status === "loading" || !turnstileToken}
        className="w-full py-3.5 rounded-lg bg-amber text-slate-950 font-display text-sm font-semibold uppercase tracking-wider hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25 transition-all disabled:opacity-50 cursor-pointer"
      >
        {status === "loading" ? "Sending..." : "Get My Free Audit →"}
      </button>

      {status === "error" && (
        <p className="text-red-400 text-xs text-center">
          Something went wrong. Please try again or call (936) 358-6500.
        </p>
      )}

      <p className="text-[10px] text-slate-500 text-center">
        No contracts. No spam. Your info stays private.
      </p>
    </form>
  );
}
