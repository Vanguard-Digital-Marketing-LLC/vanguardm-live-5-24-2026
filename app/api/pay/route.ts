import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/turnstile";
import { verifyPaymentSignature } from "@/lib/payment-links";
import { getStripeForAgency, getStripe } from "@/lib/stripe/customer";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "public");
  if (blocked) return blocked;
  const { amount, description, email, signature, exp, turnstileToken, agencyId } =
    await request.json();

  // Verify Turnstile
  if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 403 },
    );
  }

  // Validate required fields
  if (!amount || !description || !signature) {
    return NextResponse.json(
      { error: "Invalid payment link." },
      { status: 400 },
    );
  }

  const cents = Number(amount);
  if (!Number.isInteger(cents) || cents < 100 || cents > 10_000_00) {
    return NextResponse.json(
      { error: "Invalid amount." },
      { status: 400 },
    );
  }

  // Verify HMAC signature + expiry — prevents amount/agency tampering and replay
  if (!verifyPaymentSignature(cents, description, signature, Number(exp), agencyId || undefined)) {
    return NextResponse.json(
      { error: "Invalid or expired payment link." },
      { status: 403 },
    );
  }

  // Optional email validation
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 },
    );
  }

  // Use agency-specific Stripe or platform default
  const stripe = agencyId ? await getStripeForAgency(agencyId) : getStripe();

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: cents,
          product_data: { name: description },
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pay?amount=${cents}&desc=${encodeURIComponent(description)}&sig=${signature}&exp=${exp}${agencyId ? `&agency=${agencyId}` : ""}${email ? `&email=${encodeURIComponent(email)}` : ""}&canceled=true`,
    metadata: {
      type: "service_payment",
      description,
      ...(agencyId && { agencyId }),
    },
    ...(email && { customer_email: email }),
  });

  return NextResponse.json({ url: checkoutSession.url });
}
