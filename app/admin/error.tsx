"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Admin Error Boundary]", error);
    const msg = error?.message || "";
    if (
      msg.includes("ChunkLoadError") ||
      msg.includes("Loading chunk") ||
      msg.includes("Failed to fetch dynamically imported module")
    ) {
      const reloaded = sessionStorage.getItem("chunk_reload_admin");
      if (!reloaded) {
        sessionStorage.setItem("chunk_reload_admin", "1");
        window.location.reload();
        return;
      }
      sessionStorage.removeItem("chunk_reload_admin");
    }
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        {/* Card matching admin bg-[#111827] panels */}
        <div className="rounded-2xl bg-[#111827] border border-white/[0.06] p-8 md:p-10 shadow-lg">
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-red-400/10 flex items-center justify-center mx-auto mb-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f87171"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h2 className="font-display text-xl font-bold text-white mb-2">
            Dashboard Error
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            Something went wrong loading this section. Try again, or return to
            the admin overview. If the issue continues, reach out at{" "}
            <a
              href="mailto:hello@vanguardm.com"
              className="text-teal hover:underline"
            >
              hello@vanguardm.com
            </a>
            .
          </p>

          {error.digest && (
            <p className="text-xs text-slate-600 mb-4 font-mono">
              Ref: {error.digest}
            </p>
          )}

          <div className="flex justify-center gap-3">
            <button
              onClick={reset}
              className="px-5 py-2 rounded-lg bg-teal text-slate-950 font-display text-xs font-semibold uppercase tracking-wider hover:bg-teal-400 transition-colors cursor-pointer"
            >
              Try Again
            </button>
            <Link
              href="/admin"
              className="px-5 py-2 rounded-lg border border-white/10 text-slate-400 font-display text-xs font-semibold uppercase tracking-wider hover:text-white hover:border-white/20 transition-colors"
            >
              Back to Overview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
