export default function MarketingAttribution() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Introduction &amp; Overview
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Marketing attribution is the science of determining which touchpoints
          in a customer&apos;s journey deserve credit for a conversion. In a
          world where a single customer might discover your brand through a
          social media ad, click an email link two days later, search your brand
          name on Google, and finally convert through a retargeting ad,
          attribution answers the critical question:{" "}
          <strong>which channels are actually driving results?</strong>
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Without proper attribution, marketers fly blind. They may pour budget
          into channels that merely assist conversions while starving the
          channels that initiate them &mdash; or vice versa. Attribution
          modeling provides the analytical framework to distribute credit across
          touchpoints, enabling smarter budget allocation and higher overall
          return on ad spend (ROAS).
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Key Takeaway:</strong> Attribution
            is not about finding a single &quot;right&quot; answer. It is about
            building a more complete picture of how your marketing channels work
            together to drive conversions.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          This lesson covers the major attribution models from simple
          single-touch approaches to advanced data-driven and algorithmic
          methods. You will learn how to implement UTM parameters for clean
          tracking, measure performance across channels, adapt to the
          cookieless future, and build a cross-channel measurement framework
          that holds up under scrutiny.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Concepts
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Attribution models fall into two broad categories:{" "}
          <strong>single-touch</strong> models that give 100% credit to one
          touchpoint, and <strong>multi-touch</strong> models that distribute
          credit across several interactions.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          Single-Touch Models
        </h3>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              First-Touch Attribution
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Gives 100% credit to the first interaction that brought the user
              to your site. Best for understanding which channels drive
              awareness and top-of-funnel discovery. Limitation: completely
              ignores the nurturing and closing touchpoints.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Last-Touch Attribution
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Gives 100% credit to the final interaction before conversion. The
              simplest and most common default model. Best for understanding
              what closes deals. Limitation: ignores everything that came before
              the last click.
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Multi-Touch Models
        </h3>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Linear Attribution
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Distributes credit equally across all touchpoints. If a user had 4
              interactions, each receives 25%. Simple and fair but does not
              account for the varying impact of different touchpoints.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Time-Decay Attribution
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Gives more credit to touchpoints closer to the conversion. Uses
              an exponential decay function with a default half-life of 7 days.
              Ideal for short sales cycles where recent interactions matter most.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Position-Based (U-Shaped) Attribution
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Assigns 40% credit to the first touch, 40% to the last touch,
              and distributes the remaining 20% evenly among middle
              interactions. Balances awareness and conversion while
              acknowledging the assist role of middle touchpoints.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Data-Driven Attribution (DDA)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Uses machine learning to analyze your actual conversion data and
              assign credit based on the observed impact of each touchpoint.
              Now the default model in Google Ads and GA4. Requires sufficient
              conversion volume to produce reliable results.
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          UTM Parameters
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          <strong>Urchin Tracking Module (UTM)</strong> parameters are tags
          appended to URLs that identify the source, medium, campaign, term, and
          content of traffic. The five standard UTM parameters are{" "}
          <strong>utm_source</strong> (e.g., google, facebook),{" "}
          <strong>utm_medium</strong> (e.g., cpc, email, social),{" "}
          <strong>utm_campaign</strong> (e.g., spring_sale),{" "}
          <strong>utm_term</strong> (paid keyword), and{" "}
          <strong>utm_content</strong> (ad variation). Consistent UTM usage is
          the foundation of accurate attribution data in GA4 and every other
          analytics platform.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Strategy &amp; Planning
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Choosing the right attribution model depends on your business model,
          sales cycle length, channel mix, and the questions you are trying to
          answer. Most organizations benefit from using multiple models in
          parallel to get a well-rounded view.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          Choosing Your Attribution Model
        </h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Short sales cycles (under 7 days)</strong> &mdash;
              Last-touch or time-decay models work well because the journey is
              compressed and recency matters.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Long sales cycles (B2B, high-value purchases)</strong>{" "}
              &mdash; Position-based or data-driven models capture the
              importance of both discovery and conversion touchpoints.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Awareness-focused campaigns</strong> &mdash; First-touch
              attribution helps you understand which channels drive new audience
              discovery.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Sufficient conversion volume (300+/month)</strong> &mdash;
              Data-driven attribution becomes statistically reliable and should
              be your primary model.
            </span>
          </li>
        </ul>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Building a UTM Governance Framework
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          UTM consistency is critical. A single campaign tagged as
          &quot;Spring_Sale&quot; in one ad and &quot;spring-sale&quot; in
          another creates duplicate entries. Establish a{" "}
          <strong>UTM naming convention document</strong> that defines casing
          rules (always lowercase), separator characters (hyphens or
          underscores), required parameters per channel, and ownership of the
          document. Use a <strong>UTM builder spreadsheet</strong> or a
          centralized tool so every team member generates URLs from the same
          template.
        </p>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Cross-Channel Measurement Strategy
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          True cross-channel measurement requires stitching together data from
          multiple platforms &mdash; Google Ads, Meta Ads, LinkedIn, email, and
          organic. Each platform reports conversions using its own attribution
          logic and lookback windows, which means the sum of conversions
          reported by each platform will always exceed your actual total
          conversions. Use GA4 as your <strong>single source of truth</strong>{" "}
          for cross-channel comparison since it deduplicates users and applies a
          consistent attribution model across all sources.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Execution &amp; Implementation
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Implementing a robust attribution system requires careful technical
          setup and organizational alignment.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          Technical Implementation Steps
        </h3>
        <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
          <li>
            <strong>Tag all paid and owned media links</strong> with UTM
            parameters. Ensure every ad, email, social post, and partner link
            carries proper tracking.
          </li>
          <li>
            <strong>Configure GA4 channel groupings</strong> to correctly
            classify traffic. Review the default channel definitions and create
            custom channel groups for sources that GA4 does not categorize well.
          </li>
          <li>
            <strong>Enable Google Signals</strong> in GA4 for cross-device
            reporting on users who are signed into Google accounts.
          </li>
          <li>
            <strong>Link advertising platforms</strong> &mdash; Connect Google
            Ads, Search Ads 360, Display &amp; Video 360, and Search Console to
            your GA4 property for automatic cost and campaign data import.
          </li>
          <li>
            <strong>Import offline conversions</strong> for businesses where
            the final conversion happens offline (phone calls, in-store
            purchases). Use the GA4 Measurement Protocol or CRM integration.
          </li>
          <li>
            <strong>Set up BigQuery export</strong> for raw event data,
            enabling custom SQL-based attribution models beyond what GA4 offers
            natively.
          </li>
        </ol>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Cookieless Tracking &amp; Privacy
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The deprecation of third-party cookies and rising privacy regulations
          (GDPR, CCPA) are fundamentally changing attribution. Strategies for
          the cookieless era include:
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>First-party data collection</strong> &mdash; Invest in
              login-based experiences, loyalty programs, and newsletter signups
              to build owned identity graphs.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Server-side tracking</strong> &mdash; Move tag execution
              to a server-side GTM container for more reliable data collection
              that is less affected by browser restrictions.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Consent Mode v2</strong> &mdash; Implement Google&apos;s
              Consent Mode to model conversions from users who decline cookies,
              maintaining measurement coverage.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Enhanced Conversions</strong> &mdash; Send hashed
              first-party data (email, phone) with conversion tags to improve
              match rates in Google Ads.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Marketing Mix Modeling (MMM)</strong> &mdash; Supplement
              digital attribution with statistical models that measure channel
              impact using aggregate data, independent of user-level tracking.
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Measurement &amp; Optimization
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Once your attribution system is operational, the focus shifts to
          analyzing the data and continuously optimizing channel allocation.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          Reading Attribution Reports
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          In GA4, navigate to <strong>Advertising &gt; Attribution</strong> to
          view model comparison and conversion path reports. The{" "}
          <strong>Model Comparison</strong> report lets you compare how
          different models allocate credit &mdash; look for channels that gain
          significant credit under first-touch but lose it under last-touch, as
          these are your key awareness drivers. The{" "}
          <strong>Conversion Paths</strong> report shows the actual sequences of
          channels users traverse before converting, revealing common
          multi-step journeys.
        </p>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Optimizing Budget Allocation
        </h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Compare CPA by model</strong> &mdash; Calculate cost per
              acquisition under different attribution models to see if your
              &quot;expensive&quot; channels are actually initiating journeys
              that convert elsewhere.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Identify assist channels</strong> &mdash; Channels with
              high assisted conversion counts but low last-touch conversions
              are undervalued. Cutting them may reduce overall conversions.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Run incrementality tests</strong> &mdash; Hold-out
              experiments (turning a channel off in a specific geo or time
              period) provide causal evidence of a channel&apos;s true impact
              beyond correlation.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Iterate quarterly</strong> &mdash; As your channel mix
              and conversion volume change, revisit your attribution model
              selection and UTM governance. Attribution is an ongoing process,
              not a one-time setup.
            </span>
          </li>
        </ul>

        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Sources:</strong>{" "}
            <a
              href="https://support.google.com/analytics/answer/10596866"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics &mdash; Attribution Models
            </a>
            {" · "}
            <a
              href="https://support.google.com/analytics/answer/11242841"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GA4 Data-Driven Attribution
            </a>
            {" · "}
            <a
              href="https://support.google.com/google-ads/answer/6190164"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads &mdash; Attribution Reporting
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
