import Link from "next/link";
import VanguardLogo from "./VanguardLogo";
import SocialIcons from "./SocialIcons";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const footerSections: { title: string; links: FooterLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Our Work", href: "/portfolio" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Austin", href: "/locations/austin" },
      { label: "Dallas", href: "/locations/dallas" },
      { label: "Houston", href: "/locations/houston" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "SEO", href: "/services/seo" },
      { label: "Web Design", href: "/services/web-design" },
      { label: "PPC Ads", href: "/services/ppc" },
      { label: "Social Media", href: "/services/social-media" },
      { label: "Branding", href: "/services/branding" },
      { label: "Content Marketing", href: "/services/content-marketing" },
    ],
  },
  {
    title: "Academy",
    links: [
      { label: "SEO Fundamentals", href: "/academy/seo-fundamentals" },
      { label: "Technical SEO", href: "/academy/technical-seo" },
      { label: "Frontend SEO", href: "/academy/frontend-seo" },
      { label: "Local SEO", href: "/academy/local-seo" },
      { label: "All Courses", href: "/academy" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "(936) 358-6500", href: "tel:+19363586500" },
      { label: "hello@vanguardm.com", href: "mailto:hello@vanguardm.com" },
      { label: "Get a Consultation", href: "/contact" },
      { label: "Google Business", href: "https://g.page/r/Ce_PZMTx96p9EAI/review", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto px-5 md:px-6 py-10 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8 text-center">
        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
          <VanguardLogo size={32} />
          <p className="mt-3 text-xs md:text-sm text-slate-400 leading-relaxed md:text-left text-center">
            Full-service digital marketing agency based in Texas, serving
            businesses nationwide.
          </p>
          <SocialIcons size={22} className="mt-4" />
        </div>

        {footerSections.map((section) => (
          <div key={section.title} className="text-center">
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-white mb-3 md:mb-4">
              {section.title}
            </h4>
            <ul className="space-y-2 md:space-y-2.5">
              {section.links.map((link) => {
                const trackProps = link.href.startsWith("tel:")
                  ? { "data-track": "phone_call", "data-track-category": "contact" }
                  : link.href.startsWith("mailto:")
                    ? { "data-track": "email_click", "data-track-category": "contact" }
                    : link.external
                      ? { "data-track": "google_business_click", "data-track-category": "contact" }
                      : {};
                return (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-sm text-slate-400 hover:text-emerald transition-colors"
                      {...trackProps}
                    >
                      {link.label}
                    </a>
                  ) : link.href.startsWith("tel:") || link.href.startsWith("mailto:") ? (
                    <a
                      href={link.href}
                      className="text-xs md:text-sm text-slate-400 hover:text-emerald transition-colors"
                      {...trackProps}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-xs md:text-sm text-slate-400 hover:text-emerald transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 py-4 md:py-6 px-5 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Vanguard Digital Marketing LLC. All
          rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-emerald transition-colors underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-slate-400 hover:text-emerald transition-colors underline">
            Terms of Service
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 py-3 px-5 md:px-6 text-center max-w-7xl mx-auto">
        <p className="text-[10px] text-slate-600">
          Apps &amp; Sites Hosted by{" "}
          <a href="http://vps66822.nodevm.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">Vanguard Digital</a>
          {" | "}Sites Designed by{" "}
          <a href="http://mentservices.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">Mentservices</a>
        </p>
      </div>
    </footer>
  );
}
