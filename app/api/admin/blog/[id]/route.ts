import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature, withRateLimit } from "@/lib/api-middleware";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const GET = withRateLimit("admin", async (
  req: NextRequest,
  context: { params: Promise<Record<string, string>> },
) => {
  const { agencyId, errorResponse } = await requireAdminFeature("blog");
  if (errorResponse) return errorResponse;

  const { id } = await context.params;

  const post = await prisma.blogPost.findFirst({
    where: { id, agencyId },
    include: {
      author: { select: { id: true, name: true, email: true, image: true } },
      tags: { include: { tag: true } },
      categories: { include: { category: true } },
    },
  });

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
});

export const PATCH = withRateLimit("admin", async (
  req: NextRequest,
  context: { params: Promise<Record<string, string>> },
) => {
  const { agencyId, errorResponse } = await requireAdminFeature("blog");
  if (errorResponse) return errorResponse;

  const { id } = await context.params;
  const body = await req.json();

  // Get the existing post so we can check status transitions
  const existing = await prisma.blogPost.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Build update data
  const data: Record<string, unknown> = {};
  const allowedFields = [
    "title", "content", "excerpt", "coverImage",
    "status", "metaTitle", "metaDescription",
  ];

  for (const field of allowedFields) {
    if (body[field] !== undefined) data[field] = body[field];
  }

  // Slug update
  if (body.slug !== undefined) {
    const newSlug = generateSlug(body.slug);
    if (newSlug !== existing.slug) {
      const slugTaken = await prisma.blogPost.findFirst({ where: { slug: newSlug, agencyId } });
      if (slugTaken) {
        return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
      }
      data.slug = newSlug;
    }
  }

  // Recalculate reading time if content changed
  if (body.content) {
    const wordCount = body.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
    data.readingTime = Math.max(1, Math.ceil(wordCount / 200));
  }

  // If changing to PUBLISHED and not previously published, set publishedAt
  if (body.status === "PUBLISHED" && existing.status !== "PUBLISHED") {
    data.publishedAt = new Date();
  }

  // Handle tag reconnection
  if (body.tags !== undefined) {
    const tags = body.tags as string[];
    // Disconnect all existing tags
    await prisma.blogPostTag.deleteMany({ where: { postId: id } });

    // Connect or create new tags
    if (tags.length > 0) {
      for (const name of tags) {
        const tagSlug = generateSlug(name);
        const tag = await prisma.blogTag.upsert({
          where: { slug_agencyId: { slug: tagSlug, agencyId } },
          create: { name, slug: tagSlug, agencyId },
          update: {},
        });
        await prisma.blogPostTag.create({
          data: { postId: id, tagId: tag.id },
        });
      }
    }
  }

  // Handle category reconnection
  if (body.categories !== undefined) {
    const categories = body.categories as string[];
    // Disconnect all existing categories
    await prisma.blogPostCategory.deleteMany({ where: { postId: id } });

    // Connect or create new categories
    if (categories.length > 0) {
      for (const name of categories) {
        const catSlug = generateSlug(name);
        const category = await prisma.blogCategory.upsert({
          where: { slug_agencyId: { slug: catSlug, agencyId } },
          create: { name, slug: catSlug, agencyId },
          update: {},
        });
        await prisma.blogPostCategory.create({
          data: { postId: id, categoryId: category.id },
        });
      }
    }
  }

  const post = await prisma.blogPost.update({
    where: { id },
    data,
    include: {
      author: { select: { id: true, name: true, email: true } },
      tags: { include: { tag: true } },
      categories: { include: { category: true } },
    },
  });

  return NextResponse.json(post);
});

export const DELETE = withRateLimit("admin", async (
  req: NextRequest,
  context: { params: Promise<Record<string, string>> },
) => {
  const { agencyId, errorResponse } = await requireAdminFeature("blog");
  if (errorResponse) return errorResponse;

  const { id } = await context.params;

  const existing = await prisma.blogPost.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
});
