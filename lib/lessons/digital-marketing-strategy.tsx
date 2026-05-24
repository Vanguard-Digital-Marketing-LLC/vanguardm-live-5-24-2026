export default function DigitalMarketingStrategy() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Introduction &amp; Overview
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          A digital marketing strategy is a comprehensive plan that outlines how
          your business will achieve its marketing goals through online channels
          such as search, social media, email, and paid advertising. Unlike
          individual tactics — posting on Instagram, running a Google Ad, or
          sending an email blast — a strategy ties every action to a measurable
          business objective and ensures all channels work together
          synergistically.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Too many marketers jump straight to execution without a strategic
          foundation. The result is fragmented campaigns, wasted budget, and an
          inability to explain what is actually driving revenue. Strategy gives
          you the map; tactics are the individual steps you take along the route.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Strategy vs. Tactics
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            <strong className="text-slate-300">Strategy</strong> answers{" "}
            <em>why</em> and <em>where</em> — your positioning, target audience,
            and channel mix. <strong className="text-slate-300">Tactics</strong>{" "}
            answer <em>how</em> — the specific actions you execute within each
            channel. A strategy without tactics is just a dream; tactics without
            strategy is chaos.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          This lesson will walk you through building a full digital marketing
          strategy from scratch — starting with market analysis, moving through
          goal-setting and channel selection, and finishing with integrated
          campaign planning and performance measurement. Whether you are a
          startup founder wearing every hat or a marketing director managing a
          team, these frameworks will help you allocate resources wisely and
          scale predictably.
        </p>
        <ul className="space-y-2 text-sm text-slate-300 mt-3">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Understand the difference between strategy, plans, and tactics
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Learn how to conduct market analysis and competitive research
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Build an integrated, multi-channel marketing plan tied to OKRs
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Create a marketing calendar and budget allocation framework
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Measure performance and iterate with data-driven decision-making
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Concepts
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Before building a strategy, you need a rigorous understanding of your
          market, your audience, and your own strengths and weaknesses. This is
          where foundational analysis comes in.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Market Analysis
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Market analysis is the process of assessing the size, trends, and
          dynamics of your target market. It answers: How big is the
          opportunity? What macro trends are shaping demand? Who are the key
          players? Use frameworks like{" "}
          <strong>PESTLE</strong> (Political, Economic, Social, Technological,
          Legal, Environmental) to map external forces, and{" "}
          <strong>Porter&apos;s Five Forces</strong> to understand competitive
          intensity.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          SWOT Analysis
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          SWOT stands for Strengths, Weaknesses, Opportunities, and Threats.
          Strengths and Weaknesses are internal — things you control like brand
          reputation, team expertise, or budget constraints. Opportunities and
          Threats are external — market gaps, emerging platforms, regulatory
          changes, or competitive moves.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Strengths
            </h3>
            <p className="text-xs text-slate-400">
              Internal advantages — strong brand, loyal customers, proprietary
              data, talented team
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Weaknesses
            </h3>
            <p className="text-xs text-slate-400">
              Internal limitations — small budget, limited staff, outdated tech
              stack, weak brand awareness
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Opportunities
            </h3>
            <p className="text-xs text-slate-400">
              External positives — emerging channels, market gaps, favorable
              trends, competitor weaknesses
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Threats
            </h3>
            <p className="text-xs text-slate-400">
              External risks — new competitors, algorithm changes, economic
              downturns, regulatory shifts
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Audience Segmentation &amp; Personas
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          A strategy must be audience-first. Segment your market by demographics
          (age, location, income), psychographics (values, interests,
          lifestyle), behavioral data (purchase history, engagement patterns),
          and firmographics (company size, industry) for B2B. Build detailed
          buyer personas that include pain points, goals, preferred channels,
          and objections. The more precisely you define who you are talking to,
          the more effectively you can craft messaging and select channels.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Channel Selection Framework
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Not every channel is right for every business. Evaluate channels by
          asking: Where does my audience spend time? What is the cost to acquire
          a customer through this channel? What is the time to impact? How
          scalable is it? Common digital channels include organic search (SEO),
          paid search (PPC), social media (organic and paid), email marketing,
          content marketing, affiliate marketing, and influencer partnerships.
          Prioritize two to three primary channels and test others in smaller
          experiments.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Strategy &amp; Planning
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          With your market research and audience insights in hand, it is time to
          translate analysis into a concrete, actionable plan.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Setting OKRs (Objectives &amp; Key Results)
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          OKRs connect high-level business objectives to measurable marketing
          outcomes. An <strong>Objective</strong> is qualitative and
          inspirational — &quot;Become the go-to brand for sustainable
          fashion.&quot; <strong>Key Results</strong> are quantitative and
          time-bound — &quot;Increase organic traffic by 40% in Q2,&quot;
          &quot;Grow email list to 50,000 subscribers by June,&quot; or
          &quot;Achieve a 3:1 ROAS on paid social.&quot; Typically set three to
          five Key Results per Objective and review them monthly.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Budget Allocation
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Your budget should reflect your strategic priorities. A common
          approach is the <strong>70-20-10 rule</strong>: invest 70% of your
          budget in proven channels that already deliver ROI, 20% in promising
          channels you are scaling, and 10% in experimental or emerging
          channels. Always allocate budget for creative production, tools and
          software, and a testing reserve.
        </p>
        <div className="glass rounded-xl p-4 mt-3">
          <h3 className="font-display font-semibold text-amber mb-1">
            Budget Planning Checklist
          </h3>
          <ul className="space-y-1 text-xs md:text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Define total marketing budget as a percentage of revenue (typically 5-15%)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Allocate by channel based on historical performance data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Reserve 10-15% for testing and experimentation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Include costs for tools, creative production, and agency fees</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Plan for quarterly reviews and reallocation based on performance</span>
            </li>
          </ul>
        </div>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Marketing Calendar
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          A marketing calendar is your operational backbone. Map out campaigns,
          content, launches, and promotions across a 12-month timeline. Include
          key dates such as industry events, seasonal peaks, product launches,
          and cultural moments. Break the calendar into quarterly themes, monthly
          campaigns, and weekly execution tasks. Use project management tools
          like Asana, Monday.com, or Notion to keep teams aligned.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Integrated Campaign Architecture
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          An integrated campaign ensures every channel reinforces the same
          message. Start with a core campaign idea — a big, compelling narrative
          that resonates with your audience. Then adapt it for each channel:
          long-form blog posts for SEO, short-form video for social media,
          targeted ads for paid channels, and personalized sequences for email.
          The key is consistency in messaging with variation in format.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Execution &amp; Implementation
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The best strategy is worthless without disciplined execution. This
          section covers how to bring your plan to life with real workflows,
          team structures, and technology.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Building Your Marketing Stack
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Your marketing technology stack should support your strategy, not
          dictate it. At minimum, you need: an analytics platform (Google
          Analytics 4), a CRM (HubSpot, Salesforce), an email marketing tool
          (Mailchimp, Klaviyo), a social media management tool (Hootsuite,
          Buffer), and an advertising platform (Google Ads, Meta Ads Manager).
          As you scale, add tools for SEO (Ahrefs, SEMrush), project management,
          and marketing automation.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Campaign Launch Process
        </h3>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              1. Creative Briefing
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Document the campaign objective, target audience, key messaging,
              deliverables, deadlines, and success metrics before any production
              begins.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              2. Asset Production
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Create all creative assets — copy, graphics, video, landing pages —
              ensuring brand consistency and platform-specific optimization.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              3. QA &amp; Pre-Launch
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Test all links, tracking pixels, UTM parameters, and conversion
              paths. Verify analytics events fire correctly. Run through a
              pre-launch checklist.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              4. Launch &amp; Monitor
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Go live across all channels simultaneously (or in a planned
              sequence). Monitor performance in real-time for the first 24-48
              hours and be ready to troubleshoot.
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Team Alignment &amp; Communication
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Hold weekly stand-ups to review active campaigns, share learnings, and
          flag blockers. Use a shared dashboard (Google Looker Studio or
          similar) so everyone sees the same data. Document processes in a
          marketing playbook so knowledge is not siloed. When working with
          agencies or freelancers, provide clear briefs with brand guidelines
          and examples of on-brand and off-brand work.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Measurement &amp; Optimization
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Measurement is what separates professional marketing from guesswork.
          Build a measurement framework that connects every metric to a business
          outcome.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Key Performance Indicators (KPIs)
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Map KPIs to each stage of the funnel. For awareness: impressions,
          reach, brand search volume. For consideration: click-through rate,
          engagement rate, time on site. For conversion: conversion rate, cost
          per acquisition (CPA), return on ad spend (ROAS). For retention:
          customer lifetime value (CLV), repeat purchase rate, net promoter
          score (NPS).
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Attribution Models
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Attribution determines which channels get credit for a conversion.
          Common models include last-click (gives all credit to the final
          touchpoint), first-click (credits the discovery channel), linear
          (distributes credit equally), time-decay (weights recent touchpoints
          more heavily), and data-driven (uses machine learning to assign credit
          based on actual impact). No model is perfect — use multiple models to
          triangulate the truth.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Reporting &amp; Iteration
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Build automated dashboards that update daily. Present monthly reports
          to stakeholders that focus on three things: What worked? What did not?
          What are we changing? Use the <strong>PDCA cycle</strong> (Plan, Do,
          Check, Act) for continuous improvement. Every campaign should generate
          documented learnings that feed into the next planning cycle.
        </p>
        <div className="glass rounded-xl p-4 mt-3">
          <h3 className="font-display font-semibold text-amber mb-1">
            Optimization Framework
          </h3>
          <ul className="space-y-1 text-xs md:text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Review performance data weekly; make tactical adjustments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Conduct monthly deep dives; reallocate budget to top performers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Run quarterly strategy reviews; adjust OKRs based on results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>A/B test continuously — headlines, creatives, audiences, landing pages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Document all learnings in a shared knowledge base for future campaigns</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
