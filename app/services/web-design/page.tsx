import { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import GlassCard from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Web Design & Development Services",
  description: "Custom web design and development — responsive, conversion-optimized websites built with Next.js, WordPress, and modern frameworks.",
  keywords: ["web design services", "web development", "custom website", "responsive design", "Next.js", "WordPress", "conversion optimization"],
  alternates: { canonical: "/services/web-design" },
  openGraph: {
    title: "Web Design & Development | Vanguard Digital Marketing",
    description: "Custom web design and development — responsive, conversion-optimized websites built with modern frameworks.",
    url: "/services/web-design",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vanguard Digital Marketing Web Design" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design & Development | Vanguard Digital Marketing",
    description: "Custom web design and development — responsive, conversion-optimized websites built with modern frameworks.",
  },
};

const services = [
    {
        icon: "🎨",
        title: "Custom Website Design",
        description: "Fully bespoke designs, no templates, brand-aligned"
    },
    {
        icon: "📱",
        title: "Responsive Development",
        description: "Pixel-perfect across all devices and browsers"
    },
    {
        icon: "🔌",
        title: "WordPress Development",
        description: "Custom themes, plugin development, WooCommerce"
    },
    {
        icon: "🚀",
        title: "Next.js & React Applications",
        description: "Server-rendered, static exports, blazing fast"
    },
    {
        icon: "🛒",
        title: "E-Commerce Solutions",
        description: "Shopify, WooCommerce, custom cart solutions"
    },
    {
        icon: "📄",
        title: "Landing Page Design",
        description: "Campaign-specific pages optimized for conversion"
    },
    {
        icon: "🔧",
        title: "Website Redesigns",
        description: "Modernize your existing site without losing SEO equity"
    },
    {
        icon: "🛠️",
        title: "Ongoing Maintenance & Support",
        description: "Updates, security, performance monitoring"
    }
];

const faqs = [
    {
        question: "How long does a website project take?",
        answer: "A typical website project takes 6-8 weeks from discovery to launch. This can vary depending on the complexity of the project and the speed of feedback and content delivery."
    },
    {
        question: "How much does a custom website cost?",
        answer: "Our custom website projects start in the low five figures. The final cost depends on the scope, features, and complexity of the build. We provide a detailed, itemized quote after our initial discovery and strategy phase."
    },
    {
        question: "Do you build on WordPress or custom code?",
        answer: "Both! We choose the right tool for the job. We build custom WordPress themes for clients who need an easy-to-use CMS, and we build with modern frameworks like Next.js and React for high-performance applications."
    },
    {
        question: "Will my website be SEO-friendly?",
        answer: "Absolutely. Every website we build is designed with SEO as a top priority. We use clean code, semantic HTML, and a fast, mobile-first architecture to give you a strong foundation for ranking in search results."
    },
    {
        question: "Do you offer hosting?",
        answer: "While we are not a hosting company, we partner with top-tier providers like Vercel and can manage your hosting environment to ensure optimal performance, security, and scalability."
    },
    {
        question: "What about ongoing maintenance after launch?",
        answer: "We offer ongoing maintenance and support packages to keep your website updated, secure, and performing at its best. This includes software updates, security monitoring, performance checks, and content updates."
    }
];

export default function WebDesignPage() {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Web Design & Development",
        "description": "Custom website design and development built for performance, conversion, and SEO. Modern, responsive sites for businesses of all sizes.",
        "serviceType": "Web Design & Development",
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
              { "@type": "ListItem", "position": 3, "name": "Web Design & Development" }
            ]
          }) }}
        />
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">
            Web Design & Development
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Custom Websites Built to <span className="text-amber">Convert</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Fast, beautiful, conversion-focused websites. Mobile-first. SEO-ready from day one.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-8">
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer bg-amber text-slate-950 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25">
                Start Your Project
            </Link>
            <Link href="/portfolio" className="inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border border-emerald/30 text-emerald hover:bg-emerald/10 hover:border-emerald/50">
                See Our Work
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-28 px-5 md:px-6">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-12">Our Web Design & Development Services</h2>
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
                    Frequently Asked <span className="text-amber">Web Design Questions</span>
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
