const differentiators = [
  { num: "01", title: "Strategy First", desc: "Every engagement starts with deep research and a custom strategy." },
  { num: "02", title: "Full Transparency", desc: "Real-time reporting and open communication on every campaign." },
  { num: "03", title: "Scalable Systems", desc: "Marketing infrastructure designed to grow with your business." },
  { num: "04", title: "Real Results", desc: "Performance-driven approach with measurable ROI on every dollar." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-28 px-5 md:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">Why Choose Us</p>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
          Your Growth Is Our <span className="text-amber">Mission</span>
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-4 md:mb-6 max-w-2xl mx-auto">
          We&apos;re not just another agency. Vanguard Digital Marketing is a results-driven
          partner built to help Texas businesses scale with confidence, clarity, and measurable impact.
        </p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-slate-300 mb-10 md:mb-14">
          <li>✓ No long-term contracts</li>
          <li>✓ Dedicated account managers</li>
          <li>✓ Transparent reporting</li>
          <li>✓ White-glove service</li>
        </ul>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {differentiators.map((d) => (
            <div key={d.num} className="glass rounded-xl p-5 md:p-6 text-center hover:border-emerald/20 transition-colors">
              <span className="font-display text-2xl md:text-3xl font-bold text-amber/30 block mb-2">{d.num}</span>
              <h3 className="font-display text-sm md:text-base font-semibold mb-1.5">{d.title}</h3>
              <p className="text-xs md:text-sm text-slate-400">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
