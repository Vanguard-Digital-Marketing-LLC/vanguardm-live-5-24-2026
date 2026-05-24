import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Suspense } from "react";
import Badge from "@/components/admin/shared/Badge";
import { FileText, ExternalLink } from "lucide-react";
import Pagination from "@/components/shared/Pagination";

export const metadata = { title: "Reports" };

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getPeriodLabel(period: string): string {
  const map: Record<string, string> = {
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    QUARTERLY: "Quarterly",
  };
  return map[period] || period;
}

export default async function PortalReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id || !session.user.clientId) redirect("/auth/sign-in");

  const clientId = session.user.clientId;
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(params.limit || "12", 10)));

  try {
    const where = { clientId, status: "PUBLISHED" as const };

    const [reports, totalCount] = await Promise.all([
      prisma.clientReport.findMany({
        where,
        orderBy: { endDate: "desc" },
        include: {
          sections: {
            select: { type: true },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.clientReport.count({ where }),
    ]);

    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm text-slate-400 mt-1">
            Performance reports and analytics for your account
          </p>
        </div>

        {reports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {reports.map((report) => {
              const sectionTypes = [...new Set(report.sections.map((s) => s.type))];

              return (
                <Link
                  key={report.id}
                  href={`/portal/reports/${report.id}`}
                  className="bg-[#111827] border border-white/6 rounded-xl p-6 hover:border-teal/30 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal flex-shrink-0">
                      <FileText size={20} />
                    </div>
                    <Badge label={getPeriodLabel(report.period)} variant="cyan" />
                  </div>

                  <h3 className="font-display text-base font-semibold text-white group-hover:text-teal transition-colors mt-3 mb-1">
                    {report.title}
                  </h3>

                  <p className="text-xs text-slate-500 mb-3">
                    {formatDate(report.startDate)} - {formatDate(report.endDate)}
                  </p>

                  {report.summary && (
                    <p className="text-sm text-slate-400 line-clamp-2 mb-4">{report.summary}</p>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {sectionTypes.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-slate-400"
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-xs text-teal opacity-0 group-hover:opacity-100 transition-opacity">
                    View report <ExternalLink size={12} />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#111827] border border-white/6 rounded-xl p-12 text-center">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-slate-500" />
            </div>
            <p className="text-slate-500 mb-1">No reports available yet</p>
            <p className="text-xs text-slate-600">Reports will appear here once they are published by your team.</p>
          </div>
        )}

        {/* Pagination */}
        <Suspense fallback={null}>
          <Pagination totalCount={totalCount} page={page} limit={limit} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Failed to load reports:", error);
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm text-slate-400 mt-1">Performance reports and analytics for your account</p>
        </div>
        <div className="bg-[#111827] border border-red-500/20 rounded-xl p-12 text-center">
          <p className="text-red-400">Failed to load reports. Please try again later.</p>
        </div>
      </div>
    );
  }
}
