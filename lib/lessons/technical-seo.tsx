export default function TechnicalSeoLesson() {
  return (
    <div className="space-y-10">
      {/* 1. What is Technical SEO */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          What is Technical SEO?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Technical SEO is the behind-the-scenes optimization that ensures search engines can
          efficiently crawl, understand, and index your website. While on-page SEO focuses on
          content and keywords, technical SEO deals with the infrastructure &mdash; your
          site&apos;s speed, security, mobile-friendliness, and overall architecture.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Think of it like building a house: on-page SEO is the interior design that makes it
          appealing, while technical SEO is the foundation, plumbing, and electrical work that
          makes everything function properly. Without a solid technical foundation, even the
          best content can struggle to rank.
        </p>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Key Areas of Technical SEO
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>Crawlability</strong> &mdash; Can search engines find and access your pages?</li>
            <li><strong>Indexability</strong> &mdash; Are your pages being added to the search index?</li>
            <li><strong>Renderability</strong> &mdash; Can search engines render your JavaScript content?</li>
            <li><strong>Site Speed</strong> &mdash; Does your site load quickly on all devices?</li>
            <li><strong>Security</strong> &mdash; Is your site served over HTTPS?</li>
            <li><strong>Mobile-friendliness</strong> &mdash; Does your site work well on mobile devices?</li>
          </ul>
        </div>
      </section>

      {/* 2. Crawl Budget */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Crawl Budget
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Crawl budget is the number of pages a search engine bot (like Googlebot) will crawl
          on your site within a given timeframe. Google allocates a crawl budget to every site
          based on two factors: <strong>crawl rate limit</strong> (how fast it can crawl without
          overloading your server) and <strong>crawl demand</strong> (how much Google wants to
          crawl your site based on popularity and freshness).
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          For small sites (under a few thousand pages), crawl budget is rarely a concern.
          However, for large sites with tens of thousands of pages, inefficient crawl budget
          usage can mean important pages never get indexed.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Why Crawl Budget Matters
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li>Pages that aren&apos;t crawled can&apos;t be indexed or ranked</li>
            <li>Wasting crawl budget on low-value pages delays discovery of important content</li>
            <li>Duplicate content and infinite URL parameters consume crawl budget</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            How to Optimize Crawl Budget
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li>Remove or noindex low-quality and duplicate pages</li>
            <li>Fix broken links and redirect chains</li>
            <li>Use robots.txt to block unimportant sections (e.g., admin pages, filters)</li>
            <li>Keep your XML sitemap updated with only canonical, indexable URLs</li>
            <li>Improve server response times to allow faster crawling</li>
            <li>Use internal linking to guide crawlers to your most important pages</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs text-slate-500">
            Source: <a href="https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Google Search Central &mdash; Managing Crawl Budget</a>
          </p>
        </div>
      </section>

      {/* 3. XML Sitemaps */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          XML Sitemaps
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          An XML sitemap is a file that lists all the important URLs on your website, helping
          search engines discover and understand your site&apos;s structure. It acts like a
          roadmap, telling crawlers which pages exist, when they were last updated, how often
          they change, and their relative priority.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            XML Sitemap Structure
          </h3>
          <pre className="code-block text-xs md:text-sm overflow-x-auto">{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2025-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`}</pre>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Best Practices for XML Sitemaps
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li>Only include canonical, indexable URLs (200 status code)</li>
            <li>Keep sitemaps under 50,000 URLs or 50MB uncompressed</li>
            <li>Use sitemap index files for large sites with multiple sitemaps</li>
            <li>Update <code className="text-emerald">&lt;lastmod&gt;</code> dates only when content actually changes</li>
            <li>Reference your sitemap in robots.txt</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            How to Submit to Google
          </h3>
          <ol className="text-sm md:text-base text-slate-300 leading-relaxed list-decimal list-inside space-y-1">
            <li>Go to Google Search Console</li>
            <li>Select your property</li>
            <li>Navigate to Sitemaps in the left sidebar</li>
            <li>Enter your sitemap URL (e.g., <code className="text-emerald">https://example.com/sitemap.xml</code>)</li>
            <li>Click Submit</li>
          </ol>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-slate-500">
            Source: <a href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Google Search Central &mdash; Sitemaps Overview</a>
          </p>
        </div>
      </section>

      {/* 4. Robots.txt */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Robots.txt
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          The robots.txt file is a plain text file placed in your site&apos;s root directory that
          tells search engine crawlers which URLs they can and cannot access. It uses the
          Robots Exclusion Protocol to communicate crawling instructions.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Basic Syntax
          </h3>
          <pre className="code-block text-xs md:text-sm overflow-x-auto">{`# Allow all crawlers access to everything
User-agent: *
Allow: /

# Block all crawlers from everything
User-agent: *
Disallow: /

# Block specific crawler
User-agent: BadBot
Disallow: /`}</pre>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Common Patterns
          </h3>
          <pre className="code-block text-xs md:text-sm overflow-x-auto">{`# Block admin and private areas
User-agent: *
Disallow: /admin/
Disallow: /private/
Disallow: /tmp/

# Block search results pages (saves crawl budget)
Disallow: /search?
Disallow: /*?sort=
Disallow: /*?filter=

# Block specific file types
Disallow: /*.pdf$

# Allow specific crawler full access
User-agent: Googlebot
Allow: /

# Point to sitemap
Sitemap: https://example.com/sitemap.xml`}</pre>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Important Notes
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li>robots.txt is a <strong>suggestion</strong>, not a security measure &mdash; malicious bots may ignore it</li>
            <li>Disallowed pages can still appear in search results if other sites link to them</li>
            <li>To truly prevent indexing, use a <code className="text-emerald">noindex</code> meta tag instead</li>
            <li>Always test your robots.txt with Google Search Console&apos;s robots.txt Tester</li>
            <li>The file must be at the root: <code className="text-emerald">https://example.com/robots.txt</code></li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-slate-500">
            Source: <a href="https://developers.google.com/search/docs/crawling-indexing/robots/intro" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Google Search Central &mdash; Robots.txt Introduction</a>
          </p>
        </div>
      </section>

      {/* 5. Core Web Vitals */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Web Vitals
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Core Web Vitals are a set of specific metrics that Google uses to measure real-world
          user experience on your website. They are part of Google&apos;s page experience signals
          and directly influence search rankings. There are three Core Web Vitals:
        </p>

        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            LCP &mdash; Largest Contentful Paint
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            Measures <strong>loading performance</strong>. LCP marks the point when the largest
            content element (image, video, or text block) becomes visible in the viewport. It
            tells you how quickly users see the main content of your page.
          </p>
          <ul className="text-sm text-slate-300 list-disc list-inside space-y-1">
            <li className="text-emerald">Good: 2.5 seconds or less</li>
            <li className="text-amber">Needs Improvement: 2.5 &ndash; 4.0 seconds</li>
            <li className="text-red-400">Poor: More than 4.0 seconds</li>
          </ul>
        </div>

        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            INP &mdash; Interaction to Next Paint
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            Measures <strong>interactivity</strong>. INP observes the latency of all click, tap,
            and keyboard interactions throughout the page lifecycle and reports the worst-case
            interaction (excluding outliers). It replaced FID (First Input Delay) in March 2024.
          </p>
          <ul className="text-sm text-slate-300 list-disc list-inside space-y-1">
            <li className="text-emerald">Good: 200 milliseconds or less</li>
            <li className="text-amber">Needs Improvement: 200 &ndash; 500 milliseconds</li>
            <li className="text-red-400">Poor: More than 500 milliseconds</li>
          </ul>
        </div>

        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            CLS &mdash; Cumulative Layout Shift
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            Measures <strong>visual stability</strong>. CLS quantifies how much the page layout
            unexpectedly shifts during loading. Have you ever tried to click a button and the
            page jumped, causing you to click something else? That&apos;s layout shift.
          </p>
          <ul className="text-sm text-slate-300 list-disc list-inside space-y-1">
            <li className="text-emerald">Good: 0.1 or less</li>
            <li className="text-amber">Needs Improvement: 0.1 &ndash; 0.25</li>
            <li className="text-red-400">Poor: More than 0.25</li>
          </ul>
        </div>

        <div className="glass rounded-xl p-4">
          <p className="text-xs text-slate-500">
            Source: <a href="https://web.dev/articles/vitals" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">web.dev &mdash; Web Vitals</a>
          </p>
        </div>
      </section>

      {/* 6. HTTPS & Security */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          HTTPS &amp; Security
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          HTTPS (HyperText Transfer Protocol Secure) encrypts the connection between a
          user&apos;s browser and your web server. Google confirmed HTTPS as a ranking signal
          back in 2014, and it has been part of the page experience signals ever since.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Why HTTPS Matters for SEO
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>Ranking signal</strong> &mdash; Google gives a minor ranking boost to HTTPS sites</li>
            <li><strong>User trust</strong> &mdash; Browsers show &ldquo;Not Secure&rdquo; warnings on HTTP pages</li>
            <li><strong>Referral data</strong> &mdash; HTTPS preserves referrer data in analytics; HTTP loses it</li>
            <li><strong>Required for modern features</strong> &mdash; Service workers, HTTP/2, geolocation, and many browser APIs require HTTPS</li>
            <li><strong>Data integrity</strong> &mdash; Prevents third parties from injecting ads or malware into your pages</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            HTTPS Migration Best Practices
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li>Use 301 redirects from all HTTP URLs to their HTTPS equivalents</li>
            <li>Update internal links to use HTTPS</li>
            <li>Update your canonical tags to HTTPS</li>
            <li>Update your XML sitemap with HTTPS URLs</li>
            <li>Ensure no mixed content (HTTP resources loaded on HTTPS pages)</li>
            <li>Add the HTTPS property to Google Search Console</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-slate-500">
            Source: <a href="https://developers.google.com/search/docs/crawling-indexing/http-https" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Google Search Central &mdash; Secure Your Site with HTTPS</a>
          </p>
        </div>
      </section>

      {/* 7. Site Architecture */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Site Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Site architecture refers to how your website&apos;s pages are organized and linked
          together. A well-planned structure helps search engines understand the hierarchy and
          relationships between pages, distributes link equity effectively, and makes it easy
          for users to find what they need.
        </p>

        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Flat vs. Deep Architecture
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            <strong>Flat architecture</strong> means every page is reachable within 2&ndash;3 clicks
            from the homepage. This is generally better for SEO because crawlers can discover all
            pages quickly and link equity flows efficiently.
          </p>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            <strong>Deep architecture</strong> buries pages 4+ clicks from the homepage. Pages deep
            in the hierarchy receive less crawl attention and less link equity, making them harder
            to rank.
          </p>
          <pre className="code-block text-xs md:text-sm overflow-x-auto">{`# Flat (recommended)
example.com/
example.com/category/
example.com/category/page-name/

# Deep (avoid)
example.com/
example.com/section/
example.com/section/subsection/
example.com/section/subsection/category/
example.com/section/subsection/category/page-name/`}</pre>
        </div>

        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            URL Structure Best Practices
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li>Use short, descriptive, keyword-rich URLs</li>
            <li>Use hyphens to separate words (not underscores)</li>
            <li>Use lowercase letters only</li>
            <li>Avoid URL parameters when possible</li>
            <li>Include a logical hierarchy: <code className="text-emerald">/category/page-name</code></li>
            <li>Avoid stop words (a, the, and, of) in URLs</li>
            <li>Keep URLs under 60&ndash;70 characters when possible</li>
          </ul>
        </div>

        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Internal Linking for Architecture
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Use internal links strategically to create a clear hierarchy. Link from high-authority
            pages (like your homepage) to important category pages, and from category pages to
            individual content. Use descriptive anchor text that includes relevant keywords. This
            helps both users and search engines navigate your site and understand page relationships.
          </p>
        </div>

        <div className="glass rounded-xl p-4">
          <p className="text-xs text-slate-500">
            Source: <a href="https://developers.google.com/search/docs/crawling-indexing/url-structure" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Google Search Central &mdash; URL Structure</a>
          </p>
        </div>
      </section>
    </div>
  );
}
