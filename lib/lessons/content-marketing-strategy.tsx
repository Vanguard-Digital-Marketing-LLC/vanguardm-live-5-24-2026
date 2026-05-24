export default function ContentMarketingStrategy() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Introduction &amp; Overview
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Content marketing is the strategic practice of creating and distributing
          valuable, relevant, and consistent content to attract and retain a clearly
          defined audience — and, ultimately, to drive profitable customer action.
          Unlike traditional advertising that interrupts your audience, content
          marketing earns their attention by solving problems, answering questions,
          and providing genuine value before asking for anything in return.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          At its core, content marketing is about building a <strong>content engine</strong>{" "}
          — a repeatable, scalable system that consistently produces high-quality
          content aligned with your business goals. This engine fuels every stage of
          the buyer journey, from initial awareness through consideration to
          conversion and advocacy. Companies that invest in a content engine see
          compounding returns over time as their library of assets continues to
          attract organic traffic long after publication.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs md:text-sm text-slate-400">
            <strong className="text-slate-300">Why it matters:</strong> According to
            the Content Marketing Institute, 73% of B2B marketers and 70% of B2C
            marketers use content marketing as part of their overall strategy.
            Businesses with blogs generate 67% more leads per month than those
            without.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          In this lesson, you will learn how to build a content marketing strategy
          from the ground up — starting with audience research, defining content
          pillars, mapping content to the marketing funnel, planning distribution
          channels, and measuring ROI. Whether you are launching a brand-new content
          program or optimizing an existing one, these frameworks will give you the
          structure you need to succeed.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Concepts
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Before building your content engine, you need to understand the foundational
          concepts that make content marketing work. These pillars inform every
          decision from topic selection to distribution.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Audience Research &amp; Buyer Personas
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Effective content starts with deep audience understanding. A{" "}
          <strong>buyer persona</strong> is a semi-fictional representation of your
          ideal customer based on real data and informed assumptions about
          demographics, behaviors, motivations, and goals. To build personas, gather
          data from customer interviews, surveys, CRM analytics, social listening,
          and website analytics. Focus on their pain points, information sources,
          buying triggers, and objections.
        </p>
        <div className="glass rounded-xl p-4 mb-3">
          <h3 className="font-display font-semibold text-amber mb-1">
            Persona Template Essentials
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Demographics</strong> — Age, role, industry, company size, income level</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Goals &amp; Challenges</strong> — What they want to achieve and what stands in their way</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Information Sources</strong> — Blogs, podcasts, YouTube, social platforms they trust</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Buying Triggers</strong> — Events or situations that prompt them to seek a solution</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Objections</strong> — Common reasons they hesitate to purchase</span>
            </li>
          </ul>
        </div>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Content Pillars
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Content pillars are the core themes or topics your brand will consistently
          create content around. They sit at the intersection of what your audience
          cares about and what your brand has authority to speak on. Typically,
          businesses define 3-5 content pillars. Each pillar should be broad enough
          to generate dozens of subtopics but focused enough to build topical
          authority. For example, a project management SaaS might choose pillars
          like &quot;Remote Team Productivity,&quot; &quot;Agile Methodology,&quot;
          and &quot;Project Planning Templates.&quot;
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          The Marketing Funnel: TOFU, MOFU, BOFU
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Content must serve different stages of the buyer journey. The marketing
          funnel is divided into three primary stages:
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              TOFU — Top of Funnel (Awareness)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              The prospect realizes they have a problem or need. Content at this
              stage is educational and broad: blog posts, infographics, social media
              content, podcasts, and how-to videos. The goal is to attract attention
              and build brand awareness without pushing for a sale.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              MOFU — Middle of Funnel (Consideration)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              The prospect is actively researching solutions. Content here goes
              deeper: white papers, case studies, webinars, comparison guides, and
              email nurture sequences. The goal is to position your brand as the
              best solution and build trust.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              BOFU — Bottom of Funnel (Decision)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              The prospect is ready to buy. Content at this stage closes deals:
              product demos, free trials, customer testimonials, ROI calculators,
              and pricing pages. The goal is to remove final objections and
              facilitate the purchase.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Strategy &amp; Planning
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          A content marketing strategy document is your roadmap. It aligns your team,
          defines success metrics, and ensures every piece of content serves a
          purpose. Here is how to build one step by step.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Setting Goals with the SMART Framework
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Every content strategy needs clear, measurable goals. Use the SMART
          framework: <strong>Specific</strong>, <strong>Measurable</strong>,{" "}
          <strong>Achievable</strong>, <strong>Relevant</strong>, and{" "}
          <strong>Time-bound</strong>. Instead of &quot;increase blog traffic,&quot;
          aim for &quot;increase organic blog traffic by 40% within 6 months by
          publishing 12 pillar articles and 36 supporting posts.&quot;
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Content Audit &amp; Gap Analysis
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Before creating new content, audit what you already have. Catalog every
          existing piece by URL, topic, funnel stage, format, and performance metrics.
          Identify content gaps — topics your audience searches for that you have
          not covered — and content that needs updating. Tools like Screaming Frog,
          Ahrefs Content Explorer, and Google Search Console help automate this
          process.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Editorial Calendar &amp; Content Cadence
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          An editorial calendar maps out what content will be published, when, where,
          and by whom. It ensures consistent output and prevents last-minute scrambles.
          Define your publishing cadence based on team capacity and audience
          expectations. A typical B2B cadence might be 2-4 blog posts per week,
          1 newsletter, and 1 long-form asset per month.
        </p>
        <div className="glass rounded-xl p-4 mt-3">
          <p className="text-xs md:text-sm text-slate-400">
            <strong className="text-slate-300">Pro Tip:</strong> Use a project
            management tool like Notion, Asana, or Monday.com to manage your
            editorial calendar. Include columns for status, assignee, publish date,
            target keyword, funnel stage, and distribution channels.
          </p>
        </div>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Distribution Strategy
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Creating great content is only half the battle — distribution is how it
          reaches your audience. Plan across three channel types:{" "}
          <strong>Owned media</strong> (your blog, email list, website),{" "}
          <strong>Earned media</strong> (press mentions, guest posts, social shares),
          and <strong>Paid media</strong> (social ads, sponsored content, PPC).
          The best strategies use all three in an integrated approach, often
          following a 70/20/10 split: 70% owned, 20% earned, 10% paid.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Execution &amp; Implementation
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          With strategy in place, it is time to execute. This section covers the
          practical workflows and processes that turn your plan into published content.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Content Creation Workflow
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          A structured workflow prevents bottlenecks and maintains quality. A typical
          workflow moves through these stages: Ideation, Brief Creation, Drafting,
          Editing, Design/Formatting, Review/Approval, Publishing, and Distribution.
          Each stage should have clear owners, deadlines, and quality standards.
          Document these processes as Standard Operating Procedures (SOPs) so any
          team member can follow them.
        </p>
        <ul className="space-y-2 text-sm text-slate-300 mb-3">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span><strong>Content Briefs</strong> — Include target keyword, search intent, funnel stage, outline, word count, CTA, and reference links</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span><strong>Style Guide</strong> — Define brand voice, tone, formatting conventions, and visual standards</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span><strong>Quality Checklists</strong> — Ensure every piece meets SEO, readability, accuracy, and brand standards before publishing</span>
          </li>
        </ul>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Building Your Content Team
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Depending on your scale, you may need writers, editors, designers, SEO
          specialists, videographers, and a content manager. For smaller teams,
          individuals often wear multiple hats. Consider a mix of in-house talent
          for strategic, brand-critical content and freelancers or agencies for
          scale. Vet writers by reviewing portfolios, assigning paid test pieces,
          and checking for subject-matter expertise.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Content Formats &amp; Types
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Diversify your content formats to reach audiences on different platforms
          and match different consumption preferences. Core formats include:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">Blog Posts</h3>
            <p className="text-xs text-slate-400">
              SEO-driven articles, listicles, how-to guides, and thought leadership
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">Long-Form Assets</h3>
            <p className="text-xs text-slate-400">
              White papers, e-books, research reports, and ultimate guides
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">Visual Content</h3>
            <p className="text-xs text-slate-400">
              Infographics, slide decks, data visualizations, and branded templates
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">Interactive Content</h3>
            <p className="text-xs text-slate-400">
              Quizzes, calculators, tools, and assessments that engage users directly
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          SEO Integration
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Every piece of content should be optimized for search. Conduct keyword
          research before writing, target one primary keyword and 2-3 related
          secondary keywords per piece, optimize title tags and meta descriptions,
          use proper heading hierarchy, add internal links to related content, and
          include alt text for images. Use topic clusters — a pillar page linked to
          multiple supporting articles — to build topical authority and improve
          rankings across an entire subject area.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Measurement &amp; Optimization
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Content marketing ROI is the ultimate measure of success, but tracking it
          requires the right metrics at each funnel stage and the discipline to
          iterate based on data.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Key Metrics by Funnel Stage
        </h3>
        <div className="space-y-3 mb-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              TOFU Metrics
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Organic traffic, social impressions, brand search volume, new users,
              page views, time on page, and social shares.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              MOFU Metrics
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Email subscribers, lead magnet downloads, webinar registrations,
              return visits, pages per session, and newsletter open rates.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              BOFU Metrics
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Marketing qualified leads (MQLs), sales qualified leads (SQLs),
              conversion rate, customer acquisition cost (CAC), and revenue
              attributed to content.
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Calculating Content Marketing ROI
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The basic ROI formula is: <strong>(Revenue from Content - Cost of Content)
          / Cost of Content x 100</strong>. Content costs include writer fees,
          designer time, tools, distribution spend, and management overhead. Track
          revenue attribution through UTM parameters, CRM integration, and
          multi-touch attribution models. Remember that content marketing is a
          long-term investment — most content programs take 6-12 months to show
          meaningful ROI.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Content Optimization &amp; Refreshing
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Content is not &quot;set and forget.&quot; Schedule regular content audits
          — quarterly at minimum — to identify underperforming pieces. Update
          outdated statistics, add new sections, improve internal linking, refresh
          visuals, and re-optimize for current keyword trends. Content refreshing
          can increase organic traffic to a page by 50-100% with far less effort
          than creating something new.
        </p>
        <div className="glass rounded-xl p-4 mt-3">
          <p className="text-xs md:text-sm text-slate-400">
            <strong className="text-slate-300">Key Takeaway:</strong> Build your
            content engine with audience research and pillar topics, map content to
            every funnel stage, distribute across owned, earned, and paid channels,
            and relentlessly measure and optimize. Consistency and patience are the
            two traits that separate successful content programs from abandoned blogs.
          </p>
        </div>
      </section>
    </>
  );
}
