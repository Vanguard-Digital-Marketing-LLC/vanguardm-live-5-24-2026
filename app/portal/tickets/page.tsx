import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Suspense } from "react";
import Badge from "@/components/admin/shared/Badge";
import { Plus } from "lucide-react";
import SearchFilter from "@/components/shared/SearchFilter";
import Pagination from "@/components/shared/Pagination";

export const metadata = { title: "Support Tickets" };

const STATUS_OPTIONS = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Waiting", value: "WAITING" },
  { label: "Resolved", value: "RESOLVED" },
  { label: "Closed", value: "CLOSED" },
];

function getStatusVariant(status: string): "emerald" | "amber" | "red" | "slate" | "cyan" | "purple" {
  const map: Record<string, "emerald" | "amber" | "red" | "slate" | "cyan" | "purple"> = {
    OPEN: "red",
    IN_PROGRESS: "amber",
    WAITING: "purple",
    RESOLVED: "emerald",
    CLOSED: "slate",
  };
  return map[status] || "slate";
}

function getPriorityVariant(priority: string): "emerald" | "amber" | "red" | "slate" | "cyan" | "purple" {
  const map: Record<string, "emerald" | "amber" | "red" | "slate" | "cyan" | "purple"> = {
    LOW: "slate",
    NORMAL: "cyan",
    HIGH: "amber",
    URGENT: "red",
  };
  return map[priority] || "slate";
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function PortalTicketsPage({
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
    // Build where clause
    const where: Record<string, unknown> = { clientId };
    if (statusFilter && STATUS_OPTIONS.some((o) => o.value === statusFilter)) {
      where.status = statusFilter;
    }

    const [tickets, totalCount] = await Promise.all([
      prisma.supportTicket.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          assignee: { select: { name: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.supportTicket.count({ where }),
    ]);

    // Summary counts (unfiltered, for this client)
    const allCounts = await prisma.supportTicket.groupBy({
      by: ["status"],
      where: { clientId },
      _count: true,
    });
    const openCount = allCounts.find((c) => c.status === "OPEN")?._count ?? 0;
    const inProgressCount = allCounts.find((c) => c.status === "IN_PROGRESS")?._count ?? 0;
    const resolvedCount =
      (allCounts.find((c) => c.status === "RESOLVED")?._count ?? 0) +
      (allCounts.find((c) => c.status === "CLOSED")?._count ?? 0);
    const totalTickets = allCounts.reduce((sum, c) => sum + c._count, 0);

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Support Tickets</h1>
            <p className="text-sm text-slate-400 mt-1">
              {totalTickets} total ticket{totalTickets !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/portal/tickets/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal text-white text-sm font-semibold rounded-lg hover:bg-teal-600 transition-colors"
          >
            <Plus size={16} />
            New Ticket
          </Link>
        </div>

        {/* Status summary */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-[#111827] border border-white/6 rounded-xl px-5 py-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Open</span>
            <p className="text-lg font-bold text-red-400">{openCount}</p>
          </div>
          <div className="bg-[#111827] border border-white/6 rounded-xl px-5 py-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider">In Progress</span>
            <p className="text-lg font-bold text-amber">{inProgressCount}</p>
          </div>
          <div className="bg-[#111827] border border-white/6 rounded-xl px-5 py-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Resolved</span>
            <p className="text-lg font-bold text-teal">{resolvedCount}</p>
          </div>
        </div>

        {/* Status filter */}
        <Suspense fallback={null}>
          <SearchFilter statusOptions={STATUS_OPTIONS} />
        </Suspense>

        {/* Ticket list */}
        <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
          {tickets.length > 0 ? (
            <div className="divide-y divide-white/5">
              {tickets.map((ticket) => (
                <Link
                  key={ticket.id}
                  href={`/portal/tickets/${ticket.id}`}
                  className="block p-4 hover:bg-white/3 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-white truncate">
                          {ticket.title}
                        </h3>
                      </div>
                      {ticket.description && (
                        <p className="text-xs text-slate-400 line-clamp-2 mb-2">
                          {ticket.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-[10px] text-slate-500">
                        <span>Created {formatDate(ticket.createdAt)} at {formatTime(ticket.createdAt)}</span>
                        {ticket.assignee && (
                          <span>Assigned to {ticket.assignee.name}</span>
                        )}
                        {ticket.resolvedAt && (
                          <span className="text-teal">Resolved {formatDate(ticket.resolvedAt)}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge label={ticket.priority} variant={getPriorityVariant(ticket.priority)} />
                      <Badge label={ticket.status.replace("_", " ")} variant={getStatusVariant(ticket.status)} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-500 mb-4">You have no support tickets yet.</p>
              <Link
                href="/portal/tickets/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 text-teal text-sm font-medium rounded-lg hover:bg-teal/20 transition-colors"
              >
                <Plus size={16} />
                Create your first ticket
              </Link>
            </div>
          )}

          {/* Pagination */}
          <Suspense fallback={null}>
            <Pagination totalCount={totalCount} page={page} limit={limit} />
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load tickets:", error);
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Support Tickets</h1>
            <p className="text-sm text-slate-400 mt-1">Failed to load tickets</p>
          </div>
        </div>
        <div className="bg-[#111827] border border-red-500/20 rounded-xl p-12 text-center">
          <p className="text-red-400">Failed to load tickets. Please try again later.</p>
        </div>
      </div>
    );
  }
}
