import { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import GlassCard from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Austin, TX",
  description: "Austin's trusted digital marketing agency. SEO, web design, PPC, and social media for Austin businesses. Free consultation.",
  keywords: ["digital marketing Austin", "Austin SEO", "Austin web design", "marketing agency Austin TX", "PPC Austin", "social media marketing Austin"],
  alternates: { canonical: "/locations/austin" },
  openGraph: {
    title: "Digital Marketing Agency in Austin, TX | Vanguard",
    description: "Austin's trusted digital marketing agency. SEO, web design, PPC, and social media for Austin businesses.",
    url: "/locations/austin",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vanguard Digital Marketing Austin TX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Agency in Austin, TX | Vanguard",
    description: "Austin's trusted digital marketing agency. SEO, web design, PPC, and social media for Austin businesses.",
  },
};

const services = [
    {
        icon: "🔍",
        title: "SEO & Search Marketing",
        href: "/services/seo"
    },
    {
        icon: "🖥️",
        title: "Web Design & Development",
        href: "/services/web-design"
    },
    {
        icon: "📈",
        title: "PPC & Google Ads",
        href: "/services/ppc"
    },
    {
        icon: "📱",
        title: "Social Media Marketing",
        href: "/services/social-media"
    },
    {
        icon: "🎨",
        title: "Branding & Identity",
        href: "/services/branding"
    },
    {
        icon: "✍️",
        title: "Content Marketing",
        href: "/services/content-marketing"
    }
];

const faqs = [
    {
        question: "Do you work with Austin startups?",
        answer: "Yes, absolutely. We have specific packages and strategies tailored to the fast-paced, competitive environment that Austin startups face. We understand the need for rapid growth and lean, effective marketing."
    },
    {
        question: "What areas around Austin do you serve?",
        answer: "We serve the entire Austin metro area, including Round Rock, Cedar Park, Georgetown, Pflugerville, and Leander. We have clients from the Domain to South Congress."
    },
    {
        question: "Can I meet with your team in person in Austin?",
        answer: "While our main office is not in Austin, we frequently travel to meet with our Austin-based clients for strategy sessions and project kick-offs. We are available for in-person meetings by appointment."
    },
    {
        question: "How do I rank higher on Google Maps in Austin?",
        answer: "Ranking high on Google Maps in a competitive market like Austin requires a fully optimized Google Business Profile, a consistent NAP (Name, Address, Phone) across all directories, a steady stream of positive reviews, and locally-relevant content on your website."
    }
];

export default function AustinPage() {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Vanguard Digital Marketing - Austin",
        "telephone": "+1-936-358-6500",
        "email": "hello@vanguardm.com",
        "image": `${SITE_URL}/og-image.png`,
        "logo": `${SITE_URL}/og-image.png`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Austin",
            "addressRegion": "TX",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 30.2672,
            "longitude": -97.7431
        },
        "url": `${SITE_URL}/locations/austin`,
        "priceRange": "$$",
        "parentOrganization": {
            "@type": "Organization",
            "name": "Vanguard Digital Marketing",
            "url": SITE_URL
        }
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Digital Marketing Services in Austin",
        "description": "Full-service digital marketing for Austin businesses. SEO, PPC, web design, social media, and branding.",
        "serviceType": "Digital Marketing",
        "provider": {
            "@type": "ProfessionalService",
            "name": "Vanguard Digital Marketing",
            "telephone": "+1-936-358-6500",
            "url": SITE_URL
        },
        "areaServed": {
            "@type": "City",
            "name": "Austin"
        }
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
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
                  { "@type": "ListItem", "position": 2, "name": "Locations", "item": `${SITE_URL}/locations` },
                  { "@type": "ListItem", "position": 3, "name": "Austin, TX" }
                ]
              }) }}
            />
            <section className="py-14 md:py-24 px-5 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">
                        Austin, Texas
                    </p>
                    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                        Austin <span className="text-amber">Digital Marketing Agency</span>
                    </h1>
                    <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                        Vanguard Digital Marketing helps Austin businesses grow with data-driven SEO, custom web design, PPC campaigns, and social media strategies. Local expertise, nationwide results.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-8">
                        <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer bg-amber text-slate-950 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25">
                            Get a Free Consultation
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-28 px-5 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-12">Our Austin Marketing Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {services.map((service) => (
                            <GlassCard key={service.title} className="text-center p-6">
                                <div className="w-14 h-14 rounded-xl bg-emerald/10 flex items-center justify-center text-2xl mb-4 mx-auto">{service.icon}</div>
                                <h3 className="font-display text-lg font-semibold mb-2">{service.title}</h3>
                                <Link href={service.href} className="inline-flex items-center gap-1 font-display text-xs font-semibold uppercase tracking-widest text-emerald hover:text-emerald-400 transition-colors">
                                    Learn More →
                                </Link>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-28 px-5 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-12">
                        Frequently Asked <span className="text-amber">Austin Questions</span>
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
