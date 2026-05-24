export default function OnPageSeoChecklistLesson() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          On-Page SEO Checklist
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Use this checklist to audit and optimize every page on your website. Each item directly impacts how
          search engines understand, index, and rank your content. Work through them one by one to ensure
          nothing is missed.
        </p>
      </section>

      {/* Item 1 */}
      <section>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">1. Unique Title Tag (50-60 Characters)</h3>
          <p className="text-sm text-slate-300 mb-2">
            <strong className="text-white">Why it matters:</strong> The title tag is the single most important
            on-page SEO element. It appears in search results as the clickable headline and tells Google what
            your page is about.
          </p>
          <p className="text-sm text-slate-300">
            <strong className="text-white">How to implement:</strong> Write a unique, descriptive title for
            every page. Include your primary keyword near the beginning. Keep it under 60 characters to avoid
            truncation in search results. Avoid duplicate titles across your site.
          </p>
          <pre className="code-block mt-3">{`<!-- Good -->
<title>SEO Copywriting Guide — Write Content That Ranks</title>

<!-- Bad — too long, keyword-stuffed -->
<title>SEO Copywriting SEO Content Writing SEO Tips Best SEO</title>`}</pre>
        </div>
      </section>

      {/* Item 2 */}
      <section>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">2. Meta Description (150-160 Characters)</h3>
          <p className="text-sm text-slate-300 mb-2">
            <strong className="text-white">Why it matters:</strong> The meta description appears below your
            title in search results. While not a direct ranking factor, a compelling description increases your
            click-through rate, which does influence rankings.
          </p>
          <p className="text-sm text-slate-300">
            <strong className="text-white">How to implement:</strong> Write a unique meta description for each
            page. Include the primary keyword and a clear call-to-action. Keep it between 150-160 characters.
            Make it compelling enough that users choose your result over competitors.
          </p>
          <pre className="code-block mt-3">{`<meta name="description"
  content="Learn SEO copywriting techniques that boost rankings
  and engage readers. Free guide with examples." />`}</pre>
        </div>
      </section>

      {/* Item 3 */}
      <section>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">3. Single H1 Tag Matching Page Topic</h3>
          <p className="text-sm text-slate-300 mb-2">
            <strong className="text-white">Why it matters:</strong> The H1 tag is the main heading of your
            page. It tells both users and search engines what the page is about. Having multiple H1 tags or
            a mismatched H1 confuses search engines.
          </p>
          <p className="text-sm text-slate-300">
            <strong className="text-white">How to implement:</strong> Use exactly one H1 per page. It should
            closely match or include your primary keyword and align with the title tag. Make it descriptive and
            compelling.
          </p>
        </div>
      </section>

      {/* Item 4 */}
      <section>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">4. Proper Heading Hierarchy (H2s, H3s)</h3>
          <p className="text-sm text-slate-300 mb-2">
            <strong className="text-white">Why it matters:</strong> Heading hierarchy creates a logical outline
            of your content. Search engines use this structure to understand the relationship between sections.
            Proper hierarchy also improves accessibility for screen readers.
          </p>
          <p className="text-sm text-slate-300">
            <strong className="text-white">How to implement:</strong> Use H2 tags for main sections and H3
            tags for subsections within those. Never skip levels (e.g., jumping from H2 to H4). Include keyword
            variations in some headings naturally.
          </p>
          <pre className="code-block mt-3">{`H1: Main Page Title
  H2: First Major Section
    H3: Subsection Detail
    H3: Another Subsection
  H2: Second Major Section
    H3: Subsection Detail`}</pre>
        </div>
      </section>

      {/* Item 5 */}
      <section>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">5. Image Alt Text on All Images</h3>
          <p className="text-sm text-slate-300 mb-2">
            <strong className="text-white">Why it matters:</strong> Alt text describes images to search engines
            and visually impaired users. It helps your images rank in Google Image Search and provides context
            when images fail to load. Missing alt text is a missed SEO opportunity.
          </p>
          <p className="text-sm text-slate-300">
            <strong className="text-white">How to implement:</strong> Add descriptive alt text to every
            meaningful image. Include relevant keywords where natural. Keep it under 125 characters. Decorative
            images can use empty alt attributes.
          </p>
          <pre className="code-block mt-3">{`<!-- Good -->
<img src="seo-audit.jpg"
  alt="SEO audit checklist showing on-page optimization steps" />

<!-- Bad -->
<img src="IMG_4521.jpg" alt="" />
<img src="seo.jpg" alt="seo seo optimization seo tips" />`}</pre>
        </div>
      </section>

      {/* Item 6 */}
      <section>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">6. Optimized URL Structure</h3>
          <p className="text-sm text-slate-300 mb-2">
            <strong className="text-white">Why it matters:</strong> Clean, descriptive URLs help search engines
            and users understand what a page is about before clicking. Short URLs tend to rank better than long,
            complex ones.
          </p>
          <p className="text-sm text-slate-300">
            <strong className="text-white">How to implement:</strong> Keep URLs short and descriptive. Use
            hyphens to separate words. Include the primary keyword. Remove unnecessary words like &quot;the,&quot;
            &quot;and,&quot; &quot;of.&quot; Avoid numbers, dates, or parameters when possible.
          </p>
          <pre className="code-block mt-3">{`<!-- Good -->
/blog/seo-copywriting-guide

<!-- Bad -->
/blog/2026/02/15/the-ultimate-guide-to-seo-copywriting-tips-and-tricks
/blog?id=4521&cat=seo`}</pre>
        </div>
      </section>

      {/* Item 7 */}
      <section>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">7. Internal Links to Related Pages</h3>
          <p className="text-sm text-slate-300 mb-2">
            <strong className="text-white">Why it matters:</strong> Internal links help search engines discover
            your content, understand site structure, and distribute page authority throughout your site. They
            also keep visitors engaged by guiding them to related content.
          </p>
          <p className="text-sm text-slate-300">
            <strong className="text-white">How to implement:</strong> Add 3-5 internal links per page to
            related content. Use descriptive anchor text with keywords. Link from high-authority pages to newer
            content. Ensure no pages are &quot;orphaned&quot; (unreachable via internal links).
          </p>
        </div>
      </section>

      {/* Item 8 */}
      <section>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">8. External Links to Authoritative Sources</h3>
          <p className="text-sm text-slate-300 mb-2">
            <strong className="text-white">Why it matters:</strong> Linking to reputable, authoritative sources
            builds trust with both search engines and readers. It shows you&apos;ve done your research and
            provides readers with additional value.
          </p>
          <p className="text-sm text-slate-300">
            <strong className="text-white">How to implement:</strong> Link to credible sources like Google&apos;s
            official documentation, industry studies, and authoritative publications. Use 2-4 external links per
            page. Open external links in a new tab. Avoid linking to competitors&apos; service pages.
          </p>
        </div>
      </section>

      {/* Item 9 */}
      <section>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">9. Mobile-Responsive Design</h3>
          <p className="text-sm text-slate-300 mb-2">
            <strong className="text-white">Why it matters:</strong> Google uses mobile-first indexing, meaning
            it primarily uses the mobile version of your site for ranking and indexing. Over 60% of all searches
            happen on mobile devices. A non-responsive site will rank poorly.
          </p>
          <p className="text-sm text-slate-300">
            <strong className="text-white">How to implement:</strong> Use responsive CSS (Tailwind, media
            queries). Test on multiple devices using Chrome DevTools. Ensure text is readable without zooming,
            buttons are tap-friendly, and no horizontal scrolling occurs. Use Google&apos;s Mobile-Friendly
            Test tool.
          </p>
        </div>
      </section>

      {/* Item 10 */}
      <section>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">10. Page Speed Under 3 Seconds</h3>
          <p className="text-sm text-slate-300 mb-2">
            <strong className="text-white">Why it matters:</strong> Page speed is a confirmed Google ranking
            factor. 53% of mobile users leave a page that takes longer than 3 seconds to load. Slow pages
            have higher bounce rates and lower conversions.
          </p>
          <p className="text-sm text-slate-300">
            <strong className="text-white">How to implement:</strong> Compress images (WebP format). Minimize
            CSS and JavaScript. Use a CDN like Cloudflare. Enable browser caching. Defer non-critical scripts.
            Test with Google PageSpeed Insights and aim for a score above 90.
          </p>
        </div>
      </section>

      {/* Item 11 */}
      <section>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">11. Schema Markup Where Applicable</h3>
          <p className="text-sm text-slate-300 mb-2">
            <strong className="text-white">Why it matters:</strong> Schema markup (structured data) helps
            search engines understand your content and can result in rich snippets &mdash; enhanced search
            results with ratings, FAQs, prices, and more. Rich snippets increase click-through rates.
          </p>
          <p className="text-sm text-slate-300">
            <strong className="text-white">How to implement:</strong> Add JSON-LD structured data to your
            pages. Common types include Article, LocalBusiness, FAQ, Product, and HowTo. Validate with
            Google&apos;s Rich Results Test tool.
          </p>
          <pre className="code-block mt-3">{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "On-Page SEO Checklist",
  "author": { "@type": "Organization", "name": "Vanguard" }
}
</script>`}</pre>
        </div>
      </section>

      {/* Item 12 */}
      <section>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">12. HTTPS Security</h3>
          <p className="text-sm text-slate-300 mb-2">
            <strong className="text-white">Why it matters:</strong> HTTPS is a confirmed Google ranking signal.
            Sites without HTTPS show a &quot;Not Secure&quot; warning in browsers, which destroys user trust.
            SSL certificates also protect user data during form submissions.
          </p>
          <p className="text-sm text-slate-300">
            <strong className="text-white">How to implement:</strong> Install an SSL certificate (free through
            Cloudflare or Let&apos;s Encrypt). Redirect all HTTP traffic to HTTPS. Update all internal links to
            use HTTPS. Check for mixed content warnings (HTTP resources loaded on HTTPS pages).
          </p>
        </div>
      </section>

      {/* Summary */}
      <section>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">Source</h3>
          <p className="text-sm text-slate-400">
            This checklist is based on Google&apos;s SEO Starter Guide, Google Search Central documentation,
            and industry best practices from Moz and Ahrefs. Each item addresses a factor that Google has
            confirmed or strongly implied affects search rankings.
          </p>
        </div>
      </section>
    </div>
  );
}
