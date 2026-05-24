import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Suspense } from "react";
import Badge from "@/components/admin/shared/Badge";
import Pagination from "@/components/shared/Pagination";

export const metadata = { title: "Invoices" };

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function getStatusVariant(status: string): "emerald" | "amber" | "red" | "slate" {
  const map: Record<string, "emerald" | "amber" | "red" | "slate"> = {
    completed: "emerald",
    pending: "amber",
    failed: "red",
    refunded: "slate",
  };
  return map[status] || "slate";
}

export default async function PortalInvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id || !session.user.clientId) redirect("/auth/sign-in");

  // Only show payments matching the logged-in user's email — prevents
  // cross-client leakage when a contact belongs to multiple clients.
  const userEmail = session.user.email?.toLowerCase();

  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(params.limit || "20", 10)));

  try {
    if (!userEmail) {
      return (
        <div className="space-y-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Invoices & Payments</h1>
            <p className="text-sm text-slate-400 mt-1">Payment history for your account</p>
          </div>
          <div className="bg-[#111827] border border-white/6 rounded-xl p-12 text-center">
            <p className="text-slate-500">No payments found for your account.</p>
          </div>
        </div>
      );
    }

    const where = { customerEmail: { equals: userEmail, mode: "insensitive" as const } };

    const [payments, totalCount, totalPaidAgg] = await Promise.all([
      prisma.servicePayment.findMany({
        where,
        orderBy: { paidAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.servicePayment.count({ where }),
      prisma.servicePayment.aggregate({
        where: { ...where, status: "completed" },
        _sum: { amount: true },
      }),
    ]);

    const totalPaid = totalPaidAgg._sum.amount ?? 0;

    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Invoices & Payments</h1>
          <p className="text-sm text-slate-400 mt-1">
            Payment history for your account
          </p>
        </div>

        {/* Summary */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-[#111827] border border-white/6 rounded-xl px-5 py-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Total Payments</span>
            <p className="text-lg font-bold text-white">{totalCount}</p>
          </div>
          <div className="bg-[#111827] border border-white/6 rounded-xl px-5 py-3">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Total Paid</span>
            <p className="text-lg font-bold text-teal">{formatCurrency(totalPaid)}</p>
          </div>
        </div>

        {/* Payment table */}
        <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full" role="table">
                <thead>
                  <tr className="border-b border-white/6">
                    <th scope="col" className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Date
                    </th>
                    <th scope="col" className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Description
                    </th>
                    <th scope="col" className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Amount
                    </th>
                    <th scope="col" className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-white/4 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate-300 whitespace-nowrap">
                        {formatDate(payment.paidAt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">
                        {payment.description}
                      </td>
                      <td className="px-4 py-3 text-sm text-white font-medium whitespace-nowrap">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          label={payment.status}
                          variant={getStatusVariant(payment.status)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-500">No payments found for your account.</p>
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
    console.error("Failed to load invoices:", error);
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Invoices & Payments</h1>
          <p className="text-sm text-slate-400 mt-1">Payment history for your account</p>
        </div>
        <div className="bg-[#111827] border border-red-500/20 rounded-xl p-12 text-center">
          <p className="text-red-400">Failed to load invoices. Please try again later.</p>
        </div>
      </div>
    );
  }
}
