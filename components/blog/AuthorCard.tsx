import Image from "next/image";
import Link from "next/link";

interface AuthorCardProps {
  name: string | null;
  image: string | null;
  bio: string | null;
  authorSlug: string | null;
}

export default function AuthorCard({ name, image, bio, authorSlug }: AuthorCardProps) {
  const displayName = name || "Vanguard Team";

  return (
    <div className="glass rounded-2xl p-6 flex items-start gap-4">
      <div className="w-14 h-14 rounded-full bg-emerald/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={displayName}
            width={56}
            height={56}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-emerald font-display font-bold text-xl">
            {displayName.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-slate-500 mb-1">
          Written by
        </p>
        {authorSlug ? (
          <Link
            href={`/blog?author=${authorSlug}`}
            className="font-display text-lg font-bold text-white hover:text-emerald transition-colors"
          >
            {displayName}
          </Link>
        ) : (
          <p className="font-display text-lg font-bold text-white">{displayName}</p>
        )}
        {bio && (
          <p className="text-sm text-slate-400 mt-1 line-clamp-2">{bio}</p>
        )}
      </div>
    </div>
  );
}
