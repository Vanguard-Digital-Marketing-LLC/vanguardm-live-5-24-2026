import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminAuth } from "@/lib/api-middleware";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { email, courseSlug } = await request.json();

  if (!email || !courseSlug) {
    return NextResponse.json(
      { error: "Email and courseSlug are required." },
      { status: 400 },
    );
  }

  // Scope user lookup to this agency
  const user = await prisma.user.findFirst({ where: { email, agencyId } });
  if (!user) {
    return NextResponse.json(
      { error: `No user found with email: ${email}` },
      { status: 404 },
    );
  }

  // Upsert to avoid duplicates
  const purchase = await prisma.coursePurchase.upsert({
    where: { userId_courseSlug: { userId: user.id, courseSlug } },
    update: {},
    create: {
      userId: user.id,
      courseSlug,
      amount: 0,
      stripeSessionId: `admin-grant-${Date.now()}`,
    },
  });

  return NextResponse.json({ success: true, purchase });
}
