"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface TrafficData {
  sessions?: number;
  pageviews?: number;
  bounceRate?: number;
  avgSessionDuration?: string;
  sessionsOverTime?: { date: string; sessions: number }[];
  topPages?: { page: string; views: number; bounceRate: number }[];
  sourceBreakdown?: { source: string; sessions: number; percentage: number }[];
}

interface TrafficSectionFormProps {
  data: TrafficData;
  onChange: (data: TrafficData) => void;
}

export default function TrafficSectionForm({ data, onChange }: TrafficSectionFormProps) {
  const [localData, setLocalData] = useState<TrafficData>({
    sessions: 0,
    pageviews: 0,
    bounceRate: 0,
    avgSessionDuration: "0:00",
    sessionsOverTime: [],
    topPages: [],
    sourceBreakdown: [],
    ...data,
  });

  function update(partial: Partial<TrafficData>) {
    const next = { ...localData, ...partial };
    setLocalData(next);
    onChange(next);
  }

  function addTimeEntry() {
    const entries = [...(localData.sessionsOverTime || []), { date: "", sessions: 0 }];
    update({ sessionsOverTime: entries });
  }

  function removeTimeEntry(idx: number) {
    const entries = (localData.sessionsOverTime || []).filter((_, i) => i !== idx);
    update({ sessionsOverTime: entries });
  }

  function updateTimeEntry(idx: number, field: string, value: string | number) {
    const entries = [...(localData.sessionsOverTime || [])];
    entries[idx] = { ...entries[idx], [field]: value };
    update({ sessionsOverTime: entries });
  }

  function addTopPage() {
    const pages = [...(localData.topPages || []), { page: "", views: 0, bounceRate: 0 }];
    update({ topPages: pages });
  }

  function removeTopPage(idx: number) {
    const pages = (localData.topPages || []).filter((_, i) => i !== idx);
    update({ topPages: pages });
  }

  function updateTopPage(idx: number, field: string, value: string | number) {
    const pages = [...(localData.topPages || [])];
    pages[idx] = { ...pages[idx], [field]: value };
    update({ topPages: pages });
  }

  function addSource() {
    const sources = [...(localData.sourceBreakdown || []), { source: "", sessions: 0, percentage: 0 }];
    update({ sourceBreakdown: sources });
  }

  function removeSource(idx: number) {
    const sources = (localData.sourceBreakdown || []).filter((_, i) => i !== idx);
    update({ sourceBreakdown: sources });
  }

  function updateSource(idx: number, field: string, value: string | number) {
    const sources = [...(localData.sourceBreakdown || [])];
    sources[idx] = { ...sources[idx], [field]: value };
    update({ sourceBreakdown: sources });
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="traffic-sessions" className="block text-xs text-slate-400 mb-1">Sessions</label>
          <input
            id="traffic-sessions"
            type="number"
            value={localData.sessions || ""}
            onChange={(e) => update({ sessions: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="traffic-pageviews" className="block text-xs text-slate-400 mb-1">Pageviews</label>
          <input
            id="traffic-pageviews"
            type="number"
            value={localData.pageviews || ""}
            onChange={(e) => update({ pageviews: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="traffic-bounce-rate" className="block text-xs text-slate-400 mb-1">Bounce Rate (%)</label>
          <input
            id="traffic-bounce-rate"
            type="number"
            step="0.1"
            value={localData.bounceRate || ""}
            onChange={(e) => update({ bounceRate: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0.0"
          />
        </div>
        <div>
          <label htmlFor="traffic-avg-duration" className="block text-xs text-slate-400 mb-1">Avg Session Duration</label>
          <input
            id="traffic-avg-duration"
            type="text"
            value={localData.avgSessionDuration || ""}
            onChange={(e) => update({ avgSessionDuration: e.target.value })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="2:30"
          />
        </div>
      </div>

      {/* Sessions Over Time */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sessions Over Time</span>
          <button
            type="button"
            onClick={addTimeEntry}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
          >
            <Plus size={14} /> Add Row
          </button>
        </div>
        {(localData.sessionsOverTime || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_120px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Date</span><span>Sessions</span><span />
            </div>
            {(localData.sessionsOverTime || []).map((entry, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_120px_32px] gap-2">
                <input
                  type="date"
                  value={entry.date}
                  onChange={(e) => updateTimeEntry(idx, "date", e.target.value)}
                  aria-label="Date"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <input
                  type="number"
                  value={entry.sessions || ""}
                  onChange={(e) => updateTimeEntry(idx, "sessions", parseInt(e.target.value) || 0)}
                  aria-label="Sessions"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <button type="button" onClick={() => removeTimeEntry(idx)} className="text-red-400/60 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Pages */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Pages</span>
          <button
            type="button"
            onClick={addTopPage}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
          >
            <Plus size={14} /> Add Page
          </button>
        </div>
        {(localData.topPages || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_100px_100px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Page</span><span>Views</span><span>Bounce %</span><span />
            </div>
            {(localData.topPages || []).map((page, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_100px_100px_32px] gap-2">
                <input
                  type="text"
                  value={page.page}
                  onChange={(e) => updateTopPage(idx, "page", e.target.value)}
                  aria-label="Page"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="/page-url"
                />
                <input
                  type="number"
                  value={page.views || ""}
                  onChange={(e) => updateTopPage(idx, "views", parseInt(e.target.value) || 0)}
                  aria-label="Views"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <input
                  type="number"
                  step="0.1"
                  value={page.bounceRate || ""}
                  onChange={(e) => updateTopPage(idx, "bounceRate", parseFloat(e.target.value) || 0)}
                  aria-label="Bounce %"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <button type="button" onClick={() => removeTopPage(idx)} className="text-red-400/60 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Source Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Source Breakdown</span>
          <button
            type="button"
            onClick={addSource}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
          >
            <Plus size={14} /> Add Source
          </button>
        </div>
        {(localData.sourceBreakdown || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_100px_100px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Source</span><span>Sessions</span><span>%</span><span />
            </div>
            {(localData.sourceBreakdown || []).map((src, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_100px_100px_32px] gap-2">
                <input
                  type="text"
                  value={src.source}
                  onChange={(e) => updateSource(idx, "source", e.target.value)}
                  aria-label="Source"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="Organic Search"
                />
                <input
                  type="number"
                  value={src.sessions || ""}
                  onChange={(e) => updateSource(idx, "sessions", parseInt(e.target.value) || 0)}
                  aria-label="Sessions"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <input
                  type="number"
                  step="0.1"
                  value={src.percentage || ""}
                  onChange={(e) => updateSource(idx, "percentage", parseFloat(e.target.value) || 0)}
                  aria-label="%"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <button type="button" onClick={() => removeSource(idx)} className="text-red-400/60 hover:text-red-400">
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
