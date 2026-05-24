"use client";

import { useState } from "react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import VanguardLogo from "./VanguardLogo";
import SocialIcons from "./SocialIcons";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/portfolio" },
  { label: "Academy", href: "/academy" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <VanguardLogo size={28} />

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link-underline font-display text-xs font-semibold uppercase tracking-widest text-slate-300 hover:text-emerald transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+19363586500"
            className="flex items-center gap-1.5 font-display text-xs font-semibold text-emerald hover:text-emerald-400 transition-colors"
            data-track="phone_call"
            data-track-category="contact"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            (936) 358-6500
          </a>
          <SocialIcons size={16} />
          <span className="h-4 w-px bg-white/10" />
          <Link href="/privacy-policy" className="font-display text-[10px] font-medium uppercase tracking-wider text-slate-500 hover:text-emerald transition-colors">Privacy</Link>
          <Link href="/terms" className="font-display text-[10px] font-medium uppercase tracking-wider text-slate-500 hover:text-emerald transition-colors">Terms</Link>
        </nav>

        <div className="hidden md:block">
          <UserMenu />
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden glass-strong border-t border-white/5 px-6 py-4 space-y-3 text-center" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-display text-sm font-semibold uppercase tracking-widest text-slate-300 hover:text-emerald transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+19363586500"
            className="block font-display text-sm font-bold text-emerald"
            data-track="phone_call"
            data-track-category="contact"
          >
            (936) 358-6500
          </a>
          <SocialIcons size={20} className="justify-center mt-3" />
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/privacy-policy" className="font-display text-xs text-slate-500 hover:text-emerald transition-colors" onClick={() => setMobileOpen(false)}>Privacy Policy</Link>
            <Link href="/terms" className="font-display text-xs text-slate-500 hover:text-emerald transition-colors" onClick={() => setMobileOpen(false)}>Terms</Link>
          </div>
          <div className="mt-4 flex justify-center">
            <UserMenu />
          </div>
        </nav>
      )}
    </header>
  );
}
