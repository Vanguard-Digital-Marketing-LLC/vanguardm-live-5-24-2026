import Link from "next/link";
import Image from "next/image";

interface BlogCardPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  readingTime: number | null;
  author: {
    name: string | null;
  };
  tags: {
    tag: {
      name: string;
      slug: string;
    };
  }[];
}

interface BlogCardProps {
  post: BlogCardPost;
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/15 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20"
    >
      {/* Cover image area */}
      <div className="relative w-full h-[240px] overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald/10 via-slate-900 to-amber/5 flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-slate-700"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 3).map(({ tag }) => (
              <span
                key={tag.slug}
                className="px-2 py-0.5 rounded-full border border-white/10 text-[10px] text-slate-500 font-display uppercase tracking-wider"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-display text-lg md:text-xl font-bold text-white group-hover:text-emerald transition-colors duration-200 mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        )}

        {/* Footer: Author + Reading time + Date */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-white/5">
          <span className="font-display font-medium">
            {post.author.name || "Vanguard Team"}
          </span>
          <div className="flex items-center gap-3">
            {post.readingTime && (
              <span>{post.readingTime} min read</span>
            )}
            {post.publishedAt && (
              <span>{formatDate(post.publishedAt)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
