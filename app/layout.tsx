import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import { Chakra_Petch, Outfit, Poppins } from "next/font/google";
import Script from "next/script";
import { getAgencyTheme, buildThemeCSS } from "@/lib/agency-themes";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import PageTransition from "@/components/ui/PageTransition";
import RocketChaserLoader from "@/components/ui/RocketChaserLoader";
import ChatBotAILoader from "@/components/ui/ChatBotAILoader";
import LeadCaptureLoader from "@/components/ui/LeadCaptureLoader";
import SessionProvider from "@/components/providers/SessionProvider";
import { headers } from "next/headers";
import "./globals.css";

export const dynamic = "force-dynamic";

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra-petch",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const slug = headersList.get("x-agency-slug");

  if (slug === "mentservices") {
    return {
      metadataBase: new URL("https://mentservices.vanguardm.com"),
      title: {
        default: "Ment Marketing & Creative Services",
        template: "%s | Ment Marketing & Creative Services",
      },
      description:
        "Ment Marketing & Creative Services delivers innovative graphic design, web design, content creation, social media management, and SEO strategies.",
      keywords: [
        "marketing agency",
        "graphic design",
        "web design",
        "content creation",
        "social media",
        "SEO",
        "advertising",
        "Ment Marketing",
      ],
      authors: [{ name: "Ment Marketing & Creative Services" }],
      openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://mentservices.vanguardm.com",
        siteName: "Ment Marketing & Creative Services",
        title: "Ment Marketing & Creative Services",
        description:
          "Innovative marketing solutions fueled by the next generation. Graphic design, web design, content creation, social media, and SEO services.",
      },
      twitter: {
        card: "summary_large_image",
        title: "Ment Marketing & Creative Services",
        description:
          "Innovative graphic design, web design, content creation, social media, and SEO services.",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Vanguard Digital Marketing",
      template: "%s | Vanguard Digital Marketing",
    },
    description:
      "Vanguard Digital Marketing is a full-service digital marketing agency based in Texas. We build brands that dominate digital with SEO, PPC, web design, social media, and more.",
    keywords: [
      "digital marketing",
      "SEO",
      "web design",
      "PPC",
      "social media marketing",
      "Texas",
      "marketing agency",
    ],
    authors: [{ name: "Vanguard Digital Marketing" }],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      siteName: "Vanguard Digital Marketing",
      title: "Vanguard Digital Marketing | Texas Digital Marketing Agency",
      description:
        "We build brands that dominate digital. Full-service digital marketing agency based in Texas, serving businesses nationwide.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Vanguard Digital Marketing",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Vanguard Digital Marketing",
      description:
        "Full-service digital marketing agency based in Texas. SEO, web design, PPC, social media, and more.",
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const slug = headersList.get("x-agency-slug");
  const isSubdomain = !!slug;
  const isMentServices = slug === "mentservices";

  // GTM container ID per agency
  const gtmId = isMentServices ? "GTM-K6CXPNL4" : "GTM-N4SJ38HT";

  // Agency theme CSS variable injection
  const theme = getAgencyTheme(slug);
  const themeCSS = theme ? buildThemeCSS(theme) : null;
  const fontClasses = `${chakraPetch.variable} ${outfit.variable}${isMentServices ? ` ${poppins.variable}` : ""}`;

  return (
    <html lang="en" className={fontClasses} data-theme={theme?.mode || "dark"}>
      <head>
        {/* Agency theme CSS variable overrides */}
        {themeCSS && (
          <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
        )}
        {/* Auto-reload on stale chunk errors after deployments */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var reloaded = sessionStorage.getItem('chunk_reload');
  window.addEventListener('error', function(e) {
    if (
      e.message &&
      (e.message.indexOf('ChunkLoadError') !== -1 ||
       e.message.indexOf('Loading chunk') !== -1 ||
       e.message.indexOf('Failed to fetch dynamically imported module') !== -1 ||
       (e.message.indexOf('MIME type') !== -1 && e.message.indexOf('text/plain') !== -1))
    ) {
      if (!reloaded) {
        sessionStorage.setItem('chunk_reload', '1');
        window.location.reload();
      }
    }
  });
  if (reloaded) sessionStorage.removeItem('chunk_reload');
})();
`,
          }}
        />
        {/* Structured data - agency-specific */}
        {isMentServices ? (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "ProfessionalService",
                  "@id": "https://mentservices.vanguardm.com",
                  name: "Ment Marketing & Creative Services",
                  description:
                    "Innovative marketing solutions including graphic design, web design, content creation, social media, and SEO & advertising services.",
                  url: "https://mentservices.vanguardm.com",
                  sameAs: ["https://mentservices.com"],
                }),
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  name: "Ment Marketing & Creative Services",
                  url: "https://mentservices.vanguardm.com",
                  publisher: {
                    "@type": "ProfessionalService",
                    name: "Ment Marketing & Creative Services",
                    "@id": "https://mentservices.vanguardm.com",
                  },
                }),
              }}
            />
          </>
        ) : !isSubdomain ? (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "ProfessionalService",
                  "@id": SITE_URL,
                  name: "Vanguard Digital Marketing",
                  description:
                    "Full-service digital marketing agency based in Texas. SEO, PPC, web design, social media, branding, and content marketing.",
                  url: SITE_URL,
                  telephone: "+1-936-358-6500",
                  email: "hello@vanguardm.com",
                  image: `${SITE_URL}/og-image.png`,
                  logo: `${SITE_URL}/og-image.png`,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Conroe",
                    addressRegion: "TX",
                    postalCode: "77302",
                    addressCountry: "US",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 30.3119,
                    longitude: -95.4561,
                  },
                  areaServed: [
                    { "@type": "State", name: "Texas" },
                    { "@type": "Country", name: "US" },
                  ],
                  priceRange: "$$",
                  sameAs: [
                    "https://www.facebook.com/vanguarddigitalmarketing",
                  ],
                }),
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  name: "Vanguard Digital Marketing",
                  url: SITE_URL,
                  publisher: {
                    "@type": "ProfessionalService",
                    name: "Vanguard Digital Marketing",
                    "@id": SITE_URL,
                  },
                }),
              }}
            />
          </>
        ) : null}
      </head>
      <body className="font-body antialiased overflow-x-hidden">
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-emerald focus:text-slate-950 focus:px-4 focus:py-2 focus:rounded-lg focus:font-display focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <SessionProvider>
          {!isSubdomain && <RocketChaserLoader />}
          {!isSubdomain && <ChatBotAILoader />}
          {!isSubdomain && <LeadCaptureLoader />}
          <div className="relative z-10">
            {!isSubdomain && <Header />}
            <PageTransition>{children}</PageTransition>
            {!isSubdomain && <Footer />}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
