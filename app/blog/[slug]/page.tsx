import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site-config";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import BlogContent from "@/components/blog/BlogContent";
import TagChip from "@/components/blog/TagChip";
import ShareButtons from "@/components/blog/ShareButtons";
import AuthorCard from "@/components/blog/AuthorCard";
import RelatedPosts from "@/components/blog/RelatedPosts";
import TableOfContents from "@/components/blog/TableOfContents";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, status: "PUBLISHED" },
    select: {
      title: true,
      metaTitle: true,
      metaDescription: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      tags: { include: { tag: { select: { name: true } } } },
      author: { select: { name: true } },
    },
  });

  if (!post) return {};

  const title = post.metaTitle || post.title;
  const description =
    post.metaDescription || post.excerpt || `Read "${post.title}" on the Vanguard blog.`;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${title} | Vanguard Digital Marketing`,
      description,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: post.author.name ? [post.author.name] : undefined,
      tags: post.tags.map((t) => t.tag.name),
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vanguard Digital Marketing" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Vanguard Digital Marketing`,
      description,
      images: post.coverImage ? [post.coverImage] : ["/og-image.png"],
    },
  };
}


export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });
  return posts.map((post) => ({ slug: post.slug }));
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.blogPost.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: {
        select: {
          name: true,
          authorBio: true,
          authorSlug: true,
          image: true,
        },
      },
      tags: {
        include: {
          tag: { select: { id: true, name: true, slug: true } },
        },
      },
      categories: {
        include: {
          category: { select: { id: true, name: true, slug: true } },
        },
      },
    },
  });

  if (!post) notFound();

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const tagIds = post.tags.map((t) => t.tag.id);
  const categoryIds = post.categories.map((c) => c.category.id);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt || "",
    image: post.coverImage || `${SITE_URL}/og-image.png`,
    author: {
      "@type": "Person",
      name: post.author.name || "Vanguard Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Vanguard Digital Marketing",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
      },
    },
    url: postUrl,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    wordCount: post.content.split(/\s+/).length,
    keywords: post.tags.map((t) => t.tag.name).join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema) }}
      />

      <article className="py-10 md:py-16 px-5 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 md:mb-10 max-w-3xl">
            <Link href="/" className="hover:text-emerald transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-emerald transition-colors">
              Blog
            </Link>
            {post.categories.length > 0 && (
              <>
                <span>/</span>
                <Link
                  href={`/blog/category/${post.categories[0].category.slug}`}
                  className="hover:text-emerald transition-colors"
                >
                  {post.categories[0].category.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-slate-300 truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>

          {/* Cover image */}
          {post.coverImage && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 md:mb-10 max-w-3xl">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8 md:mb-10 max-w-3xl">
            {/* Categories + Tags */}
            {(post.tags.length > 0 || post.categories.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map(({ category }) => (
                  <TagChip
                    key={category.slug}
                    name={category.name}
                    slug={category.slug}
                    type="category"
                  />
                ))}
                {post.tags.map(({ tag }) => (
                  <TagChip key={tag.slug} name={tag.name} slug={tag.slug} />
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-5">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg text-slate-400 leading-relaxed mb-5 max-w-3xl">
                {post.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                {post.author.image ? (
                  <Image
                    src={post.author.image}
                    alt={post.author.name || "Author"}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-emerald/20 flex items-center justify-center text-xs font-display font-bold text-emerald">
                    {(post.author.name || "V")[0].toUpperCase()}
                  </div>
                )}
                <span className="font-display font-medium text-slate-300">
                  {post.author.name || "Vanguard Team"}
                </span>
              </div>

              {post.publishedAt && (
                <>
                  <span className="text-slate-600">|</span>
                  <time dateTime={post.publishedAt.toISOString()}>
                    {formatDate(post.publishedAt)}
                  </time>
                </>
              )}

              {post.readingTime && (
                <>
                  <span className="text-slate-600">|</span>
                  <span>{post.readingTime} min read</span>
                </>
              )}
            </div>
          </header>

          {/* Divider */}
          <div className="border-t border-white/5 mb-8 md:mb-10 max-w-3xl" />

          {/* Content + ToC layout */}
          <div className="flex gap-10">
            {/* Main content */}
            <div className="flex-1 min-w-0 max-w-3xl">
              <BlogContent content={post.content} />
            </div>

            {/* Sidebar ToC - desktop only */}
            <aside className="hidden xl:block w-64 flex-shrink-0">
              <TableOfContents content={post.content} />
            </aside>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 mt-10 mb-8 max-w-3xl" />

          {/* Author bio */}
          <div className="max-w-3xl mb-8">
            <AuthorCard
              name={post.author.name}
              image={post.author.image}
              bio={post.author.authorBio}
              authorSlug={post.author.authorSlug}
            />
          </div>

          {/* Share + Back */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-3xl mb-12">
            <ShareButtons title={post.title} url={postUrl} />

            <Link
              href="/blog"
              className="text-sm text-slate-400 hover:text-emerald transition-colors font-display"
            >
              &larr; Back to Blog
            </Link>
          </div>

          {/* Related Posts */}
          <RelatedPosts
            currentPostId={post.id}
            tagIds={tagIds}
            categoryIds={categoryIds}
          />
        </div>
      </article>
    </>
  );
}
