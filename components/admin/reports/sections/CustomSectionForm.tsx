"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface CustomData {
  content?: string;
  keyValuePairs?: { key: string; value: string }[];
  chartType?: "bar" | "line" | "pie" | "";
  chartData?: { label: string; value: number }[];
}

interface CustomSectionFormProps {
  data: CustomData;
  onChange: (data: CustomData) => void;
}

export default function CustomSectionForm({ data, onChange }: CustomSectionFormProps) {
  const [localData, setLocalData] = useState<CustomData>({
    content: "",
    keyValuePairs: [],
    chartType: "",
    chartData: [],
    ...data,
  });

  function update(partial: Partial<CustomData>) {
    const next = { ...localData, ...partial };
    setLocalData(next);
    onChange(next);
  }

  // Key-Value Pairs helpers
  function addKV() {
    update({ keyValuePairs: [...(localData.keyValuePairs || []), { key: "", value: "" }] });
  }
  function removeKV(idx: number) {
    update({ keyValuePairs: (localData.keyValuePairs || []).filter((_, i) => i !== idx) });
  }
  function updateKV(idx: number, field: string, value: string) {
    const entries = [...(localData.keyValuePairs || [])];
    entries[idx] = { ...entries[idx], [field]: value };
    update({ keyValuePairs: entries });
  }

  // Chart Data helpers
  function addChartPoint() {
    update({ chartData: [...(localData.chartData || []), { label: "", value: 0 }] });
  }
  function removeChartPoint(idx: number) {
    update({ chartData: (localData.chartData || []).filter((_, i) => i !== idx) });
  }
  function updateChartPoint(idx: number, field: string, value: string | number) {
    const entries = [...(localData.chartData || [])];
    entries[idx] = { ...entries[idx], [field]: value };
    update({ chartData: entries });
  }

  return (
    <div className="space-y-6">
      {/* Rich Text Notes */}
      <div>
        <label htmlFor="custom-content" className="block text-xs text-slate-400 mb-1">Notes / Content</label>
        <textarea
          id="custom-content"
          value={localData.content || ""}
          onChange={(e) => update({ content: e.target.value })}
          rows={6}
          placeholder="Write your notes, insights, or recommendations here..."
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none resize-y"
        />
      </div>

      {/* Key-Value Data Pairs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key Metrics / Data Points</span>
          <button type="button" onClick={addKV} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
            <Plus size={14} /> Add Pair
          </button>
        </div>
        {(localData.keyValuePairs || []).length > 0 && (
          <div className="space-y-2">
            {(localData.keyValuePairs || []).map((kv, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_1fr_32px] gap-2">
                <input
                  type="text"
                  value={kv.key}
                  onChange={(e) => updateKV(idx, "key", e.target.value)}
                  aria-label="Metric name"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="Metric name"
                />
                <input
                  type="text"
                  value={kv.value}
                  onChange={(e) => updateKV(idx, "value", e.target.value)}
                  aria-label="Value"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="Value"
                />
                <button type="button" onClick={() => removeKV(idx)} className="text-red-400/60 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Optional Chart */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Optional Chart</span>
        </div>
        <div className="flex items-center gap-4 mb-3">
          <label htmlFor="custom-chart-type" className="block text-xs text-slate-400">Chart Type</label>
          <select
            id="custom-chart-type"
            value={localData.chartType || ""}
            onChange={(e) => update({ chartType: e.target.value as CustomData["chartType"] })}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500/50 focus:outline-none"
          >
            <option value="" className="bg-slate-900">None</option>
            <option value="bar" className="bg-slate-900">Bar Chart</option>
            <option value="line" className="bg-slate-900">Line Chart</option>
            <option value="pie" className="bg-slate-900">Pie Chart</option>
          </select>
        </div>

        {localData.chartType && (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">Chart Data Points</span>
              <button type="button" onClick={addChartPoint} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
                <Plus size={14} /> Add Point
              </button>
            </div>
            {(localData.chartData || []).length > 0 && (
              <div className="space-y-2">
                <div className="grid grid-cols-[1fr_120px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
                  <span>Label</span><span>Value</span><span />
                </div>
                {(localData.chartData || []).map((point, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_120px_32px] gap-2">
                    <input
                      type="text"
                      value={point.label}
                      onChange={(e) => updateChartPoint(idx, "label", e.target.value)}
                      aria-label="Label"
                      className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                      placeholder="Label"
                    />
                    <input
                      type="number"
                      value={point.value || ""}
                      onChange={(e) => updateChartPoint(idx, "value", parseFloat(e.target.value) || 0)}
                      aria-label="Value"
                      className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                    />
                    <button type="button" onClick={() => removeChartPoint(idx)} className="text-red-400/60 hover:text-red-400">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
