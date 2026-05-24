export default function GlobeCanvasSkeleton() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="w-48 h-48 rounded-full bg-emerald/5 animate-pulse" />
    </div>
  );
}
