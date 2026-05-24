"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface CallsData {
  totalCalls?: number;
  answeredCalls?: number;
  missedCalls?: number;
  avgDurationSeconds?: number;
  callsByDay?: { date: string; count: number }[];
  topSources?: { source: string; calls: number }[];
  recentCalls?: { date: string; caller: string; duration: number; status: string }[];
}

interface CallsSectionFormProps {
  data: CallsData;
  onChange: (data: CallsData) => void;
}

export default function CallsSectionForm({ data, onChange }: CallsSectionFormProps) {
  const [localData, setLocalData] = useState<CallsData>({
    totalCalls: 0,
    answeredCalls: 0,
    missedCalls: 0,
    avgDurationSeconds: 0,
    callsByDay: [],
    topSources: [],
    recentCalls: [],
    ...data,
  });

  function update(partial: Partial<CallsData>) {
    const next = { ...localData, ...partial };
    setLocalData(next);
    onChange(next);
  }

  function addCallDay() {
    const callsByDay = [...(localData.callsByDay || []), { date: "", count: 0 }];
    update({ callsByDay });
  }

  function removeCallDay(idx: number) {
    const callsByDay = (localData.callsByDay || []).filter((_, i) => i !== idx);
    update({ callsByDay });
  }

  function updateCallDay(idx: number, field: string, value: string | number) {
    const callsByDay = [...(localData.callsByDay || [])];
    callsByDay[idx] = { ...callsByDay[idx], [field]: value };
    update({ callsByDay });
  }

  function addSource() {
    const topSources = [...(localData.topSources || []), { source: "", calls: 0 }];
    update({ topSources });
  }

  function removeSource(idx: number) {
    const topSources = (localData.topSources || []).filter((_, i) => i !== idx);
    update({ topSources });
  }

  function updateSource(idx: number, field: string, value: string | number) {
    const topSources = [...(localData.topSources || [])];
    topSources[idx] = { ...topSources[idx], [field]: value };
    update({ topSources });
  }

  function addRecentCall() {
    const recentCalls = [...(localData.recentCalls || []), { date: "", caller: "", duration: 0, status: "Answered" }];
    update({ recentCalls });
  }

  function removeRecentCall(idx: number) {
    const recentCalls = (localData.recentCalls || []).filter((_, i) => i !== idx);
    update({ recentCalls });
  }

  function updateRecentCall(idx: number, field: string, value: string | number) {
    const recentCalls = [...(localData.recentCalls || [])];
    recentCalls[idx] = { ...recentCalls[idx], [field]: value };
    update({ recentCalls });
  }

  const inputClass = "w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none";

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="calls-total" className="block text-xs text-slate-400 mb-1">Total Calls</label>
          <input id="calls-total" type="number" value={localData.totalCalls || ""} onChange={(e) => update({ totalCalls: parseInt(e.target.value) || 0 })} className={inputClass} placeholder="0" />
        </div>
        <div>
          <label htmlFor="calls-answered" className="block text-xs text-slate-400 mb-1">Answered Calls</label>
          <input id="calls-answered" type="number" value={localData.answeredCalls || ""} onChange={(e) => update({ answeredCalls: parseInt(e.target.value) || 0 })} className={inputClass} placeholder="0" />
        </div>
        <div>
          <label htmlFor="calls-missed" className="block text-xs text-slate-400 mb-1">Missed Calls</label>
          <input id="calls-missed" type="number" value={localData.missedCalls || ""} onChange={(e) => update({ missedCalls: parseInt(e.target.value) || 0 })} className={inputClass} placeholder="0" />
        </div>
        <div>
          <label htmlFor="calls-avg-duration" className="block text-xs text-slate-400 mb-1">Avg Duration (sec)</label>
          <input id="calls-avg-duration" type="number" value={localData.avgDurationSeconds || ""} onChange={(e) => update({ avgDurationSeconds: parseInt(e.target.value) || 0 })} className={inputClass} placeholder="0" />
        </div>
      </div>

      {/* Calls by Day */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Calls by Day</span>
          <button type="button" onClick={addCallDay} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
            <Plus size={14} /> Add Day
          </button>
        </div>
        {(localData.callsByDay || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_100px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Date</span><span>Count</span><span />
            </div>
            {(localData.callsByDay || []).map((d, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_100px_32px] gap-2">
                <input type="text" value={d.date} onChange={(e) => updateCallDay(idx, "date", e.target.value)} aria-label="Date" className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none" placeholder="MM/DD" />
                <input type="number" value={d.count || ""} onChange={(e) => updateCallDay(idx, "count", parseInt(e.target.value) || 0)} aria-label="Count" className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none" />
                <button type="button" onClick={() => removeCallDay(idx)} className="text-red-400/60 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Sources */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Sources</span>
          <button type="button" onClick={addSource} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
            <Plus size={14} /> Add Source
          </button>
        </div>
        {(localData.topSources || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_100px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Source</span><span>Calls</span><span />
            </div>
            {(localData.topSources || []).map((s, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_100px_32px] gap-2">
                <input type="text" value={s.source} onChange={(e) => updateSource(idx, "source", e.target.value)} aria-label="Source" className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none" placeholder="Source name" />
                <input type="number" value={s.calls || ""} onChange={(e) => updateSource(idx, "calls", parseInt(e.target.value) || 0)} aria-label="Calls" className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none" />
                <button type="button" onClick={() => removeSource(idx)} className="text-red-400/60 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Calls */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recent Calls</span>
          <button type="button" onClick={addRecentCall} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
            <Plus size={14} /> Add Call
          </button>
        </div>
        {(localData.recentCalls || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[120px_1fr_80px_100px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Date</span><span>Caller</span><span>Duration</span><span>Status</span><span />
            </div>
            {(localData.recentCalls || []).map((c, idx) => (
              <div key={idx} className="grid grid-cols-[120px_1fr_80px_100px_32px] gap-2">
                <input type="text" value={c.date} onChange={(e) => updateRecentCall(idx, "date", e.target.value)} aria-label="Date" className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none" placeholder="YYYY-MM-DD" />
                <input type="text" value={c.caller} onChange={(e) => updateRecentCall(idx, "caller", e.target.value)} aria-label="Caller" className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none" placeholder="Phone number" />
                <input type="number" value={c.duration || ""} onChange={(e) => updateRecentCall(idx, "duration", parseInt(e.target.value) || 0)} aria-label="Duration" className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none" placeholder="sec" />
                <select value={c.status} onChange={(e) => updateRecentCall(idx, "status", e.target.value)} aria-label="Status" className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none">
                  <option value="Answered">Answered</option>
                  <option value="Missed">Missed</option>
                </select>
                <button type="button" onClick={() => removeRecentCall(idx)} className="text-red-400/60 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
