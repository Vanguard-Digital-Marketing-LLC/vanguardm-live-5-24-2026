import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import BillingClient from "./BillingClient";

export const metadata = { title: "Billing & Plan" };

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user?.id || !session.user.agencyId) redirect("/auth/sign-in");

  const agency = await prisma.agency.findUnique({
    where: { id: session.user.agencyId },
    select: {
      id: true,
      name: true,
      planTier: true,
      subscriptionStatus: true,
      maxClients: true,
      currentPeriodEnd: true,
      _count: { select: { clients: true } },
    },
  });

  if (!agency) redirect("/admin");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Billing & Plan</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your subscription and usage</p>
      </div>

      <BillingClient
        plan={agency.planTier}
        status={agency.subscriptionStatus}
        maxClients={agency.maxClients}
        clientCount={agency._count.clients}
        currentPeriodEnd={agency.currentPeriodEnd?.toISOString() ?? null}
        isAdmin={session.user.role === "ADMIN"}
      />
    </div>
  );
}
