export default function HowToSetUpSearchConsole() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          What Is Google Search Console?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Google Search Console (GSC) is a free tool from Google that shows you
          how your website appears in search results. It tells you which queries
          bring people to your site, how often your pages appear in search, and
          whether Google can properly crawl and index your content.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Unlike Google Analytics which tracks what users do on your site, Search
          Console tracks how Google sees your site. It surfaces crawl errors,
          mobile usability issues, security problems, and indexing status — all
          the technical SEO signals that determine whether your pages can rank.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Key Capabilities
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; See which search queries drive impressions and clicks</li>
            <li>&#10003; Monitor indexing status of all your pages</li>
            <li>&#10003; Submit sitemaps for faster discovery</li>
            <li>&#10003; Identify and fix crawl errors</li>
            <li>&#10003; Check mobile usability and Core Web Vitals</li>
            <li>&#10003; Request re-indexing of updated pages</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Verifying Your Website
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Before Search Console shows you any data, you must prove you own the
          website. Go to search.google.com/search-console and click &quot;Add
          Property.&quot; You&apos;ll choose between two property types.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Domain Property (Recommended)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Covers all URLs across all subdomains (www, blog, m) and both
              http and https. Requires DNS verification — you add a TXT record
              at your domain registrar. This is the most comprehensive option.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              URL Prefix Property
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Only tracks URLs beginning with the exact prefix you enter (e.g.,
              https://example.com/). Offers multiple verification methods: HTML
              file upload, HTML meta tag, Google Analytics, or Google Tag
              Manager. Easier to set up but less comprehensive.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          For DNS verification, copy the TXT record GSC provides, log into your
          domain registrar (GoDaddy, Namecheap, Cloudflare, etc.), and add it as
          a DNS TXT record. Verification typically completes within minutes but
          can take up to 48 hours for DNS propagation.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Submitting Your Sitemap
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          A sitemap is an XML file that lists all the important pages on your
          website. Submitting it to Search Console helps Google discover and
          crawl your pages faster.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            How to Submit
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>1. Generate a sitemap (most CMS platforms do this automatically)</li>
            <li>2. Verify it&apos;s accessible at yourdomain.com/sitemap.xml</li>
            <li>3. In Search Console, go to Sitemaps in the left sidebar</li>
            <li>4. Enter the sitemap URL and click Submit</li>
            <li>5. Wait for the status to change to &quot;Success&quot;</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Important: submitting a sitemap does not guarantee indexing. Google
          evaluates each URL for quality, uniqueness, and crawlability before
          deciding whether to include it in its index. If pages aren&apos;t
          getting indexed, the issue is usually content quality, duplicate
          content, or technical barriers — not the sitemap itself.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Your sitemap should only include pages you want indexed. Exclude
          thank-you pages, admin pages, paginated archives, and any thin or
          duplicate content. Keep it under 50,000 URLs and 50MB.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          The Performance Report
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The Performance report is the most valuable section of Search Console.
          It shows you exactly how your site appears in Google Search results
          with four key metrics.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Total Clicks
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              How many times users clicked through to your site from search
              results. This is your organic traffic volume from Google.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Total Impressions
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              How many times your pages appeared in search results, whether or
              not someone clicked. High impressions with low clicks means your
              titles and descriptions need improvement.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Average CTR
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Click-through rate: clicks divided by impressions. Tells you how
              compelling your search listings are. A CTR below 2-3% for
              non-branded queries suggests your titles or meta descriptions need
              work.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Average Position
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Your average ranking position for a given query. Position 1 is
              the top spot. Focus on queries in positions 5-15 — these are
              within striking distance of page one and often need small
              improvements to break through.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Use the Queries tab to find your top search terms. Use the Pages tab
          to see which pages drive the most traffic. Filter by date range,
          country, device, and search type (web, image, video) to dig deeper.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          URL Inspection &amp; Coverage
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The URL Inspection tool shows exactly how Google sees a specific page
          on your site. Paste any URL from your property into the search bar at
          the top of Search Console.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            What URL Inspection Shows
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; Whether the URL is indexed or not (and why)</li>
            <li>&#10003; When Google last crawled the page</li>
            <li>&#10003; Whether the page is mobile-friendly</li>
            <li>&#10003; Detected structured data (schema markup) and any errors</li>
            <li>&#10003; The canonical URL Google selected</li>
            <li>&#10003; Option to request re-indexing for updated content</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          The Pages report (formerly &quot;Coverage&quot;) gives a site-wide
          view of indexing status. It categorizes all discovered URLs into four
          groups: Valid (indexed), Valid with warnings, Error (not indexed due to
          problems), and Excluded (intentionally not indexed, like noindex pages
          or canonicalized duplicates).
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Check the Pages report monthly. Look for unexpected spikes in errors
          or excluded pages. Common issues include soft 404s (pages returning
          200 but with no content), redirect chains, and pages blocked by
          robots.txt. Fix critical errors first — they directly prevent indexing.
        </p>
      </section>
    </>
  );
}
