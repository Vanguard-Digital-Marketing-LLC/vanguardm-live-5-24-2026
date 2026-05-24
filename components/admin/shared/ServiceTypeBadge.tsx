interface ServiceTypeBadgeProps {
  type: string;
}

const SERVICE_COLORS: Record<string, string> = {
  SMA: "bg-purple-400/10 text-purple-400",
  PPC: "bg-blue-400/10 text-blue-400",
  WEB: "bg-cyan-400/10 text-cyan-400",
  SUPPORT: "bg-amber-400/10 text-amber-400",
  SEO: "bg-emerald-400/10 text-emerald-400",
  REPORTING: "bg-slate-400/10 text-slate-400",
};

export default function ServiceTypeBadge({ type }: ServiceTypeBadgeProps) {
  const colorClass = SERVICE_COLORS[type] || SERVICE_COLORS.REPORTING;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${colorClass}`}>
      {type}
    </span>
  );
}
