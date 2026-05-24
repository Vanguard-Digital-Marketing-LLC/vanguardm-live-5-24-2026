"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Blog Error]", error);
    const msg = error?.message || "";
    if (msg.includes("ChunkLoadError") || msg.includes("Loading chunk") || msg.includes("Failed to fetch dynamically imported module")) {
      const key = "chunk_reload_blog";
      if (!sessionStorage.getItem(key)) { sessionStorage.setItem(key, "1"); window.location.reload(); return; }
      sessionStorage.removeItem(key);
    }
  }, [error]);

  return (
    <main className="pt-24" id="main-content">
      <section className="py-14 md:py-24 px-5 md:px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 md:p-10 shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-emerald/10 flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h1 className="font-display text-2xl font-bold text-white mb-3">Something went wrong</h1>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              We ran into an issue loading this page. Please try again.
            </p>
            {error.digest && <p className="text-xs text-slate-600 mb-6 font-mono">Ref: {error.digest}</p>}
            <div className="flex justify-center gap-4">
              <button
                onClick={reset}
                className="px-6 py-2.5 rounded-lg bg-emerald text-slate-950 font-display text-xs font-semibold uppercase tracking-wider hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                Try Again
              </button>
              <Link href="/blog" className="px-6 py-2.5 rounded-lg border border-white/10 text-slate-300 font-display text-xs font-semibold uppercase tracking-wider hover:border-emerald/30 hover:text-white transition-colors">
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
