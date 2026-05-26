import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { decryptSecret } from "@/lib/crypto";

function getStripe() {
  // Pinned to a known v22-compatible API version for predictability.
  // Bump deliberately when adopting new Stripe API features.
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
  });
}

/** Cache of Stripe instances keyed by agencyId */
const stripeCache = new Map<string, Stripe>();

/**
 * Returns a Stripe instance configured for the given agency.
 * If the agency has its own encrypted Stripe secret key, that is used.
 * Otherwise falls back to the platform STRIPE_SECRET_KEY.
 */
export async function getStripeForAgency(agencyId: string): Promise<Stripe> {
  const cached = stripeCache.get(agencyId);
  if (cached) return cached;

  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: { stripeSecretKeyEnc: true },
  });

  if (agency?.stripeSecretKeyEnc) {
    const secretKey = decryptSecret(agency.stripeSecretKeyEnc);
    const instance = new Stripe(secretKey, { apiVersion: "2026-04-22.dahlia" });
    stripeCache.set(agencyId, instance);
    return instance;
  }

  // Fallback to platform key
  return getStripe();
}

/** Invalidate cached Stripe instance when agency keys change */
export function invalidateStripeCache(agencyId: string) {
  stripeCache.delete(agencyId);
}

/**
 * Gets or creates a Stripe Customer for an agency (platform billing).
 * Stores the customer ID on the Agency record.
 */
export async function getOrCreateStripeCustomer(agencyId: string): Promise<string> {
  const agency = await prisma.agency.findUniqueOrThrow({ where: { id: agencyId } });

  if (agency.stripeCustomerId) {
    return agency.stripeCustomerId;
  }

  const stripe = getStripe();
  const customer = await stripe.customers.create({
    name: agency.name,
    metadata: { agencyId: agency.id, agencySlug: agency.slug },
  });

  await prisma.agency.update({
    where: { id: agencyId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}

export { getStripe };
