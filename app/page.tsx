import GlobeCanvasLoader from "@/components/three/GlobeCanvasLoader";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import StatsSection from "@/components/sections/StatsSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CTASection from "@/components/sections/CTASection";
import PlatformOverview from "@/components/sections/PlatformOverview";
import MentServicesHome from "@/components/sections/agency/MentServicesHome";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const slug = headersList.get("x-agency-slug");

  if (slug === "mentservices") {
    return {
      title: "Ment Marketing & Creative Services | Graphic Design, Web Design, SEO & Content Creation",
      description:
        "Ment Marketing & Creative Services delivers innovative graphic design, web design, content creation, social media management, and SEO strategies. More than 250 clients trust Ment to grow their brands.",
      alternates: { canonical: "https://mentservices.vanguardm.com" },
      openGraph: {
        title: "Ment Marketing & Creative Services | Creative Solutions That Drive Results",
        description:
          "Innovative marketing solutions fueled by the next generation. Graphic design, web design, content creation, social media, and SEO & advertising services.",
        url: "https://mentservices.vanguardm.com",
        siteName: "Ment Marketing & Creative Services",
      },
      twitter: {
        card: "summary_large_image",
        title: "Ment Marketing & Creative Services",
        description:
          "Innovative graphic design, web design, content creation, social media, and SEO services. More than 250 clients trust Ment.",
      },
    };
  }

  return {
    title: "Vanguard Digital Marketing | Texas Digital Marketing Agency",
    description:
      "Full-service digital marketing agency in Texas. Web design, SEO, Google Ads, social media, and automation solutions for businesses ready to grow.",
    alternates: { canonical: "/" },
    openGraph: {
      title: "Vanguard Digital Marketing | Texas Digital Marketing Agency",
      description:
        "Web design, SEO, Google Ads, social media, and automation for Texas businesses. Results-driven digital marketing from Conroe to Houston and beyond.",
      url: "/",
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
      title: "Vanguard Digital Marketing | Texas Digital Marketing Agency",
      description:
        "Full-service digital marketing agency in Texas. Web design, SEO, Google Ads, social media, and automation.",
    },
  };
}

export default async function Home() {
  const headersList = await headers();
  const slug = headersList.get("x-agency-slug");

  if (slug === "mentservices") {
    return <MentServicesHome />;
  }

  return (
    <main className="space-y-12 md:space-y-20">
      <GlobeCanvasLoader />
      <Hero />
      <TrustBar />
      <StatsSection />
      <ServicesGrid />
      <PlatformOverview />
      <WhyChooseUs />
      <CTASection />
    </main>
  );
}
