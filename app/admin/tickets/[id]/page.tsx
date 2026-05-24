import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import Link from "next/link";
import Badge from "@/components/admin/shared/Badge";
import AgentButton from "@/components/admin/shared/AgentButton";
import TicketThread from "@/components/admin/tickets/TicketThread";
import TicketDetailControls from "@/components/admin/tickets/TicketDetailControls";
import { ArrowLeft, Clock, User, Globe, Tag } from "lucide-react";
import TicketDeleteButton from "@/components/admin/tickets/TicketDeleteButton";

export const metadata = { title: "Ticket Details" };

function getStatusVariant(status: string): "emerald" | "amber" | "red" | "slate" | "cyan" | "purple" {
  const map: Record<string, "emerald" | "amber" | "red" | "slate" | "cyan" | "purple"> = {
    QUEUED: "purple",
    OPEN: "red",
    IN_PROGRESS: "amber",
    WAITING: "cyan",
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
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminTicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") redirect("/admin");

  const { id } = await params;

  const ticket = await prisma.supportTicket.findFirst({
    where: { id, client: { agencyId } },
    include: {
      client: { select: { id: true, name: true, domain: true } },
      assignee: { select: { id: true, name: true } },
    },
  });

  if (!ticket) notFound();

  const users = await prisma.user.findMany({
    where: { agencyId, role: { in: ["ADMIN", "TEAM"] } },
    select: { id: true, name: true, email: true },
  });

  const isOverdue =
    ticket.slaDeadline &&
    new Date(ticket.slaDeadline) < new Date() &&
    !["RESOLVED", "CLOSED"].includes(ticket.status);

  return (
    <div className="space-y-6 max-w-5xl">
      <Link
        href="/admin/tickets"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Tickets
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-xl font-bold text-white mb-2">
            {ticket.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge label={ticket.status.replace(/_/g, " ")} variant={getStatusVariant(ticket.status)} />
            <Badge label={ticket.priority} variant={getPriorityVariant(ticket.priority)} />
            {ticket.source && ticket.source !== "admin" && (
              <Badge label={ticket.source.replace(/_/g, " ")} variant="purple" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {role === "ADMIN" && ["OPEN", "IN_PROGRESS", "WAITING", "QUEUED"].includes(ticket.status) && (
            <AgentButton ticketId={ticket.id} />
          )}
          {role === "ADMIN" && (
            <TicketDeleteButton ticketId={ticket.id} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — thread */}
        <div className="lg:col-span-2">
          {/* Description */}
          {ticket.description && (
            <div className="bg-[#111827] border border-white/6 rounded-xl p-4 mb-4">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</h2>
              <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{ticket.description}</p>
            </div>
          )}

          {/* Message thread */}
          <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden" style={{ minHeight: 400 }}>
            <div className="px-4 py-3 border-b border-white/6">
              <h2 className="text-sm font-semibold text-white">Thread</h2>
            </div>
            <TicketThread
              ticketId={ticket.id}
              apiBase="/api/admin/tickets"
              showInternalToggle={true}
              currentUserId={session.user.id}
            />
          </div>
        </div>

        {/* Right column — meta + controls */}
        <div className="space-y-4">
          {/* Status/Priority/Assignee Controls */}
          <TicketDetailControls
            ticketId={ticket.id}
            currentStatus={ticket.status}
            currentPriority={ticket.priority}
            currentAssigneeId={ticket.assigneeId}
            users={users}
            role={role as "ADMIN" | "TEAM"}
          />

          {/* Meta info */}
          <div className="bg-[#111827] border border-white/6 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</h3>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Globe size={14} className="text-slate-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Client</p>
                <Link href={`/admin/clients/${ticket.client.id}`} className="text-sm text-emerald-400 hover:text-emerald-300 truncate block">
                  {ticket.client.name}
                </Link>
              </div>
            </div>

            {ticket.assignee && (
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <User size={14} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Assigned To</p>
                  <p className="text-sm text-white">{ticket.assignee.name}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Clock size={14} className="text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Created</p>
                <p className="text-sm text-white">{formatDate(ticket.createdAt)}</p>
              </div>
            </div>

            {ticket.slaDeadline && (
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Clock size={14} className={isOverdue ? "text-red-400" : "text-slate-400"} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">SLA Deadline</p>
                  <p className={`text-sm ${isOverdue ? "text-red-400 font-semibold" : "text-white"}`}>
                    {formatDate(ticket.slaDeadline)}
                    {isOverdue && " (OVERDUE)"}
                  </p>
                </div>
              </div>
            )}

            {ticket.resolvedAt && (
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Clock size={14} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Resolved</p>
                  <p className="text-sm text-white">{formatDate(ticket.resolvedAt)}</p>
                </div>
              </div>
            )}

            {ticket.source && (
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Tag size={14} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Source</p>
                  <p className="text-sm text-white capitalize">{ticket.source.replace(/_/g, " ")}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
