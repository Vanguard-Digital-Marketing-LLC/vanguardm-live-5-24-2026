import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import type { PlanTier, SubStatus } from "@/lib/generated/prisma/client";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

// Map Stripe price IDs to plan tiers + maxClients
function resolvePlan(priceId: string): { planTier: PlanTier; maxClients: number } | null {
  if (priceId === process.env.STRIPE_PRICE_STARTER) return { planTier: "STARTER", maxClients: 5 };
  if (priceId === process.env.STRIPE_PRICE_PRO) return { planTier: "PRO", maxClients: 25 };
  if (priceId === process.env.STRIPE_PRICE_ENTERPRISE) return { planTier: "ENTERPRISE", maxClients: 999 };
  return null;
}

// Map Stripe subscription status to our SubStatus enum
function mapSubStatus(stripeStatus: string): SubStatus {
  switch (stripeStatus) {
    case "trialing": return "TRIALING";
    case "active": return "ACTIVE";
    case "past_due": return "PAST_DUE";
    case "canceled":
    case "incomplete_expired": return "CANCELED";
    case "unpaid": return "UNPAID";
    default: return "ACTIVE";
  }
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const agencyId = subscription.metadata?.agencyId;
  if (!agencyId) return;

  const status = mapSubStatus(subscription.status);
  const priceId = subscription.items.data[0]?.price.id;
  const resolved = priceId ? resolvePlan(priceId) : null;

  // On cancellation Stripe drops items; force STARTER limits so a former PRO
  // doesn't keep elevated maxClients after they stop paying.
  const plan =
    status === "CANCELED"
      ? { planTier: "STARTER" as PlanTier, maxClients: 5 }
      : resolved;

  await prisma.agency.update({
    where: { id: agencyId },
    data: {
      subscriptionId: subscription.id,
      subscriptionStatus: status,
      currentPeriodEnd: new Date(subscription.items.data[0]?.current_period_end * 1000),
      ...(plan && { planTier: plan.planTier, maxClients: plan.maxClients }),
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing signature or webhook secret." },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency: claim the event row up front. The PK constraint on
  // ProcessedStripeEvent.id makes this atomic — if Stripe is re-delivering,
  // the INSERT fails and we short-circuit without re-running side-effects.
  try {
    await prisma.processedStripeEvent.create({
      data: { id: event.id, type: event.type },
    });
  } catch {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    // ── Subscription lifecycle events ──
    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object as Stripe.Subscription;
      await syncSubscription(subscription);
    }

    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice & { subscription?: string | { id: string } | null };
      const subId = typeof invoice.subscription === "string" ? invoice.subscription : invoice.subscription?.id;
      if (subId) {
        const agency = await prisma.agency.findUnique({ where: { subscriptionId: subId } });
        if (agency) {
          await prisma.agency.update({
            where: { id: agency.id },
            data: { subscriptionStatus: "PAST_DUE" },
          });
        }
      }
    }

    if (event.type === "invoice.paid") {
      const invoice = event.data.object as Stripe.Invoice & { subscription?: string | { id: string } | null };
      const subId = typeof invoice.subscription === "string" ? invoice.subscription : invoice.subscription?.id;
      if (subId) {
        const agency = await prisma.agency.findUnique({ where: { subscriptionId: subId } });
        if (agency) {
          await prisma.agency.update({
            where: { id: agency.id },
            data: { subscriptionStatus: "ACTIVE" },
          });
        }
      }
    }

    // ── Existing checkout events (Academy + Service payments) ──
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
            agencyId: session.metadata?.agencyId ?? null,
          },
        });
      } else if (session.metadata?.userId && session.metadata?.courseSlug) {
        const userId = session.metadata.userId;
        const courseSlug = session.metadata.courseSlug;

        await prisma.coursePurchase.upsert({
          where: {
            userId_courseSlug: { userId, courseSlug },
          },
          update: {},
          create: {
            userId,
            courseSlug,
            stripeSessionId: session.id,
            stripePaymentId:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : null,
            amount: session.amount_total ?? 0,
          },
        });
      }
    }
  } catch (err) {
    // Processing failed — release the claim so Stripe's retry can run.
    await prisma.processedStripeEvent.delete({ where: { id: event.id } }).catch(() => {});
    throw err;
  }

  return NextResponse.json({ received: true });
}
