import type { Metadata } from "next";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Digital Marketing Services",
  description: "Full-service digital marketing — SEO, web design, social media, PPC, branding, and content marketing. Vanguard delivers results.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Digital Marketing Services | Vanguard Digital Marketing",
    description: "SEO, web design, PPC, social media, branding, and content marketing. Full-service solutions that deliver results.",
    url: "/services",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vanguard Digital Marketing Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Services | Vanguard Digital Marketing",
    description: "SEO, web design, PPC, social media, branding, and content marketing. Full-service solutions that deliver results.",
  },
};

const serviceIcons: Record<string, React.ReactNode> = {
  seo: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  web: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  social: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  ppc: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  brand: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  content: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
};

const services = [
  {
    iconKey: "seo",
    slug: "seo",
    title: "SEO & Search Marketing",
    desc: "Dominate search results with data-driven SEO strategies. We optimize your online presence to drive organic traffic that converts.",
    items: [
      "Technical SEO audits",
      "Keyword research & strategy",
      "On-page & off-page optimization",
      "Local SEO for Texas businesses",
      "Monthly ranking reports",
    ],
  },
  {
    iconKey: "web",
    slug: "web-design",
    title: "Web Design & Development",
    desc: "Custom websites built for speed, conversions, and visual impact. From landing pages to full-scale web applications.",
    items: [
      "Responsive, mobile-first design",
      "Conversion-optimized layouts",
      "Custom WordPress & Next.js builds",
      "E-commerce solutions",
      "Performance optimization",
    ],
  },
  {
    iconKey: "social",
    slug: "social-media",
    title: "Social Media Marketing",
    desc: "Build your brand presence across every platform. We create engaging content and manage communities that fuel growth.",
    items: [
      "Platform strategy & setup",
      "Content creation & scheduling",
      "Community management",
      "Paid social campaigns",
      "Analytics & reporting",
    ],
  },
  {
    iconKey: "ppc",
    slug: "ppc",
    title: "PPC & Google Ads",
    desc: "Maximize your ad spend with precision-targeted campaigns. Our PPC experts deliver high-intent traffic and measurable ROI.",
    items: [
      "Google Ads management",
      "Display & remarketing campaigns",
      "Shopping & local service ads",
      "A/B testing & optimization",
      "Transparent spend reporting",
    ],
  },
  {
    iconKey: "brand",
    slug: "branding",
    title: "Branding & Identity",
    desc: "Stand out in a crowded market. We develop visual identities, messaging frameworks, and brand strategies that stick.",
    items: [
      "Logo & visual identity design",
      "Brand messaging & voice",
      "Style guides & brand books",
      "Brand audit & refresh",
      "Competitive positioning",
    ],
  },
  {
    iconKey: "content",
    slug: "content-marketing",
    title: "Content Marketing",
    desc: "Attract and nurture your audience with strategic content. From blog posts to video scripts, we create content that converts.",
    items: [
      "Blog & article writing",
      "Video content strategy",
      "Email marketing campaigns",
      "Lead magnets & whitepapers",
      "Content calendar management",
    ],
  },
];

const processSteps = [
  {
    num: "01",
    title: "Audit & Discovery",
    desc: "Deep dive into your business, competitors, and market opportunities.",
  },
  {
    num: "02",
    title: "Strategy & Planning",
    desc: "Custom roadmap built around your goals, budget, and timeline.",
  },
  {
    num: "03",
    title: "Execution & Launch",
    desc: "We implement, test, and launch campaigns across all channels.",
  },
  {
    num: "04",
    title: "Optimize & Scale",
    desc: "Continuous improvement through data analysis and strategic scaling.",
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-24 space-y-10 md:space-y-16">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">
            Our Services
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Digital Marketing Services That{" "}
            <span className="text-amber">Deliver Results</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Comprehensive digital marketing solutions designed to accelerate your
            growth, strengthen your brand, and maximize your investment.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 md:gap-8">
          {services.map((svc) => (
            <Link key={svc.title} href={`/services/${svc.slug}`}>
              <GlassCard className="!p-6 md:!p-8 text-center">
                <div className="w-14 h-14 rounded-xl bg-emerald/10 flex items-center justify-center mb-4 mx-auto">
                  {serviceIcons[svc.iconKey]}
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {svc.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {svc.desc}
                </p>
                <ul className="space-y-2 text-left max-w-xs mx-auto">
                  {svc.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <span className="text-emerald mt-0.5">{"\u2713"}</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="inline-flex items-center gap-1 font-display text-xs font-semibold uppercase tracking-widest text-emerald mt-4">
                  Learn More →
                </p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-28 px-5 md:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-3">
            How We Work
          </p>
          <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-12">
            Our Proven <span className="text-amber">Process</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {processSteps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-lg font-bold text-amber">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-display font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
