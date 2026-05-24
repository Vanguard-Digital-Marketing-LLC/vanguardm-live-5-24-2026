"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface SocialData {
  followers?: number;
  followersChange?: number;
  engagementRate?: number;
  reach?: number;
  impressions?: number;
  platformBreakdown?: { platform: string; followers: number; engagement: number; reach: number }[];
  topPosts?: { platform: string; content: string; engagement: number; reach: number; date: string }[];
}

const PLATFORM_COLORS: Record<string, string> = {
  Facebook: "#1877F2",
  Instagram: "#E4405F",
  LinkedIn: "#0A66C2",
  "X/Twitter": "#1DA1F2",
  TikTok: "#00f2ea",
  YouTube: "#FF0000",
  Other: "#94a3b8",
};

const CHART_COLORS = ["#10b981", "#f59e0b", "#06b6d4", "#8b5cf6", "#ef4444", "#ec4899"];

function MetricCard({ label, value, change }: { label: string; value: string | number; change?: number }) {
  return (
    <div className="bg-white/[0.03] border border-white/6 rounded-lg p-4">
      <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <p className="text-2xl font-bold text-white">{typeof value === "number" ? value.toLocaleString() : value}</p>
        {change !== undefined && change !== 0 && (
          <span className={`text-xs font-medium ${change > 0 ? "text-emerald-400" : "text-red-400"}`}>
            {change > 0 ? "+" : ""}{change.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}

export default function SocialSection({ data }: { data: SocialData }) {
  const platformBreakdown = data.platformBreakdown || [];
  const topPosts = data.topPosts || [];

  const pieData = platformBreakdown.map((p) => ({
    name: p.platform,
    value: p.followers,
    fill: PLATFORM_COLORS[p.platform] || CHART_COLORS[0],
  }));

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard label="Total Followers" value={data.followers || 0} change={data.followersChange} />
        <MetricCard label="Engagement Rate" value={`${data.engagementRate || 0}%`} />
        <MetricCard label="Reach" value={data.reach || 0} />
        <MetricCard label="Impressions" value={data.impressions || 0} />
        <MetricCard label="Platforms" value={platformBreakdown.length} />
      </div>

      {platformBreakdown.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pie Chart - Followers by Platform */}
          <div className="bg-white/[0.02] border border-white/6 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-white mb-4">Followers by Platform</h4>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
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
                  formatter={(value: any) => Number(value).toLocaleString()}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={(value: any) => <span className="text-xs text-slate-400">{String(value)}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Engagement by Platform */}
          <div className="bg-white/[0.02] border border-white/6 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-white mb-4">Engagement by Platform</h4>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={platformBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="platform"
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
                <Bar dataKey="engagement" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Engagement %" />
                <Bar dataKey="reach" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Reach" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Top Posts */}
      {topPosts.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/6">
            <h4 className="text-sm font-semibold text-white">Top Posts</h4>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {topPosts.map((post, idx) => (
              <div key={idx} className="px-5 py-3">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase"
                    style={{
                      backgroundColor: `${PLATFORM_COLORS[post.platform] || "#94a3b8"}20`,
                      color: PLATFORM_COLORS[post.platform] || "#94a3b8",
                    }}
                  >
                    {post.platform}
                  </span>
                  {post.date && <span className="text-xs text-slate-600">{post.date}</span>}
                  <div className="ml-auto flex items-center gap-4 text-xs">
                    <span className="text-amber-400">{post.engagement.toLocaleString()} engagements</span>
                    <span className="text-cyan-400">{post.reach.toLocaleString()} reach</span>
                  </div>
                </div>
                <p className="text-sm text-slate-400 line-clamp-2">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
