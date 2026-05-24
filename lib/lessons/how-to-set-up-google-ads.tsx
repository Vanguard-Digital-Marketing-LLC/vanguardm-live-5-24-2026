export default function HowToSetUpGoogleAds() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Getting Started with Google Ads
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Google Ads is the gateway to placing your business at the top of
          search results the moment potential customers are looking for what you
          offer. Before you spend a single dollar, you need a properly
          configured account. This lesson walks you through every step from
          account creation to launching your first campaign.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          To begin, visit ads.google.com and sign in with the Google account you
          want associated with your business advertising. Google will prompt you
          to create a &quot;Smart Campaign&quot; — skip this by clicking
          &quot;Switch to Expert Mode&quot; at the bottom. Expert Mode gives you
          full control over campaign types, bidding strategies, and targeting.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Account Structure Overview
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            Google Ads uses a three-level hierarchy: Account → Campaigns → Ad
            Groups → Ads &amp; Keywords. Your account holds billing and access
            settings. Campaigns define budget, bidding, and geographic targeting.
            Ad Groups contain thematically related keywords and the ads that
            serve for those keywords.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Once in Expert Mode, set your billing country, currency, and time
          zone. These cannot be changed later, so choose carefully. Add a
          payment method (credit card or bank account) under Billing &amp;
          Payments. You won&apos;t be charged until your ads actually run and
          receive clicks.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Campaign Structure &amp; Types
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Google Ads offers several campaign types. For most beginners, a Search
          campaign is the best starting point because it targets users who are
          actively searching for your product or service.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Search Campaigns
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Text ads that appear on Google Search results pages. These capture
              high-intent users who are actively looking for what you sell. Best
              for lead generation, local services, and direct-response goals.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Display Campaigns
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Visual banner ads across millions of websites in the Google
              Display Network. Best for brand awareness, retargeting, and
              reaching users who aren&apos;t actively searching.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Performance Max
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              AI-driven campaigns that serve ads across all Google channels
              (Search, Display, YouTube, Gmail, Maps). Requires strong
              conversion tracking to feed the algorithm.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          When creating your first campaign, select your objective (Sales,
          Leads, or Website Traffic), choose &quot;Search&quot; as the campaign
          type, then configure your settings: campaign name, networks (uncheck
          &quot;Display Network&quot; for Search campaigns), locations, and
          language.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Keyword Match Types
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Keywords tell Google which searches should trigger your ads. Match
          types control how closely a user&apos;s search query must match your
          keyword before your ad is eligible to appear.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Broad Match
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              The default match type. Your ad may show for searches related to
              your keyword, including synonyms, related topics, and variations.
              Example: keyword &quot;plumber&quot; could match &quot;pipe repair
              near me.&quot; Casts the widest net but requires strong negative
              keywords to control spend.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Phrase Match
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Denoted by quotes: &quot;plumber in austin&quot;. Your ad shows
              for searches that include the meaning of your keyword. The query
              can have words before or after, but must contain your phrase&apos;s
              intent. Good balance of reach and control.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Exact Match
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Denoted by brackets: [austin plumber]. Your ad shows only for
              searches with the same meaning as your keyword. Tightest control,
              lowest volume, highest relevance. Best for high-value,
              well-researched terms.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Start with phrase match for most keywords. It provides a good balance
          of reach and relevance. Add negative keywords from your Search Terms
          report weekly to block irrelevant traffic.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Writing Your First Responsive Search Ad
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Responsive Search Ads (RSAs) are the standard ad format on Google
          Search. You provide up to 15 headlines (30 characters each) and 4
          descriptions (90 characters each). Google&apos;s AI tests combinations
          to find what performs best.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            RSA Best Practices
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; Include your target keyword in at least 3 headlines</li>
            <li>&#10003; Write 15 unique headlines — don&apos;t repeat ideas</li>
            <li>&#10003; Use all 4 description slots</li>
            <li>&#10003; Include a clear call-to-action (&quot;Call Now&quot;, &quot;Get a Quote&quot;)</li>
            <li>&#10003; Mention unique selling points (free estimates, 24/7 service, etc.)</li>
            <li>&#10003; Avoid excessive pinning — let Google optimize combinations</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Aim for an &quot;Excellent&quot; Ad Strength score. Google evaluates
          your ad based on relevance, quantity, and diversity of headlines and
          descriptions. Weak ad strength limits your impression share and drives
          up costs.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Budget &amp; Bidding Strategies
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Your daily budget is the average amount you&apos;re willing to spend
          per day. Google may spend up to 2x your daily budget on a given day
          but will never exceed your monthly limit (daily budget × 30.4).
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Maximize Conversions
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Google&apos;s algorithm automatically sets bids to get you the most
              conversions within your budget. Requires conversion tracking to be
              set up. Best for accounts with 30+ conversions per month.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Target CPA (Cost Per Acquisition)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              You set the target cost per conversion and Google optimizes bids
              to average that CPA. Requires historical conversion data. Set your
              target CPA at or slightly above your current average.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Manual CPC
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              You set the maximum cost-per-click for each keyword. Gives full
              control but requires frequent monitoring and adjustment. Best for
              small accounts or when learning how the platform works.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Conversion Tracking Setup
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Conversion tracking is the single most important setup step after
          creating your account. Without it, you&apos;re spending money blind —
          you won&apos;t know which keywords, ads, or campaigns actually drive
          business results.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            What to Track
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; Form submissions (contact forms, quote requests)</li>
            <li>&#10003; Phone calls (from ads, from website, call duration)</li>
            <li>&#10003; Purchases (for e-commerce with transaction values)</li>
            <li>&#10003; Key page views (pricing page, thank-you page)</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          The easiest way to set up conversion tracking is through Google Tag
          Manager (GTM). Create your conversion actions in Google Ads, then
          implement the tracking tags in GTM. Always use GTM Preview mode to
          verify tags fire correctly before publishing.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Set the counting method to &quot;One&quot; for lead-based conversions
          (forms, calls) so the same person submitting twice doesn&apos;t count
          as two leads. Use &quot;Every&quot; for purchase conversions where
          each transaction matters.
        </p>
      </section>
    </>
  );
}
