"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (status === "loading" || !session) {
    return (
      <div className="flex items-center gap-3">
        {status !== "loading" && (
          <Link
            href="/auth/sign-in"
            className="font-display text-xs font-semibold uppercase tracking-widest text-slate-300 hover:text-emerald transition-colors"
          >
            Sign In
          </Link>
        )}
        <Link
          href="/contact"
          className="font-display font-semibold uppercase tracking-wider text-xs px-4 py-2 md:px-5 md:py-2.5 rounded-lg bg-emerald text-slate-950 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald/25 transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    );
  }

  const initials = (session.user.name || session.user.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-emerald/20 text-emerald font-display text-xs font-bold flex items-center justify-center">
          {initials}
        </div>
        <span className="hidden lg:block font-display text-xs font-semibold text-slate-300 max-w-[120px] truncate">
          {session.user.name || session.user.email}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 glass-strong rounded-xl border border-white/10 py-2 shadow-xl z-50">
          {(session.user as Record<string, unknown>)?.role === "ADMIN" ||
           (session.user as Record<string, unknown>)?.isAdmin ? (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-slate-300 hover:text-emerald hover:bg-white/5 transition-colors"
            >
              Admin Panel
            </Link>
          ) : null}
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-slate-300 hover:text-emerald hover:bg-white/5 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/courses"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-slate-300 hover:text-emerald hover:bg-white/5 transition-colors"
          >
            My Courses
          </Link>
          <div className="border-t border-white/5 my-1" />
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-4 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
