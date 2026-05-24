export default function HowToSetUpGoogleTagManager() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          What Is Google Tag Manager?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Google Tag Manager (GTM) is a free tag management system that lets you
          add, edit, and manage marketing and analytics code on your website
          without touching the source code directly. Instead of asking a
          developer to add scripts every time you need a new tracking pixel, you
          install GTM once and manage everything from its web interface.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          GTM operates on three core building blocks: Tags (the code snippets
          that fire), Triggers (the conditions that determine when a tag fires),
          and Variables (dynamic values used by tags and triggers).
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Why Use GTM?
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; Deploy tracking without developer involvement</li>
            <li>&#10003; Version control — roll back to any previous configuration</li>
            <li>&#10003; Built-in debug mode to test before publishing</li>
            <li>&#10003; Centralize all tracking pixels in one interface</li>
            <li>&#10003; Faster page loads compared to multiple hardcoded scripts</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Installing GTM on Your Website
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          To start, visit tagmanager.google.com and create an account and
          container. Choose &quot;Web&quot; as the target platform. GTM will
          generate two code snippets that you need to add to your website.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Snippet 1: JavaScript
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Place this &lt;script&gt; tag as high as possible within the
              &lt;head&gt; section of every page. This is the main GTM runtime
              that loads your container and fires tags.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Snippet 2: No-Script Fallback
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Place this &lt;noscript&gt; iframe immediately after the opening
              &lt;body&gt; tag. It provides basic tracking for users who have
              JavaScript disabled. Both snippets are required.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          For CMS platforms like WordPress, use the &quot;Insert Headers and
          Footers&quot; plugin or your theme&apos;s custom code settings.
          Shopify has a dedicated GTM field in Online Store → Preferences. The
          key rule: install once on every page, then manage everything from
          within GTM.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Tags, Triggers &amp; Variables
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Understanding the relationship between tags, triggers, and variables
          is essential to using GTM effectively.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Tags
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Tags are the tracking code snippets — GA4 configuration, Google
              Ads conversion tracking, Facebook Pixel, custom HTML. Each tag
              needs at least one trigger to tell it when to fire.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Triggers
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Triggers listen for events on your website: page views, clicks,
              form submissions, scroll depth, custom events pushed to the Data
              Layer. When the condition is met, the associated tag fires.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Variables
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Variables capture dynamic values: Page URL, Click Text, Form ID,
              Data Layer values, cookies. Tags and triggers reference variables
              to make decisions. Enable built-in variables in Variables →
              Configure.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Think of it this way: a Tag is &quot;what&quot; to do, a Trigger is
          &quot;when&quot; to do it, and Variables are the &quot;details&quot;
          used in the process.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Setting Up a GA4 Tag
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The most common first tag in GTM is Google Analytics 4. Here&apos;s
          how to set it up step by step:
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Step-by-Step
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>1. Go to Tags → New → Tag Configuration</li>
            <li>2. Select &quot;Google Analytics: GA4 Configuration&quot; (or Google Tag)</li>
            <li>3. Enter your Measurement ID (G-XXXXXXXXXX from GA4)</li>
            <li>4. Under Triggering, select &quot;All Pages&quot;</li>
            <li>5. Name the tag clearly: &quot;GA4 — Configuration&quot;</li>
            <li>6. Save, then Preview to test before publishing</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          For GA4 event tracking (like button clicks or form submissions),
          create a separate &quot;GA4 Event&quot; tag for each event. Set the
          event name (e.g., &quot;form_submit&quot;) and add event parameters as
          needed. Attach a trigger that fires on the specific interaction.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Google Ads Conversion Tag
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          If you run Google Ads, tracking conversions through GTM is the
          standard approach. You need the Conversion ID and Conversion Label
          from your Google Ads account.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Setup Steps
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>1. In Google Ads: Tools → Conversions → New conversion action</li>
            <li>2. Select &quot;Website&quot; → &quot;Use Google Tag Manager&quot;</li>
            <li>3. Copy the Conversion ID and Conversion Label</li>
            <li>4. In GTM: Tags → New → &quot;Google Ads Conversion Tracking&quot;</li>
            <li>5. Paste the Conversion ID and Label</li>
            <li>6. Set the trigger to fire on your thank-you page or form submission</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Important: do NOT also add the global site tag (gtag.js) outside of
          GTM. If GTM handles your Google Ads tag, adding gtag.js separately
          will cause double-counting. Choose one implementation method and stick
          with it.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Preview, Debug &amp; Publish
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Never publish a GTM container without testing first. GTM&apos;s
          Preview mode connects your browser to your workspace and shows exactly
          what is happening in real time.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Using Preview Mode
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; Click Preview in GTM — a debug panel opens alongside your website</li>
            <li>&#10003; Navigate your site and perform the actions you&apos;re tracking</li>
            <li>&#10003; Check &quot;Tags Fired&quot; — your tag should appear with a green checkmark</li>
            <li>&#10003; Check Variables — verify the values are what you expect</li>
            <li>&#10003; Check the Data Layer — confirm events are being pushed correctly</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Once you&apos;ve confirmed everything fires correctly, click Submit to
          publish a new container version. Always add descriptive version names
          and notes (e.g., &quot;Added GA4 + Google Ads conversion
          tracking&quot;). This creates a version history you can roll back to
          if something breaks.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          GTM changes only go live after you publish. Saving in your workspace
          does not affect the live site. This publish-based workflow is one of
          GTM&apos;s biggest advantages — you can draft, test, review, and only
          deploy when ready.
        </p>
      </section>
    </>
  );
}
