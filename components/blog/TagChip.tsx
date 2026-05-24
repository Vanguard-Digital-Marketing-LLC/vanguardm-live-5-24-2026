import Link from "next/link";

interface TagChipProps {
  name: string;
  slug: string;
  type?: "tag" | "category";
}

export default function TagChip({ name, slug, type = "tag" }: TagChipProps) {
  const href = type === "category" ? `/blog/category/${slug}` : `/blog/tag/${slug}`;

  return (
    <Link
      href={href}
      className="inline-block px-2.5 py-1 rounded-full border border-white/10 text-xs text-slate-400 hover:text-emerald hover:border-emerald/30 transition-colors duration-200"
    >
      {name}
    </Link>
  );
}
