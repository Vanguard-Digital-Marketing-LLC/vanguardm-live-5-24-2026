"use client";

import { useState, useEffect } from "react";
import type { Course } from "@/lib/academy-data";
import { hasAccess, checkUrlForPurchase } from "@/lib/stripe/access";
import { redirectToCheckout } from "@/lib/stripe/checkout";
import Button from "@/components/ui/Button";

interface PaymentGateProps {
  course: Course;
  children: React.ReactNode;
}

export default function PaymentGate({ course, children }: PaymentGateProps) {
  const [userHasAccess, setUserHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    checkUrlForPurchase(course.slug);
    setUserHasAccess(hasAccess(course.slug));
    setLoading(false);
  }, [course.slug]);

  if (course.tier === "free") return <>{children}</>;

  if (loading) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    );
  }

  if (userHasAccess) return <>{children}</>;

  async function handlePurchase() {
    if (!course.stripePriceId) return;
    setCheckoutLoading(true);
    try {
      await redirectToCheckout(course.stripePriceId, course.slug);
    } catch {
      setCheckoutLoading(false);
    }
  }

  return (
    <div className="glass rounded-2xl p-8 md:p-12 text-center">
      <div className="text-4xl mb-4">{course.icon}</div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
        Unlock {course.title}
      </h2>
      <p className="text-sm md:text-base text-slate-400 mb-8 max-w-2xl mx-auto">
        This is a premium course with 5 comprehensive sections, a 60-question
        certification exam, and a downloadable certificate of completion.
      </p>

      <div className="glass rounded-xl p-6 mb-8 max-w-sm mx-auto">
        <div className="text-3xl font-display font-bold text-emerald mb-1">
          ${((course.price ?? 0) / 100).toFixed(2)}
        </div>
        <p className="text-xs text-slate-500">
          One-time payment &middot; Lifetime access
        </p>
      </div>

      <div className="space-y-3 mb-8 max-w-md mx-auto text-left">
        {[
          `${course.examQuestionCount}-question comprehensive exam`,
          "Certificate of completion",
          "Lifetime access to course materials",
          "5 in-depth sections with real-world examples",
        ].map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 text-sm text-slate-300"
          >
            <span className="text-emerald shrink-0">&#10003;</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {course.stripePriceId ? (
        <button
          onClick={handlePurchase}
          disabled={checkoutLoading}
          className="font-display font-semibold uppercase tracking-wider text-xs md:text-sm px-7 py-3.5 rounded-lg bg-amber text-slate-950 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {checkoutLoading ? "Redirecting..." : "Purchase Course"}
        </button>
      ) : (
        <Button href="/contact">Coming Soon &mdash; Contact Us</Button>
      )}

      <p className="text-xs text-slate-500 mt-4">
        Secure checkout powered by Stripe
      </p>
    </div>
  );
}
