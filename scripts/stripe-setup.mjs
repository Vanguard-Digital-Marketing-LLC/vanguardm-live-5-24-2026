#!/usr/bin/env node
/**
 * Vanguard Academy — Stripe Product & Price Setup
 *
 * Creates Stripe products and one-time prices for all paid Academy courses.
 * Outputs a JSON mapping of course slugs to Stripe Price IDs.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/stripe-setup.mjs
 *
 * Modes:
 *   --live     Use live Stripe keys (default: test mode)
 *   --dry-run  Preview what would be created without calling Stripe
 *   --update   Update academy-data.ts with generated price IDs
 */

import Stripe from "stripe";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ACADEMY_DATA_PATH = resolve(__dirname, "../lib/academy-data.ts");

// ── Parse CLI flags ────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const UPDATE_FILE = args.includes("--update");

// ── Paid course definitions ────────────────────
// Extracted from academy-data.ts — courses with tier: "paid"
const PAID_COURSES = [
  { slug: "google-ads-fundamentals", title: "Google Ads Fundamentals", price: 2900, category: "PPC & Paid Advertising" },
  { slug: "facebook-instagram-ads", title: "Facebook & Instagram Ads", price: 2900, category: "PPC & Paid Advertising" },
  { slug: "linkedin-advertising", title: "LinkedIn Advertising", price: 2900, category: "PPC & Paid Advertising" },
  { slug: "retargeting-remarketing", title: "Retargeting & Remarketing", price: 2900, category: "PPC & Paid Advertising" },
  { slug: "ad-copywriting-testing", title: "Ad Copywriting & Testing", price: 2900, category: "PPC & Paid Advertising" },
  { slug: "social-media-strategy", title: "Social Media Strategy", price: 2900, category: "Social Media Marketing" },
  { slug: "instagram-marketing", title: "Instagram Marketing Mastery", price: 2900, category: "Social Media Marketing" },
  { slug: "linkedin-content-strategy", title: "LinkedIn Content Strategy", price: 2900, category: "Social Media Marketing" },
  { slug: "tiktok-marketing", title: "TikTok Marketing", price: 2900, category: "Social Media Marketing" },
  { slug: "community-management", title: "Community Management", price: 2900, category: "Social Media Marketing" },
  { slug: "content-marketing-strategy", title: "Content Marketing Strategy", price: 2900, category: "Content Marketing & Email" },
  { slug: "video-marketing-youtube-seo", title: "Video Marketing & YouTube SEO", price: 2900, category: "Content Marketing & Email" },
  { slug: "email-marketing-mastery", title: "Email Marketing Mastery", price: 2900, category: "Content Marketing & Email" },
  { slug: "podcast-marketing", title: "Podcast Marketing", price: 2900, category: "Content Marketing & Email" },
  { slug: "content-repurposing", title: "Content Repurposing", price: 2900, category: "Content Marketing & Email" },
  { slug: "brand-identity-development", title: "Brand Identity Development", price: 2900, category: "Branding & Creative" },
  { slug: "brand-voice-messaging", title: "Brand Voice & Messaging", price: 2900, category: "Branding & Creative" },
  { slug: "visual-branding-digital", title: "Visual Branding for Digital", price: 2900, category: "Branding & Creative" },
  { slug: "brand-positioning", title: "Brand Positioning & Differentiation", price: 2900, category: "Branding & Creative" },
  { slug: "google-analytics-4", title: "Google Analytics 4 Mastery", price: 2900, category: "Analytics & Data" },
  { slug: "marketing-attribution", title: "Marketing Attribution", price: 2900, category: "Analytics & Data" },
  { slug: "conversion-rate-optimization", title: "Conversion Rate Optimization", price: 2900, category: "Analytics & Data" },
  { slug: "data-driven-marketing", title: "Data-Driven Marketing Decisions", price: 2900, category: "Analytics & Data" },
  { slug: "digital-marketing-strategy", title: "Digital Marketing Strategy", price: 2900, category: "Strategy & Growth" },
  { slug: "marketing-funnel-optimization", title: "Marketing Funnel Optimization", price: 2900, category: "Strategy & Growth" },
  { slug: "growth-hacking", title: "Growth Hacking", price: 2900, category: "Strategy & Growth" },
  { slug: "competitor-analysis", title: "Competitor Analysis", price: 2900, category: "Strategy & Growth" },
  { slug: "ecommerce-marketing", title: "E-Commerce Marketing", price: 2900, category: "E-Commerce & Industry" },
  { slug: "b2b-lead-generation", title: "B2B Lead Generation", price: 2900, category: "E-Commerce & Industry" },
  { slug: "reputation-management", title: "Reputation Management", price: 2900, category: "E-Commerce & Industry" },
];

// ── Main ───────────────────────────────────────
async function main() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey && !DRY_RUN) {
    console.error("Error: STRIPE_SECRET_KEY environment variable is required.");
    console.error("Usage: STRIPE_SECRET_KEY=sk_test_xxx node scripts/stripe-setup.mjs");
    process.exit(1);
  }

  const isLive = secretKey?.startsWith("sk_live_");
  console.log(`\n  Vanguard Academy — Stripe Setup`);
  console.log(`  Mode: ${DRY_RUN ? "DRY RUN" : isLive ? "LIVE" : "TEST"}`);
  console.log(`  Courses: ${PAID_COURSES.length} paid courses @ $29.00 each\n`);

  if (isLive && !args.includes("--live")) {
    console.error("Error: You provided a live key. Add --live flag to confirm.");
    process.exit(1);
  }

  const priceMap = {};

  if (DRY_RUN) {
    console.log("  Would create the following Stripe products:\n");
    for (const course of PAID_COURSES) {
      console.log(`    [${course.category}] ${course.title} — $${(course.price / 100).toFixed(2)}`);
      priceMap[course.slug] = "price_dry_run_placeholder";
    }
    console.log(`\n  Total: ${PAID_COURSES.length} products + ${PAID_COURSES.length} prices\n`);
  } else {
    const stripe = new Stripe(secretKey, { apiVersion: "2026-04-22.dahlia" });

    // Check for existing products to avoid duplicates
    console.log("  Checking for existing Vanguard Academy products...\n");
    const existingProducts = await stripe.products.list({ limit: 100, active: true });
    const existingByMeta = new Map();
    for (const p of existingProducts.data) {
      if (p.metadata?.vanguard_slug) {
        existingByMeta.set(p.metadata.vanguard_slug, p);
      }
    }

    for (const course of PAID_COURSES) {
      const existing = existingByMeta.get(course.slug);

      if (existing) {
        // Product exists — find its price
        const prices = await stripe.prices.list({ product: existing.id, active: true, limit: 1 });
        if (prices.data.length > 0) {
          priceMap[course.slug] = prices.data[0].id;
          console.log(`  ✓ Exists: ${course.title} → ${prices.data[0].id}`);
          continue;
        }
      }

      // Create product
      const product = await stripe.products.create({
        name: `Vanguard Academy: ${course.title}`,
        description: `Premium course with comprehensive exam and certificate of completion.`,
        metadata: {
          vanguard_slug: course.slug,
          category: course.category,
        },
      });

      // Create one-time price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: course.price,
        currency: "usd",
      });

      priceMap[course.slug] = price.id;
      console.log(`  + Created: ${course.title} → ${price.id}`);
    }
  }

  // Output the mapping
  console.log("\n  ── Price ID Mapping ──────────────────────\n");
  console.log(JSON.stringify(priceMap, null, 2));

  // Optionally update academy-data.ts
  if (UPDATE_FILE && !DRY_RUN) {
    console.log("\n  Updating academy-data.ts with price IDs...");
    let content = readFileSync(ACADEMY_DATA_PATH, "utf-8");

    for (const [slug, priceId] of Object.entries(priceMap)) {
      // Find the course block and add/replace stripePriceId
      const slugPattern = new RegExp(
        `(slug:\\s*"${slug}"[\\s\\S]*?)(stripePriceId:\\s*"[^"]*")?([\\s\\S]*?certificate:\\s*true)`,
      );
      const match = content.match(slugPattern);
      if (match) {
        if (match[2]) {
          // Replace existing stripePriceId
          content = content.replace(match[2], `stripePriceId: "${priceId}"`);
        } else {
          // Add stripePriceId before certificate line
          content = content.replace(
            new RegExp(`(slug:\\s*"${slug}"[\\s\\S]*?)(certificate:\\s*true)`),
            `$1stripePriceId: "${priceId}",\n    $2`,
          );
        }
      }
    }

    writeFileSync(ACADEMY_DATA_PATH, content);
    console.log("  ✓ academy-data.ts updated with Stripe price IDs\n");
  } else if (UPDATE_FILE && DRY_RUN) {
    console.log("\n  Skipping file update in dry-run mode.\n");
  } else {
    console.log("\n  Run with --update to write price IDs to academy-data.ts\n");
  }
}

main().catch((err) => {
  console.error("\n  Error:", err.message);
  process.exit(1);
});
