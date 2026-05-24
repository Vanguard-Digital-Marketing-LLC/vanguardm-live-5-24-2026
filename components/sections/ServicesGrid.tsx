import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";

const services = [
  { icon: "🔍", title: "SEO & Search Marketing", slug: "seo", desc: "Dominate search results with data-driven SEO strategies." },
  { icon: "🖥️", title: "Web Design & Development", slug: "web-design", desc: "Custom websites built for speed, conversions, and impact." },
  { icon: "📱", title: "Social Media Marketing", slug: "social-media", desc: "Build your brand presence across every platform." },
  { icon: "📈", title: "PPC & Google Ads", slug: "ppc", desc: "Maximize your ad spend with precision-targeted campaigns." },
  { icon: "🎨", title: "Branding & Identity", slug: "branding", desc: "We develop visual identities and brand strategies that stick." },
  { icon: "✍️", title: "Content Marketing", slug: "content-marketing", desc: "Content that educates, engages, and converts your audience." },
];

export default function ServicesGrid() {
  return (
    <section className="py-16 md:py-28 px-5 md:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">What We Do</p>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
          Full-Service Digital <span className="text-amber">Marketing Solutions</span>
        </h2>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mb-8 md:mb-12">
          We combine strategy, creativity, and technology to deliver marketing that moves the needle for your business.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((svc) => (
            <GlassCard key={svc.title} className="group cursor-pointer text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-emerald/10 flex items-center justify-center text-xl md:text-2xl mb-3 md:mb-4 mx-auto group-hover:bg-emerald/20 transition-colors">
                {svc.icon}
              </div>
              <h3 className="font-display text-base md:text-lg font-semibold mb-1.5 md:mb-2">{svc.title}</h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-3 md:mb-4">{svc.desc}</p>
              <Link href={`/services/${svc.slug}`} className="inline-flex items-center gap-1 font-display text-xs font-semibold uppercase tracking-widest text-emerald hover:text-emerald-400 transition-colors">
                Learn More →
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
