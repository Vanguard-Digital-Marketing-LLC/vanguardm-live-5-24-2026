import { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import GlassCard from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Content Marketing Services",
  description: "Strategic content marketing that attracts, engages, and converts. Blog writing, video strategy, email campaigns, and more.",
  keywords: ["content marketing services", "blog writing", "content strategy", "email marketing", "video marketing", "lead magnets", "content calendar"],
  alternates: { canonical: "/services/content-marketing" },
  openGraph: {
    title: "Content Marketing Services | Vanguard Digital Marketing",
    description: "Strategic content marketing that attracts, engages, and converts. Blog writing, video strategy, and email campaigns.",
    url: "/services/content-marketing",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vanguard Digital Marketing Content Marketing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Content Marketing Services | Vanguard Digital Marketing",
    description: "Strategic content marketing that attracts, engages, and converts. Blog writing, video strategy, and email campaigns.",
  },
};

const services = [
    {
        icon: "📝",
        title: "Content Strategy",
        description: "Audience research, content pillars, editorial calendar, funnel mapping"
    },
    {
        icon: "✍️",
        title: "Blog & Article Writing",
        description: "SEO-optimized long-form content, guest posts, thought leadership"
    },
    {
        icon: "▶️",
        title: "Video Content Strategy",
        description: "YouTube strategy, social video, explainer videos, script writing"
    },
    {
        icon: "📧",
        title: "Email Marketing",
        description: "Drip campaigns, newsletters, automated sequences, segmentation"
    },
    {
        icon: "🧲",
        title: "Lead Magnets",
        description: "Whitepapers, eBooks, checklists, templates, gated content"
    },
    {
        icon: "👍",
        title: "Case Studies & Testimonials",
        description: "Customer success stories, social proof content"
    }
];

const faqs = [
    {
        question: "How often should we publish new content?",
        answer: "The ideal frequency depends on your industry and goals. We typically recommend 1-2 new blog posts per week for most businesses to maintain momentum and signal freshness to Google."
    },
    {
        question: "Do you write content for our industry even if it's technical?",
        answer: "Yes. Our team includes writers with experience across a wide range of industries, including technical, financial, and medical fields. We perform deep research to ensure all content is accurate and authoritative."
    },
    {
        question: "How do you measure content marketing ROI?",
        answer: "We track metrics at every stage of the funnel: organic traffic and rankings (awareness), time on page and bounce rate (engagement), and leads or sales generated from content (conversion). The ultimate goal is to tie content efforts to revenue."
    },
    {
        question: "Can you work with our existing content team?",
        answer: "Absolutely. We can augment your existing team by providing strategy, keyword research, editing, or writing capacity, depending on your needs."
    },
    {
        question: "What's the difference between content marketing and copywriting?",
        answer: "Content marketing focuses on attracting and educating an audience with valuable content (like blog posts). Copywriting is the art of writing persuasive text that prompts a specific action (like a sale or signup)."
    },
    {
        question: "How long until we see results from content marketing?",
        answer: "Content marketing is a long-term strategy. You can expect to see initial traffic and engagement within the first 3 months, with more significant results in terms of leads and authority typically building over 6-12 months."
    }
];

export default function ContentMarketingPage() {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Content Marketing",
        "description": "Strategic content marketing that builds authority and drives organic traffic. Blog posts, landing pages, email campaigns, and more.",
        "serviceType": "Content Marketing",
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
                  { "@type": "ListItem", "position": 3, "name": "Content Marketing" }
                ]
              }) }}
            />
            <section className="py-14 md:py-24 px-5 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">
                        Content Marketing
                    </p>
                    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                        Content That <span className="text-amber">Attracts, Engages & Converts</span>
                    </h1>
                    <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                        Strategic content is the engine behind every successful marketing channel. We create content that drives traffic, builds trust, and generates leads.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-8">
                        <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer bg-amber text-slate-950 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25">
                            Get a Content Strategy
                        </Link>
                        <Link href="/portfolio" className="inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border border-emerald/30 text-emerald hover:bg-emerald/10 hover:border-emerald/50">
                            See Examples
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-28 px-5 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-12">Content Marketing Services</h2>
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
                        Frequently Asked <span className="text-amber">Content Marketing Questions</span>
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
