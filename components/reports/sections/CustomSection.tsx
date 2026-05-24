"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface CustomData {
  content?: string;
  keyValuePairs?: { key: string; value: string }[];
  chartType?: "bar" | "line" | "pie" | "";
  chartData?: { label: string; value: number }[];
}

const CHART_COLORS = ["#10b981", "#f59e0b", "#06b6d4", "#8b5cf6", "#ef4444", "#ec4899", "#14b8a6", "#a78bfa"];

export default function CustomSection({ data }: { data: CustomData }) {
  const keyValuePairs = data.keyValuePairs || [];
  const chartData = data.chartData || [];

  return (
    <div className="space-y-6">
      {/* Content / Notes */}
      {data.content && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl p-5">
          <div className="prose prose-invert prose-sm max-w-none">
            {data.content.split("\n").map((line, idx) => (
              <p key={idx} className="text-sm text-slate-300 leading-relaxed mb-2 last:mb-0">
                {line || "\u00A0"}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Key-Value Pairs */}
      {keyValuePairs.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {keyValuePairs.map((kv, idx) => (
            <div key={idx} className="bg-white/[0.03] border border-white/6 rounded-lg p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider">{kv.key}</p>
              <p className="text-lg font-bold text-white mt-1">{kv.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Optional Chart */}
      {data.chartType && chartData.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl p-5">
          <ResponsiveContainer width="100%" height={280}>
            {data.chartType === "bar" ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="label"
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
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : data.chartType === "line" ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="label"
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
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            ) : (
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="label"
                >
                  {chartData.map((_, idx) => (
                    <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
