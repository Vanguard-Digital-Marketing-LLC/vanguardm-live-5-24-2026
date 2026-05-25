import type { Metadata } from "next";
import PayButton from "./PayButton";
import { verifyPaymentSignature } from "@/lib/payment-links";

export const metadata: Metadata = {
  title: "Pay",
  robots: { index: false, follow: false },
};

interface PayPageProps {
  searchParams: Promise<{
    amount?: string;
    desc?: string;
    sig?: string;
    exp?: string;
    email?: string;
    agency?: string;
    canceled?: string;
  }>;
}

export default async function PayPage({ searchParams }: PayPageProps) {
  const params = await searchParams;
  const amount = Number(params.amount);
  const description = params.desc || "";
  const signature = params.sig || "";
  const exp = Number(params.exp);
  const email = params.email || undefined;
  const agencyId = params.agency || undefined;
  const canceled = params.canceled === "true";

  const valid =
    Number.isInteger(amount) &&
    amount >= 100 &&
    amount <= 10_000_00 &&
    description &&
    signature &&
    verifyPaymentSignature(amount, description, signature, exp, agencyId);

  return (
    <main className="pt-24 space-y-10 md:space-y-16">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-md mx-auto">
          {!valid ? (
            <div className="glass rounded-xl p-8 text-center space-y-3">
              <p className="text-2xl font-display font-bold text-red-400">Invalid Payment Link</p>
              <p className="text-sm text-slate-400">
                This payment link is invalid or has expired. Please contact us for a new link.
              </p>
            </div>
          ) : (
            <>
              {canceled && (
                <div className="glass rounded-xl p-4 text-center mb-6 border border-amber/20">
                  <p className="text-sm text-amber">Payment was canceled. You can try again below.</p>
                </div>
              )}
              <PayButton
                amount={amount}
                description={description}
                signature={signature}
                exp={exp}
                email={email}
                agencyId={agencyId}
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
