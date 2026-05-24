"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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
  callsByDay?: { date: string; count: number }[];
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

function MetricCard({ label, value, accent = "white" }: { label: string; value: string | number; accent?: string }) {
  const colorMap: Record<string, string> = {
    white: "text-white",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    cyan: "text-cyan-400",
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

export default function AdsSection({ data }: { data: AdsData }) {
  const campaigns = data.campaigns || [];
  const geoBreakdown = data.geoBreakdown || [];
  const revenueBySource = data.revenueBySource || [];
  const revenueByDay = data.revenueByDay || [];
  const maxGeoClicks = geoBreakdown.length > 0 ? Math.max(...geoBreakdown.map((g) => g.clicks)) : 0;
  const maxRevenueSource = revenueBySource.length > 0 ? Math.max(...revenueBySource.map((s) => s.revenue)) : 0;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Ad Spend" value={`$${(data.spend || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
        {data.totalRevenue != null && data.totalRevenue > 0 && (
          <MetricCard label="Revenue" value={`$${data.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} accent="emerald" />
        )}
        <MetricCard label="Conversions" value={data.conversions || 0} accent="emerald" />
        <MetricCard label="ROAS" value={data.totalRevenue && data.spend ? `${(data.totalRevenue / data.spend).toFixed(1)}x` : `${data.roas || 0}x`} accent="amber" />
        <MetricCard label="CPA" value={`$${(data.cpa || 0).toFixed(2)}`} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="Impressions" value={data.impressions || 0} />
        <MetricCard label="Clicks" value={data.clicks || 0} />
        <MetricCard label="CTR" value={`${data.ctr || 0}%`} />
      </div>

      {/* Campaign Breakdown */}
      {campaigns.length > 0 && (
        <>
          <div className="bg-white/[0.02] border border-white/6 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-white mb-4">Campaign Performance</h4>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={campaigns}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="conversions" fill="#10b981" radius={[4, 4, 0, 0]} name="Conversions" />
                <Bar dataKey="spend" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Spend ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/[0.02] border border-white/6 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/6">
              <h4 className="text-sm font-semibold text-white">Campaign Details</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/6">
                    <th className="text-left px-4 py-2 text-xs text-slate-500 font-medium">Campaign</th>
                    <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Spend</th>
                    <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Impr.</th>
                    <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Clicks</th>
                    <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Conv.</th>
                    <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c, idx) => (
                    <tr key={idx} className="border-b border-white/[0.03]">
                      <td className="px-4 py-2 text-sm text-slate-300">{c.name}</td>
                      <td className="px-4 py-2 text-sm text-white text-right">${c.spend.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className="px-4 py-2 text-sm text-slate-400 text-right">{c.impressions.toLocaleString()}</td>
                      <td className="px-4 py-2 text-sm text-slate-400 text-right">{c.clicks.toLocaleString()}</td>
                      <td className="px-4 py-2 text-sm text-emerald-400 text-right font-medium">{c.conversions}</td>
                      <td className="px-4 py-2 text-sm text-amber-400 text-right font-medium">{c.roas}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Geographic Breakdown */}
      {geoBreakdown.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/6">
            <h4 className="text-sm font-semibold text-white">Ad Performance by Location</h4>
            <p className="text-xs text-slate-500 mt-0.5">Where your ads reached people (by physical presence)</p>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {geoBreakdown.map((geo, idx) => (
              <div key={idx} className="px-5 py-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-200 font-medium">{geo.location}</span>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-slate-400">
                      {geo.impressions.toLocaleString()} impr.
                    </span>
                    <span className="text-white font-medium">
                      {geo.clicks.toLocaleString()} clicks
                    </span>
                    <span className="text-amber-400 font-medium">
                      ${geo.spend.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    {geo.conversions > 0 && (
                      <span className="text-emerald-400 font-medium">
                        {geo.conversions} conv.
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all"
                    style={{ width: maxGeoClicks > 0 ? `${(geo.clicks / maxGeoClicks) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revenue by Source */}
      {revenueBySource.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/6">
            <h4 className="text-sm font-semibold text-white">Revenue by Source</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              ~{data.totalJobs || 0} conversions &middot; ${(data.totalRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })} total revenue
            </p>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {revenueBySource.map((s, idx) => (
              <div key={idx} className="px-5 py-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-200 font-medium">{s.source}</span>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-slate-400">~{s.jobs} conv.</span>
                    <span className="text-emerald-400 font-medium">
                      ${s.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all"
                    style={{ width: maxRevenueSource > 0 ? `${(s.revenue / maxRevenueSource) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call Tracking Validation */}
      {data.callTracking && data.callTracking.totalCalls > 0 && (() => {
        const ct = data.callTracking!;
        const answerRate = ct.totalCalls > 0 ? Math.round((ct.answeredCalls / ct.totalCalls) * 100) : 0;
        const avgMin = Math.floor(ct.avgDurationSeconds / 60);
        const avgSec = ct.avgDurationSeconds % 60;
        return (
          <div className="bg-white/[0.02] border border-white/6 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/6">
              <h4 className="text-sm font-semibold text-white">Call Tracking</h4>
              <p className="text-xs text-slate-500 mt-0.5">Phone call activity via Nimbata call tracking</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Total Calls</p>
                <p className="text-2xl font-bold text-white mt-1">{ct.totalCalls}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Answered</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">{ct.answeredCalls}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Answer Rate</p>
                <p className="text-2xl font-bold text-cyan-400 mt-1">{answerRate}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Avg Duration</p>
                <p className="text-2xl font-bold text-white mt-1">{avgMin}:{String(avgSec).padStart(2, "0")}</p>
              </div>
            </div>
            {ct.missedCalls > 0 && (
              <div className="px-5 pb-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-red-400 font-medium">{ct.missedCalls} missed calls</span>
                  <span className="text-slate-600">&middot;</span>
                  <span className="text-slate-500">Potential lost leads worth recovering</span>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Revenue Over Time */}
      {revenueByDay.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-white mb-4">Daily Revenue</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
                tickFormatter={(v: string) => {
                  const d = new Date(v + "T12:00:00");
                  return `${d.getMonth() + 1}/${d.getDate()}`;
                }}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: 12,
                }}
                formatter={(value) => [`$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#10b981" radius={[3, 3, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
