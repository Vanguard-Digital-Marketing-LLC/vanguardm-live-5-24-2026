import type { QuizQuestion } from "@/lib/academy-data";

export const googleAdsFundamentalsQuiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question: "What was Google Ads formerly known as before its 2018 rebrand?",
    options: [
      "Google AdWords",
      "Google Ad Manager",
      "Google Marketing Platform",
      "Google Ad Exchange",
    ],
    correctIndex: 0,
    explanation:
      "Google Ads was originally called Google AdWords when it launched in 2000. It was rebranded to Google Ads in 2018 to reflect its expansion beyond just search advertising.",
  },
  {
    type: "multiple-choice",
    question: "What is the primary billing model for Google Search Ads?",
    options: [
      "Cost per impression (CPM)",
      "Cost per click (CPC)",
      "Flat monthly fee",
      "Cost per view (CPV)",
    ],
    correctIndex: 1,
    explanation:
      "Google Search Ads primarily use a cost-per-click (CPC) model, meaning you only pay when someone clicks your ad. This makes it a performance-driven channel.",
  },
  {
    type: "multiple-choice",
    question:
      "Which Google Ads campaign type uses machine learning to serve ads across all Google channels simultaneously?",
    options: [
      "Search campaigns",
      "Display campaigns",
      "Performance Max campaigns",
      "Discovery campaigns",
    ],
    correctIndex: 2,
    explanation:
      "Performance Max campaigns use Google's machine learning to serve ads across Search, Display, YouTube, Gmail, Discover, and Maps simultaneously, optimizing for your conversion goals.",
  },
  {
    type: "multiple-choice",
    question:
      "Approximately what percentage of the global search engine market does Google command?",
    options: ["50%", "70%", "80%", "Over 90%"],
    correctIndex: 3,
    explanation:
      "Google commands over 90% of the global search engine market share, making Google Ads the most important PPC platform for reaching users with active search intent.",
  },
  {
    type: "multiple-choice",
    question:
      "Which campaign type showcases product images, prices, and merchant names directly in search results?",
    options: [
      "Search campaigns",
      "Display campaigns",
      "Shopping campaigns",
      "App campaigns",
    ],
    correctIndex: 2,
    explanation:
      "Shopping campaigns display product images, prices, and merchant information directly in search results and the Shopping tab, making them ideal for e-commerce advertisers.",
  },
  {
    type: "multiple-choice",
    question: "Where do Google Display Network (GDN) ads appear?",
    options: [
      "Only on Google Search results pages",
      "Only on YouTube",
      "On websites, apps, and videos within Google's partner network",
      "Only in Gmail inboxes",
    ],
    correctIndex: 2,
    explanation:
      "The Google Display Network reaches over 90% of internet users worldwide, showing image and rich-media banner ads on millions of partner websites, apps, and videos.",
  },
  {
    type: "true-false",
    question:
      "Google Ads allows you to appear at the top of search results almost immediately, unlike organic SEO which takes time.",
    correctAnswer: true,
    explanation:
      "This is one of the key advantages of Google Ads — you can appear at the top of search results as soon as your campaigns are approved and running, while organic SEO rankings take weeks or months to build.",
  },
  {
    type: "true-false",
    question:
      "Video ads on Google Ads can only run on YouTube, not on any other platform.",
    correctAnswer: false,
    explanation:
      "While YouTube is the primary platform for video ads, Google video campaigns can also serve on Google Display Network partner sites and apps that support video content.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are distinct networks or campaign types within Google Ads? (Select all that apply)",
    options: [
      "Search ads",
      "Display ads",
      "Shopping ads",
      "Social ads",
      "Video ads",
      "Performance Max",
    ],
    correctIndices: [0, 1, 2, 4, 5],
    explanation:
      "Google Ads includes Search, Display, Shopping, Video, and Performance Max campaign types. Social ads are not a Google Ads network — social advertising runs on platforms like Meta and LinkedIn.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are benefits of using Google Ads over organic SEO? (Select all that apply)",
    options: [
      "Immediate visibility at the top of search results",
      "No cost involved",
      "Precise measurement of every dollar spent",
      "You only pay when someone interacts with your ad",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Google Ads provides immediate visibility, precise measurement, and a pay-per-interaction model. However, it is not free — you pay for every click, view, or call generated by your ads.",
  },
  {
    type: "ordering",
    question:
      "Arrange the stages of a typical Google Ads user journey from first to last.",
    items: [
      "User enters a search query",
      "Google runs an ad auction",
      "Ad appears in search results",
      "User clicks the ad",
      "User lands on the advertiser's website",
      "Conversion event occurs",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation:
      "The journey starts with the user's search, triggers an auction, results in an ad impression, leads to a click, takes the user to the landing page, and ideally results in a conversion.",
  },
  {
    type: "ordering",
    question:
      "Rank these Google Ads campaign types from most intent-driven to most awareness-driven.",
    items: [
      "Search campaigns",
      "Shopping campaigns",
      "Performance Max campaigns",
      "Display campaigns",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Search captures the highest intent (active queries), Shopping shows product-specific intent, Performance Max spans multiple channels, and Display primarily targets awareness through visual ads on partner sites.",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is Ad Rank in Google Ads?",
    options: [
      "The total budget allocated to a campaign",
      "A score that determines your ad position and whether your ad shows",
      "The number of clicks your ad has received",
      "Your maximum bid multiplied by your daily budget",
    ],
    correctIndex: 1,
    explanation:
      "Ad Rank is calculated using your bid, Quality Score, expected impact of ad extensions, and auction-time context signals. It determines whether your ad is shown and in what position.",
  },
  {
    type: "multiple-choice",
    question: "Quality Score in Google Ads is rated on what scale?",
    options: ["1-5", "1-10", "1-100", "A through F"],
    correctIndex: 1,
    explanation:
      "Quality Score is rated from 1 to 10, with 10 being the best. It reflects the relevance and quality of your keywords, ad copy, and landing page experience.",
  },
  {
    type: "multiple-choice",
    question:
      "Which keyword match type reaches the widest audience by using AI to interpret user intent?",
    options: [
      "Exact match",
      "Phrase match",
      "Broad match",
      "Negative match",
    ],
    correctIndex: 2,
    explanation:
      "Broad match reaches the widest audience by using Google's AI to interpret the intent behind a user's query and match it to relevant keywords, even if the exact words differ.",
  },
  {
    type: "multiple-choice",
    question:
      "Which component is NOT one of the three pillars of Quality Score?",
    options: [
      "Expected click-through rate",
      "Ad relevance",
      "Landing page experience",
      "Maximum bid amount",
    ],
    correctIndex: 3,
    explanation:
      "Quality Score is based on three components: expected CTR, ad relevance, and landing page experience. Maximum bid is a separate factor in the Ad Rank calculation, not part of Quality Score.",
  },
  {
    type: "multiple-choice",
    question:
      "Google Ads uses a modified second-price auction. What does this mean for advertisers?",
    options: [
      "You always pay exactly your maximum bid",
      "You pay the minimum amount needed to beat the Ad Rank of the advertiser below you",
      "You pay double the amount of your maximum bid",
      "The auction winner pays the second-highest bidder's exact bid",
    ],
    correctIndex: 1,
    explanation:
      "In Google's modified second-price auction, you only pay the minimum amount needed to beat the Ad Rank of the advertiser directly below you. This means your actual CPC is often lower than your maximum bid.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the purpose of negative keywords in a Google Ads campaign?",
    options: [
      "To increase the reach of your ads",
      "To prevent your ads from showing on irrelevant searches",
      "To lower your Quality Score",
      "To target competitor brand names",
    ],
    correctIndex: 1,
    explanation:
      "Negative keywords prevent your ads from appearing when users search for terms that are irrelevant to your business, reducing wasted spend and improving campaign efficiency.",
  },
  {
    type: "true-false",
    question:
      "Two advertisers bidding the same amount will always pay the same CPC in Google Ads.",
    correctAnswer: false,
    explanation:
      "Even with identical bids, advertisers can pay different CPCs because the actual CPC is influenced by Quality Score. A higher Quality Score results in a lower actual CPC for the same ad position.",
  },
  {
    type: "true-false",
    question:
      "Google recommends pairing broad match keywords with Smart Bidding strategies for optimal performance.",
    correctAnswer: true,
    explanation:
      "Google recommends combining broad match with automated bidding strategies (Smart Bidding) to let machine learning find converting queries that exact or phrase match might miss.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are factors used to calculate Ad Rank? (Select all that apply)",
    options: [
      "Maximum bid",
      "Quality Score",
      "Expected impact of ad extensions",
      "Social media followers",
      "Auction-time context signals",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Ad Rank is calculated using your maximum bid, Quality Score, expected impact of ad extensions, and auction-time context signals like device, location, and time of day. Social media followers are not a factor.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are valid keyword match types in Google Ads? (Select all that apply)",
    options: [
      "Broad match",
      "Phrase match",
      "Exact match",
      "Approximate match",
      "Negative match",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Google Ads supports broad match, phrase match, exact match, and negative match. Approximate match is not a real match type in Google Ads.",
  },
  {
    type: "ordering",
    question:
      "Order keyword match types from broadest reach to most restrictive.",
    items: ["Broad match", "Phrase match", "Exact match"],
    correctOrder: [0, 1, 2],
    explanation:
      "Broad match casts the widest net by matching related queries, phrase match limits to queries containing the meaning of your keyword, and exact match is the most restrictive, targeting queries with the same meaning.",
  },
  {
    type: "ordering",
    question:
      "Rank these Quality Score components in order of their typical impact on CPC (most impactful first).",
    items: [
      "Expected click-through rate",
      "Ad relevance",
      "Landing page experience",
    ],
    correctOrder: [0, 2, 1],
    explanation:
      "Expected CTR has the largest impact on Quality Score and CPC, followed by landing page experience. Ad relevance is important but generally has a slightly smaller direct impact on CPC compared to the other two.",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "According to the 70/20/10 budget allocation rule, what percentage should go to proven campaigns with strong ROAS?",
    options: ["10%", "20%", "50%", "70%"],
    correctIndex: 3,
    explanation:
      "The 70/20/10 rule suggests allocating 70% of budget to proven campaigns with strong ROAS, 20% to promising campaigns being scaled, and 10% to experimental campaigns testing new approaches.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the primary benefit of creating tightly themed ad groups with closely related keywords?",
    options: [
      "It reduces the number of campaigns you need",
      "It makes it easier to write relevant ad copy and maintain high Quality Scores",
      "It allows you to use only broad match keywords",
      "It eliminates the need for negative keywords",
    ],
    correctIndex: 1,
    explanation:
      "Tightly themed ad groups (5-20 closely related keywords) make it easier to write ad copy that is highly relevant to every keyword in the group, which improves Quality Score and lowers CPC.",
  },
  {
    type: "multiple-choice",
    question:
      "Which bidding strategy optimizes for revenue rather than conversion volume?",
    options: [
      "Maximize Clicks",
      "Maximize Conversions",
      "Target CPA",
      "Target ROAS",
    ],
    correctIndex: 3,
    explanation:
      "Target ROAS (Return on Ad Spend) optimizes bids to achieve a target revenue-to-spend ratio, making it ideal for e-commerce with variable order values where revenue per conversion differs significantly.",
  },
  {
    type: "multiple-choice",
    question:
      "How many conversions in 30 days does Google recommend for Target CPA bidding to work optimally?",
    options: [
      "At least 10",
      "At least 30",
      "At least 50",
      "At least 100",
    ],
    correctIndex: 1,
    explanation:
      "Google recommends at least 30 conversions in the past 30 days for Target CPA bidding to have enough data for optimal learning and bid optimization.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of a brand campaign in Google Ads?",
    options: [
      "To target competitor brand names",
      "To protect your branded terms from competitors bidding on them",
      "To run display ads with brand imagery",
      "To increase social media brand awareness",
    ],
    correctIndex: 1,
    explanation:
      "Brand campaigns bid on your own brand name and variations to protect against competitors who may bid on your branded terms. They typically have the highest CTR and lowest CPC in your account.",
  },
  {
    type: "multiple-choice",
    question:
      "Which bidding strategy is best for an awareness or data-gathering phase?",
    options: [
      "Target CPA",
      "Target ROAS",
      "Maximize Clicks",
      "Maximize Conversions",
    ],
    correctIndex: 2,
    explanation:
      "Maximize Clicks drives the most traffic within your budget, making it useful for awareness campaigns or when you need to gather initial data before switching to a conversion-based strategy.",
  },
  {
    type: "true-false",
    question:
      "Each Google Ads campaign should have its own budget to prevent high-volume keywords from starving other campaigns.",
    correctAnswer: true,
    explanation:
      "Setting individual campaign budgets ensures that high-volume or high-cost keywords in one campaign don't consume the budget meant for other campaigns. This gives you control over spend allocation across your account.",
  },
  {
    type: "true-false",
    question:
      "Manual CPC bidding requires less ongoing optimization than automated bidding strategies.",
    correctAnswer: false,
    explanation:
      "Manual CPC bidding requires constant monitoring and adjustment since you are setting bids yourself. Automated strategies use machine learning to adjust bids in real time based on hundreds of signals, reducing the manual optimization burden.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are automated (Smart) bidding strategies in Google Ads? (Select all that apply)",
    options: [
      "Maximize Conversions",
      "Manual CPC",
      "Target CPA",
      "Target ROAS",
      "Enhanced CPC",
      "Maximize Clicks",
    ],
    correctIndices: [0, 2, 3, 4, 5],
    explanation:
      "Maximize Conversions, Target CPA, Target ROAS, Enhanced CPC, and Maximize Clicks are all automated bidding strategies. Manual CPC is the only fully manual option where you set every bid yourself.",
  },
  {
    type: "multi-select",
    question:
      "Which campaign segments should be part of a well-organized Google Ads account? (Select all that apply)",
    options: [
      "Brand campaigns",
      "Competitor campaigns",
      "Non-brand campaigns segmented by product or service",
      "Random keyword campaigns",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "A well-organized account includes brand campaigns (protecting branded terms), competitor campaigns (capturing comparison shoppers), and non-brand campaigns segmented by product/service. Random keyword groupings hurt Quality Score and performance.",
  },
  {
    type: "ordering",
    question:
      "Arrange the 70/20/10 budget allocation from highest to lowest percentage.",
    items: [
      "Proven campaigns with strong ROAS",
      "Promising campaigns being scaled",
      "Experimental campaigns testing new approaches",
    ],
    correctOrder: [0, 1, 2],
    explanation:
      "The 70/20/10 rule allocates the majority (70%) to proven winners, 20% to campaigns showing promise, and 10% to experimental tests of new keywords, audiences, or formats.",
  },
  {
    type: "ordering",
    question:
      "Rank these bidding strategies from most control to most automation.",
    items: [
      "Manual CPC",
      "Enhanced CPC",
      "Maximize Conversions",
      "Target ROAS",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Manual CPC gives full control, Enhanced CPC adds partial automation by adjusting bids, Maximize Conversions fully automates for volume, and Target ROAS adds the most complex automation by optimizing for revenue targets.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "How many headlines can you provide in a Responsive Search Ad (RSA)?",
    options: ["Up to 5", "Up to 10", "Up to 15", "Up to 20"],
    correctIndex: 2,
    explanation:
      "Responsive Search Ads allow up to 15 headlines (30 characters each) and 4 descriptions (90 characters each). Google's AI tests different combinations to find the best performers.",
  },
  {
    type: "multiple-choice",
    question: "What is the character limit for a single RSA headline?",
    options: [
      "25 characters",
      "30 characters",
      "60 characters",
      "90 characters",
    ],
    correctIndex: 1,
    explanation:
      "Each RSA headline has a 30-character limit. Descriptions have a 90-character limit. Working within these constraints requires concise, impactful copywriting.",
  },
  {
    type: "multiple-choice",
    question:
      "By what average percentage do ad extensions (assets) increase click-through rates?",
    options: ["1-5%", "5-10%", "10-15%", "20-25%"],
    correctIndex: 2,
    explanation:
      "Ad extensions (now called assets) increase click-through rates by 10-15% on average by expanding your ad with extra information and giving users more reasons to click.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of pinning headlines in an RSA?",
    options: [
      "To make headlines appear in bold",
      "To guarantee specific headlines always show in a particular position",
      "To increase the character limit for that headline",
      "To prevent Google from testing that headline",
    ],
    correctIndex: 1,
    explanation:
      "Pinning a headline to position 1 or 2 guarantees it always appears in that spot. This is useful for ensuring your brand name or primary CTA is always visible, though it limits Google's testing flexibility.",
  },
  {
    type: "multiple-choice",
    question:
      "Which tool is recommended for clean implementation of the Google Ads conversion tracking tag?",
    options: [
      "WordPress plugins",
      "Google Tag Manager",
      "Manual code insertion",
      "Google Search Console",
    ],
    correctIndex: 1,
    explanation:
      "Google Tag Manager provides a clean, organized way to implement tracking tags without editing website code directly. It allows easy management of multiple tags and simplifies troubleshooting.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the typical recommended click-through attribution window for Google Ads conversions?",
    options: ["1 day", "7 days", "30 days", "90 days"],
    correctIndex: 2,
    explanation:
      "A 30-day click-through attribution window is the typical recommendation, meaning conversions that occur within 30 days of a click are attributed to the ad. View-through windows are typically shorter at 1 day.",
  },
  {
    type: "true-false",
    question:
      "Callout extensions link to specific pages on your website when clicked.",
    correctAnswer: false,
    explanation:
      "Callout extensions are short text snippets (25 characters) that highlight benefits but do not link anywhere. They add information to your ad but are not clickable. Sitelinks are the extension type that links to specific pages.",
  },
  {
    type: "true-false",
    question:
      "You should use all 15 headline slots and all 4 description slots in RSAs for maximum testing.",
    correctAnswer: true,
    explanation:
      "Using all available headline and description slots gives Google's AI the most combinations to test, increasing the chances of finding high-performing variations for different search queries and user contexts.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are types of ad extensions (assets) in Google Ads? (Select all that apply)",
    options: [
      "Sitelinks",
      "Callout extensions",
      "Structured snippets",
      "Pixel extensions",
      "Call extensions",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Sitelinks, callout extensions, structured snippets, and call extensions are all valid Google Ads assets. Pixel extensions do not exist — pixels are a Meta/Facebook tracking concept.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are best practices for writing RSA headlines? (Select all that apply)",
    options: [
      "Include your primary keyword in at least 3 headlines",
      "Use all 15 headline slots",
      "Keep all headlines identical for consistency",
      "Feature unique value propositions in separate headlines",
      "Pin critical headlines like brand name to position 1 or 2",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Best practices include keyword inclusion, using all slots, featuring unique propositions separately, and pinning critical headlines. Keeping all headlines identical defeats the purpose of RSAs, which test different combinations.",
  },
  {
    type: "ordering",
    question:
      "Arrange the steps for setting up Google Ads conversion tracking in the correct order.",
    items: [
      "Install Google Tag Manager on your website",
      "Create conversion actions in Google Ads",
      "Configure the Google Ads tag in Tag Manager",
      "Set attribution windows",
      "Verify conversions are firing correctly",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "First install GTM, then define what you want to track in Google Ads, configure the tags, set your attribution windows, and finally verify everything is working correctly before relying on the data.",
  },
  {
    type: "ordering",
    question:
      "Rank these ad extension types by their typical impact on CTR (highest first).",
    items: [
      "Sitelinks",
      "Callout extensions",
      "Structured snippets",
      "Location extensions",
    ],
    correctOrder: [0, 3, 1, 2],
    explanation:
      "Sitelinks typically have the highest CTR impact due to their prominent placement and clickable links. Location extensions perform well for local businesses. Callout extensions and structured snippets add helpful context but are not clickable.",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question: "What does CTR stand for in Google Ads?",
    options: [
      "Cost to Reach",
      "Click-Through Rate",
      "Conversion Tracking Report",
      "Campaign Test Result",
    ],
    correctIndex: 1,
    explanation:
      "CTR stands for Click-Through Rate — the percentage of people who click your ad after seeing it. It is calculated as clicks divided by impressions.",
  },
  {
    type: "multiple-choice",
    question:
      "What is a typical benchmark CTR range for Google Search ads?",
    options: ["0.5-1%", "1-2%", "3-5%", "10-15%"],
    correctIndex: 2,
    explanation:
      "Search ad CTR benchmarks typically range from 3-5%, though this varies by industry. A CTR below this range may indicate poor ad relevance or targeting.",
  },
  {
    type: "multiple-choice",
    question:
      "If you spend $1,000 on ads and generate $4,000 in revenue, what is your ROAS?",
    options: ["1:1", "2:1", "4:1", "5:1"],
    correctIndex: 2,
    explanation:
      "ROAS (Return on Ad Spend) is calculated as revenue divided by ad spend. $4,000 / $1,000 = 4:1, meaning you earned $4 for every $1 spent on advertising.",
  },
  {
    type: "multiple-choice",
    question:
      "If your CTR is dropping while CPC is rising, what is the most likely cause?",
    options: [
      "Your daily budget is too high",
      "Your ad extensions are performing well",
      "Your Quality Score may be declining or competition is increasing",
      "Your conversion tracking is broken",
    ],
    correctIndex: 2,
    explanation:
      "Rising CPC with declining CTR often signals declining Quality Score (which makes each click more expensive) or increased competition in the auction driving up prices.",
  },
  {
    type: "multiple-choice",
    question:
      "What Google Ads feature allows you to A/B test changes without risking your main campaign?",
    options: [
      "Ad rotation settings",
      "Campaign drafts and experiments",
      "Keyword Planner",
      "Audience Manager",
    ],
    correctIndex: 1,
    explanation:
      "Campaign drafts and experiments let you create a draft of your campaign, make changes, then run it as an experiment alongside your original campaign with split traffic to test without risk.",
  },
  {
    type: "multiple-choice",
    question:
      "How often should you review the Search Terms report and add negative keywords?",
    options: ["Daily", "Weekly", "Monthly", "Quarterly"],
    correctIndex: 1,
    explanation:
      "Weekly review of the Search Terms report is recommended. This frequency allows you to catch irrelevant queries quickly while having enough data to identify patterns without being overwhelmed.",
  },
  {
    type: "true-false",
    question:
      "A low conversion rate most often points to landing page issues rather than ad problems.",
    correctAnswer: true,
    explanation:
      "If your ads are generating clicks (good CTR) but visitors are not converting, the issue is typically on the landing page — slow load times, unclear messaging, poor user experience, or a disconnect between the ad promise and the page content.",
  },
  {
    type: "true-false",
    question:
      "Google Ads experiments should run for at least two weeks with statistically significant data before declaring a winner.",
    correctAnswer: true,
    explanation:
      "Running experiments for at least two weeks ensures you capture enough data across different days, times, and user behaviors to reach statistical significance and make reliable decisions.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are key metrics to track in Google Ads? (Select all that apply)",
    options: [
      "CTR (Click-Through Rate)",
      "CPC (Cost Per Click)",
      "Social shares",
      "CPA (Cost Per Acquisition)",
      "ROAS (Return on Ad Spend)",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "CTR, CPC, CPA, and ROAS are the core Google Ads metrics. Social shares are not a Google Ads metric — they belong to social media platforms.",
  },
  {
    type: "multi-select",
    question:
      "Which tasks should be part of a monthly Google Ads optimization routine? (Select all that apply)",
    options: [
      "Review ad copy performance",
      "Rotate new creatives",
      "Analyze Quality Score trends",
      "Change your bidding strategy every month",
      "Review account budget allocation",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Monthly optimizations include reviewing ad copy, rotating creatives, analyzing Quality Score trends, and reviewing budgets. Changing your bidding strategy every month would not allow enough time for strategies to learn and perform.",
  },
  {
    type: "ordering",
    question:
      "Arrange the Google Ads optimization cadence from most frequent to least frequent.",
    items: [
      "Check budgets and pause overspending campaigns",
      "Mine search terms and add negatives",
      "Review ad copy and rotate creatives",
      "Audit account structure and revisit strategy",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Budget checks happen daily, search term mining weekly, ad copy review monthly, and full account audits quarterly. This cadence ensures continuous optimization without over-managing campaigns.",
  },
  {
    type: "ordering",
    question:
      "Rank these metrics in order of importance for evaluating overall campaign profitability (most important first).",
    items: [
      "ROAS (Return on Ad Spend)",
      "CPA (Cost Per Acquisition)",
      "CTR (Click-Through Rate)",
      "Impressions",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "ROAS directly measures profitability, CPA measures efficiency, CTR indicates ad relevance and feeds Quality Score, and impressions simply measure reach. Profitability should always be the primary evaluation criterion.",
  },
];
