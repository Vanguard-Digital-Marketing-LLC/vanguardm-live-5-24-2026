import { Calendar, Building2, Clock } from "lucide-react";
import TrafficSection from "./sections/TrafficSection";
import AdsSection from "./sections/AdsSection";
import SeoSection from "./sections/SeoSection";
import SocialSection from "./sections/SocialSection";
import CustomSection from "./sections/CustomSection";
import MarketingSection from "./sections/MarketingSection";
import CallsSection from "./sections/CallsSection";

interface Section {
  id: string;
  type: "TRAFFIC" | "ADS" | "SEO" | "SOCIAL" | "CUSTOM" | "MARKETING" | "CALLS";
  title: string;
  data: Record<string, unknown>;
  notes: string | null;
  sortOrder: number;
}

interface Report {
  id: string;
  title: string;
  period: string;
  startDate: string;
  endDate: string;
  status: string;
  summary: string | null;
  client: { id: string; name: string; domain?: string | null };
  sections: Section[];
}

const PERIOD_LABELS: Record<string, string> = {
  WEEKLY: "Weekly Report",
  MONTHLY: "Monthly Report",
  QUARTERLY: "Quarterly Report",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function SectionRenderer({ section }: { section: Section }) {
  switch (section.type) {
    case "TRAFFIC":
      return <TrafficSection data={section.data} />;
    case "ADS":
      return <AdsSection data={section.data} />;
    case "SEO":
      return <SeoSection data={section.data} />;
    case "SOCIAL":
      return <SocialSection data={section.data} />;
    case "CUSTOM":
      return <CustomSection data={section.data} />;
    case "MARKETING":
      return <MarketingSection data={section.data} />;
    case "CALLS":
      return <CallsSection data={section.data} />;
    default:
      return null;
  }
}

export default function ReportView({ report }: { report: Report }) {
  const sortedSections = [...report.sections].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-8">
      {/* Report Header */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">{report.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <Building2 size={14} /> {report.client.name}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <Clock size={14} /> {PERIOD_LABELS[report.period] || report.period}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <Calendar size={14} /> {formatDate(report.startDate)} &ndash; {formatDate(report.endDate)}
              </span>
            </div>
          </div>
          <div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                report.status === "PUBLISHED"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-amber-500/10 text-amber-400"
              }`}
            >
              {report.status}
            </span>
          </div>
        </div>

        {/* Executive Summary */}
        {report.summary && (
          <div className="mt-6 pt-6 border-t border-white/6">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Executive Summary</h2>
            <div className="text-sm text-slate-300 leading-relaxed">
              {report.summary.split("\n").map((line, idx) => (
                <p key={idx} className="mb-2 last:mb-0">{line || "\u00A0"}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Report Sections */}
      {sortedSections.map((section) => (
        <div key={section.id} className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="font-display text-lg font-semibold text-white mb-6">{section.title}</h2>
          <SectionRenderer section={section} />
        </div>
      ))}

      {sortedSections.length === 0 && (
        <div className="bg-[#111827] border border-white/6 border-dashed rounded-xl p-12 text-center">
          <p className="text-sm text-slate-500">This report has no sections yet.</p>
        </div>
      )}
    </div>
  );
}
