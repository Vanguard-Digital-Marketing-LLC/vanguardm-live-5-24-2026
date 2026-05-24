import { auth } from "@/auth";
import { hasAccessServer } from "@/lib/stripe/access-server";
import type { Course } from "@/lib/academy-data";
import Link from "next/link";
import PurchaseButtonClient from "./PurchaseButtonClient";

interface CourseAccessGateProps {
  course: Course;
  children: React.ReactNode;
}

export default async function CourseAccessGate({
  course,
  children,
}: CourseAccessGateProps) {
  // Free courses require authentication (but not purchase)
  if (course.tier === "free") {
    const session = await auth();
    if (session?.user?.id) return <>{children}</>;

    // Not signed in — show signup prompt
    return (
      <div className="glass rounded-2xl p-8 md:p-12 text-center">
        <div className="text-4xl mb-4">{course.icon}</div>
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
          Sign Up to Access This Free Course
        </h2>
        <p className="text-sm md:text-base text-slate-400 mb-8 max-w-2xl mx-auto">
          Create a free account to access the full lesson content,
          take quizzes, and track your progress.
        </p>
        <div className="space-y-3">
          <Link
            href={`/auth/sign-up?callbackUrl=/academy/${course.slug}`}
            className="inline-block font-display font-semibold uppercase tracking-wider text-xs md:text-sm px-7 py-3.5 rounded-lg bg-emerald text-slate-950 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald/25 transition-all duration-300"
            data-track="signup_cta"
            data-track-category="academy"
          >
            Create Free Account
          </Link>
          <p className="text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              href={`/auth/sign-in?callbackUrl=/academy/${course.slug}`}
              className="text-emerald hover:underline"
              data-track="signin_cta"
              data-track-category="academy"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const session = await auth();
  const userId = session?.user?.id;
  const purchased = await hasAccessServer(userId, course.slug);

  if (purchased) return <>{children}</>;

  // Not purchased — show paywall
  return (
    <div className="glass rounded-2xl p-8 md:p-12 text-center">
      <div className="text-4xl mb-4">{course.icon}</div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
        Unlock {course.title}
      </h2>
      <p className="text-sm md:text-base text-slate-400 mb-8 max-w-2xl mx-auto">
        This is a premium course with 5 comprehensive sections, a{" "}
        {course.examQuestionCount}-question certification exam, and a
        downloadable certificate of completion.
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

      {userId ? (
        // Authenticated but hasn't purchased
        <PurchaseButton course={course} />
      ) : (
        // Not signed in
        <div className="space-y-3">
          <Link
            href={`/auth/sign-in?callbackUrl=/academy/${course.slug}`}
            className="inline-block font-display font-semibold uppercase tracking-wider text-xs md:text-sm px-7 py-3.5 rounded-lg bg-emerald text-slate-950 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald/25 transition-all duration-300"
            data-track="purchase_signin_cta"
            data-track-category="academy"
          >
            Sign In to Purchase
          </Link>
          <p className="text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href={`/auth/sign-up?callbackUrl=/academy/${course.slug}`}
              className="text-emerald hover:underline"
              data-track="signup_cta"
              data-track-category="academy"
            >
              Create one
            </Link>
          </p>
        </div>
      )}

      <p className="text-xs text-slate-500 mt-4">
        Secure checkout powered by Stripe
      </p>
    </div>
  );
}

// Client component for purchase button (needs onClick)
function PurchaseButton({ course }: { course: Course }) {
  // This is a server component, so we render a form-based approach
  // or use a client component. For simplicity, link to a client-side handler.
  return (
    <PurchaseButtonClient
      stripePriceId={course.stripePriceId}
      courseSlug={course.slug}
    />
  );
}

