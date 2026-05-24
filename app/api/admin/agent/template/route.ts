import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminFeature } from "@/lib/api-middleware";
import { TEMPLATES, type TemplateKey } from "@/lib/agent-templates";
import { hasFeature } from "@/lib/plan-limits";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

/* POST /api/admin/agent/template
 * Body: { templateKey, topic, notes?, clientId? }
 * Creates an AgentRun, calls Anthropic directly (no sandbox),
 * persists the result on the same row. 202-style: returns the
 * AgentRun id immediately while the request finishes.
 */
export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { session, agencyId, errorResponse } = await requireAdminFeature("agent", "ADMIN");
  if (errorResponse) return errorResponse;

  // Plan-tier gate — agent feature is ENTERPRISE-only.
  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: { planTier: true },
  });
  if (!agency || !hasFeature(agency.planTier, "agent")) {
    return NextResponse.json(
      {
        error: "Agent runs require the Enterprise plan",
        code: "PLAN_UPGRADE_REQUIRED",
        currentPlan: agency?.planTier ?? "STARTER",
      },
      { status: 402 },
    );
  }

  const body = await request.json().catch(() => null);
  const templateKey = body?.templateKey as TemplateKey | undefined;
  const topic = body?.topic?.toString().trim();
  const notes = body?.notes?.toString().trim() || undefined;
  const clientId = body?.clientId?.toString().trim() || null;

  if (!templateKey || !TEMPLATES[templateKey]) {
    return NextResponse.json({ error: "Unknown template" }, { status: 400 });
  }
  if (!topic) {
    return NextResponse.json({ error: "topic is required" }, { status: 400 });
  }

  // Optional client lookup, scoped to this agency.
  let client: { id: string; name: string; domain: string | null } | null = null;
  if (clientId) {
    const c = await prisma.client.findFirst({
      where: { id: clientId, agencyId },
      select: { id: true, name: true, domain: true },
    });
    if (!c) return NextResponse.json({ error: "Client not found" }, { status: 404 });
    client = c;
  }

  const tpl = TEMPLATES[templateKey];
  const system = tpl.buildSystem();
  const user = tpl.buildUser({ topic, notes, client });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured on the server" },
      { status: 500 },
    );
  }

  // Persist the queued run first so the user can navigate to /admin/agents/[id]
  // and see polling pick it up.
  const run = await prisma.agentRun.create({
    data: {
      agencyId,
      clientId: client?.id ?? null,
      kind: templateKey,
      triggeredBy: session.user.id,
      status: "RUNNING",
      startedAt: new Date(),
      prompt: `[template: ${templateKey}]\n\n${user}`,
    },
  });

  // Fire-and-forget so the client gets a fast response.
  void (async () => {
    try {
      const anthropic = new Anthropic({ apiKey });
      const response = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2048,
        system,
        messages: [{ role: "user", content: user }],
      });
      const text = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map((b) => b.text)
        .join("\n\n");

      await prisma.agentRun.update({
        where: { id: run.id },
        data: {
          status: "COMPLETED",
          output: text,
          completedAt: new Date(),
        },
      });
    } catch (err) {
      await prisma.agentRun.update({
        where: { id: run.id },
        data: {
          status: "FAILED",
          errorMessage: err instanceof Error ? err.message : String(err),
          completedAt: new Date(),
        },
      });
    }
  })();

  return NextResponse.json({ agentRunId: run.id }, { status: 202 });
}
