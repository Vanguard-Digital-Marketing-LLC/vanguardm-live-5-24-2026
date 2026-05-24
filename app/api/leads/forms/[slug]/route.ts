import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";

/* ──────────────────────────────────────────────
   GET /api/leads/forms/[slug]
   Returns MultiStepForm config by slug.
   Public endpoint, no auth required.
   ────────────────────────────────────────────── */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const blocked = await checkRateLimit(request, "public");
  if (blocked) return blocked;

  const { slug } = await params;

  try {
    const form = await prisma.multiStepForm.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        steps: true,
        isActive: true,
      },
    });

    if (!form) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(form);
  } catch (err) {
    console.error("Form fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
