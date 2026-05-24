import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Vanguard Digital Marketing. Request a free consultation for SEO, web design, PPC, and more.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Vanguard Digital Marketing",
    description: "Request a free consultation. Call (936) 358-6500 or fill out our contact form.",
    url: "/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact Vanguard Digital Marketing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Vanguard Digital Marketing",
    description: "Request a free consultation. Call (936) 358-6500 or fill out our contact form.",
  },
};

export default function ContactPage() {
  return (
    <main className="pt-24 space-y-10 md:space-y-16">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">Get In Touch</p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Let&apos;s Build Something <span className="text-amber">Great</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Ready to elevate your digital presence? Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-28 px-5 md:px-6">
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </section>

      <section className="pb-16 md:pb-24 px-5 md:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 text-center">
          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="text-2xl mb-3">📞</div>
            <h3 className="font-display font-semibold mb-1">Phone</h3>
            <a href="tel:+19363586500" className="text-sm text-emerald hover:text-emerald-400 font-semibold transition-colors">(936) 358-6500</a>
          </div>
          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="text-2xl mb-3">📧</div>
            <h3 className="font-display font-semibold mb-1">Email</h3>
            <a href="mailto:hello@vanguardm.com" className="text-sm text-slate-400 hover:text-emerald transition-colors">hello@vanguardm.com</a>
          </div>
          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="text-2xl mb-3">📍</div>
            <h3 className="font-display font-semibold mb-1">Location</h3>
            <p className="text-sm text-slate-400">Texas, United States</p>
          </div>
          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="text-2xl mb-3">🕐</div>
            <h3 className="font-display font-semibold mb-1">Hours</h3>
            <p className="text-sm text-slate-400">Mon-Fri 9AM - 6PM CST</p>
          </div>
        </div>
      </section>
    </main>
  );
}
