export default function GoogleAnalytics4() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Introduction &amp; Overview
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Google Analytics 4 (GA4) represents a fundamental shift in how we
          measure digital marketing performance. Unlike its predecessor Universal
          Analytics, which relied on session-based tracking with pageviews at its
          core, GA4 is built on an <strong>event-based data model</strong> that
          treats every user interaction as a discrete event. This architecture
          gives marketers unprecedented flexibility to capture exactly the data
          points that matter to their business.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          GA4 was designed for a world where users move seamlessly between
          websites and apps, where privacy regulations limit cookie-based
          tracking, and where machine learning can fill data gaps left by
          declining consent rates. Whether you are tracking an e-commerce store,
          a lead-generation site, or a mobile application, GA4 provides a
          unified measurement framework that follows users across platforms and
          devices.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Key Takeaway:</strong> GA4 is not
            just an upgrade &mdash; it is a complete rethinking of analytics.
            Mastering its event-based model, privacy controls, and AI-powered
            insights is essential for every modern marketer.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          In this lesson you will learn how to set up GA4 from scratch using
          Google Tag Manager, understand the event taxonomy, build custom reports
          and Explorations, configure conversions and audiences, connect GA4 to
          Google Ads, and navigate the privacy landscape.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Concepts
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The backbone of GA4 is the <strong>event-based data model</strong>.
          Every interaction &mdash; a page view, a scroll, a button click, a
          video play, a purchase &mdash; is recorded as an event. Events can
          carry <strong>parameters</strong> (key-value pairs) that add context,
          such as the value of a purchase or the title of a page.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          Event Categories
        </h3>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Automatically Collected Events
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Events GA4 records with no configuration required, such as{" "}
              <strong>first_visit</strong>, <strong>session_start</strong>, and{" "}
              <strong>page_view</strong>. These fire as soon as the GA4 tag
              loads on your site.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Enhanced Measurement Events
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Toggle-activated events that capture common interactions without
              code changes: <strong>scroll</strong> (90% depth),{" "}
              <strong>click</strong> (outbound links),{" "}
              <strong>video_start</strong>, <strong>video_progress</strong>,{" "}
              <strong>video_complete</strong>, <strong>file_download</strong>,
              and <strong>site_search</strong>.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Recommended Events
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Google-defined event names with expected parameters. Using these
              names &mdash; like <strong>add_to_cart</strong>,{" "}
              <strong>begin_checkout</strong>, and <strong>purchase</strong>{" "}
              &mdash; unlocks built-in reports and integrations.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Custom Events
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Events you define to track business-specific interactions such as{" "}
              <strong>calculator_submit</strong>,{" "}
              <strong>pricing_toggle</strong>, or{" "}
              <strong>chatbot_opened</strong>. Custom events require manual
              implementation via Google Tag Manager or the gtag API.
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Users, Sessions &amp; Engagement
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          GA4 uses a <strong>user-centric</strong> measurement model. Each
          visitor is assigned a <strong>Client ID</strong> stored in a
          first-party cookie. If you enable <strong>User-ID</strong>, GA4 can
          stitch together sessions across devices when users log in. Sessions in
          GA4 begin with a <strong>session_start</strong> event and end after 30
          minutes of inactivity by default. A key metric is{" "}
          <strong>engaged sessions</strong> &mdash; sessions that last longer
          than 10 seconds, have a conversion event, or include at least 2
          pageviews. The <strong>engagement rate</strong> (engaged sessions
          divided by total sessions) has replaced bounce rate as the primary
          quality indicator.
        </p>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Data Streams &amp; Google Tag Manager
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          A <strong>data stream</strong> connects a website or app to your GA4
          property. Each web stream generates a <strong>Measurement ID</strong>{" "}
          (starting with G-) that you place on your site.{" "}
          <strong>Google Tag Manager (GTM)</strong> is the recommended
          deployment method because it lets you add, edit, and version-control
          tags without touching your site&apos;s source code. Within GTM you
          create a <strong>GA4 Configuration tag</strong> that fires on all
          pages and additional <strong>GA4 Event tags</strong> for custom
          interactions.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Strategy &amp; Planning
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Before you configure a single tag, you need a{" "}
          <strong>measurement plan</strong>. This document translates business
          objectives into trackable metrics and events, ensuring every data
          point you collect has a clear purpose.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          Building a Measurement Plan
        </h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Define business objectives</strong> &mdash; What does
              success look like? Examples: increase online sales, generate
              qualified leads, grow newsletter subscribers.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Map objectives to KPIs</strong> &mdash; For each objective
              choose 2-3 measurable indicators such as conversion rate, cost per
              acquisition, or average order value.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Identify required events</strong> &mdash; List which
              automatically collected, enhanced measurement, recommended, and
              custom events are needed.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Define event parameters &amp; custom dimensions</strong>{" "}
              &mdash; Determine what additional context you need (e.g.,
              product_category, form_name, content_group).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Document conversion events</strong> &mdash; Decide which
              events count as conversions (called Key Events in GA4) and
              configure them in the admin panel.
            </span>
          </li>
        </ul>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Audiences &amp; Segments
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          GA4 <strong>audiences</strong> are groups of users defined by
          conditions you set &mdash; such as users who visited the pricing page
          but did not convert, users from a specific city, or users who spent
          more than $100 in the last 30 days. Audiences update dynamically and
          can be shared directly with Google Ads for remarketing. You should
          plan your audiences alongside your measurement plan so the right
          user-scoped and event-scoped custom dimensions are collected.
        </p>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          GA4 &amp; Google Ads Integration
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Linking GA4 to Google Ads unlocks bidirectional data flow. GA4
          conversion events (Key Events) can be imported into Google Ads as
          conversion actions, enabling <strong>smart bidding</strong> strategies
          such as Target CPA and Target ROAS to optimize toward real business
          outcomes rather than just clicks. GA4 audiences can be pushed to
          Google Ads for remarketing lists, and Google Ads campaign data
          (cost, clicks, impressions) flows back into GA4 for unified reporting.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Execution &amp; Implementation
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          With your measurement plan in hand, it is time to implement. The
          recommended workflow uses <strong>Google Tag Manager</strong> for tag
          deployment and GA4&apos;s <strong>DebugView</strong> for real-time
          validation.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          Step-by-Step GTM Setup
        </h3>
        <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
          <li>
            Create a GTM container and install the container snippet on every
            page of your site (in the &lt;head&gt; and after the opening
            &lt;body&gt; tag).
          </li>
          <li>
            Add a <strong>Google Tag</strong> (formerly GA4 Configuration Tag)
            with your Measurement ID. Set the trigger to &quot;All Pages.&quot;
          </li>
          <li>
            Enable <strong>Enhanced Measurement</strong> in your GA4 data stream
            settings to capture scrolls, outbound clicks, site search,
            video engagement, and file downloads.
          </li>
          <li>
            Create <strong>GA4 Event tags</strong> for each custom event in your
            measurement plan. Use triggers based on clicks, form submissions,
            or custom JavaScript events.
          </li>
          <li>
            Register <strong>custom dimensions and metrics</strong> in the GA4
            admin under Custom Definitions so that event parameters appear in
            reports.
          </li>
          <li>
            Mark the appropriate events as <strong>Key Events</strong>{" "}
            (conversions) in GA4 Admin &gt; Key Events.
          </li>
        </ol>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Explorations
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          GA4 <strong>Explorations</strong> provide an advanced analysis
          workspace that goes far beyond standard reports. Key exploration
          types include:
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Free-Form Exploration
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              A drag-and-drop table/chart builder. Add dimensions as rows,
              metrics as values, and apply segments to compare user groups.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Funnel Exploration
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Visualize step-by-step conversion paths. You can create open or
              closed funnels and break them down by device, campaign, or any
              dimension.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Path Exploration
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              A tree-style visualization showing the sequence of pages or events
              users follow. Great for discovering unexpected navigation patterns.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Cohort &amp; User Lifetime
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Group users by shared characteristics (acquisition date, first
              event) and analyze retention and lifetime value over time.
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Debugging &amp; Validation
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Always validate your implementation before publishing. Use{" "}
          <strong>GA4 DebugView</strong> (Admin &gt; DebugView) alongside
          GTM&apos;s <strong>Preview mode</strong> and the{" "}
          <strong>Google Analytics Debugger</strong> Chrome extension. Check that
          every event fires on the correct trigger, parameters contain expected
          values, and conversion events register properly.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Measurement &amp; Optimization
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Collecting data is only the beginning. The real value lies in
          turning GA4 data into actionable insights that improve marketing
          performance.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          Standard &amp; Custom Reports
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          GA4&apos;s <strong>Reports</strong> section is organized into
          Lifecycle (Acquisition, Engagement, Monetization, Retention) and
          User (Demographics, Tech) collections. You can customize any report
          by adding or removing metrics and dimensions, or build entirely new{" "}
          <strong>Custom Reports</strong> and add them to the navigation.
          Create <strong>report collections</strong> tailored to different
          stakeholders &mdash; executives see high-level KPIs while marketing
          managers drill into channel-level performance.
        </p>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Privacy &amp; Data Controls
        </h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Consent Mode v2</strong> &mdash; Adjusts GA4 tag behavior
              based on user consent. When consent is denied, GA4 sends
              cookieless pings that fuel Google&apos;s behavioral and conversion
              modeling.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Data Retention Settings</strong> &mdash; Choose between 2
              or 14 months for user-level data. This affects Explorations but
              not standard reports, which use aggregated data.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>IP Anonymization</strong> &mdash; GA4 does not log or
              store IP addresses, making it more privacy-friendly by design.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Data Deletion Requests</strong> &mdash; You can submit
              data deletion requests for specific date ranges or user
              identifiers to comply with GDPR and CCPA.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Server-Side Tagging</strong> &mdash; Deploy a server-side
              GTM container to proxy data collection, giving you greater
              control over what data leaves the browser and reducing
              third-party cookie dependence.
            </span>
          </li>
        </ul>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          BigQuery Export &amp; Advanced Analysis
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          GA4 offers a free <strong>BigQuery export</strong> that streams raw
          event-level data into Google&apos;s data warehouse. This is
          transformative for advanced analysis: you can run SQL queries against
          every single event, join GA4 data with CRM or advertising data, and
          build custom attribution models. BigQuery export is available on all
          GA4 properties at no additional cost for GA4 &mdash; you only pay for
          BigQuery storage and query processing.
        </p>

        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Sources:</strong>{" "}
            <a
              href="https://support.google.com/analytics/answer/9164320"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Help &mdash; GA4 Overview
            </a>
            {" · "}
            <a
              href="https://developers.google.com/analytics/devguides/collection/ga4"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GA4 Developer Documentation
            </a>
            {" · "}
            <a
              href="https://support.google.com/tagmanager/answer/6103696"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Tag Manager Help
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
