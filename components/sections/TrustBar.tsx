const clients = [
  "Lone Star Auto",
  "Hill Country Homes",
  "Gulf Coast Medical",
  "Summit Properties",
  "Texan Energy",
  "Frontier Legal",
];

export default function TrustBar() {
  return (
    <section className="py-12 md:py-16 px-5 md:px-6">
      <div className="max-w-7xl mx-auto section-bg rounded-2xl py-6 md:py-8 px-4">
        <p className="text-center text-xs font-display font-semibold uppercase tracking-widest text-slate-400 mb-4 md:mb-6">
          Trusted by businesses across Texas
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center items-center gap-4 md:gap-12">
          {clients.map((name) => (
            <span key={name} className="text-center font-display text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-wider">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
