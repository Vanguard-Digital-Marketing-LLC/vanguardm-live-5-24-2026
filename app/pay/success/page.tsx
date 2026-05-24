import type { Metadata } from "next";
import Stripe from "stripe";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Successful",
  robots: { index: false, follow: false },
};

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function PaySuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  let session: Stripe.Checkout.Session | null = null;

  if (sessionId) {
    try {
      const stripe = getStripe();
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch {
      // Invalid session — show generic success
    }
  }

  const dollars = session?.amount_total
    ? (session.amount_total / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
    : null;

  return (
    <main className="pt-24 space-y-10 md:space-y-16">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="glass rounded-xl p-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-2xl font-display font-bold text-emerald">Payment Successful</p>
            {dollars && (
              <p className="text-3xl font-display font-bold">{dollars}</p>
            )}
            {session?.metadata?.description && (
              <p className="text-sm text-slate-400">{session.metadata.description}</p>
            )}
            <p className="text-sm text-slate-400">
              A receipt has been sent to your email. Thank you for your payment.
            </p>
          </div>

          <Link
            href="/"
            className="inline-block py-3 px-8 rounded-lg bg-amber text-slate-950 font-display text-sm font-semibold uppercase tracking-wider hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
