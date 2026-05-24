import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  const { id } = await params;

  // Verify task belongs to this agency
  const task = await prisma.task.findFirst({ where: { id, agencyId } });
  if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // TEAM can only view comments on their assigned tasks
  if (role === "TEAM" && task.assigneeId !== session.user.id)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const comments = await prisma.taskComment.findMany({
    where: { taskId: id },
    orderBy: { createdAt: "asc" },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json(comments);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  const { id } = await params;

  // Verify task belongs to this agency
  const task = await prisma.task.findFirst({ where: { id, agencyId } });
  if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // TEAM can only comment on their assigned tasks
  if (role === "TEAM" && task.assigneeId !== session.user.id)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  if (!body.content?.trim())
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 }
    );

  const comment = await prisma.taskComment.create({
    data: {
      taskId: id,
      userId: session.user.id,
      content: body.content.trim(),
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json(comment, { status: 201 });
}
