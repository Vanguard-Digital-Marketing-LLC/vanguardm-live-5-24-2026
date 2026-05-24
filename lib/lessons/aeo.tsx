export default function AeoLesson() {
  return (
    <div className="space-y-10">
      {/* 1. What is AEO */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          What is AEO?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          AEO (Answer Engine Optimization) is the practice of optimizing your content to be
          selected as a direct answer by search engines, AI assistants, and voice assistants.
          While traditional SEO focuses on ranking in the &ldquo;ten blue links,&rdquo; AEO
          targets featured snippets, People Also Ask boxes, AI-generated answers, and voice
          search results.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          The shift from SEO to AEO reflects a fundamental change in how people search. Users
          increasingly expect direct, concise answers rather than having to click through to a
          website and find the answer themselves. Google&apos;s featured snippets, AI Overviews,
          and AI tools like ChatGPT and Perplexity are all examples of answer engines.
        </p>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            SEO vs. AEO
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>SEO</strong> &mdash; Optimize to rank high in search result listings</li>
            <li><strong>AEO</strong> &mdash; Optimize to be the direct answer shown to users</li>
            <li><strong>Both work together</strong> &mdash; Strong SEO fundamentals are the foundation for AEO success</li>
          </ul>
        </div>
      </section>

      {/* 2. Featured Snippets */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Featured Snippets
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Featured snippets are selected search results that appear at the top of Google&apos;s
          results page in a special box, above the regular organic results. Often called
          &ldquo;Position Zero,&rdquo; they give your content maximum visibility and
          significantly higher click-through rates.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Types of Featured Snippets
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-2">
            <li>
              <strong>Paragraph Snippets</strong> &mdash; A block of text (40&ndash;60 words) that directly
              answers a question. Most common type. Example query: &ldquo;What is a CDN?&rdquo;
            </li>
            <li>
              <strong>List Snippets</strong> &mdash; Ordered or unordered lists extracted from your content.
              Common for &ldquo;how to&rdquo; queries and &ldquo;best of&rdquo; lists. Example:
              &ldquo;How to set up Cloudflare&rdquo;
            </li>
            <li>
              <strong>Table Snippets</strong> &mdash; Data pulled into a table format. Common for
              comparisons, pricing, and specifications. Example: &ldquo;CDN pricing comparison&rdquo;
            </li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            How to Optimize for Featured Snippets
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li>Target question-based keywords (what, how, why, when)</li>
            <li>Provide a concise answer (40&ndash;60 words) immediately after the question heading</li>
            <li>Use proper heading hierarchy (H2 for the question, answer directly below)</li>
            <li>Use lists and tables where appropriate</li>
            <li>Already rank on page 1 for the target query &mdash; most snippets are pulled from top-10 results</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs text-slate-500">
            Source: <a href="https://developers.google.com/search/docs/appearance/featured-snippets" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Google Search Central &mdash; Featured Snippets</a>
          </p>
        </div>
      </section>

      {/* 3. People Also Ask */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          People Also Ask
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          The &ldquo;People Also Ask&rdquo; (PAA) box shows related questions that users
          frequently search for. When a user clicks a question, it expands to show a short
          answer pulled from a web page, along with a link to the source. PAA boxes appear in
          over 40% of Google search results.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            How to Target People Also Ask
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li>Research PAA questions for your target keywords using Google search directly</li>
            <li>Create content that answers these related questions on your page</li>
            <li>Use each PAA question as an H2 or H3 heading</li>
            <li>Follow each heading with a concise, direct answer (2&ndash;3 sentences)</li>
            <li>Then expand on the answer with more detail below</li>
            <li>Use FAQ sections on relevant pages to capture multiple PAA opportunities</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Content Structure for PAA
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            The ideal pattern is: <strong>Question heading &rarr; Short direct answer &rarr; Expanded
            explanation</strong>. Google&apos;s algorithm looks for clear question-answer pairs in
            your content. The more naturally you answer common questions, the more likely you
            are to appear in PAA results.
          </p>
        </div>
      </section>

      {/* 4. Voice Search Optimization */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Voice Search Optimization
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Voice search through Google Assistant, Siri, Alexa, and other assistants is
          fundamentally different from typed search. Voice queries are longer, more
          conversational, and almost always phrased as questions. Optimizing for voice search
          means optimizing for natural language and direct answers.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            How Voice Search Differs
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>Typed:</strong> &ldquo;best CDN 2025&rdquo;</li>
            <li><strong>Voice:</strong> &ldquo;What is the best CDN to use for my website?&rdquo;</li>
            <li>Voice queries average 29 words vs. 3&ndash;4 words for typed</li>
            <li>Voice search almost always returns a single answer, not a list of results</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Voice Search Optimization Tips
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li>Write in a conversational tone &mdash; answer questions the way you would speak</li>
            <li>Target long-tail, question-based keywords</li>
            <li>Provide concise answers (voice assistants typically read 29 words or less)</li>
            <li>Optimize for local search (&ldquo;near me&rdquo; queries are common in voice)</li>
            <li>Ensure your site loads fast &mdash; voice search results load 52% faster than average</li>
            <li>Use structured data (FAQ and HowTo Schema) to help assistants parse your content</li>
          </ul>
        </div>
      </section>

      {/* 5. AI Answer Engines */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          AI Answer Engines
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          AI answer engines represent the next evolution of search. These tools use large
          language models (LLMs) to synthesize information from multiple sources and provide
          comprehensive, conversational answers. Understanding how they work is critical for
          modern AEO.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Google AI Overviews (formerly SGE)
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Google AI Overviews appear at the top of search results for many queries, providing
            AI-generated summaries with links to source websites. Content that is well-structured,
            authoritative, and clearly answers questions is more likely to be cited. Google pulls
            from pages that already rank well organically.
          </p>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            ChatGPT Search &amp; Perplexity
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            ChatGPT with search capabilities and Perplexity AI are standalone answer engines
            that browse the web to answer questions. They cite their sources with links. To be
            cited by these tools, focus on creating comprehensive, accurate, and well-structured
            content that clearly answers specific questions.
          </p>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            How to Optimize for AI Answer Engines
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li>Create comprehensive, authoritative content on your topics</li>
            <li>Include clear definitions and explanations (AI models love unambiguous statements)</li>
            <li>Use structured data to make your content machine-readable</li>
            <li>Build topical authority by covering subjects thoroughly across multiple pages</li>
            <li>Ensure your content is factually accurate with cited sources</li>
            <li>Keep content updated &mdash; AI tools prioritize fresh information</li>
          </ul>
        </div>
      </section>

      {/* 6. Structured Data for AEO */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Structured Data for AEO
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Structured data (Schema.org markup) helps search engines and AI tools understand the
          meaning and relationships within your content. Two schema types are particularly
          powerful for AEO: FAQ Schema and HowTo Schema.
        </p>

        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            FAQ Schema (FAQPage)
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            FAQ Schema marks up question-and-answer pairs on your page. When recognized by
            Google, it can display expandable FAQ rich results directly in the search results,
            taking up more visual real estate.
          </p>
          <pre className="code-block text-xs md:text-sm overflow-x-auto">{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a CDN?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A CDN (Content Delivery Network) is a globally distributed network of servers that delivers your website's content from the server closest to each visitor's location, reducing latency and improving load times."
      }
    },
    {
      "@type": "Question",
      "name": "Is Cloudflare free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Cloudflare offers a generous free plan that includes CDN caching, DDoS protection, universal SSL certificates, and DNS management."
      }
    }
  ]
}
</script>`}</pre>
        </div>

        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            HowTo Schema
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            HowTo Schema marks up step-by-step instructions. Google can display these as rich
            results with numbered steps, images, and time estimates. This is ideal for tutorial
            and guide content.
          </p>
          <pre className="code-block text-xs md:text-sm overflow-x-auto">{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Set Up Cloudflare",
  "description": "A step-by-step guide to setting up Cloudflare CDN for your website.",
  "totalTime": "PT20M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Create a Cloudflare account",
      "text": "Go to dash.cloudflare.com/sign-up and create a free account with your email address."
    },
    {
      "@type": "HowToStep",
      "name": "Add your domain",
      "text": "Click 'Add a Site' and enter your domain name. Select the free plan."
    },
    {
      "@type": "HowToStep",
      "name": "Update nameservers",
      "text": "Change your domain's nameservers at your registrar to the ones provided by Cloudflare."
    }
  ]
}
</script>`}</pre>
        </div>

        <div className="glass rounded-xl p-4">
          <p className="text-xs text-slate-500">
            Sources: <a href="https://developers.google.com/search/docs/appearance/structured-data/faqpage" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Google &mdash; FAQ Structured Data</a>, <a href="https://schema.org/FAQPage" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Schema.org &mdash; FAQPage</a>, <a href="https://schema.org/HowTo" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Schema.org &mdash; HowTo</a>
          </p>
        </div>
      </section>

      {/* 7. Writing for AEO */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Writing for AEO
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Writing for answer engines requires a different approach than traditional SEO
          copywriting. The goal is to provide clear, concise, and authoritative answers that
          can be extracted and presented as standalone responses.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            The Question-Answer Format
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            Structure your content around questions your audience is asking. Use this pattern:
          </p>
          <ol className="text-sm md:text-base text-slate-300 leading-relaxed list-decimal list-inside space-y-1">
            <li><strong>H2 or H3 heading</strong> phrased as the question (or containing the question)</li>
            <li><strong>Direct answer</strong> in the first 1&ndash;2 sentences (40&ndash;60 words)</li>
            <li><strong>Supporting details</strong> that expand on the answer with examples and data</li>
          </ol>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Writing Concise Definitions
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            Answer engines love clear definitions. Use the &ldquo;is&rdquo; pattern for
            definitions:
          </p>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>Good:</strong> &ldquo;A CDN (Content Delivery Network) is a network of servers distributed globally that caches and delivers website content from the server closest to each user.&rdquo;</li>
            <li><strong>Bad:</strong> &ldquo;When we talk about CDNs, there are many things to consider. Over the years, content delivery has evolved significantly...&rdquo;</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            AEO Content Best Practices
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li>Lead with the answer, then explain &mdash; the inverted pyramid style</li>
            <li>Use simple, clear language (aim for an 8th-grade reading level)</li>
            <li>Include numbered lists for step-by-step processes</li>
            <li>Use bullet points for feature lists and comparisons</li>
            <li>Add tables for data comparisons</li>
            <li>Include specific numbers, dates, and facts (AI models weight factual specificity)</li>
            <li>Use natural question phrasing in headings</li>
            <li>Avoid filler words and vague statements</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-slate-500">
            Source: <a href="https://developers.google.com/search/docs/appearance/featured-snippets" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Google Search Central &mdash; Featured Snippets</a>, <a href="https://schema.org" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Schema.org</a>
          </p>
        </div>
      </section>
    </div>
  );
}
