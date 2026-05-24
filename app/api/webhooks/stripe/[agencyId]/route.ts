import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { decryptSecret } from "@/lib/crypto";
import { getStripeForAgency } from "@/lib/stripe/customer";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ agencyId: string }> },
) {
  const { agencyId } = await params;

  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: { id: true, stripeWebhookSecretEnc: true, stripeSecretKeyEnc: true },
  });

  if (!agency || !agency.stripeWebhookSecretEnc) {
    return NextResponse.json({ error: "Agency not found or no webhook configured" }, { status: 404 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const webhookSecret = decryptSecret(agency.stripeWebhookSecretEnc);
  const stripe = await getStripeForAgency(agencyId);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed for agency ${agencyId}:`, err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency: claim the event row up front. The PK constraint on
  // ProcessedStripeEvent.id makes this atomic — if Stripe is re-delivering,
  // the INSERT fails and we short-circuit without re-running side-effects.
  // Same pattern as the global webhook route in /api/webhooks/stripe/route.ts.
  try {
    await prisma.processedStripeEvent.create({
      data: { id: event.id, type: event.type },
    });
  } catch {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    // Handle service payment completions
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentType = session.metadata?.type;

      if (paymentType === "service_payment") {
        await prisma.servicePayment.upsert({
          where: { stripeSessionId: session.id },
          update: {},
          create: {
            stripeSessionId: session.id,
            stripePaymentId:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : null,
            amount: session.amount_total ?? 0,
            description: session.metadata?.description ?? "",
            customerEmail: session.customer_email ?? null,
            agencyId: agencyId,
          },
        });
      }
    }
  } catch (err) {
    // Processing failed — release the claim so Stripe's retry can re-run.
    await prisma.processedStripeEvent.delete({ where: { id: event.id } }).catch(() => {});
    throw err;
  }

  return NextResponse.json({ received: true });
}
