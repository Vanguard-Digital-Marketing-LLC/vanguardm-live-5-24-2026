import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requirePortalAuth } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 min cap; client reconnects after.

const POLL_MS = 3000;
const HEARTBEAT_MS = 25_000;

/**
 * SSE: pushes new ClientMessage rows for the current user's linked client.
 *
 * Implementation: long-lived response that polls the DB server-side. We
 * don't have Redis pub/sub or Postgres LISTEN/NOTIFY wired into the
 * runtime, so this is the simplest delta-streaming option that keeps the
 * client off a HTTP polling treadmill.
 *
 * Protocol:
 *   event: messages   data: <ClientMessage[]>
 *   event: ping       data: <epoch ms>
 */
export async function GET(req: NextRequest) {
  // Throttle connection establishment (the rest of the stream is long-lived).
  const blocked = await checkRateLimit(req, "portal");
  if (blocked) return blocked;

  // CLIENT-role + linked-clientId check via the same helper every other
  // portal endpoint uses. SSE returns a plain Response (not NextResponse),
  // so the helper's NextResponse is translated to a plain Response with the
  // same status. requirePortalAuth does NOT do the agency-fence DB lookup —
  // keep the explicit lookup below.
  const portal = await requirePortalAuth();
  if (portal.errorResponse) {
    return new Response(portal.errorResponse.statusText || "Unauthorized", {
      status: portal.errorResponse.status,
    });
  }
  const { session, clientId } = portal;

  // Same agency-fence the regular GET applies. SSE doesn't otherwise touch
  // Client, so this guards against a stale session referencing a client now
  // moved out of the user's agency.
  if (session.user.agencyId) {
    const ok = await prisma.client.findFirst({
      where: { id: clientId, agencyId: session.user.agencyId },
      select: { id: true },
    });
    if (!ok) return new Response("Forbidden", { status: 403 });
  }

  // Optional ?since=<ISO> so reconnects don't replay.
  const sinceParam = req.nextUrl.searchParams.get("since");
  let lastSeen = sinceParam ? new Date(sinceParam) : new Date();
  if (Number.isNaN(lastSeen.getTime())) lastSeen = new Date();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, payload: unknown) => {
        try {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`),
          );
        } catch {
          // controller closed
        }
      };

      // Open the stream with a hello so the client clears its connecting state.
      send("hello", { ts: Date.now() });

      let aborted = false;
      const onAbort = () => {
        aborted = true;
        try {
          controller.close();
        } catch {
          // already closed
        }
      };
      req.signal.addEventListener("abort", onAbort);

      const heartbeat = setInterval(() => {
        if (aborted) return;
        send("ping", Date.now());
      }, HEARTBEAT_MS);

      try {
        while (!aborted) {
          const fresh = await prisma.clientMessage.findMany({
            where: {
              clientId,
              isInternal: false,
              createdAt: { gt: lastSeen },
            },
            orderBy: { createdAt: "asc" },
            include: { user: { select: { id: true, name: true, role: true } } },
            take: 50,
          });
          if (fresh.length > 0) {
            send("messages", fresh);
            lastSeen = fresh[fresh.length - 1].createdAt;
          }
          await new Promise((r) => setTimeout(r, POLL_MS));
        }
      } catch (err) {
        send("error", { message: err instanceof Error ? err.message : "stream error" });
      } finally {
        clearInterval(heartbeat);
        req.signal.removeEventListener("abort", onAbort);
        try {
          controller.close();
        } catch {
          // already closed
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
