"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface AdsGeoEntry {
  location: string;
  clicks: number;
  impressions: number;
  spend: number;
  conversions: number;
}

interface RevenueSourceEntry {
  source: string;
  revenue: number;
  jobs: number;
}

interface RevenueDayEntry {
  date: string;
  revenue: number;
}

interface CallTrackingData {
  totalCalls: number;
  answeredCalls: number;
  missedCalls: number;
  conversionCalls: number;
  avgDurationSeconds: number;
}

interface AdsData {
  spend?: number;
  impressions?: number;
  clicks?: number;
  ctr?: number;
  conversions?: number;
  cpa?: number;
  roas?: number;
  campaigns?: { name: string; spend: number; impressions: number; clicks: number; conversions: number; roas: number }[];
  geoBreakdown?: AdsGeoEntry[];
  totalRevenue?: number;
  totalJobs?: number;
  revenueBySource?: RevenueSourceEntry[];
  revenueByDay?: RevenueDayEntry[];
  callTracking?: CallTrackingData;
}

interface AdsSectionFormProps {
  data: AdsData;
  onChange: (data: AdsData) => void;
}

export default function AdsSectionForm({ data, onChange }: AdsSectionFormProps) {
  const [localData, setLocalData] = useState<AdsData>({
    spend: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    conversions: 0,
    cpa: 0,
    roas: 0,
    campaigns: [],
    geoBreakdown: [],
    totalRevenue: 0,
    totalJobs: 0,
    revenueBySource: [],
    revenueByDay: [],
    ...data,
  });

  function update(partial: Partial<AdsData>) {
    const next = { ...localData, ...partial };
    setLocalData(next);
    onChange(next);
  }

  function addCampaign() {
    const campaigns = [
      ...(localData.campaigns || []),
      { name: "", spend: 0, impressions: 0, clicks: 0, conversions: 0, roas: 0 },
    ];
    update({ campaigns });
  }

  function removeCampaign(idx: number) {
    const campaigns = (localData.campaigns || []).filter((_, i) => i !== idx);
    update({ campaigns });
  }

  function updateCampaign(idx: number, field: string, value: string | number) {
    const campaigns = [...(localData.campaigns || [])];
    campaigns[idx] = { ...campaigns[idx], [field]: value };
    update({ campaigns });
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="ads-spend" className="block text-xs text-slate-400 mb-1">Ad Spend ($)</label>
          <input
            id="ads-spend"
            type="number"
            step="0.01"
            value={localData.spend || ""}
            onChange={(e) => update({ spend: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0.00"
          />
        </div>
        <div>
          <label htmlFor="ads-impressions" className="block text-xs text-slate-400 mb-1">Impressions</label>
          <input
            id="ads-impressions"
            type="number"
            value={localData.impressions || ""}
            onChange={(e) => update({ impressions: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="ads-clicks" className="block text-xs text-slate-400 mb-1">Clicks</label>
          <input
            id="ads-clicks"
            type="number"
            value={localData.clicks || ""}
            onChange={(e) => update({ clicks: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="ads-ctr" className="block text-xs text-slate-400 mb-1">CTR (%)</label>
          <input
            id="ads-ctr"
            type="number"
            step="0.01"
            value={localData.ctr || ""}
            onChange={(e) => update({ ctr: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="ads-conversions" className="block text-xs text-slate-400 mb-1">Conversions</label>
          <input
            id="ads-conversions"
            type="number"
            value={localData.conversions || ""}
            onChange={(e) => update({ conversions: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="ads-cpa" className="block text-xs text-slate-400 mb-1">CPA ($)</label>
          <input
            id="ads-cpa"
            type="number"
            step="0.01"
            value={localData.cpa || ""}
            onChange={(e) => update({ cpa: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0.00"
          />
        </div>
        <div>
          <label htmlFor="ads-roas" className="block text-xs text-slate-400 mb-1">ROAS</label>
          <input
            id="ads-roas"
            type="number"
            step="0.01"
            value={localData.roas || ""}
            onChange={(e) => update({ roas: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Campaign Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Campaign Breakdown</span>
          <button
            type="button"
            onClick={addCampaign}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
          >
            <Plus size={14} /> Add Campaign
          </button>
        </div>
        {(localData.campaigns || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_90px_90px_80px_80px_80px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Name</span><span>Spend</span><span>Impr.</span><span>Clicks</span><span>Conv.</span><span>ROAS</span><span />
            </div>
            {(localData.campaigns || []).map((c, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_90px_90px_80px_80px_80px_32px] gap-2">
                <input
                  type="text"
                  value={c.name}
                  onChange={(e) => updateCampaign(idx, "name", e.target.value)}
                  aria-label="Name"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="Campaign name"
                />
                <input
                  type="number"
                  step="0.01"
                  value={c.spend || ""}
                  onChange={(e) => updateCampaign(idx, "spend", parseFloat(e.target.value) || 0)}
                  aria-label="Spend"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <input
                  type="number"
                  value={c.impressions || ""}
                  onChange={(e) => updateCampaign(idx, "impressions", parseInt(e.target.value) || 0)}
                  aria-label="Impressions"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <input
                  type="number"
                  value={c.clicks || ""}
                  onChange={(e) => updateCampaign(idx, "clicks", parseInt(e.target.value) || 0)}
                  aria-label="Clicks"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <input
                  type="number"
                  value={c.conversions || ""}
                  onChange={(e) => updateCampaign(idx, "conversions", parseInt(e.target.value) || 0)}
                  aria-label="Conversions"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <input
                  type="number"
                  step="0.01"
                  value={c.roas || ""}
                  onChange={(e) => updateCampaign(idx, "roas", parseFloat(e.target.value) || 0)}
                  aria-label="ROAS"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <button type="button" onClick={() => removeCampaign(idx)} className="text-red-400/60 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Geographic Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Geographic Breakdown</span>
          <button
            type="button"
            onClick={() => {
              const geo = [...(localData.geoBreakdown || []), { location: "", clicks: 0, impressions: 0, spend: 0, conversions: 0 }];
              update({ geoBreakdown: geo });
            }}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
          >
            <Plus size={14} /> Add Location
          </button>
        </div>
        {(localData.geoBreakdown || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_80px_80px_90px_80px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Location</span><span>Clicks</span><span>Impr.</span><span>Spend</span><span>Conv.</span><span />
            </div>
            {(localData.geoBreakdown || []).map((g, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_80px_80px_90px_80px_32px] gap-2">
                <input
                  type="text"
                  value={g.location}
                  onChange={(e) => {
                    const geo = [...(localData.geoBreakdown || [])];
                    geo[idx] = { ...geo[idx], location: e.target.value };
                    update({ geoBreakdown: geo });
                  }}
                  aria-label="Location"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="City, State"
                />
                <input
                  type="number"
                  value={g.clicks || ""}
                  onChange={(e) => {
                    const geo = [...(localData.geoBreakdown || [])];
                    geo[idx] = { ...geo[idx], clicks: parseInt(e.target.value) || 0 };
                    update({ geoBreakdown: geo });
                  }}
                  aria-label="Clicks"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <input
                  type="number"
                  value={g.impressions || ""}
                  onChange={(e) => {
                    const geo = [...(localData.geoBreakdown || [])];
                    geo[idx] = { ...geo[idx], impressions: parseInt(e.target.value) || 0 };
                    update({ geoBreakdown: geo });
                  }}
                  aria-label="Impressions"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <input
                  type="number"
                  step="0.01"
                  value={g.spend || ""}
                  onChange={(e) => {
                    const geo = [...(localData.geoBreakdown || [])];
                    geo[idx] = { ...geo[idx], spend: parseFloat(e.target.value) || 0 };
                    update({ geoBreakdown: geo });
                  }}
                  aria-label="Spend"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <input
                  type="number"
                  value={g.conversions || ""}
                  onChange={(e) => {
                    const geo = [...(localData.geoBreakdown || [])];
                    geo[idx] = { ...geo[idx], conversions: parseFloat(e.target.value) || 0 };
                    update({ geoBreakdown: geo });
                  }}
                  aria-label="Conversions"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const geo = (localData.geoBreakdown || []).filter((_, i) => i !== idx);
                    update({ geoBreakdown: geo });
                  }}
                  className="text-red-400/60 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Revenue Data */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Revenue by Source (auto-fetched)</span>
          <button
            type="button"
            onClick={() => {
              const src = [...(localData.revenueBySource || []), { source: "", revenue: 0, jobs: 0 }];
              update({ revenueBySource: src });
            }}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
          >
            <Plus size={14} /> Add Source
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label htmlFor="ads-total-revenue" className="block text-xs text-slate-400 mb-1">Total Revenue ($)</label>
            <input
              id="ads-total-revenue"
              type="number"
              step="0.01"
              value={localData.totalRevenue || ""}
              onChange={(e) => update({ totalRevenue: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
              placeholder="0.00"
            />
          </div>
          <div>
            <label htmlFor="ads-total-jobs" className="block text-xs text-slate-400 mb-1">Total Jobs</label>
            <input
              id="ads-total-jobs"
              type="number"
              value={localData.totalJobs || ""}
              onChange={(e) => update({ totalJobs: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
              placeholder="0"
            />
          </div>
        </div>
        {(localData.revenueBySource || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_100px_80px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Source</span><span>Revenue</span><span>Jobs</span><span />
            </div>
            {(localData.revenueBySource || []).map((s, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_100px_80px_32px] gap-2">
                <input
                  type="text"
                  value={s.source}
                  onChange={(e) => {
                    const src = [...(localData.revenueBySource || [])];
                    src[idx] = { ...src[idx], source: e.target.value };
                    update({ revenueBySource: src });
                  }}
                  aria-label="Source"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="Source name"
                />
                <input
                  type="number"
                  step="0.01"
                  value={s.revenue || ""}
                  onChange={(e) => {
                    const src = [...(localData.revenueBySource || [])];
                    src[idx] = { ...src[idx], revenue: parseFloat(e.target.value) || 0 };
                    update({ revenueBySource: src });
                  }}
                  aria-label="Revenue"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <input
                  type="number"
                  value={s.jobs || ""}
                  onChange={(e) => {
                    const src = [...(localData.revenueBySource || [])];
                    src[idx] = { ...src[idx], jobs: parseInt(e.target.value) || 0 };
                    update({ revenueBySource: src });
                  }}
                  aria-label="Jobs"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const src = (localData.revenueBySource || []).filter((_, i) => i !== idx);
                    update({ revenueBySource: src });
                  }}
                  className="text-red-400/60 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call Tracking */}
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Call Tracking (Nimbata)</span>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="ads-ct-total-calls" className="block text-xs text-slate-400 mb-1">Total Calls</label>
            <input
              id="ads-ct-total-calls"
              type="number"
              value={localData.callTracking?.totalCalls || ""}
              onChange={(e) => update({ callTracking: { ...localData.callTracking!, totalCalls: parseInt(e.target.value) || 0 } })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
              placeholder="0"
            />
          </div>
          <div>
            <label htmlFor="ads-ct-answered-calls" className="block text-xs text-slate-400 mb-1">Answered Calls</label>
            <input
              id="ads-ct-answered-calls"
              type="number"
              value={localData.callTracking?.answeredCalls || ""}
              onChange={(e) => update({ callTracking: { ...localData.callTracking!, answeredCalls: parseInt(e.target.value) || 0 } })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
              placeholder="0"
            />
          </div>
          <div>
            <label htmlFor="ads-ct-missed-calls" className="block text-xs text-slate-400 mb-1">Missed Calls</label>
            <input
              id="ads-ct-missed-calls"
              type="number"
              value={localData.callTracking?.missedCalls || ""}
              onChange={(e) => update({ callTracking: { ...localData.callTracking!, missedCalls: parseInt(e.target.value) || 0 } })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
              placeholder="0"
            />
          </div>
          <div>
            <label htmlFor="ads-ct-avg-duration" className="block text-xs text-slate-400 mb-1">Avg Duration (sec)</label>
            <input
              id="ads-ct-avg-duration"
              type="number"
              value={localData.callTracking?.avgDurationSeconds || ""}
              onChange={(e) => update({ callTracking: { ...localData.callTracking!, avgDurationSeconds: parseInt(e.target.value) || 0 } })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
