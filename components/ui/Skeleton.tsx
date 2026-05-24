// ── Skeleton Primitives ───────────────────────
// Base shimmer components for loading states.

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export function Skeleton({ className = "", width, height }: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer rounded ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton-shimmer rounded h-3"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

export function SkeletonCircle({ size = 40 }: { size?: number }) {
  return (
    <div
      className="skeleton-shimmer rounded-full"
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}

/** Admin MetricCard loading skeleton */
export function SkeletonCard() {
  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl p-6" aria-hidden="true">
      <div className="skeleton-shimmer w-10 h-10 rounded-lg mb-4" />
      <div className="skeleton-shimmer h-7 w-16 rounded mb-2" />
      <div className="skeleton-shimmer h-4 w-24 rounded" />
    </div>
  );
}

/** DataTable loading skeleton */
export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-[#111827] border border-white/6 rounded-xl overflow-hidden" aria-hidden="true">
      <div className="border-b border-white/6 px-4 py-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="skeleton-shimmer h-3 rounded flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="border-b border-white/4 px-4 py-3 flex gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className="skeleton-shimmer h-4 rounded flex-1"
              style={{ opacity: 0.7 - r * 0.1 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Course card loading skeleton */
export function SkeletonCourseCard() {
  return (
    <div className="glass rounded-2xl p-5 md:p-6" aria-hidden="true">
      <div className="skeleton-shimmer w-12 h-12 rounded-xl mb-4" />
      <div className="skeleton-shimmer h-5 w-3/4 rounded mb-3" />
      <div className="space-y-2 mb-4">
        <div className="skeleton-shimmer h-3 w-full rounded" />
        <div className="skeleton-shimmer h-3 w-5/6 rounded" />
      </div>
      <div className="skeleton-shimmer h-3 w-20 rounded" />
    </div>
  );
}

/** Spinner for inline loading */
export function Spinner({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`animate-spin-smooth ${className}`}
      aria-label="Loading"
      role="status"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.2" />
      <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
