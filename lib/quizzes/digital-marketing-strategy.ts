import type { QuizQuestion } from "@/lib/academy-data";

export const digitalMarketingStrategyQuiz: QuizQuestion[] = [
  // === SECTION 1: Introduction & Overview (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is the primary difference between a marketing strategy and marketing tactics?",
    options: [
      "Strategy is digital; tactics are traditional",
      "Strategy defines the 'why' and 'where'; tactics define the 'how'",
      "Strategy is short-term; tactics are long-term",
      "Strategy is about social media; tactics are about SEO",
    ],
    correctIndex: 1,
    explanation:
      "Strategy answers 'why' and 'where' — your positioning, target audience, and channel mix. Tactics answer 'how' — the specific actions you execute within each channel.",
  },
  {
    type: "multiple-choice",
    question: "What does a digital marketing strategy primarily ensure?",
    options: [
      "That every social media post goes viral",
      "That all channels work together toward measurable business objectives",
      "That the marketing budget is spent as quickly as possible",
      "That only one channel is used for maximum focus",
    ],
    correctIndex: 1,
    explanation:
      "A digital marketing strategy ties every marketing action to measurable business objectives and ensures all channels work together synergistically.",
  },
  {
    type: "multiple-choice",
    question: "Which of the following best describes 'tactics without strategy'?",
    options: [
      "A dream without execution",
      "A well-planned roadmap",
      "Chaos — fragmented actions without direction",
      "A cost-effective approach to marketing",
    ],
    correctIndex: 2,
    explanation:
      "Tactics without strategy is chaos — it results in fragmented campaigns, wasted budget, and an inability to explain what is driving revenue.",
  },
  {
    type: "true-false",
    question: "A digital marketing strategy should be created after all campaigns are launched.",
    correctAnswer: false,
    explanation:
      "The strategy must come first. It provides the foundation and direction for all campaigns and tactical decisions that follow.",
  },
  {
    type: "true-false",
    question: "Jumping straight to execution without a strategic foundation often leads to wasted budget.",
    correctAnswer: true,
    explanation:
      "Without a strategic foundation, marketing efforts become fragmented, leading to wasted budget and an inability to determine what is actually driving results.",
  },
  {
    type: "multi-select",
    question: "Which of the following are components of a comprehensive digital marketing strategy? (Select all that apply)",
    options: [
      "Market analysis and audience segmentation",
      "Channel selection and budget allocation",
      "Randomly posting on all available platforms",
      "OKR setting and performance measurement",
      "Ignoring competitor activity",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "A comprehensive digital marketing strategy includes market analysis, audience segmentation, channel selection, budget allocation, OKR setting, and performance measurement. Random posting and ignoring competitors are not strategic approaches.",
  },
  {
    type: "multi-select",
    question: "What are common outcomes of executing marketing without a strategy? (Select all that apply)",
    options: [
      "Fragmented campaigns across channels",
      "Wasted marketing budget",
      "Clear attribution of revenue sources",
      "Inability to explain what drives revenue",
      "Consistent brand messaging",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Without a strategy, campaigns become fragmented, budget is wasted, and teams cannot explain what drives revenue. Clear attribution and consistent messaging require strategic planning.",
  },
  {
    type: "ordering",
    question: "Put the steps of building a digital marketing strategy in the correct order.",
    items: [
      "Measure performance and iterate",
      "Conduct market analysis and audience research",
      "Set objectives and key results (OKRs)",
      "Select channels and allocate budget",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "The correct order is: conduct market analysis and audience research first, then set OKRs based on insights, select channels and allocate budget accordingly, and finally measure performance and iterate based on results.",
  },
  {
    type: "multiple-choice",
    question: "Who benefits from having a digital marketing strategy?",
    options: [
      "Only large enterprises with big budgets",
      "Only social media managers",
      "Anyone from startup founders to marketing directors",
      "Only paid advertising specialists",
    ],
    correctIndex: 2,
    explanation:
      "A digital marketing strategy benefits anyone involved in marketing, from startup founders wearing every hat to marketing directors managing teams.",
  },
  {
    type: "multiple-choice",
    question: "What is the relationship between strategy and a marketing plan?",
    options: [
      "They are exactly the same thing",
      "A plan is a component of the broader strategy",
      "Strategy is outdated; plans are modern",
      "Plans are for B2B only; strategy is for B2C",
    ],
    correctIndex: 1,
    explanation:
      "A marketing plan is a component of the broader strategy. The strategy defines the overall direction and goals, while the plan details the specific actions and timelines.",
  },
  {
    type: "multiple-choice",
    question: "Which analogy best describes the relationship between strategy and tactics?",
    options: [
      "Strategy is the car; tactics are the passengers",
      "Strategy is the map; tactics are the individual steps along the route",
      "Strategy is the weather; tactics are the forecast",
      "Strategy is the destination; tactics are irrelevant",
    ],
    correctIndex: 1,
    explanation:
      "Strategy gives you the map (direction and destination), while tactics are the individual steps you take to follow that map toward your goals.",
  },
  {
    type: "ordering",
    question: "Arrange the marketing hierarchy from broadest to most specific.",
    items: [
      "Individual tasks and actions",
      "Marketing strategy",
      "Campaign tactics",
      "Marketing plan",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "The hierarchy from broadest to most specific is: marketing strategy (overall direction), marketing plan (detailed roadmap), campaign tactics (specific channel actions), and individual tasks and actions (day-to-day execution).",
  },

  // === SECTION 2: Core Concepts (12 questions) ===
  {
    type: "multiple-choice",
    question: "What does SWOT stand for?",
    options: [
      "Sales, Websites, Operations, Technology",
      "Strengths, Weaknesses, Opportunities, Threats",
      "Strategy, Workflow, Objectives, Targets",
      "Social, Web, Organic, Tactical",
    ],
    correctIndex: 1,
    explanation:
      "SWOT stands for Strengths, Weaknesses, Opportunities, and Threats. It is a framework for analyzing internal capabilities and external factors.",
  },
  {
    type: "multiple-choice",
    question: "In a SWOT analysis, which elements are internal to the organization?",
    options: [
      "Opportunities and Threats",
      "Strengths and Opportunities",
      "Strengths and Weaknesses",
      "Weaknesses and Threats",
    ],
    correctIndex: 2,
    explanation:
      "Strengths and Weaknesses are internal factors that the organization can control, such as brand reputation, team expertise, or budget constraints.",
  },
  {
    type: "multiple-choice",
    question: "What does the PESTLE framework analyze?",
    options: [
      "Internal marketing team performance",
      "Product pricing strategies",
      "External macro-environmental forces",
      "Social media engagement rates",
    ],
    correctIndex: 2,
    explanation:
      "PESTLE analyzes Political, Economic, Social, Technological, Legal, and Environmental external forces that affect the market.",
  },
  {
    type: "multiple-choice",
    question: "When evaluating marketing channels, which question is LEAST relevant?",
    options: [
      "Where does my audience spend their time?",
      "What is the cost to acquire a customer through this channel?",
      "What color scheme should I use for my logo?",
      "How scalable is this channel?",
    ],
    correctIndex: 2,
    explanation:
      "Logo color schemes are a branding decision, not a channel evaluation criterion. Relevant channel evaluation questions include audience presence, acquisition cost, time to impact, and scalability.",
  },
  {
    type: "multi-select",
    question: "Which of the following are examples of psychographic attributes? (Select all that apply)",
    options: [
      "Values and beliefs",
      "Age and gender",
      "Interests and hobbies",
      "Lifestyle and personality traits",
      "Annual household income",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Psychographic attributes include values, beliefs, interests, hobbies, lifestyle, and personality traits. Age, gender, and income are demographic attributes.",
  },
  {
    type: "true-false",
    question: "Every business should use all available digital marketing channels simultaneously.",
    correctAnswer: false,
    explanation:
      "Not every channel is right for every business. It is better to prioritize two to three primary channels and test others in smaller experiments rather than spreading resources too thin.",
  },
  {
    type: "multi-select",
    question: "Which of the following are types of audience segmentation? (Select all that apply)",
    options: [
      "Demographics (age, location, income)",
      "Psychographics (values, interests)",
      "Alphabetical order of customer names",
      "Behavioral data (purchase history)",
      "Firmographics (company size, industry)",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "The four main types of audience segmentation are demographics, psychographics, behavioral data, and firmographics. Alphabetical ordering of names is not a segmentation method.",
  },
  {
    type: "multi-select",
    question: "Which of the following are common digital marketing channels? (Select all that apply)",
    options: [
      "Organic search (SEO)",
      "Paid search (PPC)",
      "Billboard advertising",
      "Email marketing",
      "Affiliate marketing",
      "Print newspaper ads",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Common digital marketing channels include organic search (SEO), paid search (PPC), email marketing, and affiliate marketing. Billboard and print newspaper ads are traditional (non-digital) channels.",
  },
  {
    type: "ordering",
    question: "Arrange Porter's Five Forces analysis components in a logical assessment order.",
    items: [
      "Threat of new entrants",
      "Bargaining power of suppliers",
      "Industry rivalry",
      "Threat of substitutes",
      "Bargaining power of buyers",
    ],
    correctOrder: [2, 0, 3, 4, 1],
    explanation:
      "While Porter's Five Forces can be assessed in any order, a logical approach starts with industry rivalry (the central force), then examines threat of new entrants, threat of substitutes, bargaining power of buyers, and bargaining power of suppliers.",
  },
  {
    type: "multiple-choice",
    question: "What is a buyer persona?",
    options: [
      "A real customer who serves as your brand ambassador",
      "A detailed profile representing a segment of your target audience",
      "Your company's brand mascot",
      "A competitor's ideal customer",
    ],
    correctIndex: 1,
    explanation:
      "A buyer persona is a detailed, semi-fictional profile that represents a segment of your target audience, including their pain points, goals, preferred channels, and objections.",
  },
  {
    type: "multiple-choice",
    question: "What does market analysis primarily help you understand?",
    options: [
      "Your employees' satisfaction levels",
      "The size, trends, and dynamics of your target market",
      "Your website's page speed score",
      "Your email open rates",
    ],
    correctIndex: 1,
    explanation:
      "Market analysis assesses the size, trends, and dynamics of your target market, answering questions about opportunity size, demand trends, and key players.",
  },
  {
    type: "multi-select",
    question: "Which of the following are firmographic attributes used in B2B segmentation? (Select all that apply)",
    options: [
      "Company size and employee count",
      "Industry and vertical",
      "Personal social media activity",
      "Annual revenue range",
      "Technology stack and tools used",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Firmographics segment B2B audiences by company attributes: size, industry, revenue, and technology stack. Personal social media activity is a behavioral or psychographic attribute, not a firmographic.",
  },

  // === SECTION 3: Strategy & Planning (12 questions) ===
  {
    type: "multiple-choice",
    question: "In the OKR framework, what is an 'Objective'?",
    options: [
      "A quantitative metric with a deadline",
      "A qualitative, inspirational goal",
      "A list of marketing tasks",
      "A budget line item",
    ],
    correctIndex: 1,
    explanation:
      "An Objective in the OKR framework is qualitative and inspirational — for example, 'Become the go-to brand for sustainable fashion.'",
  },
  {
    type: "multiple-choice",
    question: "What is the 70-20-10 budget allocation rule?",
    options: [
      "70% content, 20% paid ads, 10% email",
      "70% proven channels, 20% scaling channels, 10% experimental channels",
      "70% social media, 20% SEO, 10% PR",
      "70% salary, 20% tools, 10% ad spend",
    ],
    correctIndex: 1,
    explanation:
      "The 70-20-10 rule recommends investing 70% of your budget in proven channels with demonstrated ROI, 20% in promising channels you are scaling, and 10% in experimental or emerging channels.",
  },
  {
    type: "multiple-choice",
    question: "What is the typical recommended range for total marketing budget as a percentage of revenue?",
    options: [
      "1-3%",
      "5-15%",
      "25-40%",
      "50-75%",
    ],
    correctIndex: 1,
    explanation:
      "Total marketing budget is typically 5-15% of revenue, varying by industry, growth stage, and competitive intensity.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of a marketing calendar?",
    options: [
      "To track employee vacation days",
      "To map out campaigns, content, and promotions across a 12-month timeline",
      "To schedule social media posts only",
      "To record past marketing expenses",
    ],
    correctIndex: 1,
    explanation:
      "A marketing calendar maps out campaigns, content, launches, and promotions across a 12-month timeline, including key dates, seasonal peaks, and product launches.",
  },
  {
    type: "true-false",
    question: "Key Results in the OKR framework should be quantitative and time-bound.",
    correctAnswer: true,
    explanation:
      "Key Results are the measurable outcomes that indicate progress toward an Objective. They must be quantitative and time-bound, such as 'Increase organic traffic by 40% in Q2.'",
  },
  {
    type: "true-false",
    question: "An integrated campaign should use completely different messaging on each channel.",
    correctAnswer: false,
    explanation:
      "An integrated campaign ensures consistency in messaging across all channels, with variation in format. The core narrative should be the same, adapted for each platform's strengths.",
  },
  {
    type: "multi-select",
    question: "Which items should be included in a marketing budget allocation? (Select all that apply)",
    options: [
      "Channel-specific ad spend",
      "Creative production costs",
      "Tools and software subscriptions",
      "Office furniture expenses",
      "Testing and experimentation reserve",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "A marketing budget should include channel ad spend, creative production costs, tools and software, and a testing reserve. Office furniture is a facilities expense, not a marketing budget item.",
  },
  {
    type: "multi-select",
    question: "What should an integrated campaign architecture include? (Select all that apply)",
    options: [
      "A core campaign idea or narrative",
      "Channel-specific content adaptations",
      "Identical creative assets for every platform",
      "Consistent messaging across channels",
      "Long-form and short-form content variations",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "An integrated campaign needs a core idea, channel-specific adaptations, consistent messaging, and varied content formats. Using identical creative for every platform ignores platform-specific best practices.",
  },
  {
    type: "ordering",
    question: "Put the marketing calendar planning levels in order from broadest to most granular.",
    items: [
      "Weekly execution tasks",
      "Quarterly themes",
      "Annual strategic priorities",
      "Monthly campaigns",
    ],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "Marketing calendar planning goes from annual strategic priorities (broadest) to quarterly themes, then monthly campaigns, and finally weekly execution tasks (most granular).",
  },
  {
    type: "multiple-choice",
    question: "How many Key Results should typically be set per Objective?",
    options: [
      "1",
      "3 to 5",
      "10 to 15",
      "As many as possible",
    ],
    correctIndex: 1,
    explanation:
      "Typically, you should set three to five Key Results per Objective. This provides enough breadth to capture progress without being overwhelming to track.",
  },
  {
    type: "multiple-choice",
    question: "How often should OKRs be reviewed?",
    options: [
      "Once a year",
      "Monthly",
      "Only when campaigns end",
      "Every five years",
    ],
    correctIndex: 1,
    explanation:
      "OKRs should be reviewed monthly to track progress, identify issues early, and make adjustments as needed. This cadence balances accountability with flexibility.",
  },
  {
    type: "ordering",
    question: "Arrange the integrated campaign development process in the correct order.",
    items: [
      "Adapt the idea for each channel",
      "Develop a core campaign idea",
      "Ensure messaging consistency",
      "Research audience and market insights",
    ],
    correctOrder: [3, 1, 0, 2],
    explanation:
      "The correct process is: research audience insights first, then develop the core campaign idea, adapt it for each channel, and finally ensure messaging consistency across all touchpoints.",
  },

  // === SECTION 4: Execution & Implementation (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is the first step in a campaign launch process?",
    options: [
      "Launch ads immediately",
      "Creative briefing",
      "Post-campaign analysis",
      "Hire an agency",
    ],
    correctIndex: 1,
    explanation:
      "The campaign launch process begins with a creative briefing that documents the campaign objective, target audience, key messaging, deliverables, deadlines, and success metrics.",
  },
  {
    type: "multiple-choice",
    question: "What should be verified during the QA and pre-launch phase?",
    options: [
      "Office supply inventory",
      "Links, tracking pixels, UTM parameters, and conversion paths",
      "Social media follower counts",
      "Competitor pricing changes",
    ],
    correctIndex: 1,
    explanation:
      "During QA and pre-launch, you should test all links, tracking pixels, UTM parameters, and conversion paths, and verify that analytics events fire correctly.",
  },
  {
    type: "multiple-choice",
    question: "What is UTM parameter tracking used for?",
    options: [
      "Improving website loading speed",
      "Tracking where traffic comes from and which campaigns drive it",
      "Encrypting user data",
      "Scheduling social media posts",
    ],
    correctIndex: 1,
    explanation:
      "UTM parameters are tags added to URLs that allow you to track exactly which campaigns, channels, and content pieces drive traffic and conversions in your analytics platform.",
  },
  {
    type: "multiple-choice",
    question: "Which of these is NOT typically part of a minimum marketing tech stack?",
    options: [
      "Analytics platform (Google Analytics 4)",
      "CRM (HubSpot, Salesforce)",
      "3D modeling software",
      "Email marketing tool (Mailchimp, Klaviyo)",
    ],
    correctIndex: 2,
    explanation:
      "A minimum marketing tech stack includes an analytics platform, CRM, email marketing tool, social media management tool, and advertising platform. 3D modeling software is not a standard marketing tool.",
  },
  {
    type: "true-false",
    question: "Brand guidelines should be shared with agencies and freelancers alongside creative briefs.",
    correctAnswer: true,
    explanation:
      "When working with external partners, providing clear briefs with brand guidelines and examples of on-brand and off-brand work ensures consistency and reduces revision cycles.",
  },
  {
    type: "true-false",
    question: "Campaign performance should only be monitored after the campaign has ended.",
    correctAnswer: false,
    explanation:
      "Campaign performance should be monitored in real-time, especially during the first 24-48 hours after launch, so you can troubleshoot issues and make adjustments quickly.",
  },
  {
    type: "multi-select",
    question: "Which activities should happen during the asset production phase? (Select all that apply)",
    options: [
      "Creating copy and graphics",
      "Building landing pages",
      "Producing video content",
      "Analyzing post-campaign results",
      "Ensuring brand consistency across assets",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Asset production involves creating all creative assets including copy, graphics, video, and landing pages while ensuring brand consistency. Post-campaign analysis happens after the campaign runs.",
  },
  {
    type: "multi-select",
    question: "What should be included in a creative brief? (Select all that apply)",
    options: [
      "Campaign objective",
      "Target audience description",
      "Competitor financial reports",
      "Key messaging and deliverables",
      "Success metrics and deadlines",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "A creative brief documents the campaign objective, target audience, key messaging, deliverables, deadlines, and success metrics. Competitor financial reports are not part of a creative brief.",
  },
  {
    type: "ordering",
    question: "Put the campaign launch process steps in the correct order.",
    items: [
      "QA and pre-launch testing",
      "Creative briefing",
      "Launch and real-time monitoring",
      "Asset production",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "The campaign launch process follows: creative briefing first, then asset production, QA and pre-launch testing, and finally launch with real-time monitoring.",
  },
  {
    type: "multiple-choice",
    question: "How often should marketing teams hold stand-up meetings to review campaigns?",
    options: [
      "Once a year",
      "Weekly",
      "Only when problems arise",
      "Every two months",
    ],
    correctIndex: 1,
    explanation:
      "Weekly stand-ups allow teams to review active campaigns, share learnings, and flag blockers in a timely manner that keeps execution on track.",
  },
  {
    type: "true-false",
    question: "A shared dashboard ensures all team members see the same performance data.",
    correctAnswer: true,
    explanation:
      "Using a shared dashboard (like Google Looker Studio) ensures everyone on the team has access to the same data, reducing miscommunication and enabling better decision-making.",
  },
  {
    type: "multiple-choice",
    question: "Why should marketing processes be documented in a playbook?",
    options: [
      "To increase the marketing budget",
      "To prevent knowledge from being siloed in individual team members",
      "To impress potential investors",
      "To comply with legal requirements",
    ],
    correctIndex: 1,
    explanation:
      "Documenting processes in a marketing playbook prevents knowledge from being siloed, ensures consistency, and allows new team members to ramp up quickly.",
  },

  // === SECTION 5: Measurement & Optimization (12 questions) ===
  {
    type: "multiple-choice",
    question: "Which attribution model gives all credit to the final touchpoint before conversion?",
    options: [
      "First-click attribution",
      "Linear attribution",
      "Last-click attribution",
      "Data-driven attribution",
    ],
    correctIndex: 2,
    explanation:
      "Last-click attribution assigns 100% of the credit for a conversion to the final touchpoint the customer interacted with before converting.",
  },
  {
    type: "multiple-choice",
    question: "What does ROAS stand for?",
    options: [
      "Revenue Over All Sales",
      "Return on Ad Spend",
      "Rate of Audience Segmentation",
      "Reach of Advertising Strategy",
    ],
    correctIndex: 1,
    explanation:
      "ROAS stands for Return on Ad Spend — the revenue generated for every dollar spent on advertising.",
  },
  {
    type: "multiple-choice",
    question: "What does the PDCA cycle stand for?",
    options: [
      "Plan, Design, Create, Analyze",
      "Plan, Do, Check, Act",
      "Prepare, Deploy, Collect, Assess",
      "Prioritize, Deliver, Confirm, Adjust",
    ],
    correctIndex: 1,
    explanation:
      "PDCA stands for Plan, Do, Check, Act — a continuous improvement cycle used to systematically test and refine marketing strategies.",
  },
  {
    type: "multiple-choice",
    question: "Which metric best measures brand awareness at the top of the funnel?",
    options: [
      "Conversion rate",
      "Cost per acquisition",
      "Impressions and reach",
      "Customer lifetime value",
    ],
    correctIndex: 2,
    explanation:
      "Impressions and reach are top-of-funnel awareness metrics that measure how many people are exposed to your brand messaging.",
  },
  {
    type: "true-false",
    question: "Data-driven attribution uses machine learning to assign credit based on actual impact.",
    correctAnswer: true,
    explanation:
      "Data-driven attribution uses machine learning algorithms to analyze all touchpoints and assign credit based on their measured contribution to conversions.",
  },
  {
    type: "true-false",
    question: "A single attribution model provides a complete and accurate picture of marketing performance.",
    correctAnswer: false,
    explanation:
      "No single attribution model is perfect. It is recommended to use multiple models to triangulate the truth and get a more complete picture of channel performance.",
  },
  {
    type: "multi-select",
    question: "Which of the following are funnel-stage-appropriate KPIs for conversion? (Select all that apply)",
    options: [
      "Conversion rate",
      "Impressions",
      "Cost per acquisition (CPA)",
      "Return on ad spend (ROAS)",
      "Brand search volume",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Conversion-stage KPIs include conversion rate, cost per acquisition (CPA), and return on ad spend (ROAS). Impressions and brand search volume are awareness-stage metrics.",
  },
  {
    type: "multi-select",
    question: "What should a monthly marketing report focus on? (Select all that apply)",
    options: [
      "What worked well this month",
      "What did not work as expected",
      "Detailed team member time sheets",
      "What changes are being made next month",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Monthly reports should focus on three things: what worked, what did not, and what changes are being made. Time sheets are operational documents, not strategic reporting items.",
  },
  {
    type: "ordering",
    question: "Arrange the reporting cadence from most frequent to least frequent.",
    items: [
      "Quarterly strategy reviews",
      "Weekly tactical adjustments",
      "Annual strategy overhaul",
      "Monthly deep-dive analysis",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "The reporting cadence from most to least frequent: weekly tactical adjustments, monthly deep-dive analysis, quarterly strategy reviews, and annual strategy overhaul.",
  },
  {
    type: "multiple-choice",
    question: "Which attribution model distributes credit equally across all touchpoints?",
    options: [
      "First-click",
      "Last-click",
      "Linear",
      "Time-decay",
    ],
    correctIndex: 2,
    explanation:
      "Linear attribution distributes conversion credit equally across all touchpoints in the customer journey.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of A/B testing in marketing optimization?",
    options: [
      "To test two completely different products simultaneously",
      "To compare two versions of a marketing element to determine which performs better",
      "To split your team into two departments",
      "To run campaigns on two different platforms at the same time",
    ],
    correctIndex: 1,
    explanation:
      "A/B testing compares two versions of a marketing element (headline, creative, landing page, etc.) to determine which version produces better results.",
  },
  {
    type: "ordering",
    question: "Put the PDCA continuous improvement cycle steps in the correct order.",
    items: [
      "Act — implement improvements",
      "Check — analyze results",
      "Do — execute the plan",
      "Plan — identify the opportunity",
    ],
    correctOrder: [3, 2, 1, 0],
    explanation:
      "The PDCA cycle follows: Plan (identify the opportunity and create a plan), Do (execute the plan), Check (analyze results against expectations), Act (implement improvements and standardize successful changes).",
  },
];
