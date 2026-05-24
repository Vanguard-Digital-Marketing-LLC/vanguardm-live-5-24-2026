"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

/* ──────────────────────────────────────────────
   LeadTracker — Invisible page view tracker.
   Sends page views to /api/leads/track for
   lead scoring. Uses GET requests to avoid
   Cloudflare Bot Fight Mode POST challenges.
   ────────────────────────────────────────────── */

function getOrCreateSessionId(): string {
  const key = "vg_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    // Also check localStorage for persistent session across tabs
    id = localStorage.getItem(key);
    if (!id) {
      id = "s_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
      localStorage.setItem(key, id);
    }
    sessionStorage.setItem(key, id);
  }
  return id;
}

/** Detect return visitors by comparing last visit date. */
function checkReturnVisit(): boolean {
  const key = "vg_last_visit";
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem(key);
  localStorage.setItem(key, today);
  return !!lastVisit && lastVisit !== today;
}

function incrementPageCount(): number {
  const key = "vg_page_count";
  const count = parseInt(sessionStorage.getItem(key) || "0", 10) + 1;
  sessionStorage.setItem(key, String(count));
  return count;
}

/** Build the tracking URL with short query params. */
function buildTrackUrl(params: {
  page: string;
  sessionId: string;
  pageCount?: number;
  returnVisit?: boolean;
}): string {
  const qs = new URLSearchParams({
    p: params.page,
    sid: params.sessionId,
  });
  if (params.pageCount !== undefined) qs.set("pc", String(params.pageCount));
  if (params.returnVisit) qs.set("rv", "1");
  return "/api/leads/track?" + qs.toString();
}

/** Fire-and-forget GET request for tracking. */
function sendTrack(params: {
  page: string;
  sessionId: string;
  pageCount?: number;
  returnVisit?: boolean;
}): void {
  const url = buildTrackUrl(params);
  // Use fetch GET as primary method (Cloudflare-friendly)
  fetch(url, { method: "GET", keepalive: true }).catch(() => {});
}

export default function LeadTracker() {
  const pathname = usePathname();
  const lastSentRef = useRef(0);
  const lastPathRef = useRef("");
  const returnVisitChecked = useRef(false);

  // Check for return visit on first mount
  useEffect(() => {
    if (!returnVisitChecked.current) {
      returnVisitChecked.current = true;
      if (checkReturnVisit()) {
        try {
          const sessionId = getOrCreateSessionId();
          sendTrack({ page: pathname, sessionId, pageCount: 0, returnVisit: true });
        } catch {
          // Non-critical
        }
      }
    }
  }, [pathname]);

  const trackPage = useCallback(
    (page: string) => {
      // Debounce: max 1 request per 2 seconds
      const now = Date.now();
      if (now - lastSentRef.current < 2000) return;
      // Don't double-track same path
      if (page === lastPathRef.current) return;

      lastSentRef.current = now;
      lastPathRef.current = page;

      try {
        const sessionId = getOrCreateSessionId();
        const pageCount = incrementPageCount();
        sendTrack({ page, sessionId, pageCount });
      } catch {
        // Non-critical tracking — fail silently
      }
    },
    [],
  );

  useEffect(() => {
    if (pathname) {
      trackPage(pathname);
    }
  }, [pathname, trackPage]);

  // Invisible component — renders nothing
  return null;
}
