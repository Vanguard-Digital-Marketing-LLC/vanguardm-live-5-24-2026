import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import type { Prisma } from "@/lib/generated/prisma/client";
import { DollarSign, CreditCard } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import SearchFilter from "@/components/shared/SearchFilter";
import Pagination from "@/components/shared/Pagination";
import GenerateLinkForm from "./GenerateLinkForm";

export const metadata = { title: "Payments" };

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; q?: string; status?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") redirect("/dashboard");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/dashboard");

  const { page: pageStr, limit: limitStr, q } = await searchParams;
  const page = Math.max(1, parseInt(pageStr || "1"));
  const limit = Math.max(1, Math.min(100, parseInt(limitStr || "20")));

  const where: Prisma.ServicePaymentWhereInput = { agencyId };
  if (q) {
    where.OR = [
      { description: { contains: q, mode: "insensitive" } },
      { customerEmail: { contains: q, mode: "insensitive" } },
    ];
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  let totalCount = 0, monthCount = 0, filteredCount = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let totalRevenue: any = { _sum: { amount: 0 } };
  let payments: Awaited<ReturnType<typeof prisma.servicePayment.findMany>> = [];
  let pageError = false;

  try {
    [totalCount, monthCount, totalRevenue, filteredCount, payments] = await Promise.all([
      prisma.servicePayment.count({ where: { agencyId } }),
      prisma.servicePayment.count({ where: { agencyId, paidAt: { gte: thirtyDaysAgo } } }),
      prisma.servicePayment.aggregate({ where: { agencyId }, _sum: { amount: true } }),
      prisma.servicePayment.count({ where }),
      prisma.servicePayment.findMany({
        where,
        orderBy: { paidAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);
  } catch {
    pageError = true;
  }

  const revenueDollars = ((totalRevenue._sum.amount ?? 0) / 100).toLocaleString(
    "en-US",
    { style: "currency", currency: "USD" }
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Payments</h1>
        <p className="text-sm text-slate-400 mt-1">
          Generate payment links and track service payments
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          label="Total Payments"
          value={totalCount}
          icon={CreditCard}
          accent="emerald"
        />
        <MetricCard
          label="This Month"
          value={monthCount}
          icon={CreditCard}
          accent="cyan"
        />
        <MetricCard
          label="Total Revenue"
          value={revenueDollars}
          icon={DollarSign}
          accent="amber"
        />
      </div>

      {pageError && (
        <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-sm text-red-400">
          Failed to load payment data. Try refreshing the page.
        </div>
      )}

      <div className="bg-[#111827] border border-white/6 rounded-xl p-6">
        <h2 className="font-display text-base font-semibold text-white mb-4">
          Generate Payment Link
        </h2>
        <GenerateLinkForm />
      </div>

      <Suspense>
        <SearchFilter placeholder="Search by description or email..." />
      </Suspense>

      <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="font-display text-base font-semibold text-white">
            Payments ({filteredCount})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Description
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Amount
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-white/4 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-white">
                    {p.description}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-emerald">
                    {(p.amount / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {p.customerEmail || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-emerald/10 text-emerald">
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {new Date(p.paidAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-slate-500"
                  >
                    No payments yet. Generate a link above to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Suspense>
          <Pagination totalCount={filteredCount} page={page} limit={limit} />
        </Suspense>
      </div>
    </div>
  );
}
