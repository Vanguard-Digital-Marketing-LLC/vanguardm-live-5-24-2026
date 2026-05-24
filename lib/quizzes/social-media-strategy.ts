import type { QuizQuestion } from "@/lib/academy-data";

export const socialMediaStrategyQuiz: QuizQuestion[] = [
  // ── Section 1: Introduction & Overview (12 questions) ──────────────
  {
    type: "multiple-choice",
    question: "What is the primary purpose of a social media strategy?",
    options: [
      "To schedule posts across platforms",
      "To guide every action on social platforms toward measurable business goals",
      "To increase follower count as quickly as possible",
      "To create viral content consistently",
    ],
    correctIndex: 1,
    explanation:
      "A social media strategy is the master plan that guides every action on social platforms toward measurable business goals, answering who you are trying to reach, what value you will provide, and how you will measure success.",
  },
  {
    type: "multiple-choice",
    question:
      "According to the Content Marketing Institute, brands with a documented strategy are how much more likely to report success?",
    options: [
      "2x more likely",
      "3x more likely",
      "5x more likely",
      "10x more likely",
    ],
    correctIndex: 1,
    explanation:
      "The Content Marketing Institute found that brands with a documented strategy are 3x more likely to report success than those without one.",
  },
  {
    type: "multiple-choice",
    question:
      "Which of the following best describes the difference between a tactic and a strategy?",
    options: [
      "Tactics are long-term; strategies are short-term",
      "Tactics are individual actions; strategy is the overarching plan that makes each tactic purposeful",
      "Tactics focus on measurement; strategies focus on execution",
      "There is no meaningful difference between tactics and strategies",
    ],
    correctIndex: 1,
    explanation:
      "Tactics are the individual actions you take (posting a Reel, running a poll). Strategy is the overarching plan that makes each tactic purposeful. A tactic without strategy is noise; a tactic within strategy is progress.",
  },
  {
    type: "multi-select",
    question:
      "What three fundamental questions should a social media strategy answer? (Select all that apply)",
    options: [
      "Who you are trying to reach",
      "What hashtags to use",
      "What value you will provide",
      "How you will measure success",
      "Which competitors to copy",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "A strong social media strategy answers three fundamental questions: who you are trying to reach, what value you will provide them, and how you will measure success.",
  },
  {
    type: "true-false",
    question:
      "A social media strategy is a one-time document that does not need to be updated once created.",
    correctAnswer: false,
    explanation:
      "A social media strategy is a living document that should be reviewed and revised quarterly. Markets shift, algorithms change, and audience preferences evolve.",
  },
  {
    type: "true-false",
    question:
      "Strategy provides accountability by creating benchmarks so your team knows what success looks like.",
    correctAnswer: true,
    explanation:
      "One of the key benefits of strategy is accountability — it creates benchmarks so your team knows what success looks like each quarter.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are key benefits of having a documented social media strategy? (Select all that apply)",
    options: [
      "Alignment with business goals",
      "Guaranteed viral content",
      "Consistency in brand voice",
      "Accountability through benchmarks",
      "Automatic follower growth",
      "Efficiency in resource allocation",
    ],
    correctIndices: [0, 2, 3, 5],
    explanation:
      "The key benefits of a documented strategy are alignment with business goals, consistency in brand voice, accountability through benchmarks, and efficiency in resource allocation. No strategy can guarantee viral content or automatic follower growth.",
  },
  {
    type: "multi-select",
    question:
      "What should a social media strategy prevent? (Select all that apply)",
    options: [
      "Reactive and inconsistent posting",
      "Wasted time on platforms that don't serve your audience",
      "All content creation",
      "Inability to measure ROI",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "A strategy prevents reactive and inconsistent posting, wasted time on platforms that don't serve your audience, and the inability to measure ROI. It does not prevent content creation — it makes it more purposeful.",
  },
  {
    type: "ordering",
    question:
      "Put these strategic planning steps in the correct order from first to last.",
    items: [
      "Set SMART goals",
      "Define audience personas",
      "Measure and optimize",
      "Create and publish content",
    ],
    correctOrder: [1, 0, 3, 2],
    explanation:
      "The correct order is: first define your audience personas to know who you're targeting, then set SMART goals aligned to those audiences, then create and publish content to achieve those goals, and finally measure and optimize based on results.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the relationship between consistency and brand recognition on social media?",
    options: [
      "Consistency reduces brand recognition by boring the audience",
      "Consistency has no impact on brand recognition",
      "Consistency establishes a recognizable brand voice and visual identity across touchpoints",
      "Consistency only matters for paid advertising",
    ],
    correctIndex: 2,
    explanation:
      "Consistency establishes a recognizable brand voice and visual identity across every touchpoint, which is one of the core benefits of having a strategy.",
  },
  {
    type: "multiple-choice",
    question: "Why is efficiency listed as a benefit of social media strategy?",
    options: [
      "It automates all content creation",
      "It prevents wasted time on platforms or content types that do not serve your audience",
      "It eliminates the need for a social media team",
      "It reduces content production to one post per week",
    ],
    correctIndex: 1,
    explanation:
      "Efficiency as a strategy benefit means preventing wasted time on platforms or content types that do not serve your audience, ensuring resources are directed where they matter most.",
  },
  {
    type: "ordering",
    question:
      "Rank these from most strategic (top) to most tactical (bottom).",
    items: [
      "Posting a Reel at 9 AM",
      "Defining your target audience",
      "Setting quarterly KPIs",
      "Writing a caption for a carousel post",
    ],
    correctOrder: [1, 2, 0, 3],
    explanation:
      "Defining your target audience is the most strategic activity, followed by setting quarterly KPIs. Posting a Reel at a specific time and writing a caption are tactical execution tasks.",
  },

  // ── Section 2: Core Concepts (12 questions) ────────────────────────
  {
    type: "multiple-choice",
    question: "What is an audience persona?",
    options: [
      "A real customer who endorses your brand",
      "A semi-fictional representation of your ideal follower or customer",
      "A demographic report from Google Analytics",
      "A social media influencer who matches your brand",
    ],
    correctIndex: 1,
    explanation:
      "An audience persona is a semi-fictional representation of your ideal follower or customer that goes beyond basic demographics into psychographics: motivations, pain points, preferred content formats, and online behaviors.",
  },
  {
    type: "multiple-choice",
    question: "How many audience personas should most brands develop?",
    options: [
      "One comprehensive persona",
      "Two to four personas",
      "Ten or more personas for maximum coverage",
      "Personas are not necessary for social media",
    ],
    correctIndex: 1,
    explanation:
      "Most brands need two to four personas. Too few means you miss segments; too many dilutes your focus and makes content planning overly complex.",
  },
  {
    type: "multiple-choice",
    question: "What are content pillars?",
    options: [
      "The most popular posts on your profile",
      "Three to five core themes your brand consistently discusses",
      "The first posts a new follower sees on your grid",
      "Sponsored content partnerships with other brands",
    ],
    correctIndex: 1,
    explanation:
      "Content pillars are the three to five core themes your brand will consistently talk about. They act as guardrails that keep your feed focused and on-brand.",
  },
  {
    type: "multiple-choice",
    question:
      "Which platform would be most appropriate for a B2B SaaS company's primary social media presence?",
    options: [
      "TikTok and Snapchat",
      "LinkedIn and YouTube",
      "Pinterest and Instagram",
      "Reddit and Tumblr",
    ],
    correctIndex: 1,
    explanation:
      "A B2B SaaS company may thrive on LinkedIn and YouTube because these platforms cater to professional audiences and long-form educational content that supports complex buying decisions.",
  },
  {
    type: "multiple-choice",
    question: "What is the difference between brand voice and brand tone?",
    options: [
      "They are the same thing",
      "Voice stays consistent; tone shifts based on context",
      "Tone stays consistent; voice shifts based on platform",
      "Voice is for written content; tone is for video content",
    ],
    correctIndex: 1,
    explanation:
      "Your brand voice is your personality on social media and stays consistent. Your tone shifts based on context — you might be playful in a meme but empathetic in a customer service response.",
  },
  {
    type: "true-false",
    question:
      "Content pillars should limit your brand to discussing only those specific topics and nothing else.",
    correctAnswer: false,
    explanation:
      "Content pillars act as guardrails to keep your feed focused and on-brand, but they are not rigid restrictions. They guide the majority of your content while still allowing for timely, relevant content outside the pillars when appropriate.",
  },
  {
    type: "true-false",
    question:
      "Platform selection should be based on where your audience spends time and the content formats your team can consistently produce.",
    correctAnswer: true,
    explanation:
      "You should choose platforms based on where your audience actually spends time and the content formats your team can consistently produce, rather than trying to be present on every platform.",
  },
  {
    type: "multi-select",
    question:
      "Which elements should an audience persona include? (Select all that apply)",
    options: [
      "Motivations and pain points",
      "Preferred content formats",
      "Social Security numbers",
      "Online behaviors",
      "Credit card information",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Audience personas should include psychographic details like motivations, pain points, preferred content formats, and online behaviors. Personal financial information is never appropriate to include.",
  },
  {
    type: "multi-select",
    question:
      "Instagram is best suited for which types of content and brands? (Select all that apply)",
    options: [
      "Visual storytelling",
      "B2B enterprise sales",
      "Lifestyle brands",
      "E-commerce",
      "Long-form text articles",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Instagram is best suited for visual storytelling, lifestyle brands, and e-commerce. B2B enterprise sales typically performs better on LinkedIn, and long-form text articles are not a native Instagram format.",
  },
  {
    type: "ordering",
    question:
      "Arrange the steps of developing content pillars in the correct order.",
    items: [
      "Map each content piece to a pillar",
      "Audit your existing content themes",
      "Identify your audience's core needs",
      "Select 3-5 pillar topics",
    ],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "First identify your audience's core needs, then audit your existing content themes to see what aligns, then select 3-5 pillar topics based on that analysis, and finally map each content piece to a pillar for consistency.",
  },
  {
    type: "multiple-choice",
    question:
      "How many voice attributes should you document for your brand voice?",
    options: [
      "One defining word",
      "Three to five attributes with examples",
      "Ten or more attributes for precision",
      "Voice attributes are unnecessary for social media",
    ],
    correctIndex: 1,
    explanation:
      "Document three to five voice attributes (e.g., 'witty, knowledgeable, inclusive') and provide examples of dos and don'ts so every team member can write on-brand copy.",
  },
  {
    type: "multiple-choice",
    question:
      "What type of brand would most likely focus on Instagram and TikTok?",
    options: [
      "A cybersecurity consultancy",
      "A fashion DTC brand",
      "An accounting software company",
      "A legal services firm",
    ],
    correctIndex: 1,
    explanation:
      "A fashion DTC (direct-to-consumer) brand would focus on Instagram and TikTok because these platforms excel at visual, trend-driven content that appeals to fashion consumers.",
  },

  // ── Section 3: Strategy & Planning (12 questions) ──────────────────
  {
    type: "multiple-choice",
    question: "What does the 'M' in SMART goals stand for?",
    options: ["Manageable", "Measurable", "Meaningful", "Motivating"],
    correctIndex: 1,
    explanation:
      "SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound. The 'M' stands for Measurable — you need quantifiable metrics to track progress.",
  },
  {
    type: "multiple-choice",
    question: "Which is an example of a well-written SMART social media goal?",
    options: [
      "Get more followers this year",
      "Increase Instagram follower count from 5,000 to 10,000 by Q3 2026 through daily Reels and weekly collaborations",
      "Make better content",
      "Be more active on social media",
    ],
    correctIndex: 1,
    explanation:
      "A SMART goal is Specific (Instagram followers), Measurable (5,000 to 10,000), Achievable (with daily Reels and collaborations), Relevant (growth-focused), and Time-bound (by Q3 2026).",
  },
  {
    type: "multiple-choice",
    question:
      "How many competitors should you analyze in a competitive analysis?",
    options: [
      "One main competitor",
      "Three to five competitors",
      "Every competitor in your industry",
      "Competitive analysis is unnecessary for social media",
    ],
    correctIndex: 1,
    explanation:
      "Study three to five competitors and note their posting frequency, content formats, engagement rates, and audience sentiment to identify content gaps you can fill.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended posting cadence for TikTok during growth phases?",
    options: [
      "Once per week",
      "1-3 videos per day",
      "Once per month",
      "5-10 videos per day",
    ],
    correctIndex: 1,
    explanation:
      "TikTok rewards volume. During growth phases, aim for 1-3 videos per day for maximum algorithm exposure.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended weekly posting frequency for LinkedIn?",
    options: [
      "1 post per week",
      "3-5 posts per week",
      "10-15 posts per week",
      "Daily posts including weekends",
    ],
    correctIndex: 1,
    explanation:
      "LinkedIn best practices recommend 3-5 posts per week, mixing text, carousels, and video for varied engagement.",
  },
  {
    type: "true-false",
    question:
      "Competitive analysis should focus primarily on copying successful competitor strategies.",
    correctAnswer: false,
    explanation:
      "Competitive analysis should focus less on copying and more on differentiating. The goal is to identify content gaps you can fill and opportunities to stand out, not to replicate what others are doing.",
  },
  {
    type: "true-false",
    question:
      "An editorial calendar maps out what you will post, when, and on which platform.",
    correctAnswer: true,
    explanation:
      "An editorial calendar is a planning tool that maps out what you will post, when, and on which platform, ensuring consistent execution of your content strategy.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are components of the SMART goal framework? (Select all that apply)",
    options: [
      "Specific",
      "Social",
      "Measurable",
      "Achievable",
      "Relevant",
      "Time-bound",
    ],
    correctIndices: [0, 2, 3, 4, 5],
    explanation:
      "SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound. 'Social' is not a component of the SMART framework.",
  },
  {
    type: "multi-select",
    question:
      "What should you note when conducting a competitive analysis? (Select all that apply)",
    options: [
      "Posting frequency",
      "Content formats",
      "Employee salaries",
      "Engagement rates",
      "Audience sentiment",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "In competitive analysis, study posting frequency, content formats, engagement rates, and audience sentiment. Employee salaries are not a relevant social media competitive metric.",
  },
  {
    type: "ordering",
    question:
      "Arrange these resource allocation steps in the correct order.",
    items: [
      "Define approval workflows",
      "Determine required roles",
      "Map roles to team members or agencies",
      "Move content from ideation to publishing",
    ],
    correctOrder: [1, 2, 0, 3],
    explanation:
      "First determine what roles are needed (content creation, community management, paid, analytics), then map those roles to team members or agencies, define approval workflows to prevent bottlenecks, and finally execute the workflow to move content from ideation to publishing.",
  },
  {
    type: "multiple-choice",
    question:
      "Which tool category is NOT typically used for competitive analysis?",
    options: [
      "Sprout Social",
      "Semrush",
      "Manual observation",
      "Email marketing platforms",
    ],
    correctIndex: 3,
    explanation:
      "Sprout Social, Semrush, and manual observation are all valid competitive analysis methods. Email marketing platforms are not typically used for social media competitive analysis.",
  },
  {
    type: "ordering",
    question: "Order the editorial calendar planning steps from first to last.",
    items: [
      "Schedule posts using a scheduling tool",
      "Define content pillars and posting cadence",
      "Assign content to specific dates and platforms",
      "Review performance and adjust next month's plan",
    ],
    correctOrder: [1, 2, 0, 3],
    explanation:
      "Start by defining content pillars and posting cadence, then assign specific content to dates and platforms, schedule posts using tools like Buffer or Hootsuite, and finally review performance to adjust the next month's plan.",
  },

  // ── Section 4: Execution & Implementation (12 questions) ───────────
  {
    type: "multiple-choice",
    question:
      "What is the correct order of the content production workflow?",
    options: [
      "Publishing → Creation → Ideation → Review",
      "Ideation → Briefing → Creation → Review → Scheduling → Publishing → Engagement",
      "Creation → Review → Publishing → Ideation",
      "Scheduling → Creation → Review → Publishing",
    ],
    correctIndex: 1,
    explanation:
      "The repeatable content production workflow is: Ideation → Briefing → Creation → Review → Scheduling → Publishing → Engagement.",
  },
  {
    type: "multiple-choice",
    question: "What does cross-platform repurposing involve?",
    options: [
      "Posting the exact same content on every platform",
      "Adapting a single piece of content for multiple platforms in each platform's native style",
      "Only creating content for one platform",
      "Deleting content from one platform and reposting it on another",
    ],
    correctIndex: 1,
    explanation:
      "Cross-platform repurposing means adapting a single piece of content for multiple platforms while adapting the format and copy to each platform's native style. It multiplies output without multiplying effort.",
  },
  {
    type: "multiple-choice",
    question:
      "In the content mix formula, what percentage should be allocated to promotional content?",
    options: ["10%", "20%", "30%", "40%"],
    correctIndex: 0,
    explanation:
      "The content mix formula recommends only 10% promotional content (product launches, offers, direct CTAs), with the remaining 90% split between value (40%), brand (30%), and community (20%) content.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended hashtag approach for social media content?",
    options: [
      "Use only branded hashtags",
      "A layered approach: broad, niche, and branded hashtags",
      "Use as many hashtags as possible",
      "Hashtags are no longer relevant in social media",
    ],
    correctIndex: 1,
    explanation:
      "Use a layered approach: 2-3 broad hashtags for reach, 3-5 niche hashtags for targeted discovery, and 1-2 branded hashtags for community building.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the primary benefit of batch content creation?",
    options: [
      "It reduces content quality",
      "It prevents scrambling for last-minute posts by dedicating production days",
      "It eliminates the need for a content calendar",
      "It ensures every post goes viral",
    ],
    correctIndex: 1,
    explanation:
      "Batch content creation into dedicated production days means you are never scrambling for last-minute posts, improving both consistency and quality.",
  },
  {
    type: "true-false",
    question:
      "When repurposing content across platforms, you should post the exact same copy and format on every platform.",
    correctAnswer: false,
    explanation:
      "When repurposing content, always adapt the format and copy to each platform's native style. A YouTube video can become a TikTok clip, LinkedIn carousel, or Twitter thread — but each should feel native to its platform.",
  },
  {
    type: "true-false",
    question:
      "The content mix formula recommends that 40% of content should be value-driven (educational, entertaining, or inspirational).",
    correctAnswer: true,
    explanation:
      "The content mix formula allocates 40% to value content (educational, entertaining, or inspirational), 30% to brand content, 20% to community content, and 10% to promotional content.",
  },
  {
    type: "multi-select",
    question:
      "Which tools are commonly used for content scheduling? (Select all that apply)",
    options: [
      "Buffer",
      "Hootsuite",
      "Later",
      "Microsoft Excel",
      "Photoshop",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Buffer, Hootsuite, and Later are all popular content scheduling platforms. Excel is used for planning and tracking, and Photoshop is a design tool — neither are scheduling tools.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are valid categories in the content mix formula? (Select all that apply)",
    options: [
      "Value content (40%)",
      "Brand content (30%)",
      "Sales content (50%)",
      "Community content (20%)",
      "Promotional content (10%)",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "The content mix formula includes Value (40%), Brand (30%), Community (20%), and Promotional (10%). 'Sales content (50%)' is not a category in this framework.",
  },
  {
    type: "ordering",
    question:
      "Put the content production workflow in the correct order.",
    items: [
      "Review",
      "Ideation",
      "Publishing",
      "Creation",
      "Scheduling",
    ],
    correctOrder: [1, 3, 0, 4, 2],
    explanation:
      "The content production workflow follows: Ideation → Creation → Review → Scheduling → Publishing. Each step builds on the previous to ensure quality and consistency.",
  },
  {
    type: "multiple-choice",
    question: "What should you research before committing to a hashtag set?",
    options: [
      "The color of the hashtag",
      "Hashtag volume and competition",
      "How long the hashtag has existed",
      "Whether celebrities use the hashtag",
    ],
    correctIndex: 1,
    explanation:
      "Research hashtag volume (how many posts use it) and competition (how hard it is to rank) before committing to a set. This ensures your content has a chance to be discovered.",
  },
  {
    type: "multiple-choice",
    question:
      "A long-form YouTube video can be repurposed into which of the following?",
    options: [
      "Only a TikTok clip",
      "A TikTok clip, LinkedIn carousel, Instagram Reel, and Twitter thread",
      "Only a LinkedIn article",
      "It cannot be repurposed effectively",
    ],
    correctIndex: 1,
    explanation:
      "A single piece of content like a long-form YouTube video can be repurposed into a TikTok clip, a LinkedIn carousel, an Instagram Reel, and a Twitter thread, multiplying output without multiplying effort.",
  },

  // ── Section 5: Measurement & Optimization (12 questions) ───────────
  {
    type: "multiple-choice",
    question: "What does engagement rate measure?",
    options: [
      "Total number of followers",
      "How compelling your content is, calculated as (Likes + Comments + Shares + Saves) / Reach",
      "Total amount spent on advertising",
      "Number of posts published per week",
    ],
    correctIndex: 1,
    explanation:
      "Engagement rate is calculated as (Likes + Comments + Shares + Saves) / Reach and measures how compelling your content is to your audience.",
  },
  {
    type: "multiple-choice",
    question: "What does Share of Voice measure?",
    options: [
      "How loud your brand's messaging is",
      "Your brand mentions divided by total industry mentions",
      "The number of times your posts are shared",
      "Your team's speaking engagements",
    ],
    correctIndex: 1,
    explanation:
      "Share of Voice is calculated as your brand mentions divided by total industry mentions. It measures your market presence relative to competitors.",
  },
  {
    type: "multiple-choice",
    question: "What is the recommended reporting cadence for social media?",
    options: [
      "Daily reports",
      "Weekly reports",
      "Monthly reports",
      "Annual reports only",
    ],
    correctIndex: 2,
    explanation:
      "Build a monthly reporting cadence. Compare performance against your SMART goals, identify top-performing content, and analyze underperformers.",
  },
  {
    type: "multiple-choice",
    question:
      "How long should you run an A/B test on social media before drawing conclusions?",
    options: [
      "One day",
      "At least two weeks with sufficient sample size",
      "Six months minimum",
      "A/B testing doesn't apply to social media",
    ],
    correctIndex: 1,
    explanation:
      "Run each A/B test for at least two weeks with sufficient sample size to ensure statistical significance before drawing conclusions.",
  },
  {
    type: "multiple-choice",
    question: "What is a 'vanity metric' in social media?",
    options: [
      "Any metric that goes up",
      "Metrics like follower count that look impressive but don't directly measure business impact",
      "Metrics that are hard to calculate",
      "Metrics only available in paid tools",
    ],
    correctIndex: 1,
    explanation:
      "Vanity metrics like follower count look impressive but matter less than actionable metrics like engagement rate, CTR, and conversion rate that directly measure business impact.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following correctly describe Click-Through Rate (CTR)? (Select all that apply)",
    options: [
      "Calculated as link clicks divided by impressions",
      "Measures interest in your offer or content",
      "Identical to engagement rate",
      "Indicates how effective your calls to action are",
      "Only applicable to paid advertising",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "CTR is calculated as link clicks divided by impressions. It measures interest in your offer or content and indicates CTA effectiveness. It is not the same as engagement rate and applies to both organic and paid content.",
  },
  {
    type: "true-false",
    question:
      "Follower count is the most important KPI for measuring social media success.",
    correctAnswer: false,
    explanation:
      "Follower count is considered a vanity metric. Actionable metrics like engagement rate, CTR, conversion rate, and share of voice are more meaningful indicators of social media success.",
  },
  {
    type: "true-false",
    question:
      "When A/B testing on social media, you should test one variable at a time.",
    correctAnswer: true,
    explanation:
      "Test one variable at a time (hook copy, thumbnail image, posting time, or CTA placement) so you can clearly attribute any performance differences to the specific change made.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are actionable social media KPIs? (Select all that apply)",
    options: [
      "Engagement Rate",
      "Follower Count",
      "Click-Through Rate",
      "Conversion Rate",
      "Number of Posts Published",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Engagement Rate, CTR, and Conversion Rate are actionable KPIs that measure content effectiveness and business impact. Follower count is a vanity metric, and number of posts published is an activity metric, not a performance metric.",
  },
  {
    type: "multi-select",
    question:
      "What should you compare in your monthly social media report? (Select all that apply)",
    options: [
      "Performance against SMART goals",
      "Competitor stock prices",
      "Top-performing content identification",
      "Underperformer analysis",
      "Weather patterns during the month",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Monthly reports should compare performance against SMART goals, identify top-performing content, and analyze underperformers. Competitor stock prices and weather patterns are not standard social media reporting elements.",
  },
  {
    type: "ordering",
    question: "Arrange the A/B testing process in the correct order.",
    items: [
      "Document findings in a shared testing log",
      "Identify one variable to test",
      "Run the test for at least two weeks",
      "Analyze results with sufficient sample size",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "The correct A/B testing process is: identify one variable to test, run the test for at least two weeks, analyze results with sufficient sample size, and document findings in a shared testing log so institutional knowledge compounds.",
  },
  {
    type: "ordering",
    question:
      "Rank these analytics tools from native (platform-built) to third-party.",
    items: [
      "Hootsuite Analytics",
      "Instagram Insights",
      "Sprout Social",
      "LinkedIn Analytics",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "Instagram Insights and LinkedIn Analytics are native platform tools built into each platform. Hootsuite Analytics and Sprout Social are third-party tools that aggregate data across multiple platforms.",
  },
];
