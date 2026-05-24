import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Verify the client belongs to this agency
  const client = await prisma.client.findFirst({ where: { id, agencyId } });
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const notes = await prisma.clientNote.findMany({
    where: { clientId: id },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  return NextResponse.json(notes);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const body = await request.json();
  if (!body.content) return NextResponse.json({ error: "Content required" }, { status: 400 });

  // Verify the client belongs to this agency
  const client = await prisma.client.findFirst({ where: { id, agencyId } });
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const note = await prisma.clientNote.create({
    data: {
      clientId: id,
      userId: session.user.id,
      type: body.type || "NOTE",
      content: body.content,
    },
    include: { user: { select: { id: true, name: true } } },
  });

  return NextResponse.json(note, { status: 201 });
}
