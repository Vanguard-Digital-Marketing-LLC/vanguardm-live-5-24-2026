import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Academy — Free Digital Marketing Courses",
  description:
    "Master SEO, PPC, social media, and content marketing with free and premium courses from Vanguard Digital Marketing.",
  alternates: { canonical: "/academy" },
  openGraph: {
    title: "Vanguard Academy — Free Digital Marketing Courses",
    description:
      "Master SEO, PPC, social media, and content marketing with free and premium courses from Vanguard Digital Marketing.",
    url: "/academy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vanguard Academy — Digital Marketing Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanguard Academy — Free Digital Marketing Courses",
    description:
      "Master SEO, PPC, social media, and content marketing with free and premium courses.",
    images: ["/og-image.png"],
  },
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript({
            "@context": "https://schema.org",
            "@type": "Course",
            provider: {
              "@type": "Organization",
              name: "Vanguard Digital Marketing",
              url: SITE_URL,
            },
            name: "Vanguard Academy",
            description:
              "Comprehensive digital marketing courses covering SEO, PPC, social media, content marketing, branding, analytics, and growth strategies.",
            url: `${SITE_URL}/academy`,
            educationalLevel: ["Beginner", "Intermediate", "Advanced"],
            isAccessibleForFree: true,
          }),
        }}
      />
      {children}
    </>
  );
}
