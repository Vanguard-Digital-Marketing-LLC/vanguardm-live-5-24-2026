import type { QuizQuestion } from "@/lib/academy-data";

export const adCopywritingTestingQuiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What is the primary role of ad copy in paid advertising?",
    options: [
      "To increase your daily budget automatically",
      "To bridge the gap between your budget and your results by convincing people to click",
      "To replace the need for targeting",
      "To improve your website's SEO rankings",
    ],
    correctIndex: 1,
    explanation:
      "Ad copy is the bridge between your budget and results. Targeting puts ads in front of the right people, but the words and creative convince them to click and ultimately convert.",
  },
  {
    type: "multiple-choice",
    question:
      "How can great ad copy affect campaign economics without increasing spend?",
    options: [
      "It cannot — better results always require more money",
      "It can double or triple CTR, lower CPC through Quality Score, and increase conversion rates",
      "It only affects brand perception, not campaign metrics",
      "It reduces the number of impressions needed",
    ],
    correctIndex: 1,
    explanation:
      "Great ad copy can dramatically improve CTR, lower CPC through better Quality Scores, and increase conversion rates — all without spending an extra dollar on the campaign.",
  },
  {
    type: "multiple-choice",
    question:
      "Why is ad copywriting for paid media different from long-form content writing?",
    options: [
      "There is no difference — good writing is good writing",
      "You work within tight character limits, compete for attention in fractions of a second, and write for specific funnel stages",
      "Ad copy is always longer than blog posts",
      "Ad copy does not need to be persuasive",
    ],
    correctIndex: 1,
    explanation:
      "Paid ad copywriting is a distinct discipline requiring work within tight character limits, competing for attention in fractions of a second, and writing for specific audiences at specific buying journey stages.",
  },
  {
    type: "multiple-choice",
    question:
      "Why is A/B testing important for ad copywriting?",
    options: [
      "It is legally required for advertising",
      "Even experienced copywriters cannot predict winners; testing lets data determine results",
      "It only matters for large budgets over $10,000/month",
      "It replaces the need for creative strategy",
    ],
    correctIndex: 1,
    explanation:
      "Even the most experienced copywriters cannot predict with certainty which ad will outperform. A/B testing removes guesswork and lets actual user behavior determine winners.",
  },
  {
    type: "multiple-choice",
    question:
      "What advantage do continuous testers have over 'set and forget' advertisers?",
    options: [
      "They spend more money overall",
      "They build a compounding performance advantage over time",
      "They avoid the need for targeting optimization",
      "They can ignore creative quality",
    ],
    correctIndex: 1,
    explanation:
      "Continuous testing creates a compounding advantage — each test builds on previous learnings, and over months and years, this disciplined approach creates a massive performance gap over competitors who set and forget.",
  },
  {
    type: "multiple-choice",
    question:
      "What determines 80% of the weight in an ad's effectiveness?",
    options: [
      "The targeting settings",
      "The headline and first line of copy",
      "The display URL",
      "The landing page design",
    ],
    correctIndex: 1,
    explanation:
      "Your headline and first line carry approximately 80% of the weight because users scan rather than read. Front-loading value in these elements is critical for ad performance.",
  },
  {
    type: "true-false",
    question:
      "Ad copywriting requires a different skillset than blog writing or brand copywriting.",
    correctAnswer: true,
    explanation:
      "Ad copywriting operates within tight character limits, requires immediate persuasion, and targets specific funnel stages — making it a distinct discipline from long-form content, blog posts, or brand copywriting.",
  },
  {
    type: "true-false",
    question:
      "The best PPC advertisers write their ad copy once and never change it as long as the campaign is running.",
    correctAnswer: false,
    explanation:
      "The best PPC advertisers run continuous tests, constantly iterating and improving their ad copy. What sounds clever in a brainstorm may fall flat in the feed — only real-world data reveals true winners.",
  },
  {
    type: "multi-select",
    question:
      "What can great ad copy improve without additional budget? (Select all that apply)",
    options: [
      "Click-through rates",
      "Cost-per-click (via Quality Score)",
      "Conversion rates",
      "Total number of impressions served",
      "Ad relevance scores",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Better ad copy improves CTR, lowers CPC through Quality Score, increases conversion rates, and boosts relevance scores. Impressions are primarily controlled by budget and bidding, not copy quality alone.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are challenges specific to paid ad copywriting? (Select all that apply)",
    options: [
      "Tight character limits",
      "Competing for attention in fractions of a second",
      "Writing for specific funnel stages",
      "Unlimited space for storytelling",
      "Every word must earn its place",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Paid ad copy faces tight limits, extreme time pressure for attention, funnel-stage specificity, and the need for every word to contribute. Unlike blogs or articles, there is no unlimited space for storytelling.",
  },
  {
    type: "ordering",
    question:
      "Arrange the ad copy development process in the correct order.",
    items: [
      "Research audience and competition",
      "Write multiple ad variations",
      "Launch A/B tests",
      "Analyze results and declare winners",
      "Iterate on winning concepts",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "The process starts with research, moves to writing variations, launches tests, analyzes results, and iterates on winners. This cycle repeats continuously for ongoing improvement.",
  },
  {
    type: "ordering",
    question:
      "Rank these ad elements by their impact on user decision-making (most impactful first).",
    items: [
      "Headline",
      "First line of body copy",
      "Call to action",
      "Display URL",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "The headline is the most impactful (first thing read), followed by the opening line, the CTA (drives action), and the display URL (provides context but least influential on decisions).",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question: "What does AIDA stand for in copywriting?",
    options: [
      "Audience, Intent, Delivery, Action",
      "Attention, Interest, Desire, Action",
      "Awareness, Influence, Decision, Acquisition",
      "Analysis, Implementation, Design, Assessment",
    ],
    correctIndex: 1,
    explanation:
      "AIDA stands for Attention, Interest, Desire, Action — a classic direct-response framework where you capture attention, build interest, create desire for the outcome, and drive a specific action.",
  },
  {
    type: "multiple-choice",
    question:
      "In the AIDA framework, what is the purpose of the 'Desire' stage?",
    options: [
      "To grab the user's attention with a bold headline",
      "To paint a picture of the outcome using benefits over features",
      "To tell the user exactly what to do next",
      "To connect to the user's problem",
    ],
    correctIndex: 1,
    explanation:
      "The Desire stage paints a picture of the outcome using benefits (not features), social proof, and specificity. 'Close 30% more deals' creates more desire than 'cloud-based CRM.'",
  },
  {
    type: "multiple-choice",
    question:
      "Which headline formula uses a specific number to create interest?",
    options: [
      "How to [Achieve Desired Outcome]",
      "[Number] Ways to [Solve Problem]",
      "The [Adjective] Way to [Benefit]",
      "Stop [Pain Point]. Start [Benefit].",
    ],
    correctIndex: 1,
    explanation:
      "The '[Number] Ways to [Solve Problem]' formula (e.g., '7 Ways to Lower Your Cost Per Lead') uses specific numbers to create interest and set expectations for the content.",
  },
  {
    type: "multiple-choice",
    question:
      "Why does 'Get Your Free Quote' typically outperform 'Learn More' as a CTA?",
    options: [
      "It contains more words",
      "It is specific and communicates value to the user",
      "It uses the word 'free' which bypasses ad policies",
      "It is easier to read on mobile",
    ],
    correctIndex: 1,
    explanation:
      "'Get Your Free Quote' outperforms 'Learn More' because it is specific (tells the user exactly what happens next) and communicates value (it is free). Vague CTAs create ambiguity and lower click-through rates.",
  },
  {
    type: "multiple-choice",
    question:
      "What makes direct-response copywriting different from brand copywriting?",
    options: [
      "Direct-response uses more expensive language",
      "Every word is engineered to trigger an immediate, specific action",
      "Brand copywriting is always more effective",
      "Direct-response copy is always shorter",
    ],
    correctIndex: 1,
    explanation:
      "Direct-response copywriting is designed to trigger an immediate action — a click, sign-up, or purchase. Unlike brand copywriting that builds awareness over time, every word serves the goal of prompting a specific next step.",
  },
  {
    type: "multiple-choice",
    question:
      "Which CTA language is most appropriate for a top-of-funnel audience?",
    options: [
      "Buy Now",
      "Download the Guide",
      "Start Free Trial",
      "Add to Cart",
    ],
    correctIndex: 1,
    explanation:
      "'Download the Guide' is appropriate for top-of-funnel users who are still learning and not ready to purchase. 'Start Free Trial' and 'Buy Now' are better for bottom-of-funnel users closer to a buying decision.",
  },
  {
    type: "true-false",
    question:
      "In direct-response copywriting, features are more persuasive than benefits.",
    correctAnswer: false,
    explanation:
      "Benefits are more persuasive than features in direct-response copy. Users care about outcomes (close 30% more deals) rather than specifications (cloud-based CRM). Always translate features into user outcomes.",
  },
  {
    type: "true-false",
    question:
      "Social proof elements like customer counts and ratings help amplify desire in ad copy.",
    correctAnswer: true,
    explanation:
      "Social proof (customer counts, ratings, testimonials) amplifies desire by showing that others have already benefited. 'Join 50,000+ marketers' or 'Rated 4.9/5 by 2,000+ customers' build trust and urgency.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are proven headline formulas for ads? (Select all that apply)",
    options: [
      "How to [Achieve Desired Outcome]",
      "[Number] Ways to [Solve Problem]",
      "[Specific Result] in [Timeframe]",
      "Stop [Pain Point]. Start [Benefit].",
      "Our Company Is Great",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "All four formulas are proven performers in ad copy. 'Our Company Is Great' is not a formula — it is self-focused rather than audience-focused and would perform poorly.",
  },
  {
    type: "multi-select",
    question:
      "Which elements of the AIDA framework are present in effective ad copy? (Select all that apply)",
    options: [
      "Attention-grabbing headline",
      "Interest built through problem connection",
      "Desire created through benefits and social proof",
      "Action driven by a clear CTA",
      "All elements are optional",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Effective ad copy incorporates all four AIDA elements: attention through headlines, interest through problem connection, desire through benefits/proof, and action through clear CTAs. None are optional for maximum effectiveness.",
  },
  {
    type: "ordering",
    question: "Arrange the AIDA framework stages in the correct order.",
    items: ["Desire", "Action", "Attention", "Interest"],
    correctOrder: [2, 3, 0, 1],
    explanation:
      "AIDA flows from Attention (stop the scroll), to Interest (connect to the problem), to Desire (paint the outcome), to Action (clear CTA). Each stage builds on the previous one.",
  },
  {
    type: "ordering",
    question:
      "Rank these CTA approaches from most effective to least effective for bottom-of-funnel ads.",
    items: [
      "Specific and value-driven: 'Get Your Free Quote'",
      "Action-oriented: 'Start Free Trial'",
      "Generic: 'Learn More'",
      "Passive: 'Click Here'",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Specific, value-driven CTAs perform best for BOF, followed by action-oriented language. Generic and passive CTAs create ambiguity about what happens next, reducing click-through rates.",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What is the character limit for a Google Search RSA headline?",
    options: ["25 characters", "30 characters", "60 characters", "90 characters"],
    correctIndex: 1,
    explanation:
      "Google Search RSA headlines are limited to 30 characters each. This tight constraint requires concise, impactful writing where every character counts.",
  },
  {
    type: "multiple-choice",
    question:
      "How many characters of Meta primary text are visible before truncation?",
    options: ["50 characters", "90 characters", "125 characters", "280 characters"],
    correctIndex: 2,
    explanation:
      "Only 125 characters of Meta primary text are visible before the 'See More' truncation (up to 2,200 total). Your hook and core message must fit within these visible characters.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the Pain-Agitate-Solution (PAS) copy angle?",
    options: [
      "Name the problem, amplify consequences of inaction, present your solution",
      "Present price, add discount, show savings",
      "Post content, attract followers, sell products",
      "Plan keywords, adjust bids, set budgets",
    ],
    correctIndex: 0,
    explanation:
      "Pain-Agitate-Solution names the audience's problem, amplifies the consequences of not solving it, then presents your offering as the solution. It is one of the most effective direct-response frameworks.",
  },
  {
    type: "multiple-choice",
    question: "What is a messaging matrix in ad copywriting?",
    options: [
      "A grid of random ad copy variations",
      "A document mapping copy angles to audience segments and funnel stages",
      "A spreadsheet of competitor ad copy",
      "A list of all available character limits by platform",
    ],
    correctIndex: 1,
    explanation:
      "A messaging matrix maps copy angles (pain-agitate-solution, social proof, urgency, etc.) to audience segments and funnel stages, ensuring strategic coverage rather than random creative testing.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the purpose of a testing roadmap in ad copywriting?",
    options: [
      "To document all past ad performance",
      "To plan which angles to test first, how many variations, and how long each test runs",
      "To track competitor ad copy changes",
      "To automate ad copy generation",
    ],
    correctIndex: 1,
    explanation:
      "A testing roadmap plans which angles to test first, how many variations to create, and test duration. This structured approach prevents random testing and builds systematic knowledge about what resonates.",
  },
  {
    type: "multiple-choice",
    question:
      "Which copy angle leads with customer counts, ratings, or testimonials?",
    options: [
      "Pain-Agitate-Solution",
      "Social Proof",
      "Urgency/Scarcity",
      "Competitive Differentiation",
    ],
    correctIndex: 1,
    explanation:
      "The Social Proof angle leads with customer counts, ratings, testimonials, or recognizable client logos to build credibility and trust. It works especially well for established brands with impressive numbers.",
  },
  {
    type: "true-false",
    question:
      "LinkedIn Sponsored Content introductory text should aim to stay under 70 characters for the headline.",
    correctAnswer: true,
    explanation:
      "LinkedIn Sponsored Content headlines should aim for under 70 characters to avoid truncation. The introductory text has a 150-character visible limit before the 'see more' cutoff.",
  },
  {
    type: "true-false",
    question:
      "Ads that use more of the available character space tend to outperform shorter ads.",
    correctAnswer: true,
    explanation:
      "Ads using more of the available character space tend to outperform shorter ones because they provide more information, take up more visual real estate, and have more opportunities to include relevant keywords and benefits.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are common copy angles for ad messaging? (Select all that apply)",
    options: [
      "Pain-Agitate-Solution",
      "Social Proof",
      "Urgency/Scarcity",
      "Feature/Benefit",
      "Competitive Differentiation",
    ],
    correctIndices: [0, 1, 2, 3, 4],
    explanation:
      "All five are proven copy angles: PAS addresses pain points, Social Proof builds trust, Urgency creates FOMO, Feature/Benefit highlights capabilities, and Competitive Differentiation positions against alternatives.",
  },
  {
    type: "multi-select",
    question:
      "Which platforms have a 30-character headline limit? (Select all that apply)",
    options: [
      "Google Search RSA",
      "Microsoft Ads",
      "Meta (Facebook/Instagram)",
      "LinkedIn Sponsored Content",
    ],
    correctIndices: [0, 1],
    explanation:
      "Both Google Search RSA and Microsoft Ads have 30-character headline limits (Microsoft follows a similar structure to Google). Meta and LinkedIn have different, generally longer limits for their headline fields.",
  },
  {
    type: "ordering",
    question:
      "Arrange the Pain-Agitate-Solution framework in the correct order.",
    items: [
      "Present your solution",
      "Name the problem (pain)",
      "Amplify consequences of inaction (agitate)",
    ],
    correctOrder: [1, 2, 0],
    explanation:
      "PAS flows from naming the pain point, to agitating it by highlighting consequences of not solving it, to presenting your offering as the solution. This creates an emotional arc that drives action.",
  },
  {
    type: "ordering",
    question:
      "Rank these testing priorities from what should be tested first to last.",
    items: [
      "Core value proposition / headline angle",
      "CTA language and description copy",
      "Emotional vs. rational appeal",
      "Long vs. short copy format",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Test the biggest lever first (core value proposition), then secondary elements (CTA, description), then appeal type, and finally format variations. This ensures the most impactful variables are optimized first.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "Why does '$247/month' outperform 'money' in ad copy about savings?",
    options: [
      "Dollar signs attract more attention",
      "Specificity adds credibility and makes claims tangible",
      "Numbers are harder to read, causing users to slow down",
      "Google Ads prefers ads with exact numbers",
    ],
    correctIndex: 1,
    explanation:
      "Specificity sells. 'Save $247/month on marketing tools' is more credible and tangible than 'Save money on marketing.' Numbers, percentages, and timeframes add believability to your claims.",
  },
  {
    type: "multiple-choice",
    question:
      "Why should ad copy use 'you' and 'your' instead of 'we' and 'our'?",
    options: [
      "Platform policies require second-person language",
      "The ad should feel like a conversation with the reader, not a broadcast",
      "'You' is a shorter word and saves character space",
      "First-person language is banned in advertising",
    ],
    correctIndex: 1,
    explanation:
      "Writing to one person using 'you' and 'your' makes the ad feel like a direct conversation rather than a corporate broadcast. This personal approach increases engagement and click-through rates.",
  },
  {
    type: "multiple-choice",
    question:
      "How many CTAs should an individual ad contain?",
    options: [
      "As many as possible for maximum options",
      "One clear CTA per ad",
      "At least three different CTAs",
      "No CTA is needed if the copy is strong",
    ],
    correctIndex: 1,
    explanation:
      "One CTA per ad is the rule. Asking the reader to 'learn more, sign up, and follow us' dilutes focus. Choose one action and make it impossible to miss.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the first step in setting up a proper A/B test?",
    options: [
      "Create 10 different ad variations",
      "Form a clear hypothesis about what you expect to happen and why",
      "Immediately launch with the maximum budget",
      "Copy a competitor's best ad",
    ],
    correctIndex: 1,
    explanation:
      "A proper A/B test starts with a clear hypothesis (e.g., 'Social proof headlines will achieve higher CTR than discount headlines for our TOF audience'). This guides the test design and evaluation criteria.",
  },
  {
    type: "multiple-choice",
    question:
      "Why should you change only one variable at a time in an A/B test?",
    options: [
      "To save time creating variations",
      "So you can attribute the result to that specific factor",
      "Ad platforms only allow one change per test",
      "Multiple changes always cancel each other out",
    ],
    correctIndex: 1,
    explanation:
      "Isolating a single variable (headline, image, CTA, primary text, or audience) ensures you can attribute the performance difference to that specific factor. Changing multiple things makes it impossible to know what caused the result.",
  },
  {
    type: "multiple-choice",
    question:
      "What confidence level should you aim for before declaring an A/B test winner?",
    options: ["50%", "75%", "90%", "95%"],
    correctIndex: 3,
    explanation:
      "Aim for 95% statistical confidence before declaring a winner. This means there is only a 5% chance the result is due to random chance. Lower confidence levels lead to unreliable decisions.",
  },
  {
    type: "true-false",
    question:
      "In ad copy, front-loading value means putting the most important information first because users scan rather than read.",
    correctAnswer: true,
    explanation:
      "Users scan ads in fractions of a second. Front-loading value — putting the most compelling information in the headline and opening line — ensures your key message is seen before users scroll past.",
  },
  {
    type: "true-false",
    question:
      "You need at least 10 clicks per variation to reliably determine an A/B test winner.",
    correctAnswer: false,
    explanation:
      "10 clicks is far too few for reliable results. You generally need at least 100 conversions per variation (or 1,000+ clicks for CTR tests) before drawing statistically significant conclusions.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are key principles for writing paid ad copy? (Select all that apply)",
    options: [
      "Specificity sells",
      "Write to one person using 'you'",
      "Front-load value",
      "Match intent to funnel stage",
      "Use one CTA per ad",
    ],
    correctIndices: [0, 1, 2, 3, 4],
    explanation:
      "All five are core principles: specificity adds credibility, second-person language creates conversation, front-loading catches scanners, intent matching improves relevance, and single CTAs focus action.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are steps in a proper A/B testing process? (Select all that apply)",
    options: [
      "Form a hypothesis",
      "Isolate one variable",
      "Ensure statistical significance",
      "Document and iterate",
      "Change 5+ variables simultaneously",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Proper A/B testing involves hypothesizing, isolating one variable, reaching statistical significance, and documenting results. Changing 5+ variables at once prevents identifying what caused any performance differences.",
  },
  {
    type: "ordering",
    question: "Arrange the A/B testing steps in the correct order.",
    items: [
      "Document and iterate on results",
      "Ensure statistical significance (95% confidence)",
      "Isolate one variable to test",
      "Form a clear hypothesis",
    ],
    correctOrder: [3, 2, 1, 0],
    explanation:
      "The scientific testing process: hypothesis first, then isolate the variable, wait for statistical significance, and document results. Winners become the new control for the next test.",
  },
  {
    type: "ordering",
    question:
      "Rank these ad copy elements by how quickly they must capture attention (fastest needed first).",
    items: [
      "Social media ad opening frame/hook",
      "Search ad headline",
      "Search ad description",
      "Social media ad body text (below the fold)",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Social media hooks need to stop the scroll in under 3 seconds, search headlines catch scanning eyes next, search descriptions add detail for interested users, and social body text is only read by engaged viewers.",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "Why is conversion rate a more important metric than CTR alone when evaluating ad copy?",
    options: [
      "CTR does not exist as a metric",
      "A high-CTR ad sending unqualified clicks is worse than a lower-CTR ad attracting buyers",
      "Conversion rate is always higher than CTR",
      "Platforms only charge for conversions, not clicks",
    ],
    correctIndex: 1,
    explanation:
      "A high-CTR ad that attracts unqualified clicks wastes budget. Always measure downstream conversion rates to ensure your ad copy is attracting the right people, not just the most people.",
  },
  {
    type: "multiple-choice",
    question:
      "Which Google Ads metric components directly reflect ad copy quality?",
    options: [
      "Maximum bid and daily budget",
      "Ad relevance and expected CTR in Quality Score",
      "Impression share and search impression share",
      "Device and location bid adjustments",
    ],
    correctIndex: 1,
    explanation:
      "The ad relevance and expected CTR components of Quality Score directly reflect your copy quality. Better copy improves these scores, which lowers CPC and improves ad position.",
  },
  {
    type: "multiple-choice",
    question:
      "In the testing roadmap, what should be tested during Month 1?",
    options: [
      "Long vs. short copy format",
      "Emoji vs. no emoji usage",
      "The core value proposition or primary headline angle",
      "Font style preferences",
    ],
    correctIndex: 2,
    explanation:
      "Month 1 should test the biggest lever first — the core value proposition or primary headline angle. This is the most impactful variable and establishes the foundation for all subsequent tests.",
  },
  {
    type: "multiple-choice",
    question:
      "How often should winning ad creative be refreshed to prevent fatigue?",
    options: [
      "Every day",
      "Every 1-2 weeks",
      "Every 4-6 weeks",
      "Every 6-12 months",
    ],
    correctIndex: 2,
    explanation:
      "Refresh winning creative every 4-6 weeks to prevent fatigue. Meanwhile, maintain a creative swipe file and have new concepts ready to deploy when performance begins to decline.",
  },
  {
    type: "multiple-choice",
    question:
      "What is a common A/B testing pitfall related to timing?",
    options: [
      "Running tests for too long",
      "Ending tests too early before reaching statistical significance",
      "Testing during business hours only",
      "Running tests only on weekends",
    ],
    correctIndex: 1,
    explanation:
      "Ending tests prematurely is one of the most common pitfalls. Without statistical significance, apparent 'winners' may simply be random variation. Patience is essential for reliable test results.",
  },
  {
    type: "multiple-choice",
    question:
      "What should you do with learnings from ad copy tests?",
    options: [
      "Keep them private to maintain competitive advantage",
      "Record them in a testing log and share across campaigns and platforms",
      "Delete them after each test ends",
      "Only apply them to the specific campaign that was tested",
    ],
    correctIndex: 1,
    explanation:
      "Maintain testing logs and share learnings across campaigns and platforms. A headline formula that wins on Google Search may also work on Meta or LinkedIn, compounding your knowledge advantage.",
  },
  {
    type: "true-false",
    question:
      "Meta's quality ranking, engagement ranking, and conversion ranking are indicators of ad copy effectiveness.",
    correctAnswer: true,
    explanation:
      "Meta's Ad Relevance Score includes quality ranking, engagement ranking, and conversion ranking — all of which reflect how well your creative and copy resonate with your target audience.",
  },
  {
    type: "true-false",
    question:
      "Seasonality and promotions should be accounted for when analyzing A/B test results.",
    correctAnswer: true,
    explanation:
      "External factors like seasonality, holidays, and promotions can skew test results. Always account for these variables when analyzing data to avoid attributing seasonal effects to copy changes.",
  },
  {
    type: "multi-select",
    question:
      "Which metrics should be used to evaluate ad copy performance? (Select all that apply)",
    options: [
      "CTR",
      "Conversion Rate",
      "Quality Score (Google)",
      "CPA / ROAS",
      "Number of ad variations created",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "CTR, conversion rate, Quality Score, and CPA/ROAS all measure copy effectiveness. The number of variations created is an activity metric, not a performance metric.",
  },
  {
    type: "multi-select",
    question:
      "What are common A/B testing pitfalls to avoid? (Select all that apply)",
    options: [
      "Ending tests before statistical significance",
      "Testing too many variables at once",
      "Making decisions on vanity metrics without checking conversions",
      "Not accounting for seasonality",
      "Running tests for 7+ days before deciding",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Common pitfalls include premature test endings, testing multiple variables, using vanity metrics alone, and ignoring seasonality. Running tests for 7+ days is actually best practice, not a pitfall.",
  },
  {
    type: "ordering",
    question:
      "Arrange the testing roadmap months in the correct chronological order.",
    items: [
      "Test emotional vs. rational appeals within winning framework",
      "Establish baseline; test core value proposition",
      "Test secondary elements: CTA, description, social proof placement",
      "Ongoing: refresh creative, test new angles quarterly",
    ],
    correctOrder: [1, 2, 0, 3],
    explanation:
      "Month 1 establishes baseline and tests core angles, Month 2 tests secondary elements, Month 3 explores appeal types, and ongoing work maintains freshness and explores new concepts quarterly.",
  },
  {
    type: "ordering",
    question:
      "Rank these copy performance indicators from most directly tied to copy quality to least.",
    items: [
      "Ad relevance score / Quality Score",
      "CTR",
      "CPA / ROAS",
      "Total impressions",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Ad relevance/Quality Score directly measures copy quality, CTR reflects copy appeal, CPA/ROAS shows full-funnel effectiveness (influenced by landing page too), and impressions are driven by budget and bids, not copy quality.",
  },
];
