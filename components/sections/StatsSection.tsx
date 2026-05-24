import GlassCard from "@/components/ui/GlassCard";

const stats = [
  { value: "148+", label: "Clients Served" },
  { value: "495+", label: "Projects Delivered" },
  { value: "97%", label: "Client Retention" },
  { value: "7+", label: "Years in Business" },
];

export default function StatsSection() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vanguard Digital Marketing",
    "url": "https://vanguardm.com",
    "logo": "https://vanguardm.com/og-image.png",
    "email": "hello@vanguardm.com",
    "telephone": "+1-936-358-6500",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "TX",
      "addressCountry": "US",
    },
    "sameAs": [],
  };

  return (
    <section className="py-16 md:py-28 px-5 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="text-center py-6 md:py-8">
            <div className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-emerald mb-1 md:mb-2">
              {stat.value}
            </div>
            <div className="text-xs font-display uppercase tracking-widest text-slate-400">
              {stat.label}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
