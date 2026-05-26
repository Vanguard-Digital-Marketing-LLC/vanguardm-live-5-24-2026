"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, AlertTriangle } from "lucide-react";

interface Props {
  leadId: string;
  initialBrief: string | null;
  initialAiScore: number | null;
  initialAiReason: string | null;
  initialSubject: string | null;
  initialBody: string | null;
  initialAnalyzedAt: string | null;
}

export default function LeadAiAssist(props: Props) {
  const [brief, setBrief] = useState(props.initialBrief);
  const [aiScore, setAiScore] = useState(props.initialAiScore);
  const [reason, setReason] = useState(props.initialAiReason);
  const [subject, setSubject] = useState(props.initialSubject ?? "");
  const [body, setBody] = useState(props.initialBody ?? "");
  const [analyzedAt, setAnalyzedAt] = useState(props.initialAnalyzedAt);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [flagged, setFlagged] = useState(false);
  const [flagReason, setFlagReason] = useState("");
  const [copied, setCopied] = useState(false);

  async function run() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/leads/${props.leadId}/analyze`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Analysis failed.");
        return;
      }
      setBrief(data.researchBrief || null);
      setAiScore(data.intentScore ?? null);
      setReason(data.reason || null);
      setFlagged(!!data.flagged);
      setFlagReason(data.flagReason || "");
      setSubject(data.followup?.subject ?? "");
      setBody(data.followup?.body ?? "");
      setAnalyzedAt(new Date().toISOString());
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  const hasResult = brief || aiScore !== null || subject || body || flagged;

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-base font-semibold text-white flex items-center gap-2">
          <Sparkles size={16} className="text-emerald-400" /> AI assist
        </h2>
        <button
          onClick={run}
          disabled={loading}
          className="text-xs font-display font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Analyzing…" : hasResult ? "Regenerate" : "Generate brief & draft"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-400/10 border border-red-400/20 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {flagged && (
        <div className="mb-4 rounded-lg bg-amber-400/10 border border-amber-400/20 p-3 text-sm text-amber-300 flex items-start gap-2">
          <AlertTriangle size={15} className="mt-0.5 flex-shrink-0" />
          <span>Flagged for review{flagReason ? `: ${flagReason}` : ""}. No follow-up was drafted.</span>
        </div>
      )}

      {!hasResult && !error && (
        <p className="text-sm text-slate-500">
          Generate a fact-based research brief, an AI intent score, and a follow-up email draft from this lead&apos;s own data.
        </p>
      )}

      {brief && (
        <div className="mb-5">
          <h3 className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5">
            Research brief
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{brief}</p>
        </div>
      )}

      {aiScore !== null && (
        <div className="mb-5">
          <h3 className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5">
            AI intent score
          </h3>
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-bold text-emerald-400">{aiScore}</span>
            <span className="text-xs text-slate-500">/ 100</span>
          </div>
          {reason && <p className="text-xs text-slate-400 mt-1">{reason}</p>}
        </div>
      )}

      {(subject || body) && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold">
              Follow-up draft (review before sending)
            </h3>
            <button
              onClick={copyDraft}
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-full mb-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            placeholder="Email body"
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-y"
          />
        </div>
      )}

      {analyzedAt && (
        <p className="text-[10px] text-slate-600 mt-4">
          Last analyzed {new Date(analyzedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}
