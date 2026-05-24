"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import ReportBuilder from "@/components/admin/reports/ReportBuilder";

interface ReportSection {
  id: string;
  type: "TRAFFIC" | "ADS" | "SEO" | "SOCIAL" | "CUSTOM";
  title: string;
  data: Record<string, unknown>;
  sortOrder: number;
  notes: string | null;
  createdAt: string;
}

interface Report {
  id: string;
  clientId: string;
  client: { id: string; name: string; domain?: string };
  title: string;
  period: string;
  startDate: string;
  endDate: string;
  status: string;
  summary: string | null;
  sections: ReportSection[];
  createdAt: string;
  updatedAt: string;
}

export default function ReportEditPage() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReport = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/reports/${id}`);
      if (!res.ok) throw new Error("Failed to load report");
      const data = await res.json();
      setReport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-red-400">{error || "Report not found"}</p>
        <Link
          href="/admin/reports"
          className="text-sm text-emerald-400 hover:text-emerald-300 inline-block"
        >
          Back to Reports
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <Link
        href={`/admin/reports/${report.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Report View
      </Link>

      {/* Report Builder */}
      <ReportBuilder report={report} />
    </div>
  );
}
