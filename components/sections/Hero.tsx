import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-12 px-5 md:pt-24 md:pb-16 md:px-6">
      <div className="max-w-7xl mx-auto w-full text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-emerald/20 bg-emerald/5 mb-4 md:mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-emerald">
              Texas-Based Digital Marketing
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] mb-4 md:mb-6" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            We Build Brands That{" "}
            <span className="text-amber">Dominate Digital</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6 md:mb-8 max-w-xl mx-auto" style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>
            From strategy to execution, Vanguard Digital Marketing delivers
            full-service solutions that drive real growth. Based in Texas,
            trusted nationwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Button href="/contact">Get Your Free Consultation</Button>
            <Button href="/services" variant="outline">Our Services</Button>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            <Link href="/privacy-policy" className="underline hover:text-slate-300">Privacy Policy</Link>
            {" · "}
            <Link href="/terms" className="underline hover:text-slate-300">Terms of Service</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
