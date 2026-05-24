"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error Boundary]", error);
    const msg = error?.message || "";
    if (
      msg.includes("ChunkLoadError") ||
      msg.includes("Loading chunk") ||
      msg.includes("Failed to fetch dynamically imported module") ||
      (msg.includes("MIME type") && msg.includes("text/plain"))
    ) {
      const reloaded = sessionStorage.getItem("chunk_reload_global");
      if (!reloaded) {
        sessionStorage.setItem("chunk_reload_global", "1");
        window.location.reload();
        return;
      }
      sessionStorage.removeItem("chunk_reload_global");
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#0a0f1a",
          color: "#e2e8f0",
          fontFamily:
            "'Syne', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <main
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              maxWidth: "28rem",
              borderRadius: "1rem",
              border: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(12px)",
              padding: "2.5rem 2rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "4rem",
                height: "4rem",
                borderRadius: "1rem",
                backgroundColor: "rgba(16,185,129,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                marginTop: 0,
                color: "#ffffff",
              }}
            >
              Something went wrong
            </h1>

            <p
              style={{
                fontSize: "0.875rem",
                color: "#94a3b8",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              A critical error occurred. Please try reloading the page. If the
              problem persists, contact us at{" "}
              <a
                href="mailto:hello@vanguardm.com"
                style={{ color: "#10b981", textDecoration: "none" }}
              >
                hello@vanguardm.com
              </a>
              .
            </p>

            {error.digest && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#475569",
                  marginBottom: "1.5rem",
                  fontFamily: "monospace",
                }}
              >
                Ref: {error.digest}
              </p>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <button
                onClick={reset}
                style={{
                  padding: "0.625rem 1.5rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "#10b981",
                  color: "#0a0f1a",
                  border: "none",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                style={{
                  padding: "0.625rem 1.5rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "transparent",
                  color: "#94a3b8",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                }}
              >
                Go Home
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
