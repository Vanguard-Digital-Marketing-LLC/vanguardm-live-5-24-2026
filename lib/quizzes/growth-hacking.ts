import type { QuizQuestion } from "@/lib/academy-data";

export const growthHackingQuiz: QuizQuestion[] = [
  // === SECTION 1: Introduction & Overview (12 questions) ===
  {
    type: "multiple-choice",
    question: "Who coined the term 'growth hacking'?",
    options: [
      "Steve Jobs",
      "Sean Ellis",
      "Eric Ries",
      "Gary Vaynerchuk",
    ],
    correctIndex: 1,
    explanation:
      "Sean Ellis coined the term 'growth hacking' in 2010 to describe an experiment-driven approach to rapid business growth.",
  },
  {
    type: "multiple-choice",
    question: "What is the primary lens through which growth hackers evaluate every strategy?",
    options: [
      "Does it look good on social media?",
      "Does it move the growth needle?",
      "Does it require a large budget?",
      "Does it follow traditional marketing rules?",
    ],
    correctIndex: 1,
    explanation:
      "Growth hackers evaluate every strategy, feature, and campaign through one lens: Does it move the growth needle? Growth is the singular focus.",
  },
  {
    type: "multiple-choice",
    question: "What does AARRR stand for in the pirate metrics framework?",
    options: [
      "Attract, Activate, Retain, Refer, Revenue",
      "Acquisition, Activation, Retention, Referral, Revenue",
      "Awareness, Action, Results, ROI, Revenue",
      "Analytics, Automation, Reporting, Review, Revenue",
    ],
    correctIndex: 1,
    explanation:
      "AARRR stands for Acquisition, Activation, Retention, Referral, and Revenue — the five stages of the customer lifecycle that growth hackers optimize across.",
  },
  {
    type: "true-false",
    question: "Growth hacking is a set of tricks rather than a rigorous process.",
    correctAnswer: false,
    explanation:
      "Growth hacking is not a set of tricks — it is a rigorous process of forming hypotheses, designing minimal experiments, measuring results, and doubling down on what works.",
  },
  {
    type: "true-false",
    question: "Growth hacking prioritizes speed, creativity, and iteration over large budgets.",
    correctAnswer: true,
    explanation:
      "Unlike traditional marketing which often relies on large budgets, growth hacking prioritizes speed of learning, creative problem-solving, and rapid iteration.",
  },
  {
    type: "multi-select",
    question: "Which of the following distinguish growth hacking from traditional marketing? (Select all that apply)",
    options: [
      "Experiment-driven approach",
      "Focus on rapid iteration",
      "Reliance on large budgets",
      "Cross-functional collaboration (marketing, product, data)",
      "Following established playbooks without modification",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Growth hacking is distinguished by its experiment-driven approach, rapid iteration, and cross-functional collaboration. It specifically avoids reliance on large budgets and rigid playbooks.",
  },
  {
    type: "multi-select",
    question: "What are the goals of a growth hacker? (Select all that apply)",
    options: [
      "Learn fast from experiments",
      "Fail cheap when experiments do not work",
      "Avoid all risk",
      "Scale winners aggressively",
      "Run as few experiments as possible",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Growth hackers aim to learn fast, fail cheap (minimize downside of failed experiments), and scale winners aggressively. They embrace risk and run as many experiments as possible.",
  },
  {
    type: "ordering",
    question: "Put the AARRR pirate metrics stages in the correct order.",
    items: [
      "Revenue",
      "Retention",
      "Acquisition",
      "Referral",
      "Activation",
    ],
    correctOrder: [2, 4, 1, 3, 0],
    explanation:
      "The AARRR framework follows: Acquisition (how users find you), Activation (first great experience), Retention (users come back), Referral (users tell others), Revenue (users pay).",
  },
  {
    type: "multiple-choice",
    question: "What year was the term 'growth hacking' coined?",
    options: [
      "2005",
      "2010",
      "2015",
      "2020",
    ],
    correctIndex: 1,
    explanation:
      "Sean Ellis coined the term 'growth hacking' in 2010 to describe the unique blend of marketing, product, and data analysis used to drive rapid growth.",
  },
  {
    type: "multiple-choice",
    question: "Growth hacking runs experiments across which part of the customer lifecycle?",
    options: [
      "Only acquisition",
      "Only conversion",
      "The entire customer lifecycle",
      "Only retention",
    ],
    correctIndex: 2,
    explanation:
      "Growth hackers run experiments across the entire customer lifecycle — acquisition, activation, retention, referral, and revenue.",
  },
  {
    type: "multiple-choice",
    question: "Growth hacking sits at the intersection of which three disciplines?",
    options: [
      "Accounting, legal, and human resources",
      "Marketing, product development, and data analysis",
      "Sales, customer support, and logistics",
      "Design, engineering, and manufacturing",
    ],
    correctIndex: 1,
    explanation:
      "Growth hacking blends marketing, product development, and data analysis, requiring cross-functional collaboration to find scalable growth levers.",
  },
  {
    type: "ordering",
    question: "Arrange the growth hacking process from start to finish.",
    items: [
      "Double down on what works",
      "Measure results",
      "Form hypotheses",
      "Design minimal experiments",
    ],
    correctOrder: [2, 3, 1, 0],
    explanation:
      "The growth hacking process follows: form hypotheses, design minimal experiments, measure results, and double down on what works (or learn from what did not).",
  },

  // === SECTION 2: Core Concepts (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is a growth loop?",
    options: [
      "A one-time marketing campaign",
      "A self-reinforcing system where the output of one cycle becomes the input of the next",
      "A circular org chart",
      "A repeated email sequence",
    ],
    correctIndex: 1,
    explanation:
      "Growth loops are self-reinforcing systems where the output of one cycle becomes the input of the next, compounding growth over time unlike linear funnels.",
  },
  {
    type: "multiple-choice",
    question: "What is the viral coefficient (K-factor)?",
    options: [
      "The number of social media shares per post",
      "How many new users each existing user generates",
      "The speed at which content goes viral",
      "The ratio of paid to organic traffic",
    ],
    correctIndex: 1,
    explanation:
      "The viral coefficient (K-factor) measures how many new users each existing user generates. It is calculated as invitations sent per user multiplied by the conversion rate of invitations.",
  },
  {
    type: "multiple-choice",
    question: "What K-factor is needed for true viral growth?",
    options: [
      "K > 0.1",
      "K > 0.5",
      "K > 1",
      "K > 10",
    ],
    correctIndex: 2,
    explanation:
      "If K > 1, each user brings in more than one new user, creating exponential growth. A K between 0.5 and 1.0 provides strong amplification but not true virality.",
  },
  {
    type: "multiple-choice",
    question: "What is Product-Led Growth (PLG)?",
    options: [
      "A strategy where sales teams drive all growth",
      "A strategy where the product itself is the primary vehicle for acquisition, conversion, and retention",
      "A strategy focused exclusively on paid advertising",
      "A strategy that ignores product features",
    ],
    correctIndex: 1,
    explanation:
      "PLG is a strategy where the product itself is the primary vehicle for acquisition, conversion, and retention through free trials, freemium tiers, or self-serve onboarding.",
  },
  {
    type: "true-false",
    question: "Growth loops compound over time, unlike linear funnels.",
    correctAnswer: true,
    explanation:
      "Unlike linear funnels that end at a specific stage, growth loops are self-reinforcing — each cycle produces outputs that feed back into the system, creating compounding growth.",
  },
  {
    type: "true-false",
    question: "A K-factor between 0.5 and 1.0 provides no value for growth.",
    correctAnswer: false,
    explanation:
      "A K-factor between 0.5 and 1.0 provides strong amplification that significantly reduces acquisition costs, even though it does not achieve true viral (exponential) growth.",
  },
  {
    type: "multi-select",
    question: "Which companies grew primarily through Product-Led Growth? (Select all that apply)",
    options: [
      "Slack",
      "Traditional brick-and-mortar banks",
      "Dropbox",
      "Notion",
      "Local print newspapers",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Slack, Dropbox, and Notion are classic examples of companies that grew primarily through PLG, offering free tiers or trials that let users experience value before paying.",
  },
  {
    type: "multi-select",
    question: "What are common types of growth loops? (Select all that apply)",
    options: [
      "Viral loops",
      "Content loops",
      "Paid acquisition loops",
      "Depreciation loops",
      "Sales loops",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Common growth loop types include viral loops, content loops, paid acquisition loops, and sales loops. Depreciation loops are not a recognized growth loop type.",
  },
  {
    type: "ordering",
    question: "Arrange a content growth loop in the correct cycle order.",
    items: [
      "Some new users create their own content",
      "A user creates content on the platform",
      "New users discover it via search",
      "Content gets indexed by Google",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "A content growth loop follows: user creates content, content gets indexed by Google, new users discover it via search, some new users create their own content, and the cycle repeats.",
  },
  {
    type: "multiple-choice",
    question: "In the AARRR framework, what does 'Activation' measure?",
    options: [
      "How many users sign up",
      "Whether users have a great first experience (reaching the 'aha moment')",
      "How many users make a purchase",
      "How many users refer friends",
    ],
    correctIndex: 1,
    explanation:
      "Activation measures whether users have a great first experience. Key indicators include signup completion, onboarding steps completed, and reaching the 'aha moment.'",
  },
  {
    type: "multiple-choice",
    question: "How is the viral coefficient (K-factor) calculated?",
    options: [
      "Total users / Total invitations",
      "Invitations sent per user x Conversion rate of invitations",
      "Revenue / Number of referrals",
      "New users / Churned users",
    ],
    correctIndex: 1,
    explanation:
      "K = invitations sent per user multiplied by the conversion rate of those invitations. If each user sends 5 invitations and 25% convert, K = 5 x 0.25 = 1.25.",
  },
  {
    type: "multi-select",
    question: "How do PLG companies let users experience value before paying? (Select all that apply)",
    options: [
      "Free trials with full feature access",
      "Freemium tiers with limited but useful functionality",
      "Requiring annual contracts before any access",
      "Self-serve onboarding without sales interaction",
      "Product demos gated behind sales calls only",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "PLG companies use free trials, freemium tiers, and self-serve onboarding to let users experience value before paying. Requiring contracts or gating behind sales calls is the opposite of PLG.",
  },

  // === SECTION 3: Strategy & Planning (12 questions) ===
  {
    type: "multiple-choice",
    question: "What does ICE stand for in the experiment prioritization framework?",
    options: [
      "Innovation, Cost, Efficiency",
      "Impact, Confidence, Ease",
      "Insight, Conversion, Engagement",
      "Implementation, Control, Evaluation",
    ],
    correctIndex: 1,
    explanation:
      "ICE stands for Impact (how much will this move the metric), Confidence (how sure are you it will work), and Ease (how quickly and cheaply can you run it).",
  },
  {
    type: "multiple-choice",
    question: "How are ICE scores calculated for each experiment?",
    options: [
      "Multiply all three scores together",
      "Add all three scores",
      "Score each dimension 1-10 and average them",
      "Only use the Impact score",
    ],
    correctIndex: 2,
    explanation:
      "Score each experiment from 1-10 on Impact, Confidence, and Ease, then average the three scores to create a priority ranking for your experiment backlog.",
  },
  {
    type: "multiple-choice",
    question: "What made Dropbox's referral program so successful?",
    options: [
      "It offered cash payments only to referrers",
      "It gave value to both the referrer and the referred (500MB extra storage each)",
      "It required users to share on social media",
      "It was only available to paid users",
    ],
    correctIndex: 1,
    explanation:
      "Dropbox's referral program was double-sided — both the referrer and the referred received 500MB of extra storage. This drove 60% of signups because the reward aligned with the product.",
  },
  {
    type: "multiple-choice",
    question: "What is guerrilla marketing?",
    options: [
      "Marketing with very large budgets",
      "Unconventional, low-cost tactics designed to generate outsized attention",
      "Marketing exclusively through gorilla mascots",
      "Traditional TV advertising campaigns",
    ],
    correctIndex: 1,
    explanation:
      "Guerrilla marketing uses unconventional, low-cost tactics to generate outsized attention. The key is asymmetric returns — small investments generating massive awareness.",
  },
  {
    type: "true-false",
    question: "High-growth teams typically aim to run two to three experiments per week.",
    correctAnswer: true,
    explanation:
      "Experiment velocity is a competitive advantage. High-growth teams aim for two to three experiments per week, using prioritization frameworks to focus on the highest-potential tests.",
  },
  {
    type: "true-false",
    question: "A referral program should only reward the person making the referral, not the new user.",
    correctAnswer: false,
    explanation:
      "Effective referral programs are double-sided, giving value to both the referrer and the referred. This creates motivation on both sides and increases conversion rates.",
  },
  {
    type: "multi-select",
    question: "What should you consider when designing a referral program? (Select all that apply)",
    options: [
      "Whether the reward aligns with your product",
      "Whether the incentive is double-sided",
      "Whether the sharing mechanism is frictionless",
      "Whether to make it a separate, hard-to-find feature",
      "Whether it can be built into the natural product flow",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Effective referral programs have product-aligned rewards, double-sided incentives, frictionless sharing, and integration into the natural product flow rather than being hidden as a separate feature.",
  },
  {
    type: "multi-select",
    question: "Which are examples of guerrilla marketing tactics? (Select all that apply)",
    options: [
      "Platform hacking (like Airbnb's Craigslist integration)",
      "Buying Super Bowl ad spots",
      "Community infiltration (engaging authentically in forums)",
      "Viral content campaigns",
      "Strategic partnerships",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "Guerrilla tactics include platform hacking, authentic community engagement, viral campaigns, and strategic partnerships. Super Bowl ads require massive budgets and are traditional marketing.",
  },
  {
    type: "ordering",
    question: "Arrange the experiment management cycle in the correct order.",
    items: [
      "Run retrospectives after each batch",
      "Prioritize using ICE framework",
      "Build a backlog of experiment ideas",
      "Assign owners and set success criteria",
    ],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "The experiment management cycle follows: build a backlog of ideas, prioritize using ICE, assign owners and set success criteria, and run retrospectives after each batch.",
  },
  {
    type: "multiple-choice",
    question: "What is 'platform hacking' in the context of growth?",
    options: [
      "Illegally accessing competitor systems",
      "Leveraging existing platforms' audiences and mechanics for your own growth",
      "Building your own social media platform",
      "Hacking into advertising dashboards",
    ],
    correctIndex: 1,
    explanation:
      "Platform hacking means creatively leveraging existing platforms' audiences and mechanics for your own growth, like Airbnb's integration with Craigslist to reach a massive existing audience.",
  },
  {
    type: "multi-select",
    question: "Why is experiment velocity a competitive advantage? (Select all that apply)",
    options: [
      "Faster experiments mean faster learning about what works",
      "More experiments per week accumulate learnings faster",
      "Running more experiments guarantees every test will succeed",
      "Teams find growth levers before competitors",
      "High velocity reduces the need for hypothesis formation",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Experiment velocity is advantageous because faster experiments accelerate learning, more experiments accumulate insights, and teams discover growth levers before competitors. It does not guarantee success or eliminate the need for hypotheses.",
  },
  {
    type: "multiple-choice",
    question: "What percentage of Dropbox signups were driven by their referral program?",
    options: [
      "10%",
      "30%",
      "60%",
      "90%",
    ],
    correctIndex: 2,
    explanation:
      "Dropbox's referral program drove approximately 60% of their signups, making it one of the most successful referral programs in tech history.",
  },

  // === SECTION 4: Execution & Implementation (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is a 'minimum viable test' (MVT) in growth hacking?",
    options: [
      "The most expensive test you can afford",
      "The smallest possible experiment to validate or invalidate a hypothesis",
      "A test that runs for the minimum time period",
      "A test with the largest sample size possible",
    ],
    correctIndex: 1,
    explanation:
      "A minimum viable test is the smallest possible experiment designed to validate or invalidate a hypothesis before committing major resources to a full implementation.",
  },
  {
    type: "multiple-choice",
    question: "What should you do when a growth experiment fails?",
    options: [
      "Repeat the exact same experiment",
      "Document the learning and move to the next experiment",
      "Abandon the growth hacking approach entirely",
      "Blame the team and try harder",
    ],
    correctIndex: 1,
    explanation:
      "When an experiment fails, document the learning and move on to the next highest-priority test. Failed experiments are valuable because they narrow down what works.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of 'Powered by [Brand]' badges on free-tier outputs?",
    options: [
      "Legal compliance",
      "Exposing your brand to new audiences through existing users' outputs",
      "Increasing product pricing",
      "Reducing server costs",
    ],
    correctIndex: 1,
    explanation:
      "Adding 'Powered by [Brand]' badges on free-tier outputs is a PLG tactic that exposes your brand to new audiences every time an existing user shares or publishes their work.",
  },
  {
    type: "multiple-choice",
    question: "Why should growth teams look for underexploited channels?",
    options: [
      "Because popular channels are always better",
      "Because competitors have not yet saturated them, allowing outsized results at low cost",
      "Because new channels have better analytics",
      "Because old channels are always declining",
    ],
    correctIndex: 1,
    explanation:
      "Underexploited channels offer a window of opportunity where competitors have not yet saturated them, allowing early adopters to achieve outsized results at low cost.",
  },
  {
    type: "true-false",
    question: "You should fall in love with your hypothesis even when data contradicts it.",
    correctAnswer: false,
    explanation:
      "Never fall in love with a hypothesis. If the data shows an experiment failed, accept the result, document the learning, and move on. Objectivity is essential in growth hacking.",
  },
  {
    type: "true-false",
    question: "Invite flows should be built into natural workflow moments in the product.",
    correctAnswer: true,
    explanation:
      "Building invite flows into natural workflow moments (rather than as separate features) increases the likelihood that users will share the product because the prompt feels organic.",
  },
  {
    type: "multi-select",
    question: "Which are effective PLG tactics? (Select all that apply)",
    options: [
      "'Powered by [Brand]' badges on free-tier outputs",
      "Shareable outputs that expose your brand to new audiences",
      "Requiring all users to pay upfront",
      "Feature upgrades triggered by usage milestones",
      "Gate premium features behind a natural-encounter paywall",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "PLG tactics include brand badges, shareable outputs, usage-triggered upgrades, and naturally encountered paywalls. Requiring upfront payment is the opposite of PLG.",
  },
  {
    type: "multi-select",
    question: "What should be included in an experiment tracker? (Select all that apply)",
    options: [
      "Hypothesis and success criteria",
      "ICE scores and priority ranking",
      "Results and learnings",
      "Employee vacation schedules",
      "Experiment owner and timeline",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "An experiment tracker should include the hypothesis, success criteria, ICE scores, priority ranking, experiment owner, timeline, results, and learnings for institutional knowledge.",
  },
  {
    type: "ordering",
    question: "Put the growth experiment execution steps in the correct order.",
    items: [
      "Analyze and scale winners",
      "Design minimum viable test",
      "Prioritize with ICE scoring",
      "Ideation from data and feedback",
    ],
    correctOrder: [3, 2, 1, 0],
    explanation:
      "Growth experiment execution follows: ideation (brainstorm from data and feedback), prioritization (ICE scoring), design (minimum viable test), and finally analyze and scale winners.",
  },
  {
    type: "multiple-choice",
    question: "What is 'channel hacking'?",
    options: [
      "Hacking into competitor ad accounts",
      "Finding and exploiting underutilized channels where your audience gathers but competitors have not saturated",
      "Using only one marketing channel",
      "Spending the most on the most popular channel",
    ],
    correctIndex: 1,
    explanation:
      "Channel hacking is about finding underexploited channels where your audience gathers but competitors have not yet saturated, allowing outsized results at lower costs.",
  },
  {
    type: "ordering",
    question: "Arrange the lifecycle of an emerging marketing channel from earliest to latest stage.",
    items: [
      "Channel becomes saturated with high competition and rising costs",
      "Early adopters achieve outsized results at low cost",
      "New channel or platform emerges with untapped audience",
      "Mainstream marketers discover and begin flooding the channel",
    ],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "Emerging channels follow a lifecycle: a new platform emerges, early adopters get outsized results cheaply, mainstream marketers discover it, and eventually the channel becomes saturated with high costs.",
  },
  {
    type: "multiple-choice",
    question: "What should happen after each batch of growth experiments?",
    options: [
      "Immediately start the next batch without review",
      "A retrospective to document learnings and refine the process",
      "Take a month-long break",
      "Only celebrate the successes",
    ],
    correctIndex: 1,
    explanation:
      "After each batch of experiments, run a retrospective to document learnings, share insights across the team, and refine the experimentation process for the next cycle.",
  },

  // === SECTION 5: Measurement & Optimization (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is a North Star Metric?",
    options: [
      "Your company's stock price",
      "The single number that best captures the core value you deliver to customers",
      "Your total website traffic",
      "The number of employees in your company",
    ],
    correctIndex: 1,
    explanation:
      "The North Star Metric is the single number that best captures the core value you deliver to customers. Every growth experiment should ultimately move this metric.",
  },
  {
    type: "multiple-choice",
    question: "What is Airbnb's North Star Metric?",
    options: [
      "Number of hosts",
      "App downloads",
      "Nights booked",
      "Revenue per quarter",
    ],
    correctIndex: 2,
    explanation:
      "Airbnb's North Star Metric is 'nights booked' because it captures the core value they deliver — connecting travelers with accommodation for actual stays.",
  },
  {
    type: "multiple-choice",
    question: "Which of these is an example of a vanity metric?",
    options: [
      "Activation rate",
      "Total app downloads without active user data",
      "Revenue per user",
      "Retention rate",
    ],
    correctIndex: 1,
    explanation:
      "Total app downloads is a vanity metric because it looks impressive but does not tell you if those users are actually engaged or generating value. Without active user data, downloads are misleading.",
  },
  {
    type: "multiple-choice",
    question: "How can you distinguish a vanity metric from an actionable metric?",
    options: [
      "Vanity metrics have larger numbers",
      "Ask: 'Can I make a decision based on this metric?' If not, it is vanity.",
      "Vanity metrics are always social media-related",
      "Actionable metrics are always revenue metrics",
    ],
    correctIndex: 1,
    explanation:
      "The test for a vanity metric is simple: Can you make a business decision based on it? If the metric does not inform action, it is vanity regardless of how impressive it looks.",
  },
  {
    type: "true-false",
    question: "Social media follower count is always an actionable metric.",
    correctAnswer: false,
    explanation:
      "Social media follower count is typically a vanity metric. A large following with low engagement does not drive business outcomes. Engagement rate and conversions from social are more actionable.",
  },
  {
    type: "true-false",
    question: "Every growth experiment should ultimately move the North Star Metric.",
    correctAnswer: true,
    explanation:
      "While individual experiments may target sub-metrics (activation rate, referral rate), the ultimate measure of success is whether they collectively move the North Star Metric.",
  },
  {
    type: "multi-select",
    question: "Which of the following are actionable metrics? (Select all that apply)",
    options: [
      "Activation rate",
      "Total page views",
      "Retention rate",
      "Revenue per user",
      "Social media follower count",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Activation rate, retention rate, and revenue per user are actionable because they inform decisions. Total page views and follower count can be misleading without context.",
  },
  {
    type: "multi-select",
    question: "What should a growth metrics dashboard track? (Select all that apply)",
    options: [
      "North Star Metric",
      "Experiment velocity (experiments per week)",
      "Win rate (percentage of positive experiments)",
      "Office supply expenses",
      "K-factor (viral coefficient)",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "A growth dashboard should track the North Star Metric, experiment velocity, win rate, K-factor, and payback period. Office supply expenses are not growth metrics.",
  },
  {
    type: "ordering",
    question: "Rank these metrics from most strategic (broadest) to most tactical (narrowest).",
    items: [
      "Individual experiment results",
      "North Star Metric",
      "AARRR stage metrics",
      "Experiment win rate",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "From most strategic to most tactical: North Star Metric (the single most important indicator), AARRR stage metrics (lifecycle measurements), experiment win rate (process health), individual experiment results (tactical).",
  },
  {
    type: "multiple-choice",
    question: "What is 'payback period' in growth metrics?",
    options: [
      "The time to build a new product feature",
      "The time to recover customer acquisition cost from a customer's revenue",
      "The time between social media posts",
      "The time to hire a growth team",
    ],
    correctIndex: 1,
    explanation:
      "Payback period measures how long it takes to recover the cost of acquiring a customer from the revenue they generate. Shorter payback periods allow faster reinvestment in growth.",
  },
  {
    type: "multiple-choice",
    question: "What is Slack's North Star Metric?",
    options: [
      "Total teams signed up",
      "Messages sent per team",
      "App downloads",
      "Number of integrations installed",
    ],
    correctIndex: 1,
    explanation:
      "Slack's North Star Metric is 'messages sent per team' because it captures the core value: team communication and collaboration happening on the platform.",
  },
  {
    type: "ordering",
    question: "Arrange these growth measurement activities from most frequent to least frequent.",
    items: [
      "Quarterly North Star Metric review",
      "Daily experiment monitoring",
      "Annual growth strategy assessment",
      "Weekly experiment retrospectives",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "Growth measurement cadence from most to least frequent: daily experiment monitoring, weekly retrospectives, quarterly North Star Metric reviews, and annual growth strategy assessments.",
  },
];
