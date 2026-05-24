"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

/* ──────────────────────────────────────────────
   ExitPopup — Exit intent detection + modal.
   Fires once per session when mouse leaves the
   viewport through the top edge (desktop only).
   Disabled for ADMIN, TEAM, and CLIENT users.
   ────────────────────────────────────────────── */

interface PopupConfig {
  id: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  showOnPaths: string[] | null;
}

export default function ExitPopup() {
  const { data: session } = useSession();
  const [config, setConfig] = useState<PopupConfig | null>(null);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Fetch popup config once session is resolved
  useEffect(() => {
    // Don't show exit popup for any signed-in user
    if (session?.user) return;

    const alreadyShown = sessionStorage.getItem("exit_popup_shown");
    if (alreadyShown) return;

    // Default config used when no DB config exists
    const fallbackConfig: PopupConfig = {
      id: "default",
      headline: "Wait -- before you go!",
      description:
        "Get a free, no-obligation strategy session with our team. We'll audit your current marketing and show you where the biggest opportunities are hiding.",
      ctaText: "Book My Free Consultation",
      ctaLink: "/contact",
      showOnPaths: null,
    };

    fetch("/api/leads/exit-popup")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.id) {
          // Check if current path matches allowed paths
          if (data.showOnPaths && Array.isArray(data.showOnPaths)) {
            const currentPath = window.location.pathname;
            const matches = data.showOnPaths.some(
              (p: string) => currentPath === p || currentPath.startsWith(p),
            );
            if (!matches) return;
          }
          setConfig(data);
        } else {
          // Use fallback when no config in DB
          setConfig(fallbackConfig);
        }
      })
      .catch(() => {
        // Use fallback on error
        setConfig(fallbackConfig);
      });
  }, [session]);

  // Exit intent detection
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (!config) return;
      if (e.clientY <= 0) {
        // Mouse left through the top of the viewport
        setVisible(true);
        setAnimating(true);
        sessionStorage.setItem("exit_popup_shown", "1");
        // Remove listener after showing once
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    },
    [config],
  );

  useEffect(() => {
    if (!config) return;
    const alreadyShown = sessionStorage.getItem("exit_popup_shown");
    if (alreadyShown) return;

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [config, handleMouseLeave]);

  const handleClose = () => {
    setAnimating(false);
    setTimeout(() => setVisible(false), 200);
  };

  if (!visible || !config) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
          animating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-popup-headline"
        className={`fixed inset-0 z-[101] flex items-center justify-center p-4 transition-all duration-200 ${
          animating ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="relative w-full max-w-md glass-strong rounded-2xl p-8 shadow-2xl shadow-black/50 border border-white/10">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-slate-400 hover:text-white hover:bg-white/20 transition-colors"
            aria-label="Close popup"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center">
            <h2
              id="exit-popup-headline"
              className="font-display text-2xl font-bold text-white mb-3"
            >
              {config.headline}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {config.description}
            </p>
            <a
              href={config.ctaLink}
              className="inline-flex items-center justify-center px-8 py-3 bg-emerald hover:bg-emerald-400 text-slate-950 font-display font-bold text-sm uppercase tracking-wider rounded-lg transition-colors"
            >
              {config.ctaText}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
