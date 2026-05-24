import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const onboarding = await prisma.clientOnboarding.findFirst({ where: { id, agencyId } });
  if (!onboarding) return NextResponse.json({ error: "Onboarding not found" }, { status: 404 });

  const updated = await prisma.clientOnboarding.update({
    where: { id },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
    },
  });

  return NextResponse.json(updated);
}
