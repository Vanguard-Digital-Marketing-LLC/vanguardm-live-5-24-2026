import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import BlogCard from "@/components/blog/BlogCard";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.blogCategory.findFirst({ where: { slug } });
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Articles`,
    description: `Browse our ${category.name.toLowerCase()} articles, guides, and insights.`,
    alternates: { canonical: `/blog/category/${slug}` },
    openGraph: {
      title: `${category.name} Articles | Vanguard Digital Marketing`,
      description: `Browse our ${category.name.toLowerCase()} articles, guides, and insights.`,
      url: `/blog/category/${slug}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${category.name} — Vanguard Digital Marketing Blog`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Articles | Vanguard Digital Marketing`,
      description: `Browse our ${category.name.toLowerCase()} articles, guides, and insights.`,
      images: ["/og-image.png"],
    },
  };
}

const PAGE_SIZE = 12;

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1"));

  const category = await prisma.blogCategory.findFirst({ where: { slug } });
  if (!category) notFound();

  const where = {
    status: "PUBLISHED" as const,
    categories: { some: { categoryId: category.id } },
  };

  const [posts, totalCount] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        tags: { include: { tag: true } },
        categories: { include: { category: true } },
        author: { select: { name: true } },
      },
    }),
    prisma.blogPost.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <main className="pt-24 pb-20 md:pb-32">
      {/* Header */}
      <section className="py-14 md:py-20 px-5 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="text-xs text-slate-500 flex items-center gap-1.5 justify-center mb-4">
            <Link href="/blog" className="hover:text-slate-300 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-400">Category</span>
          </nav>
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2">
            Category
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            {category.name}
          </h1>
          <p className="text-sm text-slate-400">
            {totalCount} article{totalCount !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Post Grid */}
      <section className="px-5 md:px-6">
        <div className="max-w-6xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No articles in this category yet.</p>
              <Link href="/blog" className="text-emerald hover:underline mt-2 inline-block">
                View all articles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="px-5 md:px-6 mt-12">
          <div className="flex justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/blog/category/${slug}?page=${page - 1}`}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                Previous
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog/category/${slug}?page=${p}`}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                  p === page
                    ? "bg-emerald text-slate-950"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {p}
              </Link>
            ))}
            {page < totalPages && (
              <Link
                href={`/blog/category/${slug}?page=${page + 1}`}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
