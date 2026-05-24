import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import type { Prisma } from "@/lib/generated/prisma/client";
import { Users, UserPlus, Shield } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import SearchFilter from "@/components/shared/SearchFilter";
import Pagination from "@/components/shared/Pagination";
import UserRow from "@/components/admin/users/UserRow";

export const metadata = { title: "User Management" };

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; q?: string; status?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const { page: pageStr, limit: limitStr, q } = await searchParams;
  const page = Math.max(1, parseInt(pageStr || "1"));
  const limit = Math.max(1, Math.min(100, parseInt(limitStr || "20")));

  const where: Prisma.UserWhereInput = { agencyId };
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
    ];
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  let totalUsers = 0, newThisMonth = 0, adminTeamCount = 0, totalCount = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let users: any[] = [];
  let pageError = false;

  try {
    [totalUsers, newThisMonth, adminTeamCount, totalCount, users] = await Promise.all([
      prisma.user.count({ where: { agencyId } }),
      prisma.user.count({ where: { agencyId, createdAt: { gte: thirtyDaysAgo } } }),
      prisma.user.count({ where: { agencyId, role: { in: ["ADMIN", "TEAM"] } } }),
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true, name: true, email: true, role: true, isAdmin: true, createdAt: true,
          _count: { select: { coursePurchases: true, certificates: true } },
        },
      }),
    ]);
  } catch {
    pageError = true;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">User Management</h1>
        <p className="text-sm text-slate-400 mt-1">Manage users, roles, and access</p>
      </div>
      {pageError && (
        <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-sm text-red-400">
          Failed to load user data. Try refreshing the page.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard label="Total Users" value={totalUsers} icon={Users} accent="emerald" />
        <MetricCard label="New This Month" value={newThisMonth} icon={UserPlus} accent="cyan" />
        <MetricCard label="Admin/Team" value={adminTeamCount} icon={Shield} accent="amber" />
      </div>

      <Suspense>
        <SearchFilter placeholder="Search by name or email..." />
      </Suspense>

      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="font-display text-base font-semibold text-white">All Users ({totalCount})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Courses</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Certs</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Joined</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserRow
                  key={user.id}
                  user={{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt.toISOString(),
                    coursePurchases: user._count.coursePurchases,
                    certificates: user._count.certificates,
                  }}
                  currentUserId={session.user.id}
                />
              ))}
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
