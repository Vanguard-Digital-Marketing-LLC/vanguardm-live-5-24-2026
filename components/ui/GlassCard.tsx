interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div className={`glass rounded-2xl p-5 md:p-6 transition-all duration-300 hover:border-white/15 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 ${className}`}>
      {children}
    </div>
  );
}
