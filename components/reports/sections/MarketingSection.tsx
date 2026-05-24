"use client";

import { Target, TrendingUp, Calendar, DollarSign } from "lucide-react";

interface MarketingData {
  strategyType?: string;
  recommendations?: string;
  kpis?: { metric: string; target: string; current: string }[];
  timeline?: { phase: string; description: string; duration: string }[];
  budgetRecommendation?: string;
}

const STRATEGY_LABELS: Record<string, string> = {
  content: "Content Marketing",
  ppc: "PPC / Paid Advertising",
  social: "Social Media",
  full_funnel: "Full Funnel Strategy",
  seo: "SEO Strategy",
  email: "Email Marketing",
};

const PHASE_COLORS = ["#e74c3c", "#f39c12", "#3498db", "#27ae60", "#8b5cf6", "#ec4899"];

function MetricCard({ label, value, accent = "white" }: { label: string; value: string | number; accent?: string }) {
  const colorMap: Record<string, string> = {
    white: "text-white",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    cyan: "text-cyan-400",
    blue: "text-blue-400",
  };
  return (
    <div className="bg-white/[0.03] border border-white/6 rounded-lg p-4">
      <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${colorMap[accent] || "text-white"}`}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  );
}

export default function MarketingSection({ data }: { data: MarketingData }) {
  const strategyType = data.strategyType || "full_funnel";
  const recommendations = data.recommendations || "";
  const kpis = data.kpis || [];
  const timeline = data.timeline || [];
  const budget = data.budgetRecommendation || "";

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/[0.03] border border-white/6 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target size={14} className="text-emerald-400" />
            <p className="text-xs text-slate-500 uppercase tracking-wider">Strategy</p>
          </div>
          <p className="text-sm font-semibold text-white">{STRATEGY_LABELS[strategyType] || strategyType}</p>
        </div>
        {budget && (
          <div className="bg-white/[0.03] border border-white/6 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={14} className="text-amber-400" />
              <p className="text-xs text-slate-500 uppercase tracking-wider">Budget</p>
            </div>
            <p className="text-sm font-semibold text-white">{budget}</p>
          </div>
        )}
        {kpis.length > 0 && (
          <div className="bg-white/[0.03] border border-white/6 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={14} className="text-blue-400" />
              <p className="text-xs text-slate-500 uppercase tracking-wider">KPIs Tracked</p>
            </div>
            <p className="text-2xl font-bold text-white">{kpis.length}</p>
          </div>
        )}
        {timeline.length > 0 && (
          <div className="bg-white/[0.03] border border-white/6 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={14} className="text-cyan-400" />
              <p className="text-xs text-slate-500 uppercase tracking-wider">Phases</p>
            </div>
            <p className="text-2xl font-bold text-white">{timeline.length}</p>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {recommendations && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-white mb-3">Strategy Recommendations</h4>
          <div className="prose prose-invert prose-sm max-w-none">
            {recommendations.split("\n").map((line, idx) => (
              <p key={idx} className="text-sm text-slate-300 leading-relaxed mb-2 last:mb-0">
                {line || "\u00A0"}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* KPIs Table */}
      {kpis.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/6">
            <h4 className="text-sm font-semibold text-white">Target KPIs</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left px-4 py-2 text-xs text-slate-500 font-medium">Metric</th>
                  <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Current</th>
                  <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Target</th>
                  <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Progress</th>
                </tr>
              </thead>
              <tbody>
                {kpis.map((kpi, idx) => {
                  const current = parseFloat(kpi.current) || 0;
                  const target = parseFloat(kpi.target) || 1;
                  const progress = Math.min(Math.round((current / target) * 100), 100);
                  return (
                    <tr key={idx} className="border-b border-white/[0.03]">
                      <td className="px-4 py-3 text-sm text-white font-medium">{kpi.metric}</td>
                      <td className="px-4 py-3 text-sm text-slate-400 text-right">{kpi.current}</td>
                      <td className="px-4 py-3 text-sm text-emerald-400 text-right font-medium">{kpi.target}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-emerald-500"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400 w-8">{progress}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Timeline */}
      {timeline.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-white mb-4">Implementation Timeline</h4>
          <div className="space-y-0">
            {timeline.map((phase, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: PHASE_COLORS[idx % PHASE_COLORS.length] }}
                  />
                  {idx < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-white/6 my-1" />
                  )}
                </div>
                <div className="pb-5">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-white">{phase.phase}</span>
                    {phase.duration && (
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-400 uppercase tracking-wider">
                        {phase.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
