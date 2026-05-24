export default function FacebookInstagramAds() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Introduction to Meta Advertising
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Meta Ads Manager is the unified platform for running paid campaigns
          across Facebook, Instagram, Messenger, and the Audience Network.
          With over 3 billion monthly active users across Meta&apos;s family of
          apps, no other social advertising platform offers comparable reach and
          targeting depth.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Unlike search advertising where users express intent through queries,
          Meta advertising is primarily interruption-based. Users are scrolling
          feeds, watching Stories, or browsing Reels — your ads must earn
          attention through compelling creative rather than capturing existing
          demand. This makes creative quality the single most important lever in
          Meta advertising.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            The Meta Ads Ecosystem
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            Meta Ads Manager uses a three-tier hierarchy: Campaign (objective),
            Ad Set (targeting, budget, schedule, placements), and Ad (creative
            and copy). This structure lets you test different audiences and
            creatives within a single campaign objective. All campaigns run
            through an auction system similar to Google Ads, but optimized for
            user engagement and advertiser objectives rather than keyword bids.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Meta advertising excels at top-of-funnel awareness, mid-funnel
          consideration, and retargeting. Whether you are an e-commerce brand
          driving purchases, a SaaS company generating leads, or a local
          business building awareness, Meta provides campaign objectives tailored
          to every stage of the buyer journey.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Concepts: Objectives, Audiences &amp; Formats
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Meta&apos;s Outcome-Driven Ad Experiences (ODAX) framework simplifies
          campaign objectives into six categories: Awareness, Traffic,
          Engagement, Leads, App Promotion, and Sales. Choosing the right
          objective is critical because it tells Meta&apos;s algorithm who to
          show your ads to and what actions to optimize for.
        </p>
        <h3 className="font-display font-semibold text-amber mb-2">
          Audience Targeting
        </h3>
        <div className="space-y-3 mb-4">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Core Audiences
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Target users by demographics (age, gender, location, language),
              interests (based on pages liked, content engaged with), and
              behaviors (purchase history, device usage, travel patterns). Layer
              multiple criteria to narrow or broaden your audience.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Custom Audiences
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Upload customer lists (email, phone), target website visitors via
              the Meta Pixel, reach app users, or engage people who interacted
              with your content on Meta. Custom Audiences are the foundation of
              retargeting and are among the highest-converting audience types.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Lookalike Audiences
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Meta finds users who share characteristics with your best
              customers. Start with a 1% Lookalike of your highest-value
              purchasers for the best performance, then expand to 3-5% for
              broader reach. The quality of your source audience directly
              determines Lookalike performance.
            </p>
          </div>
        </div>
        <h3 className="font-display font-semibold text-amber mb-2">
          Ad Formats
        </h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Single Image</strong> — The simplest format; ideal for
              clear offers with strong visuals and concise copy
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Video</strong> — The highest-performing format on Meta;
              prioritize short-form vertical video (under 15 seconds) with
              sound-off captions
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Carousel</strong> — Up to 10 scrollable cards; great for
              showcasing multiple products, features, or telling a story
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Collection / Instant Experience</strong> — Full-screen
              mobile landing pages that load instantly within the app; ideal
              for e-commerce catalogs
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Strategy &amp; Planning
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          A profitable Meta advertising strategy aligns campaign structure with
          the buyer journey, allocates budget based on funnel stage, and builds
          a creative testing framework that continuously finds winning ads.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Full-Funnel Campaign Structure
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mb-2">
            <strong>Top of Funnel (TOF):</strong> Awareness and prospecting
            campaigns using Lookalike Audiences, broad interest targeting, or
            Advantage+ audiences. Budget: 60-70% of total spend.
          </p>
          <p className="text-xs md:text-sm text-slate-400 mb-2">
            <strong>Middle of Funnel (MOF):</strong> Retarget video viewers,
            page engagers, and website visitors who have not converted. Budget:
            15-25% of total spend.
          </p>
          <p className="text-xs md:text-sm text-slate-400">
            <strong>Bottom of Funnel (BOF):</strong> Retarget add-to-cart
            abandoners, past purchasers for upsells, and high-intent Custom
            Audiences. Budget: 10-15% of total spend.
          </p>
        </div>
        <h3 className="font-display font-semibold text-amber mb-2">
          Advantage+ &amp; Automation
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Meta&apos;s Advantage+ suite uses AI to automate targeting,
          placements, and creative. Advantage+ Shopping Campaigns (ASC) have
          become the go-to for e-commerce, consolidating audiences into a single
          campaign that Meta&apos;s algorithm optimizes holistically. For
          non-e-commerce, Advantage+ Audience expands your targeting beyond
          manually selected parameters to find converters the algorithm
          identifies.
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Start with manual campaigns to understand what works, then
              migrate proven setups to Advantage+ for scale
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Set a minimum spend of $100/day per ad set to exit the learning
              phase within 7 days (50 optimization events needed)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Use Campaign Budget Optimization (CBO) to let Meta distribute
              budget across ad sets toward the best performers
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Execution &amp; Implementation
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Execution on Meta is where creative strategy meets technical setup.
          The best targeting in the world cannot save a bad ad, and the best ad
          cannot perform if tracking is broken.
        </p>
        <h3 className="font-display font-semibold text-amber mb-2">
          The Meta Pixel &amp; Conversions API
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The Meta Pixel is a JavaScript snippet installed on your website that
          tracks user actions (page views, add to cart, purchases). However,
          browser privacy changes and iOS App Tracking Transparency have reduced
          Pixel accuracy. The Conversions API (CAPI) sends event data directly
          from your server to Meta, bypassing browser restrictions. Best
          practice is to implement both Pixel and CAPI together (called
          redundant setup) and use Event Match Quality scores to verify data
          quality.
        </p>
        <h3 className="font-display font-semibold text-amber mb-2">
          Creative Best Practices
        </h3>
        <div className="space-y-3 mb-4">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Hook in the First 3 Seconds
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Users scroll fast. Your opening frame or line must stop the thumb.
              Use bold visuals, surprising statements, or direct questions.
              Test multiple hooks for every piece of creative.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Design for Mobile First
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Over 98% of Meta users access via mobile. Use 9:16 vertical
              aspect ratios for Stories and Reels, 1:1 for Feed. Keep text
              minimal on images (under 20% of the image area). Add captions to
              all videos since most are viewed without sound.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              A/B Testing Framework
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Test one variable at a time: creative concept, headline, CTA,
              audience, or placement. Use Meta&apos;s built-in A/B test tool
              or structure manual tests with identical ad sets differing only
              in the variable being tested. Let tests run for 7 days minimum
              before drawing conclusions.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Ensure your domain is verified in Meta Business Suite and configure
          up to 8 priority conversion events for Aggregated Event Measurement.
          This is essential for tracking conversions from iOS 14.5+ users. Use
          UTM parameters on all ad URLs so you can cross-reference Meta data
          with Google Analytics and your CRM.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Measurement &amp; Optimization
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Meta&apos;s reporting ecosystem has evolved significantly in the
          post-iOS 14 world. Understanding how to measure real performance and
          optimize based on accurate data is what separates profitable
          advertisers from those burning budget.
        </p>
        <h3 className="font-display font-semibold text-amber mb-2">
          Key Metrics by Funnel Stage
        </h3>
        <ul className="space-y-2 text-sm text-slate-300 mb-4">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>TOF:</strong> CPM (cost per 1,000 impressions), hook rate
              (3-second video views / impressions), thumbstop ratio, and
              outbound CTR
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>MOF:</strong> CTR, cost per landing page view, engagement
              rate, and video completion rate
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>BOF:</strong> CPA (cost per acquisition), ROAS, cost per
              add-to-cart, and purchase conversion rate
            </span>
          </li>
        </ul>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Creative Fatigue &amp; Refresh Cycles
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            Watch for rising frequency (above 3.0 for prospecting, above 8.0
            for retargeting) combined with declining CTR — this signals creative
            fatigue. Refresh creatives every 2-4 weeks for prospecting and
            every 4-6 weeks for retargeting. Maintain a creative pipeline with
            3-5 new concepts ready to deploy at all times.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Never rely solely on Meta&apos;s reported numbers. Use a multi-touch
          attribution model combining Meta data, Google Analytics, and
          incrementality testing. Meta Conversion Lift studies (available at
          higher spend levels) measure the true incremental impact of your ads
          by comparing a test group that sees ads versus a holdout group.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Optimize continuously by killing ad sets stuck in the learning phase,
          scaling winners by duplicating and increasing budget (no more than
          20% per day), and refreshing audiences as they become saturated.
          The best Meta advertisers treat creative as their primary scaling
          lever — when you find a winning concept, create variations of it
          rather than starting from scratch.
        </p>
      </section>
    </>
  );
}
