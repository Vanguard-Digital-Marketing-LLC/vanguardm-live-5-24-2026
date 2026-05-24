export default function DataDrivenMarketing() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Introduction &amp; Overview
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Data-driven marketing is the practice of making strategic decisions
          based on data analysis and interpretation rather than intuition or
          tradition. In an era where every click, impression, and conversion is
          measurable, the marketers who win are those who can translate raw data
          into <strong>actionable insights</strong> and communicate those
          insights clearly to stakeholders.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          This discipline goes beyond simply reading analytics dashboards. It
          encompasses defining the right <strong>Key Performance Indicators
          (KPIs)</strong>, building dashboards that drive action, using
          statistical models to forecast performance, allocating budgets based
          on data rather than politics, and creating a culture where every
          marketing decision is informed by evidence.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Key Takeaway:</strong>{" "}
            Data-driven marketing is not about having the most data &mdash; it
            is about having the right data, asking the right questions, and
            taking the right actions. The goal is better decisions, not bigger
            spreadsheets.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          In this lesson you will learn how to define and track KPIs that align
          with business objectives, build executive-ready dashboards, apply
          marketing mix modeling and budget allocation frameworks, forecast
          campaign performance, recognize and avoid cognitive biases, and foster
          a data-informed culture across your organization.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Concepts
        </h2>

        <h3 className="font-display font-semibold text-amber mb-2">
          KPIs &amp; Metrics Hierarchy
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Not all metrics are KPIs, and not all KPIs matter equally. A{" "}
          <strong>metric</strong> is any quantifiable measurement. A{" "}
          <strong>KPI</strong> is a metric that is directly tied to a business
          objective and has a target. Building a metrics hierarchy ensures
          alignment from the C-suite to the campaign manager.
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              North Star Metric
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              The single metric that best captures the core value your company
              delivers. Examples: Monthly Recurring Revenue (SaaS), Gross
              Merchandise Value (e-commerce), Monthly Active Users (apps).
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Business KPIs
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Revenue, profit margin, customer acquisition cost (CAC), customer
              lifetime value (CLV), and return on ad spend (ROAS). These are
              what executives and board members care about.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Channel KPIs
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Cost per click, click-through rate, conversion rate, cost per
              acquisition, and engagement rate. These help marketing managers
              optimize individual channel performance.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Vanity Metrics vs. Actionable Metrics
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Vanity metrics (total page views, social followers) look
              impressive but rarely drive decisions. Actionable metrics
              (conversion rate by source, CAC by channel) directly inform what
              to do next.
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Marketing Mix Modeling (MMM)
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          <strong>Marketing Mix Modeling</strong> is a statistical analysis
          technique that measures the impact of various marketing activities on
          sales and other business outcomes. Unlike digital attribution, MMM
          works with aggregate data (weekly or monthly) and can measure the
          impact of offline channels such as TV, radio, print, and out-of-home
          advertising alongside digital. MMM uses regression analysis to
          decompose total sales into a base (organic demand) and the
          incremental contribution of each marketing channel, accounting for
          external factors like seasonality, economic conditions, and
          competitor activity.
        </p>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Cognitive Biases in Marketing Data
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Even data-driven marketers are susceptible to cognitive biases that
          distort interpretation:
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Confirmation bias</strong> &mdash; Seeking data that
              confirms pre-existing beliefs while ignoring contradictory
              evidence.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Survivorship bias</strong> &mdash; Drawing conclusions
              only from successes while ignoring failures. A portfolio of case
              studies only from winning campaigns gives a distorted view.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Anchoring bias</strong> &mdash; Over-relying on the first
              data point encountered. If last year&apos;s CPA was $50, a $45
              CPA feels like a win even if the benchmark should be $30.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Correlation vs. causation</strong> &mdash; Assuming that
              because two metrics move together, one causes the other. Ice
              cream sales and sunburn rates both rise in summer, but one does
              not cause the other.
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Strategy &amp; Planning
        </h2>

        <h3 className="font-display font-semibold text-amber mb-2">
          Budget Allocation Frameworks
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Data-driven budget allocation replaces gut-feel spending with
          evidence-based distribution. The most common frameworks include:
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Marginal ROI Allocation
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Shift budget toward channels with the highest marginal return
              until marginal ROI equalizes across all channels. This is the
              theoretical optimum but requires accurate response curves for
              each channel.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              70/20/10 Framework
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Allocate 70% to proven channels, 20% to promising channels being
              tested at scale, and 10% to experimental channels. Balances
              short-term performance with long-term learning.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              Portfolio-Based Allocation
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Treat marketing channels like a financial portfolio. Diversify
              across channels with different risk/return profiles to minimize
              overall risk while targeting a desired return.
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Forecasting Campaign Performance
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Forecasting transforms historical data into forward-looking
          predictions. Common approaches include:
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Trend extrapolation</strong> &mdash; Project historical
              growth rates into the future. Simple but fails to account for
              market saturation or competitive changes.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Seasonal decomposition</strong> &mdash; Separate the
              underlying trend from seasonal patterns to produce more accurate
              forecasts for businesses with cyclical demand.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Scenario modeling</strong> &mdash; Build best-case,
              expected, and worst-case scenarios using different assumptions
              about conversion rates, CPCs, and market conditions.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Regression-based forecasting</strong> &mdash; Use
              historical relationships between spend and outcomes to predict
              the result of budget changes.
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Execution &amp; Implementation
        </h2>

        <h3 className="font-display font-semibold text-amber mb-2">
          Building Actionable Dashboards
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          A dashboard is only valuable if it drives action. Follow these
          principles to build dashboards that stakeholders actually use:
        </p>
        <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
          <li>
            <strong>Start with the audience</strong> &mdash; An executive
            dashboard shows 5-8 KPIs with trend lines. A channel manager
            dashboard shows granular campaign metrics with filters.
          </li>
          <li>
            <strong>Lead with the answer</strong> &mdash; Place the most
            critical metric (revenue, conversions, ROAS) at the top left.
            Readers scan in an F-pattern.
          </li>
          <li>
            <strong>Add context</strong> &mdash; Show targets, prior period
            comparisons, and year-over-year trends. A number without context is
            meaningless.
          </li>
          <li>
            <strong>Use visual hierarchy</strong> &mdash; Large numbers for
            KPIs, charts for trends, tables for detail. Avoid chart junk and
            unnecessary 3D effects.
          </li>
          <li>
            <strong>Include a narrative layer</strong> &mdash; Add annotations
            for major events (campaign launches, site outages, algorithm
            updates) so viewers understand sudden changes.
          </li>
          <li>
            <strong>Automate data refresh</strong> &mdash; Use tools like
            Looker Studio, Tableau, or Power BI with API connections to ensure
            dashboards always show current data.
          </li>
        </ol>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Executive Reporting
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Executive reports translate marketing data into business language.
          Key principles include:
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Lead with business impact</strong> &mdash; Open with
              revenue, pipeline, or customer acquisition &mdash; not
              impressions or clicks.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Tell a story</strong> &mdash; Structure reports as:
              &quot;What happened &rarr; Why it happened &rarr; What we are
              doing about it.&quot;
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Quantify recommendations</strong> &mdash; Instead of
              &quot;We should increase social spend,&quot; say &quot;Increasing
              social spend by $5,000/month is projected to generate 150
              additional leads at $33 CPA based on Q4 performance.&quot;
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Be honest about failures</strong> &mdash; Presenting only
              wins erodes trust. Discuss underperformance openly and share what
              you learned.
            </span>
          </li>
        </ul>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Building a Data Culture
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          A data-driven organization is not built by tools alone. It requires
          shared <strong>data literacy</strong> so every team member can
          interpret basic metrics, <strong>accessible dashboards</strong> that
          are not locked behind analyst logins, a{" "}
          <strong>test-and-learn mindset</strong> where experimentation is
          encouraged and failure is treated as learning, and{" "}
          <strong>clear data governance</strong> defining who owns which
          metrics, how definitions are standardized, and how data quality is
          maintained.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Measurement &amp; Optimization
        </h2>

        <h3 className="font-display font-semibold text-amber mb-2">
          The Data-Driven Optimization Loop
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Data-driven marketing is a continuous cycle. The optimization loop
          ensures you are always improving:
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              1. Measure
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Collect clean, accurate data from all channels. Ensure tracking
              is implemented correctly and UTM governance is enforced.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              2. Analyze
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Compare performance against targets and benchmarks. Segment data
              by channel, audience, device, and geography to uncover patterns.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              3. Decide
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Translate analysis into clear, prioritized recommendations. Use
              the data to build a business case for each proposed change.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              4. Act
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Implement changes: reallocate budget, launch new tests, pause
              underperforming campaigns, scale winners.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              5. Repeat
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Return to step one with new data generated by your actions.
              Document learnings to build institutional knowledge.
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mt-4 mb-2">
          Advanced Techniques
        </h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Cohort analysis</strong> &mdash; Group customers by
              acquisition date or first action and track how their behavior
              evolves over time. Reveals whether recent cohorts are more or less
              valuable than earlier ones.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>CLV-to-CAC ratio</strong> &mdash; The ratio of customer
              lifetime value to customer acquisition cost. A ratio of 3:1 or
              higher generally indicates healthy unit economics.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Incrementality testing</strong> &mdash; Hold-out
              experiments that measure the true incremental impact of a channel
              by comparing a test group (exposed to ads) with a control group
              (not exposed).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Predictive analytics</strong> &mdash; Use machine learning
              models to predict which leads are most likely to convert, which
              customers are at risk of churning, and which products are likely
              to cross-sell.
            </span>
          </li>
        </ul>

        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Sources:</strong>{" "}
            <a
              href="https://hbr.org/topic/subject/marketing"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Harvard Business Review &mdash; Marketing
            </a>
            {" · "}
            <a
              href="https://www.thinkwithgoogle.com/marketing-strategies/data-and-measurement/"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Think with Google &mdash; Data &amp; Measurement
            </a>
            {" · "}
            <a
              href="https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights"
              className="text-emerald hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              McKinsey &mdash; Marketing &amp; Sales Insights
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
