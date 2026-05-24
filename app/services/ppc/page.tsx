import { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import GlassCard from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "PPC & Google Ads Management",
  description: "Expert PPC management and Google Ads services. Maximize ROI with precision-targeted campaigns and transparent reporting.",
  keywords: ["PPC management", "Google Ads agency", "pay per click", "PPC services", "Google Ads management", "remarketing", "paid search"],
  alternates: { canonical: "/services/ppc" },
  openGraph: {
    title: "PPC & Google Ads Management | Vanguard Digital Marketing",
    description: "Expert PPC management and Google Ads services. Maximize ROI with precision-targeted campaigns and transparent reporting.",
    url: "/services/ppc",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vanguard Digital Marketing PPC Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PPC & Google Ads Management | Vanguard Digital Marketing",
    description: "Expert PPC management and Google Ads services. Maximize ROI with precision-targeted campaigns.",
  },
};

const campaignTypes = [
    {
        icon: "🔍",
        title: "Google Search Ads",
        description: "Text ads on search results, keyword targeting"
    },
    {
        icon: "🖼️",
        title: "Google Display Ads",
        description: "Banner ads across 2M+ websites"
    },
    {
        icon: "🛒",
        title: "Google Shopping Ads",
        description: "Product listings with images, prices, reviews"
    },
    {
        icon: "▶️",
        title: "YouTube Video Ads",
        description: "Pre-roll, in-stream, discovery ads"
    },
    {
        icon: "🔄",
        title: "Remarketing/Retargeting",
        description: "Re-engage visitors who didn't convert"
    },
    {
        icon: "🛠️",
        title: "Local Service Ads",
        description: "Google Guaranteed badge, pay-per-lead"
    },
    {
        icon: "🅱️",
        title: "Microsoft/Bing Ads",
        description: "Additional search volume at lower CPC"
    },
    {
        icon: "📱",
        title: "Social Media Ads",
        description: "Facebook, Instagram, LinkedIn paid campaigns"
    }
];

const faqs = [
    {
        question: "How much should I budget for PPC?",
        answer: "Your PPC budget depends on your industry, goals, and competition. We recommend a minimum starting budget of $1,500/month for meaningful results, but we can provide a more specific recommendation after a free audit."
    },
    {
        question: "How quickly will I see results from PPC?",
        answer: "PPC can drive traffic and leads almost immediately after a campaign is launched. However, it typically takes 2-3 months to gather enough data to fully optimize campaigns for maximum ROI."
    },
    {
        question: "What's the difference between PPC and SEO?",
        answer: "PPC involves paying for ads to appear in search results, providing immediate visibility. SEO focuses on earning organic (free) traffic through content and technical optimization, which builds long-term authority."
    },
    {
        question: "Do I need a landing page for my ads?",
        answer: "Yes. Sending paid traffic to a dedicated, conversion-focused landing page almost always results in a higher conversion rate than sending it to your homepage. We can design and build these for you."
    },
    {
        question: "What is quality score and why does it matter?",
        answer: "Quality Score is Google's rating of the quality and relevance of your keywords and PPC ads. A higher Quality Score leads to lower prices and better ad positions."
    },
    {
        question: "Do you manage Facebook/Instagram ads too?",
        answer: "Yes, our PPC services include paid social campaigns on platforms like Facebook, Instagram, and LinkedIn. We can create an integrated strategy that covers both search and social advertising."
    }
];

export default function PPCPage() {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "PPC Management",
        "description": "Pay-per-click advertising management for Google Ads, Bing Ads, and social media platforms. Data-driven campaigns that maximize ROI.",
        "serviceType": "PPC Management",
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
                  { "@type": "ListItem", "position": 3, "name": "PPC & Google Ads" }
                ]
              }) }}
            />
            <section className="py-14 md:py-24 px-5 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">
                        PPC & Google Ads
                    </p>
                    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                        PPC Campaigns That <span className="text-amber">Maximize Every Dollar</span>
                    </h1>
                    <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                        Precision-targeted paid search and display campaigns. High-intent traffic. Measurable ROI. No wasted spend.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-8">
                        <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer bg-amber text-slate-950 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25">
                            Get a Free PPC Audit
                        </Link>
                        <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border border-emerald/30 text-emerald hover:bg-emerald/10 hover:border-emerald/50">
                            See Pricing
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-28 px-5 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-12">PPC Campaign Types We Manage</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {campaignTypes.map((campaign) => (
                            <GlassCard key={campaign.title} className="text-center p-6">
                                <div className="w-14 h-14 rounded-xl bg-emerald/10 flex items-center justify-center text-2xl mb-4 mx-auto">{campaign.icon}</div>
                                <h3 className="font-display text-lg font-semibold mb-2">{campaign.title}</h3>
                                <p className="text-sm text-slate-400">{campaign.description}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-28 px-5 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-12">
                        Frequently Asked <span className="text-amber">PPC Questions</span>
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
