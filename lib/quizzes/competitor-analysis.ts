import type { QuizQuestion } from "@/lib/academy-data";

export const competitorAnalysisQuiz: QuizQuestion[] = [
  // === SECTION 1: Introduction & Overview (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is the primary purpose of competitor analysis?",
    options: [
      "To copy everything competitors do",
      "To understand the competitive landscape so you can differentiate and capitalize on gaps",
      "To reduce your own marketing budget",
      "To prove your product is the best",
    ],
    correctIndex: 1,
    explanation:
      "Competitor analysis is about understanding the landscape to differentiate, capitalize on gaps, and anticipate market shifts — not about copying competitors.",
  },
  {
    type: "multiple-choice",
    question: "Why is digital marketing particularly well-suited for competitor analysis?",
    options: [
      "Digital marketing is more expensive than traditional",
      "Much competitive data is publicly available online",
      "Digital marketing has fewer competitors",
      "Competitor analysis only works for digital companies",
    ],
    correctIndex: 1,
    explanation:
      "In digital marketing, vast amounts of competitive data are publicly available — keywords, ads, content, social engagement — without needing to spend on primary research.",
  },
  {
    type: "multiple-choice",
    question: "What does competitor analysis help you avoid?",
    options: [
      "Spending any money on marketing",
      "Blind spots in your market understanding",
      "All forms of competition",
      "Using social media",
    ],
    correctIndex: 1,
    explanation:
      "Regular competitor analysis helps you identify opportunities, avoid blind spots, and make strategic decisions based on market reality rather than assumptions.",
  },
  {
    type: "true-false",
    question: "Competitor analysis should only be conducted when a new competitor enters the market.",
    correctAnswer: false,
    explanation:
      "Competitor analysis should be an ongoing process, not a one-time or reactive exercise. Regular monitoring helps you anticipate shifts and maintain competitive advantage.",
  },
  {
    type: "true-false",
    question: "Your positioning, pricing, and messaging are always relative to the alternatives available to customers.",
    correctAnswer: true,
    explanation:
      "Markets do not exist in a vacuum. Customers always compare your offering against alternatives, making your positioning, pricing, and messaging inherently relative to competitors.",
  },
  {
    type: "multi-select",
    question: "What can competitor analysis help you achieve? (Select all that apply)",
    options: [
      "Identify market opportunities",
      "Guarantee market dominance",
      "Anticipate market shifts",
      "Differentiate your positioning",
      "Eliminate all competition",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Competitor analysis helps identify opportunities, anticipate shifts, and differentiate positioning. It cannot guarantee dominance or eliminate competition.",
  },
  {
    type: "multi-select",
    question: "What competitive data is publicly available for digital marketing analysis? (Select all that apply)",
    options: [
      "Keywords competitors rank for",
      "Competitor internal financial statements",
      "Ads competitors are running",
      "Social media engagement rates",
      "Content competitors publish",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "Keyword rankings, running ads, social engagement, and published content are all publicly observable. Internal financial statements are not publicly available for private companies.",
  },
  {
    type: "ordering",
    question: "Put the competitor analysis strategic benefits in order from most immediate to most long-term.",
    items: [
      "Anticipate future market shifts",
      "Identify current competitive gaps",
      "Build a sustainable differentiation strategy",
      "React to immediate competitive threats",
    ],
    correctOrder: [3, 1, 2, 0],
    explanation:
      "The benefits range from immediate (reacting to threats) to identifying current gaps, building sustainable differentiation, and ultimately anticipating future market shifts.",
  },
  {
    type: "multiple-choice",
    question: "What is the danger of NOT conducting regular competitor analysis?",
    options: [
      "You might spend too much on tools",
      "You risk making strategic decisions based on assumptions rather than market reality",
      "Your team will have too much free time",
      "Search engines will penalize your site",
    ],
    correctIndex: 1,
    explanation:
      "Without competitor analysis, you risk basing strategic decisions on assumptions rather than market reality, leading to missed opportunities and poor positioning.",
  },
  {
    type: "multiple-choice",
    question: "Competitor analysis operates at the intersection of which areas?",
    options: [
      "Accounting, HR, and legal",
      "Product, pricing, marketing, and customer intelligence",
      "Manufacturing and logistics",
      "Only social media and PR",
    ],
    correctIndex: 1,
    explanation:
      "Comprehensive competitor analysis examines product and features, pricing and positioning, marketing channels and messaging, and customer reviews and sentiment.",
  },
  {
    type: "multiple-choice",
    question: "What is the correct approach to using competitive intelligence?",
    options: [
      "Copy competitor strategies exactly for guaranteed results",
      "Use insights to inform your own unique strategy, differentiate, and find gaps",
      "Ignore competitor data and rely on intuition",
      "Only focus on competitors larger than your company",
    ],
    correctIndex: 1,
    explanation:
      "The goal is to use competitive intelligence to inform your own unique strategy — differentiate, find gaps, and anticipate shifts — not to replicate what others do.",
  },
  {
    type: "ordering",
    question: "Arrange the competitive intelligence journey from data collection to strategic action.",
    items: [
      "Implement strategic changes",
      "Identify competitors and gather data",
      "Analyze and compare findings",
      "Generate actionable insights",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "The journey flows: identify competitors and gather data, analyze and compare findings, generate actionable insights, and then implement strategic changes.",
  },

  // === SECTION 2: Core Concepts (12 questions) ===
  {
    type: "multiple-choice",
    question: "What defines a 'direct competitor'?",
    options: [
      "Any company in your industry",
      "A company offering the same product or service to the same audience",
      "A company in a different industry that you admire",
      "A company that spends more on advertising than you",
    ],
    correctIndex: 1,
    explanation:
      "Direct competitors offer the same product or service to the same target audience. They are the most immediately relevant competitive threat.",
  },
  {
    type: "multiple-choice",
    question: "What is an 'indirect competitor'?",
    options: [
      "A company with the same name in a different country",
      "A company solving the same problem with a different solution",
      "A company that is not yet profitable",
      "A company that only operates offline",
    ],
    correctIndex: 1,
    explanation:
      "Indirect competitors solve the same customer problem with a different type of solution. For example, meal kit delivery competes indirectly with restaurants and grocery stores.",
  },
  {
    type: "multiple-choice",
    question: "Why should you study aspirational competitors?",
    options: [
      "To copy their exact strategy",
      "To understand where the market is heading and what best-in-class looks like",
      "To hire their employees",
      "To file lawsuits against them",
    ],
    correctIndex: 1,
    explanation:
      "Studying aspirational competitors reveals where the market is heading, what best-in-class looks like, and what strategies work at scale — even if you do not compete directly yet.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of overlaying multiple competitor SWOT matrices?",
    options: [
      "To make a complicated spreadsheet",
      "To reveal where competitors are strong/weak relative to you and identify unique positioning angles",
      "To submit to regulatory agencies",
      "To determine employee salary benchmarks",
    ],
    correctIndex: 1,
    explanation:
      "Overlaying competitor SWOT matrices reveals relative strengths and weaknesses, highlighting where you can differentiate and what unique positioning angles are available.",
  },
  {
    type: "multiple-choice",
    question: "A DIY website builder and a web design agency are what type of competitors?",
    options: [
      "Direct competitors",
      "Indirect competitors",
      "Aspirational competitors",
      "They are not competitors at all",
    ],
    correctIndex: 1,
    explanation:
      "Both solve the same problem (getting a website built) but with different approaches — self-serve software vs. professional service — making them indirect competitors.",
  },
  {
    type: "true-false",
    question: "You should only analyze direct competitors in a competitive analysis.",
    correctAnswer: false,
    explanation:
      "A comprehensive analysis should include direct, indirect, and aspirational competitors. Each type reveals different strategic insights about the market landscape.",
  },
  {
    type: "multi-select",
    question: "Which dimensions should you analyze when studying competitors? (Select all that apply)",
    options: [
      "Product features and pricing",
      "Marketing channels and messaging",
      "Employee personal social media accounts",
      "SEO performance and content strategy",
      "Customer reviews and sentiment",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Analyze competitors across product/pricing, marketing/messaging, SEO/content, and customer sentiment. Individual employee social accounts are not typically relevant.",
  },
  {
    type: "multi-select",
    question: "What can a competitive SWOT matrix reveal? (Select all that apply)",
    options: [
      "Where competitors are strong and you are weak",
      "Where you are strong and competitors are weak",
      "Guaranteed future market outcomes",
      "External opportunities being ignored by competitors",
      "Threats everyone is vulnerable to",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "A competitive SWOT matrix reveals relative strengths and weaknesses, ignored opportunities, and shared threats. It cannot guarantee future outcomes.",
  },
  {
    type: "ordering",
    question: "Arrange competitor types from most directly competing to least directly competing.",
    items: [
      "Aspirational competitors (market leaders you look up to)",
      "Direct competitors (same product, same audience)",
      "Indirect competitors (different solution, same problem)",
    ],
    correctOrder: [1, 2, 0],
    explanation:
      "Direct competitors (same product, same audience) compete most directly, followed by indirect competitors (different solution, same problem), and aspirational competitors (leaders you aspire to compete with).",
  },
  {
    type: "multiple-choice",
    question: "Hiring patterns at a competitor can indicate what?",
    options: [
      "Their office location preferences",
      "Their strategic direction and areas of investment",
      "Their employee satisfaction levels",
      "Their product color schemes",
    ],
    correctIndex: 1,
    explanation:
      "Competitor hiring patterns reveal strategic priorities. Hiring data engineers suggests a focus on analytics; hiring content writers suggests a content strategy investment.",
  },
  {
    type: "multiple-choice",
    question: "What is the technology stack analysis used for in competitor research?",
    options: [
      "To determine what programming language to use",
      "To understand what tools and platforms competitors use, revealing their capabilities and approach",
      "To hack into competitor systems",
      "To reduce your own IT costs",
    ],
    correctIndex: 1,
    explanation:
      "Technology stack analysis reveals what tools and platforms competitors use, providing insight into their capabilities, approach, and areas of investment.",
  },
  {
    type: "multi-select",
    question: "What can analyzing competitor customer reviews reveal? (Select all that apply)",
    options: [
      "Pain points their customers experience",
      "Opportunities for you to differentiate",
      "Competitor internal salary information",
      "Features customers wish they had",
      "Common complaints about service or product quality",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Competitor reviews reveal customer pain points, differentiation opportunities, desired features, and common complaints. Internal salary data is not available in customer reviews.",
  },

  // === SECTION 3: Strategy & Planning (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is a 'content gap' in SEO competitive analysis?",
    options: [
      "A time period when you do not publish content",
      "Keywords with search volume where competitors rank but you have no content",
      "The space between paragraphs on a webpage",
      "A missing image on a blog post",
    ],
    correctIndex: 1,
    explanation:
      "Content gaps are keywords with search volume where competitors rank but you have no content. These represent your highest-opportunity targets for new content creation.",
  },
  {
    type: "multiple-choice",
    question: "In ad intelligence, what does ad longevity typically signal?",
    options: [
      "The ad was forgotten about",
      "The ad is profitable (long-running ads tend to be working)",
      "The ad budget is unlimited",
      "The creative team is lazy",
    ],
    correctIndex: 1,
    explanation:
      "Ads that have been running for a long time are typically profitable — advertisers stop underperforming ads quickly. Longevity signals that the ad is generating positive ROI.",
  },
  {
    type: "multiple-choice",
    question: "Why should you focus on engagement rate rather than follower count when benchmarking social media?",
    options: [
      "Follower count is always accurate",
      "A smaller, highly engaged audience is more valuable than a large, passive one",
      "Engagement rate is easier to fake",
      "Follower count is not visible on social platforms",
    ],
    correctIndex: 1,
    explanation:
      "Engagement rate reveals audience quality. A smaller, highly engaged audience drives more business value than a large following with low interaction rates.",
  },
  {
    type: "multiple-choice",
    question: "What does a positioning matrix help you identify?",
    options: [
      "Your office location on a city map",
      "White space where no competitor is positioned strongly",
      "The most popular social media platforms",
      "Your employees' career positions",
    ],
    correctIndex: 1,
    explanation:
      "A positioning matrix maps competitors on two relevant axes (e.g., price vs. feature complexity) to identify white space — areas where no competitor has a strong position.",
  },
  {
    type: "true-false",
    question: "SpyFu and iSpionage are tools used for ad intelligence and competitor ad monitoring.",
    correctAnswer: true,
    explanation:
      "SpyFu, iSpionage, and Meta Ad Library are tools that help monitor competitor advertising strategies including keywords, ad copy, landing pages, and estimated spend.",
  },
  {
    type: "true-false",
    question: "You should directly copy competitor ad copy that has been running for a long time.",
    correctAnswer: false,
    explanation:
      "While long-running ads signal profitability, you should use these insights to differentiate your own strategy, not copy competitors directly. Direct copying risks brand confusion and legal issues.",
  },
  {
    type: "multi-select",
    question: "Which tools can be used for SEO competitive analysis? (Select all that apply)",
    options: [
      "Ahrefs",
      "SEMrush",
      "Microsoft Word",
      "Moz",
      "Adobe Photoshop",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Ahrefs, SEMrush, and Moz are the primary tools for SEO competitive analysis, offering keyword research, backlink analysis, and domain authority comparisons.",
  },
  {
    type: "multi-select",
    question: "What should you investigate in a competitor's SEO analysis? (Select all that apply)",
    options: [
      "Keywords they rank for that you do not",
      "Their domain authority and backlink profile",
      "Their CEO's personal blog",
      "Content pages driving the most organic traffic",
      "Their site structure and internal linking",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "SEO competitive analysis should examine keyword rankings, domain authority, backlink profiles, top traffic-driving content, and site structure. A CEO's personal blog is not part of standard SEO analysis.",
  },
  {
    type: "ordering",
    question: "Arrange the social media benchmarking metrics from most meaningful to least meaningful.",
    items: [
      "Follower count",
      "Engagement rate",
      "Top-performing content themes",
      "Posting frequency",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Engagement rate is most meaningful (shows audience quality), followed by top-performing content themes (reveals what resonates), posting frequency (shows consistency), and follower count (least meaningful alone).",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of analyzing competitor pricing models?",
    options: [
      "To always price lower than competitors",
      "To understand how competitors think about value and find pricing opportunities",
      "To match competitor prices exactly",
      "To eliminate pricing from your strategy",
    ],
    correctIndex: 1,
    explanation:
      "Analyzing competitor pricing reveals how they think about value, what tiers they offer, and where pricing opportunities exist for differentiation.",
  },
  {
    type: "multi-select",
    question: "How should content gap analysis results be used? (Select all that apply)",
    options: [
      "Prioritize gaps by search volume and commercial intent",
      "Feed high-value gaps directly into the content calendar",
      "Create content only for gaps with zero competition",
      "Target gaps where you can realistically rank",
      "Assess keyword difficulty before committing resources",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Content gap results should be prioritized by volume and intent, fed into the calendar, targeted where you can realistically rank, and assessed for difficulty. Zero competition is unrealistic for valuable keywords.",
  },
  {
    type: "multiple-choice",
    question: "What two axes might a positioning matrix use?",
    options: [
      "Temperature and humidity",
      "Price vs. feature complexity or enterprise vs. SMB focus",
      "Number of employees vs. office size",
      "Social media followers vs. email list size",
    ],
    correctIndex: 1,
    explanation:
      "Positioning matrices use two strategically relevant axes such as price vs. feature complexity, enterprise vs. SMB focus, or breadth vs. depth of solution.",
  },

  // === SECTION 4: Execution & Implementation (12 questions) ===
  {
    type: "multiple-choice",
    question: "How often should a competitor dashboard be updated?",
    options: [
      "Once a year",
      "Monthly",
      "Only when launching a new product",
      "Every five years",
    ],
    correctIndex: 1,
    explanation:
      "Competitor dashboards should be updated monthly with the latest metrics and reviewed in strategy meetings to keep competitive intelligence current and actionable.",
  },
  {
    type: "multiple-choice",
    question: "What is a competitive battle card?",
    options: [
      "A card game for marketing teams",
      "A one-page reference for each major competitor including strengths, weaknesses, and counter-arguments for sales",
      "A credit card for competitive purchases",
      "A business card you exchange with competitors",
    ],
    correctIndex: 1,
    explanation:
      "Competitive battle cards are one-page references for sales teams that include competitor strengths and weaknesses, positioning, pricing, common objections, and counter-arguments.",
  },
  {
    type: "multiple-choice",
    question: "What is win/loss analysis?",
    options: [
      "Tracking your sports team's record",
      "Interviewing customers and lost prospects to understand why they chose you or a competitor",
      "Counting your wins and losses in A/B tests",
      "Measuring profit and loss statements",
    ],
    correctIndex: 1,
    explanation:
      "Win/loss analysis involves interviewing customers and lost prospects to understand what factors led to their decision, revealing competitive dynamics and opportunities for improvement.",
  },
  {
    type: "multiple-choice",
    question: "Why should you subscribe to competitor email lists?",
    options: [
      "To report them as spam",
      "To track their messaging, offers, and content strategy over time",
      "To steal their customer list",
      "To inflate their email metrics",
    ],
    correctIndex: 1,
    explanation:
      "Subscribing to competitor emails lets you monitor their messaging evolution, promotional cadence, content strategy, and product announcements over time.",
  },
  {
    type: "true-false",
    question: "Win/loss analysis is one of the most underused yet highest-value competitive intelligence methods.",
    correctAnswer: true,
    explanation:
      "Win/loss analysis provides direct, unfiltered insight into why customers chose you or a competitor, making it one of the most valuable yet frequently overlooked competitive intelligence methods.",
  },
  {
    type: "true-false",
    question: "Battle cards should be updated annually at most.",
    correctAnswer: false,
    explanation:
      "Battle cards should be updated quarterly to remain current. Markets, competitor offerings, and pricing change frequently, and outdated battle cards can lead to poor sales outcomes.",
  },
  {
    type: "multi-select",
    question: "What monitoring systems should be set up for ongoing competitor analysis? (Select all that apply)",
    options: [
      "Google Alerts for competitor brand names",
      "Subscribing to competitor email newsletters",
      "Monitoring review sites for sentiment changes",
      "Tracking competitor job postings",
      "Reading competitor employee personal diaries",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Effective monitoring includes Google Alerts, email subscriptions, review site monitoring, and job posting tracking. These are all legitimate, publicly available intelligence sources.",
  },
  {
    type: "multi-select",
    question: "What questions should win/loss analysis ask? (Select all that apply)",
    options: [
      "What alternatives did you consider?",
      "What was the deciding factor in your choice?",
      "What is your annual household income?",
      "What almost made you choose someone else?",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Win/loss interviews should ask about alternatives considered, deciding factors, and what almost changed the decision. Personal income questions are inappropriate for this context.",
  },
  {
    type: "ordering",
    question: "Arrange competitor monitoring activities from most frequent to least frequent.",
    items: [
      "Full competitive landscape review",
      "Check alerts and social mentions",
      "Update competitor dashboard metrics",
      "Deep-dive analysis and battle card updates",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Monitoring cadence: check alerts and mentions weekly, update dashboard monthly, deep-dive and update battle cards quarterly, full landscape review annually.",
  },
  {
    type: "multiple-choice",
    question: "What tool can detect changes on competitor websites?",
    options: [
      "Microsoft Excel",
      "Visualping or similar website change detection tools",
      "Google Docs",
      "Slack",
    ],
    correctIndex: 1,
    explanation:
      "Visualping and similar tools monitor web pages for changes, alerting you when competitors update pricing, features, positioning, or other key page elements.",
  },
  {
    type: "ordering",
    question: "Arrange the steps for conducting a competitive intelligence cycle from start to finish.",
    items: [
      "Report findings and recommend strategic actions",
      "Define intelligence requirements and key questions",
      "Collect data from public sources and tools",
      "Analyze and synthesize findings into insights",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "The intelligence cycle follows: define requirements (what you need to know), collect data (from tools and sources), analyze and synthesize (turn data into insights), and report with recommendations.",
  },
  {
    type: "multiple-choice",
    question: "What should a competitor dashboard include?",
    options: [
      "Only social media follower counts",
      "Organic traffic estimates, keyword rankings, social metrics, ad spend, content, and product updates",
      "Only financial statements",
      "Only customer complaint counts",
    ],
    correctIndex: 1,
    explanation:
      "A comprehensive dashboard tracks organic traffic, keyword rankings, social metrics, ad spend, content published, and product updates across all competitors over time.",
  },

  // === SECTION 5: Measurement & Optimization (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is Share of Voice (SOV)?",
    options: [
      "The volume of your phone calls",
      "Your brand's visibility relative to competitors across channels",
      "The number of times your brand is mentioned in meetings",
      "Your team's share of speaking time in presentations",
    ],
    correctIndex: 1,
    explanation:
      "Share of Voice measures your brand's visibility relative to competitors across channels — in organic search (click share), social media (mention share), or paid search (impression share).",
  },
  {
    type: "multiple-choice",
    question: "What does research show about brands whose SOV exceeds their market share?",
    options: [
      "They tend to shrink",
      "They tend to grow",
      "There is no correlation",
      "They should reduce marketing spend",
    ],
    correctIndex: 1,
    explanation:
      "Research shows that brands whose Share of Voice exceeds their market share tend to grow, while those with SOV below market share tend to shrink. This is known as the SOV-SOM relationship.",
  },
  {
    type: "multiple-choice",
    question: "How should content gaps be scored for prioritization?",
    options: [
      "Only by keyword difficulty",
      "By search volume, commercial intent, and difficulty",
      "Only by search volume",
      "By how many competitors rank for them",
    ],
    correctIndex: 1,
    explanation:
      "Content gaps should be scored by search volume (opportunity size), commercial intent (value of the traffic), and difficulty (realistic ability to rank), providing a balanced prioritization.",
  },
  {
    type: "multiple-choice",
    question: "What should trigger an ad hoc deep competitive analysis?",
    options: [
      "A slow day at work",
      "Competitors launching new products, changing pricing, or raising funding",
      "A change in office location",
      "A new season of the year",
    ],
    correctIndex: 1,
    explanation:
      "Major competitor moves like product launches, pricing changes, or funding rounds should trigger an ad hoc deep analysis to understand the implications and adjust your strategy.",
  },
  {
    type: "true-false",
    question: "Share of Voice in organic search is measured by the percentage of total clicks you capture for target keywords.",
    correctAnswer: true,
    explanation:
      "In organic search, SOV is measured as the percentage of total available clicks for your target keywords that your brand captures, providing a direct measure of search visibility.",
  },
  {
    type: "true-false",
    question: "Competitive benchmarking should happen at the same cadence regardless of what competitors do.",
    correctAnswer: false,
    explanation:
      "While regular cadences (weekly, monthly, quarterly, annual) should be maintained, ad hoc analyses should be triggered by significant competitor events like launches, pricing changes, or funding.",
  },
  {
    type: "multi-select",
    question: "At what cadence should competitive benchmarking happen? (Select all that apply)",
    options: [
      "Weekly monitoring of alerts and mentions",
      "Monthly dashboard metric updates",
      "Quarterly deep-dive analysis",
      "Annually — full landscape review",
      "Only once when starting a business",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Competitive benchmarking should happen at multiple cadences: weekly monitoring, monthly updates, quarterly deep-dives, and annual full reviews. It is an ongoing process, not a one-time activity.",
  },
  {
    type: "multi-select",
    question: "What does content gap scoring consider? (Select all that apply)",
    options: [
      "Search volume",
      "Word count of competitor articles",
      "Commercial intent",
      "Keyword difficulty",
      "Competitor brand colors",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Content gap scoring considers search volume (opportunity size), commercial intent (traffic value), and keyword difficulty (ability to rank). Word count and brand colors are not scoring factors.",
  },
  {
    type: "ordering",
    question: "Arrange the competitive benchmarking cadence from most frequent to least frequent.",
    items: [
      "Quarterly deep-dive and battle card updates",
      "Annual full competitive landscape review",
      "Weekly monitoring of alerts and social mentions",
      "Monthly dashboard and ranking updates",
    ],
    correctOrder: [2, 3, 0, 1],
    explanation:
      "The cadence from most to least frequent: weekly alert monitoring, monthly dashboard updates, quarterly deep-dives, and annual full landscape reviews.",
  },
  {
    type: "multiple-choice",
    question: "What is the SOV-SOM relationship?",
    options: [
      "Share of Voice and Sum of Money",
      "The correlation between Share of Voice exceeding Share of Market and brand growth",
      "A metric for social media optimization",
      "A pricing model for SaaS products",
    ],
    correctIndex: 1,
    explanation:
      "The SOV-SOM relationship shows that when a brand's Share of Voice exceeds its Share of Market, the brand tends to grow. When SOV falls below SOM, market share tends to decline.",
  },
  {
    type: "true-false",
    question: "Content gap analysis should be a one-time exercise at the start of a content strategy.",
    correctAnswer: false,
    explanation:
      "Content gap analysis should be conducted regularly because the competitive landscape constantly evolves. New competitors publish content, rankings shift, and new keyword opportunities emerge.",
  },
  {
    type: "ordering",
    question: "Arrange the competitive analysis maturity stages from least mature to most mature.",
    items: [
      "Systematic ongoing monitoring with automated alerts",
      "No competitive analysis conducted",
      "Regular cadenced analysis with actionable battle cards",
      "Ad hoc, reactive analysis when threats appear",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "Competitive analysis maturity progresses from none, to reactive/ad hoc, to systematic monitoring with automation, and finally to regular cadenced analysis with actionable outputs like battle cards.",
  },
];
