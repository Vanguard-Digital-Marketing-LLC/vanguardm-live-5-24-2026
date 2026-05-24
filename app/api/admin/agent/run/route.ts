import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { resolveSiteConfig } from "@/lib/client-sites";
import { buildAgentPrompt, executeAgent } from "@/lib/agent-executor";

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { session, agencyId, errorResponse } = await requireAdminFeature("agent", "ADMIN");
  if (errorResponse) return errorResponse;

  const body = await request.json();
  const { ticketId, taskId } = body;

  if (!ticketId && !taskId) {
    return NextResponse.json({ error: "ticketId or taskId required" }, { status: 400 });
  }

  // Load ticket or task with client — verify it belongs to this agency
  let title = "";
  let description: string | null = null;
  let clientName = "";
  let clientDomain = "";
  let clientId: string | null = null;

  if (ticketId) {
    const ticket = await prisma.supportTicket.findFirst({
      where: { id: ticketId, agencyId },
      include: { client: { select: { id: true, name: true, domain: true } } },
    });
    if (!ticket) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    if (!ticket.client.domain) {
      return NextResponse.json({ error: "Client has no domain configured" }, { status: 400 });
    }
    title = ticket.title;
    description = ticket.description;
    clientName = ticket.client.name;
    clientDomain = ticket.client.domain;
    clientId = ticket.client.id;
  } else if (taskId) {
    const task = await prisma.task.findFirst({
      where: { id: taskId, agencyId },
      include: { client: { select: { id: true, name: true, domain: true } } },
    });
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
    if (!task.client?.domain) {
      return NextResponse.json({ error: "Task has no client with a domain" }, { status: 400 });
    }
    title = task.title;
    description = task.description;
    clientName = task.client.name;
    clientDomain = task.client.domain;
    clientId = task.client.id;
  }

  // Resolve site config
  const siteConfig = resolveSiteConfig(clientDomain);
  if (!siteConfig) {
    return NextResponse.json(
      { error: `No site configuration found for domain: ${clientDomain}` },
      { status: 400 }
    );
  }

  // Build prompt
  const prompt = buildAgentPrompt({
    ticketTitle: title,
    ticketDescription: description,
    clientName,
    clientDomain,
    siteConfig,
  });

  // Create AgentRun record
  const agentRun = await prisma.agentRun.create({
    data: {
      ticketId: ticketId || null,
      taskId: taskId || null,
      agencyId,
      clientId,
      kind: ticketId ? "ticket-fix" : "task-fix",
      triggeredBy: session.user.id,
      status: "QUEUED",
      prompt,
    },
  });

  // Fire-and-forget
  executeAgent(agentRun.id).catch((err) => {
    console.error("[agent/run] executeAgent error:", err);
  });

  return NextResponse.json({ agentRunId: agentRun.id }, { status: 202 });
}
