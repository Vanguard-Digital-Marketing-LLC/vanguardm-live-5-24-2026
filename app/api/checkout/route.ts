import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { getCourse } from "@/lib/academy-data";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "public");
  if (blocked) return blocked;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "You must be signed in to purchase." },
      { status: 401 },
    );
  }

  const { courseSlug } = await request.json();

  if (!courseSlug) {
    return NextResponse.json(
      { error: "Missing courseSlug." },
      { status: 400 },
    );
  }

  // SECURITY (L11): resolve the price server-side from the course slug. Never
  // trust a client-supplied priceId — it could point to a cheaper or arbitrary
  // price in the Stripe account while metadata still grants the requested course.
  const course = getCourse(courseSlug);
  if (!course || !course.stripePriceId) {
    return NextResponse.json(
      { error: "This course is not available for purchase." },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: course.stripePriceId, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/academy/${courseSlug}?purchased=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/academy/${courseSlug}?canceled=true`,
    metadata: {
      userId: session.user.id,
      courseSlug,
    },
    customer_email: session.user.email ?? undefined,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
