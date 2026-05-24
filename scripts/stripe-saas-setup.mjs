#!/usr/bin/env node
/**
 * VanguardM SaaS — Stripe Subscription Product & Price Setup
 *
 * Creates 3 monthly subscription products: STARTER, PRO, ENTERPRISE.
 * Outputs price IDs for env vars.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/stripe-saas-setup.mjs
 *   STRIPE_SECRET_KEY=sk_live_xxx node scripts/stripe-saas-setup.mjs --live
 *   node scripts/stripe-saas-setup.mjs --dry-run
 */

import Stripe from "stripe";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");

const PLANS = [
  {
    key: "STARTER",
    name: "VanguardM Starter",
    price: 4900, // $49/mo
    description: "CRM, client portal, tickets, messaging — up to 5 clients",
    maxClients: 5,
  },
  {
    key: "PRO",
    name: "VanguardM Pro",
    price: 14900, // $149/mo
    description: "Everything in Starter + reports, blog, leads, approvals — up to 25 clients",
    maxClients: 25,
  },
  {
    key: "ENTERPRISE",
    name: "VanguardM Enterprise",
    price: 34900, // $349/mo
    description: "Everything in Pro + AI agent, white-label branding, priority support — unlimited clients",
    maxClients: 999,
  },
];

async function main() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey && !DRY_RUN) {
    console.error("Error: STRIPE_SECRET_KEY is required.");
    process.exit(1);
  }

  const isLive = secretKey?.startsWith("sk_live_");
  console.log(`\n  VanguardM SaaS — Stripe Subscription Setup`);
  console.log(`  Mode: ${DRY_RUN ? "DRY RUN" : isLive ? "LIVE" : "TEST"}\n`);

  if (isLive && !args.includes("--live")) {
    console.error("Error: Live key detected. Add --live flag to confirm.");
    process.exit(1);
  }

  const envLines = [];

  if (DRY_RUN) {
    for (const plan of PLANS) {
      console.log(`  Would create: ${plan.name} — $${(plan.price / 100).toFixed(2)}/mo`);
      envLines.push(`STRIPE_PRICE_${plan.key}=price_placeholder`);
    }
  } else {
    const stripe = new Stripe(secretKey);

    // Check for existing products
    const existing = await stripe.products.list({ limit: 100, active: true });
    const byMeta = new Map();
    for (const p of existing.data) {
      if (p.metadata?.vanguardm_plan) {
        byMeta.set(p.metadata.vanguardm_plan, p);
      }
    }

    for (const plan of PLANS) {
      const existingProduct = byMeta.get(plan.key);

      if (existingProduct) {
        const prices = await stripe.prices.list({ product: existingProduct.id, active: true, limit: 1 });
        if (prices.data.length > 0) {
          envLines.push(`STRIPE_PRICE_${plan.key}=${prices.data[0].id}`);
          console.log(`  ✓ Exists: ${plan.name} → ${prices.data[0].id}`);
          continue;
        }
      }

      const product = await stripe.products.create({
        name: plan.name,
        description: plan.description,
        metadata: {
          vanguardm_plan: plan.key,
          max_clients: String(plan.maxClients),
        },
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: plan.price,
        currency: "usd",
        recurring: { interval: "month" },
      });

      envLines.push(`STRIPE_PRICE_${plan.key}=${price.id}`);
      console.log(`  + Created: ${plan.name} → ${price.id}`);
    }
  }

  console.log("\n  ── Add to production.env ──────────────────\n");
  for (const line of envLines) {
    console.log(`  ${line}`);
  }
  console.log();
}

main().catch((err) => {
  console.error("\n  Error:", err.message);
  process.exit(1);
});
