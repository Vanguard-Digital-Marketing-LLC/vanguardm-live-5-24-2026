import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "portal");
  if (blocked) return blocked;

  const session = await auth();
  if (!session?.user?.id || session.user.role !== "CLIENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      portalOnboarded: true,
      emailOnNewReport: true,
      emailOnApprovalRequest: true,
      emailOnTicketUpdate: true,
      emailOnNewMessage: true,
    },
  });

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest) {
  const blocked = await checkRateLimit(request, "portal");
  if (blocked) return blocked;

  const session = await auth();
  if (!session?.user?.id || session.user.role !== "CLIENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // Only allow updating these specific fields
  const data: Record<string, boolean> = {};
  const allowedFields = [
    "portalOnboarded",
    "emailOnNewReport",
    "emailOnApprovalRequest",
    "emailOnTicketUpdate",
    "emailOnNewMessage",
  ];

  for (const field of allowedFields) {
    if (typeof body[field] === "boolean") {
      data[field] = body[field];
    }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data,
    select: {
      portalOnboarded: true,
      emailOnNewReport: true,
      emailOnApprovalRequest: true,
      emailOnTicketUpdate: true,
      emailOnNewMessage: true,
    },
  });

  return NextResponse.json(user);
}
