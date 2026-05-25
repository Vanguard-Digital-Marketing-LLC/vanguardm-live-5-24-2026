import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/json-ld";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/site-config";
import BlogCard from "@/components/blog/BlogCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Digital marketing insights, SEO strategies, web design tips, and agency growth tactics from the Vanguard team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Vanguard Digital Marketing",
    description:
      "Digital marketing insights, SEO strategies, web design tips, and agency growth tactics from the Vanguard team.",
    url: "/blog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vanguard Digital Marketing Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Vanguard Digital Marketing",
    description:
      "Digital marketing insights, SEO strategies, web design tips, and agency growth tactics from the Vanguard team.",
  },
};

const PAGE_SIZE = 12;

interface BlogPageProps {
  searchParams: Promise<{ page?: string; q?: string; category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1"));
  const search = params.q?.trim() || "";
  const categorySlug = params.category || "";

  // Build where clause
  const where: Record<string, unknown> = { status: "PUBLISHED" as const };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  if (categorySlug) {
    where.categories = {
      some: { category: { slug: categorySlug } },
    };
  }

  const [posts, totalCount, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        tags: { include: { tag: { select: { name: true, slug: true } } } },
        categories: { include: { category: { select: { name: true, slug: true } } } },
        author: { select: { name: true } },
      },
    }),
    prisma.blogPost.count({ where }),
    prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Vanguard Digital Marketing Blog",
    description:
      "Digital marketing insights, SEO strategies, web design tips, and agency growth tactics from the Vanguard team.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Vanguard Digital Marketing",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalCount,
      itemListElement: posts.slice(0, 10).map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(blogJsonLd) }}
      />
      <section className="py-14 md:py-24 px-5 md:px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-emerald mb-2 md:mb-3">
          Vanguard Blog
        </p>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
          Insights &amp; <span className="text-amber">Strategy</span>
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
          Actionable digital marketing insights, industry trends, and proven
          strategies from our team of experts.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-5xl mx-auto mb-6">
        <form method="GET" action="/blog" className="flex gap-3 max-w-lg mx-auto">
          {categorySlug && (
            <input type="hidden" name="category" value={categorySlug} />
          )}
          <input
            type="text"
            name="q"
            defaultValue={search}
            placeholder="Search articles..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald/40 transition-colors"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald text-slate-950 font-display text-sm font-semibold hover:bg-emerald-400 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-display font-semibold transition-colors duration-200 ${
                !categorySlug
                  ? "bg-emerald text-slate-900"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug}`}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-display font-semibold transition-colors duration-200 ${
                  categorySlug === cat.slug
                    ? "bg-emerald text-slate-900"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {cat.name}
                <span className="ml-1.5 text-[10px] opacity-60">{cat._count.posts}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Search result count */}
      {search && (
        <div className="max-w-6xl mx-auto mb-6">
          <p className="text-sm text-slate-400">
            {totalCount} result{totalCount !== 1 ? "s" : ""} for{" "}
            <span className="text-white font-medium">&ldquo;{search}&rdquo;</span>
            {" "}
            <Link href="/blog" className="text-emerald hover:underline ml-2">
              Clear
            </Link>
          </p>
        </div>
      )}

      {/* Posts grid */}
      {posts.length > 0 ? (
        <div className="max-w-6xl mx-auto grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center glass rounded-2xl p-8 md:p-12">
          <div className="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center mx-auto mb-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-emerald"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <h2 className="font-display text-lg font-bold mb-2">
            {search ? "No Results" : "Coming Soon"}
          </h2>
          <p className="text-sm text-slate-400">
            {search ? (
              <>
                No articles match your search.{" "}
                <Link href="/blog" className="text-emerald hover:underline">
                  View all articles
                </Link>
              </>
            ) : (
              "We're working on our first articles. Check back soon for expert insights on digital marketing, SEO, PPC, and more."
            )}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-6xl mx-auto mt-12">
          <div className="flex justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/blog?page=${page - 1}${search ? `&q=${search}` : ""}${categorySlug ? `&category=${categorySlug}` : ""}`}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                Previous
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?page=${p}${search ? `&q=${search}` : ""}${categorySlug ? `&category=${categorySlug}` : ""}`}
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
                href={`/blog?page=${page + 1}${search ? `&q=${search}` : ""}${categorySlug ? `&category=${categorySlug}` : ""}`}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                Next
              </Link>
            )}
          </div>
          <p className="text-center text-xs text-slate-600 mt-3">
            Page {page} of {totalPages} ({totalCount} article{totalCount !== 1 ? "s" : ""})
          </p>
        </div>
      )}
    </section>
    </>
  );
}
