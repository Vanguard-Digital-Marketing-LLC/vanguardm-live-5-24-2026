import { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import GlassCard from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Social Media Marketing Services",
  description: "Strategic social media marketing — content creation, community management, paid social, and analytics. Grow your brand.",
  keywords: ["social media marketing", "social media management", "Instagram marketing", "Facebook marketing", "LinkedIn marketing", "social media agency"],
  alternates: { canonical: "/services/social-media" },
  openGraph: {
    title: "Social Media Marketing | Vanguard Digital Marketing",
    description: "Strategic social media marketing — content creation, community management, paid social, and analytics.",
    url: "/services/social-media",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vanguard Digital Marketing Social Media" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Marketing | Vanguard Digital Marketing",
    description: "Strategic social media marketing — content creation, community management, paid social, and analytics.",
  },
};

const platforms = [
    {
        icon: "📷",
        title: "Instagram",
        description: "Visual storytelling, Reels, Stories, shopping"
    },
    {
        icon: "👍",
        title: "Facebook",
        description: "Community building, local targeting, FB Ads"
    },
    {
        icon: "💼",
        title: "LinkedIn",
        description: "B2B thought leadership, lead generation, company pages"
    },
    {
        icon: "🎵",
        title: "TikTok",
        description: "Short-form video, trend riding, brand awareness"
    },
    {
        icon: "🐦",
        title: "X (Twitter)",
        description: "Real-time engagement, brand voice, industry conversations"
    },
    {
        icon: "▶️",
        title: "YouTube",
        description: "Long-form video strategy, SEO, channel growth"
    },
];

const faqs = [
    {
        question: "How often should we post on social media?",
        answer: "The ideal frequency depends on the platform and your audience. We typically recommend 3-5 times per week for platforms like Instagram and Facebook, and 1-3 times per day for platforms like X (Twitter)."
    },
    {
        question: "Which social media platforms should my business be on?",
        answer: "We recommend focusing on the platforms where your target audience is most active. For B2B companies, this is often LinkedIn. For B2C, it might be Instagram, Facebook, or TikTok. We help you identify the right platforms during our strategy phase."
    },
    {
        question: "Do you create all the content or do we need to provide assets?",
        answer: "We can do both. We have in-house capabilities for graphic design, copywriting, and video production. We can also work with your existing brand assets and content."
    },
    {
        question: "How do you measure social media ROI?",
        answer: "We track key performance indicators (KPIs) such as engagement rate, reach, website clicks, and conversions. For e-commerce clients, we can track direct revenue from social channels. The goal is to tie social media activity to tangible business outcomes."
    },
    {
        question: "Can you manage our paid social ads too?",
        answer: "Yes, our social media services include paid social advertising. We can create and manage targeted ad campaigns on platforms like Facebook, Instagram, and LinkedIn to accelerate your growth."
    }
];

export default function SocialMediaPage() {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Social Media Marketing",
        "description": "Strategic social media management across Facebook, Instagram, LinkedIn, and more. Content creation, community management, and paid social campaigns.",
        "serviceType": "Social Media Marketing",
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
                  { "@type": "ListItem", "position": 3, "name": "Social Media Marketing" }
                ]
              }) }}
            />
            <section className="py-14 md:py-24 px-5 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">
                        Social Media Marketing
                    </p>
                    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                        Social Media Marketing That <span className="text-amber">Builds Brands</span>
                    </h1>
                    <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                        Strategic content, engaged communities, measurable growth across every platform.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-8">
                        <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer bg-amber text-slate-950 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25">
                            Get a Social Strategy
                        </Link>
                        <Link href="/portfolio" className="inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border border-emerald/30 text-emerald hover:bg-emerald/10 hover:border-emerald/50">
                            See Our Work
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-28 px-5 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-12">Platforms We Specialize In</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {platforms.map((platform) => (
                            <GlassCard key={platform.title} className="text-center p-6">
                                <div className="w-14 h-14 rounded-xl bg-emerald/10 flex items-center justify-center text-2xl mb-4 mx-auto">{platform.icon}</div>
                                <h3 className="font-display text-lg font-semibold mb-2">{platform.title}</h3>
                                <p className="text-sm text-slate-400">{platform.description}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-28 px-5 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-12">
                        Frequently Asked <span className="text-amber">Social Media Questions</span>
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
