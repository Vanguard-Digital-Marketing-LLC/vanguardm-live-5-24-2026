"use client";

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  DRAFT: { bg: "bg-slate-500/10", text: "text-slate-400", label: "Draft" },
  IN_PROGRESS: { bg: "bg-amber-500/10", text: "text-amber-400", label: "In Progress" },
  SUBMITTED: { bg: "bg-cyan-500/10", text: "text-cyan-400", label: "Submitted" },
  COMPLETED: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Completed" },
};

export default function OnboardingStatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.DRAFT;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}
