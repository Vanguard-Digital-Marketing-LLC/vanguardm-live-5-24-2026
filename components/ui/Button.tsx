import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
  onClick?: () => void;
  dataTrack?: string;
  dataTrackCategory?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  dataTrack,
  dataTrackCategory,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-5 py-3 text-xs md:px-7 md:py-3.5 md:text-sm rounded-lg font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-[0.98] active:transition-transform";
  const variants = {
    primary:
      "bg-amber text-slate-950 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber/25",
    outline:
      "border border-emerald/30 text-emerald hover:bg-emerald/10 hover:border-emerald/50",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} data-track={dataTrack} data-track-category={dataTrackCategory}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} data-track={dataTrack} data-track-category={dataTrackCategory}>
      {children}
    </button>
  );
}
