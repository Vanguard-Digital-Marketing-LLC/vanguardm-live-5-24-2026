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

export const GET = withRateLimit("admin", async (req: NextRequest) => {
  const { agencyId, errorResponse } = await requireAdminFeature("blog");
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");
  const status = searchParams.get("status");
  const search = searchParams.get("search") || "";

  const where: Record<string, unknown> = { agencyId };
  if (status && status !== "ALL") where.status = status;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
    ];
  }

  const [data, totalCount] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        author: { select: { id: true, name: true, email: true, image: true } },
        tags: { include: { tag: true } },
        categories: { include: { category: true } },
      },
    }),
    prisma.blogPost.count({ where }),
  ]);

  return NextResponse.json({ data, totalCount, page, pageSize });
});

export const POST = withRateLimit("admin", async (req: NextRequest) => {
  const { session, agencyId, errorResponse } = await requireAdminFeature("blog");
  if (errorResponse) return errorResponse;

  const body = await req.json();
  const { title, content, excerpt, coverImage, status, metaTitle, metaDescription, tags, categories } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const slug = body.slug ? generateSlug(body.slug) : generateSlug(title);

  // Check for slug uniqueness
  const existing = await prisma.blogPost.findFirst({ where: { slug, agencyId } });
  if (existing) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }

  // Calculate reading time (words / 200, round up)
  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const publishedAt = status === "PUBLISHED" ? new Date() : null;

  // Build tag connections
  const tagConnections = tags?.length
    ? await Promise.all(
        (tags as string[]).map(async (name: string) => {
          const tagSlug = generateSlug(name);
          const tag = await prisma.blogTag.upsert({
            where: { slug_agencyId: { slug: tagSlug, agencyId } },
            create: { name, slug: tagSlug, agencyId },
            update: {},
          });
          return { tagId: tag.id };
        })
      )
    : [];

  // Build category connections
  const categoryConnections = categories?.length
    ? await Promise.all(
        (categories as string[]).map(async (name: string) => {
          const catSlug = generateSlug(name);
          const category = await prisma.blogCategory.upsert({
            where: { slug_agencyId: { slug: catSlug, agencyId } },
            create: { name, slug: catSlug, agencyId },
            update: {},
          });
          return { categoryId: category.id };
        })
      )
    : [];

  const post = await prisma.blogPost.create({
    data: {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      coverImage: coverImage || null,
      status: status || "DRAFT",
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      readingTime,
      publishedAt,
      authorId: session!.user!.id!,
      agencyId,
      tags: { create: tagConnections },
      categories: { create: categoryConnections },
    },
    include: {
      author: { select: { id: true, name: true, email: true } },
      tags: { include: { tag: true } },
      categories: { include: { category: true } },
    },
  });

  return NextResponse.json(post, { status: 201 });
});
