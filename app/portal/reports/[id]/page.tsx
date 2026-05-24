import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import Badge from "@/components/admin/shared/Badge";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = { title: "Report Details" };

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getSectionTypeColor(type: string): string {
  const map: Record<string, string> = {
    TRAFFIC: "text-cyan-400 bg-cyan-400/10",
    ADS: "text-amber bg-amber/10",
    SEO: "text-emerald bg-emerald/10",
    SOCIAL: "text-purple-400 bg-purple-400/10",
    CUSTOM: "text-slate-400 bg-white/10",
  };
  return map[type] || map.CUSTOM;
}

export default async function PortalReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id || !session.user.clientId) redirect("/auth/sign-in");

  const { id } = await params;
  const clientId = session.user.clientId;

  const report = await prisma.clientReport.findUnique({
    where: { id },
    include: {
      sections: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  // Ensure report belongs to client and is published
  if (!report || report.clientId !== clientId || report.status !== "PUBLISHED") notFound();

  return (
    <div className="space-y-8 max-w-4xl">
      <Link
        href="/portal/reports"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Reports
      </Link>

      {/* Report header */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center text-teal flex-shrink-0">
            <FileText size={24} />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold text-white">{report.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge label={report.period} variant="cyan" />
              <span className="text-sm text-slate-400">
                {formatDate(report.startDate)} - {formatDate(report.endDate)}
              </span>
            </div>
            {report.summary && (
              <p className="text-sm text-slate-300 mt-4">{report.summary}</p>
            )}
          </div>
        </div>
      </div>

      {/* Report sections */}
      {report.sections.map((section) => {
        const data = section.data as Record<string, unknown>;

        return (
          <div key={section.id} className="bg-[#111827] border border-white/6 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider ${getSectionTypeColor(section.type)}`}>
                {section.type}
              </span>
              <h2 className="font-display text-lg font-semibold text-white">{section.title}</h2>
            </div>

            {/* Render section data as key-value pairs */}
            {data && typeof data === "object" && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                {Object.entries(data).map(([key, value]) => {
                  // Skip nested objects/arrays for simple rendering
                  if (typeof value === "object" && value !== null) return null;
                  return (
                    <div key={key} className="bg-white/5 rounded-lg p-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                        {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim()}
                      </p>
                      <p className="text-sm font-medium text-white">{String(value)}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {section.notes && (
              <div className="mt-4 p-4 rounded-lg bg-white/3 border border-white/5">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Notes</p>
                <p className="text-sm text-slate-300 whitespace-pre-wrap">{section.notes}</p>
              </div>
            )}
          </div>
        );
      })}

      {report.sections.length === 0 && (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-12 text-center">
          <p className="text-slate-500">This report has no sections yet.</p>
        </div>
      )}
    </div>
  );
}
