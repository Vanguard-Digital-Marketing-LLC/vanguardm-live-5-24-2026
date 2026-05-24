export default function FrontendSeo() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Why Frontend SEO Matters
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Frontend SEO is the practice of optimizing the HTML elements that
          search engines read directly from your page source. While backend SEO
          deals with server configuration and crawling, frontend SEO focuses on
          what appears in the <code className="text-amber text-xs bg-white/5 px-1.5 py-0.5 rounded">&lt;head&gt;</code> and{" "}
          <code className="text-amber text-xs bg-white/5 px-1.5 py-0.5 rounded">&lt;body&gt;</code> of
          your HTML. Getting these elements right is the foundation of how search
          engines understand, index, and display your pages.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Title Tags
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The <code className="text-amber text-xs bg-white/5 px-1.5 py-0.5 rounded">&lt;title&gt;</code> tag
          is the single most important on-page SEO element. It appears in the
          browser tab, in search engine results as the clickable headline, and
          when shared on social media.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-2">
              Best Practices
            </h3>
            <ul className="space-y-1.5 text-xs md:text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">&#10003;</span>
                <span>Keep it under 60 characters so it doesn&apos;t get truncated</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">&#10003;</span>
                <span>Put the primary keyword near the beginning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">&#10003;</span>
                <span>Make each page&apos;s title unique across your site</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">&#10003;</span>
                <span>Include your brand name (usually at the end)</span>
              </li>
            </ul>
          </div>
          <pre className="code-block">
{`<title>SEO Fundamentals Course | Vanguard Academy</title>`}
          </pre>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Meta Descriptions
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The meta description is the snippet of text that appears below the
          title in search results. While it&apos;s not a direct ranking factor,
          a compelling description improves your click-through rate (CTR), which
          indirectly helps SEO.
        </p>
        <div className="glass rounded-xl p-4 mb-3">
          <h3 className="font-display font-semibold text-amber mb-2">
            Best Practices
          </h3>
          <ul className="space-y-1.5 text-xs md:text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Keep between 150-160 characters</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Include a clear call-to-action</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Naturally include your target keyword</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Accurately summarize the page content</span>
            </li>
          </ul>
        </div>
        <pre className="code-block">
{`<meta
  name="description"
  content="Learn SEO basics — how search engines crawl,
  index, and rank pages. Free interactive course with
  quiz."
/>`}
        </pre>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Open Graph Tags
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Open Graph (OG) tags control how your page appears when shared on
          social media platforms like Facebook, LinkedIn, and Twitter/X. Without
          them, platforms guess what to display — often with poor results.
        </p>
        <pre className="code-block">
{`<!-- Open Graph / Social Media -->
<meta property="og:type" content="website" />
<meta property="og:title" content="SEO Fundamentals Course" />
<meta property="og:description"
  content="Learn the basics of SEO with our free
  interactive course." />
<meta property="og:image"
  content="https://example.com/og-image.jpg" />
<meta property="og:url"
  content="https://example.com/academy/seo-fundamentals" />

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="SEO Fundamentals Course" />
<meta name="twitter:description"
  content="Learn the basics of SEO with our free
  interactive course." />
<meta name="twitter:image"
  content="https://example.com/og-image.jpg" />`}
        </pre>
        <div className="glass rounded-xl p-4 mt-3">
          <h3 className="font-display font-semibold text-amber mb-2">
            OG Image Tips
          </h3>
          <ul className="space-y-1.5 text-xs md:text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Use 1200 x 630 pixels for optimal display</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Keep important text in the center (platforms may crop edges)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Use absolute URLs, not relative paths</span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Structured Data (Schema.org)
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Structured data is code (typically JSON-LD) that you add to your pages
          to help search engines understand the content. It powers rich results
          like star ratings, FAQ dropdowns, recipe cards, and more.
        </p>
        <div className="glass rounded-xl p-4 mb-3">
          <h3 className="font-display font-semibold text-amber mb-2">
            Common Schema Types
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-400">
            <div className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong className="text-slate-300">Article</strong> — Blog posts, news articles</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong className="text-slate-300">LocalBusiness</strong> — Physical businesses</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong className="text-slate-300">FAQPage</strong> — Frequently asked questions</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong className="text-slate-300">Product</strong> — E-commerce products</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong className="text-slate-300">BreadcrumbList</strong> — Navigation trails</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong className="text-slate-300">Organization</strong> — Company info &amp; logo</span>
            </div>
          </div>
        </div>
        <pre className="code-block">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "SEO Fundamentals",
  "description": "Learn the basics of SEO...",
  "author": {
    "@type": "Organization",
    "name": "Vanguard Marketing"
  },
  "datePublished": "2026-01-15"
}
</script>`}
        </pre>
        <div className="glass rounded-xl p-4 mt-3">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Tip:</strong> Use{" "}
            <a
              href="https://search.google.com/test/rich-results"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s Rich Results Test
            </a>{" "}
            to validate your structured data before deploying.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Canonical URLs
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          A canonical tag tells search engines which version of a page is the
          &quot;master&quot; copy. This prevents duplicate content issues when
          the same page is accessible via multiple URLs (e.g., with query
          parameters, trailing slashes, or www vs non-www).
        </p>
        <pre className="code-block">
{`<link rel="canonical"
  href="https://example.com/academy/frontend-seo" />`}
        </pre>
        <div className="space-y-3 mt-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-2">
              When to Use Canonical Tags
            </h3>
            <ul className="space-y-1.5 text-xs md:text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">&#10003;</span>
                <span>Same content accessible via multiple URLs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">&#10003;</span>
                <span>HTTP and HTTPS versions of the same page</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">&#10003;</span>
                <span>Pages with sorting/filtering query parameters</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">&#10003;</span>
                <span>Syndicated or cross-posted content</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Robots Meta Tag
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The robots meta tag controls whether search engines should index a page
          and follow its links. It&apos;s placed in the{" "}
          <code className="text-amber text-xs bg-white/5 px-1.5 py-0.5 rounded">&lt;head&gt;</code>.
        </p>
        <pre className="code-block">
{`<!-- Allow indexing and link following (default) -->
<meta name="robots" content="index, follow" />

<!-- Prevent indexing but follow links -->
<meta name="robots" content="noindex, follow" />

<!-- Prevent indexing and don't follow links -->
<meta name="robots" content="noindex, nofollow" />`}
        </pre>
        <div className="glass rounded-xl p-4 mt-3">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Warning:</strong> Never use{" "}
            <code className="text-amber bg-white/5 px-1 py-0.5 rounded">noindex</code> on
            pages you want to rank. It&apos;s typically used for admin pages,
            staging environments, or thin/duplicate content.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Complete Head Example
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Here&apos;s a complete example putting all the frontend SEO elements
          together:
        </p>
        <pre className="code-block">
{`<head>
  <meta charset="UTF-8" />
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0" />

  <!-- SEO Essentials -->
  <title>Frontend SEO Guide | Vanguard Academy</title>
  <meta name="description"
    content="Master HTML meta tags for SEO — title tags,
    Open Graph, structured data, and canonical URLs." />
  <link rel="canonical"
    href="https://vanguardm.com/academy/frontend-seo" />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:title"
    content="Frontend SEO Guide" />
  <meta property="og:description"
    content="Master HTML meta tags for SEO." />
  <meta property="og:image"
    content="https://vanguardm.com/og/frontend-seo.jpg" />
  <meta property="og:url"
    content="https://vanguardm.com/academy/frontend-seo" />

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Frontend SEO Guide",
    "author": {
      "@type": "Organization",
      "name": "Vanguard Marketing"
    }
  }
  </script>
</head>`}
        </pre>
      </section>

      <section>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Sources:</strong>{" "}
            <a
              href="https://developers.google.com/search/docs/appearance/title-link"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google — Title Links
            </a>
            {" · "}
            <a
              href="https://developers.google.com/search/docs/appearance/snippet"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google — Meta Descriptions
            </a>
            {" · "}
            <a
              href="https://ogp.me/"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Graph Protocol
            </a>
            {" · "}
            <a
              href="https://schema.org/"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schema.org
            </a>
            {" · "}
            <a
              href="https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google — Canonical URLs
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
