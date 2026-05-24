interface ClientStatusBadgeProps {
  status: string;
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "bg-emerald-400/10 text-emerald-400",
  PROSPECT: "bg-blue-400/10 text-blue-400",
  PAUSED: "bg-amber-400/10 text-amber-400",
  CHURNED: "bg-red-400/10 text-red-400",
};

export default function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
  const colorClass = STATUS_COLORS[status] || STATUS_COLORS.PROSPECT;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${colorClass}`}>
      {status}
    </span>
  );
}
