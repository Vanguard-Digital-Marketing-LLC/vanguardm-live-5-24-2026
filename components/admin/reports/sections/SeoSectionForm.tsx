"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface SeoData {
  organicTraffic?: number;
  organicTrafficChange?: number;
  domainAuthority?: number;
  domainStrength?: number;
  newBacklinks?: number;
  totalIndexedPages?: number;
  totalImpressions?: number;
  averagePosition?: number;
  organicOverTime?: { date: string; traffic: number }[];
  keywordRankings?: { keyword: string; position: number; previousPosition: number; url: string }[];
  topLandingPages?: { page: string; sessions: number; conversions: number }[];
  geoBreakdown?: { city: string; region: string; sessions: number; pageviews: number; channel?: string }[];
}

interface SeoSectionFormProps {
  data: SeoData;
  onChange: (data: SeoData) => void;
}

export default function SeoSectionForm({ data, onChange }: SeoSectionFormProps) {
  const [localData, setLocalData] = useState<SeoData>({
    organicTraffic: 0,
    organicTrafficChange: 0,
    domainAuthority: 0,
    domainStrength: 0,
    newBacklinks: 0,
    totalIndexedPages: 0,
    totalImpressions: 0,
    averagePosition: 0,
    organicOverTime: [],
    keywordRankings: [],
    topLandingPages: [],
    geoBreakdown: [],
    ...data,
  });

  function update(partial: Partial<SeoData>) {
    const next = { ...localData, ...partial };
    setLocalData(next);
    onChange(next);
  }

  const inputClass = "w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none";
  const rowInputClass = "px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none";

  // Organic Over Time helpers
  function addOrganic() {
    update({ organicOverTime: [...(localData.organicOverTime || []), { date: "", traffic: 0 }] });
  }
  function removeOrganic(idx: number) {
    update({ organicOverTime: (localData.organicOverTime || []).filter((_, i) => i !== idx) });
  }
  function updateOrganic(idx: number, field: string, value: string | number) {
    const entries = [...(localData.organicOverTime || [])];
    entries[idx] = { ...entries[idx], [field]: value };
    update({ organicOverTime: entries });
  }

  // Keyword Rankings helpers
  function addKeyword() {
    update({ keywordRankings: [...(localData.keywordRankings || []), { keyword: "", position: 0, previousPosition: 0, url: "" }] });
  }
  function removeKeyword(idx: number) {
    update({ keywordRankings: (localData.keywordRankings || []).filter((_, i) => i !== idx) });
  }
  function updateKeyword(idx: number, field: string, value: string | number) {
    const entries = [...(localData.keywordRankings || [])];
    entries[idx] = { ...entries[idx], [field]: value };
    update({ keywordRankings: entries });
  }

  // Top Landing Pages helpers
  function addLandingPage() {
    update({ topLandingPages: [...(localData.topLandingPages || []), { page: "", sessions: 0, conversions: 0 }] });
  }
  function removeLandingPage(idx: number) {
    update({ topLandingPages: (localData.topLandingPages || []).filter((_, i) => i !== idx) });
  }
  function updateLandingPage(idx: number, field: string, value: string | number) {
    const entries = [...(localData.topLandingPages || [])];
    entries[idx] = { ...entries[idx], [field]: value };
    update({ topLandingPages: entries });
  }

  // Geo Breakdown helpers
  function addGeo() {
    update({ geoBreakdown: [...(localData.geoBreakdown || []), { city: "", region: "", sessions: 0, pageviews: 0, channel: "Organic Search" }] });
  }
  function removeGeo(idx: number) {
    update({ geoBreakdown: (localData.geoBreakdown || []).filter((_, i) => i !== idx) });
  }
  function updateGeo(idx: number, field: string, value: string | number) {
    const entries = [...(localData.geoBreakdown || [])];
    entries[idx] = { ...entries[idx], [field]: value };
    update({ geoBreakdown: entries });
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="seo-organic-traffic" className="block text-xs text-slate-400 mb-1">Organic Traffic</label>
          <input
            id="seo-organic-traffic"
            type="number"
            value={localData.organicTraffic || ""}
            onChange={(e) => update({ organicTraffic: parseInt(e.target.value) || 0 })}
            className={inputClass}
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="seo-traffic-change" className="block text-xs text-slate-400 mb-1">Traffic Change (%)</label>
          <input
            id="seo-traffic-change"
            type="number"
            step="0.1"
            value={localData.organicTrafficChange || ""}
            onChange={(e) => update({ organicTrafficChange: parseFloat(e.target.value) || 0 })}
            className={inputClass}
            placeholder="0.0"
          />
        </div>
        <div>
          <label htmlFor="seo-domain-strength" className="block text-xs text-slate-400 mb-1">Domain Strength (0-100)</label>
          <input
            id="seo-domain-strength"
            type="number"
            min={0}
            max={100}
            value={localData.domainStrength || localData.domainAuthority || ""}
            onChange={(e) => {
              const v = parseInt(e.target.value) || 0;
              update({ domainStrength: v, domainAuthority: v });
            }}
            className={inputClass}
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="seo-indexed-pages" className="block text-xs text-slate-400 mb-1">Indexed Pages</label>
          <input
            id="seo-indexed-pages"
            type="number"
            value={localData.totalIndexedPages || localData.newBacklinks || ""}
            onChange={(e) => {
              const v = parseInt(e.target.value) || 0;
              update({ totalIndexedPages: v, newBacklinks: v });
            }}
            className={inputClass}
            placeholder="0"
          />
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="seo-total-impressions" className="block text-xs text-slate-400 mb-1">Total Impressions</label>
          <input
            id="seo-total-impressions"
            type="number"
            value={localData.totalImpressions || ""}
            onChange={(e) => update({ totalImpressions: parseInt(e.target.value) || 0 })}
            className={inputClass}
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="seo-avg-position" className="block text-xs text-slate-400 mb-1">Avg. Position</label>
          <input
            id="seo-avg-position"
            type="number"
            step="0.1"
            value={localData.averagePosition || ""}
            onChange={(e) => update({ averagePosition: parseFloat(e.target.value) || 0 })}
            className={inputClass}
            placeholder="0.0"
          />
        </div>
      </div>

      {/* Organic Traffic Over Time */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Organic Traffic Over Time</span>
          <button type="button" onClick={addOrganic} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
            <Plus size={14} /> Add Row
          </button>
        </div>
        {(localData.organicOverTime || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_120px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Date</span><span>Traffic</span><span />
            </div>
            {(localData.organicOverTime || []).map((entry, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_120px_32px] gap-2">
                <input type="date" value={entry.date} onChange={(e) => updateOrganic(idx, "date", e.target.value)} aria-label="Date" className={rowInputClass} />
                <input type="number" value={entry.traffic || ""} onChange={(e) => updateOrganic(idx, "traffic", parseInt(e.target.value) || 0)} aria-label="Traffic" className={rowInputClass} />
                <button type="button" onClick={() => removeOrganic(idx)} className="text-red-400/60 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Keyword Rankings */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Keyword Rankings</span>
          <button type="button" onClick={addKeyword} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
            <Plus size={14} /> Add Keyword
          </button>
        </div>
        {(localData.keywordRankings || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_80px_80px_1fr_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Keyword</span><span>Position</span><span>Previous</span><span>URL</span><span />
            </div>
            {(localData.keywordRankings || []).map((kw, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_80px_80px_1fr_32px] gap-2">
                <input type="text" value={kw.keyword} onChange={(e) => updateKeyword(idx, "keyword", e.target.value)} aria-label="Keyword" className={rowInputClass} placeholder="keyword" />
                <input type="number" value={kw.position || ""} onChange={(e) => updateKeyword(idx, "position", parseInt(e.target.value) || 0)} aria-label="Position" className={rowInputClass} />
                <input type="number" value={kw.previousPosition || ""} onChange={(e) => updateKeyword(idx, "previousPosition", parseInt(e.target.value) || 0)} aria-label="Previous" className={rowInputClass} />
                <input type="text" value={kw.url} onChange={(e) => updateKeyword(idx, "url", e.target.value)} aria-label="URL" className={rowInputClass} placeholder="/page" />
                <button type="button" onClick={() => removeKeyword(idx)} className="text-red-400/60 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Landing Pages */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Landing Pages</span>
          <button type="button" onClick={addLandingPage} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
            <Plus size={14} /> Add Page
          </button>
        </div>
        {(localData.topLandingPages || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_100px_100px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Page</span><span>Sessions</span><span>Conv.</span><span />
            </div>
            {(localData.topLandingPages || []).map((lp, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_100px_100px_32px] gap-2">
                <input type="text" value={lp.page} onChange={(e) => updateLandingPage(idx, "page", e.target.value)} aria-label="Page" className={rowInputClass} placeholder="/page-url" />
                <input type="number" value={lp.sessions || ""} onChange={(e) => updateLandingPage(idx, "sessions", parseInt(e.target.value) || 0)} aria-label="Sessions" className={rowInputClass} />
                <input type="number" value={lp.conversions || ""} onChange={(e) => updateLandingPage(idx, "conversions", parseInt(e.target.value) || 0)} aria-label="Conversions" className={rowInputClass} />
                <button type="button" onClick={() => removeLandingPage(idx)} className="text-red-400/60 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Geographic Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Geographic Breakdown</span>
          <button type="button" onClick={addGeo} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
            <Plus size={14} /> Add Area
          </button>
        </div>
        {(localData.geoBreakdown || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_1fr_120px_80px_80px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>City</span><span>Region</span><span>Channel</span><span>Sessions</span><span>Views</span><span />
            </div>
            {(localData.geoBreakdown || []).map((geo, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_1fr_120px_80px_80px_32px] gap-2">
                <input type="text" value={geo.city} onChange={(e) => updateGeo(idx, "city", e.target.value)} aria-label="City" className={rowInputClass} placeholder="City" />
                <input type="text" value={geo.region} onChange={(e) => updateGeo(idx, "region", e.target.value)} aria-label="Region" className={rowInputClass} placeholder="State/Region" />
                <select value={geo.channel || "Organic Search"} onChange={(e) => updateGeo(idx, "channel", e.target.value)} aria-label="Channel" className={rowInputClass}>
                  <option value="Organic Search">Organic</option>
                  <option value="Paid Search">PPC</option>
                  <option value="Paid Social">Social Paid</option>
                  <option value="Direct">Direct</option>
                  <option value="Referral">Referral</option>
                  <option value="Display">Display</option>
                </select>
                <input type="number" value={geo.sessions || ""} onChange={(e) => updateGeo(idx, "sessions", parseInt(e.target.value) || 0)} aria-label="Sessions" className={rowInputClass} />
                <input type="number" value={geo.pageviews || ""} onChange={(e) => updateGeo(idx, "pageviews", parseInt(e.target.value) || 0)} aria-label="Views" className={rowInputClass} />
                <button type="button" onClick={() => removeGeo(idx)} className="text-red-400/60 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
