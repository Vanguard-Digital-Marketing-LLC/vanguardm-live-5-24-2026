import type { QuizQuestion } from "@/lib/academy-data";

export const facebookInstagramAdsQuiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What is the unified platform for running paid campaigns across Facebook, Instagram, Messenger, and the Audience Network?",
    options: [
      "Facebook Business Suite",
      "Meta Ads Manager",
      "Instagram Creator Studio",
      "Meta Commerce Manager",
    ],
    correctIndex: 1,
    explanation:
      "Meta Ads Manager is the unified self-serve platform for building, launching, and managing paid campaigns across all Meta properties including Facebook, Instagram, Messenger, and the Audience Network.",
  },
  {
    type: "multiple-choice",
    question:
      "How many monthly active users does Meta's family of apps have approximately?",
    options: [
      "500 million",
      "1 billion",
      "Over 3 billion",
      "Over 5 billion",
    ],
    correctIndex: 2,
    explanation:
      "Meta's family of apps (Facebook, Instagram, Messenger, WhatsApp) has over 3 billion monthly active users, making it the largest social advertising ecosystem in the world.",
  },
  {
    type: "multiple-choice",
    question:
      "What is described as the single most important lever in Meta advertising?",
    options: [
      "Bid amount",
      "Audience size",
      "Creative quality",
      "Daily budget",
    ],
    correctIndex: 2,
    explanation:
      "Because Meta advertising is primarily interruption-based (users are scrolling, not searching), creative quality is the single most important lever. Ads must earn attention through compelling visuals and copy.",
  },
  {
    type: "multiple-choice",
    question: "What is the three-tier hierarchy in Meta Ads Manager?",
    options: [
      "Account, Campaign, Ad",
      "Campaign, Ad Set, Ad",
      "Campaign Group, Campaign, Creative",
      "Objective, Targeting, Creative",
    ],
    correctIndex: 1,
    explanation:
      "Meta Ads Manager uses a three-tier structure: Campaign (where you set the objective), Ad Set (targeting, budget, schedule, placements), and Ad (creative and copy).",
  },
  {
    type: "multiple-choice",
    question:
      "How does Meta advertising primarily differ from search advertising?",
    options: [
      "Meta ads are always more expensive",
      "Meta ads are interruption-based rather than intent-based",
      "Meta ads do not use an auction system",
      "Meta ads can only run on mobile devices",
    ],
    correctIndex: 1,
    explanation:
      "Search advertising captures existing intent (users are actively looking for something), while Meta advertising is primarily interruption-based — users are scrolling feeds and your ads must earn their attention.",
  },
  {
    type: "multiple-choice",
    question:
      "Which stages of the buyer journey does Meta advertising excel at?",
    options: [
      "Only top-of-funnel awareness",
      "Only bottom-of-funnel conversions",
      "Top-of-funnel awareness, mid-funnel consideration, and retargeting",
      "Only retargeting existing customers",
    ],
    correctIndex: 2,
    explanation:
      "Meta advertising is versatile and excels across the full funnel — from top-of-funnel awareness campaigns to mid-funnel consideration and bottom-of-funnel retargeting campaigns.",
  },
  {
    type: "true-false",
    question:
      "Meta Ads Manager uses an auction system similar to Google Ads to determine which ads to show.",
    correctAnswer: true,
    explanation:
      "Meta uses an auction system that considers advertiser bids, estimated action rates, and ad quality to determine which ads show to which users. However, it optimizes for user engagement and advertiser objectives rather than keyword bids.",
  },
  {
    type: "true-false",
    question:
      "Meta advertising is only effective for e-commerce businesses, not for lead generation or brand awareness.",
    correctAnswer: false,
    explanation:
      "Meta provides campaign objectives tailored to every business type — e-commerce brands driving purchases, SaaS companies generating leads, local businesses building awareness, and more.",
  },
  {
    type: "multi-select",
    question:
      "Which platforms are part of Meta's advertising network? (Select all that apply)",
    options: [
      "Facebook",
      "Instagram",
      "LinkedIn",
      "Messenger",
      "Audience Network",
      "TikTok",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Meta's advertising network includes Facebook, Instagram, Messenger, and the Audience Network. LinkedIn and TikTok are separate platforms owned by different companies.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are characteristics of Meta advertising compared to search advertising? (Select all that apply)",
    options: [
      "Primarily interruption-based",
      "Captures active search intent",
      "Creative quality is the most important lever",
      "Users are scrolling feeds and watching Stories",
      "Relies primarily on keyword matching",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Meta advertising is interruption-based, relies heavily on creative quality, and reaches users while they scroll feeds. Active search intent and keyword matching are characteristics of search advertising like Google Ads.",
  },
  {
    type: "ordering",
    question:
      "Arrange the Meta Ads Manager hierarchy from top level to bottom level.",
    items: ["Campaign", "Ad Set", "Ad"],
    correctOrder: [0, 1, 2],
    explanation:
      "The hierarchy flows from Campaign (objective) to Ad Set (targeting, budget, schedule) to Ad (creative and copy). Each level serves a distinct strategic function.",
  },
  {
    type: "ordering",
    question:
      "Rank these business types from most to least typical for Meta advertising success.",
    items: [
      "E-commerce brand with visual products",
      "Local restaurant building awareness",
      "B2B enterprise software company",
      "Heavy industrial equipment manufacturer",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "E-commerce brands thrive on Meta due to visual products and direct purchase paths. Local businesses benefit from awareness. B2B can work but is less natural. Heavy industrial typically sees the least return from social advertising.",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question: "How many campaign objectives does Meta's ODAX framework include?",
    options: ["3", "4", "6", "8"],
    correctIndex: 2,
    explanation:
      "Meta's Outcome-Driven Ad Experiences (ODAX) framework includes six objectives: Awareness, Traffic, Engagement, Leads, App Promotion, and Sales.",
  },
  {
    type: "multiple-choice",
    question:
      "What is a Lookalike Audience on Meta based on?",
    options: [
      "Users who follow your competitors",
      "Users who share characteristics with your source audience",
      "All users in a specific age range",
      "Users who have visited similar websites",
    ],
    correctIndex: 1,
    explanation:
      "Lookalike Audiences find users who share characteristics with your source audience (such as your best customers). Meta analyzes the source and finds similar users who are likely to be interested in your business.",
  },
  {
    type: "multiple-choice",
    question:
      "What percentage should you start with when creating a Lookalike Audience for best performance?",
    options: ["1%", "5%", "10%", "20%"],
    correctIndex: 0,
    explanation:
      "Starting with a 1% Lookalike of your highest-value customers gives you the most similar audience for best performance. You can expand to 3-5% for broader reach once you have proven the concept.",
  },
  {
    type: "multiple-choice",
    question:
      "Which ad format allows up to 10 scrollable cards on Meta?",
    options: [
      "Single Image",
      "Video",
      "Carousel",
      "Collection",
    ],
    correctIndex: 2,
    explanation:
      "Carousel ads support up to 10 scrollable cards, each with its own image, headline, and link. They are great for showcasing multiple products, features, or telling a sequential story.",
  },
  {
    type: "multiple-choice",
    question:
      "Which audience type is built by uploading customer email lists or phone numbers?",
    options: [
      "Core Audiences",
      "Custom Audiences",
      "Lookalike Audiences",
      "Saved Audiences",
    ],
    correctIndex: 1,
    explanation:
      "Custom Audiences can be built from uploaded customer lists (email, phone), website visitors via the Meta Pixel, app users, or people who engaged with your content on Meta.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the highest-performing ad format on Meta platforms?",
    options: [
      "Single Image",
      "Video",
      "Text-only",
      "Slideshow",
    ],
    correctIndex: 1,
    explanation:
      "Video is consistently the highest-performing ad format on Meta. Short-form vertical video (under 15 seconds) with sound-off captions tends to deliver the best results.",
  },
  {
    type: "true-false",
    question:
      "Core Audiences on Meta target users based on demographics, interests, and behaviors.",
    correctAnswer: true,
    explanation:
      "Core Audiences allow targeting by demographics (age, gender, location, language), interests (pages liked, content engaged with), and behaviors (purchase history, device usage, travel patterns).",
  },
  {
    type: "true-false",
    question:
      "A 10% Lookalike Audience will outperform a 1% Lookalike Audience in terms of conversion rate.",
    correctAnswer: false,
    explanation:
      "A 1% Lookalike is the most closely matched to your source audience and typically converts at higher rates. Larger percentages (5%, 10%) reach more people but are less similar to your best customers.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are Meta campaign objectives under the ODAX framework? (Select all that apply)",
    options: [
      "Awareness",
      "Traffic",
      "Leads",
      "SEO",
      "Sales",
      "App Promotion",
    ],
    correctIndices: [0, 1, 2, 4, 5],
    explanation:
      "ODAX includes Awareness, Traffic, Engagement, Leads, App Promotion, and Sales. SEO is not a Meta advertising objective — it relates to organic search optimization.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following can be used to build Custom Audiences on Meta? (Select all that apply)",
    options: [
      "Customer email lists",
      "Website visitors via Meta Pixel",
      "App users",
      "Google Ads click data",
      "People who engaged with your Meta content",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Custom Audiences can be built from customer lists, Pixel data, app activity, and Meta engagement. Google Ads click data is not directly available in Meta — that belongs to Google's ecosystem.",
  },
  {
    type: "ordering",
    question:
      "Order these Meta audience types from narrowest to broadest typical reach.",
    items: [
      "Custom Audience (past purchasers)",
      "1% Lookalike Audience",
      "Core Audience (interest targeting)",
      "5% Lookalike Audience",
    ],
    correctOrder: [0, 1, 3, 2],
    explanation:
      "Past purchasers are the smallest list, 1% Lookalike is a tight expansion, 5% Lookalike is broader, and interest-based Core Audiences typically reach the widest pool depending on how targeting layers are configured.",
  },
  {
    type: "ordering",
    question:
      "Rank these ad formats by typical engagement level on Meta (highest first).",
    items: [
      "Video (short-form vertical)",
      "Carousel",
      "Single Image",
      "Text link post",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Short-form vertical video drives the highest engagement, followed by carousel (interactive scrolling), single image (simple and clear), and text link posts (least visual appeal).",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "In a full-funnel Meta strategy, what percentage of budget should go to top-of-funnel prospecting?",
    options: ["10-15%", "15-25%", "40-50%", "60-70%"],
    correctIndex: 3,
    explanation:
      "Top-of-funnel prospecting campaigns should receive 60-70% of total budget since they feed the entire funnel. Without a steady flow of new prospects, retargeting audiences will shrink over time.",
  },
  {
    type: "multiple-choice",
    question:
      "What is Advantage+ Shopping Campaigns (ASC) designed for?",
    options: [
      "B2B lead generation",
      "E-commerce, consolidating audiences into a single AI-optimized campaign",
      "Email marketing automation",
      "Influencer partnership management",
    ],
    correctIndex: 1,
    explanation:
      "Advantage+ Shopping Campaigns consolidate multiple audiences into a single campaign that Meta's algorithm optimizes holistically. They have become the go-to campaign type for e-commerce advertisers.",
  },
  {
    type: "multiple-choice",
    question:
      "How many optimization events does Meta need within 7 days for an ad set to exit the learning phase?",
    options: ["10", "25", "50", "100"],
    correctIndex: 2,
    explanation:
      "Meta requires approximately 50 optimization events within 7 days for an ad set to exit the learning phase. Setting a minimum spend of $100/day per ad set helps achieve this threshold.",
  },
  {
    type: "multiple-choice",
    question:
      "What does CBO stand for in Meta advertising?",
    options: [
      "Cost-Based Optimization",
      "Campaign Budget Optimization",
      "Creative Budget Ordering",
      "Conversion Bid Offering",
    ],
    correctIndex: 1,
    explanation:
      "Campaign Budget Optimization (CBO) lets Meta automatically distribute your campaign budget across ad sets toward the best-performing ones, optimizing spend in real time.",
  },
  {
    type: "multiple-choice",
    question:
      "What percentage of budget should bottom-of-funnel retargeting receive in a full-funnel strategy?",
    options: ["5-10%", "10-15%", "25-35%", "40-50%"],
    correctIndex: 1,
    explanation:
      "Bottom-of-funnel campaigns (cart abandoners, past purchasers) should receive 10-15% of total budget. These audiences are small but high-intent, so they don't need large budgets to be effective.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended approach before migrating campaigns to Advantage+?",
    options: [
      "Skip manual campaigns entirely and start with Advantage+",
      "Start with manual campaigns to understand what works, then migrate proven setups",
      "Only use Advantage+ for retargeting campaigns",
      "Run Advantage+ only during holiday seasons",
    ],
    correctIndex: 1,
    explanation:
      "It is recommended to start with manual campaigns to build understanding of what audiences and creatives work, then migrate proven setups to Advantage+ for automated scaling.",
  },
  {
    type: "true-false",
    question:
      "Advantage+ Audience restricts targeting to only the parameters you manually select.",
    correctAnswer: false,
    explanation:
      "Advantage+ Audience expands targeting beyond manually selected parameters, allowing Meta's algorithm to find converters it identifies even outside your selected demographics and interests.",
  },
  {
    type: "true-false",
    question:
      "Campaign Budget Optimization (CBO) distributes budget evenly across all ad sets regardless of performance.",
    correctAnswer: false,
    explanation:
      "CBO distributes budget toward the best-performing ad sets, not evenly. It dynamically shifts spend based on real-time performance data to maximize overall campaign results.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are part of a full-funnel Meta advertising strategy? (Select all that apply)",
    options: [
      "Top-of-funnel prospecting with Lookalike Audiences",
      "Mid-funnel retargeting of video viewers and page engagers",
      "Bottom-of-funnel retargeting of cart abandoners",
      "Only running conversion campaigns to cold audiences",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "A full-funnel strategy includes TOF prospecting, MOF engagement retargeting, and BOF conversion retargeting. Running only conversion campaigns to cold audiences skips the awareness and consideration stages.",
  },
  {
    type: "multi-select",
    question:
      "Which Advantage+ features does Meta offer? (Select all that apply)",
    options: [
      "Advantage+ Shopping Campaigns",
      "Advantage+ Audience",
      "Advantage+ SEO",
      "Advantage+ Placements",
      "Advantage+ Creative",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Meta offers Advantage+ Shopping Campaigns, Audience, Placements, and Creative. There is no Advantage+ SEO feature — SEO is not part of Meta's paid advertising suite.",
  },
  {
    type: "ordering",
    question:
      "Arrange funnel stages in order from widest to narrowest audience.",
    items: [
      "Top of Funnel (TOF) - Prospecting",
      "Middle of Funnel (MOF) - Engagement retargeting",
      "Bottom of Funnel (BOF) - Conversion retargeting",
    ],
    correctOrder: [0, 1, 2],
    explanation:
      "TOF reaches the broadest cold audience, MOF narrows to people who have engaged, and BOF targets the smallest group of high-intent users closest to converting.",
  },
  {
    type: "ordering",
    question:
      "Rank these budget allocation percentages from highest to lowest for a full-funnel Meta strategy.",
    items: [
      "Top of Funnel: 60-70%",
      "Middle of Funnel: 15-25%",
      "Bottom of Funnel: 10-15%",
    ],
    correctOrder: [0, 1, 2],
    explanation:
      "The majority of budget (60-70%) feeds the top of funnel to build awareness and prospecting audiences. MOF receives 15-25% for engagement retargeting, and BOF needs only 10-15% for high-intent conversions.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What is the Meta Conversions API (CAPI) designed to do?",
    options: [
      "Replace the Meta Pixel entirely",
      "Send event data directly from your server to Meta, bypassing browser restrictions",
      "Create ads automatically from your product catalog",
      "Manage Meta Business Suite permissions",
    ],
    correctIndex: 1,
    explanation:
      "The Conversions API sends event data directly from your server to Meta, bypassing browser privacy restrictions and ad blockers that can reduce Pixel accuracy. Best practice is to use both Pixel and CAPI together.",
  },
  {
    type: "multiple-choice",
    question:
      "What percentage of Meta users access the platform via mobile?",
    options: ["75%", "85%", "92%", "Over 98%"],
    correctIndex: 3,
    explanation:
      "Over 98% of Meta users access via mobile devices, which is why designing for mobile first with vertical aspect ratios, minimal text, and thumb-stopping visuals is essential.",
  },
  {
    type: "multiple-choice",
    question:
      "What aspect ratio should you use for Stories and Reels ads on Meta?",
    options: ["16:9 horizontal", "1:1 square", "9:16 vertical", "4:3 standard"],
    correctIndex: 2,
    explanation:
      "Stories and Reels use a 9:16 vertical aspect ratio that fills the entire mobile screen. Feed ads work best in 1:1 square format. Always design for the primary placement.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the maximum number of priority conversion events you can configure for Aggregated Event Measurement?",
    options: ["4", "6", "8", "10"],
    correctIndex: 2,
    explanation:
      "You can configure up to 8 priority conversion events for Aggregated Event Measurement, which is essential for tracking conversions from iOS 14.5+ users who opted out of tracking.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended minimum duration for an A/B test on Meta?",
    options: ["2 days", "5 days", "7 days", "14 days"],
    correctIndex: 2,
    explanation:
      "Let A/B tests run for at least 7 days before drawing conclusions. This captures different days of the week, time patterns, and enough data points to reach statistical reliability.",
  },
  {
    type: "multiple-choice",
    question:
      "In the first 3 seconds of a video ad, what should you accomplish?",
    options: [
      "Show your logo and brand name",
      "Display all product features",
      "Hook the viewer with a bold visual, surprising statement, or direct question",
      "Present the price and discount",
    ],
    correctIndex: 2,
    explanation:
      "The first 3 seconds must stop the thumb. Use bold visuals, surprising statements, or direct questions to capture attention before users scroll past. Test multiple hooks for every piece of creative.",
  },
  {
    type: "true-false",
    question:
      "The recommended best practice is to implement both the Meta Pixel and Conversions API together for redundant tracking.",
    correctAnswer: true,
    explanation:
      "A redundant setup using both the Pixel (browser-side) and Conversions API (server-side) provides the most complete data. Meta deduplicates events so they are not double-counted.",
  },
  {
    type: "true-false",
    question:
      "Most Meta video ads are viewed with sound on, so captions are unnecessary.",
    correctAnswer: false,
    explanation:
      "Most Meta video ads are viewed without sound. Adding captions is essential to ensure your message reaches viewers who are scrolling in public places, at work, or simply with sound off.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are best practices for Meta ad creative? (Select all that apply)",
    options: [
      "Hook viewers in the first 3 seconds",
      "Design for mobile first with vertical formats",
      "Use as much text as possible on images",
      "Add captions to all videos",
      "Test multiple hook variations",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Best practices include quick hooks, mobile-first design, video captions, and testing variations. Excessive text on images hurts performance — Meta recommends keeping text under 20% of the image area.",
  },
  {
    type: "multi-select",
    question:
      "What steps should you take for iOS 14.5+ tracking compliance? (Select all that apply)",
    options: [
      "Verify your domain in Meta Business Suite",
      "Configure priority conversion events",
      "Ignore iOS users entirely",
      "Use UTM parameters on all ad URLs",
      "Implement the Conversions API",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Domain verification, event prioritization, UTM parameters, and CAPI implementation are all essential for iOS 14.5+ compliance. Ignoring iOS users would mean losing a significant portion of your audience.",
  },
  {
    type: "ordering",
    question:
      "Arrange these A/B testing best practices in the correct execution order.",
    items: [
      "Identify the variable to test",
      "Create control and test variations",
      "Launch with identical targeting",
      "Wait 7+ days for data collection",
      "Analyze results and declare winner",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "Start by identifying what to test, create the variations, launch with identical settings except the variable being tested, collect sufficient data, then analyze and declare a winner based on statistical significance.",
  },
  {
    type: "ordering",
    question:
      "Rank tracking methods by their resilience to browser privacy restrictions (most resilient first).",
    items: [
      "Conversions API (server-side)",
      "Meta Pixel with first-party cookies",
      "Meta Pixel with third-party cookies",
      "No tracking implementation",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Server-side CAPI is most resilient because it bypasses browser restrictions entirely. First-party Pixel cookies are more durable than third-party cookies. No tracking provides no data at all.",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What metric measures the cost of reaching 1,000 people on Meta?",
    options: ["CPC", "CPA", "CPM", "CTR"],
    correctIndex: 2,
    explanation:
      "CPM (Cost Per Mille) measures the cost per 1,000 impressions. It is a key top-of-funnel metric for evaluating the efficiency of awareness campaigns on Meta.",
  },
  {
    type: "multiple-choice",
    question:
      "At what frequency level for prospecting campaigns should you begin watching for creative fatigue?",
    options: [
      "Above 1.0",
      "Above 3.0",
      "Above 10.0",
      "Above 20.0",
    ],
    correctIndex: 1,
    explanation:
      "For prospecting campaigns, frequency above 3.0 combined with declining CTR signals creative fatigue. For retargeting campaigns, the threshold is higher — above 8.0.",
  },
  {
    type: "multiple-choice",
    question:
      "How often should you refresh creatives for prospecting campaigns?",
    options: [
      "Every week",
      "Every 2-4 weeks",
      "Every 3-6 months",
      "Only when performance drops to zero",
    ],
    correctIndex: 1,
    explanation:
      "Refresh prospecting creatives every 2-4 weeks to prevent fatigue. Retargeting creatives can last longer (4-6 weeks) since the audience is smaller and sees them less frequently.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the maximum recommended daily budget increase percentage when scaling winning ad sets?",
    options: ["5%", "10%", "20%", "50%"],
    correctIndex: 2,
    explanation:
      "Scale winners by increasing budget no more than 20% per day to avoid disrupting the algorithm's optimization. Larger jumps can reset the learning phase and hurt performance.",
  },
  {
    type: "multiple-choice",
    question:
      "What does Meta's Conversion Lift study measure?",
    options: [
      "Total number of conversions from all channels",
      "The true incremental impact of ads by comparing exposed vs. holdout groups",
      "Website page load speed after ad clicks",
      "The cost of each conversion event",
    ],
    correctIndex: 1,
    explanation:
      "Conversion Lift studies measure true incremental impact by comparing a test group that sees ads versus a holdout group that does not. The difference reveals conversions directly caused by your advertising.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the 'hook rate' metric in Meta advertising?",
    options: [
      "Percentage of users who click through to your website",
      "3-second video views divided by impressions",
      "Number of users who save your ad",
      "Percentage of users who share your ad",
    ],
    correctIndex: 1,
    explanation:
      "Hook rate measures 3-second video views divided by impressions. It indicates how effectively your opening creative captures attention and stops users from scrolling past.",
  },
  {
    type: "true-false",
    question:
      "You should rely solely on Meta's reported conversion numbers for accurate performance measurement.",
    correctAnswer: false,
    explanation:
      "Never rely solely on Meta's reported numbers. Use a multi-touch attribution model combining Meta data, Google Analytics, and incrementality testing for a complete and accurate picture of performance.",
  },
  {
    type: "true-false",
    question:
      "When you find a winning creative concept on Meta, you should create variations of it rather than starting from scratch.",
    correctAnswer: true,
    explanation:
      "The best Meta advertisers treat creative as their primary scaling lever. When a concept wins, create variations (different hooks, formats, or angles based on the same concept) rather than starting completely new each time.",
  },
  {
    type: "multi-select",
    question:
      "Which metrics are most relevant for top-of-funnel Meta campaigns? (Select all that apply)",
    options: [
      "CPM",
      "Hook rate",
      "CPA",
      "Thumbstop ratio",
      "Outbound CTR",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "TOF metrics include CPM (cost efficiency), hook rate (3s views/impressions), thumbstop ratio (attention capture), and outbound CTR (click engagement). CPA is a bottom-of-funnel metric.",
  },
  {
    type: "multi-select",
    question:
      "What signals indicate creative fatigue on Meta? (Select all that apply)",
    options: [
      "Rising frequency",
      "Declining CTR",
      "Increasing conversion rate",
      "Rising CPM",
      "Declining CPA",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Creative fatigue is signaled by rising frequency, declining CTR, and rising CPM. Increasing conversion rate and declining CPA would indicate improving performance, not fatigue.",
  },
  {
    type: "ordering",
    question:
      "Arrange these optimization actions from most frequent to least frequent.",
    items: [
      "Kill ad sets stuck in the learning phase",
      "Scale winners by duplicating and increasing budget",
      "Refresh creative assets",
      "Conduct Conversion Lift studies",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Killing underperformers and scaling winners happen continuously (daily/weekly). Creative refreshes occur every 2-4 weeks. Conversion Lift studies are conducted quarterly or less frequently due to their complexity and budget requirements.",
  },
  {
    type: "ordering",
    question:
      "Rank these creative refresh strategies from quickest to most comprehensive.",
    items: [
      "Change the headline or CTA text",
      "Swap the thumbnail or opening frame",
      "Create new variations of a winning concept",
      "Develop an entirely new creative concept",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Text changes are quickest, visual swaps take slightly more effort, concept variations require creative development, and entirely new concepts demand the most time and resources.",
  },
];
