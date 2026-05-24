import type { QuizQuestion } from "@/lib/academy-data";

export const retargetingRemarketingQuiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What is the average website conversion rate across industries?",
    options: ["0.5-1%", "2-4%", "10-15%", "20-25%"],
    correctIndex: 1,
    explanation:
      "Average conversion rates hover around 2-4% across industries, meaning 96-98% of visitors leave without converting. Retargeting helps recapture these lost opportunities.",
  },
  {
    type: "multiple-choice",
    question: "What is retargeting (remarketing)?",
    options: [
      "Showing ads to random new audiences",
      "Showing ads to people who have already interacted with your brand",
      "Sending unsolicited emails to purchased lists",
      "Optimizing your website for search engines",
    ],
    correctIndex: 1,
    explanation:
      "Retargeting is the practice of showing ads to people who have already interacted with your brand — visited your website, engaged with content, or started but did not complete a desired action.",
  },
  {
    type: "multiple-choice",
    question:
      "At what rate do retargeted users typically convert compared to cold prospects?",
    options: [
      "The same rate",
      "1.5x higher",
      "2-3x higher",
      "10x higher",
    ],
    correctIndex: 2,
    explanation:
      "Retargeted users convert at 2-3x the rate of cold prospects because they already have brand awareness and familiarity, making them significantly more likely to take action.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the traditional distinction between 'retargeting' and 'remarketing'?",
    options: [
      "They are completely different strategies",
      "Retargeting uses display/social ads via pixels; remarketing uses email re-engagement",
      "Remarketing is more expensive than retargeting",
      "Retargeting works on mobile; remarketing works on desktop",
    ],
    correctIndex: 1,
    explanation:
      "Traditionally, retargeting referred to display/social ads served via tracking pixels, while remarketing described re-engaging customers via email. In modern usage, both terms describe re-engaging known audiences across any channel.",
  },
  {
    type: "multiple-choice",
    question:
      "Which of the following is NOT a platform where retargeting is available?",
    options: [
      "Google Ads",
      "Meta (Facebook/Instagram)",
      "LinkedIn",
      "None of the above — retargeting is available on all listed platforms",
    ],
    correctIndex: 3,
    explanation:
      "Retargeting is available on virtually every major advertising platform including Google Ads, Meta, LinkedIn, TikTok, Twitter/X, and programmatic networks.",
  },
  {
    type: "multiple-choice",
    question:
      "Why does retargeting focus ad spend more efficiently than prospecting?",
    options: [
      "Retargeting ads are cheaper to create",
      "It targets warm audiences who already know your brand",
      "Retargeting does not use an auction system",
      "Ad platforms charge less for retargeting clicks",
    ],
    correctIndex: 1,
    explanation:
      "Retargeting focuses spend on warm audiences — people who already know your brand exists. These users need less convincing and convert at higher rates, making every ad dollar more efficient.",
  },
  {
    type: "true-false",
    question:
      "Every paid advertising strategy should include a retargeting layer to recapture lost opportunities.",
    correctAnswer: true,
    explanation:
      "With 96-98% of visitors leaving without converting, retargeting is essential for maximizing the return on your prospecting spend by giving warm audiences additional chances to convert.",
  },
  {
    type: "true-false",
    question:
      "Retargeting can only be done on social media platforms, not on search engines or display networks.",
    correctAnswer: false,
    explanation:
      "Retargeting works across virtually all advertising channels including Google Search (RLSA), Google Display Network, YouTube, Meta, LinkedIn, TikTok, and programmatic display networks.",
  },
  {
    type: "multi-select",
    question:
      "Which platforms support retargeting campaigns? (Select all that apply)",
    options: [
      "Google Ads (Display, Search, YouTube)",
      "Meta (Facebook, Instagram)",
      "LinkedIn",
      "TikTok",
      "Programmatic networks",
    ],
    correctIndices: [0, 1, 2, 3, 4],
    explanation:
      "Retargeting is supported on all major advertising platforms including Google Ads, Meta, LinkedIn, TikTok, and programmatic networks. The core mechanics are similar across platforms.",
  },
  {
    type: "multi-select",
    question:
      "What are the key benefits of retargeting? (Select all that apply)",
    options: [
      "Higher conversion rates than cold traffic",
      "Lower cost per acquisition",
      "Guaranteed 100% conversion rate",
      "Recaptures visitors who left without converting",
      "Works across multiple advertising channels",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Retargeting offers higher conversion rates, lower CPA, recaptures lost visitors, and works cross-channel. However, it does not guarantee 100% conversion — it simply improves the odds.",
  },
  {
    type: "ordering",
    question:
      "Arrange the typical user journey that leads to retargeting from first to last.",
    items: [
      "User sees a prospecting ad or finds your site organically",
      "User visits your website",
      "User leaves without converting",
      "Retargeting ad is served to the user on another platform",
      "User returns and converts",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "The retargeting journey starts with initial discovery, a website visit, departure without conversion, a retargeting ad on another site or platform, and finally the return visit and conversion.",
  },
  {
    type: "ordering",
    question:
      "Rank these audience types by their typical conversion rate (highest first).",
    items: [
      "Retargeted website visitors",
      "Cold prospecting audiences",
      "Cart abandoners (retargeted)",
      "Lookalike audiences",
    ],
    correctOrder: [2, 0, 3, 1],
    explanation:
      "Cart abandoners have the highest intent and conversion rate, followed by general website retargeting, then Lookalikes (modeled on converters), and cold prospecting audiences with the lowest conversion rate.",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question: "How does pixel-based retargeting work?",
    options: [
      "It targets users based on their email addresses",
      "A JavaScript pixel drops a cookie when users visit your site, adding them to retargeting audiences",
      "It uses GPS data to track physical store visitors",
      "It scans social media profiles for matching interests",
    ],
    correctIndex: 1,
    explanation:
      "Pixel-based retargeting places a small JavaScript snippet on your website that drops a cookie in visitors' browsers, anonymously adding them to your retargeting audience for future ad targeting.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the typical match rate range for list-based retargeting?",
    options: ["5-15%", "30-70%", "80-95%", "100%"],
    correctIndex: 1,
    explanation:
      "List-based retargeting typically achieves 30-70% match rates, depending on the platform and data quality. Not all email addresses or phone numbers match to user accounts on every platform.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the purpose of Conversions APIs in retargeting?",
    options: [
      "To create ad copy automatically",
      "To send event data server-side, bypassing browser restrictions",
      "To manage campaign budgets",
      "To design retargeting ad creatives",
    ],
    correctIndex: 1,
    explanation:
      "Conversions APIs send event data directly from your server to ad platforms, bypassing browser privacy restrictions and ad blockers that can prevent pixel-based tracking from working accurately.",
  },
  {
    type: "multiple-choice",
    question:
      "Which retargeting audience segment typically has the highest purchase intent?",
    options: [
      "All visitors (0-30 days)",
      "Blog post readers",
      "Cart abandoners",
      "Social media page followers",
    ],
    correctIndex: 2,
    explanation:
      "Cart abandoners have the highest purchase intent because they took the action of adding products to their cart, demonstrating clear buying interest. They are the closest to converting without actually completing the purchase.",
  },
  {
    type: "multiple-choice",
    question:
      "What type of messaging should be served to past customers in retargeting?",
    options: [
      "The same ads shown to first-time visitors",
      "Upsell, cross-sell, or win-back campaigns",
      "Competitor comparison ads",
      "Brand awareness videos",
    ],
    correctIndex: 1,
    explanation:
      "Past customers already trust your brand. Retargeting them with upsell, cross-sell, or win-back campaigns capitalizes on that existing relationship to generate repeat revenue.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the main limitation of pixel-based retargeting?",
    options: [
      "It only works on desktop computers",
      "Cookie-blocking browsers, ad blockers, and iOS privacy restrictions can reduce accuracy",
      "It requires a minimum of 10,000 monthly visitors",
      "It can only be used for e-commerce products",
    ],
    correctIndex: 1,
    explanation:
      "Pixel-based retargeting faces challenges from cookie-blocking browsers, ad blockers, and iOS privacy restrictions (like App Tracking Transparency), which is why server-side Conversions APIs are now essential supplements.",
  },
  {
    type: "true-false",
    question:
      "List-based retargeting can only target people by email address, not by phone number.",
    correctAnswer: false,
    explanation:
      "List-based retargeting supports both email addresses and phone numbers. You upload customer data, and the platform matches it against user accounts using either identifier.",
  },
  {
    type: "true-false",
    question:
      "All website visitors should be treated the same in retargeting campaigns for maximum simplicity.",
    correctAnswer: false,
    explanation:
      "Segmenting retargeting audiences by behavior (all visitors, product page viewers, cart abandoners, past customers) allows you to deliver tailored messages that match each user's intent level, dramatically improving performance.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are valid retargeting audience segments? (Select all that apply)",
    options: [
      "All visitors (0-30 days)",
      "Product/service page viewers",
      "Cart abandoners",
      "Past customers",
      "Random internet users",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Valid retargeting segments include all visitors, specific page viewers, cart abandoners, and past customers. Random internet users are not a retargeting segment — retargeting requires prior interaction with your brand.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are methods for building retargeting audiences? (Select all that apply)",
    options: [
      "Pixel-based tracking",
      "Customer list uploads",
      "Server-side Conversions APIs",
      "Purchasing third-party email lists",
      "Engagement-based audiences",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Retargeting audiences are built through pixels, customer lists, server-side APIs, and engagement tracking. Purchasing third-party email lists is not a retargeting method and violates most platform policies.",
  },
  {
    type: "ordering",
    question:
      "Order these retargeting audience segments from lowest to highest purchase intent.",
    items: [
      "All website visitors",
      "Product page viewers",
      "Cart abandoners",
      "Checkout page visitors who did not purchase",
    ],
    correctOrder: [0, 1, 3, 2],
    explanation:
      "All visitors have the lowest intent, product page viewers have moderate intent, checkout visitors who dropped off are higher, and cart abandoners demonstrate the highest intent since they actively selected items.",
  },
  {
    type: "ordering",
    question:
      "Rank retargeting methods by data accuracy (most accurate first).",
    items: [
      "Server-side Conversions API",
      "First-party pixel with cookies",
      "Third-party pixel with cookies",
      "List-based uploads",
    ],
    correctOrder: [0, 3, 1, 2],
    explanation:
      "Server-side CAPI is most accurate (bypasses browser restrictions), list uploads match known customers directly, first-party pixels are more reliable than third-party, and third-party cookies face the most blocking.",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is sequential messaging in retargeting?",
    options: [
      "Showing the same ad repeatedly to the same user",
      "Telling a story over time with different messages at different stages",
      "Sending messages in alphabetical order",
      "Running ads only on sequential days of the week",
    ],
    correctIndex: 1,
    explanation:
      "Sequential messaging tells a story over time: reinforce value proposition (Day 1-7), share social proof (Day 8-14), present a specific offer (Day 15-21), and create urgency (Day 22-30).",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended maximum frequency for retargeting ads on display networks per day?",
    options: [
      "1 impression",
      "3-5 impressions",
      "10-15 impressions",
      "No limit needed",
    ],
    correctIndex: 1,
    explanation:
      "Display retargeting should be capped at 3-5 impressions per user per day and 15-20 per week. Without frequency caps, retargeting can feel intrusive and damage your brand perception.",
  },
  {
    type: "multiple-choice",
    question:
      "At what frequency level on social media retargeting should you begin watching for diminishing returns?",
    options: [
      "Above 2",
      "Above 5",
      "Above 8-10",
      "Above 20",
    ],
    correctIndex: 2,
    explanation:
      "On social media, a retargeting frequency above 8-10 typically signals fatigue and decreasing returns. At this point, users have seen the ad enough times that additional impressions produce minimal incremental value.",
  },
  {
    type: "multiple-choice",
    question:
      "How is sequential messaging implemented technically?",
    options: [
      "By using a single ad set with one creative",
      "By creating separate ad sets with different audience windows and excluding previous segments",
      "By changing the ad copy every hour",
      "By running all messages simultaneously to every user",
    ],
    correctIndex: 1,
    explanation:
      "Sequential messaging uses separate ad sets with different audience windows (1-7 days, 8-14 days, etc.), excluding the previous segments. Each stage gets tailored creative that builds on the last.",
  },
  {
    type: "multiple-choice",
    question:
      "What should you do when running cross-platform retargeting campaigns?",
    options: [
      "Use completely different messaging on each platform",
      "Only retarget on one platform to avoid confusion",
      "Use consistent messaging and creative themes while adapting formats to each channel",
      "Run identical creative across all platforms without modification",
    ],
    correctIndex: 2,
    explanation:
      "Cross-platform retargeting should maintain consistent messaging themes while adapting formats to each channel's strengths (video for YouTube, carousel for Instagram, text overlays for Display).",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended maximum weekly frequency for YouTube retargeting ads?",
    options: [
      "1 view per week",
      "2-3 views per week",
      "5-7 views per week",
      "10+ views per week",
    ],
    correctIndex: 1,
    explanation:
      "For video/YouTube retargeting, 2-3 views per user per week maintains impact without becoming annoying. Video ads are more intrusive than display banners, so lower frequency is appropriate.",
  },
  {
    type: "true-false",
    question:
      "Frequency capping is optional and generally unnecessary for retargeting campaigns.",
    correctAnswer: false,
    explanation:
      "Frequency capping is essential for retargeting. Without caps, users see your ads excessively, which damages brand perception, wastes budget, and creates a negative association with your brand.",
  },
  {
    type: "true-false",
    question:
      "Cross-platform retargeting requires installing tracking pixels from all major platforms on your website.",
    correctAnswer: true,
    explanation:
      "To run cross-platform retargeting, you must install tracking pixels from each platform (Google, Meta, LinkedIn, etc.) on your site so each platform can build its own retargeting audience from your visitors.",
  },
  {
    type: "multi-select",
    question:
      "What are the stages in a sequential messaging retargeting strategy? (Select all that apply)",
    options: [
      "Reinforce value proposition (Day 1-7)",
      "Share social proof and case studies (Day 8-14)",
      "Present a specific offer or incentive (Day 15-21)",
      "Create urgency with limited-time messaging (Day 22-30)",
      "Send a direct mail postcard (Day 31+)",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Sequential messaging follows four stages: value reinforcement, social proof, specific offers, and urgency creation. Direct mail postcards are an offline channel, not part of digital sequential retargeting.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are reasons to implement frequency capping? (Select all that apply)",
    options: [
      "Prevent brand damage from ad fatigue",
      "Reduce wasted ad spend",
      "Maintain positive user experience",
      "Increase total number of impressions",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Frequency capping prevents brand damage, reduces wasted spend on oversaturated users, and maintains positive user experience. It actually decreases total impressions per user, which is the point.",
  },
  {
    type: "ordering",
    question:
      "Arrange the sequential messaging stages in the correct chronological order.",
    items: [
      "Create urgency (Day 22-30)",
      "Share social proof (Day 8-14)",
      "Reinforce value proposition (Day 1-7)",
      "Present specific offer (Day 15-21)",
    ],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "Sequential messaging follows a deliberate progression: first reinforce your value proposition, then build credibility with social proof, then present a specific offer, and finally create urgency to drive action.",
  },
  {
    type: "ordering",
    question:
      "Rank these channels by recommended retargeting frequency from most impressions allowed to fewest.",
    items: [
      "Display Network (3-5 per day)",
      "Social Media feed (monitor at 8-10)",
      "YouTube/Video (2-3 per week)",
    ],
    correctOrder: [0, 1, 2],
    explanation:
      "Display allows the highest frequency (3-5 daily) since banners are less intrusive. Social media feed frequency should be monitored above 8-10. Video allows the fewest (2-3 weekly) because video ads demand more attention.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is dynamic retargeting?",
    options: [
      "Showing the same generic ad to all retargeted users",
      "Automatically showing users the exact products they viewed on your site",
      "Changing ad colors based on the time of day",
      "Running ads only during peak traffic hours",
    ],
    correctIndex: 1,
    explanation:
      "Dynamic retargeting automatically shows users the exact products or services they viewed on your site, including current pricing and availability, making the ad highly personalized and relevant.",
  },
  {
    type: "multiple-choice",
    question:
      "What is a product feed in the context of dynamic retargeting?",
    options: [
      "A social media content calendar",
      "A structured data file containing your product catalog information",
      "An RSS feed of blog posts",
      "A list of competitor products",
    ],
    correctIndex: 1,
    explanation:
      "A product feed is a structured data file (XML, CSV, or API) containing your product catalog — names, images, prices, URLs, and availability — that feeds into platforms like Google Merchant Center or Meta Commerce Manager.",
  },
  {
    type: "multiple-choice",
    question:
      "Which pixel events are needed for dynamic retargeting to match user behavior to catalog items?",
    options: [
      "Only page view events",
      "ViewContent, AddToCart, and Purchase events with product IDs",
      "Only click events",
      "Social sharing events",
    ],
    correctIndex: 1,
    explanation:
      "Dynamic retargeting requires enhanced pixel events (ViewContent, AddToCart, Purchase) that pass product IDs, allowing the platform to match user behavior to specific catalog items for personalized ad serving.",
  },
  {
    type: "multiple-choice",
    question:
      "What privacy regulation requires blocking tracking pixels until users opt in?",
    options: [
      "CAN-SPAM Act",
      "GDPR and similar data protection regulations",
      "Section 230",
      "The Digital Millennium Copyright Act",
    ],
    correctIndex: 1,
    explanation:
      "GDPR and similar regulations require a cookie consent management platform (CMP) that blocks tracking pixels until users explicitly opt in to data collection, especially in the EU and regions with comparable laws.",
  },
  {
    type: "multiple-choice",
    question:
      "What hashing algorithm should be used when uploading customer lists for retargeting?",
    options: ["MD5", "SHA-1", "SHA-256", "Base64"],
    correctIndex: 2,
    explanation:
      "SHA-256 is the industry standard for hashing customer data (emails, phone numbers) before uploading to ad platforms. This protects personal information while allowing platforms to match against their user databases.",
  },
  {
    type: "multiple-choice",
    question:
      "Why is investing in first-party data strategies increasingly important for retargeting?",
    options: [
      "First-party data is cheaper to collect",
      "Third-party cookies continue to deprecate, making first-party data essential",
      "Platforms prefer first-party data aesthetically",
      "First-party data loads faster in browsers",
    ],
    correctIndex: 1,
    explanation:
      "As third-party cookies deprecate across browsers, first-party data strategies (email lists, logged-in users, CRM data) become essential for maintaining retargeting capabilities in a privacy-first world.",
  },
  {
    type: "true-false",
    question:
      "Dynamic retargeting requires a product feed connected to the advertising platform.",
    correctAnswer: true,
    explanation:
      "Dynamic retargeting needs a product feed (catalog of products with images, prices, URLs) connected to the platform so it can automatically generate personalized ads showing the specific items each user viewed.",
  },
  {
    type: "true-false",
    question:
      "Privacy compliance for retargeting only matters for businesses operating in the European Union.",
    correctAnswer: false,
    explanation:
      "Privacy compliance matters globally. GDPR applies in the EU, CCPA/CPRA in California, LGPD in Brazil, and many other jurisdictions have similar laws. Additionally, browser-level privacy features like iOS ATT affect all users worldwide.",
  },
  {
    type: "multi-select",
    question:
      "What are the requirements for dynamic retargeting? (Select all that apply)",
    options: [
      "Product feed / catalog",
      "Enhanced pixel events with product IDs",
      "Minimum 1 million monthly visitors",
      "Template customization for branded ads",
      "Server-side tracking implementation",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Dynamic retargeting requires a product feed, enhanced pixel events passing product IDs, and template customization. There is no minimum visitor requirement, and server-side tracking enhances but is not required for dynamic retargeting.",
  },
  {
    type: "multi-select",
    question:
      "Which privacy compliance steps are necessary for retargeting? (Select all that apply)",
    options: [
      "Implement a cookie consent management platform",
      "Disclose retargeting use in your privacy policy",
      "Hash customer data before uploading lists",
      "Ignore privacy regulations for better performance",
      "Invest in first-party data strategies",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Compliance requires consent management, privacy policy disclosure, data hashing, and first-party data investment. Ignoring regulations leads to fines, lawsuits, and platform account suspensions.",
  },
  {
    type: "ordering",
    question:
      "Arrange the steps for setting up dynamic retargeting in the correct order.",
    items: [
      "Create and upload your product feed/catalog",
      "Install enhanced pixel events with product IDs",
      "Configure dynamic ad templates with brand customization",
      "Launch dynamic retargeting campaigns",
      "Monitor performance and optimize",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "Dynamic retargeting setup starts with the product feed, then pixel events to track user behavior, template design, campaign launch, and ongoing optimization.",
  },
  {
    type: "ordering",
    question:
      "Rank these data types by their resilience to privacy changes (most resilient first).",
    items: [
      "First-party CRM data (emails, purchase history)",
      "Server-side conversion events",
      "First-party browser cookies",
      "Third-party browser cookies",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "CRM data is fully owned and most resilient, server-side events bypass browser restrictions, first-party cookies are more durable than third-party, and third-party cookies face the most blocking and deprecation.",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What are view-through conversions?",
    options: [
      "Conversions that happen after a user clicks your ad",
      "Conversions that happen after someone sees but does not click your retargeting ad",
      "Conversions counted when a user views your landing page",
      "The number of times your ad was viewed",
    ],
    correctIndex: 1,
    explanation:
      "View-through conversions occur when someone sees (but does not click) your retargeting ad and later converts. Short attribution windows (1-7 days) are recommended to avoid over-counting.",
  },
  {
    type: "multiple-choice",
    question:
      "What does incrementality measure in retargeting?",
    options: [
      "Total number of retargeting impressions",
      "Whether retargeting ads actually caused conversions that would not have happened otherwise",
      "The increase in website traffic from retargeting",
      "How many times a user saw your ad before converting",
    ],
    correctIndex: 1,
    explanation:
      "Incrementality measures the true causal impact of retargeting — whether the conversions would have happened anyway without the ad exposure. It is the gold standard for evaluating retargeting effectiveness.",
  },
  {
    type: "multiple-choice",
    question:
      "How do you run an incrementality test for retargeting?",
    options: [
      "Compare retargeting CTR to prospecting CTR",
      "Withhold retargeting ads from a random 10-15% holdout group and compare conversion rates",
      "Increase retargeting budget by 50% and measure results",
      "Turn off all retargeting for one month",
    ],
    correctIndex: 1,
    explanation:
      "Incrementality testing withholds ads from a random 10-15% of your retargeting audience (holdout group) and compares their conversion rate to the exposed group. The difference reveals the true incremental lift from retargeting.",
  },
  {
    type: "multiple-choice",
    question:
      "What does audience decay analysis reveal?",
    options: [
      "How quickly your ad creative becomes stale",
      "How conversion rates change across different audience time windows",
      "The rate at which your website traffic decreases",
      "How quickly users unsubscribe from your emails",
    ],
    correctIndex: 1,
    explanation:
      "Audience decay analysis tracks conversion rates across different time windows (1-7 days, 8-14 days, 15-30 days). If older audiences convert at negligible rates, you should shorten your retargeting window to focus budget where it works.",
  },
  {
    type: "multiple-choice",
    question:
      "Which retargeting audience segments typically show the highest incrementality?",
    options: [
      "General site visitors from 30+ days ago",
      "Short-window cart abandoners",
      "Users who visited your About page",
      "Blog post readers from last year",
    ],
    correctIndex: 1,
    explanation:
      "Short-window cart abandoners typically show the highest incrementality because they were close to purchasing and the retargeting ad serves as an effective nudge. Older, broader audiences often add little incremental lift.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended view-through attribution window for retargeting?",
    options: [
      "1-7 days",
      "14-30 days",
      "60 days",
      "90 days",
    ],
    correctIndex: 0,
    explanation:
      "Short view-through attribution windows of 1-7 days are recommended to avoid over-counting conversions that would have happened regardless of the ad impression. Longer windows inflate reported results.",
  },
  {
    type: "true-false",
    question:
      "Retargeting metrics will naturally look better than prospecting campaign metrics because the audience is warmer.",
    correctAnswer: true,
    explanation:
      "Retargeting audiences are inherently warmer than cold prospecting audiences, so metrics like CTR, conversion rate, and CPA will naturally look better. This does not always mean retargeting is driving incremental value.",
  },
  {
    type: "true-false",
    question:
      "All retargeting audiences provide equal incremental value regardless of their time window.",
    correctAnswer: false,
    explanation:
      "Incrementality varies significantly by audience segment. Short-window high-intent audiences (like recent cart abandoners) often provide high incrementality, while older, broader audiences may add little to no incremental lift.",
  },
  {
    type: "multi-select",
    question:
      "Which metrics are important for evaluating retargeting performance? (Select all that apply)",
    options: [
      "View-through conversions",
      "Frequency",
      "Audience decay rates",
      "Incrementality",
      "Total impressions only",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "View-through conversions, frequency, audience decay, and incrementality are all critical retargeting metrics. Total impressions alone provide no insight into whether retargeting is actually driving value.",
  },
  {
    type: "multi-select",
    question:
      "What optimization actions should you take based on retargeting data? (Select all that apply)",
    options: [
      "Refine audience segments based on decay analysis",
      "Test new creative approaches regularly",
      "Adjust frequency caps based on engagement data",
      "Keep all audiences running regardless of incrementality",
      "Prune audiences with low incrementality",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Optimize by refining segments, testing new creative, adjusting frequency, and pruning low-incrementality audiences. Keeping all audiences running regardless of data wastes budget on segments that are not driving real results.",
  },
  {
    type: "ordering",
    question:
      "Arrange these retargeting measurement approaches from simplest to most sophisticated.",
    items: [
      "Track basic click-through conversions",
      "Monitor view-through conversions with short windows",
      "Analyze audience decay across time windows",
      "Run incrementality holdout tests",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Basic click-through tracking is simplest, view-through adds nuance, audience decay analysis requires segmented reporting, and incrementality testing is the most sophisticated approach requiring holdout group methodology.",
  },
  {
    type: "ordering",
    question:
      "Rank these optimization priorities for retargeting from most impactful to least impactful.",
    items: [
      "Focus budget on high-incrementality segments",
      "Test new creative and messaging",
      "Adjust frequency caps",
      "Expand retargeting window beyond 90 days",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Focusing on high-incrementality segments has the biggest impact, creative testing drives engagement, frequency cap adjustment prevents fatigue, and expanding beyond 90 days typically yields diminishing returns.",
  },
];
