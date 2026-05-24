export default function GrowthHacking() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Introduction &amp; Overview
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Growth hacking is an experiment-driven approach to rapid business
          growth that blends marketing, product development, and data analysis.
          Coined by Sean Ellis in 2010, the term describes a mindset where every
          strategy, every feature, and every campaign is evaluated through one
          lens: Does it move the growth needle?
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Unlike traditional marketing, which often relies on large budgets and
          established playbooks, growth hacking prioritizes speed, creativity,
          and iteration. Growth hackers run rapid experiments across the entire
          customer lifecycle — acquisition, activation, retention, referral,
          and revenue (the <strong>AARRR pirate metrics framework</strong>) —
          to find scalable, repeatable growth levers.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            The Growth Hacker Mindset
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            Growth hacking is not a set of tricks — it is a rigorous process.
            Form hypotheses, design minimal experiments, measure results, and
            double down on what works. The goal is to learn fast, fail cheap,
            and scale winners aggressively.
          </p>
        </div>
        <ul className="space-y-2 text-sm text-slate-300 mt-3">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Adopt an experiment-driven mindset for rapid learning
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Understand growth loops and viral mechanics
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Design referral programs and product-led growth strategies
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Use frameworks like ICE to prioritize experiments
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              Measure growth with the right metrics and avoid vanity numbers
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Concepts
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Growth hacking rests on several foundational concepts that distinguish
          it from conventional marketing.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Growth Loops
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Growth loops are self-reinforcing systems where the output of one
          cycle becomes the input of the next. Unlike linear funnels, loops
          compound over time. Example: A user creates content on your
          platform &rarr; that content gets indexed by Google &rarr; new users
          discover it via search &rarr; some of them create their own
          content &rarr; the loop continues. Common growth loop types include
          viral loops, content loops, paid acquisition loops, and sales loops.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Viral Coefficient &amp; K-Factor
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The viral coefficient (K-factor) measures how many new users each
          existing user generates. It is calculated as:{" "}
          <strong>K = invitations sent per user x conversion rate of
          invitations</strong>. If K &gt; 1, you have viral growth — each user
          brings in more than one new user, creating exponential expansion. If
          K is between 0.5 and 1.0, you have strong amplification that
          significantly reduces acquisition costs even without true virality.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Product-Led Growth (PLG)
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          PLG is a strategy where the product itself is the primary vehicle for
          acquisition, conversion, and retention. Instead of relying solely on
          sales teams or paid advertising, PLG companies offer free trials,
          freemium tiers, or self-serve onboarding that lets users experience
          value before paying. Companies like Slack, Dropbox, and Notion grew
          primarily through PLG.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          AARRR — Pirate Metrics
        </h3>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Acquisition
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              How do users find you? Channels: SEO, paid ads, social, referrals,
              content, partnerships.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Activation
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Do users have a great first experience? Measure: signup
              completion, onboarding steps, &quot;aha moment&quot; reached.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Retention
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Do users come back? Measure: day 1/7/30 retention rates, churn
              rate, engagement frequency.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Referral
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Do users tell others? Measure: K-factor, referral program
              conversion rate, NPS score.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Revenue
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Do users pay? Measure: conversion to paid, ARPU, CLV, expansion
              revenue.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Strategy &amp; Planning
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Growth hacking requires a structured approach to experimentation.
          Without prioritization frameworks, you will waste time on low-impact
          tests.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          The ICE Framework
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          ICE stands for <strong>Impact</strong>, <strong>Confidence</strong>,
          and <strong>Ease</strong>. Score each experiment from 1-10 on each
          dimension and average the scores to create a priority ranking.
          Impact: How much will this move the target metric? Confidence: How
          sure are you it will work (based on data, precedent, or intuition)?
          Ease: How quickly and cheaply can you run the experiment?
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Referral Program Design
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Effective referral programs give value to both the referrer and the
          referred. Dropbox famously offered 500MB of extra storage to both
          parties, driving 60% of their signups. When designing your program,
          consider: What reward aligns with your product? Is it double-sided?
          Is the sharing mechanism frictionless? Can you build it into the
          natural product flow rather than making it a separate feature?
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Guerrilla Marketing Tactics
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Guerrilla marketing uses unconventional, low-cost tactics to generate
          outsized attention. Examples include platform hacking (Airbnb&apos;s
          Craigslist integration), community infiltration (engaging
          authentically in forums where your audience gathers), viral content
          campaigns, strategic partnerships, and creative PR stunts. The key
          is asymmetric returns — small investments that generate massive
          awareness.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Experiment Velocity
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          The speed at which you run experiments is a competitive advantage.
          High-growth teams aim for two to three experiments per week. Build a
          backlog of experiment ideas, prioritize them using ICE, assign
          owners, set clear success criteria before launch, and run
          retrospectives after every batch. Use a shared experiment tracker
          (a simple spreadsheet works) to maintain institutional knowledge.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Execution &amp; Implementation
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Bringing growth experiments to life requires cross-functional
          collaboration between marketing, product, engineering, and data teams.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Running Growth Experiments
        </h3>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              1. Ideation
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Brainstorm ideas from data insights, customer feedback, competitor
              analysis, and team creativity. Add every idea to the backlog —
              no idea is too wild at this stage.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              2. Prioritization (ICE Scoring)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Score each idea on Impact, Confidence, and Ease. Pick the top
              three to five for the current sprint. Focus on experiments that
              can deliver results within one to two weeks.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              3. Minimum Viable Test
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Design the smallest possible experiment to validate or invalidate
              your hypothesis. Use landing page tests, email subject line
              changes, or small ad budgets before committing major resources.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              4. Analyze &amp; Scale
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Measure results against your pre-defined success criteria. If
              the experiment wins, scale it across channels. If it fails,
              document the learning and move on. Never fall in love with a
              hypothesis.
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Product-Led Growth Tactics
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Implement PLG by building viral mechanics directly into your product.
          Add &quot;Powered by [Brand]&quot; badges on free-tier outputs.
          Create shareable outputs that expose your brand to new audiences.
          Build invite flows into natural workflow moments. Offer feature
          upgrades triggered by usage milestones. Gate premium features behind
          a paywall that users naturally encounter as they get more value.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Channel Hacking
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Look for underexploited channels where your audience gathers but
          competitors have not yet saturated. Early adopters of TikTok,
          Product Hunt, Reddit communities, and niche newsletters often achieve
          outsized results at low cost. The window of opportunity for each
          channel is temporary, so move fast and be willing to experiment with
          emerging platforms.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Measurement &amp; Optimization
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Growth hacking lives and dies by metrics. Choose the right ones, and
          you will make smart decisions. Choose the wrong ones, and you will
          optimize for vanity.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          North Star Metric
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Your North Star Metric is the single number that best captures the
          core value you deliver to customers. For Airbnb, it is &quot;nights
          booked.&quot; For Slack, it is &quot;messages sent per team.&quot;
          For Spotify, it is &quot;time spent listening.&quot; Every growth
          experiment should ultimately move this metric.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Avoiding Vanity Metrics
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Vanity metrics look impressive but do not drive business outcomes.
          Total page views, social media followers, and app downloads can all
          be misleading. Instead, focus on actionable metrics: activation rate,
          retention rate, revenue per user, and the viral coefficient. Ask:
          Can I make a decision based on this metric? If not, it is vanity.
        </p>

        <div className="glass rounded-xl p-4 mt-3">
          <h3 className="font-display font-semibold text-amber mb-1">
            Growth Metrics Dashboard
          </h3>
          <ul className="space-y-1 text-xs md:text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>North Star Metric — the single most important growth indicator</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Experiment velocity — number of experiments run per week</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Win rate — percentage of experiments that produce positive results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>K-factor — viral coefficient showing referral effectiveness</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span>Payback period — time to recover customer acquisition cost</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
