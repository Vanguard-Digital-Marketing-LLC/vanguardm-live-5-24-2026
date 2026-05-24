"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Dashboard Error Boundary]", error);
    const msg = error?.message || "";
    if (msg.includes("ChunkLoadError") || msg.includes("Loading chunk") || msg.includes("Failed to fetch dynamically imported module")) {
      const key = "chunk_reload_dashboard";
      if (!sessionStorage.getItem(key)) { sessionStorage.setItem(key, "1"); window.location.reload(); return; }
      sessionStorage.removeItem(key);
    }
  }, [error]);

  return (
    <main className="pt-24" id="main-content">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-lg mx-auto text-center">
          {/* Glass card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 md:p-10 shadow-lg">
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-amber/10 flex items-center justify-center mx-auto mb-6">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h1 className="font-display text-2xl font-bold text-white mb-3">
              Something went wrong
            </h1>

            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              We couldn&apos;t load your dashboard. Please try again, and if the
              problem continues don&apos;t hesitate to contact us.
            </p>

            {error.digest && (
              <p className="text-xs text-slate-600 mb-4 font-mono">
                Ref: {error.digest}
              </p>
            )}

            <div className="flex justify-center gap-4">
              <button
                onClick={reset}
                className="px-6 py-2.5 rounded-lg bg-emerald text-slate-950 font-display text-xs font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                Try Again
              </button>
              <Link
                href="/dashboard"
                className="px-6 py-2.5 rounded-lg border border-white/10 text-slate-300 font-display text-xs font-semibold uppercase tracking-wider hover:border-emerald/30 hover:text-white transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
