"use client";

import { useState, useMemo } from "react";
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
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, Minus, Globe, FileText } from "lucide-react";

interface GeoEntry {
  city: string;
  region: string;
  sessions: number;
  pageviews: number;
  channel?: string;
}

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
  geoBreakdown?: GeoEntry[];
}

function MetricCard({ label, value, change, suffix }: { label: string; value: string | number; change?: number; suffix?: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/6 rounded-lg p-4">
      <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <p className="text-2xl font-bold text-white">
          {typeof value === "number" ? value.toLocaleString() : value}
          {suffix && <span className="text-sm font-normal text-slate-500">{suffix}</span>}
        </p>
        {change !== undefined && change !== 0 && (
          <span className={`text-xs font-medium ${change > 0 ? "text-emerald-400" : "text-red-400"}`}>
            {change > 0 ? "+" : ""}{change}%
          </span>
        )}
      </div>
    </div>
  );
}

function PositionChange({ current, previous }: { current: number; previous: number }) {
  const diff = previous - current; // positive = improved (moved up)

  if (diff === 0 || previous === 0) {
    return <span className="flex items-center text-slate-500"><Minus size={12} /></span>;
  }

  if (diff > 0) {
    return (
      <span className="flex items-center gap-0.5 text-emerald-400 text-xs font-medium">
        <TrendingUp size={12} />+{diff}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-0.5 text-red-400 text-xs font-medium">
      <TrendingDown size={12} />{diff}
    </span>
  );
}

export default function SeoSection({ data }: { data: SeoData }) {
  const organicOverTime = data.organicOverTime || [];
  const keywordRankings = data.keywordRankings || [];
  const topLandingPages = data.topLandingPages || [];
  const geoBreakdown = data.geoBreakdown || [];

  // Normalize homepage variants into a single canonical URL
  function normalizePageUrl(url: string): string {
    let path = url;
    try { path = new URL(url).pathname; } catch { /* keep as-is */ }
    // Strip trailing slash for comparison
    const clean = path.replace(/\/$/, "").toLowerCase();
    // Consolidate homepage variants: /, /home, /home-page, /homepage, blank, GMB homepage markers
    if (
      clean === "" ||
      clean === "/" ||
      clean === "/home" ||
      clean === "/home-page" ||
      clean === "/homepage" ||
      url.toLowerCase().includes("gmb") && clean.includes("home") ||
      url.toLowerCase() === "home page" ||
      url.toLowerCase() === "homepage"
    ) {
      return "/";
    }
    return url;
  }

  // Group keywords by page URL for tabbed view
  const [activeTab, setActiveTab] = useState("all");
  const pageGroups = useMemo(() => {
    const groups: Record<string, typeof keywordRankings> = {};
    keywordRankings.forEach((kw) => {
      const page = normalizePageUrl(kw.url || "(no page)");
      if (!groups[page]) groups[page] = [];
      groups[page].push(kw);
    });
    // Sort pages by keyword count descending
    return Object.fromEntries(
      Object.entries(groups).sort(([, a], [, b]) => b.length - a.length)
    );
  }, [keywordRankings]);
  const uniquePages = Object.keys(pageGroups);
  const displayedKeywords = activeTab === "all" ? keywordRankings : (pageGroups[activeTab] || []);

  // Pretty-print page path: strip domain, keep readable path
  function formatPageLabel(url: string): string {
    let path = url;
    try { path = new URL(url).pathname; } catch { /* keep as-is */ }
    if (path === "/") return "Homepage";
    // Strip trailing slash, take last 2 segments max for readability
    path = path.replace(/\/$/, "");
    const segments = path.split("/").filter(Boolean);
    if (segments.length <= 2) return "/" + segments.join("/");
    return "/.../" + segments.slice(-2).join("/");
  }

  // Channel mapping: GA4 channel group → display tab name
  const CHANNEL_MAP: Record<string, string> = {
    "Organic Search": "Organic",
    "Organic Social": "Social Organic",
    "Paid Search": "PPC",
    "Paid Social": "Social Paid",
    "Display": "Display",
    "Direct": "Direct",
    "Referral": "Referral",
    "Email": "Email",
  };
  const CHANNEL_TABS = ["All", "Organic", "PPC", "Social Paid"];

  // Group geo data by channel
  const [activeGeoTab, setActiveGeoTab] = useState("All");
  const geoByChannel = useMemo(() => {
    const groups: Record<string, { name: string; sessions: number }[]> = { All: [] };
    // Aggregate sessions per city across all channels for "All" tab
    const allCityMap: Record<string, number> = {};
    geoBreakdown.forEach((g) => {
      const label = g.region ? `${g.city}, ${g.region}` : g.city;
      allCityMap[label] = (allCityMap[label] || 0) + g.sessions;

      const tab = CHANNEL_MAP[g.channel || ""] || g.channel || "Other";
      if (!groups[tab]) groups[tab] = [];
      // Aggregate per city within each channel
      const existing = groups[tab].find((e) => e.name === label);
      if (existing) {
        existing.sessions += g.sessions;
      } else {
        groups[tab].push({ name: label, sessions: g.sessions });
      }
    });
    groups["All"] = Object.entries(allCityMap)
      .map(([name, sessions]) => ({ name, sessions }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 20);
    // Sort each channel's data
    for (const key of Object.keys(groups)) {
      if (key !== "All") {
        groups[key].sort((a, b) => b.sessions - a.sessions);
        groups[key] = groups[key].slice(0, 20);
      }
    }
    return groups;
  }, [geoBreakdown]);

  // Only show tabs that have data
  const availableGeoTabs = CHANNEL_TABS.filter((t) => (geoByChannel[t]?.length || 0) > 0);
  const currentGeoData = geoByChannel[activeGeoTab] || [];

  const domainScore = data.domainStrength || data.domainAuthority || 0;
  const indexedPages = data.totalIndexedPages || data.newBacklinks || 0;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Organic Traffic" value={data.organicTraffic || 0} change={data.organicTrafficChange} />
        <MetricCard label="Domain Strength" value={domainScore} suffix="/100" />
        <MetricCard label="Indexed Pages" value={indexedPages} />
        <MetricCard label="Keywords Tracked" value={keywordRankings.length} />
      </div>

      {/* Organic Traffic Trend */}
      {organicOverTime.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-white mb-4">Organic Traffic Trend</h4>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={organicOverTime}>
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
                dataKey="traffic"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Keyword Rankings with Page Tabs */}
      {keywordRankings.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="px-5 pt-4 pb-0">
            <h4 className="text-sm font-semibold text-white">Keyword Rankings</h4>
          </div>

          {/* Tab Bar — horizontal scroll, underline style */}
          {uniquePages.length > 1 && (
            <div className="overflow-x-auto scrollbar-none">
              <div className="flex min-w-max border-b border-white/6">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`flex items-center gap-1.5 px-5 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === "all"
                      ? "border-emerald-500 text-white"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Globe size={14} />
                  All Pages
                  <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                    activeTab === "all" ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-slate-500"
                  }`}>
                    {keywordRankings.length}
                  </span>
                </button>
                {uniquePages.map((page) => (
                  <button
                    key={page}
                    onClick={() => setActiveTab(page)}
                    className={`flex items-center gap-1.5 px-5 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                      activeTab === page
                        ? "border-emerald-500 text-white"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <FileText size={14} />
                    {formatPageLabel(page)}
                    <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      activeTab === page ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-slate-500"
                    }`}>
                      {pageGroups[page].length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Context banner when filtered to a specific page */}
          {activeTab !== "all" && (
            <div className="px-5 py-2.5 bg-emerald-500/[0.05] border-b border-emerald-500/10 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Showing keywords for <span className="text-emerald-400 font-mono font-medium">{activeTab}</span>
              </p>
              <button
                onClick={() => setActiveTab("all")}
                className="text-xs text-slate-500 hover:text-white transition-colors"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* Single-page header when only 1 page exists */}
          {uniquePages.length <= 1 && (
            <div className="border-b border-white/6" />
          )}

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-5 py-2.5 text-xs text-slate-500 font-medium">Keyword</th>
                <th className="text-center px-4 py-2.5 text-xs text-slate-500 font-medium w-24">Position</th>
                <th className="text-center px-4 py-2.5 text-xs text-slate-500 font-medium w-20">Change</th>
                {activeTab === "all" && (
                  <th className="text-left px-4 py-2.5 text-xs text-slate-500 font-medium">Page</th>
                )}
              </tr>
            </thead>
            <tbody>
              {displayedKeywords.map((kw, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-2.5 text-sm text-white font-medium">{kw.keyword}</td>
                  <td className="px-4 py-2.5 text-center w-24">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      kw.position <= 3
                        ? "bg-emerald-500/15 text-emerald-400"
                        : kw.position <= 10
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-white/5 text-slate-400"
                    }`}>
                      {kw.position}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-center w-20">
                    <PositionChange current={kw.position} previous={kw.previousPosition} />
                  </td>
                  {activeTab === "all" && (
                    <td className="px-4 py-2.5">
                      <span className="text-xs text-slate-500 font-mono bg-white/[0.03] px-2 py-1 rounded">
                        {formatPageLabel(kw.url)}
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Traffic by Area — Tabbed by Channel */}
      {availableGeoTabs.length > 0 && currentGeoData.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl overflow-hidden">
          <div className="px-5 pt-4 pb-0">
            <h4 className="text-sm font-semibold text-white">Traffic by Area</h4>
          </div>
          {/* Channel Tabs */}
          {availableGeoTabs.length > 1 && (
            <div className="overflow-x-auto scrollbar-none">
              <div className="flex min-w-max border-b border-white/6">
                {availableGeoTabs.map((tab) => {
                  const colors: Record<string, string> = {
                    All: "emerald", Organic: "emerald", PPC: "amber", "Social Paid": "violet",
                  };
                  const c = colors[tab] || "emerald";
                  const isActive = activeGeoTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveGeoTab(tab)}
                      className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                        isActive
                          ? `border-${c}-500 text-white`
                          : "border-transparent text-slate-400 hover:text-slate-200"
                      }`}
                      style={isActive ? { borderColor: c === "emerald" ? "#10b981" : c === "amber" ? "#f59e0b" : "#8b5cf6" } : undefined}
                    >
                      {tab}
                      <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        isActive ? "bg-white/10 text-white" : "bg-white/5 text-slate-500"
                      }`}>
                        {(geoByChannel[tab] || []).reduce((s, g) => s + g.sessions, 0).toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="p-5">
            <ResponsiveContainer width="100%" height={Math.max(200, currentGeoData.length * 36)}>
              <BarChart data={currentGeoData} layout="vertical" margin={{ left: 8, right: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={180}
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
                  formatter={(value) => [Number(value).toLocaleString(), "Sessions"]}
                />
                <Bar dataKey="sessions" radius={[0, 4, 4, 0]}>
                  {currentGeoData.map((_, idx) => {
                    const barColor = activeGeoTab === "PPC" ? `rgba(245,158,11,${1 - idx * 0.04})`
                      : activeGeoTab === "Social Paid" ? `rgba(139,92,246,${1 - idx * 0.04})`
                      : `rgba(16,185,129,${1 - idx * 0.04})`;
                    return <Cell key={idx} fill={barColor} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Top Landing Pages */}
      {topLandingPages.length > 0 && (
        <div className="bg-white/[0.02] border border-white/6 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/6">
            <h4 className="text-sm font-semibold text-white">Top Organic Landing Pages</h4>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-2 text-xs text-slate-500 font-medium">Page</th>
                <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Sessions</th>
                <th className="text-right px-4 py-2 text-xs text-slate-500 font-medium">Conversions</th>
              </tr>
            </thead>
            <tbody>
              {topLandingPages.map((lp, idx) => (
                <tr key={idx} className="border-b border-white/[0.03]">
                  <td className="px-4 py-2 text-sm text-slate-300 font-mono">{lp.page}</td>
                  <td className="px-4 py-2 text-sm text-white text-right">{lp.sessions.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-emerald-400 text-right font-medium">{lp.conversions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
