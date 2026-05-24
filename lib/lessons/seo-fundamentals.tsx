export default function SeoFundamentals() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          What Is SEO?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Search Engine Optimization (SEO) is the practice of improving your
          website to increase its visibility in search engine results pages
          (SERPs). When people search for products or services related to your
          business, you want your site to appear as high as possible.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Source:</strong>{" "}
            <a
              href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Search Central — SEO Starter Guide
            </a>
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          How Search Engines Work
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Search engines like Google use automated programs called{" "}
          <strong>crawlers</strong> (or spiders) to discover and scan websites.
          The process has three main stages:
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              1. Crawling
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Google discovers pages by following links from known pages and
              reading sitemaps. The crawler (Googlebot) downloads text, images,
              and videos.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              2. Indexing
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Google analyzes the content, catalogs images and videos, and stores
              it in the Google Index — a massive database of web pages.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              3. Serving / Ranking
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              When someone searches, Google pulls the most relevant results from
              its index and ranks them based on hundreds of factors.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Key Ranking Factors
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          While Google uses over 200 ranking factors, these are the most
          impactful:
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Content Quality</strong> — Relevant, comprehensive, and
              original content that satisfies user intent
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Backlinks</strong> — Links from other reputable websites
              pointing to your pages
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Page Experience</strong> — Fast loading, mobile-friendly,
              secure (HTTPS), no intrusive interstitials
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>On-Page SEO</strong> — Proper title tags, meta
              descriptions, headings, and internal links
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>E-E-A-T</strong> — Experience, Expertise,
              Authoritativeness, and Trustworthiness
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Keywords &amp; Search Intent
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Keywords are the words and phrases people type into search engines.
          Understanding <strong>search intent</strong> — what the user actually
          wants — is critical.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Informational
            </h3>
            <p className="text-xs text-slate-400">
              &quot;what is SEO&quot; — User wants to learn
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Navigational
            </h3>
            <p className="text-xs text-slate-400">
              &quot;Google Search Console&quot; — User wants a specific site
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Commercial
            </h3>
            <p className="text-xs text-slate-400">
              &quot;best SEO tools 2026&quot; — User is researching options
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Transactional
            </h3>
            <p className="text-xs text-slate-400">
              &quot;buy Ahrefs subscription&quot; — User is ready to act
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Getting Started with SEO
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Here are 5 actions you can take today to improve your SEO:
        </p>
        <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
          <li>Submit your sitemap to Google Search Console</li>
          <li>
            Ensure every page has a unique title tag and meta description
          </li>
          <li>Use proper heading hierarchy (H1 &rarr; H2 &rarr; H3)</li>
          <li>
            Optimize images with descriptive alt text and compressed file sizes
          </li>
          <li>Build internal links between related pages on your site</li>
        </ol>
        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Sources:</strong>{" "}
            <a
              href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google SEO Starter Guide
            </a>
            {" · "}
            <a
              href="https://developers.google.com/search/docs/crawling-indexing/overview"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Crawling &amp; Indexing
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
