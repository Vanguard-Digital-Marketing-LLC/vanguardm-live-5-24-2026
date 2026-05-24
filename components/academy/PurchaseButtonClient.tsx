"use client";

import { useState } from "react";
import { redirectToCheckout } from "@/lib/stripe/checkout";
import { trackEvent } from "@/lib/gtm";

interface PurchaseButtonClientProps {
  stripePriceId?: string;
  courseSlug: string;
}

export default function PurchaseButtonClient({
  stripePriceId,
  courseSlug,
}: PurchaseButtonClientProps) {
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    if (!stripePriceId) return;
    setLoading(true);
    trackEvent("course_purchase_initiated", { course_slug: courseSlug });
    try {
      await redirectToCheckout(stripePriceId, courseSlug);
    } catch {
      setLoading(false);
    }
  }

  if (!stripePriceId) {
    return (
      <a
        href="/contact"
        className="inline-block font-display font-semibold uppercase tracking-wider text-xs md:text-sm px-7 py-3.5 rounded-lg bg-amber text-slate-950 hover:bg-amber-400 transition-all"
      >
        Coming Soon &mdash; Contact Us
      </a>
    );
  }

  return (
    <button
      onClick={handlePurchase}
      disabled={loading}
      className="font-display font-semibold uppercase tracking-wider text-xs md:text-sm px-7 py-3.5 rounded-lg bg-amber text-slate-950 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      {loading ? "Redirecting..." : "Purchase Course"}
    </button>
  );
}
