"use client";

import { useEffect } from "react";

export default function PortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Portal Error]", error);
    const msg = error?.message || "";
    if (
      msg.includes("ChunkLoadError") ||
      msg.includes("Loading chunk") ||
      msg.includes("Failed to fetch dynamically imported module")
    ) {
      const reloaded = sessionStorage.getItem("chunk_reload_portal");
      if (!reloaded) {
        sessionStorage.setItem("chunk_reload_portal", "1");
        window.location.reload();
        return;
      }
      sessionStorage.removeItem("chunk_reload_portal");
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h2 className="font-display text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-sm text-slate-400 mb-6">An unexpected error occurred. Please try again.</p>
        {error.digest && <p className="text-xs text-slate-600 mb-4 font-mono">Ref: {error.digest}</p>}
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-lg bg-teal text-slate-950 font-display text-xs font-semibold uppercase tracking-wider hover:bg-teal-400 transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
