export default function ConversionRateOptimization() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Introduction &amp; Overview
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Conversion Rate Optimization (CRO) is the systematic process of
          increasing the percentage of website visitors who take a desired
          action &mdash; whether that is making a purchase, filling out a lead
          form, subscribing to a newsletter, or clicking a call-to-action
          button. While most marketing disciplines focus on driving{" "}
          <strong>more</strong> traffic, CRO focuses on getting more value from
          the traffic you already have.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Consider a site with 50,000 monthly visitors and a 2% conversion
          rate, producing 1,000 conversions. Increasing the conversion rate to
          3% delivers 1,500 conversions &mdash; a 50% lift &mdash; without
          spending a single extra dollar on advertising. This is the power of
          CRO: it amplifies the ROI of every other marketing channel.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Key Takeaway:</strong> CRO is not
            about guessing what works. It is a data-driven discipline that
            combines analytics, user research, psychology, and rigorous
            experimentation to systematically improve website performance.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          In this lesson you will learn the full CRO methodology, how to use
          heatmaps and session recordings to diagnose problems, how to design
          and run statistically valid A/B tests, landing page optimization
          techniques, UX principles that reduce friction, and the psychology
          of persuasion.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Concepts
        </h2>

        <h3 className="font-display font-semibold text-amber mb-2">
          The CRO Methodology
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Effective CRO follows a structured, repeatable cycle. Each iteration
          builds on the last, creating a compounding improvement engine.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              1. Research &amp; Data Collection
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Analyze quantitative data (GA4, funnel reports) and qualitative
              data (heatmaps, session recordings, surveys, user interviews) to
              identify where users drop off and why.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              2. Hypothesis Formation
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Structure findings as testable hypotheses:{" "}
              <em>
                &quot;If we [change], then [metric] will [improve] because
                [reason].&quot;
              </em>{" "}
              Prioritize using a scoring framework like ICE (Impact, Confidence,
              Ease) or PIE (Potential, Importance, Ease).
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              3. Test Design &amp; Execution
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Design the experiment (A/B test, multivariate test, or split URL
              test), calculate the required sample size, set up the testing
              tool, and launch.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              4. Analysis &amp; Learning
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Wait for statistical significance before calling a winner.
              Document the result &mdash; wins and losses &mdash; and extract
              insights that inform the next round of hypotheses.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              5. Implementation &amp; Iteration
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Roll out winning variations to 100% of traffic. Feed learnings
              back into the research phase and begin the cycle again.
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Behavioral Analytics Tools
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Quantitative analytics tells you <strong>what</strong> is happening;
          behavioral tools tell you <strong>why</strong>.
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Heatmaps</strong> &mdash; Visual overlays showing where
              users click, move their mouse, and how far they scroll. Click
              heatmaps reveal which elements attract attention; scroll heatmaps
              show how much content is actually seen.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Session Recordings</strong> &mdash; Anonymized video
              replays of individual user sessions. Watch for rage clicks,
              hesitation, u-turns, and abandonment patterns.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Form Analytics</strong> &mdash; Track field-level drop-off
              to identify which form fields cause the most friction and
              abandonment.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>On-Site Surveys</strong> &mdash; Short polls triggered at
              key moments (exit intent, post-purchase) asking users about their
              experience, objections, or satisfaction.
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Strategy &amp; Planning
        </h2>

        <h3 className="font-display font-semibold text-amber mb-2">
          Landing Page Optimization
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Landing pages are the primary battleground for CRO. Every element on
          the page should serve one purpose: moving the visitor toward the
          desired action. The key components of a high-converting landing page
          include:
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Headline clarity</strong> &mdash; The headline must
              communicate the value proposition in under 5 seconds. Use the
              &quot;bar test&quot;: if you read it to a stranger in a noisy bar,
              would they understand what you offer?
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Message match</strong> &mdash; The landing page headline
              and imagery must match the ad or link that brought the user there.
              Mismatched messaging creates cognitive dissonance and increases
              bounce rates.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Single call-to-action</strong> &mdash; Limit the page to
              one primary CTA. Multiple competing actions create decision
              paralysis and reduce conversion rates.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Social proof</strong> &mdash; Testimonials, reviews, case
              studies, client logos, and trust badges reduce perceived risk and
              build credibility.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Visual hierarchy</strong> &mdash; Guide the user&apos;s
              eye from headline to supporting copy to CTA using size, color,
              contrast, and white space.
            </span>
          </li>
        </ul>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Persuasion Psychology
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          CRO leverages well-established psychological principles to nudge
          users toward action:
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Scarcity &amp; Urgency
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Limited-time offers and low-stock indicators trigger fear of
              missing out (FOMO). Use honestly &mdash; fake scarcity erodes
              trust.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Reciprocity
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Offer value before asking for something in return. Free tools,
              downloadable guides, and trial periods create a sense of
              obligation.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Loss Aversion
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              People are more motivated by avoiding losses than gaining
              equivalent benefits. Frame CTAs around what the user stands to
              lose by not acting.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Anchoring
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Present a higher-priced option first so that subsequent options
              feel more reasonable by comparison. Common in pricing page design.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Execution &amp; Implementation
        </h2>

        <h3 className="font-display font-semibold text-amber mb-2">
          A/B Testing Fundamentals
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          An <strong>A/B test</strong> (split test) randomly divides traffic
          between two or more page variations and measures which version
          produces a higher conversion rate. To run valid tests, you must
          understand several statistical concepts:
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Statistical significance</strong> &mdash; The confidence
              level (typically 95%) that your observed difference is real and
              not due to random chance. Do not stop tests early just because one
              variant looks better.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Sample size</strong> &mdash; Calculate the minimum sample
              size before launching. Underpowered tests produce unreliable
              results. Use a sample size calculator based on your baseline
              conversion rate and minimum detectable effect.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Test duration</strong> &mdash; Run tests for at least one
              full business cycle (typically 1-2 weeks) to account for day-of-
              week and time-of-day variations.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>One variable at a time</strong> &mdash; In a standard A/B
              test, change only one element per variation. To test multiple
              changes simultaneously, use a multivariate test (MVT).
            </span>
          </li>
        </ul>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Form Optimization
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Forms are where conversions happen, and they are often the biggest
          source of friction. Key optimization techniques include:
        </p>
        <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
          <li>
            <strong>Reduce field count</strong> &mdash; Every additional field
            reduces completion rates. Ask only for information you truly need at
            this stage.
          </li>
          <li>
            <strong>Use smart defaults and autofill</strong> &mdash; Pre-populate
            fields where possible and enable browser autofill for standard fields.
          </li>
          <li>
            <strong>Show progress indicators</strong> &mdash; For multi-step
            forms, a progress bar sets expectations and reduces perceived effort.
          </li>
          <li>
            <strong>Inline validation</strong> &mdash; Validate fields in
            real-time rather than showing errors only after submission.
          </li>
          <li>
            <strong>Descriptive CTA buttons</strong> &mdash; Replace generic
            &quot;Submit&quot; with action-specific text like &quot;Get My Free
            Quote&quot; or &quot;Start My Trial.&quot;
          </li>
        </ol>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          UX Principles for CRO
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          CRO and UX are deeply intertwined. Core UX principles that improve
          conversions include reducing <strong>cognitive load</strong> (simplify
          choices and minimize distractions), ensuring{" "}
          <strong>accessibility</strong> (sufficient color contrast, readable
          fonts, keyboard navigation), optimizing <strong>page speed</strong>{" "}
          (every 100ms delay reduces conversion rates by up to 7%), and
          maintaining <strong>mobile-first design</strong> (thumb-friendly tap
          targets, legible text without zooming, streamlined mobile forms).
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Measurement &amp; Optimization
        </h2>

        <h3 className="font-display font-semibold text-amber mb-2">
          Key CRO Metrics
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Beyond the overall conversion rate, track these metrics to get a
          complete picture of performance:
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Micro-conversion rates</strong> &mdash; Track intermediate
              steps (add to cart, start checkout, newsletter signup) to identify
              exactly where the funnel leaks.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Revenue per visitor (RPV)</strong> &mdash; Total revenue
              divided by total visitors. A better metric than conversion rate
              alone because it accounts for average order value changes.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Time to conversion</strong> &mdash; How long it takes from
              first visit to conversion. Shorter times indicate less friction.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Funnel drop-off rate</strong> &mdash; Percentage of users
              who abandon at each step. Compare across devices, traffic sources,
              and user segments.
            </span>
          </li>
        </ul>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Building a Testing Roadmap
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Sustainable CRO requires a prioritized pipeline of experiments.
          Maintain a <strong>test backlog</strong> with each hypothesis scored
          by potential impact, confidence in the hypothesis, and ease of
          implementation. Focus on high-traffic, high-value pages first &mdash;
          optimizing a page with 100,000 monthly visitors produces results 100x
          faster than a page with 1,000 visitors. Aim to run 2-4 tests per
          month and document every result in a shared{" "}
          <strong>experiment library</strong> so institutional knowledge
          accumulates over time.
        </p>

        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Sources:</strong>{" "}
            <a
              href="https://cxl.com/blog/conversion-rate-optimization-guide/"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              CXL &mdash; CRO Guide
            </a>
            {" · "}
            <a
              href="https://www.nngroup.com/topic/conversion-optimization/"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nielsen Norman Group &mdash; Conversion Optimization
            </a>
            {" · "}
            <a
              href="https://www.hotjar.com/conversion-rate-optimization/"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hotjar &mdash; CRO Methodology
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
