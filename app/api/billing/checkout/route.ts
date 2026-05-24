import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/api-middleware";
import { getOrCreateStripeCustomer, getStripe } from "@/lib/stripe/customer";

const PLAN_PRICES: Record<string, string | undefined> = {
  STARTER: process.env.STRIPE_PRICE_STARTER,
  PRO: process.env.STRIPE_PRICE_PRO,
  ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE,
};

export async function POST(request: NextRequest) {
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const body = await request.json();
  const plan = body.plan as string;
  const priceId = PLAN_PRICES[plan];

  if (!priceId) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const customerId = await getOrCreateStripeCustomer(agencyId);
  const stripe = getStripe();

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/admin/settings/billing?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/admin/settings/billing?canceled=true`,
    metadata: { agencyId, plan },
    subscription_data: {
      metadata: { agencyId, plan },
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
