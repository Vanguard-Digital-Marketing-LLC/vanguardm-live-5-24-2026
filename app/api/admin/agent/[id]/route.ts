import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { agencyId, errorResponse } = await requireAdminFeature("agent");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  const agentRun = await prisma.agentRun.findUnique({
    where: { id },
    include: {
      ticket: { select: { agencyId: true, title: true } },
      task: { select: { agencyId: true, title: true } },
      client: { select: { id: true, name: true, domain: true } },
    },
  });

  if (!agentRun) {
    return NextResponse.json({ error: "AgentRun not found" }, { status: 404 });
  }

  // Direct agencyId column wins; fall back to ticket/task for legacy rows.
  const runAgencyId =
    agentRun.agencyId ?? agentRun.ticket?.agencyId ?? agentRun.task?.agencyId ?? null;
  if (runAgencyId !== agencyId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(agentRun);
}
