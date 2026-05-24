import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import ReportView from "@/components/reports/ReportView";
import PublishButton from "./PublishButton";
import ExportButton from "./ExportButton";
import DeleteReportButton from "./DeleteReportButton";

export const metadata = { title: "View Report | Admin" };

export default async function ReportViewPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const { id } = await params;

  const report = await prisma.clientReport.findFirst({
    where: { id, client: { agencyId } },
    include: {
      client: { select: { id: true, name: true, domain: true } },
      sections: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!report) notFound();

  // Serialize dates for the client components
  const serializedReport = {
    ...report,
    startDate: report.startDate.toISOString(),
    endDate: report.endDate.toISOString(),
    createdAt: report.createdAt.toISOString(),
    updatedAt: report.updatedAt.toISOString(),
    sections: report.sections.map((s) => ({
      ...s,
      data: s.data as Record<string, unknown>,
      createdAt: s.createdAt.toISOString(),
    })),
  };

  return (
    <div className="space-y-6">
      {/* Navigation + Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/reports"
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Reports
        </Link>
        <div className="flex items-center gap-3">
          <DeleteReportButton reportId={report.id} reportTitle={report.title} />
          <Link
            href={`/admin/reports/${report.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <Pencil size={14} />
            Edit
          </Link>
          <ExportButton reportId={report.id} />
          {report.status === "DRAFT" && (
            <PublishButton reportId={report.id} hasSections={report.sections.length > 0} />
          )}
        </div>
      </div>

      <ReportView report={serializedReport} />
    </div>
  );
}
