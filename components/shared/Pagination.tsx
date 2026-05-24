"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalCount: number;
  page: number;
  limit: number;
}

export default function Pagination({ totalCount, page, limit }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalCount / limit);

  if (totalPages <= 1) return null;

  function buildHref(targetPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(targetPage));
    return `${pathname}?${params.toString()}`;
  }

  // Show up to 5 page numbers centered around current page
  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-white/6">
      <p className="text-xs text-slate-500">
        Showing {Math.min((page - 1) * limit + 1, totalCount)}-{Math.min(page * limit, totalCount)} of {totalCount}
      </p>
      <div className="flex items-center gap-1">
        {page > 1 && (
          <Link
            href={buildHref(page - 1)}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronLeft size={16} />
          </Link>
        )}
        {pages.map((p) => (
          <Link
            key={p}
            href={buildHref(p)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              p === page
                ? "bg-emerald/20 text-emerald"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {p}
          </Link>
        ))}
        {page < totalPages && (
          <Link
            href={buildHref(page + 1)}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
