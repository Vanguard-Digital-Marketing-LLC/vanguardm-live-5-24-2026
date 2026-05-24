import { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import AuditForm from "./AuditForm";

export const metadata: Metadata = {
  title: "Free Google Ads Audit for Texas Businesses | No Sales Pitch",
  description:
    "Get a free 15-minute teardown of your Google Ads account. $100K managed across 29 Texas businesses. No contracts. No sales pitch. Texas-based, owner-run.",
  alternates: { canonical: "/lp/texas-ppc-audit" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Free Google Ads Audit for Texas Businesses",
    description:
      "Get a free 15-minute teardown of your Google Ads account. No contracts. No sales pitch.",
    url: "/lp/texas-ppc-audit",
  },
};

const whatYouGet = [
  "Line-by-line review of your current Google Ads account (or your website if you're not running ads yet)",
  "The 3 keywords burning your budget right now — and what to do instead",
  "Your real Quality Score across every ad group (most owners have never seen this)",
  "Conversion tracking audit — are you even measuring what matters?",
  "Landing page teardown with 3 specific fixes that compound over time",
  "A 1-page action plan you keep whether you hire us or not",
];

const trustBarItems = [
  "$100K+ ad spend managed",
  "29 Texas businesses served",
  "Owner-run, no account managers",
  "Month-to-month, no contracts",
];

export default function TexasPPCAuditLP() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Free Google Ads Audit",
    description:
      "Free 15-minute Google Ads and website audit for Texas small business owners. No contracts, no sales pitch.",
    serviceType: "PPC Audit",
    provider: {
      "@type": "ProfessionalService",
      name: "Vanguard Digital Marketing",
      telephone: "+1-936-358-6500",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Conroe",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    areaServed: { "@type": "State", name: "Texas" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <main id="main-content" className="pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ── HERO + FORM (above the fold) ───────────────────────── */}
      <section className="px-5 md:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left: Headline + trust */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald/20 bg-emerald/5 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-emerald">
                Free · No Sales Pitch · 15 Minutes
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] mb-5">
              Fired Your Last Agency?{" "}
              <span className="text-amber">Good.</span>
              <br />
              Let&apos;s See What They Missed.
            </h1>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
              Get a free 15-minute teardown of your Google Ads account (or your
              website, if you&apos;re not running ads yet). We&apos;ll show you
              exactly where your money is leaking — and you keep the report
              whether you hire us or not.
            </p>

            {/* Click-to-call — mobile priority */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center lg:justify-start">
              <a
                href="tel:+19363586500"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-display text-sm font-semibold uppercase tracking-wider bg-amber text-slate-950 hover:bg-amber-400 transition-all"
                data-gtm-event="phone_click"
              >
                Call (936) 358-6500
              </a>
              <a
                href="#audit-form"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-display text-sm font-semibold uppercase tracking-wider border border-emerald/30 text-emerald hover:bg-emerald/10 transition-all"
              >
                Request Audit Online
              </a>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start text-xs text-slate-400">
              {trustBarItems.map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="text-emerald">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Inline form */}
          <div className="lg:col-span-2" id="audit-form">
            <AuditForm />
          </div>
        </div>
      </section>

      {/* ── What you get ────────────────────────────────────────── */}
      <section className="px-5 md:px-6 mt-20 md:mt-28">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 text-center">
            What You Get
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-10">
            A Real Audit. Not a{" "}
            <span className="text-amber">Sales Pitch in Disguise.</span>
          </h2>

          <ul className="space-y-4 max-w-2xl mx-auto">
            {whatYouGet.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald/20 text-emerald flex items-center justify-center font-display text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-sm md:text-base text-slate-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Testimonial / credibility ───────────────────────────── */}
      <section className="px-5 md:px-6 mt-20 md:mt-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-emerald/10 to-amber/5 border border-emerald/20">
            <p className="font-display text-xl md:text-2xl text-slate-200 leading-relaxed mb-5">
              &ldquo;They rebuilt our site AND took over our Google Ads. Same
              team. No finger-pointing. We went from dead leads to a booked
              calendar inside 60 days.&rdquo;
            </p>
            <div className="text-sm text-slate-400">
              <span className="font-display font-semibold text-amber">
                Texas Auto Services Owner
              </span>
              <span className="mx-2">·</span>
              <span>ADVTECH Detailing, Conroe TX</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why us ─────────────────────────────────────────────── */}
      <section className="px-5 md:px-6 mt-20 md:mt-28">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-10">
            Why Texas Business Owners{" "}
            <span className="text-amber">Trust Us</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "One Team. Website + Ads.",
                body: "Most agencies do one or the other. We build the site AND run the ads, so when something works (or doesn't), you know exactly who's accountable.",
              },
              {
                title: "No 12-Month Contracts.",
                body: "Month-to-month. You stay because it works, not because you're locked in. Most of our clients have been with us over a year anyway.",
              },
              {
                title: "You Own Everything.",
                body: "Your Google Ads account, your website code, your tracking, your data. If you fire us tomorrow, you keep all of it. That's not standard.",
              },
              {
                title: "Real Numbers. Real Reports.",
                body: "Live dashboards. Call tracking. Revenue attribution. You see the same screen we see — no vanity PDFs once a month.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 rounded-xl bg-white/5 border border-white/10"
              >
                <h3 className="font-display text-lg font-semibold text-emerald mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA with form ────────────────────────────────── */}
      <section className="px-5 md:px-6 mt-20 md:mt-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-amber mb-3">
            Limited — 5 Audit Slots This Month
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Ready to Stop{" "}
            <span className="text-amber">Guessing?</span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 mb-8 max-w-xl mx-auto">
            Fill out the form, or call us directly. Either way, the audit is
            free and the action plan is yours to keep.
          </p>

          <div className="max-w-xl mx-auto text-left">
            <AuditForm formId="audit-form-bottom" />
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Prefer to talk first?{" "}
            <a
              href="tel:+19363586500"
              className="text-emerald underline hover:text-emerald-300"
              data-gtm-event="phone_click"
            >
              Call (936) 358-6500
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
