import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/api-middleware";
import { getOrCreateStripeCustomer, getStripe } from "@/lib/stripe/customer";

export async function POST(request: NextRequest) {
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const customerId = await getOrCreateStripeCustomer(agencyId);
  const stripe = getStripe();

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL}/admin/settings/billing`,
  });

  return NextResponse.json({ url: portalSession.url });
}
