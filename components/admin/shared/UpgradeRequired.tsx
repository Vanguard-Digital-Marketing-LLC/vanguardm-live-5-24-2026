import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { FEATURE_LABELS } from "@/lib/plan-features";

export default function UpgradeRequired({
  feature,
  currentPlan,
}: {
  feature: string;
  currentPlan: string;
}) {
  const meta =
    FEATURE_LABELS[feature] ?? {
      name: feature,
      minPlan: "Pro",
      blurb: "This feature requires a higher plan tier.",
    };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-[#111827] border border-amber-400/20 rounded-xl p-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center mx-auto mb-4">
          <Lock size={20} className="text-amber-400" />
        </div>
        <h1 className="font-display text-xl font-bold text-white">
          {meta.name} requires {meta.minPlan}
        </h1>
        <p className="text-sm text-slate-400 mt-2">{meta.blurb}</p>
        <p className="text-xs text-slate-500 mt-4">
          Current plan: <span className="text-slate-300 font-medium">{currentPlan}</span>
        </p>
        <Link
          href="/admin/settings/billing"
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium mt-5"
        >
          Compare plans <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
