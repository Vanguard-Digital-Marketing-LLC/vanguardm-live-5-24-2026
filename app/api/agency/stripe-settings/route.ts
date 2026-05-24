import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import { encryptSecret } from "@/lib/crypto";
import { invalidateStripeCache } from "@/lib/stripe/customer";

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const agencyId = await resolveAgencyId();
  if (!agencyId) {
    return NextResponse.json({ error: "No agency context" }, { status: 400 });
  }

  const { publishableKey, secretKey, webhookSecret } = await request.json();

  // Validate keys format
  if (publishableKey && !publishableKey.startsWith("pk_")) {
    return NextResponse.json({ error: "Invalid publishable key format (must start with pk_)" }, { status: 400 });
  }
  if (secretKey && !secretKey.startsWith("sk_") && !secretKey.startsWith("rk_")) {
    return NextResponse.json({ error: "Invalid secret key format (must start with sk_ or rk_)" }, { status: 400 });
  }
  if (webhookSecret && !webhookSecret.startsWith("whsec_")) {
    return NextResponse.json({ error: "Invalid webhook secret format (must start with whsec_)" }, { status: 400 });
  }

  // Test connection if secret key provided
  if (secretKey) {
    try {
      const testStripe = new Stripe(secretKey);
      await testStripe.balance.retrieve();
    } catch {
      return NextResponse.json({ error: "Stripe connection test failed. Check your secret key." }, { status: 400 });
    }
  }

  // Build update data
  const data: Record<string, unknown> = {};
  if (publishableKey !== undefined) data.stripePublishableKey = publishableKey || null;
  if (secretKey) data.stripeSecretKeyEnc = encryptSecret(secretKey);
  if (webhookSecret) data.stripeWebhookSecretEnc = encryptSecret(webhookSecret);
  if (secretKey || publishableKey) data.stripeConnectedAt = new Date();

  await prisma.agency.update({ where: { id: agencyId }, data });
  invalidateStripeCache(agencyId);

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const agencyId = await resolveAgencyId();
  if (!agencyId) {
    return NextResponse.json({ error: "No agency context" }, { status: 400 });
  }

  await prisma.agency.update({
    where: { id: agencyId },
    data: {
      stripeSecretKeyEnc: null,
      stripePublishableKey: null,
      stripeWebhookSecretEnc: null,
      stripeConnectedAt: null,
    },
  });
  invalidateStripeCache(agencyId);

  return NextResponse.json({ success: true });
}
