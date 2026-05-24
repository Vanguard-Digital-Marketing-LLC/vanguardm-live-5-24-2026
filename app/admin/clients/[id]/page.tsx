import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import { ArrowLeft, Globe, Phone, Mail, Calendar, DollarSign } from "lucide-react";
import ServiceTypeBadge from "@/components/admin/shared/ServiceTypeBadge";
import ClientStatusBadge from "@/components/admin/shared/ClientStatusBadge";
import Badge from "@/components/admin/shared/Badge";
import Link from "next/link";
import ClientDetailTabs from "@/components/admin/clients/ClientDetailTabs";
import InviteToPortal from "@/components/admin/clients/InviteToPortal";
import RevenueBreakdown from "@/components/admin/clients/RevenueBreakdown";
import ClientAIChat from "@/components/admin/clients/ClientAIChat";
import { hasFeature } from "@/lib/plan-limits";

export const metadata = { title: "Client Detail" };

const PROJECT_VARIANT: Record<string, "emerald" | "amber" | "red" | "cyan" | "slate"> = {
  PLANNING: "cyan",
  ACTIVE: "emerald",
  ON_HOLD: "amber",
  COMPLETED: "slate",
};

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: { planTier: true },
  });
  const aiChatEnabled = !!agency && hasFeature(agency.planTier, "agent");

  const { id } = await params;

  const client = await prisma.client.findFirst({
    where: { id, agencyId },
    include: {
      contacts: { orderBy: { isPrimary: "desc" } },
      services: true,
      projects: { orderBy: { createdAt: "desc" }, include: { _count: { select: { tasks: true } } } },
      tasks: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { assignee: { select: { id: true, name: true, email: true } } },
      },
      clientNotes: {
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { user: { select: { id: true, name: true } } },
      },
      supportTickets: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { assignee: { select: { id: true, name: true, email: true } } },
      },
      portalUsers: { select: { id: true, name: true, email: true } },
      _count: { select: { tasks: true, supportTickets: true, projects: true, clientNotes: true, clientMessages: true, approvals: true } },
    },
  });

  if (!client) notFound();

  const retainerDisplay = client.monthlyRetainer
    ? `$${client.monthlyRetainer.toLocaleString()}/mo`
    : "N/A";
  const dailyBudgetDisplay = client.dailyBudget
    ? `$${client.dailyBudget.toLocaleString()}/day`
    : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link href="/admin/clients" className="flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-3 transition-colors">
            <ArrowLeft size={14} /> Back to Clients
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-white">{client.name}</h1>
            <ClientStatusBadge status={client.status} />
          </div>
          {client.domain && (
            <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
              <Globe size={12} /> {client.domain}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {aiChatEnabled && <ClientAIChat clientId={client.id} />}
          <InviteToPortal
            clientId={client.id}
            defaultEmail={client.contacts[0]?.email || null}
            portalUsers={client.portalUsers}
          />
          <Link
            href={`/admin/clients/${client.id}/edit`}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors"
          >
            Edit Client
          </Link>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {client.phone && (
          <div className="bg-[#111827] border border-white/6 rounded-lg p-4 flex items-center gap-3">
            <Phone size={16} className="text-slate-400" />
            <div><p className="text-xs text-slate-500">Phone</p><p className="text-sm text-white">{client.phone}</p></div>
          </div>
        )}
        {client.email && (
          <div className="bg-[#111827] border border-white/6 rounded-lg p-4 flex items-center gap-3">
            <Mail size={16} className="text-slate-400" />
            <div><p className="text-xs text-slate-500">Email</p><p className="text-sm text-white">{client.email}</p></div>
          </div>
        )}
        <div className="bg-[#111827] border border-white/6 rounded-lg p-4 flex items-center gap-3">
          <DollarSign size={16} className="text-slate-400" />
          <div><p className="text-xs text-slate-500">Monthly Budget</p><p className="text-sm text-white">{retainerDisplay}{dailyBudgetDisplay ? <span className="text-slate-500 ml-1">({dailyBudgetDisplay})</span> : null}</p></div>
        </div>
        <div className="bg-[#111827] border border-white/6 rounded-lg p-4 flex items-center gap-3">
          <Calendar size={16} className="text-slate-400" />
          <div><p className="text-xs text-slate-500">SLA</p><p className="text-sm text-white">{client.slaResponseHours ?? 24}h response</p></div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <h2 className="font-display text-base font-semibold text-white mb-4">Active Services</h2>
        <div className="flex flex-wrap gap-2">
          {client.services.length > 0 ? (
            client.services.map((s) => (
              <ServiceTypeBadge key={s.serviceType} type={s.serviceType} />
            ))
          ) : (
            <p className="text-sm text-slate-500">No services configured</p>
          )}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contacts */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="font-display text-base font-semibold text-white mb-4">Contacts ({client.contacts.length})</h2>
          <div className="space-y-3">
            {client.contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-sm text-white">{contact.name} {contact.isPrimary && <span className="text-emerald-400 text-xs">Primary</span>}</p>
                  <p className="text-xs text-slate-500">{contact.email}</p>
                </div>
                <Badge label={contact.role} variant="slate" />
              </div>
            ))}
            {client.contacts.length === 0 && <p className="text-sm text-slate-500">No contacts</p>}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="font-display text-base font-semibold text-white mb-4">Projects ({client._count.projects})</h2>
          <div className="space-y-3">
            {client.projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-sm text-white">{project.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <ServiceTypeBadge type={project.serviceType} />
                    <span className="text-xs text-slate-500">{project._count.tasks} tasks</span>
                  </div>
                </div>
                <Badge label={project.status} variant={PROJECT_VARIANT[project.status] || "slate"} />
              </div>
            ))}
            {client.projects.length === 0 && <p className="text-sm text-slate-500">No projects</p>}
          </div>
        </div>
      </div>

      {/* Revenue Tracking */}
      <RevenueBreakdown clientId={client.id} />

      {/* Tasks */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <h2 className="font-display text-base font-semibold text-white mb-4">Recent Tasks ({client._count.tasks})</h2>
        <div className="space-y-3">
          {client.tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div>
                <p className="text-sm text-white">{task.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge label={task.status} variant={task.status === "COMPLETED" ? "emerald" : task.status === "IN_PROGRESS" ? "amber" : "slate"} />
                  <Badge label={task.priority} variant={task.priority === "URGENT" ? "red" : task.priority === "HIGH" ? "amber" : "slate"} />
                  {task.serviceType && <ServiceTypeBadge type={task.serviceType} />}
                </div>
              </div>
              <span className="text-xs text-slate-400">{task.assignee?.name || "Unassigned"}</span>
            </div>
          ))}
          {client.tasks.length === 0 && <p className="text-sm text-slate-500">No tasks</p>}
        </div>
      </div>

      {/* Messages, Notes & Tickets */}
      <ClientDetailTabs
        clientId={client.id}
        currentUserId={session.user.id}
        notes={client.clientNotes.map((n) => ({
          id: n.id,
          type: n.type,
          content: n.content,
          createdAt: n.createdAt.toISOString(),
          user: { id: n.user.id, name: n.user.name },
        }))}
        noteCount={client._count.clientNotes}
        tickets={client.supportTickets.map((t) => ({
          id: t.id,
          title: t.title,
          status: t.status,
          priority: t.priority,
          slaDeadline: t.slaDeadline?.toISOString() || null,
          assignee: t.assignee
            ? { id: t.assignee.id, name: t.assignee.name, email: t.assignee.email }
            : null,
        }))}
        ticketCount={client._count.supportTickets}
        approvalCount={client._count.approvals}
      />

      {/* Integration IDs */}
      {(client.nimbataProjectId || client.gtmContainerId || client.cloudflareZoneId || client.googleAdsCustomerId || client.ga4PropertyId || client.searchConsoleUrl) && (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="font-display text-base font-semibold text-white mb-4">Integrations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {client.googleAdsCustomerId && (
              <div><p className="text-xs text-slate-500">Google Ads</p><p className="text-sm text-slate-300 font-mono">{client.googleAdsCustomerId}</p></div>
            )}
            {client.ga4PropertyId && (
              <div><p className="text-xs text-slate-500">GA4 Property</p><p className="text-sm text-slate-300 font-mono">{client.ga4PropertyId}</p></div>
            )}
            {client.searchConsoleUrl && (
              <div><p className="text-xs text-slate-500">Search Console</p><p className="text-sm text-slate-300 font-mono">{client.searchConsoleUrl}</p></div>
            )}
            {client.nimbataProjectId && (
              <div><p className="text-xs text-slate-500">Nimbata Project</p><p className="text-sm text-slate-300 font-mono">{client.nimbataProjectId}</p></div>
            )}
            {client.gtmContainerId && (
              <div><p className="text-xs text-slate-500">GTM Container</p><p className="text-sm text-slate-300 font-mono">{client.gtmContainerId}</p></div>
            )}
            {client.cloudflareZoneId && (
              <div><p className="text-xs text-slate-500">Cloudflare Zone</p><p className="text-sm text-slate-300 font-mono">{client.cloudflareZoneId}</p></div>
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      {client.notes && (
        <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
          <h2 className="font-display text-base font-semibold text-white mb-4">Internal Notes</h2>
          <p className="text-sm text-slate-300 whitespace-pre-wrap">{client.notes}</p>
        </div>
      )}
    </div>
  );
}
