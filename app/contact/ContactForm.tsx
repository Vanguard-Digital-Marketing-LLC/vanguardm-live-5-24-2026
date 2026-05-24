"use client";

import { useState, useCallback } from "react";
import Turnstile from "@/components/ui/Turnstile";
import { trackEvent } from "@/lib/gtm";

const serviceOptions = [
  "SEO & Search Marketing",
  "Web Design & Development",
  "Social Media Marketing",
  "PPC & Google Ads",
  "Branding & Identity",
  "Content Marketing",
  "Full-Service Package",
  "Other",
];

export default function ContactForm() {
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
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      turnstileToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        trackEvent("contact_form_submit", {
          service: data.service || "not_selected",
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

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/25 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-10 space-y-5 text-center">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block font-display text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 text-center">Name *</label>
          <input type="text" id="name" name="name" required placeholder="John Doe" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="block font-display text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 text-center">Email *</label>
          <input type="email" id="email" name="email" required placeholder="john@company.com" className={inputClass} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block font-display text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 text-center">Phone</label>
          <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567" className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className="block font-display text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 text-center">Company</label>
          <input type="text" id="company" name="company" placeholder="Company Name" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="service" className="block font-display text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 text-center">Service Interest</label>
        <select id="service" name="service" className={`${inputClass} [&>option]:bg-slate-900 [&>option]:text-white`}>
          <option value="">Select a service...</option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block font-display text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 text-center">Message *</label>
        <textarea id="message" name="message" required rows={5} placeholder="Tell us about your project..." className={inputClass} />
      </div>
      <Turnstile onVerify={handleVerify} onExpire={handleExpire} className="flex justify-center" />
      <button
        type="submit"
        disabled={status === "loading" || !turnstileToken}
        className="w-full py-3.5 rounded-lg bg-amber text-slate-950 font-display text-sm font-semibold uppercase tracking-wider hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25 transition-all disabled:opacity-50 cursor-pointer"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-emerald text-sm text-center">Thank you! We&apos;ll be in touch within 24 hours.</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm text-center">Something went wrong. Please try again or email us directly.</p>
      )}
    </form>
  );
}
