import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import StripeSettingsForm from "./StripeSettingsForm";

export const metadata = { title: "Payment Settings" };

export default async function PaymentSettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") redirect("/admin/settings");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/admin/settings");

  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: {
      stripePublishableKey: true,
      stripeSecretKeyEnc: true,
      stripeWebhookSecretEnc: true,
      stripeConnectedAt: true,
    },
  });

  const hasSecretKey = !!agency?.stripeSecretKeyEnc;
  const hasWebhookSecret = !!agency?.stripeWebhookSecretEnc;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Payment Settings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure your Stripe integration for accepting payments
        </p>
      </div>

      {agency?.stripeConnectedAt && (
        <div className="flex items-center gap-2 bg-emerald/5 border border-emerald/20 rounded-xl px-4 py-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-sm text-emerald-400">
            Stripe connected since{" "}
            {new Date(agency.stripeConnectedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      )}

      <StripeSettingsForm
        publishableKey={agency?.stripePublishableKey ?? ""}
        hasSecretKey={hasSecretKey}
        hasWebhookSecret={hasWebhookSecret}
      />
    </div>
  );
}
