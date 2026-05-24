import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import {
  Users,
  BookOpen,
  Award,
  Trophy,
  MessageSquare,
  KanbanSquare,
  Building2,
  LifeBuoy,
} from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import Badge from "@/components/admin/shared/Badge";
import ServiceTypeBadge from "@/components/admin/shared/ServiceTypeBadge";
import Link from "next/link";

export default async function AdminOverviewPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  let userCount = 0, purchaseCount = 0, certificateCount = 0, unreadLeads = 0,
    activeClients = 0, openTickets = 0, taskCount = 0;
  let quizAttempts: { passed: boolean }[] = [];
  let recentLeads: { id: string; name: string; email: string; service: string | null; read: boolean; createdAt: Date }[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentAttempts: any[] = [], tasksByService: any[] = [], upcomingTasks: any[] = [], upcomingTickets: any[] = [];
  let dashboardError = false;

  try {
    [
      userCount, purchaseCount, certificateCount, unreadLeads,
      activeClients, openTickets, quizAttempts, recentLeads,
      recentAttempts, tasksByService, upcomingTasks, upcomingTickets, taskCount,
    ] = await Promise.all([
      prisma.user.count({ where: { agencyId } }),
      prisma.coursePurchase.count({ where: { user: { agencyId } } }),
      prisma.certificate.count({ where: { user: { agencyId } } }),
      prisma.contactSubmission.count({ where: { agencyId, read: false } }),
      prisma.client.count({ where: { agencyId, status: "ACTIVE" } }),
      prisma.supportTicket.count({ where: { client: { agencyId }, status: { in: ["OPEN", "IN_PROGRESS"] } } }),
      prisma.quizAttempt.findMany({
        where: { user: { agencyId }, attemptedAt: { gte: thirtyDaysAgo } },
        select: { passed: true },
      }),
      prisma.contactSubmission.findMany({
        where: { agencyId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, email: true, service: true, read: true, createdAt: true },
      }),
      prisma.quizAttempt.findMany({
        where: { user: { agencyId } },
        orderBy: { attemptedAt: "desc" },
        take: 5,
        include: { user: { select: { name: true, email: true } } },
      }),
      prisma.task.groupBy({
        by: ["serviceType"],
        where: { client: { agencyId }, serviceType: { not: null } },
        _count: true,
      }),
      prisma.task.findMany({
        where: { client: { agencyId }, dueDate: { gte: now, lte: sevenDaysFromNow }, status: { not: "COMPLETED" } },
        orderBy: { dueDate: "asc" },
        take: 5,
        include: {
          client: { select: { name: true } },
          assignee: { select: { name: true } },
        },
      }),
      prisma.supportTicket.findMany({
        where: { client: { agencyId }, slaDeadline: { gte: now, lte: sevenDaysFromNow }, status: { notIn: ["RESOLVED", "CLOSED"] } },
        orderBy: { slaDeadline: "asc" },
        take: 5,
        include: {
          client: { select: { name: true } },
          assignee: { select: { name: true } },
        },
      }),
      prisma.task.count({ where: { client: { agencyId } } }),
    ]);
  } catch {
    dashboardError = true;
  }

  const passedCount = quizAttempts.filter((a) => a.passed).length;
  const passRate = quizAttempts.length > 0 ? Math.round((passedCount / quizAttempts.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Overview</h1>
        <p className="text-sm text-slate-400 mt-1">Dashboard metrics and recent activity</p>
      </div>

      {dashboardError && (
        <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-sm text-red-400">
          Some dashboard data failed to load. Try refreshing the page.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        <MetricCard label="Active Clients" value={activeClients} icon={Building2} accent="emerald" />
        <MetricCard label="Open Tickets" value={openTickets} icon={LifeBuoy} accent="red" />
        <MetricCard label="Open Leads" value={unreadLeads} icon={MessageSquare} accent="amber" />
        <MetricCard label="Total Users" value={userCount} icon={Users} accent="emerald" />
        <MetricCard label="Exam Completions" value={quizAttempts.length} trend={`${passRate}% pass`} icon={Award} accent="emerald" />
        <MetricCard label="Certificates" value={certificateCount} icon={Trophy} accent="amber" />
        <MetricCard label="Courses" value={purchaseCount} icon={BookOpen} accent="emerald" />
        <MetricCard label="Tasks" value={taskCount} icon={KanbanSquare} accent="amber" />
      </div>

      {/* Tasks by Service Line + Upcoming Deadlines */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="font-display text-base font-semibold text-white mb-4">Tasks by Service Line</h2>
          <div className="space-y-3">
            {tasksByService.length > 0 ? tasksByService.map((group) => (
              <div key={group.serviceType} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <ServiceTypeBadge type={group.serviceType || "NONE"} />
                <span className="text-sm font-bold text-white">{group._count}</span>
              </div>
            )) : (
              <p className="text-sm text-slate-500">No tasks with service types assigned yet.</p>
            )}
          </div>
        </div>

        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="font-display text-base font-semibold text-white mb-4">Upcoming Deadlines (7 days)</h2>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">{task.title}</p>
                  <p className="text-xs text-slate-500">{task.client?.name || "No client"} · {task.assignee?.name || "Unassigned"}</p>
                </div>
                <span className="text-xs text-amber-400 flex-shrink-0">
                  {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            ))}
            {upcomingTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border-l-2 border-red-400/30">
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">🎫 {ticket.title}</p>
                  <p className="text-xs text-slate-500">{ticket.client?.name || "No client"} · {ticket.assignee?.name || "Unassigned"}</p>
                </div>
                <span className="text-xs text-red-400 flex-shrink-0">
                  SLA: {ticket.slaDeadline && new Date(ticket.slaDeadline).toLocaleDateString()}
                </span>
              </div>
            ))}
            {upcomingTasks.length === 0 && upcomingTickets.length === 0 && (
              <p className="text-sm text-slate-500">No upcoming deadlines.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="font-display text-base font-semibold text-white mb-4">Recent Leads</h2>
          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">
                    {lead.name}
                    {!lead.read && <span className="ml-1.5 inline-block w-2 h-2 bg-emerald-400 rounded-full" />}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{lead.email}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  {lead.service && <Badge label={lead.service} variant="emerald" />}
                  <p className="text-[10px] text-slate-600 mt-1">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {recentLeads.length === 0 && <p className="text-sm text-slate-500">No leads yet.</p>}
          </div>
        </div>

        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="font-display text-base font-semibold text-white mb-4">Recent Exams</h2>
          <div className="space-y-3">
            {recentAttempts.map((attempt) => (
              <div key={attempt.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">{attempt.user.name || attempt.user.email}</p>
                  <p className="text-xs text-slate-500 truncate">{attempt.courseSlug}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-sm font-bold ${attempt.passed ? "text-emerald-400" : "text-red-400"}`}>
                    {attempt.score}/{attempt.totalQuestions}
                  </span>
                  <p className="text-[10px] text-slate-600">
                    {attempt.passed ? "Passed" : "Failed"} · {new Date(attempt.attemptedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {recentAttempts.length === 0 && <p className="text-sm text-slate-500">No exams yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
