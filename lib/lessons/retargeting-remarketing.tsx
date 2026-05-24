export default function RetargetingRemarketing() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Introduction to Retargeting &amp; Remarketing
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The vast majority of website visitors leave without converting. In
          fact, average conversion rates across industries hover around 2-4%,
          which means 96-98% of your traffic walks away. Retargeting (also
          called remarketing) is the practice of showing ads to people who have
          already interacted with your brand — visited your website, engaged
          with your content, or started but did not complete a desired action.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Retargeting works because it focuses your ad spend on warm audiences —
          people who already know you exist. These users convert at 2-3x the
          rate of cold prospects and cost significantly less to acquire. Every
          paid advertising strategy should include a retargeting layer to
          recapture lost opportunities.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Retargeting vs. Remarketing
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            While often used interchangeably, retargeting traditionally refers
            to serving display or social ads to past visitors using tracking
            pixels, while remarketing originally described re-engaging
            customers via email. In modern usage, both terms describe the
            broader practice of re-engaging known audiences across any channel.
            This lesson covers all approaches.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Retargeting is available on virtually every advertising platform:
          Google Ads (Display, Search, YouTube), Meta, LinkedIn, TikTok,
          Twitter/X, and programmatic networks. The core mechanics are similar
          across platforms, but each offers unique capabilities for audience
          building and ad delivery.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Concepts: How Retargeting Works
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Retargeting relies on identifying users who have previously interacted
          with your brand and serving them targeted ads. There are two primary
          methods for building retargeting audiences.
        </p>
        <div className="space-y-3 mb-4">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Pixel-Based Retargeting
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              A small piece of JavaScript (the pixel or tag) is placed on your
              website. When someone visits, the pixel drops a cookie in their
              browser and adds them to your retargeting audience. This method
              captures all visitors anonymously and is the most common approach.
              Limitations include cookie-blocking browsers, ad blockers, and
              iOS privacy restrictions.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              List-Based Retargeting
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Upload a list of email addresses or phone numbers to an ad
              platform, which matches them against user accounts. This method
              targets known contacts (leads, customers) rather than anonymous
              visitors. Match rates typically range from 30-70% depending on
              the platform and data quality.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Server-Side Tracking
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Conversions APIs (Meta CAPI, Google Enhanced Conversions,
              LinkedIn CAPI) send event data directly from your server,
              bypassing browser restrictions. This supplements pixel-based
              tracking and is now essential for accurate audience building in
              a privacy-first world.
            </p>
          </div>
        </div>
        <h3 className="font-display font-semibold text-amber mb-2">
          Audience Segmentation
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Not all past visitors are equal. Segmenting your retargeting audiences
          by behavior allows you to deliver the right message to the right
          person at the right time:
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>All Visitors (0-30 days)</strong> — Broad retargeting
              pool; serve general brand or value proposition messaging
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Product/Service Page Viewers</strong> — High-intent
              visitors who browsed specific offerings; serve ads featuring
              those exact products
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Cart Abandoners</strong> — The highest-intent non-buyers;
              serve urgency messaging, discounts, or social proof to close
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Past Customers</strong> — Upsell, cross-sell, or win-back
              campaigns; these users already trust your brand
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Strategy &amp; Planning
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Effective retargeting strategy goes beyond simply showing ads to
          everyone who visited your site. The best retargeting programs use
          segmentation, sequential messaging, and cross-platform coordination
          to guide prospects through the funnel.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Sequential Messaging
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mb-2">
            Instead of showing the same ad repeatedly, use sequential
            messaging to tell a story over time. Day 1-7: Reinforce your value
            proposition and brand. Day 8-14: Share social proof, case studies,
            or testimonials. Day 15-21: Present a specific offer or incentive.
            Day 22-30: Create urgency with limited-time messaging.
          </p>
          <p className="text-xs md:text-sm text-slate-400">
            Implement this by creating separate ad sets with different
            audience windows (1-7 days, 8-14 days, etc.) and excluding the
            previous segments. Each stage gets tailored creative that builds
            on the last.
          </p>
        </div>
        <h3 className="font-display font-semibold text-amber mb-2">
          Frequency Capping
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Frequency capping limits how many times a user sees your ad within a
          given timeframe. Without caps, retargeting can feel stalkerish and
          damage your brand. Guidelines vary by channel:
        </p>
        <ul className="space-y-2 text-sm text-slate-300 mb-4">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Display Network:</strong> 3-5 impressions per user per
              day; 15-20 per week maximum
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Social Media:</strong> Monitor frequency metric; above
              8-10 for retargeting signals fatigue and decreasing returns
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Video/YouTube:</strong> 2-3 views per user per week to
              maintain impact without annoyance
            </span>
          </li>
        </ul>
        <h3 className="font-display font-semibold text-amber mb-2">
          Cross-Platform Retargeting
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Your prospects are not on just one platform. A cross-platform
          retargeting strategy ensures your message follows them from Google
          Search to Instagram to YouTube. Install tracking pixels from all
          major platforms on your site, then allocate retargeting budget based
          on where your audience spends time. Use consistent messaging and
          creative themes across platforms while adapting formats to each
          channel&apos;s strengths (e.g., video for YouTube, carousel for
          Instagram, text overlays for Display).
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Execution &amp; Implementation
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Implementing retargeting requires technical setup, creative
          development tailored to warm audiences, and platform-specific
          configurations that maximize performance.
        </p>
        <h3 className="font-display font-semibold text-amber mb-2">
          Dynamic Retargeting
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Dynamic retargeting automatically shows users the exact products or
          services they viewed on your site. Instead of a generic ad, a user
          who browsed red running shoes sees an ad featuring those exact shoes
          with current pricing. Dynamic retargeting requires:
        </p>
        <div className="space-y-3 mb-4">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Product Feed
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              A structured data file (XML, CSV, or via API) containing your
              product catalog — names, images, prices, URLs, and availability.
              This feeds into Google Merchant Center, Meta Commerce Manager,
              or other platform catalogs.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Event Tracking
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Enhanced pixel events that pass product IDs — ViewContent,
              AddToCart, Purchase — so the platform can match user behavior to
              catalog items. Implementation varies by platform but all follow
              the same principle.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Template Customization
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Most platforms offer customizable dynamic ad templates. Add your
              brand colors, overlay prices, highlight discounts, and include
              urgency elements. On Meta, Dynamic Product Ads (DPA) in
              Advantage+ Shopping campaigns handle this automatically.
            </p>
          </div>
        </div>
        <h3 className="font-display font-semibold text-amber mb-2">
          Privacy Compliance
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Retargeting operates in an increasingly regulated privacy landscape.
          Compliance is not optional:
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Cookie Consent:</strong> Implement a cookie consent
              management platform (CMP) that blocks tracking pixels until users
              opt in, as required by GDPR and similar regulations
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Privacy Policy:</strong> Clearly disclose your use of
              retargeting technologies and provide opt-out instructions
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Data Handling:</strong> When uploading customer lists,
              use hashed data (SHA-256) and comply with each platform&apos;s
              data use policies
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>First-Party Data:</strong> Invest in building first-party
              data strategies (email lists, logged-in users) as third-party
              cookies continue to deprecate
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Measurement &amp; Optimization
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Retargeting measurement requires nuance. Because retargeting audiences
          are inherently warmer, the metrics will look better than prospecting
          campaigns — but that does not always mean retargeting is driving
          incremental value.
        </p>
        <h3 className="font-display font-semibold text-amber mb-2">
          Key Metrics
        </h3>
        <ul className="space-y-2 text-sm text-slate-300 mb-4">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>View-Through Conversions</strong> — Conversions that
              happen after someone sees (but does not click) your retargeting
              ad. Use short attribution windows (1-7 days) to avoid
              over-counting
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Frequency</strong> — How many times each user sees your
              ad. Rising frequency with stable or declining conversions means
              you are oversaturating
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Audience Decay</strong> — Track conversion rates across
              audience windows (1-7 days vs. 8-14 days). If 14-30 day
              audiences convert at negligible rates, shorten your window
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Incrementality</strong> — The gold standard; measures
              whether your retargeting ads actually caused conversions that
              would not have happened otherwise
            </span>
          </li>
        </ul>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Incrementality Testing
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            Run holdout tests by withholding retargeting ads from a random
            10-15% of your retargeting audience. Compare the conversion rate
            of the exposed group versus the holdout group. The difference is
            the true incremental lift from retargeting. Many advertisers
            discover that some retargeting audiences (particularly short-window
            cart abandoners) have high incrementality while others
            (general site visitors from 30+ days ago) add little lift.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Optimize retargeting by continuously refining segments, testing new
          creative approaches, adjusting frequency caps, and pruning audiences
          that show low incrementality. The goal is to spend retargeting budget
          where it genuinely accelerates conversions rather than simply taking
          credit for sales that would have happened anyway. Combine retargeting
          data with your CRM and analytics to build a full picture of how
          remarketing touchpoints contribute to the overall customer journey.
        </p>
      </section>
    </>
  );
}
