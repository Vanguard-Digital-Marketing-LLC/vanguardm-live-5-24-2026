import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import { Mail, CheckCircle, Clock, XCircle } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import SearchFilter from "@/components/shared/SearchFilter";
import Pagination from "@/components/shared/Pagination";
import InviteRow from "@/components/admin/invites/InviteRow";

export const metadata = { title: "Invite Management" };

type InviteStatus = "all" | "pending" | "accepted" | "expired" | "revoked";

export default async function InvitesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; q?: string; status?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") redirect("/auth/sign-in");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1"));
  const limit = Math.max(1, Math.min(50, parseInt(params.limit || "20")));
  const q = params.q || "";
  const status = (params.status || "all") as InviteStatus;

  const now = new Date();

  // Build filter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { client: { agencyId } };

  if (status === "pending") {
    where.acceptedAt = null;
    where.revokedAt = null;
    where.expiresAt = { gt: now };
  } else if (status === "accepted") {
    where.acceptedAt = { not: null };
  } else if (status === "expired") {
    where.acceptedAt = null;
    where.revokedAt = null;
    where.expiresAt = { lt: now };
  } else if (status === "revoked") {
    where.revokedAt = { not: null };
  }

  if (q) {
    where.OR = [
      { email: { contains: q, mode: "insensitive" } },
      { client: { name: { contains: q, mode: "insensitive" } } },
    ];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let invites: any[] = [];
  let totalCount = 0;
  let pendingCount = 0;
  let acceptedCount = 0;
  let expiredCount = 0;
  let revokedCount = 0;
  let pageError = false;

  try {
    [invites, totalCount, pendingCount, acceptedCount, expiredCount, revokedCount] =
      await Promise.all([
        prisma.clientInvite.findMany({
          where,
          include: { client: { select: { id: true, name: true } } },
          orderBy: { createdAt: "desc" },
          take: limit,
          skip: (page - 1) * limit,
        }),
        prisma.clientInvite.count({ where }),
        prisma.clientInvite.count({
          where: { client: { agencyId }, acceptedAt: null, revokedAt: null, expiresAt: { gt: now } },
        }),
        prisma.clientInvite.count({ where: { client: { agencyId }, acceptedAt: { not: null } } }),
        prisma.clientInvite.count({
          where: { client: { agencyId }, acceptedAt: null, revokedAt: null, expiresAt: { lt: now } },
        }),
        prisma.clientInvite.count({ where: { client: { agencyId }, revokedAt: { not: null } } }),
      ]);
  } catch (err) {
    console.error("Failed to load invites:", err);
    pageError = true;
  }

  const tabs: { key: InviteStatus; label: string; count: number }[] = [
    { key: "all", label: "All", count: pendingCount + acceptedCount + expiredCount + revokedCount },
    { key: "pending", label: "Pending", count: pendingCount },
    { key: "accepted", label: "Accepted", count: acceptedCount },
    { key: "expired", label: "Expired", count: expiredCount },
    { key: "revoked", label: "Revoked", count: revokedCount },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Invite Management</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage client portal invitations
        </p>
      </div>

      {pageError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
          Failed to load invites. Please refresh to try again.
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Pending" value={pendingCount} icon={Clock} accent="amber" />
        <MetricCard label="Accepted" value={acceptedCount} icon={CheckCircle} accent="emerald" />
        <MetricCard label="Expired" value={expiredCount} icon={Clock} accent="slate" />
        <MetricCard label="Revoked" value={revokedCount} icon={XCircle} accent="red" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
        {tabs.map((tab) => (
          <a
            key={tab.key}
            href={`/admin/invites?status=${tab.key}${q ? `&q=${q}` : ""}`}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              status === tab.key
                ? "bg-emerald-500/20 text-emerald-400"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs opacity-70">({tab.count})</span>
          </a>
        ))}
      </div>

      {/* Search */}
      <SearchFilter
        placeholder="Search by email or client name..."
      />

      {/* Table */}
      {invites.length === 0 ? (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-12 text-center">
          <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-sm">No invites found.</p>
          <p className="text-slate-500 text-xs mt-1">
            Invite clients from their detail page.
          </p>
        </div>
      ) : (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50 text-left">
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Client</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Email</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Sent</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Date</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {invites.map((invite) => {
                let computedStatus: string;
                if (invite.acceptedAt) computedStatus = "accepted";
                else if (invite.revokedAt) computedStatus = "revoked";
                else if (invite.expiresAt < now) computedStatus = "expired";
                else computedStatus = "pending";

                return (
                  <InviteRow
                    key={invite.id}
                    invite={{
                      id: invite.id,
                      email: invite.email,
                      clientId: invite.clientId,
                      clientName: invite.client.name,
                      status: computedStatus,
                      createdAt: invite.createdAt.toISOString(),
                      expiresAt: invite.expiresAt.toISOString(),
                      acceptedAt: invite.acceptedAt?.toISOString() || null,
                      revokedAt: invite.revokedAt?.toISOString() || null,
                    }}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <Pagination totalCount={totalCount} page={page} limit={limit} />
    </div>
  );
}
