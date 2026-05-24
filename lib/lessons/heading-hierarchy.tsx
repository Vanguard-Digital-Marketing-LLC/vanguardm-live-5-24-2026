export default function HeadingHierarchy() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          What Are HTML Headings?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          HTML headings (<code className="text-amber text-xs bg-white/5 px-1.5 py-0.5 rounded">&lt;h1&gt;</code> through{" "}
          <code className="text-amber text-xs bg-white/5 px-1.5 py-0.5 rounded">&lt;h6&gt;</code>) define
          the structure and hierarchy of your content. They are not just visual
          styling — they are <strong>semantic elements</strong> that tell
          browsers, screen readers, and search engines how your content is
          organized.
        </p>
        <div className="glass rounded-xl p-4">
          <div className="space-y-1.5 text-sm">
            <p className="text-2xl font-display font-bold text-slate-200">H1 — Page Title</p>
            <p className="text-xl font-display font-bold text-slate-300 pl-4">H2 — Major Section</p>
            <p className="text-lg font-display font-semibold text-slate-400 pl-8">H3 — Subsection</p>
            <p className="text-base font-display font-semibold text-slate-400 pl-12">H4 — Detail</p>
            <p className="text-sm font-display font-semibold text-slate-500 pl-16">H5 — Sub-detail</p>
            <p className="text-xs font-display font-semibold text-slate-500 pl-20">H6 — Minor point</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 mt-3">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Source:</strong>{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              MDN Web Docs — HTML Heading Elements
            </a>
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          The Rules of Heading Hierarchy
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Think of headings like a book&apos;s table of contents. Each heading
          level represents a deeper level of detail within the same topic.
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>One H1 per page</strong> — The H1 is your page title. It
              should be unique and describe the page&apos;s main topic.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Don&apos;t skip levels</strong> — Go from H2 to H3, not
              from H2 to H4. Skipping levels confuses the document structure.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Use headings for structure, not styling</strong> — Never
              choose a heading level because of how it looks. Use CSS for visual
              styling.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Keep it hierarchical</strong> — H3 elements should be
              subtopics of the preceding H2, and H4 subtopics of the preceding
              H3.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Be descriptive</strong> — Headings should clearly describe
              the content that follows them.
            </span>
          </li>
        </ul>
      </section>

      {/* CORRECT EXAMPLES */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Correct Examples
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          These examples show proper heading hierarchy. Notice how each level
          nests logically within its parent.
        </p>

        <div className="space-y-4">
          {/* Correct Example 1 */}
          <div className="rounded-xl p-4 md:p-5 border-2 border-emerald/30 bg-emerald/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-emerald font-display font-semibold text-sm">&#10003; Correct</span>
              <span className="text-[10px] text-slate-500">— Simple blog post</span>
            </div>
            <pre className="code-block">
{`<h1>How to Train a Puppy</h1>
  <h2>Basic Commands</h2>
    <h3>Sit</h3>
    <h3>Stay</h3>
    <h3>Come</h3>
  <h2>House Training</h2>
    <h3>Crate Training</h3>
    <h3>Schedule Tips</h3>
  <h2>Common Mistakes</h2>`}
            </pre>
            <p className="text-xs text-slate-400 mt-2">
              One H1 for the page title. H2s for major sections. H3s for
              subtopics within each section. No levels skipped.
            </p>
          </div>

          {/* Correct Example 2 */}
          <div className="rounded-xl p-4 md:p-5 border-2 border-emerald/30 bg-emerald/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-emerald font-display font-semibold text-sm">&#10003; Correct</span>
              <span className="text-[10px] text-slate-500">— Service page</span>
            </div>
            <pre className="code-block">
{`<h1>Web Design Services</h1>
  <h2>Our Process</h2>
    <h3>Discovery & Research</h3>
    <h3>Design & Prototyping</h3>
    <h3>Development</h3>
    <h3>Launch & Support</h3>
  <h2>Pricing</h2>
    <h3>Starter Package</h3>
    <h3>Professional Package</h3>
  <h2>Frequently Asked Questions</h2>`}
            </pre>
            <p className="text-xs text-slate-400 mt-2">
              Clean hierarchy. Each H3 logically belongs under its parent H2.
              The structure reads like a table of contents.
            </p>
          </div>
        </div>
      </section>

      {/* WRONG EXAMPLES */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Common Mistakes
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          These examples show heading hierarchy mistakes that hurt your SEO and
          accessibility. Each one explains <strong>why</strong> it&apos;s wrong
          and how to fix it.
        </p>

        <div className="space-y-4">
          {/* Wrong Example 1: Multiple H1s */}
          <div className="rounded-xl p-4 md:p-5 border-2 border-red-400/30 bg-red-400/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-red-400 font-display font-semibold text-sm">&#10007; Wrong</span>
              <span className="text-[10px] text-slate-500">— Multiple H1 tags</span>
            </div>
            <pre className="code-block">
{`<h1>Our Company</h1>
<h1>Our Services</h1>
<h1>Contact Us</h1>`}
            </pre>
            <div className="mt-3 glass rounded-lg p-3">
              <p className="text-xs text-red-300 mb-1"><strong>Why it&apos;s wrong:</strong></p>
              <p className="text-xs text-slate-400">
                Multiple H1s confuse search engines about the page&apos;s main
                topic. Each page should have exactly one H1 that describes its
                primary subject. Use H2s for the sections instead.
              </p>
            </div>
          </div>

          {/* Wrong Example 2: Skipping Levels */}
          <div className="rounded-xl p-4 md:p-5 border-2 border-red-400/30 bg-red-400/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-red-400 font-display font-semibold text-sm">&#10007; Wrong</span>
              <span className="text-[10px] text-slate-500">— Skipping heading levels</span>
            </div>
            <pre className="code-block">
{`<h1>SEO Guide</h1>
  <h2>On-Page SEO</h2>
    <h4>Title Tags</h4>    <!-- Skipped h3! -->
    <h4>Meta Descriptions</h4>
  <h2>Off-Page SEO</h2>
    <h6>Backlinks</h6>     <!-- Skipped h3, h4, h5! -->`}
            </pre>
            <div className="mt-3 glass rounded-lg p-3">
              <p className="text-xs text-red-300 mb-1"><strong>Why it&apos;s wrong:</strong></p>
              <p className="text-xs text-slate-400">
                Skipping from H2 to H4 (or H2 to H6) breaks the document
                outline. Screen readers announce heading levels to users, and
                skipped levels signal a broken or incomplete structure. Always
                step down one level at a time.
              </p>
            </div>
          </div>

          {/* Wrong Example 3: Using Headings for Styling */}
          <div className="rounded-xl p-4 md:p-5 border-2 border-red-400/30 bg-red-400/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-red-400 font-display font-semibold text-sm">&#10007; Wrong</span>
              <span className="text-[10px] text-slate-500">— Using headings for visual styling</span>
            </div>
            <pre className="code-block">
{`<h1>Welcome to Our Site</h1>
<h3>We build amazing websites</h3>  <!-- Used h3 for smaller text -->
<p>Lorem ipsum dolor sit amet...</p>
<h5>Call us today!</h5>  <!-- Used h5 for even smaller text -->`}
            </pre>
            <div className="mt-3 glass rounded-lg p-3">
              <p className="text-xs text-red-300 mb-1"><strong>Why it&apos;s wrong:</strong></p>
              <p className="text-xs text-slate-400">
                Heading levels were chosen based on visual size, not document
                structure. &quot;We build amazing websites&quot; is a tagline,
                not a subsection — it should be a{" "}
                <code className="text-amber bg-white/5 px-1 py-0.5 rounded">&lt;p&gt;</code> with
                CSS styling. &quot;Call us today!&quot; is a call-to-action, not
                an H5 subsection. Use CSS classes for visual styling.
              </p>
            </div>
          </div>

          {/* Wrong Example 4: Over-nesting */}
          <div className="rounded-xl p-4 md:p-5 border-2 border-red-400/30 bg-red-400/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-red-400 font-display font-semibold text-sm">&#10007; Wrong</span>
              <span className="text-[10px] text-slate-500">— Over-nesting headings</span>
            </div>
            <pre className="code-block">
{`<h1>Baking Recipes</h1>
  <h2>Cakes</h2>
    <h3>Chocolate Cake</h3>
      <h4>Ingredients</h4>
        <h5>Dry Ingredients</h5>
          <h6>Flour</h6>
          <h6>Sugar</h6>
          <h6>Cocoa Powder</h6>`}
            </pre>
            <div className="mt-3 glass rounded-lg p-3">
              <p className="text-xs text-red-300 mb-1"><strong>Why it&apos;s wrong:</strong></p>
              <p className="text-xs text-slate-400">
                Individual ingredients are not sections — they are list items.
                Using H6 for &quot;Flour&quot; and &quot;Sugar&quot; abuses the
                heading system. Items within a section should be{" "}
                <code className="text-amber bg-white/5 px-1 py-0.5 rounded">&lt;ul&gt;</code> or{" "}
                <code className="text-amber bg-white/5 px-1 py-0.5 rounded">&lt;ol&gt;</code> lists,
                not headings. In practice, you rarely need H5 or H6.
              </p>
            </div>
          </div>

          {/* Wrong Example 5: No H1 */}
          <div className="rounded-xl p-4 md:p-5 border-2 border-red-400/30 bg-red-400/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-red-400 font-display font-semibold text-sm">&#10007; Wrong</span>
              <span className="text-[10px] text-slate-500">— Missing H1 tag</span>
            </div>
            <pre className="code-block">
{`<!-- No <h1> anywhere on the page -->
<h2>About Our Team</h2>
<p>We are a team of designers...</p>
<h2>Our Work</h2>
<p>Check out our portfolio...</p>`}
            </pre>
            <div className="mt-3 glass rounded-lg p-3">
              <p className="text-xs text-red-300 mb-1"><strong>Why it&apos;s wrong:</strong></p>
              <p className="text-xs text-slate-400">
                Every page should have an H1 that clearly states the page&apos;s
                main topic. Without it, search engines have to guess what the
                page is about, and screen reader users lose important context
                about the page&apos;s purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Accessibility Impact
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Proper heading hierarchy is not just about SEO — it is critical for
          accessibility. Screen readers used by visually impaired users rely
          heavily on headings to navigate web pages.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-2">
              How Screen Readers Use Headings
            </h3>
            <ul className="space-y-1.5 text-xs md:text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">&#10003;</span>
                <span>Users can press <strong className="text-slate-300">H</strong> to jump between headings, scanning the page like a table of contents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">&#10003;</span>
                <span>Screen readers announce the heading level (e.g., &quot;Heading level 2: Key Ranking Factors&quot;)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">&#10003;</span>
                <span>Skipped levels make users think content is missing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">&#10003;</span>
                <span>Multiple H1s make it unclear which topic the page covers</span>
              </li>
            </ul>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-2">
              WCAG Guidelines
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              The Web Content Accessibility Guidelines (WCAG) 2.2 require that
              information and relationships conveyed through presentation can be
              programmatically determined (Success Criterion 1.3.1). Correct
              heading hierarchy satisfies this requirement.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Quick Reference Checklist
        </h2>
        <div className="glass rounded-xl p-4">
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Every page has exactly one H1</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Headings follow sequential order (H1 &rarr; H2 &rarr; H3)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>No heading levels are skipped</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Headings describe the content that follows them</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Headings are never used for visual styling alone</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>List items use lists, not headings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>The H1 matches the page&apos;s title tag content</span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Sources:</strong>{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              MDN — Heading Elements
            </a>
            {" · "}
            <a
              href="https://www.cloudflare.com/learning/performance/how-website-speed-boosts-seo/"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare — Website Speed &amp; SEO
            </a>
            {" · "}
            <a
              href="https://www.w3.org/WAI/tutorials/page-structure/headings/"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              W3C WAI — Page Structure: Headings
            </a>
            {" · "}
            <a
              href="https://www.w3.org/TR/WCAG22/#info-and-relationships"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WCAG 2.2 — SC 1.3.1
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
