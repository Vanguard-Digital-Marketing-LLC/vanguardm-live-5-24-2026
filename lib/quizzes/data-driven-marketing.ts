import type { QuizQuestion } from "@/lib/academy-data";

export const dataDrivenMarketingQuiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is data-driven marketing?",
    options: [
      "Marketing that uses the largest datasets available",
      "Making strategic decisions based on data analysis rather than intuition or tradition",
      "Marketing exclusively through digital channels",
      "Using artificial intelligence to replace marketers",
    ],
    correctIndex: 1,
    explanation:
      "Data-driven marketing is the practice of making strategic decisions based on data analysis and interpretation rather than intuition or tradition, ensuring every decision is informed by evidence.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the primary goal of data-driven marketing?",
    options: [
      "Collecting as much data as possible",
      "Building bigger spreadsheets and reports",
      "Making better decisions through the right data and right questions",
      "Replacing all marketing staff with algorithms",
    ],
    correctIndex: 2,
    explanation:
      "The goal of data-driven marketing is better decisions, not bigger spreadsheets. Having the right data, asking the right questions, and taking the right actions is what matters.",
  },
  {
    type: "multiple-choice",
    question:
      "Which of the following is NOT a core component of data-driven marketing?",
    options: [
      "Defining KPIs aligned with business objectives",
      "Building dashboards that drive action",
      "Using statistical models to forecast performance",
      "Making decisions based on the highest-paid person's opinion",
    ],
    correctIndex: 3,
    explanation:
      "Data-driven marketing replaces opinion-based decision-making (sometimes called 'HiPPO' — Highest Paid Person's Opinion) with evidence-based decisions grounded in data.",
  },
  {
    type: "multiple-choice",
    question:
      "What does data-driven marketing go beyond?",
    options: [
      "Digital advertising only",
      "Simply reading analytics dashboards",
      "Social media marketing",
      "Email marketing campaigns",
    ],
    correctIndex: 1,
    explanation:
      "Data-driven marketing goes beyond simply reading dashboards. It encompasses defining KPIs, building actionable dashboards, forecasting, budget allocation, and creating a data-informed culture.",
  },
  {
    type: "true-false",
    question:
      "Data-driven marketing is about having the most data possible.",
    correctAnswer: false,
    explanation:
      "Data-driven marketing is not about having the most data — it is about having the right data, asking the right questions, and taking the right actions. Quality and relevance matter more than quantity.",
  },
  {
    type: "true-false",
    question:
      "A data-informed culture means every marketing decision should be backed by evidence.",
    correctAnswer: true,
    explanation:
      "A data-informed culture encourages all team members to use data as the foundation for decisions, from campaign strategy to budget allocation to creative direction.",
  },
  {
    type: "multi-select",
    question:
      "Which activities are part of data-driven marketing? (Select all that apply)",
    options: [
      "Defining KPIs aligned with business objectives",
      "Building dashboards that drive action",
      "Budget allocation based on data",
      "Making decisions based on gut feeling",
      "Forecasting campaign performance",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "KPI definition, actionable dashboards, data-based budget allocation, and performance forecasting are all core data-driven marketing activities. Gut-feeling decisions are the opposite of data-driven.",
  },
  {
    type: "multi-select",
    question:
      "What skills does a data-driven marketer need? (Select all that apply)",
    options: [
      "Ability to translate data into actionable insights",
      "Clear communication with stakeholders",
      "Understanding of statistical concepts",
      "Advanced coding in multiple programming languages",
      "Awareness of cognitive biases",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Data-driven marketers need to translate data into insights, communicate clearly, understand statistics, and recognize biases. Advanced coding is helpful but not required.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are characteristics of a highly mature data-driven marketing organization? (Select all that apply)",
    options: [
      "Predictive analytics models for forecasting",
      "Automated optimization of campaigns",
      "Integrated dashboards across all channels",
      "Making decisions based on the highest-paid person's opinion",
      "Clear data governance and metric definitions",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Mature data-driven organizations use predictive analytics, automated optimization, integrated dashboards, and clear governance. Opinion-based decision-making is the opposite of data-driven maturity.",
  },
  {
    type: "ordering",
    question:
      "Put these steps of becoming data-driven in the correct order.",
    items: [
      "Build actionable dashboards",
      "Foster a test-and-learn culture",
      "Define clear KPIs and metrics",
      "Implement proper tracking and data collection",
    ],
    correctOrder: [2, 3, 0, 1],
    explanation:
      "Start by defining what to measure (KPIs), then implement tracking to collect data, build dashboards to surface insights, and finally cultivate a culture that acts on data.",
  },
  {
    type: "true-false",
    question:
      "In data-driven marketing, every click, impression, and conversion can be measured.",
    correctAnswer: true,
    explanation:
      "Modern digital marketing provides unprecedented measurement capability. Nearly every user interaction — clicks, impressions, conversions, and more — can be tracked and analyzed.",
  },
  {
    type: "multiple-choice",
    question:
      "What distinguishes data-driven marketing from traditional marketing?",
    options: [
      "Data-driven marketing only uses digital channels",
      "Data-driven marketing bases decisions on analysis rather than tradition or intuition",
      "Traditional marketing does not use any data",
      "Data-driven marketing is only for large enterprises",
    ],
    correctIndex: 1,
    explanation:
      "The key distinction is that data-driven marketing bases strategic decisions on data analysis rather than tradition, intuition, or hierarchy. It applies to all business sizes and both digital and offline channels.",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is the difference between a metric and a KPI?",
    options: [
      "There is no difference; they are the same thing",
      "A KPI is a metric that is directly tied to a business objective and has a target",
      "KPIs are only for executives; metrics are for everyone",
      "Metrics are more important than KPIs",
    ],
    correctIndex: 1,
    explanation:
      "A metric is any quantifiable measurement. A KPI is a specific metric that is directly tied to a business objective and has a defined target. All KPIs are metrics, but not all metrics are KPIs.",
  },
  {
    type: "multiple-choice",
    question: "What is a 'North Star Metric'?",
    options: [
      "The metric with the highest value",
      "The single metric that best captures the core value your company delivers",
      "A metric that only the CEO tracks",
      "The first metric displayed on your dashboard",
    ],
    correctIndex: 1,
    explanation:
      "The North Star Metric is the single metric that best captures the core value your company delivers to customers — such as MRR for SaaS, GMV for e-commerce, or MAU for apps.",
  },
  {
    type: "multiple-choice",
    question:
      "Which of the following is a vanity metric?",
    options: [
      "Conversion rate by traffic source",
      "Total social media followers",
      "Customer acquisition cost by channel",
      "Revenue per visitor",
    ],
    correctIndex: 1,
    explanation:
      "Total social media followers is a vanity metric — it looks impressive but rarely drives decisions. Actionable metrics like conversion rate by source, CAC by channel, and RPV directly inform what to do next.",
  },
  {
    type: "multiple-choice",
    question: "What does Marketing Mix Modeling (MMM) measure?",
    options: [
      "Only digital marketing channel performance",
      "The impact of various marketing activities on sales using aggregate data",
      "Individual user-level attribution",
      "Website usability and UX quality",
    ],
    correctIndex: 1,
    explanation:
      "MMM uses statistical regression on aggregate (weekly/monthly) data to measure the impact of all marketing activities — including offline channels like TV, radio, and print — on business outcomes.",
  },
  {
    type: "multiple-choice",
    question: "What cognitive bias involves seeking data that confirms pre-existing beliefs?",
    options: [
      "Survivorship bias",
      "Anchoring bias",
      "Confirmation bias",
      "Recency bias",
    ],
    correctIndex: 2,
    explanation:
      "Confirmation bias is the tendency to seek, interpret, and remember data that confirms pre-existing beliefs while ignoring contradictory evidence. It is one of the most common biases in data analysis.",
  },
  {
    type: "multiple-choice",
    question:
      "What is survivorship bias in marketing?",
    options: [
      "Only studying customers who have survived the longest",
      "Drawing conclusions only from successes while ignoring failures",
      "Focusing only on surviving competitors",
      "Measuring customer retention rates",
    ],
    correctIndex: 1,
    explanation:
      "Survivorship bias means drawing conclusions only from successes while ignoring failures. A portfolio of case studies showing only winning campaigns gives a distorted view of what works.",
  },
  {
    type: "true-false",
    question:
      "If two metrics move together, one must be causing the other.",
    correctAnswer: false,
    explanation:
      "Correlation does not equal causation. Two metrics can move together due to a shared external factor. Ice cream sales and sunburn rates both rise in summer, but neither causes the other.",
  },
  {
    type: "true-false",
    question:
      "Marketing Mix Modeling can measure the impact of offline channels like TV and radio alongside digital channels.",
    correctAnswer: true,
    explanation:
      "Unlike digital attribution, MMM works with aggregate data and can measure the impact of both offline channels (TV, radio, print, out-of-home) and digital channels in a single model.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are examples of business-level KPIs? (Select all that apply)",
    options: [
      "Revenue",
      "Click-through rate",
      "Customer acquisition cost (CAC)",
      "Customer lifetime value (CLV)",
      "Page scroll depth",
      "Return on ad spend (ROAS)",
    ],
    correctIndices: [0, 2, 3, 5],
    explanation:
      "Revenue, CAC, CLV, and ROAS are business-level KPIs that executives and board members care about. CTR and scroll depth are channel-level or behavioral metrics.",
  },
  {
    type: "multi-select",
    question:
      "Which cognitive biases commonly affect marketing data interpretation? (Select all that apply)",
    options: [
      "Confirmation bias",
      "Survivorship bias",
      "Anchoring bias",
      "Attribution bias",
      "Correlation-causation confusion",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Confirmation bias, survivorship bias, anchoring bias, and correlation-causation confusion are all common biases. 'Attribution bias' is not a recognized cognitive bias in this context.",
  },
  {
    type: "ordering",
    question:
      "Arrange the metrics hierarchy from highest level (executive) to most granular (campaign manager).",
    items: [
      "Cost per click by ad group",
      "North Star Metric (e.g., MRR)",
      "Channel-level conversion rate",
      "Business KPIs (revenue, CAC, CLV)",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "The hierarchy flows from the North Star Metric, to business KPIs like revenue and CAC, to channel-level metrics like conversion rate, down to granular campaign metrics like CPC by ad group.",
  },
  {
    type: "ordering",
    question:
      "Put these MMM components in order from what the model decomposes first to last.",
    items: [
      "Incremental contribution of each channel",
      "External factors (seasonality, economy)",
      "Base demand (organic sales)",
      "Diminishing returns curves",
    ],
    correctOrder: [2, 1, 0, 3],
    explanation:
      "MMM first identifies base demand, then accounts for external factors, then measures incremental contribution per channel, and finally maps diminishing returns curves for budget optimization.",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is the marginal ROI allocation framework?",
    options: [
      "Allocating budget equally across all channels",
      "Shifting budget toward channels with the highest marginal return until marginal ROI equalizes",
      "Always spending the most on the newest channel",
      "Cutting all channels with negative ROI",
    ],
    correctIndex: 1,
    explanation:
      "Marginal ROI allocation shifts budget toward channels with the highest marginal return until marginal ROI equalizes across all channels. This is the theoretical optimum for budget distribution.",
  },
  {
    type: "multiple-choice",
    question: "What does the 70/20/10 budget framework prescribe?",
    options: [
      "70% awareness, 20% consideration, 10% conversion",
      "70% to proven channels, 20% to promising channels at scale, 10% to experimental channels",
      "70% digital, 20% traditional, 10% events",
      "70% paid, 20% organic, 10% social",
    ],
    correctIndex: 1,
    explanation:
      "The 70/20/10 framework allocates 70% to proven channels, 20% to promising channels being tested at scale, and 10% to experimental channels, balancing short-term performance with long-term learning.",
  },
  {
    type: "multiple-choice",
    question:
      "What is trend extrapolation in forecasting?",
    options: [
      "Using surveys to predict future trends",
      "Projecting historical growth rates into the future",
      "Comparing performance to competitor trends",
      "Extrapolating from a single data point",
    ],
    correctIndex: 1,
    explanation:
      "Trend extrapolation projects historical growth rates into the future. It is simple but can be inaccurate if it fails to account for market saturation, competitive changes, or external disruptions.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the advantage of scenario modeling over simple trend extrapolation?",
    options: [
      "Scenario modeling is simpler to implement",
      "It uses multiple assumptions to create best-case, expected, and worst-case forecasts",
      "It only looks at the best-case outcome",
      "It eliminates the need for historical data",
    ],
    correctIndex: 1,
    explanation:
      "Scenario modeling builds best-case, expected, and worst-case scenarios using different assumptions about conversion rates, CPCs, and market conditions, providing a range of possible outcomes.",
  },
  {
    type: "multiple-choice",
    question:
      "What does seasonal decomposition separate in forecasting?",
    options: [
      "Paid traffic from organic traffic",
      "The underlying trend from seasonal patterns",
      "Marketing spend from revenue",
      "New customers from returning customers",
    ],
    correctIndex: 1,
    explanation:
      "Seasonal decomposition separates the underlying trend from recurring seasonal patterns (e.g., holiday spikes, summer dips), producing more accurate forecasts for cyclical businesses.",
  },
  {
    type: "multiple-choice",
    question:
      "How does the portfolio-based budget allocation approach work?",
    options: [
      "Invest everything in the single best-performing channel",
      "Diversify across channels with different risk/return profiles to minimize overall risk",
      "Allocate budget based on team preferences",
      "Split budget equally across all channels regardless of performance",
    ],
    correctIndex: 1,
    explanation:
      "The portfolio approach treats channels like financial investments, diversifying across different risk/return profiles to minimize overall risk while targeting a desired return on marketing investment.",
  },
  {
    type: "multiple-choice",
    question:
      "What does regression-based forecasting use to predict outcomes?",
    options: [
      "Industry benchmarks and competitor data",
      "Historical relationships between spend levels and outcomes",
      "Social media sentiment analysis",
      "Customer survey responses",
    ],
    correctIndex: 1,
    explanation:
      "Regression-based forecasting uses historical relationships between spend and outcomes to predict what would happen if budget is increased or decreased for a given channel.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are common forecasting approaches in data-driven marketing? (Select all that apply)",
    options: [
      "Trend extrapolation",
      "Seasonal decomposition",
      "Scenario modeling",
      "Social listening",
      "Regression-based forecasting",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Trend extrapolation, seasonal decomposition, scenario modeling, and regression-based forecasting are all common forecasting approaches. Social listening is for monitoring brand mentions, not forecasting.",
  },
  {
    type: "multi-select",
    question:
      "Which budget allocation frameworks are commonly used in data-driven marketing? (Select all that apply)",
    options: [
      "Marginal ROI allocation",
      "70/20/10 framework",
      "Portfolio-based allocation",
      "First-come-first-served allocation",
      "Equal distribution across all channels",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Marginal ROI, 70/20/10, and portfolio-based are all strategic allocation frameworks. First-come-first-served and equal distribution are not data-driven approaches.",
  },
  {
    type: "ordering",
    question:
      "Arrange these forecasting approaches from simplest to most sophisticated.",
    items: [
      "Regression-based forecasting",
      "Trend extrapolation",
      "Scenario modeling",
      "Seasonal decomposition",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "Trend extrapolation is the simplest (project a line), seasonal decomposition adds seasonal adjustments, scenario modeling adds multiple assumption sets, and regression analysis is the most sophisticated.",
  },
  {
    type: "multi-select",
    question:
      "Which inputs are needed for effective data-driven budget allocation? (Select all that apply)",
    options: [
      "Historical performance data by channel",
      "Marginal return curves for each channel",
      "Competitor CEO salary data",
      "Conversion volume and cost data",
      "Business objectives and target KPIs",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Effective budget allocation requires historical performance, marginal return curves, conversion data, and clear business objectives. Competitor CEO salary data is irrelevant to budget allocation.",
  },
  {
    type: "multiple-choice",
    question:
      "What is a key limitation of marginal ROI allocation?",
    options: [
      "It is too simple to implement",
      "It only works with two channels",
      "It requires accurate response curves for each channel",
      "It ignores paid advertising entirely",
    ],
    correctIndex: 2,
    explanation:
      "Marginal ROI allocation is theoretically optimal but requires accurate response curves (how outcomes change with spend) for each channel. These curves are difficult and expensive to estimate precisely.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What is the most critical metric to place at the top-left of an executive dashboard?",
    options: [
      "Social media followers",
      "The most critical KPI (revenue, conversions, or ROAS)",
      "Page load speed",
      "Number of published blog posts",
    ],
    correctIndex: 1,
    explanation:
      "Readers scan in an F-pattern, so the most critical metric (revenue, conversions, ROAS) should be placed at the top left where it will be seen first.",
  },
  {
    type: "multiple-choice",
    question:
      "What principle should executive dashboards follow regarding the number of KPIs shown?",
    options: [
      "Show every available metric for completeness",
      "Show 5-8 KPIs with trend lines",
      "Show only one metric per page",
      "Show at least 20 KPIs to demonstrate thoroughness",
    ],
    correctIndex: 1,
    explanation:
      "Executive dashboards should show 5-8 KPIs with trend lines. Too many metrics overwhelm the viewer, while too few may miss important context. Focus on what drives decisions.",
  },
  {
    type: "multiple-choice",
    question: "Why should dashboards include annotations for major events?",
    options: [
      "To make the dashboard look more professional",
      "To fill empty space on the dashboard",
      "So viewers understand sudden changes caused by campaigns, outages, or algorithm updates",
      "Because analytics tools require annotations",
    ],
    correctIndex: 2,
    explanation:
      "Annotations for major events (campaign launches, site outages, algorithm updates) provide context for sudden metric changes, preventing misinterpretation of the data.",
  },
  {
    type: "multiple-choice",
    question:
      "How should executive reports be structured?",
    options: [
      "Start with channel-level metrics and work up to revenue",
      "Present data alphabetically by metric name",
      "What happened, why it happened, what we are doing about it",
      "List every campaign with full details",
    ],
    correctIndex: 2,
    explanation:
      "Executive reports should tell a story: What happened (key results), Why it happened (analysis), and What we are doing about it (recommendations). This structure enables clear decision-making.",
  },
  {
    type: "multiple-choice",
    question:
      "What does 'quantify recommendations' mean in executive reporting?",
    options: [
      "Count the number of recommendations you make",
      "Attach projected outcomes and costs to each recommendation instead of vague suggestions",
      "Rate recommendations on a 1-10 scale",
      "Only recommend changes that cost nothing",
    ],
    correctIndex: 1,
    explanation:
      "Quantified recommendations include projected outcomes and costs — e.g., 'Increasing social spend by $5,000/month is projected to generate 150 additional leads at $33 CPA' — rather than vague suggestions.",
  },
  {
    type: "multiple-choice",
    question:
      "What is data literacy in the context of building a data culture?",
    options: [
      "The ability to write SQL queries",
      "The ability for every team member to interpret basic metrics",
      "Having a degree in data science",
      "Using only numbers in presentations",
    ],
    correctIndex: 1,
    explanation:
      "Data literacy means every team member can understand and interpret basic metrics, not just analysts. This shared capability is foundational to a data-driven organization.",
  },
  {
    type: "true-false",
    question:
      "Executive reports should lead with business impact metrics like revenue and pipeline, not impressions or clicks.",
    correctAnswer: true,
    explanation:
      "Executives care about business outcomes. Reports should open with revenue, pipeline, or customer acquisition — not channel-level metrics like impressions or clicks.",
  },
  {
    type: "true-false",
    question:
      "Presenting only marketing wins in reports builds trust with executives.",
    correctAnswer: false,
    explanation:
      "Presenting only wins erodes trust over time. Discussing underperformance openly and sharing what you learned demonstrates honesty and builds long-term credibility with stakeholders.",
  },
  {
    type: "multi-select",
    question:
      "Which are essential components of a data-driven organizational culture? (Select all that apply)",
    options: [
      "Shared data literacy across the team",
      "Accessible dashboards not locked behind analyst logins",
      "A test-and-learn mindset",
      "Punishing team members for failed experiments",
      "Clear data governance and metric definitions",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Data literacy, accessible dashboards, test-and-learn mindset, and clear governance build a data culture. Punishing failed experiments destroys the experimentation culture that data-driven organizations need.",
  },
  {
    type: "multi-select",
    question:
      "Which dashboard automation tools can connect to marketing data via APIs? (Select all that apply)",
    options: [
      "Looker Studio (Google Data Studio)",
      "Tableau",
      "Power BI",
      "Microsoft Paint",
      "Google Sheets with API connectors",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Looker Studio, Tableau, Power BI, and Google Sheets (with add-ons/API connectors) can all automate data refresh from marketing platforms. Microsoft Paint is an image editor.",
  },
  {
    type: "ordering",
    question:
      "Arrange the elements of an executive report in the recommended presentation order.",
    items: [
      "Detailed channel breakdowns",
      "Recommendations with projected outcomes",
      "Executive summary with top-line KPIs",
      "Analysis of what drove the results",
    ],
    correctOrder: [2, 3, 0, 1],
    explanation:
      "Start with the executive summary (what happened), explain what drove results (why), provide detailed channel breakdowns (supporting data), and close with quantified recommendations (what to do next).",
  },
  {
    type: "ordering",
    question:
      "Put these steps for building a data culture in the recommended order.",
    items: [
      "Encourage experimentation and tolerate failure as learning",
      "Train team members on basic data literacy",
      "Establish data governance and metric definitions",
      "Make dashboards accessible to all stakeholders",
    ],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "First establish governance and definitions so everyone speaks the same language, then train for data literacy, make dashboards accessible, and finally foster experimentation culture.",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What are the steps of the data-driven optimization loop?",
    options: [
      "Plan, Do, Check, Act",
      "Measure, Analyze, Decide, Act, Repeat",
      "Research, Test, Implement",
      "Collect, Store, Report",
    ],
    correctIndex: 1,
    explanation:
      "The data-driven optimization loop is: Measure (collect data), Analyze (find patterns), Decide (prioritize actions), Act (implement changes), and Repeat (start over with new data).",
  },
  {
    type: "multiple-choice",
    question: "What is cohort analysis?",
    options: [
      "Analyzing customers by geographic region",
      "Grouping customers by acquisition date or first action and tracking behavior over time",
      "Comparing products by sales volume",
      "Analyzing website traffic by hour of day",
    ],
    correctIndex: 1,
    explanation:
      "Cohort analysis groups customers by a shared characteristic (usually acquisition date or first action) and tracks how their behavior — retention, spending, engagement — evolves over time.",
  },
  {
    type: "multiple-choice",
    question:
      "What CLV-to-CAC ratio generally indicates healthy unit economics?",
    options: ["1:1 or higher", "2:1 or higher", "3:1 or higher", "10:1 or higher"],
    correctIndex: 2,
    explanation:
      "A CLV:CAC ratio of 3:1 or higher generally indicates healthy unit economics — meaning the lifetime value of a customer is at least three times the cost to acquire them.",
  },
  {
    type: "multiple-choice",
    question: "What is incrementality testing?",
    options: [
      "Gradually increasing ad spend over time",
      "Hold-out experiments comparing exposed and unexposed groups to measure true channel impact",
      "Testing small changes to ad creative",
      "Measuring incremental revenue week over week",
    ],
    correctIndex: 1,
    explanation:
      "Incrementality testing uses hold-out experiments — comparing a test group (exposed to ads) with a control group (not exposed) — to measure the true incremental impact of a marketing channel.",
  },
  {
    type: "multiple-choice",
    question:
      "What can predictive analytics models predict in marketing?",
    options: [
      "Only future revenue",
      "Lead conversion likelihood, churn risk, and cross-sell potential",
      "Only customer demographics",
      "Only website traffic volume",
    ],
    correctIndex: 1,
    explanation:
      "Predictive analytics uses machine learning to predict which leads are most likely to convert, which customers are at risk of churning, and which products are likely to cross-sell.",
  },
  {
    type: "true-false",
    question:
      "The data-driven optimization loop is a one-time process that ends once changes are implemented.",
    correctAnswer: false,
    explanation:
      "The optimization loop is continuous — after implementing changes, you return to the Measure step with new data generated by your actions, creating a never-ending cycle of improvement.",
  },
  {
    type: "true-false",
    question:
      "Cohort analysis can reveal whether recent customer cohorts are more or less valuable than earlier ones.",
    correctAnswer: true,
    explanation:
      "By tracking cohorts over time, you can compare metrics like retention and spending across groups acquired in different periods, revealing trends in customer quality and value.",
  },
  {
    type: "true-false",
    question:
      "A CLV:CAC ratio of 1:1 means the business is highly profitable on each customer.",
    correctAnswer: false,
    explanation:
      "A CLV:CAC ratio of 1:1 means you spend exactly as much to acquire a customer as they are worth — leaving no margin for overhead, operations, or profit. A ratio of 3:1+ is considered healthy.",
  },
  {
    type: "multi-select",
    question:
      "Which are advanced measurement techniques in data-driven marketing? (Select all that apply)",
    options: [
      "Cohort analysis",
      "CLV-to-CAC ratio tracking",
      "Incrementality testing",
      "Vanity metric reporting",
      "Predictive analytics",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Cohort analysis, CLV:CAC tracking, incrementality testing, and predictive analytics are all advanced techniques. Vanity metric reporting is the opposite of sophisticated measurement.",
  },
  {
    type: "multi-select",
    question:
      "What should happen during the 'Analyze' step of the optimization loop? (Select all that apply)",
    options: [
      "Compare performance against targets",
      "Segment data by channel, audience, device, and geography",
      "Immediately cut underperforming channels",
      "Identify patterns and anomalies in the data",
      "Compare to industry benchmarks",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Analysis involves comparing to targets, segmenting data, finding patterns, and benchmarking. Cutting channels is an action step that should come after analysis and decision-making.",
  },
  {
    type: "ordering",
    question:
      "Put the five steps of the data-driven optimization loop in the correct order.",
    items: [
      "Decide",
      "Repeat",
      "Measure",
      "Act",
      "Analyze",
    ],
    correctOrder: [2, 4, 0, 3, 1],
    explanation:
      "The loop follows: Measure (collect data), Analyze (find patterns), Decide (prioritize actions), Act (implement changes), and Repeat (start the cycle again).",
  },
  {
    type: "ordering",
    question:
      "Arrange these measurement techniques from most basic to most advanced.",
    items: [
      "Predictive churn modeling",
      "Basic KPI tracking",
      "Cohort analysis",
      "Incrementality testing",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Basic KPI tracking is foundational, cohort analysis adds time-based segmentation, incrementality testing adds causal measurement, and predictive modeling uses ML for the most advanced analysis.",
  },
];
