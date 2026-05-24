"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Send, Check, FileBarChart, Loader2 } from "lucide-react";
import OnboardingWizard from "@/components/admin/onboarding/OnboardingWizard";
import type { OnboardingFileData } from "@/components/admin/onboarding/FileList";

interface WizardProps {
  onboardingId: string;
  clientName: string;
  serviceTypes: string[];
  initialResponses: Record<string, Record<string, unknown>>;
  initialFiles: OnboardingFileData[];
  initialStep: number;
  mode: "admin";
}

interface OnboardingDetailClientProps {
  onboardingId: string;
  clientLink: string;
  hasEmail: boolean;
  status: string;
  wizardProps?: WizardProps;
}

export default function OnboardingDetailClient({
  onboardingId,
  clientLink,
  hasEmail,
  status,
  wizardProps,
}: OnboardingDetailClientProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");

  const copyLink = async () => {
    await navigator.clipboard.writeText(clientLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendInvite = async () => {
    setSending(true);
    setSendError("");
    try {
      const res = await fetch(`/api/admin/onboarding/${onboardingId}/invite`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (e) {
      setSendError(e instanceof Error ? e.message : "Failed");
    } finally {
      setSending(false);
    }
  };

  const generateReport = async () => {
    setGenerating(true);
    setGenError("");
    try {
      const res = await fetch(`/api/admin/onboarding/${onboardingId}/generate-report`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate report");
      }
      const report = await res.json();
      router.push(`/admin/reports/${report.id}/edit`);
    } catch (e) {
      setGenError(e instanceof Error ? e.message : "Failed to generate report");
    } finally {
      setGenerating(false);
    }
  };

  // If wizardProps provided, render the wizard
  if (wizardProps) {
    return <OnboardingWizard {...wizardProps} />;
  }

  // Otherwise render action buttons (used in the info card)
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-white/5 text-slate-300 hover:bg-white/10 transition-colors"
        title="Copy link"
      >
        {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>
      {hasEmail && status !== "COMPLETED" && (
        <button
          onClick={sendInvite}
          disabled={sending}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
        >
          {sent ? (
            <>
              <Check size={12} />
              Sent
            </>
          ) : sending ? (
            "Sending..."
          ) : (
            <>
              <Send size={12} />
              Send Invite
            </>
          )}
        </button>
      )}
      {status === "COMPLETED" && (
        <button
          onClick={generateReport}
          disabled={generating}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors disabled:opacity-50"
        >
          {generating ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileBarChart size={12} />
              Generate Report
            </>
          )}
        </button>
      )}
      {sendError && <span className="text-xs text-red-400">{sendError}</span>}
      {genError && <span className="text-xs text-red-400">{genError}</span>}
    </div>
  );
}
