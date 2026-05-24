import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";

const features = [
  {
    icon: "🎓",
    title: "Marketing Academy",
    desc: "Access expert-led courses on SEO, PPC, and content strategy. Earn certificates to validate your skills.",
    href: "/academy",
    cta: "Browse Courses",
  },
  {
    icon: "📊",
    title: "Client Portal",
    desc: "Active clients get a dedicated portal to view reports, track projects, manage tickets, and communicate with our team.",
    href: "/auth/sign-in",
    cta: "Client Login",
  },
  {
    icon: "🤖",
    title: "AI-Powered Insights",
    desc: "Our platform uses AI to score leads, generate reports, and power an intelligent chatbot that helps you get answers fast.",
    href: "/contact",
    cta: "Learn More",
  },
];

export default function PlatformOverview() {
  return (
    <section className="py-16 md:py-28 px-5 md:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">
          Our Platform
        </p>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
          Sign In to <span className="text-amber">Unlock More</span>
        </h2>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mb-3 md:mb-4">
          Create a free account or sign in with Google to access our marketing
          academy, client portal, and AI-powered tools.
        </p>
        <p className="text-xs text-slate-500 mb-8 md:mb-12">
          By signing in, you agree to our{" "}
          <Link href="/privacy-policy" className="text-emerald hover:text-emerald-400 underline">Privacy Policy</Link>
          {" "}and{" "}
          <Link href="/terms" className="text-emerald hover:text-emerald-400 underline">Terms of Service</Link>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((f) => (
            <GlassCard key={f.title} className="text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-emerald/10 flex items-center justify-center text-xl md:text-2xl mb-3 md:mb-4 mx-auto">
                {f.icon}
              </div>
              <h3 className="font-display text-base md:text-lg font-semibold mb-1.5 md:mb-2">
                {f.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-4">
                {f.desc}
              </p>
              <Link
                href={f.href}
                className="text-xs font-display font-semibold uppercase tracking-wider text-emerald hover:text-emerald-400 transition-colors"
              >
                {f.cta} &rarr;
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
