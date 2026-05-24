import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import {
  FolderKanban,
  LifeBuoy,
  Clock,
  CheckCircle2,
} from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import Badge from "@/components/admin/shared/Badge";
import Link from "next/link";

export const metadata = { title: "Dashboard" };

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusVariant(status: string): "emerald" | "amber" | "red" | "slate" | "cyan" | "purple" {
  const map: Record<string, "emerald" | "amber" | "red" | "slate" | "cyan" | "purple"> = {
    ACTIVE: "emerald",
    PLANNING: "cyan",
    ON_HOLD: "amber",
    COMPLETED: "slate",
    OPEN: "red",
    IN_PROGRESS: "amber",
    WAITING: "purple",
    RESOLVED: "emerald",
    CLOSED: "slate",
  };
  return map[status] || "slate";
}

export default async function PortalDashboardPage() {
  const session = await auth();
  if (!session?.user?.id || !session.user.clientId) redirect("/auth/sign-in");

  const clientId = session.user.clientId;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let client: any = null, activeProjects = 0, openTickets = 0, completedProjects = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentMessages: any[] = [], recentTickets: any[] = [], projects: any[] = [];
  let portalError = false;

  try {
    [client, activeProjects, openTickets, recentMessages, recentTickets, projects, completedProjects] = await Promise.all([
      prisma.client.findUnique({
        where: { id: clientId },
        select: {
          name: true,
          status: true,
          contractStart: true,
          contractEnd: true,
          domain: true,
        },
      }),
      prisma.project.count({
        where: { clientId, status: { in: ["ACTIVE", "PLANNING"] } },
      }),
      prisma.supportTicket.count({
        where: { clientId, status: { in: ["OPEN", "IN_PROGRESS", "WAITING"] } },
      }),
      prisma.clientMessage.findMany({
        where: { clientId, isInternal: false },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { user: { select: { name: true, role: true } } },
      }),
      prisma.supportTicket.findMany({
        where: { clientId },
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          updatedAt: true,
        },
      }),
      prisma.project.findMany({
        where: { clientId, status: { in: ["ACTIVE", "PLANNING"] } },
        take: 5,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          name: true,
          status: true,
          serviceType: true,
        },
      }),
      prisma.project.count({
        where: { clientId, status: "COMPLETED" },
      }),
    ]);
  } catch {
    portalError = true;
  }

  if (!client) redirect("/dashboard");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-sm text-slate-400 mt-1">
          {client.name}{client.domain ? ` — ${client.domain}` : ""}
        </p>
      </div>

      {portalError && (
        <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-sm text-red-400">
          Some data failed to load. Try refreshing the page.
        </div>
      )}

      {/* Client status bar */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Status</p>
            <Badge label={client.status} variant={client.status === "ACTIVE" ? "emerald" : "amber"} />
          </div>
          {client.contractStart && (
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Contract Start</p>
              <p className="text-sm text-white mt-0.5">{formatDate(client.contractStart)}</p>
            </div>
          )}
          {client.contractEnd && (
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Contract End</p>
              <p className="text-sm text-white mt-0.5">{formatDate(client.contractEnd)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Active Projects" value={activeProjects} icon={FolderKanban} accent="emerald" />
        <MetricCard label="Open Tickets" value={openTickets} icon={LifeBuoy} accent={openTickets > 0 ? "red" : "emerald"} />
        <MetricCard label="Completed Projects" value={completedProjects} icon={CheckCircle2} accent="amber" />
        <MetricCard label="Recent Messages" value={recentMessages.length} icon={Clock} accent="cyan" />
      </div>

      {/* Activity feeds */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Projects */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base font-semibold text-white">Active Projects</h2>
            <Link href="/portal/projects" className="text-xs text-teal hover:text-teal-400 transition-colors">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/portal/projects/${project.id}`}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/8 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">{project.name}</p>
                  <p className="text-xs text-slate-500">{project.serviceType}</p>
                </div>
                <Badge label={project.status} variant={getStatusVariant(project.status)} />
              </Link>
            ))}
            {projects.length === 0 && (
              <p className="text-sm text-slate-500">No active projects.</p>
            )}
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base font-semibold text-white">Recent Tickets</h2>
            <Link href="/portal/tickets" className="text-xs text-teal hover:text-teal-400 transition-colors">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentTickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/portal/tickets/${ticket.id}`}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/8 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">{ticket.title}</p>
                  <p className="text-xs text-slate-500">
                    Updated {formatDate(ticket.updatedAt)}
                  </p>
                </div>
                <Badge label={ticket.status.replace("_", " ")} variant={getStatusVariant(ticket.status)} />
              </Link>
            ))}
            {recentTickets.length === 0 && (
              <p className="text-sm text-slate-500">No tickets yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-base font-semibold text-white">Recent Messages</h2>
          <Link href="/portal/messages" className="text-xs text-teal hover:text-teal-400 transition-colors">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {recentMessages.map((msg) => (
            <div key={msg.id} className="p-3 rounded-lg bg-white/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-teal">
                  {msg.user.name || "Team"}
                  {msg.user.role === "ADMIN" || msg.user.role === "TEAM" ? " (Vanguard Digital)" : ""}
                </span>
                <span className="text-[10px] text-slate-600">
                  {formatDate(msg.createdAt)}
                </span>
              </div>
              <p className="text-sm text-slate-300 line-clamp-2">{msg.content}</p>
            </div>
          ))}
          {recentMessages.length === 0 && (
            <p className="text-sm text-slate-500">No messages yet. Start a conversation in the Messages tab.</p>
          )}
        </div>
      </div>
    </div>
  );
}
