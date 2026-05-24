"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useCallback, useRef, useTransition } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface SearchFilterProps {
  placeholder?: string;
  statusOptions?: FilterOption[];
  statusParam?: string;
}

export default function SearchFilter({
  placeholder = "Search...",
  statusOptions,
  statusParam = "status",
}: SearchFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const q = searchParams.get("q") ?? "";
  const currentStatus = searchParams.get(statusParam) ?? "";

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams, startTransition],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        updateParams("q", value);
      }, 300);
    },
    [updateParams],
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          defaultValue={q}
          placeholder={placeholder}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-colors"
        />
      </div>
      {statusOptions && (
        <select
          value={currentStatus}
          onChange={(e) => updateParams(statusParam, e.target.value)}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 appearance-none cursor-pointer"
        >
          <option value="">All statuses</option>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
