import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import type { Prisma } from "@/lib/generated/prisma/client";
import Link from "next/link";
import { Plus, ClipboardList, Send, CheckCircle, Clock } from "lucide-react";
import { getStepsForServices } from "@/lib/onboarding-steps";
import OnboardingStatusBadge from "@/components/admin/onboarding/OnboardingStatusBadge";
import MetricCard from "@/components/admin/shared/MetricCard";
import SearchFilter from "@/components/shared/SearchFilter";
import Pagination from "@/components/shared/Pagination";

export const metadata = { title: "Onboarding | Admin" };

export default async function OnboardingListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; q?: string; status?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const { page: pageStr, limit: limitStr, q, status } = await searchParams;
  const page = Math.max(1, parseInt(pageStr || "1"));
  const limit = Math.max(1, Math.min(100, parseInt(limitStr || "20")));

  const where: Prisma.ClientOnboardingWhereInput = { client: { agencyId } };
  if (q) {
    where.client = { ...where.client as Record<string, unknown>, name: { contains: q, mode: "insensitive" } };
  }
  if (status) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where.status = status as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let onboardings: any[] = [];
  let filteredCount = 0, totalCount = 0, submittedCount = 0, completedCount = 0, inProgressCount = 0;
  let pageError = false;

  try {
    [onboardings, filteredCount, totalCount, submittedCount, completedCount, inProgressCount] = await Promise.all([
      prisma.clientOnboarding.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          client: { select: { id: true, name: true } },
          createdBy: { select: { id: true, name: true } },
          _count: { select: { responses: true, files: true } },
        },
      }),
      prisma.clientOnboarding.count({ where }),
      prisma.clientOnboarding.count({ where: { client: { agencyId } } }),
      prisma.clientOnboarding.count({ where: { client: { agencyId }, status: "SUBMITTED" } }),
      prisma.clientOnboarding.count({ where: { client: { agencyId }, status: "COMPLETED" } }),
      prisma.clientOnboarding.count({ where: { client: { agencyId }, status: "IN_PROGRESS" } }),
    ]);
  } catch {
    pageError = true;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">Onboarding</h1>
          <p className="text-sm text-slate-400 mt-1">Manage client onboarding questionnaires</p>
        </div>
        <Link
          href="/admin/onboarding/new"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          New Onboarding
        </Link>
      </div>

      {pageError && (
        <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-sm text-red-400">
          Failed to load onboarding data. Try refreshing the page.
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total" value={totalCount} icon={ClipboardList} accent="cyan" />
        <MetricCard label="In Progress" value={inProgressCount} icon={Clock} accent="amber" />
        <MetricCard label="Submitted" value={submittedCount} icon={Send} accent="purple" />
        <MetricCard label="Completed" value={completedCount} icon={CheckCircle} accent="emerald" />
      </div>

      {/* Search & Filter */}
      <Suspense>
        <SearchFilter
          placeholder="Search by client name..."
          statusOptions={[
            { label: "Draft", value: "DRAFT" },
            { label: "Sent", value: "SENT" },
            { label: "In Progress", value: "IN_PROGRESS" },
            { label: "Submitted", value: "SUBMITTED" },
            { label: "Completed", value: "COMPLETED" },
          ]}
        />
      </Suspense>

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Client</th>
              <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Services</th>
              <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Status</th>
              <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Progress</th>
              <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Files</th>
              <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Created</th>
              <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Created By</th>
            </tr>
          </thead>
          <tbody>
            {onboardings.map((ob) => (
              <tr key={ob.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/onboarding/${ob.id}`}
                    className="text-sm text-white font-medium hover:text-emerald-400 transition-colors"
                  >
                    {ob.client.name}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {ob.serviceTypes.map((s: string) => (
                      <span
                        key={s}
                        className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/5 text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <OnboardingStatusBadge status={ob.status} />
                </td>
                <td className="px-4 py-3 text-sm text-slate-400">
                  {ob._count.responses}/{getStepsForServices(ob.serviceTypes).length} steps
                </td>
                <td className="px-4 py-3 text-sm text-slate-400">
                  {ob._count.files}
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {new Date(ob.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {ob.createdBy.name || "—"}
                </td>
              </tr>
            ))}
            {onboardings.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-500">
                  No onboardings yet. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Suspense>
          <Pagination totalCount={filteredCount} page={page} limit={limit} />
        </Suspense>
      </div>
    </div>
  );
}
