import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import { requireFeature } from "@/lib/require-feature";
import Link from "next/link";
import { BarChart3, Send, Clock, Plus } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import ReportsTable from "./ReportsTable";

export const metadata = { title: "Reports" };

export default async function ReportsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const gate = await requireFeature("reports");
  if (gate) return gate;

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const [reports, totalCount, draftCount, publishedCount] = await Promise.all([
    prisma.clientReport.findMany({
      where: { client: { agencyId } },
      orderBy: { createdAt: "desc" },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            ga4PropertyId: true,
            searchConsoleUrl: true,
            googleAdsCustomerId: true,
            nimbataProjectId: true,
          },
        },
        _count: { select: { sections: true } },
      },
    }),
    prisma.clientReport.count({ where: { client: { agencyId } } }),
    prisma.clientReport.count({ where: { client: { agencyId }, status: "DRAFT" } }),
    prisma.clientReport.count({ where: { client: { agencyId }, status: "PUBLISHED" } }),
  ]);

  // Serialize dates for the client component
  const serializedReports = reports.map((r) => ({
    ...r,
    startDate: r.startDate.toISOString(),
    endDate: r.endDate.toISOString(),
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm text-slate-400 mt-1">Create and manage client performance reports</p>
        </div>
        <Link
          href="/admin/reports/new"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-sm font-display font-semibold uppercase tracking-wider transition-colors"
        >
          <Plus size={16} />
          New Report
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard label="Total Reports" value={totalCount} icon={BarChart3} accent="cyan" />
        <MetricCard label="Drafts" value={draftCount} icon={Clock} accent="amber" />
        <MetricCard label="Published" value={publishedCount} icon={Send} accent="emerald" />
      </div>

      {/* Reports Table with multi-select */}
      <ReportsTable reports={serializedReports} />
    </div>
  );
}
