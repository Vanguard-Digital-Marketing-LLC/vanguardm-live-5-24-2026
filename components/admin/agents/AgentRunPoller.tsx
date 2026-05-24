"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * Polls /api/admin/agent/[id] every 2.5s while the run is in QUEUED/RUNNING.
 * On status transition to COMPLETED/FAILED, refreshes the server component.
 */
export default function AgentRunPoller({ id }: { id: string }) {
  const router = useRouter();
  const stopped = useRef(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const tick = async () => {
      if (stopped.current) return;
      try {
        const res = await fetch(`/api/admin/agent/${id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.status === "COMPLETED" || data.status === "FAILED") {
            stopped.current = true;
            router.refresh();
            return;
          }
          // Refresh anyway if output grew (cheap; SSR will re-fetch from DB)
          router.refresh();
        }
      } catch {
        // ignore transient errors
      }
      if (!stopped.current) timer = setTimeout(tick, 2500);
    };

    timer = setTimeout(tick, 2500);
    return () => {
      stopped.current = true;
      if (timer) clearTimeout(timer);
    };
  }, [id, router]);

  return (
    <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl px-4 py-2.5 text-xs text-blue-300 inline-flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
      Live — polling every 2.5s
    </div>
  );
}
