import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-[60vh] px-5">
      <div className="glass rounded-2xl p-10 md:p-14 text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-emerald/10 flex items-center justify-center mx-auto mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-emerald"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
            <path d="M8 11h6" />
          </svg>
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-emerald text-slate-950 font-display text-sm font-semibold hover:bg-emerald-400 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
