"use client";

import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  sortKey?: string;
  sortDir?: "asc" | "desc";
  onSort?: (key: string) => void;
  onRowClick?: (row: T) => void;
  loading?: boolean;
}

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  totalCount,
  page,
  pageSize,
  onPageChange,
  sortKey,
  sortDir,
  onSort,
  onRowClick,
  loading,
}: DataTableProps<T>) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" role="table">
          <thead>
            <tr className="border-b border-white/6">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 ${
                    col.sortable ? "cursor-pointer hover:text-white" : ""
                  } ${col.className || ""}`}
                  onClick={() => col.sortable && onSort?.(col.key)}
                  aria-sort={
                    col.sortable && sortKey === col.key
                      ? sortDir === "asc" ? "ascending" : "descending"
                      : undefined
                  }
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortDir === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length} className="text-center py-8 text-slate-500">Loading...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length} className="text-center py-8 text-slate-500">No data found</td></tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-white/4 hover:bg-white/5 transition-colors ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3 text-sm text-slate-300 ${col.className || ""}`}>
                      {col.render ? col.render(row) : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/6">
          <p className="text-xs text-slate-500">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalCount)} of {totalCount}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              aria-label="Previous page"
              className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-slate-400">Page {page} of {totalPages}</span>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              aria-label="Next page"
              className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
