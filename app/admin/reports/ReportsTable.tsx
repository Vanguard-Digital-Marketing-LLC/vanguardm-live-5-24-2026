"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, Trash2, Loader2, Check, X, Download } from "lucide-react";
import Badge from "@/components/admin/shared/Badge";

interface Report {
  id: string;
  title: string;
  period: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  client: {
    id: string;
    name: string;
    ga4PropertyId?: string | null;
    searchConsoleUrl?: string | null;
    googleAdsCustomerId?: string | null;
    nimbataProjectId?: string | null;
  };
  _count: { sections: number };
}

const PERIOD_BADGE: Record<string, "emerald" | "amber" | "cyan"> = {
  WEEKLY: "cyan",
  MONTHLY: "emerald",
  QUARTERLY: "amber",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ReportsTable({ reports }: { reports: Report[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [fetchProgress, setFetchProgress] = useState<{ report: number; totalReports: number; section: string } | null>(null);
  const [fetchErrors, setFetchErrors] = useState<string[]>([]);

  const allSelected = reports.length > 0 && selected.size === reports.length;
  const someSelected = selected.size > 0;

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(reports.map((r) => r.id)));
    }
  }

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleBulkDelete() {
    if (selected.size === 0) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/reports", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }
      const { deleted } = await res.json();
      setSelected(new Set());
      setConfirming(false);
      router.refresh();
      if (deleted < selected.size) {
        alert(`Deleted ${deleted} of ${selected.size} reports. Some may not have been found.`);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete reports.");
    } finally {
      setDeleting(false);
    }
  }

  const FETCHABLE_TYPES = ["TRAFFIC", "ADS", "SEO", "CALLS"];

  // Determine which sections a client should have based on their integrations
  function getSectionsForClient(client: Report["client"]): { type: string; title: string }[] {
    const result: { type: string; title: string }[] = [];
    if (client.ga4PropertyId) result.push({ type: "TRAFFIC", title: "Website Traffic" });
    if (client.searchConsoleUrl) result.push({ type: "SEO", title: "SEO Performance" });
    if (client.googleAdsCustomerId) result.push({ type: "ADS", title: "Google Ads" });
    if (client.nimbataProjectId) result.push({ type: "CALLS", title: "Call Tracking" });
    return result;
  }

  async function handleBulkFetch() {
    const ids = Array.from(selected);
    if (ids.length === 0) return;

    setFetchErrors([]);
    const errors: string[] = [];

    for (let ri = 0; ri < ids.length; ri++) {
      const reportId = ids[ri];
      const report = reports.find((r) => r.id === reportId);
      const reportLabel = report?.client.name || reportId.slice(-6);

      setFetchProgress({ report: ri + 1, totalReports: ids.length, section: `${reportLabel}: loading sections...` });

      // 1. Get sections for this report
      let sections: { id: string; type: string; title: string }[];
      try {
        const res = await fetch(`/api/admin/reports/${reportId}/sections`);
        if (!res.ok) throw new Error("Failed to load sections");
        sections = await res.json();
      } catch {
        errors.push(`${reportLabel}: could not load sections`);
        continue;
      }

      // 2. Auto-create sections if report has none (bulk-created reports start empty)
      if (sections.length === 0 && report) {
        const toCreate = getSectionsForClient(report.client);
        if (toCreate.length === 0) {
          errors.push(`${reportLabel}: no integrations configured — skipped`);
          continue;
        }

        setFetchProgress({ report: ri + 1, totalReports: ids.length, section: `${reportLabel}: creating ${toCreate.length} sections...` });

        for (const sec of toCreate) {
          try {
            const res = await fetch(`/api/admin/reports/${reportId}/sections`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ type: sec.type, title: sec.title }),
            });
            if (!res.ok) {
              errors.push(`${reportLabel}: failed to create ${sec.title} section`);
              continue;
            }
            const created = await res.json();
            sections.push({ id: created.id, type: created.type, title: created.title });
          } catch {
            errors.push(`${reportLabel}: network error creating ${sec.title}`);
          }
        }
      }

      const fetchable = sections.filter((s) => FETCHABLE_TYPES.includes(s.type));
      if (fetchable.length === 0) continue;

      // 3. Fetch + save each section
      for (const section of fetchable) {
        setFetchProgress({ report: ri + 1, totalReports: ids.length, section: `${reportLabel}: ${section.title}` });

        try {
          // Fetch live data
          const fetchRes = await fetch(`/api/admin/reports/${reportId}/fetch-data`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sectionType: section.type }),
          });
          const fetchResult = await fetchRes.json();
          if (!fetchRes.ok) {
            errors.push(`${reportLabel} → ${section.title}: ${fetchResult.error || "Failed"}`);
            continue;
          }

          // Save fetched data to section
          const saveRes = await fetch(`/api/admin/reports/${reportId}/sections`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sectionId: section.id, data: fetchResult.data }),
          });
          if (!saveRes.ok) {
            errors.push(`${reportLabel} → ${section.title}: fetched but failed to save`);
          }
        } catch {
          errors.push(`${reportLabel} → ${section.title}: network error`);
        }
      }
    }

    setFetchProgress(null);
    setFetchErrors(errors);
    router.refresh();

    if (errors.length > 0) {
      alert(`Fetch complete with ${errors.length} error(s):\n\n${errors.join("\n")}`);
    } else {
      alert(`Fetch complete! All data fetched successfully for ${ids.length} report(s).`);
    }
  }

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
      {/* Header with bulk actions */}
      <div className="px-6 py-4 border-b border-white/6 flex items-center justify-between relative">
        {someSelected ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-white">
              {selected.size} selected
            </span>
            <button
              onClick={() => { setSelected(new Set()); setConfirming(false); }}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Clear
            </button>
          </div>
        ) : (
          <h2 className="font-display text-base font-semibold text-white">
            All Reports ({reports.length})
          </h2>
        )}

        {someSelected && (
          <div className="flex items-center gap-2">
            {confirming ? (
              <>
                <span className="text-xs text-red-400">
                  Delete {selected.size} report{selected.size > 1 ? "s" : ""}?
                </span>
                <button
                  onClick={handleBulkDelete}
                  disabled={deleting}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/30 transition-colors disabled:opacity-50"
                >
                  {deleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                  Confirm Delete
                </button>
                <button
                  onClick={() => setConfirming(false)}
                  disabled={deleting}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white/5 border border-white/10 text-slate-400 rounded-lg text-xs font-medium hover:text-white transition-colors"
                >
                  <X size={12} />
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleBulkFetch}
                  disabled={fetchProgress !== null}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg text-xs font-medium hover:bg-cyan-500/20 transition-colors disabled:opacity-50"
                >
                  {fetchProgress ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Fetching {fetchProgress.report}/{fetchProgress.totalReports}
                    </>
                  ) : (
                    <>
                      <Download size={12} />
                      Fetch All Data
                    </>
                  )}
                </button>
                <button
                  onClick={() => setConfirming(true)}
                  disabled={fetchProgress !== null}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-slate-400 rounded-lg text-xs font-medium hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={12} />
                  Delete Selected
                </button>
              </>
            )}
          </div>
        )}

        {/* Fetch progress detail */}
        {fetchProgress && (
          <div className="absolute left-6 right-6 top-full mt-1 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-xs text-cyan-300 z-10">
            {fetchProgress.section}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/6">
              <th className="w-10 px-4 py-3">
                <button
                  onClick={toggleAll}
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    allSelected
                      ? "bg-emerald-500 border-emerald-500"
                      : someSelected
                        ? "bg-emerald-500/30 border-emerald-500/50"
                        : "border-white/20 bg-white/5 hover:border-white/40"
                  }`}
                >
                  {allSelected && <Check size={12} className="text-slate-950" />}
                  {someSelected && !allSelected && (
                    <div className="w-2 h-0.5 bg-emerald-400 rounded" />
                  )}
                </button>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Report</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Client</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Period</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Date Range</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Sections</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Created</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              const isSelected = selected.has(report.id);
              return (
                <tr
                  key={report.id}
                  className={`border-b border-white/4 transition-colors ${
                    isSelected ? "bg-emerald-500/[0.06]" : "hover:bg-white/5"
                  }`}
                >
                  <td className="w-10 px-4 py-3">
                    <button
                      onClick={() => toggle(report.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-white/20 bg-white/5 hover:border-white/40"
                      }`}
                    >
                      {isSelected && <Check size={12} className="text-slate-950" />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/reports/${report.id}`}
                      className="flex items-center gap-2 text-sm font-medium text-white hover:text-emerald-400 transition-colors"
                    >
                      <FileText size={14} className="text-slate-500 flex-shrink-0" />
                      {report.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/clients/${report.client.id}`}
                      className="text-sm text-slate-300 hover:text-emerald-400 transition-colors"
                    >
                      {report.client.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Badge label={report.period} variant={PERIOD_BADGE[report.period] || "slate"} />
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                    {formatDate(report.startDate)} &ndash; {formatDate(report.endDate)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                        report.status === "PUBLISHED"
                          ? "bg-emerald/10 text-emerald"
                          : "bg-amber/10 text-amber"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">{report._count.sections}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{formatDate(report.createdAt)}</td>
                </tr>
              );
            })}
            {reports.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-12 text-sm text-slate-500">
                  No reports yet. Click &quot;New Report&quot; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
