import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "public");
  if (blocked) return blocked;
  const slug = request.headers.get("x-agency-slug");
  if (!slug) {
    return NextResponse.json({
      name: "Vanguard Digital",
      slug: "vanguard",
      primaryColor: "#10b981",
      accentColor: "#f59e0b",
      logoUrl: null,
    });
  }

  const agency = await prisma.agency.findUnique({
    where: { slug },
    select: {
      name: true,
      slug: true,
      primaryColor: true,
      accentColor: true,
      logoUrl: true,
      planTier: true,
    },
  });

  if (!agency) {
    return NextResponse.json({ error: "Agency not found" }, { status: 404 });
  }

  return NextResponse.json(agency);
}
