export default function HowMuchDoGoogleAdsCost() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          How the Google Ads Auction Works
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Google Ads does not have fixed prices. Every time someone searches,
          Google runs a real-time auction to determine which ads appear and how
          much each advertiser pays. Understanding this auction is the key to
          controlling your costs.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Your position and cost are determined by Ad Rank, which combines your
          maximum bid, Quality Score, expected ad extension impact, and
          auction-time context signals like device, location, and time of day.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            The Second-Price Auction
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            You don&apos;t pay your maximum bid. You pay the minimum amount
            needed to beat the Ad Rank of the advertiser below you. If your max
            bid is $5 but you only need $3.20 to hold your position, you pay
            $3.20. This means improving Quality Score directly lowers your
            actual cost.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Cost-Per-Click by Industry
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The average CPC across all industries on Google Search is roughly
          $2-$4. But averages hide enormous variation. Your actual costs depend
          heavily on your industry, competition level, and geographic market.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              High-CPC Industries ($10-$100+)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Legal services (personal injury, mesothelioma), insurance,
              financial services, and medical/health keywords. These industries
              have extremely high customer lifetime values, which justifies
              aggressive bidding.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Medium-CPC Industries ($2-$10)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Home services (plumbing, HVAC, roofing), B2B software, education,
              and real estate. Competitive markets with strong commercial
              intent.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Low-CPC Industries ($0.50-$2)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Retail, arts and entertainment, food and beverage, and travel.
              Higher search volume but lower per-click value and often lower
              conversion rates.
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Display Network CPCs are much lower (often $0.50-$1) because
          you&apos;re reaching users who aren&apos;t actively searching. Lower
          intent means lower cost but also lower conversion rates.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          How Quality Score Impacts Cost
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Quality Score is rated 1-10 and is one of the most powerful levers for
          reducing your Google Ads costs. It reflects how relevant and useful
          your ad and landing page are to the user.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Three Components of Quality Score
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; <strong>Expected CTR:</strong> How likely users are to click your ad based on historical performance</li>
            <li>&#10003; <strong>Ad Relevance:</strong> How closely your ad copy matches the user&apos;s search intent</li>
            <li>&#10003; <strong>Landing Page Experience:</strong> How useful, fast, and relevant your landing page is</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          An advertiser with a Quality Score of 8 can often pay 30-50% less per
          click than a competitor with a Quality Score of 4, while maintaining
          equal or better ad positions. The math is straightforward: higher QS
          means higher Ad Rank at lower bids.
        </p>
        <div className="glass rounded-xl p-4 mt-3">
          <h3 className="font-display font-semibold text-amber mb-2">
            How to Improve Quality Score
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; Use tightly themed ad groups (5-10 closely related keywords)</li>
            <li>&#10003; Include keywords in headlines and descriptions</li>
            <li>&#10003; Match landing page content to ad and keyword intent</li>
            <li>&#10003; Improve landing page load speed (under 3 seconds)</li>
            <li>&#10003; Add negative keywords to prevent irrelevant clicks</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Setting Your Budget
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Google Ads has no minimum budget requirement. You can start with as
          little as $5-$10 per day. However, budget directly affects how much
          data you collect, and data is what drives optimization.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Budget Planning Framework
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>&#10003; <strong>Research average CPC</strong> for your keywords using Keyword Planner</li>
            <li>&#10003; <strong>Estimate clicks:</strong> Daily budget ÷ average CPC = daily clicks</li>
            <li>&#10003; <strong>Estimate conversions:</strong> Daily clicks × conversion rate (2-5% typical)</li>
            <li>&#10003; <strong>Calculate CPA:</strong> Daily budget ÷ daily conversions = cost per acquisition</li>
            <li>&#10003; <strong>Compare to value:</strong> Is the CPA lower than customer lifetime value?</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Google may spend up to 2x your daily budget on high-traffic days but
          will never exceed your monthly cap (daily budget × 30.4). For new
          campaigns, start with a budget large enough to get at least 10-15
          clicks per day so you generate meaningful data within the first week.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          If your average CPC is $5 and you want 10 clicks per day, set your
          daily budget at $50. After two weeks, you&apos;ll have enough data to
          evaluate performance and make informed scaling decisions.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Calculating ROI &amp; Profitability
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The ultimate question is not &quot;how much does Google Ads cost?&quot;
          but &quot;does Google Ads make me money?&quot; Two key metrics answer
          this question: CPA (Cost Per Acquisition) and ROAS (Return On Ad
          Spend).
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              CPA (Cost Per Acquisition)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Total ad spend ÷ number of conversions. If you spend $1,000 and
              get 20 leads, your CPA is $50. Compare this to your profit per
              customer to determine if the campaign is sustainable.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              ROAS (Return On Ad Spend)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Revenue generated ÷ ad spend. If you spend $2,000 and generate
              $5,000 in revenue, your ROAS is 2.5x ($2.50 back for every $1
              spent). A ROAS above 1x means revenue exceeds ad cost, but you
              also need to cover product costs and overhead.
            </p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Profitability Checklist
          </h3>
          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>1. Define your target CPA based on profit margins</li>
            <li>2. Run campaigns and collect at least 30 conversions of data</li>
            <li>3. Calculate actual CPA from your campaigns</li>
            <li>4. Compare actual CPA to target — is it lower?</li>
            <li>5. If profitable: increase budget to scale. If not: optimize Quality Score, keywords, and landing pages before spending more</li>
          </ul>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          Remember: a &quot;cheap&quot; click that doesn&apos;t convert costs
          more than an &quot;expensive&quot; click that does. Focus on cost per
          conversion and ROAS, not cost per click. A $50 click that generates a
          $5,000 client is the best deal in advertising.
        </p>
      </section>
    </>
  );
}
