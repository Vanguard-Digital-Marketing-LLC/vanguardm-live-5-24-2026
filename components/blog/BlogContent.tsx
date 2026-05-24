"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="blog-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 id={headingId(children)} className="font-display text-3xl md:text-4xl font-bold text-white mt-10 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 id={headingId(children)} className="font-display text-2xl md:text-3xl font-bold text-white mt-8 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 id={headingId(children)} className="font-display text-xl md:text-2xl font-semibold text-white mt-6 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 id={headingId(children)} className="font-display text-lg md:text-xl font-semibold text-white mt-5 mb-2">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="font-display text-base md:text-lg font-semibold text-white mt-4 mb-2">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="font-display text-sm md:text-base font-semibold text-slate-300 mt-4 mb-2">
              {children}
            </h6>
          ),
          p: ({ children }) => (
            <p className="text-slate-300 leading-relaxed mb-4">
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-emerald hover:text-emerald-400 underline underline-offset-2 transition-colors"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-white/5 px-1.5 py-0.5 rounded text-emerald-400 text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className={className}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="code-block my-6 overflow-x-auto rounded-xl">
              {children}
            </pre>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-slate-300 space-y-1.5 mb-4 ml-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-slate-300 space-y-1.5 mb-4 ml-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-slate-300 leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-emerald/30 pl-4 my-6 italic text-slate-400">
              {children}
            </blockquote>
          ),
          img: ({ src, alt }) => (
            <span className="block my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt || ""}
                className="rounded-xl max-w-full h-auto border border-white/5"
                loading="lazy"
              />
              {alt && (
                <span className="block text-center text-xs text-slate-500 mt-2">{alt}</span>
              )}
            </span>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-white/10">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-white/5 text-xs font-display uppercase tracking-wider text-slate-400">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-white/5">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-white/5">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-semibold text-slate-300">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-slate-400">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="border-white/10 my-8" />
          ),
          strong: ({ children }) => (
            <strong className="text-white font-semibold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-slate-200 italic">{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

/** Convert heading children to a URL-safe id for anchor links */
function headingId(children: React.ReactNode): string {
  const text = extractText(children);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }
  return "";
}
