export default function HowToSetUpGoogleAnalytics() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Creating Your GA4 Property
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Google Analytics 4 (GA4) is Google&apos;s current analytics platform,
          replacing Universal Analytics. It uses an event-based data model,
          meaning every user interaction — page views, clicks, scrolls,
          purchases — is tracked as an event rather than a session-based hit.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          To get started, go to analytics.google.com and click &quot;Start
          measuring.&quot; Enter your account name (usually your business name),
          configure data sharing settings, then create a property. The property
          name should match your website or app name.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Key Setup Choices
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; Set the correct time zone and currency for your business</li>
            <li>&#10003; Select &quot;Web&quot; as the platform for a website</li>
            <li>&#10003; Enter your website URL and name your data stream</li>
            <li>&#10003; Your Measurement ID (G-XXXXXXXXXX) is generated automatically</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          One GA4 property can contain multiple data streams — one for your
          website, one for your iOS app, one for Android. For most businesses
          starting out, you&apos;ll just have a single web data stream.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Installing the Tracking Code
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          There are three common ways to install GA4 on your website. The
          recommended method depends on your technical setup and what other
          tracking tools you use.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Google Tag Manager (Recommended)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              If you already use GTM, add a &quot;Google Analytics: GA4
              Configuration&quot; tag with your Measurement ID and set it to
              fire on &quot;All Pages.&quot; This is the most flexible method
              because you can manage all tracking from one interface.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Google Tag (gtag.js)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Copy the gtag.js snippet from your GA4 data stream settings and
              paste it into the &lt;head&gt; of every page. This is the simplest
              method if you&apos;re not using GTM.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              CMS Plugins
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              WordPress, Shopify, Wix, and other platforms have built-in GA4
              integrations. Just enter your Measurement ID in the platform&apos;s
              analytics settings. Quick but less flexible.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          After installation, verify data is flowing by checking the Realtime
          report in GA4. Visit your website in another tab and confirm you see
          an active user. Allow 24-48 hours for data to appear in standard
          reports.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Events &amp; Conversions
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          GA4 is built on events. There are four categories of events you should
          understand:
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Automatically Collected Events
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Tracked by default when GA4 is installed: page_view, session_start,
              first_visit, user_engagement. No configuration needed.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Enhanced Measurement Events
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Toggled on/off in data stream settings: scroll, outbound_click,
              site_search, video_start, video_progress, video_complete,
              file_download, form_interaction. Enable all of these.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Custom Events
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Events you define for specific business actions: form_submit,
              phone_click, add_to_cart, purchase. Created via GTM or the GA4
              interface. These become your key performance indicators.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          To mark any event as a conversion, go to Admin → Events, find the
          event, and toggle &quot;Mark as conversion.&quot; Conversions are the
          events that represent business value — form submissions, purchases,
          phone calls.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Enhanced Measurement
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Enhanced Measurement is a GA4 feature that automatically tracks
          common interactions without any code changes. It should be your first
          stop after installing GA4.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            What Enhanced Measurement Tracks
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; <strong>Scrolls</strong> — fires when a user reaches 90% of page depth</li>
            <li>&#10003; <strong>Outbound clicks</strong> — clicks leading to external domains</li>
            <li>&#10003; <strong>Site search</strong> — when users use your site&apos;s search feature</li>
            <li>&#10003; <strong>Video engagement</strong> — YouTube embeds (start, progress, complete)</li>
            <li>&#10003; <strong>File downloads</strong> — PDFs, docs, spreadsheets, etc.</li>
            <li>&#10003; <strong>Form interactions</strong> — form starts and submissions</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          To enable, go to Admin → Data Streams → select your stream → toggle
          Enhanced Measurement on. Click the gear icon to configure individual
          events. The form interaction tracking may conflict with GTM-based form
          tracking, so disable it if you have custom form tracking in GTM.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Reports &amp; Explorations
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          GA4 has two reporting systems: standard Reports (pre-built dashboards)
          and Explorations (custom, drag-and-drop analysis). Both are essential
          for understanding your traffic.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Key Standard Reports
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Acquisition → Traffic Acquisition shows where visitors come from
              (organic, paid, social, direct). Engagement → Pages and Screens
              shows which pages get the most views. Monetization shows revenue
              data for e-commerce sites.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Explorations
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Build custom reports with dimensions and metrics you choose. Use
              &quot;Free Form&quot; for tables and charts, &quot;Funnel
              Exploration&quot; to visualize conversion paths, and &quot;Path
              Exploration&quot; to see how users navigate your site.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Check the Realtime report daily during your first week to verify
          tracking is working. Then shift to weekly reviews of Traffic
          Acquisition and Engagement reports to understand what&apos;s driving
          results.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Linking GA4 to Google Ads
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Linking GA4 to Google Ads is critical if you run paid campaigns. The
          link enables audience sharing, conversion import, and richer campaign
          reporting.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Benefits of Linking
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; See Google Ads campaign data directly in GA4 reports</li>
            <li>&#10003; Import GA4 conversions into Google Ads for smarter bidding</li>
            <li>&#10003; Build GA4 audiences and share them with Google Ads for targeting</li>
            <li>&#10003; View full user journeys across paid and organic touchpoints</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          To link, go to GA4 Admin → Product Links → Google Ads Links → Link.
          Select the Google Ads account and enable auto-tagging. Then in Google
          Ads, go to Tools → Conversions → Import and select GA4 conversions to
          use for campaign optimization.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          One common pitfall: importing the same conversion into Google Ads as
          both a GA4 event and a Google Ads tag creates double counting. Choose
          one source per conversion action — either GA4 import or Google Ads tag,
          not both set as primary.
        </p>
      </section>
    </>
  );
}
