import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Suspense } from "react";
import Badge from "@/components/admin/shared/Badge";
import SearchFilter from "@/components/shared/SearchFilter";
import Pagination from "@/components/shared/Pagination";

export const metadata = { title: "Approvals" };

const STATUS_OPTIONS = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Revision Requested", value: "REVISION_REQUESTED" },
  { label: "Expired", value: "EXPIRED" },
];

function getStatusVariant(status: string): "emerald" | "amber" | "red" | "slate" | "cyan" | "purple" {
  const map: Record<string, "emerald" | "amber" | "red" | "slate" | "cyan" | "purple"> = {
    PENDING: "amber",
    APPROVED: "emerald",
    REVISION_REQUESTED: "red",
    EXPIRED: "slate",
  };
  return map[status] || "slate";
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function PortalApprovalsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; status?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id || !session.user.clientId) redirect("/auth/sign-in");

  const clientId = session.user.clientId;
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(params.limit || "20", 10)));
  const statusFilter = params.status || "";

  try {
    // Expire overdue approvals (check-on-read)
    await prisma.approval.updateMany({
      where: { clientId, status: "PENDING", dueDate: { lt: new Date() } },
      data: { status: "EXPIRED" },
    });

    const where: Record<string, unknown> = { clientId, deletedAt: null };
    if (statusFilter && STATUS_OPTIONS.some((o) => o.value === statusFilter)) {
      where.status = statusFilter;
    }

    const [approvals, totalCount] = await Promise.all([
      prisma.approval.findMany({
        where,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          category: true,
          status: true,
          dueDate: true,
          createdAt: true,
          fileUrls: true,
          _count: { select: { responses: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.approval.count({ where }),
    ]);

    // Counts by status
    const counts = await prisma.approval.groupBy({
      by: ["status"],
      where: { clientId, deletedAt: null },
      _count: true,
    });
    const pendingCount = counts.find((c) => c.status === "PENDING")?._count ?? 0;
    const approvedCount = counts.find((c) => c.status === "APPROVED")?._count ?? 0;
    const revisionCount = counts.find((c) => c.status === "REVISION_REQUESTED")?._count ?? 0;

    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Approvals</h1>
          <p className="text-sm text-slate-400 mt-1">
            Review and respond to items requiring your approval.
          </p>
        </div>

        {/* Summary cards */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-[#111827] border border-white/6 rounded-xl px-5 py-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Pending</span>
            <p className="text-lg font-bold text-amber">{pendingCount}</p>
          </div>
          <div className="bg-[#111827] border border-white/6 rounded-xl px-5 py-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Approved</span>
            <p className="text-lg font-bold text-teal">{approvedCount}</p>
          </div>
          <div className="bg-[#111827] border border-white/6 rounded-xl px-5 py-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Needs Revision</span>
            <p className="text-lg font-bold text-red-400">{revisionCount}</p>
          </div>
        </div>

        {/* Filter */}
        <Suspense fallback={null}>
          <SearchFilter statusOptions={STATUS_OPTIONS} />
        </Suspense>

        {/* Approval list */}
        <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
          {approvals.length > 0 ? (
            <div className="divide-y divide-white/5">
              {approvals.map((approval) => (
                <Link
                  key={approval.id}
                  href={`/portal/approvals/${approval.id}`}
                  className="block p-4 hover:bg-white/3 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-white truncate">
                          {approval.title}
                        </h3>
                        <Badge label={approval.status.replace(/_/g, " ")} variant={getStatusVariant(approval.status)} />
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        {approval.category && <span>{approval.category}</span>}
                        <span>{formatDate(approval.createdAt)}</span>
                        {approval.fileUrls.length > 0 && (
                          <span>{approval.fileUrls.length} file{approval.fileUrls.length !== 1 ? "s" : ""}</span>
                        )}
                        {approval._count.responses > 0 && (
                          <span>{approval._count.responses} response{approval._count.responses !== 1 ? "s" : ""}</span>
                        )}
                      </div>
                    </div>
                    {approval.dueDate && (
                      <div className="text-right shrink-0">
                        <p className={`text-xs ${new Date(approval.dueDate) < new Date() ? "text-red-400" : "text-slate-500"}`}>
                          Due {formatDate(approval.dueDate)}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-400 text-sm">No approvals yet.</p>
              <p className="text-slate-500 text-xs mt-1">Your team will send items for review here.</p>
            </div>
          )}
        </div>

        <Suspense fallback={null}>
          <Pagination totalCount={totalCount} page={page} limit={limit} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Failed to load approvals:", error);
    return (
      <div className="space-y-4">
        <h1 className="font-display text-2xl font-bold text-white">Approvals</h1>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <p className="text-red-400 text-sm">Failed to load approvals. Please try again later.</p>
        </div>
      </div>
    );
  }
}
