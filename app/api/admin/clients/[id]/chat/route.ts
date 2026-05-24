import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { hasFeature } from "@/lib/plan-limits";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type ChatMessage = { role: "user" | "assistant"; content: string; ts: string };

const MAX_HISTORY = 30;

async function loadOrCreateConversation(clientId: string, userId: string, agencyId: string) {
  let convo = await prisma.conversation.findFirst({
    where: { clientId, userId, agencyId },
    orderBy: { updatedAt: "desc" },
  });
  if (!convo) {
    convo = await prisma.conversation.create({
      data: {
        clientId,
        userId,
        agencyId,
        title: "Client AI chat",
        messages: [],
      },
    });
  }
  return convo;
}

async function buildClientContext(clientId: string, agencyId: string) {
  const client = await prisma.client.findFirst({
    where: { id: clientId, agencyId },
    include: {
      services: { select: { serviceType: true, status: true, monthlyBudget: true } },
      tasks: {
        orderBy: { updatedAt: "desc" },
        take: 8,
        select: { title: true, status: true, priority: true, updatedAt: true },
      },
      supportTickets: {
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: { title: true, status: true, priority: true, updatedAt: true },
      },
      projects: {
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: { name: true, status: true },
      },
      clientNotes: {
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { content: true, createdAt: true },
      },
    },
  });
  return client;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id: clientId } = await params;
  const client = await prisma.client.findFirst({
    where: { id: clientId, agencyId },
    select: { id: true },
  });
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const convo = await loadOrCreateConversation(clientId, session.user.id, agencyId);
  const messages = (Array.isArray(convo.messages) ? convo.messages : []) as ChatMessage[];
  return NextResponse.json({ id: convo.id, messages });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = await checkRateLimit(req, "admin");
  if (blocked) return blocked;

  const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: { planTier: true },
  });
  if (!agency || !hasFeature(agency.planTier, "agent")) {
    return NextResponse.json(
      {
        error: "AI chat requires the Enterprise plan",
        code: "PLAN_UPGRADE_REQUIRED",
        currentPlan: agency?.planTier ?? "STARTER",
      },
      { status: 402 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured on the server" },
      { status: 500 },
    );
  }

  const { id: clientId } = await params;
  const body = await req.json().catch(() => null);
  const userMessage = body?.message?.toString().trim();
  if (!userMessage) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }
  if (userMessage.length > 4000) {
    return NextResponse.json({ error: "message too long (max 4000 chars)" }, { status: 400 });
  }

  const client = await buildClientContext(clientId, agencyId);
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const convo = await loadOrCreateConversation(clientId, session.user.id, agencyId);
  const history = (Array.isArray(convo.messages) ? convo.messages : []) as ChatMessage[];

  const now = new Date().toISOString();
  const userMsg: ChatMessage = { role: "user", content: userMessage, ts: now };
  const recentHistory = [...history, userMsg].slice(-MAX_HISTORY);

  let assistantText = "";
  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      system: buildSystemPrompt(client),
      messages: recentHistory.map((m) => ({ role: m.role, content: m.content })),
    });
    assistantText = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n\n");
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Anthropic call failed" },
      { status: 502 },
    );
  }

  const assistantMsg: ChatMessage = {
    role: "assistant",
    content: assistantText,
    ts: new Date().toISOString(),
  };

  const newMessages = [...history, userMsg, assistantMsg];
  await prisma.conversation.update({
    where: { id: convo.id },
    data: { messages: newMessages },
  });

  return NextResponse.json({
    id: convo.id,
    user: userMsg,
    assistant: assistantMsg,
    messages: newMessages,
  });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;
  const { id: clientId } = await params;

  await prisma.conversation.deleteMany({
    where: { clientId, userId: session.user.id, agencyId },
  });
  return NextResponse.json({ ok: true });
}
