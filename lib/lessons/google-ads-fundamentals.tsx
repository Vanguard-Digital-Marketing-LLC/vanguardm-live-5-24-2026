export default function GoogleAdsFundamentals() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Introduction to Google Ads
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Google Ads is the world&apos;s largest pay-per-click (PPC) advertising
          platform, serving ads across Google Search, YouTube, Gmail, the
          Display Network, and millions of partner sites. Formerly known as
          Google AdWords, the platform was rebranded in 2018 and now processes
          billions of searches every day, giving advertisers unmatched reach.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Unlike organic SEO, Google Ads lets you appear at the very top of
          search results almost immediately. You only pay when someone interacts
          with your ad (clicks, views, or calls), making it a performance-driven
          channel where every dollar is measurable.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Why Google Ads Matters
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            Google commands over 90% of the global search engine market share.
            When someone searches for a product or service, they have active
            intent. Capturing that intent with a well-crafted ad can produce
            some of the highest ROI in all of digital marketing.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          The Google Ads ecosystem includes several distinct networks. Search
          ads appear alongside organic results when users type queries.
          Display ads are image or rich-media banners shown on websites in the
          Google Display Network (GDN). Shopping ads showcase product images,
          prices, and merchant names. Video ads run before, during, or alongside
          YouTube content. Performance Max campaigns use machine learning to
          serve ads across all Google channels simultaneously. Understanding
          where each campaign type fits is the foundation of a profitable
          account.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Concepts: The Google Ads Auction
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Every time a user enters a search query, Google runs a lightning-fast
          auction to decide which ads to show and in what order. Understanding
          this auction is critical because it determines your cost-per-click
          (CPC), ad position, and ultimately your return on ad spend (ROAS).
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Ad Rank
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Ad Rank determines where your ad appears. It is calculated using
              your maximum bid, Quality Score, the expected impact of ad
              extensions, and auction-time context signals like device, location,
              and time of day. A higher Ad Rank means a better position, often
              at a lower cost than you might expect.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Quality Score
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Quality Score is rated 1-10 and reflects the relevance and quality
              of your keywords, ad copy, and landing page. It has three
              components: expected click-through rate (CTR), ad relevance, and
              landing page experience. Improving Quality Score lowers your CPC
              and improves your position.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Keyword Match Types
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Match types control which searches trigger your ads. Broad match
              reaches the widest audience using AI to interpret intent. Phrase
              match shows ads when queries include the meaning of your keyword.
              Exact match targets searches with the same meaning as your
              keyword. Negative keywords prevent your ads from showing on
              irrelevant searches — they are just as important as your positive
              keywords.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          The actual CPC you pay is often less than your maximum bid. Google
          uses a second-price auction model (modified by Quality Score), which
          means you only pay the minimum amount needed to beat the Ad Rank of
          the advertiser below you. This is why two advertisers can bid the
          same amount but pay vastly different CPCs based on their Quality
          Scores.
        </p>
        <ul className="space-y-2 text-sm text-slate-300 mt-3">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Broad Match + Smart Bidding</strong> — Google recommends
              pairing broad match with automated bidding strategies to let
              machine learning find converting queries you might miss
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Negative Keywords</strong> — Regularly mine the Search
              Terms report and add irrelevant queries as negatives to stop
              wasted spend
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Quality Score Levers</strong> — Write tightly themed ad
              groups, include keywords in headlines, and ensure your landing
              page loads fast and matches the ad promise
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Strategy &amp; Planning
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          A successful Google Ads account starts with a clear strategy before a
          single keyword is added. Strategy and planning ensure your budget
          flows toward the campaigns most likely to produce results.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Campaign Structure Best Practices
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mb-2">
            Organize your account around business goals: brand campaigns to
            protect branded terms, competitor campaigns to capture comparison
            shoppers, and non-brand campaigns segmented by product line or
            service category. Each campaign should have its own budget to
            prevent high-volume keywords from starving other campaigns.
          </p>
          <p className="text-xs md:text-sm text-slate-400">
            Within campaigns, create tightly themed ad groups with 5-20
            closely related keywords. Single-theme ad groups (sometimes called
            SKAGs or STAGs) make it easier to write relevant ad copy and
            maintain high Quality Scores.
          </p>
        </div>
        <h3 className="font-display font-semibold text-amber mb-2">
          Bidding Strategies
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Google offers manual and automated bidding. Manual CPC gives you full
          control but requires constant optimization. Automated strategies use
          machine learning to adjust bids in real time:
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Maximize Conversions</strong> — Spends your budget to get
              as many conversions as possible; best when you have solid
              conversion tracking
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Target CPA</strong> — Sets bids to achieve your desired
              cost per acquisition; requires at least 30 conversions in 30 days
              for optimal learning
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Target ROAS</strong> — Optimizes for revenue rather than
              volume; ideal for e-commerce with variable order values
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Maximize Clicks</strong> — Drives the most traffic within
              your budget; useful for awareness or data-gathering phases
            </span>
          </li>
        </ul>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Budget allocation should follow the 70/20/10 rule: 70% on proven
          campaigns with strong ROAS, 20% on promising campaigns being scaled,
          and 10% on experimental campaigns testing new keywords, audiences, or
          formats. Review budgets weekly and shift spend toward top performers.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Execution &amp; Implementation
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          With strategy in place, execution is about building campaigns that
          align with your plan and following technical best practices that
          maximize performance from day one.
        </p>
        <h3 className="font-display font-semibold text-amber mb-2">
          Writing Effective Responsive Search Ads (RSAs)
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Responsive Search Ads are the standard ad format on Google Search.
          You provide up to 15 headlines (30 characters each) and 4
          descriptions (90 characters each). Google&apos;s AI tests combinations
          to find the best performers. To get the most out of RSAs:
        </p>
        <ul className="space-y-2 text-sm text-slate-300 mb-4">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Include your primary keyword in at least 3 headlines
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Feature unique value propositions, prices, and promotions in
              separate headlines so they can combine freely
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Pin critical headlines (like your brand name or main CTA) to
              position 1 or 2 to guarantee they always show
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Use all 15 headline slots and all 4 description slots for maximum
              testing surface
            </span>
          </li>
        </ul>
        <h3 className="font-display font-semibold text-amber mb-2">
          Ad Extensions (Assets)
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Ad extensions (now called assets) expand your ad with extra
          information and increase click-through rates by 10-15% on average.
          Key extensions include:
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Sitelinks
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Direct users to specific pages like pricing, features, or contact.
              Use 4-8 sitelinks per campaign with unique descriptions.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Callout Extensions
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Short phrases (25 characters) highlighting benefits like
              &quot;Free Shipping&quot; or &quot;24/7 Support.&quot; They do not
              link anywhere but boost CTR.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Structured Snippets
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Predefined headers (Brands, Services, Types) with values. They
              help users understand your offering before they click.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Conversion tracking is non-negotiable. Install the Google Ads tag on
          your website and set up conversion actions for purchases, leads, phone
          calls, and other key events. Without accurate conversion data, Smart
          Bidding cannot optimize and you cannot calculate true ROAS. Use Google
          Tag Manager for clean implementation and set proper attribution
          windows — typically 30 days for click-through and 1 day for
          view-through conversions.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Measurement &amp; Optimization
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Running ads without rigorous measurement is like driving with a
          blindfold. Google Ads provides a wealth of metrics, but knowing which
          ones to focus on — and how to act on them — is what separates
          profitable accounts from money pits.
        </p>
        <h3 className="font-display font-semibold text-amber mb-2">
          Key Metrics to Track
        </h3>
        <ul className="space-y-2 text-sm text-slate-300 mb-4">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>CTR (Click-Through Rate)</strong> — Clicks divided by
              impressions. A higher CTR indicates relevance and feeds back
              into Quality Score. Search benchmarks range from 3-5%.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>CPC (Cost Per Click)</strong> — What you actually pay per
              click. Monitor trends; rising CPCs may signal increased
              competition or declining Quality Score.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Conversion Rate</strong> — The percentage of clicks that
              lead to a conversion. Low conversion rates often point to landing
              page issues rather than ad problems.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>CPA (Cost Per Acquisition)</strong> — Total cost divided
              by number of conversions. This is your primary efficiency metric.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>ROAS (Return on Ad Spend)</strong> — Revenue divided by
              ad spend. A ROAS of 4:1 means $4 in revenue for every $1 spent.
            </span>
          </li>
        </ul>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Optimization Cadence
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            Daily: Check budgets, pause overspending campaigns, review
            automated bidding alerts. Weekly: Mine search terms, add negatives,
            adjust bids on underperformers. Monthly: Review ad copy performance,
            rotate new creatives, analyze Quality Score trends. Quarterly:
            Audit account structure, revisit strategy, test new campaign types.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Use Google Ads experiments (campaign drafts and experiments) to A/B
          test bidding strategies, ad copy, and landing pages without risking
          your main campaign performance. Run experiments for at least two
          weeks with a statistically significant sample before declaring a
          winner. Combine Google Ads data with Google Analytics 4 to see the
          full user journey — from ad click to website behavior to conversion
          — and identify drop-off points. The best PPC managers treat
          optimization as a never-ending cycle of testing, measuring, and
          iterating.
        </p>
      </section>
    </>
  );
}
