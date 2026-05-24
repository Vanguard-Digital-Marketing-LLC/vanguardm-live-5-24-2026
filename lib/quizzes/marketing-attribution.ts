import type { QuizQuestion } from "@/lib/academy-data";

export const marketingAttributionQuiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is marketing attribution?",
    options: [
      "The process of creating marketing campaigns",
      "The science of determining which touchpoints deserve credit for a conversion",
      "A method for calculating total marketing spend",
      "The practice of branding marketing materials with company logos",
    ],
    correctIndex: 1,
    explanation:
      "Marketing attribution is the science of determining which touchpoints in a customer's journey deserve credit for a conversion, helping marketers understand which channels drive results.",
  },
  {
    type: "multiple-choice",
    question: "Why is marketing attribution important for budget allocation?",
    options: [
      "It automatically distributes budget across channels",
      "It eliminates the need for marketing budgets",
      "It helps identify which channels actually drive results so budget can be allocated accordingly",
      "It ensures equal spending across all channels",
    ],
    correctIndex: 2,
    explanation:
      "Attribution modeling reveals which channels truly drive conversions, enabling smarter budget allocation and higher overall return on ad spend (ROAS) instead of guessing.",
  },
  {
    type: "multiple-choice",
    question:
      "What happens when the sum of conversions reported by each advertising platform is totaled?",
    options: [
      "It exactly matches your total actual conversions",
      "It always exceeds your actual total conversions due to different attribution logic",
      "It underreports your actual conversions",
      "It matches only if you use last-touch attribution",
    ],
    correctIndex: 1,
    explanation:
      "Each platform reports conversions using its own attribution logic and lookback windows, causing overlap. The sum of platform-reported conversions always exceeds actual total conversions.",
  },
  {
    type: "multiple-choice",
    question:
      "Which of the following best describes a customer 'touchpoint' in attribution?",
    options: [
      "The moment a customer makes a purchase",
      "Any interaction a customer has with your marketing before converting",
      "The first time a customer visits your website",
      "A customer service interaction after purchase",
    ],
    correctIndex: 1,
    explanation:
      "A touchpoint is any interaction a customer has with your marketing throughout their journey — ads, emails, social posts, search clicks, and more — before converting.",
  },
  {
    type: "true-false",
    question:
      "Attribution is about finding a single 'right' answer for which channel caused a conversion.",
    correctAnswer: false,
    explanation:
      "Attribution is not about finding a single right answer. It is about building a more complete picture of how marketing channels work together to drive conversions. Different models offer different perspectives.",
  },
  {
    type: "true-false",
    question:
      "Without proper attribution, marketers may invest heavily in channels that only assist conversions while underfunding channels that initiate them.",
    correctAnswer: true,
    explanation:
      "Without attribution data, marketers cannot distinguish between channels that drive awareness versus those that close deals, leading to potentially misallocated budgets.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are problems that attribution helps solve? (Select all that apply)",
    options: [
      "Understanding which channels drive awareness",
      "Identifying which touchpoints close conversions",
      "Automatically creating ad campaigns",
      "Optimizing budget allocation across channels",
      "Designing website layouts",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Attribution helps understand awareness drivers, identify closing touchpoints, and optimize budget allocation. It does not create campaigns or design websites.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following could be touchpoints in a customer journey? (Select all that apply)",
    options: [
      "A social media ad click",
      "An email newsletter open",
      "A Google search click",
      "A retargeting display ad",
      "A server configuration change",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Social ads, email opens, search clicks, and retargeting ads are all customer touchpoints. A server configuration change is a technical action, not a customer interaction.",
  },
  {
    type: "ordering",
    question:
      "Arrange this example customer journey in chronological order.",
    items: [
      "Clicks a retargeting ad and purchases",
      "Discovers the brand through a social media ad",
      "Searches the brand name on Google",
      "Clicks an email link two days later",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "The typical journey described is: social media discovery, email engagement, branded search, and finally conversion via retargeting.",
  },
  {
    type: "ordering",
    question:
      "Put these attribution-related activities in the order they should be performed.",
    items: [
      "Analyze attribution reports",
      "Implement UTM tracking across all channels",
      "Choose attribution models to compare",
      "Define conversion events",
      "Optimize budget based on findings",
    ],
    correctOrder: [3, 1, 2, 0, 4],
    explanation:
      "Start by defining what counts as a conversion, implement UTM tracking, choose models, analyze the reports, and then optimize budget allocation based on the insights.",
  },
  {
    type: "multiple-choice",
    question: "What does a ROAS of 4:1 mean?",
    options: [
      "$4 spent for every $1 in revenue",
      "$4 in revenue for every $1 spent on advertising",
      "4% of revenue comes from advertising",
      "4 conversions per $1 spent",
    ],
    correctIndex: 1,
    explanation:
      "ROAS (Return on Ad Spend) of 4:1 means $4 in revenue is generated for every $1 spent on advertising. It is a key metric for measuring advertising efficiency.",
  },
  {
    type: "multiple-choice",
    question: "What is the fundamental challenge that attribution models try to address?",
    options: [
      "How to create better advertisements",
      "How to distribute conversion credit across multiple touchpoints fairly",
      "How to reduce marketing costs",
      "How to increase website traffic",
    ],
    correctIndex: 1,
    explanation:
      "The fundamental challenge of attribution is distributing conversion credit across multiple touchpoints in a customer journey, as most conversions involve more than one interaction.",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question: "In first-touch attribution, which touchpoint receives 100% of the credit?",
    options: [
      "The last interaction before conversion",
      "The first interaction that brought the user to your site",
      "The interaction with the highest engagement",
      "All touchpoints receive equal credit",
    ],
    correctIndex: 1,
    explanation:
      "First-touch attribution gives 100% credit to the first interaction that brought the user to your site. It is best for understanding which channels drive awareness and top-of-funnel discovery.",
  },
  {
    type: "multiple-choice",
    question: "What is the main limitation of last-touch attribution?",
    options: [
      "It is too complex to implement",
      "It requires machine learning",
      "It ignores everything that came before the last click",
      "It does not work with digital channels",
    ],
    correctIndex: 2,
    explanation:
      "Last-touch attribution's main limitation is that it ignores all touchpoints before the final interaction, potentially undervaluing channels that drive awareness and nurture leads.",
  },
  {
    type: "multiple-choice",
    question:
      "How does the position-based (U-shaped) attribution model distribute credit?",
    options: [
      "50% first, 50% last",
      "40% first, 40% last, 20% distributed among middle touchpoints",
      "33% first, 34% middle, 33% last",
      "All credit to the highest-value touchpoint",
    ],
    correctIndex: 1,
    explanation:
      "Position-based (U-shaped) attribution assigns 40% to the first touch, 40% to the last touch, and distributes the remaining 20% evenly among middle interactions.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the default half-life for time-decay attribution?",
    options: ["1 day", "3 days", "7 days", "14 days"],
    correctIndex: 2,
    explanation:
      "Time-decay attribution uses an exponential decay function with a default half-life of 7 days, giving progressively more credit to touchpoints closer to the conversion.",
  },
  {
    type: "multiple-choice",
    question: "What does data-driven attribution (DDA) use to assign credit?",
    options: [
      "Equal distribution across all touchpoints",
      "Manual rules defined by the marketer",
      "Machine learning analysis of actual conversion data",
      "The position of the touchpoint in the journey",
    ],
    correctIndex: 2,
    explanation:
      "Data-driven attribution uses machine learning to analyze actual conversion data and assign credit based on the observed impact of each touchpoint on conversion likelihood.",
  },
  {
    type: "multiple-choice",
    question:
      "Which UTM parameter identifies the traffic source (e.g., google, facebook)?",
    options: ["utm_medium", "utm_source", "utm_campaign", "utm_content"],
    correctIndex: 1,
    explanation:
      "utm_source identifies the specific traffic source, such as google, facebook, newsletter, or partner_site. It answers 'where did this traffic come from?'",
  },
  {
    type: "true-false",
    question:
      "Linear attribution distributes credit equally across all touchpoints in a journey.",
    correctAnswer: true,
    explanation:
      "Linear attribution gives equal credit to every touchpoint. If a user had 4 interactions before converting, each receives 25% of the credit.",
  },
  {
    type: "true-false",
    question:
      "Data-driven attribution requires no minimum conversion volume to produce reliable results.",
    correctAnswer: false,
    explanation:
      "Data-driven attribution requires sufficient conversion volume (Google recommends at least 300 conversions per month) to produce statistically reliable results. With too few conversions, the model may not have enough data to learn from.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are multi-touch attribution models? (Select all that apply)",
    options: [
      "Linear",
      "First-touch",
      "Time-decay",
      "Last-touch",
      "Position-based",
      "Data-driven",
    ],
    correctIndices: [0, 2, 4, 5],
    explanation:
      "Linear, time-decay, position-based, and data-driven are all multi-touch models that distribute credit across multiple touchpoints. First-touch and last-touch are single-touch models.",
  },
  {
    type: "multi-select",
    question:
      "Which are the five standard UTM parameters? (Select all that apply)",
    options: [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_channel",
      "utm_term",
      "utm_content",
    ],
    correctIndices: [0, 1, 2, 4, 5],
    explanation:
      "The five standard UTM parameters are utm_source, utm_medium, utm_campaign, utm_term, and utm_content. There is no standard 'utm_channel' parameter.",
  },
  {
    type: "ordering",
    question:
      "Arrange these attribution models from simplest to most sophisticated.",
    items: [
      "Data-driven attribution",
      "Last-touch attribution",
      "Linear attribution",
      "Position-based attribution",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Last-touch is the simplest (one touchpoint gets all credit), linear adds equal distribution, position-based adds weighting, and data-driven uses machine learning for the most sophisticated analysis.",
  },
  {
    type: "ordering",
    question:
      "Put these UTM parameters in order of most to least commonly required.",
    items: [
      "utm_content",
      "utm_source",
      "utm_campaign",
      "utm_medium",
      "utm_term",
    ],
    correctOrder: [1, 3, 2, 4, 0],
    explanation:
      "utm_source and utm_medium are virtually always required, utm_campaign is standard for paid efforts, utm_term is used mainly for paid search keywords, and utm_content is optional for differentiating ad variations.",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "Which attribution model is best for understanding top-of-funnel awareness channels?",
    options: [
      "Last-touch",
      "Time-decay",
      "First-touch",
      "Linear",
    ],
    correctIndex: 2,
    explanation:
      "First-touch attribution is best for understanding which channels drive initial awareness and discovery, as it credits the first interaction that brought the user to your site.",
  },
  {
    type: "multiple-choice",
    question:
      "For a B2B company with a long sales cycle, which attribution model is most appropriate?",
    options: [
      "Last-touch",
      "First-touch",
      "Position-based or data-driven",
      "Time-decay",
    ],
    correctIndex: 2,
    explanation:
      "B2B companies with long sales cycles benefit from position-based or data-driven models that capture the importance of both discovery and conversion touchpoints across an extended journey.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended minimum monthly conversion volume for reliable data-driven attribution?",
    options: ["50+", "100+", "300+", "1,000+"],
    correctIndex: 2,
    explanation:
      "Data-driven attribution becomes statistically reliable with 300+ conversions per month, providing enough data for the machine learning model to identify meaningful patterns.",
  },
  {
    type: "multiple-choice",
    question:
      "Why is UTM naming consistency critical for attribution?",
    options: [
      "Inconsistent UTMs break website functionality",
      "Different naming creates duplicate entries that fragment data",
      "Google penalizes sites with inconsistent UTMs",
      "UTMs must match a Google-specified format",
    ],
    correctIndex: 1,
    explanation:
      "Inconsistent UTM naming (e.g., 'Spring_Sale' vs 'spring-sale') creates duplicate entries in analytics, fragmenting data and making accurate attribution impossible.",
  },
  {
    type: "multiple-choice",
    question:
      "What should be used as the single source of truth for cross-channel comparison?",
    options: [
      "Each platform's own reporting",
      "A spreadsheet combining all platform data",
      "GA4, because it deduplicates users and applies consistent attribution",
      "The platform with the highest reported conversions",
    ],
    correctIndex: 2,
    explanation:
      "GA4 should be the single source of truth for cross-channel comparison because it deduplicates users and applies a consistent attribution model across all traffic sources.",
  },
  {
    type: "true-false",
    question:
      "Most organizations benefit from using only a single attribution model.",
    correctAnswer: false,
    explanation:
      "Most organizations benefit from using multiple models in parallel to get a well-rounded view. Different models answer different questions about channel performance.",
  },
  {
    type: "true-false",
    question:
      "UTM parameters should always use lowercase letters to maintain consistency.",
    correctAnswer: true,
    explanation:
      "Best practice is to always use lowercase for UTM values. Since UTM parameters are case-sensitive, 'Facebook' and 'facebook' would appear as separate sources in reports.",
  },
  {
    type: "multi-select",
    question:
      "Which factors should influence your choice of attribution model? (Select all that apply)",
    options: [
      "Sales cycle length",
      "Channel mix diversity",
      "Company logo design",
      "Conversion volume",
      "Business model type",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Attribution model selection should be based on sales cycle length, channel mix, conversion volume, and business model. Logo design has no relevance to attribution strategy.",
  },
  {
    type: "multi-select",
    question:
      "Which elements should a UTM governance document define? (Select all that apply)",
    options: [
      "Casing rules (always lowercase)",
      "Separator characters (hyphens or underscores)",
      "Required parameters per channel",
      "Website hosting provider",
      "Document ownership",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "A UTM governance document should define casing rules, separator conventions, required parameters per channel, and who owns the document. Hosting provider is unrelated to UTM governance.",
  },
  {
    type: "ordering",
    question:
      "Arrange these attribution model selection considerations from most basic to most advanced.",
    items: [
      "Implement data-driven attribution with sufficient volume",
      "Start with last-touch as a baseline",
      "Add first-touch comparison for awareness insights",
      "Compare multiple models side-by-side",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Start with last-touch as a simple baseline, add first-touch for awareness perspective, then compare multiple models, and finally graduate to data-driven attribution when you have sufficient data.",
  },
  {
    type: "multiple-choice",
    question:
      "Why do the total conversions reported by all advertising platforms combined always exceed actual total conversions?",
    options: [
      "Platforms intentionally inflate numbers",
      "Each platform uses its own attribution logic and lookback windows causing overlap",
      "Some platforms count impressions as conversions",
      "Platforms use different currencies for reporting",
    ],
    correctIndex: 1,
    explanation:
      "Each platform uses its own attribution logic and lookback windows. Google Ads, Meta Ads, and LinkedIn all attribute the same conversion to themselves if their touchpoint was in the journey, causing overlap.",
  },
  {
    type: "multiple-choice",
    question:
      "What is a UTM builder spreadsheet used for?",
    options: [
      "Calculating marketing ROI",
      "Generating consistent UTM-tagged URLs from a standardized template",
      "Building website landing pages",
      "Tracking social media followers",
    ],
    correctIndex: 1,
    explanation:
      "A UTM builder spreadsheet provides a standardized template so every team member generates URLs with consistent UTM parameters, preventing naming inconsistencies.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What should be the first technical step in implementing an attribution system?",
    options: [
      "Building a custom attribution model",
      "Tagging all paid and owned media links with UTM parameters",
      "Purchasing an attribution platform",
      "Creating Google Ads campaigns",
    ],
    correctIndex: 1,
    explanation:
      "The first step is ensuring all paid and owned media links carry proper UTM tracking. Without clean, consistent tagging, no attribution model can produce accurate results.",
  },
  {
    type: "multiple-choice",
    question:
      "What does enabling Google Signals in GA4 provide?",
    options: [
      "Server-side tracking capability",
      "Cross-device reporting for users signed into Google accounts",
      "Automatic UTM tagging",
      "Real-time conversion alerts",
    ],
    correctIndex: 1,
    explanation:
      "Google Signals enables cross-device reporting by leveraging data from users who are signed into their Google accounts, helping stitch together multi-device journeys.",
  },
  {
    type: "multiple-choice",
    question:
      "How can businesses track offline conversions in GA4?",
    options: [
      "It is not possible to track offline conversions",
      "Using the GA4 Measurement Protocol or CRM integration",
      "By manually entering data into GA4 reports",
      "Through Google Search Console",
    ],
    correctIndex: 1,
    explanation:
      "Offline conversions (phone calls, in-store purchases) can be imported into GA4 using the Measurement Protocol API or through CRM integrations that match online sessions to offline outcomes.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the primary purpose of Enhanced Conversions in Google Ads?",
    options: [
      "To create automated ad copy",
      "To send hashed first-party data with conversion tags to improve match rates",
      "To increase ad impressions",
      "To replace UTM parameters",
    ],
    correctIndex: 1,
    explanation:
      "Enhanced Conversions send hashed first-party data (email, phone number) alongside conversion tags, improving conversion match rates in Google Ads, especially important as cookie tracking declines.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the advantage of server-side tracking for attribution?",
    options: [
      "It is completely free to implement",
      "It provides more reliable data collection less affected by browser restrictions",
      "It eliminates the need for any client-side code",
      "It automatically creates attribution models",
    ],
    correctIndex: 1,
    explanation:
      "Server-side tracking moves tag execution to a server environment, making data collection more reliable and less affected by ad blockers, cookie restrictions, and browser privacy features.",
  },
  {
    type: "true-false",
    question:
      "First-party data collection through login experiences and loyalty programs helps maintain attribution accuracy in a cookieless world.",
    correctAnswer: true,
    explanation:
      "First-party data from logins and loyalty programs creates owned identity graphs that work independently of third-party cookies, maintaining attribution accuracy as cookies are deprecated.",
  },
  {
    type: "true-false",
    question:
      "Marketing Mix Modeling (MMM) requires user-level tracking data to function.",
    correctAnswer: false,
    explanation:
      "MMM works with aggregate data (weekly or monthly spend and outcome data), making it independent of user-level tracking. This makes it valuable in a privacy-constrained, cookieless environment.",
  },
  {
    type: "multi-select",
    question:
      "Which strategies help maintain attribution in a cookieless environment? (Select all that apply)",
    options: [
      "First-party data collection",
      "Server-side tracking",
      "Consent Mode v2",
      "Increasing third-party cookie usage",
      "Enhanced Conversions",
      "Marketing Mix Modeling",
    ],
    correctIndices: [0, 1, 2, 4, 5],
    explanation:
      "First-party data, server-side tracking, Consent Mode, Enhanced Conversions, and MMM all help maintain attribution without third-party cookies. Increasing third-party cookie usage goes against the industry trend.",
  },
  {
    type: "multi-select",
    question:
      "Which platforms can be linked to GA4 for automatic campaign data import? (Select all that apply)",
    options: [
      "Google Ads",
      "Search Ads 360",
      "Display & Video 360",
      "Google Search Console",
      "Adobe Analytics",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Google Ads, Search Ads 360, Display & Video 360, and Google Search Console can all be linked to GA4 for automatic data import. Adobe Analytics is a separate analytics platform that does not integrate directly.",
  },
  {
    type: "ordering",
    question:
      "Put these attribution implementation steps in the correct order.",
    items: [
      "Link advertising platforms to GA4",
      "Tag all media links with UTM parameters",
      "Configure GA4 channel groupings",
      "Set up BigQuery export for custom models",
      "Import offline conversions",
    ],
    correctOrder: [1, 2, 0, 4, 3],
    explanation:
      "Start with UTM tagging, configure channel groupings, link ad platforms, import offline conversions, and finally set up BigQuery for advanced custom attribution models.",
  },
  {
    type: "ordering",
    question:
      "Arrange these cookieless attribution strategies from easiest to most complex to implement.",
    items: [
      "Marketing Mix Modeling",
      "Consent Mode v2",
      "Server-side GTM container",
      "Enhanced Conversions",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "Consent Mode v2 is a configuration change, Enhanced Conversions require sending hashed data, server-side GTM needs infrastructure setup, and MMM requires statistical expertise and historical data.",
  },
  {
    type: "multiple-choice",
    question:
      "Why is BigQuery export valuable for attribution?",
    options: [
      "It provides free advertising credits",
      "It enables custom SQL-based attribution models beyond GA4's native capabilities",
      "It automatically fixes UTM inconsistencies",
      "It replaces the need for Google Tag Manager",
    ],
    correctIndex: 1,
    explanation:
      "BigQuery export provides raw event-level data that can be queried with SQL, enabling custom attribution models, data joins with CRM data, and analysis beyond what GA4's built-in tools offer.",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "In GA4, where do you find attribution reports?",
    options: [
      "Reports > Lifecycle > Acquisition",
      "Advertising > Attribution",
      "Admin > Attribution Settings",
      "Explore > Attribution Template",
    ],
    correctIndex: 1,
    explanation:
      "Attribution reports in GA4 are found under the Advertising section, which includes Model Comparison and Conversion Paths reports.",
  },
  {
    type: "multiple-choice",
    question:
      "What does the GA4 Model Comparison report allow you to do?",
    options: [
      "Create new attribution models from scratch",
      "Compare how different models allocate credit to identify awareness drivers",
      "Automatically optimize ad spend",
      "Compare website design variations",
    ],
    correctIndex: 1,
    explanation:
      "The Model Comparison report lets you compare how different attribution models allocate credit. Channels that gain credit under first-touch but lose it under last-touch are key awareness drivers.",
  },
  {
    type: "multiple-choice",
    question:
      "What is an incrementality test?",
    options: [
      "A test that gradually increases ad spend",
      "A hold-out experiment measuring a channel's true causal impact",
      "A test comparing two landing page designs",
      "A method for increasing conversion rates",
    ],
    correctIndex: 1,
    explanation:
      "An incrementality test is a hold-out experiment where a channel is turned off in a specific geo or time period, providing causal evidence of its true impact beyond correlation.",
  },
  {
    type: "multiple-choice",
    question:
      "What does a high assisted conversion count with low last-touch conversions indicate about a channel?",
    options: [
      "The channel should be immediately cut",
      "The channel is overvalued",
      "The channel is undervalued — it helps drive conversions completed elsewhere",
      "The channel has tracking errors",
    ],
    correctIndex: 2,
    explanation:
      "A channel with high assisted conversions but low last-touch conversions is an undervalued assist channel. Cutting it may reduce overall conversions because it plays a crucial nurturing role.",
  },
  {
    type: "multiple-choice",
    question:
      "How often should you revisit your attribution model selection and UTM governance?",
    options: [
      "Once at initial setup only",
      "Annually",
      "Quarterly",
      "Daily",
    ],
    correctIndex: 2,
    explanation:
      "Attribution model selection and UTM governance should be revisited quarterly as your channel mix, conversion volume, and business objectives evolve. Attribution is an ongoing process.",
  },
  {
    type: "true-false",
    question:
      "Comparing CPA across different attribution models can reveal whether 'expensive' channels are actually initiating valuable journeys.",
    correctAnswer: true,
    explanation:
      "A channel that appears expensive under last-touch may show a much lower CPA under first-touch or position-based attribution, revealing that it initiates high-value journeys completed elsewhere.",
  },
  {
    type: "multi-select",
    question:
      "Which insights can you gain from comparing CPA across different attribution models? (Select all that apply)",
    options: [
      "Whether expensive channels are actually initiating valuable journeys",
      "Which channels are overvalued by last-touch",
      "The exact ROI of each channel",
      "Which channels play awareness vs. conversion roles",
      "The optimal ad creative for each channel",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Comparing CPA across models reveals whether expensive channels initiate journeys, which are overvalued by last-touch, and channel roles. Exact ROI and optimal creative require other analyses.",
  },
  {
    type: "multi-select",
    question:
      "Which actions should you take based on attribution analysis? (Select all that apply)",
    options: [
      "Compare CPA by attribution model",
      "Identify undervalued assist channels",
      "Ignore channels with low last-touch conversions",
      "Run incrementality tests for causal evidence",
      "Iterate and revisit quarterly",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Compare CPA across models, identify assist channels, run incrementality tests, and iterate quarterly. You should NOT ignore channels with low last-touch conversions without checking their assist value first.",
  },
  {
    type: "multi-select",
    question:
      "What information does the GA4 Conversion Paths report reveal? (Select all that apply)",
    options: [
      "Common multi-step channel sequences",
      "The number of touchpoints before conversion",
      "Individual user personal information",
      "Average time between touchpoints",
      "Channel interaction patterns",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Conversion Paths shows channel sequences, touchpoint counts, time between interactions, and channel patterns. It does not reveal individual personal information.",
  },
  {
    type: "ordering",
    question:
      "Put these attribution optimization steps in the correct order.",
    items: [
      "Optimize budget allocation based on findings",
      "Review attribution reports in GA4",
      "Run incrementality tests for validation",
      "Identify channels that gain or lose credit under different models",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "Start by reviewing reports, identify credit shifts between models, validate findings with incrementality tests, and then optimize budget allocation.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are signs that a channel is an undervalued awareness driver? (Select all that apply)",
    options: [
      "High first-touch attributed conversions",
      "Low last-touch conversions",
      "High assisted conversion count",
      "Low click-through rate on ads",
      "Significant credit gain when switching from last-touch to first-touch model",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "An undervalued awareness driver shows high first-touch credit, low last-touch credit, high assists, and gains significant credit when switching models. Low CTR alone does not indicate awareness value.",
  },
  {
    type: "true-false",
    question:
      "Incrementality tests provide causal evidence of a channel's impact, while attribution models show correlational relationships.",
    correctAnswer: true,
    explanation:
      "Attribution models show correlation — which channels are present in converting journeys. Incrementality tests (hold-out experiments) provide causal evidence by measuring what happens when a channel is removed.",
  },
];
