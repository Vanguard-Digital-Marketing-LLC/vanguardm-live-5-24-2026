import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import type { Prisma } from "@/lib/generated/prisma/client";
import { Building2, UserPlus, Pause, MessageSquare } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import ServiceTypeBadge from "@/components/admin/shared/ServiceTypeBadge";
import ClientStatusBadge from "@/components/admin/shared/ClientStatusBadge";
import SearchFilter from "@/components/shared/SearchFilter";
import Pagination from "@/components/shared/Pagination";
import ServiceFilterNav from "./ServiceFilterNav";
import Link from "next/link";

export const metadata = { title: "Clients" };

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; q?: string; status?: string; service?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const { page: pageStr, limit: limitStr, q, status, service } = await searchParams;
  const page = Math.max(1, parseInt(pageStr || "1") || 1);
  const limit = Math.max(1, Math.min(100, parseInt(limitStr || "20") || 20));

  const where: Prisma.ClientWhereInput = { agencyId };
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { domain: { contains: q, mode: "insensitive" } },
    ];
  }
  const VALID_STATUSES = ["PROSPECT", "ACTIVE", "PAUSED", "CHURNED"];
  if (status && VALID_STATUSES.includes(status)) {
    where.status = status as "PROSPECT" | "ACTIVE" | "PAUSED" | "CHURNED";
  }
  const SERVICE_TYPES = ["SMA", "PPC", "WEB", "SUPPORT", "SEO", "REPORTING"] as const;
  const activeService = service && SERVICE_TYPES.includes(service as typeof SERVICE_TYPES[number]) ? service : "ALL";
  if (activeService !== "ALL") {
    where.services = { some: { serviceType: activeService as typeof SERVICE_TYPES[number] } };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let clients: any[] = [];
  let activeCount = 0, prospectCount = 0, pausedCount = 0, totalCount = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let messageReads: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let latestMessages: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let serviceCounts: any[] = [];
  let pageError = false;

  try {
    [activeCount, prospectCount, pausedCount, totalCount, clients, messageReads, latestMessages, serviceCounts] = await Promise.all([
      prisma.client.count({ where: { agencyId, status: "ACTIVE" } }),
      prisma.client.count({ where: { agencyId, status: "PROSPECT" } }),
      prisma.client.count({ where: { agencyId, status: "PAUSED" } }),
      prisma.client.count({ where }),
      prisma.client.findMany({
        where,
        orderBy: { name: "asc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          services: { select: { serviceType: true, status: true } },
          contacts: { where: { isPrimary: true }, take: 1, select: { name: true, email: true } },
          _count: { select: { tasks: true, supportTickets: true, projects: true } },
        },
      }),
      prisma.clientMessageRead.findMany({
        where: { userId: session.user.id },
        select: { clientId: true, lastReadAt: true },
      }),
      prisma.clientMessage.groupBy({
        by: ["clientId"],
        where: { isInternal: false },
        _max: { createdAt: true },
      }),
      prisma.clientService.groupBy({
        by: ["serviceType"],
        where: { client: { agencyId } },
        _count: true,
      }),
    ]);
  } catch {
    pageError = true;
  }

  // Build service count map for filter tabs
  const svcCountMap: Record<string, number> = {};
  for (const g of serviceCounts) {
    svcCountMap[g.serviceType] = g._count;
  }

  // Build set of client IDs with unread messages
  const readMap = new Map(messageReads.map((r) => [r.clientId, r.lastReadAt]));
  const clientsWithUnread = new Set<string>();
  for (const group of latestMessages) {
    const lastMsg = group._max.createdAt;
    if (!lastMsg) continue;
    const lastRead = readMap.get(group.clientId);
    if (!lastRead || lastRead < lastMsg) {
      clientsWithUnread.add(group.clientId);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Clients</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your client portfolio</p>
        </div>
        <Link
          href="/admin/clients/new"
          className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-xs font-display font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors"
        >
          + New Client
        </Link>
      </div>

      {pageError && (
        <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-sm text-red-400">
          Failed to load client data. Try refreshing the page.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard label="Active Clients" value={activeCount} icon={Building2} accent="emerald" />
        <MetricCard label="Prospects" value={prospectCount} icon={UserPlus} accent="cyan" />
        <MetricCard label="Paused" value={pausedCount} icon={Pause} accent="amber" />
      </div>

      <Suspense>
        <ServiceFilterNav active={activeService} counts={svcCountMap} />
      </Suspense>

      <Suspense>
        <SearchFilter
          placeholder="Search by name or domain..."
          statusOptions={[
            { label: "Prospect", value: "PROSPECT" },
            { label: "Active", value: "ACTIVE" },
            { label: "Paused", value: "PAUSED" },
            { label: "Churned", value: "CHURNED" },
          ]}
        />
      </Suspense>

      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="font-display text-base font-semibold text-white">All Clients ({totalCount})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Client</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Services</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Contact</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Tasks</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Tickets</th>
              </tr>
            </thead>
            <tbody>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {clients.map((client: any) => {
                const primary = client.contacts[0];
                return (
                  <tr key={client.id} className="border-b border-white/4 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/admin/clients/${client.id}`} className="block">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white hover:text-emerald-400 transition-colors">{client.name}</p>
                          {clientsWithUnread.has(client.id) && (
                            <span className="flex items-center gap-1 text-emerald" title="Unread messages">
                              <MessageSquare size={12} />
                            </span>
                          )}
                        </div>
                        {client.domain && <p className="text-xs text-slate-500">{client.domain}</p>}
                      </Link>
                    </td>
                    <td className="px-4 py-3"><ClientStatusBadge status={client.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {client.services.map((s: any) => (
                          <ServiceTypeBadge key={s.serviceType} type={s.serviceType} />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {primary ? (
                        <div>
                          <p className="text-sm text-slate-300">{primary.name}</p>
                          <p className="text-xs text-slate-500">{primary.email}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-600">No contact</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{client._count.tasks}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{client._count.supportTickets}</td>
                  </tr>
                );
              })}
              {clients.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-slate-500">No clients yet. Click &quot;+ New Client&quot; to add one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Suspense>
          <Pagination totalCount={totalCount} page={page} limit={limit} />
        </Suspense>
      </div>
    </div>
  );
}
