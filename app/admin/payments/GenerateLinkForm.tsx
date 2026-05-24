"use client";

import { useState } from "react";
import { Copy, Check, Link as LinkIcon } from "lucide-react";

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";
const labelClass =
  "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5";

export default function GenerateLinkForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || !description) return;

    setStatus("loading");
    setErrorMsg("");
    setGeneratedUrl("");
    setCopied(false);

    try {
      const cents = Math.round(parseFloat(amount) * 100);
      if (isNaN(cents) || cents < 100) {
        setErrorMsg("Amount must be at least $1.00");
        setStatus("error");
        return;
      }

      const res = await fetch("/api/pay/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cents,
          description,
          email: email || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to generate link");
        setStatus("error");
        return;
      }

      setGeneratedUrl(data.url);
      setStatus("success");
    } catch {
      setErrorMsg("Network error");
      setStatus("error");
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleGenerate} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="payment-amount" className={labelClass}>Amount ($) *</label>
            <input
              id="payment-amount"
              className={inputClass}
              type="number"
              step="0.01"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="150.00"
              required
            />
          </div>
          <div>
            <label htmlFor="payment-client-email" className={labelClass}>Client Email (optional)</label>
            <input
              id="payment-client-email"
              className={inputClass}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@example.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="payment-description" className={labelClass}>Description *</label>
          <input
            id="payment-description"
            className={inputClass}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Website Design Consultation"
            required
          />
        </div>

        {errorMsg && (
          <div className="bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-sm text-red-400">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading" || !amount || !description}
          className="px-6 py-2.5 rounded-lg bg-emerald-500 text-slate-950 text-sm font-display font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Generating..." : "Generate Payment Link"}
        </button>
      </form>

      {generatedUrl && (
        <div className="bg-emerald/5 border border-emerald/20 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-emerald">
            <LinkIcon size={16} />
            <span className="text-xs font-display font-semibold uppercase tracking-wider">
              Payment Link Generated
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={generatedUrl}
              aria-label="Generated payment link URL"
              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 font-mono"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-xs font-display font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
