import Link from "next/link";

interface VanguardLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export default function VanguardLogo({
  size = 28,
  showText = true,
  className = "",
}: VanguardLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      {/* Chevron/Star Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Star — amber accent */}
        <path
          d="M18 0.5l1.55 3.6 3.85.33-2.9 2.55.85 3.77L18 8.7l-3.35 2.05.85-3.77-2.9-2.55 3.85-.33z"
          fill="#f59e0b"
        />
        {/* Inner chevron stripe */}
        <path
          d="M14,13 L18,20.5 L22,13"
          stroke="#10b981"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="miter"
        />
        {/* Middle chevron stripe */}
        <path
          d="M10.5,13 L18,26 L25.5,13"
          stroke="#10b981"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="miter"
        />
        {/* Outer chevron stripe */}
        <path
          d="M7,13 L18,31.5 L29,13"
          stroke="#10b981"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="miter"
        />
      </svg>

      {showText && (
        <span className="font-display text-lg font-bold leading-none text-white">
          VANGUARD<span className="text-emerald"> DIGITAL</span>
        </span>
      )}
    </Link>
  );
}
