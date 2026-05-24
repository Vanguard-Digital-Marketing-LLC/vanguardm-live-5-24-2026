"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/admin/shared/DataTable";
import Badge from "@/components/admin/shared/Badge";

interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  status: string;
  readingTime: number | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author: { id: string; name: string | null; email: string };
  tags: { id: string; name: string; slug: string }[];
  categories: { id: string; name: string; slug: string }[];
}

const STATUS_VARIANT: Record<string, "emerald" | "amber" | "slate"> = {
  PUBLISHED: "emerald",
  DRAFT: "amber",
  ARCHIVED: "slate",
};

interface Props {
  posts: BlogPostRow[];
  totalCount: number;
}

export default function BlogPostsTable({ posts, totalCount }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const columns: Column<BlogPostRow>[] = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-medium text-white truncate max-w-xs">{row.title}</p>
          <p className="text-xs text-slate-500 mt-0.5">/{row.slug}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge label={row.status} variant={STATUS_VARIANT[row.status] || "slate"} />
      ),
    },
    {
      key: "author",
      label: "Author",
      render: (row) => (
        <span className="text-sm text-slate-300">{row.author.name || row.author.email}</span>
      ),
    },
    {
      key: "tags",
      label: "Tags",
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {row.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-cyan-400/10 text-cyan-400"
            >
              {tag.name}
            </span>
          ))}
          {row.tags.length > 3 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/5 text-slate-400">
              +{row.tags.length - 3}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "publishedAt",
      label: "Published",
      sortable: true,
      render: (row) => (
        <span className="text-xs text-slate-500">
          {row.publishedAt
            ? new Date(row.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "--"}
        </span>
      ),
    },
    {
      key: "readingTime",
      label: "Read Time",
      render: (row) => (
        <span className="text-xs text-slate-500">
          {row.readingTime ? `${row.readingTime} min` : "--"}
        </span>
      ),
    },
  ];

  // Paginate client-side since we loaded all posts server-side
  const paginated = posts.slice((page - 1) * pageSize, page * pageSize);

  return (
    <DataTable
      columns={columns}
      data={paginated}
      totalCount={totalCount}
      page={page}
      pageSize={pageSize}
      onPageChange={setPage}
      onRowClick={(row) => router.push(`/admin/blog/${row.id}/edit`)}
    />
  );
}
