interface BadgeProps {
  label: string;
  variant?: "emerald" | "amber" | "red" | "slate" | "cyan" | "purple";
}

const VARIANT_CLASSES = {
  emerald: "bg-emerald/10 text-emerald",
  amber: "bg-amber/10 text-amber",
  red: "bg-red-400/10 text-red-400",
  slate: "bg-white/10 text-slate-400",
  cyan: "bg-cyan-400/10 text-cyan-400",
  purple: "bg-purple-400/10 text-purple-400",
};

export default function Badge({ label, variant = "slate" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${VARIANT_CLASSES[variant]}`}
    >
      {label}
    </span>
  );
}
