import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 px-5 md:px-6">
      <div className="max-w-3xl mx-auto text-center section-bg rounded-3xl py-12 md:py-16 px-6 md:px-10">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
          Ready to Grow <span className="text-amber">Your Business</span>?
        </h2>
        <p className="text-sm md:text-base text-slate-400 mb-6 md:mb-8 max-w-xl mx-auto">
          Let&apos;s build a digital marketing strategy that drives real results. Get
          in touch with our team and discover what Vanguard can do for you.
        </p>
        <Button href="/contact" dataTrack="cta_click" dataTrackCategory="conversion">Get Your Free Consultation</Button>
      </div>
    </section>
  );
}
