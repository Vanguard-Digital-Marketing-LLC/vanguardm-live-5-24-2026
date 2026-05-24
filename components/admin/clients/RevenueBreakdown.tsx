"use client";

import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, Users, BarChart3, CalendarDays } from "lucide-react";

interface SourceData { source: string; revenue: number; jobs: number }
interface WeekData { week: string; revenue: number; jobs: number; payout: number }
interface TeamData { team: string; revenue: number; jobs: number; payout: number }
interface MonthData { month: string; revenue: number; jobs: number }
interface DailyData { date: string; revenue: number }

interface JobsResponse {
  totalRevenue: number;
  totalJobs: number;
  bySource: SourceData[];
  byWeek: WeekData[];
  byTeam: TeamData[];
  byMonth: MonthData[];
  daily: DailyData[];
}

const SOURCE_COLORS: Record<string, string> = {
  Google: "bg-emerald-500",
  "Personal Referral": "bg-amber-500",
  "BNI Referral": "bg-violet-500",
  Realtor: "bg-cyan-500",
  "Reoccuring Client": "bg-blue-500",
  "Property Maint Company": "bg-orange-500",
  "General Contractor": "bg-pink-500",
  Unknown: "bg-slate-500",
};

function getBarColor(source: string) {
  return SOURCE_COLORS[source] || "bg-slate-500";
}

const MONTH_NAMES: Record<string, string> = {
  "01": "January", "02": "February", "03": "March", "04": "April",
  "05": "May", "06": "June", "07": "July", "08": "August",
  "09": "September", "10": "October", "11": "November", "12": "December",
};

function fmtMoney(n: number) {
  return "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

type Tab = "source" | "team" | "monthly" | "daily";

export default function RevenueBreakdown({ clientId }: { clientId: string }) {
  const [data, setData] = useState<JobsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("source");

  useEffect(() => {
    fetch(`/api/admin/clients/${clientId}/jobs`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [clientId]);

  if (loading) {
    return (
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-5 w-40 bg-white/10 rounded" />
          <div className="h-32 bg-white/5 rounded" />
        </div>
      </div>
    );
  }

  if (!data || data.totalJobs === 0) return null;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "source", label: "By Source", icon: <BarChart3 size={14} /> },
    { key: "team", label: "By Team", icon: <Users size={14} /> },
    { key: "monthly", label: "Monthly", icon: <CalendarDays size={14} /> },
    { key: "daily", label: "Daily", icon: <TrendingUp size={14} /> },
  ];

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <DollarSign size={18} className="text-emerald-400" />
          <div>
            <h2 className="font-display text-base font-semibold text-white">Revenue Tracking</h2>
            <p className="text-xs text-slate-500">~{data.totalJobs} conversions &middot; {fmtMoney(data.totalRevenue)} total</p>
          </div>
        </div>
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                tab === t.key ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Source breakdown */}
      {tab === "source" && <SourceTab data={data.bySource} />}
      {tab === "team" && <TeamTab data={data.byTeam} />}
      {tab === "monthly" && <MonthlyTab data={data.byMonth} />}
      {tab === "daily" && <DailyTab data={data.daily} />}
    </div>
  );
}

function SourceTab({ data }: { data: SourceData[] }) {
  const max = data[0]?.revenue || 1;
  return (
    <div className="space-y-2.5">
      {data.map((s) => (
        <div key={s.source}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-white">{s.source}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">~{s.jobs} conv.</span>
              <span className="text-sm font-medium text-white">{fmtMoney(s.revenue)}</span>
            </div>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${getBarColor(s.source)} transition-all`} style={{ width: `${(s.revenue / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function TeamTab({ data }: { data: TeamData[] }) {
  const max = data[0]?.revenue || 1;
  return (
    <div className="space-y-2.5">
      {data.map((t) => (
        <div key={t.team}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-white">{t.team}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">{t.jobs} entries</span>
              {t.payout > 0 && <span className="text-xs text-amber-400">{fmtMoney(t.payout)} paid</span>}
              <span className="text-sm font-medium text-white">{fmtMoney(t.revenue)}</span>
            </div>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-cyan-500 transition-all" style={{ width: `${(t.revenue / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MonthlyTab({ data }: { data: MonthData[] }) {
  const max = Math.max(...data.map((m) => m.revenue), 1);
  return (
    <div className="space-y-3">
      {data.map((m) => {
        const [year, month] = m.month.split("-");
        const label = MONTH_NAMES[month] ? `${MONTH_NAMES[month]} ${year}` : m.month;
        return (
          <div key={m.month}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-white">{label}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{m.jobs} days</span>
                <span className="text-sm font-medium text-white">{fmtMoney(m.revenue)}</span>
              </div>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${(m.revenue / max) * 100}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DailyTab({ data }: { data: DailyData[] }) {
  const max = Math.max(...data.map((d) => d.revenue), 1);
  // Show as a mini bar chart, most recent first
  const reversed = [...data].reverse();
  return (
    <div className="space-y-1 max-h-96 overflow-y-auto pr-1">
      {reversed.map((d) => {
        const dt = new Date(d.date + "T12:00:00");
        const label = dt.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" });
        return (
          <div key={d.date} className="flex items-center gap-3 py-0.5">
            <span className="text-xs text-slate-400 w-28 shrink-0 font-mono">{label}</span>
            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500/80 transition-all"
                style={{ width: `${(d.revenue / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-white w-24 text-right shrink-0 font-mono">{fmtMoney(d.revenue)}</span>
          </div>
        );
      })}
    </div>
  );
}
