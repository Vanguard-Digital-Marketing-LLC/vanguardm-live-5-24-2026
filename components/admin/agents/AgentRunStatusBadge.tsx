const STYLES: Record<string, { bg: string; fg: string; dot: string; label: string }> = {
  QUEUED:    { bg: "bg-slate-500/15", fg: "text-slate-300",  dot: "bg-slate-400",   label: "Queued" },
  RUNNING:   { bg: "bg-blue-500/15",  fg: "text-blue-300",   dot: "bg-blue-400 animate-pulse", label: "Running" },
  COMPLETED: { bg: "bg-emerald-500/15", fg: "text-emerald-300", dot: "bg-emerald-400", label: "Completed" },
  FAILED:    { bg: "bg-red-500/15",   fg: "text-red-300",    dot: "bg-red-400",     label: "Failed" },
};

export default function AgentRunStatusBadge({ status }: { status: string }) {
  const s = STYLES[status] || STYLES.QUEUED;
  return (
    <span
      className={`inline-flex items-center gap-1.5 h-5 px-2 rounded-full text-[10px] font-semibold ${s.bg} ${s.fg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
