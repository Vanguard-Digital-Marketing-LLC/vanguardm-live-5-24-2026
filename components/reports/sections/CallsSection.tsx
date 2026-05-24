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

interface CallsData {
  totalCalls?: number;
  answeredCalls?: number;
  missedCalls?: number;
  avgDurationSeconds?: number;
  callsByDay?: { date: string; count: number }[];
  topSources?: { source: string; calls: number }[];
  recentCalls?: { date: string; caller: string; duration: number; status: string }[];
}

function MetricCard({ label, value, accent = "white" }: { label: string; value: string | number; accent?: string }) {
  const colorMap: Record<string, string> = {
    white: "text-white",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    red: "text-red-400",
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

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export default function CallsSection({ data }: { data: CallsData }) {
  const callsByDay = data.callsByDay || [];
  const topSources = data.topSources || [];
  const recentCalls = data.recentCalls || [];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Calls" value={data.totalCalls || 0} />
        <MetricCard label="Answered" value={data.answeredCalls || 0} accent="emerald" />
        <MetricCard label="Missed" value={data.missedCalls || 0} accent="red" />
        <MetricCard label="Avg Duration" value={formatDuration(data.avgDurationSeconds || 0)} accent="cyan" />
      </div>

      {/* Calls by Day Chart */}
      {callsByDay.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-white mb-4">Calls by Day</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={callsByDay}>
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
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} name="Calls" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Source Breakdown */}
      {topSources.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/6">
            <h4 className="text-sm font-semibold text-white">Call Sources</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left px-4 py-2 text-xs text-slate-500 font-medium">Source</th>
                  <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Calls</th>
                </tr>
              </thead>
              <tbody>
                {topSources.map((s, idx) => (
                  <tr key={idx} className="border-b border-white/[0.03]">
                    <td className="px-4 py-2 text-sm text-slate-300">{s.source}</td>
                    <td className="px-4 py-2 text-sm text-emerald-400 text-right font-medium">{s.calls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Calls */}
      {recentCalls.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/6">
            <h4 className="text-sm font-semibold text-white">Recent Calls</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left px-4 py-2 text-xs text-slate-500 font-medium">Date</th>
                  <th className="text-left px-4 py-2 text-xs text-slate-500 font-medium">Caller</th>
                  <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Duration</th>
                  <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCalls.map((c, idx) => (
                  <tr key={idx} className="border-b border-white/[0.03]">
                    <td className="px-4 py-2 text-sm text-slate-400">{c.date}</td>
                    <td className="px-4 py-2 text-sm text-slate-300">{c.caller}</td>
                    <td className="px-4 py-2 text-sm text-white text-right">{formatDuration(c.duration)}</td>
                    <td className="px-4 py-2 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        c.status === "Answered"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
