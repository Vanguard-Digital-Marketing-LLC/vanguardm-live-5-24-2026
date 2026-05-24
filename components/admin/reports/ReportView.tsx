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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import MarketingSection from "@/components/reports/sections/MarketingSection";
import CallsSection from "@/components/reports/sections/CallsSection";

// ── Types ─────────────────────────────────────────────

interface ReportSection {
  type: string;
  title: string;
  data: Record<string, unknown>;
  notes: string | null;
}

interface ReportViewProps {
  report: {
    title: string;
    period: string;
    startDate: string;
    endDate: string;
    summary: string | null;
    sections: ReportSection[];
  };
}

// ── Chart theme ───────────────────────────────────────

const CHART_COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"];
const GRID_STROKE = "#1a2332";
const AXIS_STROKE = "#64748b";
const TOOLTIP_BG = "#111827";

function ChartTooltipStyle() {
  return {
    contentStyle: {
      backgroundColor: TOOLTIP_BG,
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px",
      color: "#e2e8f0",
      fontSize: "12px",
    },
    itemStyle: { color: "#e2e8f0" },
    labelStyle: { color: "#94a3b8" },
  };
}

// ── Metric card ───────────────────────────────────────

function MetricBox({ label, value, change }: { label: string; value: string | number; change?: number }) {
  return (
    <div className="bg-white/[0.03] border border-white/6 rounded-xl p-4">
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
      {change !== undefined && change !== 0 && (
        <p className={`text-xs mt-1 ${change > 0 ? "text-emerald-400" : "text-red-400"}`}>
          {change > 0 ? "+" : ""}
          {change}%
        </p>
      )}
    </div>
  );
}

// ── Section renderers ─────────────────────────────────

function TrafficSection({ data }: { data: Record<string, unknown> }) {
  const sessions = (data.sessions as number) || 0;
  const pageviews = (data.pageviews as number) || 0;
  const bounceRate = (data.bounceRate as number) || 0;
  const avgDuration = (data.avgSessionDuration as string) || "0:00";
  const sessionsOverTime = (data.sessionsOverTime as { date: string; sessions: number }[]) || [];
  const topPages = (data.topPages as { page: string; views: number; bounceRate: number }[]) || [];
  const sourceBreakdown = (data.sourceBreakdown as { source: string; sessions: number; percentage: number }[]) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricBox label="Sessions" value={sessions.toLocaleString()} />
        <MetricBox label="Pageviews" value={pageviews.toLocaleString()} />
        <MetricBox label="Bounce Rate" value={`${bounceRate}%`} />
        <MetricBox label="Avg. Duration" value={avgDuration} />
      </div>

      {sessionsOverTime.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Sessions Over Time</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sessionsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                <XAxis dataKey="date" stroke={AXIS_STROKE} tick={{ fontSize: 11 }} />
                <YAxis stroke={AXIS_STROKE} tick={{ fontSize: 11 }} />
                <Tooltip {...ChartTooltipStyle()} />
                <Line type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {topPages.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Top Pages</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPages} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                <XAxis type="number" stroke={AXIS_STROKE} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="page" stroke={AXIS_STROKE} tick={{ fontSize: 10 }} width={140} />
                <Tooltip {...ChartTooltipStyle()} />
                <Bar dataKey="views" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {sourceBreakdown.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Traffic Sources</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceBreakdown}
                    dataKey="sessions"
                    nameKey="source"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, value }: any) => `${name ?? ""} ${value ?? 0}%`}
                    labelLine={false}
                  >
                    {sourceBreakdown.map((_, idx) => (
                      <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip {...ChartTooltipStyle()} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {sourceBreakdown.map((src, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }} />
                    <span className="text-sm text-slate-300">{src.source}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-white">{src.sessions.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 ml-2">({src.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdsSection({ data }: { data: Record<string, unknown> }) {
  const spend = (data.spend as number) || 0;
  const impressions = (data.impressions as number) || 0;
  const clicks = (data.clicks as number) || 0;
  const ctr = (data.ctr as number) || 0;
  const conversions = (data.conversions as number) || 0;
  const cpa = (data.cpa as number) || 0;
  const roas = (data.roas as number) || 0;
  const campaigns = (data.campaigns as { name: string; spend: number; impressions: number; clicks: number; conversions: number; roas: number }[]) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricBox label="Ad Spend" value={`$${spend.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
        <MetricBox label="Impressions" value={impressions.toLocaleString()} />
        <MetricBox label="Clicks" value={clicks.toLocaleString()} />
        <MetricBox label="CTR" value={`${ctr}%`} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricBox label="Conversions" value={conversions.toLocaleString()} />
        <MetricBox label="CPA" value={`$${cpa.toFixed(2)}`} />
        <MetricBox label="ROAS" value={`${roas.toFixed(2)}x`} />
      </div>

      {campaigns.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Campaign Performance</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaigns}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                <XAxis dataKey="name" stroke={AXIS_STROKE} tick={{ fontSize: 10 }} />
                <YAxis stroke={AXIS_STROKE} tick={{ fontSize: 11 }} />
                <Tooltip {...ChartTooltipStyle()} />
                <Bar dataKey="spend" fill="#f59e0b" name="Spend ($)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversions" fill="#10b981" name="Conversions" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Campaign table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left py-2 px-3 text-xs text-slate-500 uppercase">Campaign</th>
                  <th className="text-right py-2 px-3 text-xs text-slate-500 uppercase">Spend</th>
                  <th className="text-right py-2 px-3 text-xs text-slate-500 uppercase">Impressions</th>
                  <th className="text-right py-2 px-3 text-xs text-slate-500 uppercase">Clicks</th>
                  <th className="text-right py-2 px-3 text-xs text-slate-500 uppercase">Conv.</th>
                  <th className="text-right py-2 px-3 text-xs text-slate-500 uppercase">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, idx) => (
                  <tr key={idx} className="border-b border-white/4">
                    <td className="py-2 px-3 text-slate-300">{c.name}</td>
                    <td className="py-2 px-3 text-right text-white">${c.spend.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="py-2 px-3 text-right text-slate-300">{c.impressions.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right text-slate-300">{c.clicks.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right text-emerald-400">{c.conversions}</td>
                    <td className="py-2 px-3 text-right text-amber-400">{c.roas.toFixed(2)}x</td>
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

function SeoSection({ data }: { data: Record<string, unknown> }) {
  const organicTraffic = (data.organicTraffic as number) || 0;
  const organicTrafficChange = (data.organicTrafficChange as number) || 0;
  const domainAuthority = (data.domainAuthority as number) || 0;
  const newBacklinks = (data.newBacklinks as number) || 0;
  const organicOverTime = (data.organicOverTime as { date: string; traffic: number }[]) || [];
  const keywordRankings = (data.keywordRankings as { keyword: string; position: number; previousPosition: number; url: string }[]) || [];
  const topLandingPages = (data.topLandingPages as { page: string; sessions: number; conversions: number }[]) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricBox label="Organic Traffic" value={organicTraffic.toLocaleString()} change={organicTrafficChange} />
        <MetricBox label="Domain Authority" value={domainAuthority} />
        <MetricBox label="New Backlinks" value={newBacklinks.toLocaleString()} />
        <MetricBox label="Keywords Tracked" value={keywordRankings.length} />
      </div>

      {organicOverTime.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Organic Traffic Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={organicOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                <XAxis dataKey="date" stroke={AXIS_STROKE} tick={{ fontSize: 11 }} />
                <YAxis stroke={AXIS_STROKE} tick={{ fontSize: 11 }} />
                <Tooltip {...ChartTooltipStyle()} />
                <Line type="monotone" dataKey="traffic" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {keywordRankings.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Keyword Rankings</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left py-2 px-3 text-xs text-slate-500 uppercase">Keyword</th>
                  <th className="text-right py-2 px-3 text-xs text-slate-500 uppercase">Position</th>
                  <th className="text-right py-2 px-3 text-xs text-slate-500 uppercase">Previous</th>
                  <th className="text-right py-2 px-3 text-xs text-slate-500 uppercase">Change</th>
                  <th className="text-left py-2 px-3 text-xs text-slate-500 uppercase">URL</th>
                </tr>
              </thead>
              <tbody>
                {keywordRankings.map((kw, idx) => {
                  const change = kw.previousPosition - kw.position;
                  return (
                    <tr key={idx} className="border-b border-white/4">
                      <td className="py-2 px-3 text-white font-medium">{kw.keyword}</td>
                      <td className="py-2 px-3 text-right text-white">{kw.position}</td>
                      <td className="py-2 px-3 text-right text-slate-400">{kw.previousPosition}</td>
                      <td className="py-2 px-3 text-right">
                        {change !== 0 && (
                          <span className={change > 0 ? "text-emerald-400" : "text-red-400"}>
                            {change > 0 ? "+" : ""}{change}
                          </span>
                        )}
                        {change === 0 && <span className="text-slate-500">--</span>}
                      </td>
                      <td className="py-2 px-3 text-slate-400 text-xs">{kw.url}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {topLandingPages.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Top Landing Pages</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topLandingPages} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                <XAxis type="number" stroke={AXIS_STROKE} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="page" stroke={AXIS_STROKE} tick={{ fontSize: 10 }} width={140} />
                <Tooltip {...ChartTooltipStyle()} />
                <Bar dataKey="sessions" fill="#3b82f6" name="Sessions" radius={[0, 4, 4, 0]} />
                <Bar dataKey="conversions" fill="#10b981" name="Conversions" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

function SocialSection({ data }: { data: Record<string, unknown> }) {
  const followers = (data.followers as number) || 0;
  const followersChange = (data.followersChange as number) || 0;
  const engagementRate = (data.engagementRate as number) || 0;
  const reach = (data.reach as number) || 0;
  const impressions = (data.impressions as number) || 0;
  const platformBreakdown = (data.platformBreakdown as { platform: string; followers: number; engagement: number; reach: number }[]) || [];
  const topPosts = (data.topPosts as { platform: string; content: string; engagement: number; reach: number; date: string }[]) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricBox label="Followers" value={followers.toLocaleString()} change={followersChange > 0 ? Math.round((followersChange / Math.max(followers - followersChange, 1)) * 100) : undefined} />
        <MetricBox label="New Followers" value={followersChange > 0 ? `+${followersChange.toLocaleString()}` : followersChange.toLocaleString()} />
        <MetricBox label="Engagement Rate" value={`${engagementRate}%`} />
        <MetricBox label="Reach" value={reach.toLocaleString()} />
        <MetricBox label="Impressions" value={impressions.toLocaleString()} />
      </div>

      {platformBreakdown.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Engagement by Platform</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                <XAxis dataKey="platform" stroke={AXIS_STROKE} tick={{ fontSize: 11 }} />
                <YAxis stroke={AXIS_STROKE} tick={{ fontSize: 11 }} />
                <Tooltip {...ChartTooltipStyle()} />
                <Bar dataKey="followers" fill="#3b82f6" name="Followers" radius={[4, 4, 0, 0]} />
                <Bar dataKey="engagement" fill="#10b981" name="Engagement" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reach" fill="#f59e0b" name="Reach" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {topPosts.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Top Performing Posts</h4>
          <div className="space-y-3">
            {topPosts.map((post, idx) => (
              <div key={idx} className="p-4 bg-white/[0.02] border border-white/6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-xs text-slate-400">{post.platform}</span>
                    <span className="text-xs text-slate-500">{post.date}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-emerald-400">{post.engagement.toLocaleString()} engagements</span>
                    <span className="text-blue-400">{post.reach.toLocaleString()} reach</span>
                  </div>
                </div>
                <p className="text-sm text-slate-300">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CustomSection({ data, notes }: { data: Record<string, unknown>; notes: string | null }) {
  const content = (data.content as string) || "";
  const keyValuePairs = (data.keyValuePairs as { key: string; value: string }[]) || [];
  const chartType = (data.chartType as string) || "";
  const chartData = (data.chartData as { label: string; value: number }[]) || [];

  return (
    <div className="space-y-6">
      {/* Content/Notes */}
      {(content || notes) && (
        <div className="prose prose-invert prose-sm max-w-none">
          {content.split("\n").map((line, idx) => (
            <p key={idx} className="text-sm text-slate-300 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      )}

      {/* Key-value pairs as metric cards */}
      {keyValuePairs.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {keyValuePairs.map((kv, idx) => (
            <MetricBox key={idx} label={kv.key} value={kv.value} />
          ))}
        </div>
      )}

      {/* Chart */}
      {chartType && chartData.length > 0 && (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                <XAxis dataKey="label" stroke={AXIS_STROKE} tick={{ fontSize: 11 }} />
                <YAxis stroke={AXIS_STROKE} tick={{ fontSize: 11 }} />
                <Tooltip {...ChartTooltipStyle()} />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            ) : chartType === "pie" ? (
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name }: any) => name ?? ""}
                >
                  {chartData.map((_, idx) => (
                    <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...ChartTooltipStyle()} />
              </PieChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                <XAxis dataKey="label" stroke={AXIS_STROKE} tick={{ fontSize: 11 }} />
                <YAxis stroke={AXIS_STROKE} tick={{ fontSize: 11 }} />
                <Tooltip {...ChartTooltipStyle()} />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────

export default function ReportView({ report }: ReportViewProps) {
  const periodLabel = (p: string) => {
    switch (p) {
      case "WEEKLY": return "Weekly";
      case "MONTHLY": return "Monthly";
      case "QUARTERLY": return "Quarterly";
      default: return p;
    }
  };

  return (
    <div className="space-y-8">
      {/* Report header */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-8">
        <h1 className="font-display text-2xl font-bold text-white">{report.title}</h1>
        <div className="flex items-center gap-4 mt-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            {periodLabel(report.period)}
          </span>
          <span className="text-sm text-slate-400">
            {new Date(report.startDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            {" "}&#8211;{" "}
            {new Date(report.endDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
        </div>
        {report.summary && (
          <div className="mt-4 pt-4 border-t border-white/6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Executive Summary</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{report.summary}</p>
          </div>
        )}
      </div>

      {/* Report sections */}
      {report.sections.map((section, idx) => (
        <div key={idx} className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="font-display text-lg font-semibold text-white mb-4">{section.title}</h2>

          {section.type === "TRAFFIC" && <TrafficSection data={section.data} />}
          {section.type === "ADS" && <AdsSection data={section.data} />}
          {section.type === "SEO" && <SeoSection data={section.data} />}
          {section.type === "SOCIAL" && <SocialSection data={section.data} />}
          {section.type === "CUSTOM" && <CustomSection data={section.data} notes={section.notes} />}
          {section.type === "MARKETING" && <MarketingSection data={section.data} />}
          {section.type === "CALLS" && <CallsSection data={section.data} />}

          {section.notes && section.type !== "CUSTOM" && (
            <div className="mt-4 pt-4 border-t border-white/6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Notes</h4>
              {section.notes.split("\n").map((line, i) => (
                <p key={i} className="text-sm text-slate-400 leading-relaxed">{line}</p>
              ))}
            </div>
          )}
        </div>
      ))}

      {report.sections.length === 0 && (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-12 text-center">
          <p className="text-slate-500">This report has no sections yet.</p>
        </div>
      )}
    </div>
  );
}
