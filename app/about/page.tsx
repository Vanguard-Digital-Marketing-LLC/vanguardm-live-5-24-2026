import type { Metadata } from "next";
import GlassCard from "@/components/ui/GlassCard";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Vanguard Digital Marketing — a Texas-based, full-service digital marketing agency serving businesses nationwide.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Vanguard Digital Marketing",
    description: "Built in Texas. Trusted Nationwide. Learn about our story, values, and mission.",
    url: "/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Vanguard Digital Marketing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Vanguard Digital Marketing",
    description: "Built in Texas. Trusted Nationwide. Learn about our story, values, and mission.",
  },
};

const milestones = [
  { year: "2019", event: "Founded in Texas with a mission to deliver transparent, results-driven marketing" },
  { year: "2020", event: "Expanded to serve clients across 15 states" },
  { year: "2022", event: "Surpassed 100 active clients nationwide" },
  { year: "2024", event: "Launched Texas-based hosting and full-stack development services" },
  { year: "2026", event: "Serving 148+ clients with a 97% retention rate" },
];

const values = [
  { title: "Transparency", desc: "We believe in open communication, honest reporting, and no hidden fees." },
  { title: "Results-Driven", desc: "Every strategy is built around measurable outcomes and real ROI." },
  { title: "Partnership", desc: "We work as an extension of your team, not just a vendor." },
  { title: "Innovation", desc: "We stay ahead of industry trends to give our clients a competitive edge." },
];

export default function AboutPage() {
  return (
    <main className="pt-24 space-y-10 md:space-y-16">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">About Vanguard</p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Built in Texas. <span className="text-amber">Trusted Nationwide.</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Vanguard Digital Marketing is a results-driven agency helping businesses build strong digital presences through strategy, creativity, and technology.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="p-8 md:p-12">
            <h2 className="font-display text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-4">
              Founded with the belief that every business deserves access to world-class digital marketing, Vanguard has grown from a small Texas startup to a nationwide agency serving over 148 clients. We combine strategy, creativity, and relentless execution to drive measurable growth.
            </p>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              Our team of dedicated marketers, designers, and developers work as an extension of your team — with full transparency, no long-term contracts, and a singular focus on your success.
            </p>
          </GlassCard>
        </div>
      </section>

      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold mb-10 md:mb-12">Our <span className="text-amber">Values</span></h2>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {values.map((v) => (
              <GlassCard key={v.title} className="text-center">
                <h3 className="font-display text-lg font-semibold text-emerald mb-2">{v.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold mb-10 md:mb-12">Our <span className="text-amber">Journey</span></h2>
          <div className="space-y-5 md:space-y-6">
            {milestones.map((m) => (
              <div key={m.year} className="glass rounded-xl p-5 md:p-6 text-center">
                <span className="font-display text-xl font-bold text-emerald block mb-1">{m.year}</span>
                <p className="text-slate-300 text-sm leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
