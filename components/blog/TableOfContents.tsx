"use client";

import { useEffect, useState, useMemo } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  const headings = useMemo(() => {
    const items: TocItem[] = [];
    const regex = /^(#{2,4})\s+(.+)$/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].replace(/[*_`\[\]]/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      items.push({ id, text, level });
    }
    return items;
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav className="sticky top-24" aria-label="Table of contents">
      <p className="text-xs font-display font-semibold uppercase tracking-widest text-slate-500 mb-3">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-white/10">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                setActiveId(h.id);
              }}
              className={`block text-sm transition-colors border-l-2 -ml-px ${
                h.level === 3 ? "pl-6" : h.level === 4 ? "pl-9" : "pl-3"
              } py-1 ${
                activeId === h.id
                  ? "border-emerald text-white"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
