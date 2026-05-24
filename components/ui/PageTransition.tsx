"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────
   Rocket Flyby Page Transition
   ──────────────────────────────────────────────
   On route change the rocket zooms bottom→top
   through the viewport while page content
   crossfades.  Quick, clean, ~900ms total.
   ────────────────────────────────────────────── */

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Skip transition entirely for admin and portal routes
  const skipTransition = pathname.startsWith("/admin") || pathname.startsWith("/portal");

  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevPathRef = useRef(pathname);
  const childrenRef = useRef(children);

  useEffect(() => {
    childrenRef.current = children;
  });

  useEffect(() => {
    if (pathname === prevPathRef.current) return;

    if (skipTransition) {
      setDisplayChildren(childrenRef.current);
      prevPathRef.current = pathname;
      setPhase("idle");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase("exit");

    // Swap content + enter new page
    const enterTimer = setTimeout(() => {
      setDisplayChildren(childrenRef.current);
      prevPathRef.current = pathname;
      setPhase("enter");
    }, 400);

    // Back to idle
    const idleTimer = setTimeout(() => {
      setPhase("idle");
    }, 900);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(idleTimer);
    };
  }, [pathname, skipTransition]);

  // Keep displayChildren in sync for HMR / non-navigation renders
  useEffect(() => {
    if (phase === "idle") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayChildren(children);
      prevPathRef.current = pathname;
    }
  }, [children, pathname, phase]);

  const isAnimating = phase !== "idle";

  const [speedLineStyles] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      left: `${8 + (i * 84) / 11}%`,
      top: "-20px",
      height: `${30 + Math.random() * 40}px`,
      background: `linear-gradient(to bottom, transparent, ${
        i % 2 === 0 ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.25)"
      }, transparent)`,
      animation: `speedLine 0.6s ease-in ${i * 0.04}s forwards`,
    }))
  );

  return (
    <>
      {/* ─── Rocket Flyby Overlay ─── */}
      {isAnimating && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Rocket — flies bottom to top */}
          <div
            className="absolute left-1/2"
            style={{
              bottom: "-100px",
              animation: "rocketFlyby 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
          >
            {/* Exhaust trail glow */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-8 h-20 rounded-full blur-xl"
              style={{
                background:
                  "linear-gradient(to bottom, #f59e0b, #10b981, transparent)",
                animation:
                  "exhaustFlicker 0.1s ease-in-out infinite alternate",
              }}
            />

            {/* Rocket SVG */}
            <svg
              width="40"
              height="68"
              viewBox="0 0 48 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]"
            >
              <path
                d="M24 0 C24 0 32 16 32 28 L16 28 C16 16 24 0 24 0Z"
                fill="url(#ptNose)"
              />
              <rect x="16" y="28" width="16" height="30" rx="2" fill="url(#ptBody)" />
              <circle cx="24" cy="38" r="5" fill="#0a0f1a" stroke="#10b981" strokeWidth="1.5" />
              <circle cx="24" cy="38" r="3" fill="#10b981" opacity="0.4" />
              <path d="M16 48 L6 62 L16 58Z" fill="url(#ptFin)" />
              <path d="M32 48 L42 62 L32 58Z" fill="url(#ptFin)" />
              <path d="M18 58 L14 68 L34 68 L30 58Z" fill="#374151" />
              <path
                d="M14 68 L24 80 L34 68Z"
                fill="url(#ptFlame)"
                className="animate-pulse"
              />
              <path
                d="M18 68 L24 77 L30 68Z"
                fill="#fbbf24"
                opacity="0.9"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="ptNose" x1="24" y1="0" x2="24" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f59e0b" />
                  <stop offset="1" stopColor="#d97706" />
                </linearGradient>
                <linearGradient id="ptBody" x1="24" y1="28" x2="24" y2="58" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#e2e8f0" />
                  <stop offset="1" stopColor="#94a3b8" />
                </linearGradient>
                <linearGradient id="ptFin" x1="0" y1="48" x2="0" y2="62" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10b981" />
                  <stop offset="1" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="ptFlame" x1="24" y1="68" x2="24" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f59e0b" />
                  <stop offset="0.5" stopColor="#ef4444" />
                  <stop offset="1" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Speed lines — streak down as rocket flies up */}
          {speedLineStyles.map((style, i) => (
            <div
              key={i}
              className="absolute w-px rounded-full"
              style={style}
            />
          ))}
        </div>
      )}

      {/* ─── Page Content ─── */}
      <div
        className={
          phase === "idle"
            ? ""
            : phase === "exit"
            ? "animate-pageExit"
            : "animate-pageEnter"
        }
      >
        {displayChildren}
      </div>
    </>
  );
}
