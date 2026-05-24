import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Suspense } from "react";
import Badge from "@/components/admin/shared/Badge";
import ServiceTypeBadge from "@/components/admin/shared/ServiceTypeBadge";
import SearchFilter from "@/components/shared/SearchFilter";
import Pagination from "@/components/shared/Pagination";

export const metadata = { title: "Projects" };

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Planning", value: "PLANNING" },
  { label: "On Hold", value: "ON_HOLD" },
  { label: "Completed", value: "COMPLETED" },
];

function getStatusVariant(status: string): "emerald" | "amber" | "red" | "slate" | "cyan" | "purple" {
  const map: Record<string, "emerald" | "amber" | "red" | "slate" | "cyan" | "purple"> = {
    ACTIVE: "emerald",
    PLANNING: "cyan",
    ON_HOLD: "amber",
    COMPLETED: "slate",
  };
  return map[status] || "slate";
}

function formatDate(date: Date | null): string {
  if (!date) return "--";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function PortalProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; status?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id || !session.user.clientId) redirect("/auth/sign-in");

  const clientId = session.user.clientId;
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(params.limit || "12", 10)));
  const statusFilter = params.status || "";

  try {
    // Build where clause
    const where: Record<string, unknown> = { clientId };
    if (statusFilter && STATUS_OPTIONS.some((o) => o.value === statusFilter)) {
      where.status = statusFilter;
    }

    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: { updatedAt: "desc" },
        include: {
          _count: { select: { tasks: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    // Summary counts (unfiltered, for this client)
    const allCounts = await prisma.project.groupBy({
      by: ["status"],
      where: { clientId },
      _count: true,
    });
    const activeCount = allCounts.find((c) => c.status === "ACTIVE")?._count ?? 0;
    const planningCount = allCounts.find((c) => c.status === "PLANNING")?._count ?? 0;
    const completedCount = allCounts.find((c) => c.status === "COMPLETED")?._count ?? 0;

    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-slate-400 mt-1">All projects for your account</p>
        </div>

        {/* Summary stats */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-[#111827] border border-white/6 rounded-xl px-5 py-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Active</span>
            <p className="text-lg font-bold text-teal">{activeCount}</p>
          </div>
          <div className="bg-[#111827] border border-white/6 rounded-xl px-5 py-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Planning</span>
            <p className="text-lg font-bold text-cyan-400">{planningCount}</p>
          </div>
          <div className="bg-[#111827] border border-white/6 rounded-xl px-5 py-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Completed</span>
            <p className="text-lg font-bold text-slate-400">{completedCount}</p>
          </div>
        </div>

        {/* Status filter */}
        <Suspense fallback={null}>
          <SearchFilter statusOptions={STATUS_OPTIONS} />
        </Suspense>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/portal/projects/${project.id}`}
              className="bg-[#111827] border border-white/6 rounded-xl p-6 hover:border-teal/30 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-base font-semibold text-white group-hover:text-teal transition-colors truncate pr-2">
                  {project.name}
                </h3>
                <Badge label={project.status.replace("_", " ")} variant={getStatusVariant(project.status)} />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <ServiceTypeBadge type={project.serviceType} />
              </div>

              {project.description && (
                <p className="text-sm text-slate-400 line-clamp-2 mb-4">{project.description}</p>
              )}

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{project._count.tasks} tasks</span>
                <div className="flex items-center gap-3">
                  {project.startDate && (
                    <span>Started {formatDate(project.startDate)}</span>
                  )}
                  {project.dueDate && (
                    <span className="text-amber">Due {formatDate(project.dueDate)}</span>
                  )}
                </div>
              </div>

              {/* Progress bar based on completed tasks */}
              <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    project.status === "COMPLETED"
                      ? "bg-teal w-full"
                      : project.status === "ACTIVE"
                      ? "bg-teal/60"
                      : "bg-slate-600"
                  }`}
                  style={{
                    width: project.status === "COMPLETED" ? "100%" : project.status === "ON_HOLD" ? "0%" : "50%",
                  }}
                />
              </div>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No projects found for your account.</p>
          </div>
        )}

        {/* Pagination */}
        <Suspense fallback={null}>
          <Pagination totalCount={totalCount} page={page} limit={limit} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Failed to load projects:", error);
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-slate-400 mt-1">All projects for your account</p>
        </div>
        <div className="bg-[#111827] border border-red-500/20 rounded-xl p-12 text-center">
          <p className="text-red-400">Failed to load projects. Please try again later.</p>
        </div>
      </div>
    );
  }
}
