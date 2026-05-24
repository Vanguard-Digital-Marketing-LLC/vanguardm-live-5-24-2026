import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature, withRateLimit } from "@/lib/api-middleware";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const GET = withRateLimit("admin", async (req: NextRequest) => {
  const { agencyId, errorResponse } = await requireAdminFeature("blog");
  if (errorResponse) return errorResponse;

  const tags = await prisma.blogTag.findMany({
    where: { agencyId },
    orderBy: { name: "asc" },
    include: {
      _count: { select: { posts: true } },
    },
  });

  return NextResponse.json(tags);
});

export const POST = withRateLimit("admin", async (req: NextRequest) => {
  const { agencyId, errorResponse } = await requireAdminFeature("blog");
  if (errorResponse) return errorResponse;

  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const slug = generateSlug(name);

  const existing = await prisma.blogTag.findUnique({
    where: { slug_agencyId: { slug, agencyId } },
  });
  if (existing) {
    return NextResponse.json({ error: "A tag with this name already exists" }, { status: 409 });
  }

  const tag = await prisma.blogTag.create({
    data: { name, slug, agencyId },
  });

  return NextResponse.json(tag, { status: 201 });
});
