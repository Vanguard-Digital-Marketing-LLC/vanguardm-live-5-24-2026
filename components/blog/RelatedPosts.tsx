import { prisma } from "@/lib/db";
import BlogCard from "./BlogCard";

interface RelatedPostsProps {
  currentPostId: string;
  tagIds: string[];
  categoryIds: string[];
}

export default async function RelatedPosts({
  currentPostId,
  tagIds,
  categoryIds,
}: RelatedPostsProps) {
  // If no tags or categories, nothing to match against
  if (tagIds.length === 0 && categoryIds.length === 0) {
    // Fall back to recent posts
    const recentPosts = await prisma.blogPost.findMany({
      where: {
        id: { not: currentPostId },
        status: "PUBLISHED",
      },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: {
        tags: { include: { tag: true } },
        categories: { include: { category: true } },
        author: { select: { name: true } },
      },
    });

    if (recentPosts.length === 0) return null;

    return (
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-white mb-6">
          More Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    );
  }

  // Find posts that share tags or categories with the current post
  const orConditions = [];
  if (tagIds.length > 0) {
    orConditions.push({ tags: { some: { tagId: { in: tagIds } } } });
  }
  if (categoryIds.length > 0) {
    orConditions.push({ categories: { some: { categoryId: { in: categoryIds } } } });
  }

  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      id: { not: currentPostId },
      status: "PUBLISHED",
      OR: orConditions,
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: {
      tags: { include: { tag: true } },
      categories: { include: { category: true } },
      author: { select: { name: true } },
    },
  });

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-bold text-white mb-6">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
