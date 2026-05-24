"use client";

import { useState, useCallback } from "react";
import { Check, Edit2, FileText, AlertTriangle } from "lucide-react";
import Turnstile from "@/components/ui/Turnstile";
import FileList, { type OnboardingFileData } from "../FileList";

interface ReviewStepProps {
  responses: Record<string, Record<string, unknown>>;
  files: OnboardingFileData[];
  steps: { key: string; label: string }[];
  serviceTypes: string[];
  mode: "admin" | "client";
  onEditStep: (stepIndex: number) => void;
  onDownloadFile: (fileId: string) => void;
  onSubmit: (turnstileToken?: string) => Promise<void>;
}

function summarizeSection(data: Record<string, unknown>): { filled: number; total: number } {
  const keys = Object.keys(data);
  const filled = keys.filter((k) => {
    const v = data[k];
    if (v === null || v === undefined || v === "") return false;
    if (Array.isArray(v) && v.length === 0) return false;
    return true;
  }).length;
  return { filled, total: keys.length };
}

export default function ReviewStep({
  responses,
  files,
  steps,
  serviceTypes,
  mode,
  onEditStep,
  onDownloadFile,
  onSubmit,
}: ReviewStepProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const questionnaireSteps = steps.filter(
    (s) => s.key !== "files" && s.key !== "review"
  );

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const handleSubmit = async () => {
    if (!confirmed && mode === "client") return;
    if (mode === "client" && !turnstileToken) {
      setError("Please complete the verification challenge.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await onSubmit(turnstileToken || undefined);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2 mb-2">
          Review & Submit
        </h3>
        <p className="text-sm text-slate-400">
          Review your responses below. Click &quot;Edit&quot; on any section to make changes.
        </p>
      </div>

      {/* Section summaries */}
      <div className="space-y-3">
        {questionnaireSteps.map((step, i) => {
          const data = (responses[step.key] || {}) as Record<string, unknown>;
          const sectionData = responses[step.key] || {};
          const { filled, total } = summarizeSection(data);
          const pct = total > 0 ? Math.round((filled / total) * 100) : 0;

          return (
            <div
              key={step.key}
              className="px-4 py-3 rounded-lg bg-white/[0.03] border border-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {pct >= 50 ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check size={12} className="text-emerald-400" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <AlertTriangle size={12} className="text-amber-400" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-white font-medium">{step.label}</p>
                    <p className="text-xs text-slate-500">
                      {filled} of {total} fields completed ({pct}%)
                      <button
                        onClick={() => setExpanded((prev) => ({ ...prev, [step.key]: !prev[step.key] }))}
                        className="text-xs text-emerald-400 hover:text-emerald-300 ml-2"
                      >
                        {expanded[step.key] ? "Hide" : "Preview"}
                      </button>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onEditStep(i)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Edit2 size={12} />
                  Edit
                </button>
              </div>
              {expanded[step.key] && sectionData && (
                <div className="mt-2 space-y-1 border-t border-white/5 pt-2">
                  {Object.entries(sectionData)
                    .filter(([, v]) => v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))
                    .map(([k, v]) => (
                      <div key={k} className="flex gap-2 text-xs">
                        <span className="text-slate-500 min-w-[160px] capitalize">{k.replace(/_/g, " ")}:</span>
                        <span className="text-slate-300 truncate">{Array.isArray(v) ? (v as string[]).join(", ") : String(v)}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Services summary */}
      <div className="px-4 py-3 rounded-lg bg-white/[0.03] border border-white/5">
        <p className="text-xs text-slate-400 mb-2">Services Selected</p>
        <div className="flex flex-wrap gap-2">
          {serviceTypes.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Files summary */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-slate-400" />
          <p className="text-sm text-white font-medium">
            Uploaded Files ({files.length})
          </p>
        </div>
        {files.length > 0 ? (
          <FileList files={files} onDownload={onDownloadFile} />
        ) : (
          <p className="text-xs text-slate-500 italic">No files uploaded</p>
        )}
      </div>

      {/* Turnstile widget (client mode) */}
      {mode === "client" && (
        <Turnstile
          onVerify={handleTurnstileVerify}
          onExpire={handleTurnstileExpire}
        />
      )}

      {/* Confirmation + Submit */}
      {(() => {
        const businessInfo = (responses["business_info"] || {}) as Record<string, unknown>;
        const missingRequired = ["legal_name", "industry", "primary_contact_name", "primary_contact_email"]
          .filter((f) => !businessInfo[f]);
        const canSubmit = missingRequired.length === 0;

        return (
          <div className="border-t border-white/10 pt-6 space-y-4">
            {mode === "client" && (
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-0.5 accent-emerald-500"
                />
                <span className="text-sm text-slate-300">
                  I confirm that the information provided is accurate to the best of my knowledge
                  and I&apos;m ready to submit.
                </span>
              </label>
            )}

            {missingRequired.length > 0 && (
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-sm text-amber-300">
                Missing required fields in Business Information:{" "}
                {missingRequired.map((f) => f.replace(/_/g, " ")).join(", ")}
              </div>
            )}

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={!canSubmit || submitting || (mode === "client" && (!confirmed || !turnstileToken))}
              className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Submitting..."
                : mode === "admin"
                ? "Mark as Complete"
                : "Submit Questionnaire"}
            </button>
          </div>
        );
      })()}
    </div>
  );
}
