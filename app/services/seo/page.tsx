import { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import GlassCard from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "SEO Services",
  description: "Data-driven SEO services that drive organic traffic and revenue. Technical audits, keyword strategy, and local SEO for Texas businesses.",
  keywords: ["SEO services", "search engine optimization", "SEO agency Texas", "organic traffic", "keyword research", "technical SEO", "local SEO"],
  alternates: { canonical: "/services/seo" },
  openGraph: {
    title: "SEO Services | Vanguard Digital Marketing",
    description: "Data-driven SEO services that drive organic traffic and revenue. Technical audits, keyword strategy, and local SEO.",
    url: "/services/seo",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vanguard Digital Marketing SEO Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Services | Vanguard Digital Marketing",
    description: "Data-driven SEO services that drive organic traffic and revenue. Technical audits, keyword strategy, and local SEO.",
  },
};

const services = [
    {
        icon: "🔍",
        title: "Technical SEO Audits",
        description: "Crawl errors, site speed, Core Web Vitals, mobile-first indexing"
    },
    {
        icon: "📝",
        title: "Keyword Research & Strategy",
        description: "Search volume, competition analysis, intent mapping"
    },
    {
        icon: "✍️",
        title: "On-Page Optimization",
        description: "Title tags, meta descriptions, heading structure, internal linking"
    },
    {
        icon: "🔗",
        title: "Off-Page SEO & Link Building",
        description: "Authority building, outreach, digital PR"
    },
    {
        icon: "📍",
        title: "Local SEO",
        description: "Google Business Profile, citations, reviews, geo-targeted content"
    },
    {
        icon: "📈",
        title: "Monthly Reporting & Analytics",
        description: "Ranking tracking, traffic analysis, ROI measurement"
    }
];

const faqs = [
    {
        question: "How long does SEO take to show results?",
        answer: "SEO is a long-term strategy. While some improvements can be seen in as little as a few weeks, significant results typically take 4-6 months of consistent effort. It's a marathon, not a sprint."
    },
    {
        question: "What's the difference between SEO and PPC?",
        answer: "SEO focuses on earning organic (free) traffic from search engines, while PPC (Pay-Per-Click) involves paying for ads to appear in search results. SEO builds long-term authority, while PPC provides immediate visibility."
    },
    {
        question: "Do you guarantee #1 rankings?",
        answer: "No reputable SEO agency can guarantee #1 rankings. Google's algorithm is complex and constantly changing. We do guarantee that we will apply proven, data-driven strategies to significantly improve your search visibility and organic traffic."
    },
    {
        question: "How much do SEO services cost?",
        answer: "Our SEO services are customized to your specific goals and business needs. We offer a range of packages and can create a custom quote after a free initial audit and consultation."
    },
    {
        question: "What SEO tools do you use?",
        answer: "We use a suite of industry-leading tools, including Ahrefs, SEMrush, Google Search Console, Google Analytics, Screaming Frog, and various proprietary tools for analysis and reporting."
    },
    {
        question: "Can I do SEO myself or do I need an agency?",
        answer: "While you can certainly learn and implement basic SEO, a dedicated agency brings expertise, experience, and resources to the table that can accelerate your results and avoid costly mistakes."
    }
];


export default function SEOPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SEO Services",
    "description": "Data-driven search engine optimization that drives real revenue. Technical SEO, content strategy, and link building for businesses nationwide.",
    "serviceType": "SEO",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Vanguard Digital Marketing",
      "telephone": "+1-936-358-6500",
      "url": SITE_URL
    },
    "areaServed": [
      { "@type": "State", "name": "Texas" },
      { "@type": "Country", "name": "US" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <main className="pt-24 space-y-10 md:space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": `${SITE_URL}/services` },
              { "@type": "ListItem", "position": 3, "name": "SEO Services" }
            ]
          }) }}
        />
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">
            Search Engine Optimization
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            SEO Services That Drive <span className="text-amber">Real Revenue</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Data-driven SEO, measurable results, transparent reporting.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-8">
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer bg-amber text-slate-950 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25">
                Get Your Free SEO Audit
            </Link>
            <Link href="/portfolio" className="inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border border-emerald/30 text-emerald hover:bg-emerald/10 hover:border-emerald/50">
                See Our Work
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 md:mb-4">Why SEO Matters for Your Business</h2>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                Are you invisible on Google? Are your competitors outranking you? Are you paying too much for ads? Vanguard is the solution.
            </p>
        </div>
      </section>

      <section className="py-16 md:py-28 px-5 md:px-6">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-12">Our SEO Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {services.map((service) => (
                    <GlassCard key={service.title} className="text-center p-6">
                        <div className="w-14 h-14 rounded-xl bg-emerald/10 flex items-center justify-center text-2xl mb-4 mx-auto">{service.icon}</div>
                        <h3 className="font-display text-lg font-semibold mb-2">{service.title}</h3>
                        <p className="text-sm text-slate-400">{service.description}</p>
                    </GlassCard>
                ))}
            </div>
        </div>
      </section>

      <section className="py-16 md:py-28 px-5 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-12">
            Frequently Asked <span className="text-amber">SEO Questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <GlassCard key={faq.question} className="p-6">
                <h3 className="font-display text-lg font-semibold text-emerald mb-2">{faq.question}</h3>
                <p className="text-sm text-slate-400">{faq.answer}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

        <CTASection />
    </main>
  );
}
