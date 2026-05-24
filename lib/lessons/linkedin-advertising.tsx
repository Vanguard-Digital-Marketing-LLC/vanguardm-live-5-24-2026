export default function LinkedinAdvertising() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Introduction to LinkedIn Advertising
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          LinkedIn is the premier B2B advertising platform, connecting
          advertisers with over 1 billion professionals across 200+ countries.
          Unlike consumer-focused platforms, LinkedIn&apos;s value lies in its
          unmatched professional targeting data — job titles, company size,
          industry, seniority, skills, and even specific company names.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          LinkedIn advertising typically carries a higher cost-per-click than
          other platforms ($5-15 average vs. $1-3 on Meta), but the quality of
          leads often justifies the premium. When your target audience is
          decision-makers at specific companies, no other platform delivers
          comparable precision.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            When to Choose LinkedIn Ads
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            LinkedIn is ideal when your average deal size exceeds $5,000, your
            buying cycle involves multiple stakeholders, or you need to reach
            professionals by job function and seniority. SaaS companies,
            professional services firms, recruiting agencies, and B2B
            manufacturers see the strongest returns. If your product is
            consumer-focused with a low price point, other platforms will
            likely deliver better economics.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          LinkedIn Campaign Manager is the self-serve platform where you build,
          launch, and manage campaigns. It follows a similar hierarchy to
          Meta: Campaign Group, Campaign, and Ad. LinkedIn also offers managed
          services for larger advertisers, but Campaign Manager gives you full
          control for any budget.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Concepts: Targeting &amp; Ad Formats
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          LinkedIn&apos;s targeting capabilities are what make it uniquely
          valuable. Members self-report their professional details, creating
          the most accurate B2B audience data available. Understanding how to
          combine targeting layers is essential for campaign success.
        </p>
        <h3 className="font-display font-semibold text-amber mb-2">
          Targeting Dimensions
        </h3>
        <ul className="space-y-2 text-sm text-slate-300 mb-4">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Job Title</strong> — Target specific titles like
              &quot;VP of Marketing&quot; or &quot;Chief Technology
              Officer&quot;; most granular but smallest reach
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Job Function + Seniority</strong> — Broader approach;
              target &quot;Marketing&quot; function at &quot;Director&quot;
              level and above for wider reach with professional relevance
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Company Name / Company List</strong> — Upload a list of
              target accounts for Account-Based Marketing (ABM); pairs
              perfectly with sales outreach efforts
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Industry &amp; Company Size</strong> — Filter by specific
              sectors and employee counts to match your ideal customer profile
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Skills &amp; Member Interests</strong> — Target members
              who list specific skills or engage with particular topics
            </span>
          </li>
        </ul>
        <h3 className="font-display font-semibold text-amber mb-2">
          Ad Formats
        </h3>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Sponsored Content
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Native ads in the LinkedIn feed — single image, video, carousel,
              document, or event. This is the most versatile and widely used
              format. Single image ads work well for simple offers while video
              outperforms for brand storytelling.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Message Ads &amp; Conversation Ads
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Delivered directly to LinkedIn inboxes. Message Ads contain a
              single CTA while Conversation Ads offer branching paths. These
              have high open rates (50%+) but are limited to one send per member
              every 45 days. Best for event invitations and high-value offers.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Lead Gen Forms
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Pre-filled forms that open within LinkedIn, using the
              member&apos;s profile data. They eliminate landing page friction
              and typically achieve 2-5x higher conversion rates than
              off-platform forms. Data syncs to your CRM via Zapier or native
              integrations.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Text Ads &amp; Dynamic Ads
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Text Ads appear in the right rail on desktop — low cost but also
              low engagement. Dynamic Ads personalize content with the
              member&apos;s photo and name; Follower Ads and Spotlight Ads are
              the most common types.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Strategy &amp; Planning
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          LinkedIn advertising requires a different strategic mindset than
          consumer platforms. Higher CPCs and longer B2B sales cycles mean you
          must think about pipeline influence, not just last-click conversions.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Account-Based Marketing (ABM)
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mb-2">
            ABM is where LinkedIn truly shines. Upload a list of your target
            accounts (up to 300,000 companies), then layer job function and
            seniority to reach the buying committee within those organizations.
            Coordinate LinkedIn ads with sales outreach for maximum impact:
            prospects who see your ads before a cold email are significantly
            more likely to engage.
          </p>
          <p className="text-xs md:text-sm text-slate-400">
            Use Matched Audiences to combine company lists with website
            retargeting and contact lists. This creates a closed-loop system
            where you warm up accounts with ads, drive them to content, and
            retarget those who engage.
          </p>
        </div>
        <h3 className="font-display font-semibold text-amber mb-2">
          Budget &amp; Bidding
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          LinkedIn requires a minimum daily budget of $10 per campaign. For
          meaningful data, plan at least $50-100 per day per campaign. Bidding
          options include:
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Maximum Delivery</strong> — LinkedIn sets bids
              automatically to maximize results within your budget; recommended
              for most campaigns
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Cost Cap</strong> — Sets a target CPA ceiling; useful
              when you know your maximum acceptable cost per lead
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Manual Bidding</strong> — Full control over max CPC;
              useful for experienced advertisers managing tight margins
            </span>
          </li>
        </ul>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Calculate your acceptable cost per lead by working backward from your
          average deal size, win rate, and pipeline velocity. If your average
          deal is $50,000 with a 20% close rate, each lead is worth $10,000 in
          expected value. A $200 cost per lead would represent a 50:1 ratio —
          highly profitable even at LinkedIn&apos;s premium pricing.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Execution &amp; Implementation
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Executing LinkedIn campaigns requires attention to ad creative,
          tracking setup, and integration with your broader marketing and
          sales tech stack.
        </p>
        <h3 className="font-display font-semibold text-amber mb-2">
          Creative That Converts on LinkedIn
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          LinkedIn is a professional context, but that does not mean your ads
          should be boring. The best-performing LinkedIn ads combine
          professional credibility with thumb-stopping creative:
        </p>
        <ul className="space-y-2 text-sm text-slate-300 mb-4">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Lead with a specific stat or bold claim relevant to your
              audience&apos;s pain point
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Use introductory text under 150 characters (before the
              &quot;see more&quot; truncation) to deliver your hook
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Images with people outperform stock graphics; use bright colors
              that stand out against LinkedIn&apos;s blue/white interface
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Document ads (PDF carousels) drive extremely high engagement
              and dwell time — perfect for frameworks and playbooks
            </span>
          </li>
        </ul>
        <h3 className="font-display font-semibold text-amber mb-2">
          Conversion Tracking &amp; Integration
        </h3>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              LinkedIn Insight Tag
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              A lightweight JavaScript tag installed site-wide that tracks
              conversions, enables retargeting, and provides demographic
              reporting on your website visitors. Install via Google Tag Manager
              for clean deployment.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Conversions API
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Server-side tracking that supplements the Insight Tag. Sends
              offline conversions, CRM events, and downstream pipeline data
              back to LinkedIn for optimization. Critical for B2B companies
              where the real conversion (a closed deal) happens weeks or months
              after the click.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              CRM Integration
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Connect Lead Gen Form submissions directly to your CRM
              (HubSpot, Salesforce, etc.) so sales teams receive leads
              instantly. Set up lead scoring rules that prioritize LinkedIn
              leads based on company fit and engagement level.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Measurement &amp; Optimization
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          B2B measurement on LinkedIn requires patience and a multi-touch
          perspective. Judging campaigns solely on cost-per-lead ignores the
          fact that LinkedIn leads often convert at higher rates and larger deal
          sizes downstream.
        </p>
        <h3 className="font-display font-semibold text-amber mb-2">
          Metrics That Matter
        </h3>
        <ul className="space-y-2 text-sm text-slate-300 mb-4">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>CTR</strong> — Benchmark is 0.4-0.6% for Sponsored
              Content; below 0.35% signals poor creative or targeting
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Cost Per Lead (CPL)</strong> — Varies wildly by industry;
              $50-150 is typical for B2B SaaS, but always evaluate against
              lead quality and downstream conversion
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Lead-to-Opportunity Rate</strong> — Track what percentage
              of LinkedIn leads become qualified opportunities in your CRM;
              this reveals true targeting quality
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Pipeline Influenced</strong> — Total pipeline value where
              LinkedIn was a touchpoint; requires CRM attribution modeling
            </span>
          </li>
        </ul>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Optimization Playbook
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            Week 1-2: Let campaigns run with minimal changes to gather data.
            Week 2-3: Analyze demographic reports to see which job titles,
            industries, and companies engage most; exclude poor performers.
            Week 3-4: Refresh creative, test new ad copy, and adjust bidding.
            Monthly: Review lead quality with sales teams, feed closed-won
            data back to LinkedIn for Lookalike audiences and Conversions API
            optimization. Quarterly: Audit account structure, update company
            lists, and align with sales priorities.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          LinkedIn&apos;s demographic reporting is uniquely valuable — you can
          see exactly which job titles, companies, and industries interacted
          with your ads. Use this data to refine targeting, inform sales
          outreach, and validate that you are reaching the right people.
          Combine LinkedIn data with multi-touch attribution in your CRM to
          build a complete picture of how ads influence pipeline and revenue
          across the entire buying cycle.
        </p>
      </section>
    </>
  );
}
