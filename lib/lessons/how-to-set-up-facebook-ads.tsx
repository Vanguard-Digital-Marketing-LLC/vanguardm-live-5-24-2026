export default function HowToSetUpFacebookAds() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Setting Up Meta Business Manager
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Before running any ads on Facebook or Instagram, you need a Meta
          Business Manager account. It separates your business assets from your
          personal Facebook profile and provides proper team access, security
          controls, and audit logs.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Visit business.facebook.com and click &quot;Create Account.&quot;
          Enter your business name, your name, and your business email. Once
          created, you&apos;ll add your Facebook Page, create an Ad Account,
          and set up the Meta Pixel — all from within Business Manager.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Key Business Manager Assets
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; <strong>Facebook Page</strong> — required to run ads; your business identity</li>
            <li>&#10003; <strong>Ad Account</strong> — where campaigns live; holds billing and spend data</li>
            <li>&#10003; <strong>Meta Pixel</strong> — JavaScript tracking code for your website</li>
            <li>&#10003; <strong>Product Catalog</strong> — for e-commerce and dynamic ads</li>
            <li>&#10003; <strong>Audiences</strong> — custom and lookalike audiences for targeting</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Installing the Meta Pixel
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The Meta Pixel is a small JavaScript snippet placed on your website
          that tracks visitor actions. It powers conversion tracking,
          retargeting audiences, and the optimization algorithm that makes your
          ads smarter over time.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Standard Events
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Meta defines standard events you should track: PageView (fires on
              every page), Lead (form submissions), Purchase (transactions),
              AddToCart, ViewContent, InitiateCheckout, and more. Using standard
              events lets Meta optimize for specific business outcomes.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Installation via GTM
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              The cleanest method: create a Custom HTML tag in Google Tag
              Manager with the Pixel base code, triggered on All Pages. Then
              create additional Custom HTML tags for each standard event
              (Lead, Purchase) with appropriate triggers.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          After installation, verify the Pixel is working using the Meta Pixel
          Helper Chrome extension. It shows which events are firing on each
          page. Also check Events Manager in Business Manager — you should see
          events appearing within minutes.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Campaign Objectives
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Meta Ads use a three-level structure: Campaign → Ad Set → Ad. The
          campaign level is where you set your objective, which tells
          Meta&apos;s algorithm what to optimize for.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Awareness
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Maximize reach and impressions. Best for brand awareness campaigns
              where you want as many people as possible to see your ad.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Traffic
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Drive people to your website, app, or landing page. Meta
              optimizes for link clicks or landing page views.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Leads
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Collect contact information through Facebook Lead Forms or
              optimize for website conversion events. Great for service
              businesses collecting inquiries.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Sales
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Optimize for purchase events on your website. Requires strong
              Pixel data (50+ conversions per week per ad set is ideal for
              stable optimization).
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Audience Targeting
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Meta&apos;s targeting is fundamentally different from Google Ads.
          Instead of targeting what people search for, you target who people
          are — their demographics, interests, behaviors, and connections to
          your business.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Custom Audiences
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Target people who already know your business: website visitors
              (via Pixel), customer email lists, app users, or people who
              engaged with your Facebook/Instagram content. These are your
              warmest audiences and typically convert at the highest rates.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Lookalike Audiences
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Meta finds new people who share characteristics with your best
              customers. Upload a source audience of 1,000-50,000 high-quality
              users (purchasers, not just visitors) and select a 1%-10%
              similarity range. Start with 1% for highest quality.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Detailed Targeting
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Target by interests (fitness, cooking, real estate), behaviors
              (recent movers, frequent travelers), and demographics (income,
              education, job title). Layer these to narrow your audience.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Ad Creative Best Practices
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          On Facebook and Instagram, creative is the #1 lever for performance.
          The algorithm can find the right people, but your ad must stop the
          scroll and compel action.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Creative Guidelines
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; Use high-quality images or video (vertical 9:16 for Reels/Stories)</li>
            <li>&#10003; Lead with the benefit, not the feature</li>
            <li>&#10003; Keep text overlay minimal — Meta penalizes text-heavy images</li>
            <li>&#10003; Test 3-5 creative variations per ad set</li>
            <li>&#10003; Include a clear, single call-to-action</li>
            <li>&#10003; Refresh creative every 2-4 weeks to combat ad fatigue</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Each ad has: primary text (the copy above the image), headline (below
          the image, bold), description (below headline, optional), and a CTA
          button (Learn More, Sign Up, Shop Now, etc.). Test different hooks in
          your primary text — the first line determines whether someone reads
          further.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Budget, Bidding &amp; Launching
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Meta offers two budget approaches: Campaign Budget Optimization (CBO)
          and Ad Set Budget Optimization (ABO). Your choice affects how spend is
          distributed.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              CBO (Advantage Campaign Budget)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Set one budget at the campaign level. Meta distributes spend
              automatically to the best-performing ad sets. Efficient but you
              lose control over individual ad set spend.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              ABO (Ad Set Budget)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Set a separate budget for each ad set. You control exactly how
              much each audience receives. Better for testing and when you need
              guaranteed spend on specific segments.
            </p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Launch Checklist
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; Pixel verified and firing standard events</li>
            <li>&#10003; Campaign objective matches your business goal</li>
            <li>&#10003; Audience defined (custom, lookalike, or detailed targeting)</li>
            <li>&#10003; Placements set (Automatic is fine to start)</li>
            <li>&#10003; Budget set (minimum ~$20/day for meaningful data)</li>
            <li>&#10003; Ad creative uploaded with copy and CTA</li>
            <li>&#10003; Review ad preview across all placements</li>
            <li>&#10003; Publish and monitor the learning phase (~50 events in 7 days)</li>
          </ul>
        </div>
      </section>
    </>
  );
}
