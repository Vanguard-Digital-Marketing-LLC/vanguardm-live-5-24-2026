import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  accent?: "emerald" | "amber" | "red" | "cyan" | "purple" | "slate";
}

const ACCENT_CLASSES = {
  emerald: "text-emerald bg-emerald/10",
  amber: "text-amber bg-amber/10",
  red: "text-red-400 bg-red-400/10",
  cyan: "text-cyan-400 bg-cyan-400/10",
  purple: "text-purple-400 bg-purple-400/10",
  slate: "text-slate-400 bg-slate-400/10",
};

export default function MetricCard({
  label,
  value,
  trend,
  icon: Icon,
  accent = "emerald",
}: MetricCardProps) {
  const accentClass = ACCENT_CLASSES[accent];

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl p-6 hover:border-white/12 transition-colors">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${accentClass}`}>
        <Icon size={20} />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-body font-bold text-white">{value}</span>
        {trend && (
          <span className="text-xs text-emerald font-medium">{trend}</span>
        )}
      </div>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  );
}
