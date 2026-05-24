import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/api-middleware";
import { prisma } from "@/lib/db";

export async function PATCH(request: NextRequest) {
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const body = await request.json();

  const data: Record<string, unknown> = {};
  if (typeof body.name === "string" && body.name.trim()) data.name = body.name.trim();
  if (typeof body.logoUrl === "string") data.logoUrl = body.logoUrl || null;
  if (typeof body.primaryColor === "string") data.primaryColor = body.primaryColor || null;
  if (typeof body.accentColor === "string") data.accentColor = body.accentColor || null;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const agency = await prisma.agency.update({
    where: { id: agencyId },
    data,
    select: { name: true, slug: true, logoUrl: true, primaryColor: true, accentColor: true },
  });

  return NextResponse.json(agency);
}
