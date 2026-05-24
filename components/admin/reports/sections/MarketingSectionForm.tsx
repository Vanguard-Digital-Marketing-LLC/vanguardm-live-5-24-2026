"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface MarketingData {
  strategyType?: string;
  recommendations?: string;
  kpis?: { metric: string; target: string; current: string }[];
  timeline?: { phase: string; description: string; duration: string }[];
  budgetRecommendation?: string;
}

interface MarketingSectionFormProps {
  data: MarketingData;
  onChange: (data: MarketingData) => void;
}

const STRATEGY_TYPES = [
  { value: "content", label: "Content Marketing" },
  { value: "ppc", label: "PPC / Paid Advertising" },
  { value: "social", label: "Social Media" },
  { value: "full_funnel", label: "Full Funnel Strategy" },
  { value: "seo", label: "SEO Strategy" },
  { value: "email", label: "Email Marketing" },
];

const inputClass =
  "w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none";

export default function MarketingSectionForm({ data, onChange }: MarketingSectionFormProps) {
  const [localData, setLocalData] = useState<MarketingData>({
    strategyType: "full_funnel",
    recommendations: "",
    kpis: [],
    timeline: [],
    budgetRecommendation: "",
    ...data,
  });

  function update(partial: Partial<MarketingData>) {
    const next = { ...localData, ...partial };
    setLocalData(next);
    onChange(next);
  }

  // KPI helpers
  function addKpi() {
    const kpis = [...(localData.kpis || []), { metric: "", target: "", current: "" }];
    update({ kpis });
  }

  function removeKpi(idx: number) {
    const kpis = (localData.kpis || []).filter((_, i) => i !== idx);
    update({ kpis });
  }

  function updateKpi(idx: number, field: string, value: string) {
    const kpis = [...(localData.kpis || [])];
    kpis[idx] = { ...kpis[idx], [field]: value };
    update({ kpis });
  }

  // Timeline helpers
  function addPhase() {
    const timeline = [...(localData.timeline || []), { phase: "", description: "", duration: "" }];
    update({ timeline });
  }

  function removePhase(idx: number) {
    const timeline = (localData.timeline || []).filter((_, i) => i !== idx);
    update({ timeline });
  }

  function updatePhase(idx: number, field: string, value: string) {
    const timeline = [...(localData.timeline || [])];
    timeline[idx] = { ...timeline[idx], [field]: value };
    update({ timeline });
  }

  return (
    <div className="space-y-6">
      {/* Strategy Type */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="marketing-strategy-type" className="block text-xs text-slate-400 mb-1">Strategy Type</label>
          <select
            id="marketing-strategy-type"
            value={localData.strategyType || "full_funnel"}
            onChange={(e) => update({ strategyType: e.target.value })}
            className={inputClass}
          >
            {STRATEGY_TYPES.map((st) => (
              <option key={st.value} value={st.value}>
                {st.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="marketing-budget" className="block text-xs text-slate-400 mb-1">Budget Recommendation</label>
          <input
            id="marketing-budget"
            type="text"
            value={localData.budgetRecommendation || ""}
            onChange={(e) => update({ budgetRecommendation: e.target.value })}
            className={inputClass}
            placeholder="e.g. $2,000-5,000/mo"
          />
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <label htmlFor="marketing-recommendations" className="block text-xs text-slate-400 mb-1">Strategy Recommendations</label>
        <textarea
          id="marketing-recommendations"
          value={localData.recommendations || ""}
          onChange={(e) => update({ recommendations: e.target.value })}
          rows={6}
          className={inputClass + " resize-y"}
          placeholder="Enter marketing strategy recommendations..."
        />
      </div>

      {/* KPIs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target KPIs</span>
          <button
            type="button"
            onClick={addKpi}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
          >
            <Plus size={14} /> Add KPI
          </button>
        </div>
        {(localData.kpis || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_120px_120px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Metric</span><span>Target</span><span>Current</span><span />
            </div>
            {(localData.kpis || []).map((kpi, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_120px_120px_32px] gap-2">
                <input
                  type="text"
                  value={kpi.metric}
                  onChange={(e) => updateKpi(idx, "metric", e.target.value)}
                  aria-label="Metric"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="e.g. Monthly Leads"
                />
                <input
                  type="text"
                  value={kpi.target}
                  onChange={(e) => updateKpi(idx, "target", e.target.value)}
                  aria-label="Target"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="e.g. 30"
                />
                <input
                  type="text"
                  value={kpi.current}
                  onChange={(e) => updateKpi(idx, "current", e.target.value)}
                  aria-label="Current"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="e.g. 10"
                />
                <button type="button" onClick={() => removeKpi(idx)} className="text-red-400/60 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Implementation Timeline</span>
          <button
            type="button"
            onClick={addPhase}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
          >
            <Plus size={14} /> Add Phase
          </button>
        </div>
        {(localData.timeline || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[140px_1fr_120px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Phase</span><span>Description</span><span>Duration</span><span />
            </div>
            {(localData.timeline || []).map((phase, idx) => (
              <div key={idx} className="grid grid-cols-[140px_1fr_120px_32px] gap-2">
                <input
                  type="text"
                  value={phase.phase}
                  onChange={(e) => updatePhase(idx, "phase", e.target.value)}
                  aria-label="Phase"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="e.g. Phase 1"
                />
                <input
                  type="text"
                  value={phase.description}
                  onChange={(e) => updatePhase(idx, "description", e.target.value)}
                  aria-label="Description"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="e.g. Foundation & Setup"
                />
                <input
                  type="text"
                  value={phase.duration}
                  onChange={(e) => updatePhase(idx, "duration", e.target.value)}
                  aria-label="Duration"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="e.g. Weeks 1-4"
                />
                <button type="button" onClick={() => removePhase(idx)} className="text-red-400/60 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
