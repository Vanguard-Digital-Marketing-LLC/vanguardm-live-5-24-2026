import type { Metadata } from "next";
import PortfolioGrid from "./PortfolioGrid";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Real websites we've built and launched for real businesses. Custom code, no templates — every site runs on our own infrastructure.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Our Work | Vanguard Digital Marketing",
    description: "Real websites we've built and launched for real businesses. Custom code, no templates.",
    url: "/portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vanguard Digital Marketing — Our Work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work | Vanguard Digital Marketing",
    description: "Real websites we've built and launched for real businesses. Custom code, no templates.",
  },
};

export default function PortfolioPage() {
  return (
    <main className="pt-24 space-y-10 md:space-y-16">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">Our Work</p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Our <span className="text-amber">Work</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Real websites we&apos;ve built and launched for real businesses. Every site runs on our own infrastructure — custom code, no templates.
          </p>
        </div>
      </section>

      <PortfolioGrid />
      <CTASection />
    </main>
  );
}
