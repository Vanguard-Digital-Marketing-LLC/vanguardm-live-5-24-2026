"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface TrafficData {
  sessions?: number;
  pageviews?: number;
  bounceRate?: number;
  avgSessionDuration?: string;
  sessionsOverTime?: { date: string; sessions: number }[];
  topPages?: { page: string; views: number; bounceRate: number }[];
  sourceBreakdown?: { source: string; sessions: number; percentage: number }[];
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white/[0.03] border border-white/6 rounded-lg p-4">
      <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{typeof value === "number" ? value.toLocaleString() : value}</p>
    </div>
  );
}

export default function TrafficSection({ data }: { data: TrafficData }) {
  const sessionsOverTime = data.sessionsOverTime || [];
  const topPages = data.topPages || [];
  const sourceBreakdown = data.sourceBreakdown || [];

  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Sessions" value={data.sessions || 0} />
        <MetricCard label="Pageviews" value={data.pageviews || 0} />
        <MetricCard label="Bounce Rate" value={`${data.bounceRate || 0}%`} />
        <MetricCard label="Avg Duration" value={data.avgSessionDuration || "0:00"} />
      </div>

      {/* Sessions Over Time Chart */}
      {sessionsOverTime.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-white mb-4">Sessions Over Time</h4>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={sessionsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
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
              <Line
                type="monotone"
                dataKey="sessions"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Source Breakdown Chart */}
      {sourceBreakdown.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-white mb-4">Traffic Sources</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sourceBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                type="number"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="source"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
                width={120}
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
              <Bar dataKey="sessions" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Top Pages Table */}
      {topPages.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/6">
            <h4 className="text-sm font-semibold text-white">Top Pages</h4>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-2 text-xs text-slate-500 font-medium">Page</th>
                <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Views</th>
                <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Bounce %</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page, idx) => (
                <tr key={idx} className="border-b border-white/[0.03]">
                  <td className="px-4 py-2 text-sm text-slate-300 font-mono">{page.page}</td>
                  <td className="px-4 py-2 text-sm text-white text-right">{page.views.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-slate-400 text-right">{page.bounceRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
