"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Loader2, Sparkles } from "lucide-react";

type Client = { id: string; name: string };

const TEMPLATES = [
  {
    key: "brief-writer",
    label: "Brief writer",
    blurb: "One-page creative brief for a new piece of content.",
  },
  {
    key: "serp-analyst",
    label: "SERP analyst",
    blurb: "Analyse search-intent for a target query and recommend an angle.",
  },
  {
    key: "content-drafter",
    label: "Content drafter",
    blurb: "First-draft copy: blog post, email, or ad.",
  },
] as const;

export default function AgentLauncherButton({
  clients,
  defaultClientId,
}: {
  clients: Client[];
  defaultClientId?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"pick" | "fill">("pick");
  const [templateKey, setTemplateKey] = useState<(typeof TEMPLATES)[number]["key"]>("brief-writer");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [clientId, setClientId] = useState(defaultClientId || "");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const tpl = TEMPLATES.find((t) => t.key === templateKey)!;

  const reset = () => {
    setStep("pick");
    setTopic("");
    setNotes("");
    setErr(null);
    if (!defaultClientId) setClientId("");
  };

  const submit = async () => {
    setErr(null);
    if (!topic.trim()) {
      setErr("Topic is required");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/agent/template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateKey,
          topic: topic.trim(),
          notes: notes.trim() || undefined,
          clientId: clientId || undefined,
        }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        setErr(e.error || `Failed (${res.status})`);
        setSubmitting(false);
      } else {
        const { agentRunId } = await res.json();
        setOpen(false);
        reset();
        router.push(`/admin/agents/${agentRunId}`);
      }
    } catch {
      setErr("Network error");
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          reset();
          setOpen(true);
        }}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium"
      >
        <Sparkles size={16} /> Run agent
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center pt-[10vh] px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => !submitting && setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg bg-[#111827] border border-white/10 rounded-xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-1">
              <Bot size={18} className="text-emerald-400" />
              <h2 className="font-display text-lg font-semibold text-white">Run agent</h2>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              {step === "pick" ? "Pick a template — content runs use Claude directly." : tpl.blurb}
            </p>

            {err && <p className="mb-3 text-xs text-red-400">{err}</p>}

            {step === "pick" ? (
              <div className="space-y-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => {
                      setTemplateKey(t.key);
                      setStep("fill");
                    }}
                    className="w-full text-left p-4 rounded-lg bg-white/5 hover:bg-white/8 border border-white/8 hover:border-emerald-400/30 transition-colors"
                  >
                    <p className="text-sm font-medium text-white">{t.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{t.blurb}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {clients.length > 0 && !defaultClientId && (
                  <div>
                    <label htmlFor="agent-client" className={labelCls}>Client (optional)</label>
                    <select
                      id="agent-client"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      className={inputCls}
                    >
                      <option value="">— No client context —</option>
                      {clients.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label htmlFor="agent-topic" className={labelCls}>Topic</label>
                  <input
                    id="agent-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    autoFocus
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="agent-notes" className={labelCls}>Notes (optional)</label>
                  <textarea
                    id="agent-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className={`${inputCls} resize-none`}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-6">
              {step === "fill" ? (
                <button
                  onClick={() => setStep("pick")}
                  disabled={submitting}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Different template
                </button>
              ) : (
                <span />
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setOpen(false)}
                  disabled={submitting}
                  className="h-9 px-3 rounded-md text-sm text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                {step === "fill" && (
                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium disabled:opacity-50"
                  >
                    {submitting && <Loader2 size={14} className="animate-spin" />}
                    Run {tpl.label}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const labelCls = "block text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1.5";
const inputCls =
  "w-full h-9 px-3 rounded-md bg-[#0D1117] border border-white/8 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-400/40";
