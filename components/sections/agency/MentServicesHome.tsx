"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

/* ── Data ── */

const services = [
  {
    icon: (
      <svg className="w-10 h-10 text-[#149A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    title: "Graphic Design",
    desc: "Complete branding packages including logos, signage, posters, brochures, menus, and print collateral that bring your brand to life.",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-[#149A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
      </svg>
    ),
    title: "Web Design",
    badge: "CLIENT FAVORITE",
    desc: "Stunning, responsive websites designed to convert visitors into customers — with full client ownership of every asset we create.",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-[#149A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    ),
    title: "Content Creation",
    desc: "Compelling website copy, newsletters, blog posts, and branded content that tells your story, builds trust, and engages your audience.",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-[#149A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
    title: "SEO & Advertising",
    desc: "Search engine optimization and online advertising strategies that boost your visibility, drive qualified traffic, and grow revenue.",
  },
];

const portalFeatures = [
  {
    icon: (
      <svg className="w-7 h-7 text-[#149A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "Project Tracking",
    desc: "Monitor your project status, deadlines, and deliverables in real time from one dashboard.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#149A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Approval Workflow",
    desc: "Review and approve designs, content, and campaigns directly from your portal — no email chains.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#149A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: "SEO Reports & Analytics",
    desc: "Track keyword rankings, organic traffic growth, and campaign ROI with monthly performance reports.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#149A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
    title: "Direct Communication",
    desc: "Message the Ment team, submit support tickets, and get fast responses — all in one place.",
  },
];

const seoServices = [
  {
    icon: (
      <svg className="w-7 h-7 text-[#149A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
      </svg>
    ),
    title: "Keyword Strategy",
    desc: "In-depth keyword research to target the search terms your ideal customers are actually using.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#149A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    title: "Monthly Reporting",
    desc: "Clear, actionable monthly reports tracking rankings, traffic, conversions, and ROI — accessible in your portal.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#149A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
      </svg>
    ),
    title: "Competitive Analysis",
    desc: "Understand where your competitors rank and uncover gaps you can exploit to gain market share.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#149A9A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: "Local SEO",
    desc: "Dominate local search results with Google Business optimization, local citations, and geo-targeted content.",
  },
];

const testimonials = [
  {
    quote:
      "Amelia created a WordPress website for us quickly and professionally. We now have a fresh and modern website that we are very proud of.",
    name: "Courtney",
    company: "Innovative Poultry Solutions",
    stars: 5,
  },
  {
    quote:
      "Amelia and her team did a great job redoing an existing marketing ad to make it look much more professional and modern. I love the outcome.",
    name: "Jana",
    company: "Aggieland Travel Guru",
    stars: 5,
  },
  {
    quote:
      "Truly enjoyed working with Amelia and her Aggie team! Their customer service, turnaround time and deliverables exceeded our expectations.",
    name: "Leanne",
    company: "Texas A&M Hotel & Conference Center",
    stars: 5,
  },
  {
    quote:
      "You and your MENT team have done such an amazing job creating my website, designing social media templates, and guiding me through the process.",
    name: "Adiaha",
    company: "Adoption and Beyond / DBP Doc",
    stars: 5,
  },
];

const teamMembers = [
  { name: "Amelia McCracken", role: "CEO & Founder" },
  { name: "Lisa Solvason", role: "Sr. Project Manager" },
  { name: "Alyssa Duany", role: "Project Coordinator" },
  { name: "Cameron Harbridge", role: "Graphic Designer" },
  { name: "John Doyle", role: "Copywriter" },
  { name: "Nicole Davis", role: "Digital Marketing" },
];

/* ── Stars helper ── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-[#ffb606]">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Ment diamond logo (SVG) ── */
function MentDiamond({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="8" width="32" height="32" rx="2" transform="rotate(45 24 24)" stroke="#149A9A" strokeWidth="2" fill="none" />
      <circle cx="24" cy="18" r="3" fill="#149A9A" />
      <circle cx="18" cy="26" r="2" fill="#149A9A" />
      <circle cx="30" cy="26" r="2" fill="#149A9A" />
      <circle cx="24" cy="32" r="2" fill="#149A9A" />
      <line x1="24" y1="21" x2="18" y2="26" stroke="#149A9A" strokeWidth="1.5" />
      <line x1="24" y1="21" x2="30" y2="26" stroke="#149A9A" strokeWidth="1.5" />
      <line x1="18" y1="26" x2="24" y2="32" stroke="#149A9A" strokeWidth="1.5" />
      <line x1="30" y1="26" x2="24" y2="32" stroke="#149A9A" strokeWidth="1.5" />
    </svg>
  );
}

/* ── Component ── */

export default function MentServicesHome() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      {/* ─── 1. Sticky Nav ─── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0c2b2b] shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1290px] mx-auto flex items-center justify-between px-5 md:px-8 h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/mentservices.png"
              alt="Ment Marketing & Creative Services"
              width={160}
              height={40}
              className="h-9 w-auto object-contain brightness-0 invert"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {[
              { label: "Services", href: "#services" },
              { label: "About", href: "#about" },
              { label: "Portfolio", href: "#portfolio" },
              { label: "Client Portal", href: "#portal" },
              { label: "Contact", href: "/contact" },
            ].map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-white/80 hover:text-[#ffb606] transition-colors uppercase tracking-wide"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-white/80 hover:text-[#ffb606] transition-colors uppercase tracking-wide"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/auth/sign-in"
              className="inline-block bg-[#ffb606] text-[#0c2b2b] text-sm font-bold px-5 py-2 hover:bg-white transition-colors uppercase tracking-wide"
            >
              Client Login
            </Link>
          </div>
          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0c2b2b] border-t border-white/10 px-5 py-4 flex flex-col gap-3">
            <a href="#services" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-white/80 hover:text-[#ffb606] uppercase">Services</a>
            <a href="#about" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-white/80 hover:text-[#ffb606] uppercase">About</a>
            <a href="#portfolio" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-white/80 hover:text-[#ffb606] uppercase">Portfolio</a>
            <a href="#portal" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-white/80 hover:text-[#ffb606] uppercase">Client Portal</a>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-white/80 hover:text-[#ffb606] uppercase">Contact</Link>
            <Link
              href="/auth/sign-in"
              className="inline-block bg-[#ffb606] text-[#0c2b2b] text-sm font-bold px-5 py-2.5 text-center hover:bg-white transition-colors uppercase"
            >
              Client Login
            </Link>
          </div>
        )}
      </nav>

      {/* ─── 2. Hero (Dark, matching mentservices.com) ─── */}
      <section className="relative bg-[#0c2b2b] overflow-hidden">
        {/* Background gradient overlay simulating their dark hero with tech imagery */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c2b2b] via-[#0f3d3d] to-[#0c2b2b]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(20,154,154,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(20,154,154,0.2) 0%, transparent 50%)",
          }} />
        </div>

        <div className="relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 px-5 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Ment diamond icon */}
            <div className="flex justify-center mb-6">
              <MentDiamond className="w-14 h-14 md:w-16 md:h-16" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-4 uppercase tracking-wide">
              Grow Your Brand with Fresh Creativity{" "}
              <span className="block text-lg sm:text-xl md:text-2xl font-semibold text-[#ffb606] mt-3 uppercase tracking-widest">
                Fueled by the Next Generation
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto">
              Innovative marketing solutions with a mentorship-first approach.
              Access your client portal to track projects, review SEO performance, and approve deliverables.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#services"
                className="inline-block border-2 border-white/40 text-white text-sm font-bold px-8 py-3 hover:bg-white/10 transition-colors text-center uppercase tracking-wider"
              >
                Services
              </a>
              <Link
                href="/contact"
                className="inline-block bg-[#ffb606] text-[#0c2b2b] text-sm font-bold px-8 py-3 hover:bg-white transition-colors text-center uppercase tracking-wider"
              >
                Schedule a Consultation
              </Link>
              <a
                href="#portal"
                className="inline-block border-2 border-white/40 text-white text-sm font-bold px-8 py-3 hover:bg-white/10 transition-colors text-center uppercase tracking-wider"
              >
                Client Portal
              </a>
            </div>
          </div>
        </div>

        {/* Secondary nav bar at bottom of hero (matching their HOME / ABOUT US / SERVICES etc bar) */}
        <div className="relative z-10 border-t border-white/10 bg-[#149A9A]/90 backdrop-blur-sm">
          <div className="max-w-[1290px] mx-auto flex items-center justify-center gap-0 overflow-x-auto">
            {["Home", "About Us", "Services", "Pricing", "Portfolio", "Contact Us"].map((item) => (
              <a
                key={item}
                href={item === "Home" ? "#" : item === "About Us" ? "#about" : item === "Services" ? "#services" : item === "Pricing" ? "#portal" : item === "Portfolio" ? "#portfolio" : "/contact"}
                className="px-4 md:px-6 py-3 text-xs md:text-sm font-semibold text-white/90 hover:text-[#ffb606] hover:bg-white/10 transition-colors uppercase tracking-wider whitespace-nowrap"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Trust Strip ─── */}
      <section className="bg-white py-8 md:py-10 px-5 md:px-8 border-b border-gray-100">
        <div className="max-w-[1290px] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">More than 250 clients trust</p>
            <p className="text-lg font-bold text-[#149A9A]">
              <span className="text-[#730071]">Ment</span> Marketing
            </p>
          </div>
          <div className="flex items-center gap-8 md:gap-12">
            {[
              { value: "250+", label: "Clients" },
              { value: "500+", label: "Projects" },
              { value: "5+", label: "Services" },
              { value: "100%", label: "Mentor-Led" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl md:text-2xl font-extrabold text-[#149A9A]">{stat.value}</div>
                <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Services ─── */}
      <section id="services" className="bg-white py-20 md:py-28 px-5 md:px-8">
        <div className="max-w-[1290px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              Our <span className="text-[#149A9A]">Services</span>
            </h2>
            <div className="w-16 h-1 bg-[#ffb606] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="border border-gray-200 p-8 md:p-10 text-center hover:shadow-lg transition-shadow group relative"
              >
                {"badge" in svc && svc.badge && (
                  <span className="absolute top-4 right-4 bg-[#ffb606] text-[#0c2b2b] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                    {svc.badge}
                  </span>
                )}
                <div className="w-16 h-16 border-2 border-[#149A9A] flex items-center justify-center mb-5 mx-auto group-hover:bg-[#149A9A]/10 transition-colors">
                  {svc.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {svc.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 max-w-sm mx-auto">
                  {svc.desc}
                </p>
                <a
                  href="#portal"
                  className="inline-block bg-[#149A9A] text-white text-xs font-bold px-5 py-2 hover:bg-[#0f7a7a] transition-colors uppercase tracking-wider"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Why the name Ment? (Dark teal banner) ─── */}
      <section id="about" className="bg-[#0c2b2b] py-20 md:py-28 px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Why the name <span className="text-[#ffb606]">Ment</span> ?
          </h2>
          <div className="w-16 h-1 bg-[#ffb606] mx-auto mb-8" />
          <p className="text-base md:text-lg text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            At <span className="text-[#ffb606] font-semibold">Ment</span>,
            &ldquo;Ment&rdquo; stands for the mentor/mentee relationships that
            form the foundation of our company. We believe in nurturing talent
            directly through ongoing guidance, fostering both personal and
            professional growth.
          </p>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-10">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-[#ffb606]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                ),
                title: "Innovative Solutions",
                desc: "We use the latest tools and trends to ensure your project stands out from the competition.",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-[#ffb606]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                ),
                title: "Hands-On Mentorship",
                desc: "Each project benefits from direct oversight by seasoned professionals, combining creativity with experienced precision.",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-[#ffb606]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                ),
                title: "Real-World Results",
                desc: "We deliver measurable outcomes backed by strategic insights and analytics-driven performance.",
              },
            ].map((d) => (
              <div
                key={d.title}
                className="text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  {d.icon}
                  <h3 className="text-base font-bold text-white">{d.title}</h3>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="inline-block bg-[#ffb606] text-[#0c2b2b] text-sm font-bold px-8 py-3 hover:bg-white transition-colors uppercase tracking-wider"
          >
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* ─── 6. Our Projects (Portfolio) ─── */}
      <section id="portfolio" className="bg-white py-20 md:py-28 px-5 md:px-8">
        <div className="max-w-[1290px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Our <span className="text-[#149A9A]">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-[#ffb606] mx-auto mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-8">
            {[
              { title: "Brand Identity & Print", desc: "Logo design, business cards, and marketing materials for local businesses." },
              { title: "Website Design & Development", desc: "Custom responsive websites built to convert visitors into loyal customers." },
              { title: "Social Media Campaigns", desc: "Strategic social content that grows followings and drives real engagement." },
            ].map((project) => (
              <div
                key={project.title}
                className="group relative overflow-hidden bg-gray-100 aspect-[4/3] flex items-end"
              >
                {/* Placeholder gradient simulating project thumbnails */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#149A9A]/20 via-gray-200 to-[#149A9A]/10 group-hover:from-[#149A9A]/30 group-hover:to-[#149A9A]/20 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <MentDiamond className="w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity" />
                </div>
                <div className="relative z-10 w-full bg-gradient-to-t from-black/70 to-transparent p-5 text-left">
                  <h3 className="text-sm font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-xs text-white/70">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://mentservices.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#149A9A] hover:text-[#0f7a7a] transition-colors"
          >
            View our full portfolio &rarr;
          </a>
        </div>
      </section>

      {/* ─── 7. Client Portal ─── */}
      <section id="portal" className="bg-gray-50 py-20 md:py-28 px-5 md:px-8">
        <div className="max-w-[1290px] mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#149A9A] mb-3">
            Client Portal
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Your Projects, <span className="text-[#149A9A]">One Dashboard</span>
          </h2>
          <div className="w-16 h-1 bg-[#ffb606] mx-auto mb-5" />
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Active clients can sign in to track project progress, review SEO analytics,
            approve deliverables, and communicate directly with the Ment team — all in one place.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10">
            {portalFeatures.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-gray-200 shadow-md p-6 md:p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 border-2 border-[#149A9A] flex items-center justify-center mb-4 mx-auto">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/auth/sign-in"
            className="inline-block bg-[#ffb606] text-[#0c2b2b] text-lg font-bold px-10 py-4 hover:bg-[#149A9A] hover:text-white transition-colors uppercase tracking-wider"
          >
            Sign In to Your Portal
          </Link>
        </div>
      </section>

      {/* ─── 8. SEO Services ─── */}
      <section id="seo" className="bg-white py-20 md:py-28 px-5 md:px-8">
        <div className="max-w-[1290px] mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#149A9A] mb-3">
            SEO Services
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Get Found. <span className="text-[#149A9A]">Get Clients.</span>
          </h2>
          <div className="w-16 h-1 bg-[#ffb606] mx-auto mb-5" />
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Our SEO strategies boost your search visibility and drive qualified traffic.
            Track every result through your client portal with transparent monthly reporting.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {seoServices.map((s) => (
              <div
                key={s.title}
                className="bg-white border border-gray-200 shadow-md p-6 md:p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 border-2 border-[#149A9A] flex items-center justify-center mb-4 mx-auto">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. Testimonials (matching "What Our Clients Say About Us") ─── */}
      <section id="testimonials" className="bg-[#f0fafa] py-20 md:py-28 px-5 md:px-8">
        <div className="max-w-[1290px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            What Our <span className="text-[#149A9A]">Clients</span> Say About Us
          </h2>
          <div className="w-16 h-1 bg-[#ffb606] mx-auto mb-5" />
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-5">
            At Ment Marketing, our clients are more than just partners. They&apos;re an integral part of our journey.
            We take pride in the relationships we build — every project, every campaign, every success.
          </p>
          <div className="mb-12">
            <Link
              href="/contact"
              className="inline-block bg-[#ffb606] text-[#0c2b2b] text-sm font-bold px-6 py-2.5 hover:bg-[#149A9A] hover:text-white transition-colors uppercase tracking-wider"
            >
              Schedule a Consultation
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white shadow-md p-6 text-left"
              >
                <Stars count={t.stars} />
                <p className="text-sm text-gray-700 leading-relaxed my-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-sm font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. Team ─── */}
      <section id="team" className="bg-white py-20 md:py-28 px-5 md:px-8">
        <div className="max-w-[1290px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Meet the <span className="text-[#730071]">Ment</span> Team
          </h2>
          <div className="w-16 h-1 bg-[#ffb606] mx-auto mb-5" />
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            A passionate team of mentors and creatives dedicated to growing your brand.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {teamMembers.map((m) => (
              <div key={m.name} className="text-center group">
                <div className="w-20 h-20 border-2 border-[#149A9A] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#149A9A]/10 transition-colors">
                  <span className="text-xl font-bold text-[#149A9A]">
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900">{m.name}</p>
                <p className="text-xs text-gray-500">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. CTA ─── */}
      <section className="bg-[#149A9A] py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Grow Your Brand?
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Let&apos;s build a marketing strategy that drives real results.
            Schedule a free consultation or sign in to your client portal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block bg-[#ffb606] text-[#0c2b2b] text-sm font-bold px-8 py-3.5 hover:bg-white transition-colors text-center uppercase tracking-wider"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/auth/sign-in"
              className="inline-block bg-white text-[#149A9A] text-sm font-bold px-8 py-3.5 hover:bg-gray-100 transition-colors text-center uppercase tracking-wider"
            >
              Client Login
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 12. Footer ─── */}
      <footer className="bg-[#0c2b2b] py-12 px-5 md:px-8">
        <div className="max-w-[1290px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <MentDiamond className="w-8 h-8" />
              <span className="text-lg font-bold text-white">
                <span className="text-[#ffb606]">Ment</span> Marketing &amp; Creative Services
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="#services" className="text-sm text-white/60 hover:text-[#ffb606] transition-colors uppercase tracking-wide">
                Services
              </a>
              <a href="#about" className="text-sm text-white/60 hover:text-[#ffb606] transition-colors uppercase tracking-wide">
                About
              </a>
              <a href="#portfolio" className="text-sm text-white/60 hover:text-[#ffb606] transition-colors uppercase tracking-wide">
                Portfolio
              </a>
              <a href="#portal" className="text-sm text-white/60 hover:text-[#ffb606] transition-colors uppercase tracking-wide">
                Client Portal
              </a>
              <Link href="/contact" className="text-sm text-white/60 hover:text-[#ffb606] transition-colors uppercase tracking-wide">
                Contact
              </Link>
              <Link href="/auth/sign-in" className="text-sm text-white/60 hover:text-[#ffb606] transition-colors uppercase tracking-wide">
                Client Login
              </Link>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} Ment Marketing &amp; Creative Services. All rights reserved.
            </p>
            <p className="text-xs text-white/30">
              HUB Certified &bull; MBE &bull; WBE &bull; SDB &bull; People&apos;s Choice Award 2024
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
