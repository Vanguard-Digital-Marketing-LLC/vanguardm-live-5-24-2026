import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import Badge from "@/components/admin/shared/Badge";
import TicketThread from "@/components/admin/tickets/TicketThread";
import { ArrowLeft, Clock, User } from "lucide-react";

export const metadata = { title: "Ticket Details" };

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
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function PortalTicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id || !session.user.clientId) redirect("/auth/sign-in");

  const { id } = await params;
  const clientId = session.user.clientId;

  const ticket = await prisma.supportTicket.findUnique({
    where: { id },
    include: {
      assignee: { select: { name: true } },
    },
  });

  if (!ticket || ticket.clientId !== clientId) notFound();

  return (
    <div className="space-y-6 max-w-3xl">
      <Link
        href="/portal/tickets"
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
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
        {ticket.description ? (
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Description
            </h2>
            <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
              {ticket.description}
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">No description provided.</p>
        )}
      </div>

      {/* Meta info */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <Clock size={16} className="text-slate-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Created</p>
              <p className="text-sm text-white">{formatDate(ticket.createdAt)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <Clock size={16} className="text-slate-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Last Updated</p>
              <p className="text-sm text-white">{formatDate(ticket.updatedAt)}</p>
            </div>
          </div>

          {ticket.assignee && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <User size={16} className="text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Assigned To</p>
                <p className="text-sm text-white">{ticket.assignee.name}</p>
              </div>
            </div>
          )}

          {ticket.resolvedAt && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <Clock size={16} className="text-teal-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Resolved</p>
                <p className="text-sm text-white">{formatDate(ticket.resolvedAt)}</p>
              </div>
            </div>
          )}

          {ticket.slaDeadline && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <Clock size={16} className={new Date(ticket.slaDeadline) < new Date() && !ticket.resolvedAt ? "text-red-400" : "text-slate-400"} />
              </div>
              <div>
                <p className="text-xs text-slate-500">SLA Deadline</p>
                <p className={`text-sm ${new Date(ticket.slaDeadline) < new Date() && !ticket.resolvedAt ? "text-red-400" : "text-white"}`}>
                  {formatDate(ticket.slaDeadline)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Thread */}
      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden" style={{ minHeight: 300 }}>
        <div className="px-4 py-3 border-b border-white/6">
          <h2 className="text-sm font-semibold text-white">Messages</h2>
        </div>
        <TicketThread
          ticketId={ticket.id}
          apiBase="/api/portal/tickets"
          showInternalToggle={false}
          currentUserId={session.user.id}
        />
      </div>
    </div>
  );
}
