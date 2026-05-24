import { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import GlassCard from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Branding & Identity Design",
  description: "Build a brand that stands out. Logo design, brand messaging, visual identity systems, and competitive positioning.",
  keywords: ["branding services", "brand identity", "logo design", "brand strategy", "visual identity", "brand messaging", "style guide"],
  alternates: { canonical: "/services/branding" },
  openGraph: {
    title: "Branding & Identity Design | Vanguard Digital Marketing",
    description: "Build a brand that stands out. Logo design, brand messaging, visual identity systems, and competitive positioning.",
    url: "/services/branding",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vanguard Digital Marketing Branding Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Branding & Identity Design | Vanguard Digital Marketing",
    description: "Build a brand that stands out. Logo design, brand messaging, visual identity systems, and positioning.",
  },
};

const services = [
    {
        icon: "🧭",
        title: "Brand Strategy & Positioning",
        description: "Market research, competitive analysis, unique value proposition, target audience personas"
    },
    {
        icon: "🎨",
        title: "Logo Design",
        description: "Primary logo, secondary marks, icon variations, responsive logo system"
    },
    {
        icon: "👁️",
        title: "Visual Identity System",
        description: "Color palette, typography, imagery style, iconography, patterns"
    },
    {
        icon: "🗣️",
        title: "Brand Messaging Framework",
        description: "Brand voice, tone guidelines, taglines, elevator pitch, key messages"
    },
    {
        icon: "📖",
        title: "Brand Style Guide",
        description: "Comprehensive guidelines document covering all visual and verbal standards"
    },
    {
        icon: "🔄",
        title: "Brand Audit & Refresh",
        description: "Evaluate existing brand, identify gaps, modernize without losing equity"
    },
    {
        icon: "📄",
        title: "Collateral Design",
        description: "Business cards, letterheads, email signatures, social media templates"
    }
];

const faqs = [
    {
        question: "How long does a branding project take?",
        answer: "A comprehensive branding project typically takes 4-6 weeks, from discovery and strategy to final delivery of the brand guide and assets. Smaller projects, like a logo refresh, can be completed more quickly."
    },
    {
        question: "How much does branding cost?",
        answer: "Our branding packages are tailored to the scope of each project. We offer everything from a-la-carte logo design to full brand identity systems. We can provide a custom quote after a brief discovery call."
    },
    {
        question: "What if I already have a logo but need a full identity?",
        answer: "That's a common situation. We can perform a brand audit to see if the existing logo can be integrated into a new, more comprehensive visual identity system, or if a logo refresh is the best path forward."
    },
    {
        question: "How many logo concepts will I see?",
        answer: "Our creative exploration phase typically includes 2-3 initial logo concepts based on our discovery and strategy. We then work with you to refine and iterate on the chosen direction until it's perfect."
    },
    {
        question: "Do you do packaging design?",
        answer: "While our core focus is on digital branding, we do offer packaging design as part of a larger brand identity project. Let us know your needs, and we can create a custom scope."
    },
    {
        question: "Will I own the final brand assets?",
        answer: "Yes. Upon final payment, you will receive full ownership and all source files for the brand assets we create for you."
    }
];

export default function BrandingPage() {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Branding & Identity Design",
        "description": "Complete brand identity design including logos, color systems, typography, and brand guidelines that make your business stand out.",
        "serviceType": "Branding & Identity Design",
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
                  { "@type": "ListItem", "position": 3, "name": "Branding & Identity Design" }
                ]
              }) }}
            />
            <section className="py-14 md:py-24 px-5 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">
                        Branding & Identity
                    </p>
                    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                        Build a Brand That <span className="text-amber">Commands Attention</span>
                    </h1>
                    <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                        Your brand is more than a logo. We build complete identity systems — visual, verbal, and strategic — that make your business unforgettable.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-8">
                        <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer bg-amber text-slate-950 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25">
                            Start Your Brand Project
                        </Link>
                        <Link href="/portfolio" className="inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border border-emerald/30 text-emerald hover:bg-emerald/10 hover:border-emerald/50">
                            View Brand Work
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-28 px-5 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-12">Branding & Identity Services</h2>
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
                        Frequently Asked <span className="text-amber">Branding Questions</span>
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
