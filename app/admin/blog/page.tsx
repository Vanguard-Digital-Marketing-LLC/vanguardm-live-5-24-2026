import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import { requireFeature } from "@/lib/require-feature";
import type { Prisma } from "@/lib/generated/prisma/client";
import Link from "next/link";
import { Plus, FileText, Eye, FileEdit, Archive } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import SearchFilter from "@/components/shared/SearchFilter";
import Pagination from "@/components/shared/Pagination";
import BlogPostsTable from "@/components/admin/blog/BlogPostsTable";

export const metadata = { title: "Blog | Admin" };

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; q?: string; status?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const gate = await requireFeature("blog");
  if (gate) return gate;

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const { page: pageStr, limit: limitStr, q, status } = await searchParams;
  const page = Math.max(1, parseInt(pageStr || "1"));
  const limit = Math.max(1, Math.min(100, parseInt(limitStr || "20")));

  const where: Prisma.BlogPostWhereInput = { agencyId };
  if (q) {
    where.title = { contains: q, mode: "insensitive" };
  }
  if (status) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where.status = status as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let posts: any[] = [];
  let filteredCount = 0, totalCount = 0, publishedCount = 0, draftCount = 0, archivedCount = 0;
  let pageError = false;

  try {
    [posts, filteredCount, totalCount, publishedCount, draftCount, archivedCount] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          author: { select: { id: true, name: true, email: true } },
          tags: { include: { tag: true } },
          categories: { include: { category: true } },
        },
      }),
      prisma.blogPost.count({ where }),
      prisma.blogPost.count({ where: { agencyId } }),
      prisma.blogPost.count({ where: { agencyId, status: "PUBLISHED" } }),
      prisma.blogPost.count({ where: { agencyId, status: "DRAFT" } }),
      prisma.blogPost.count({ where: { agencyId, status: "ARCHIVED" } }),
    ]);
  } catch {
    pageError = true;
  }

  /* Serialize dates for the client component */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serializedPosts = posts.map((p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    status: p.status,
    readingTime: p.readingTime,
    publishedAt: p.publishedAt?.toISOString() || null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    author: p.author,
    tags: p.tags.map((t: any) => t.tag),
    categories: p.categories.map((c: any) => c.category),
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">Blog</h1>
          <p className="text-sm text-slate-400 mt-1">Manage blog posts, tags, and categories</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {pageError && (
        <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-sm text-red-400">
          Failed to load blog data. Try refreshing the page.
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Posts" value={totalCount} icon={FileText} accent="cyan" />
        <MetricCard label="Published" value={publishedCount} icon={Eye} accent="emerald" />
        <MetricCard label="Drafts" value={draftCount} icon={FileEdit} accent="amber" />
        <MetricCard label="Archived" value={archivedCount} icon={Archive} accent="slate" />
      </div>

      {/* Search & Filter */}
      <Suspense>
        <SearchFilter
          placeholder="Search by title..."
          statusOptions={[
            { label: "Draft", value: "DRAFT" },
            { label: "Published", value: "PUBLISHED" },
            { label: "Archived", value: "ARCHIVED" },
          ]}
        />
      </Suspense>

      {/* Table */}
      <BlogPostsTable posts={serializedPosts} totalCount={filteredCount} />

      <Suspense>
        <Pagination totalCount={filteredCount} page={page} limit={limit} />
      </Suspense>
    </div>
  );
}
