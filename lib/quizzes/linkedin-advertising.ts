import type { QuizQuestion } from "@/lib/academy-data";

export const linkedinAdvertisingQuiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "Approximately how many professionals are on the LinkedIn platform?",
    options: [
      "100 million",
      "500 million",
      "Over 1 billion",
      "Over 3 billion",
    ],
    correctIndex: 2,
    explanation:
      "LinkedIn has over 1 billion professionals across 200+ countries, making it the largest professional networking platform and the premier destination for B2B advertising.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the typical average cost-per-click range on LinkedIn compared to other platforms?",
    options: [
      "$0.50-$1",
      "$1-$3",
      "$5-$15",
      "$20-$50",
    ],
    correctIndex: 2,
    explanation:
      "LinkedIn typically has a $5-15 average CPC, significantly higher than Meta ($1-3). The premium is justified by the quality of professional targeting data and the typically higher value of B2B leads.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the minimum average deal size recommended for LinkedIn advertising to be economically viable?",
    options: ["$500", "$1,000", "$5,000", "$50,000"],
    correctIndex: 2,
    explanation:
      "LinkedIn is ideal when your average deal size exceeds $5,000. The higher CPCs are justified when the lifetime value of each customer is substantial enough to support the acquisition cost.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the self-serve platform for managing LinkedIn ad campaigns?",
    options: [
      "LinkedIn Business Suite",
      "LinkedIn Campaign Manager",
      "LinkedIn Ad Studio",
      "LinkedIn Marketing Hub",
    ],
    correctIndex: 1,
    explanation:
      "LinkedIn Campaign Manager is the self-serve platform where advertisers build, launch, and manage campaigns. It follows a hierarchy similar to Meta: Campaign Group, Campaign, and Ad.",
  },
  {
    type: "multiple-choice",
    question:
      "What makes LinkedIn's targeting data uniquely accurate compared to other platforms?",
    options: [
      "LinkedIn uses advanced AI to guess user information",
      "Members self-report their professional details",
      "LinkedIn buys data from credit bureaus",
      "Employers verify all member profiles",
    ],
    correctIndex: 1,
    explanation:
      "LinkedIn members self-report their professional details — job titles, companies, skills, education — creating the most accurate first-party B2B audience data available on any advertising platform.",
  },
  {
    type: "multiple-choice",
    question:
      "Which type of business typically sees the LEAST return from LinkedIn advertising?",
    options: [
      "SaaS companies",
      "Professional services firms",
      "Consumer products with low price points",
      "B2B manufacturers",
    ],
    correctIndex: 2,
    explanation:
      "Consumer-focused products with low price points see the least return on LinkedIn because the higher CPCs make it difficult to achieve profitable economics when the average order value is low.",
  },
  {
    type: "true-false",
    question:
      "LinkedIn advertising is only effective for companies with large advertising budgets.",
    correctAnswer: false,
    explanation:
      "While LinkedIn CPCs are higher, Campaign Manager gives full control for any budget. Even small-budget campaigns can be effective when targeting is precise and the deal value justifies the cost per lead.",
  },
  {
    type: "true-false",
    question:
      "LinkedIn's value in advertising lies primarily in its unmatched professional targeting data.",
    correctAnswer: true,
    explanation:
      "LinkedIn's unique value proposition is its professional targeting data — job titles, company size, industry, seniority, skills, and specific company names — which no other platform can match.",
  },
  {
    type: "multi-select",
    question:
      "Which types of businesses typically see strong returns from LinkedIn advertising? (Select all that apply)",
    options: [
      "SaaS companies",
      "Professional services firms",
      "Fast food restaurants",
      "Recruiting agencies",
      "B2B manufacturers",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "SaaS companies, professional services, recruiting agencies, and B2B manufacturers all target professional decision-makers — LinkedIn's core strength. Fast food restaurants would be better served by consumer-facing platforms.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are advantages of LinkedIn advertising over consumer platforms? (Select all that apply)",
    options: [
      "Lower cost-per-click",
      "Professional targeting by job title and seniority",
      "Company-level targeting for ABM",
      "Higher quality B2B leads",
      "Larger total audience size",
    ],
    correctIndices: [1, 2, 3],
    explanation:
      "LinkedIn offers superior professional targeting, company-level targeting for ABM, and higher quality B2B leads. However, it has higher CPCs and a smaller total audience compared to Meta.",
  },
  {
    type: "ordering",
    question:
      "Arrange the LinkedIn Campaign Manager hierarchy from top level to bottom level.",
    items: ["Campaign Group", "Campaign", "Ad"],
    correctOrder: [0, 1, 2],
    explanation:
      "LinkedIn's hierarchy flows from Campaign Group (budget and scheduling at the highest level) to Campaign (objective, targeting, bidding) to Ad (creative and copy).",
  },
  {
    type: "ordering",
    question:
      "Rank these factors in order of importance when deciding whether to use LinkedIn advertising (most important first).",
    items: [
      "Average deal size exceeds $5,000",
      "Target audience includes professional decision-makers",
      "Buying cycle involves multiple stakeholders",
      "Product has strong visual appeal",
    ],
    correctOrder: [1, 0, 2, 3],
    explanation:
      "The most important factor is whether your target audience is professional decision-makers (LinkedIn's core), followed by deal size to justify costs, buying cycle complexity, and visual appeal (least important for B2B).",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "Which LinkedIn targeting approach is the most granular but has the smallest reach?",
    options: [
      "Job Function + Seniority",
      "Industry + Company Size",
      "Job Title targeting",
      "Skills and Member Interests",
    ],
    correctIndex: 2,
    explanation:
      "Job Title targeting is the most granular — targeting specific titles like 'VP of Marketing' — but has the smallest reach because it depends on exact title matches across member profiles.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the maximum number of companies you can upload in a LinkedIn company list for ABM?",
    options: [
      "1,000",
      "10,000",
      "100,000",
      "300,000",
    ],
    correctIndex: 3,
    explanation:
      "LinkedIn allows up to 300,000 companies in a single company list upload for Account-Based Marketing targeting, enabling large-scale ABM campaigns.",
  },
  {
    type: "multiple-choice",
    question:
      "Which LinkedIn ad format delivers messages directly to member inboxes?",
    options: [
      "Sponsored Content",
      "Text Ads",
      "Message Ads and Conversation Ads",
      "Dynamic Ads",
    ],
    correctIndex: 2,
    explanation:
      "Message Ads and Conversation Ads are delivered directly to LinkedIn inboxes. Message Ads have a single CTA, while Conversation Ads offer branching paths for interactive engagement.",
  },
  {
    type: "multiple-choice",
    question:
      "How often can LinkedIn send a Message Ad to the same member?",
    options: [
      "Once per day",
      "Once per week",
      "Once every 45 days",
      "Once every 90 days",
    ],
    correctIndex: 2,
    explanation:
      "LinkedIn limits Message Ad delivery to one send per member every 45 days to prevent inbox fatigue and maintain high open rates (50%+). This makes timing and targeting crucial.",
  },
  {
    type: "multiple-choice",
    question:
      "What conversion rate advantage do Lead Gen Forms typically have over off-platform forms?",
    options: [
      "Same conversion rate",
      "1.5x higher",
      "2-5x higher",
      "10x higher",
    ],
    correctIndex: 2,
    explanation:
      "Lead Gen Forms achieve 2-5x higher conversion rates than off-platform forms because they pre-fill with the member's profile data, eliminating the friction of landing pages and manual form filling.",
  },
  {
    type: "multiple-choice",
    question:
      "Where do LinkedIn Text Ads appear?",
    options: [
      "In the mobile feed",
      "In the right rail on desktop",
      "In LinkedIn inboxes",
      "In LinkedIn Stories",
    ],
    correctIndex: 1,
    explanation:
      "Text Ads appear in the right rail on desktop LinkedIn. They have low cost but also low engagement compared to Sponsored Content, which appears natively in the feed.",
  },
  {
    type: "true-false",
    question:
      "LinkedIn Lead Gen Forms use member profile data to pre-fill form fields automatically.",
    correctAnswer: true,
    explanation:
      "Lead Gen Forms automatically pre-fill with the member's LinkedIn profile data (name, email, job title, company, etc.), making them the lowest-friction lead capture method on the platform.",
  },
  {
    type: "true-false",
    question:
      "Sponsored Content ads on LinkedIn can only use single image format.",
    correctAnswer: false,
    explanation:
      "Sponsored Content supports multiple formats: single image, video, carousel, document, and event. It is the most versatile and widely used LinkedIn ad format.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are LinkedIn targeting dimensions? (Select all that apply)",
    options: [
      "Job Title",
      "Job Function + Seniority",
      "Company Name / Company List",
      "Personal hobbies and entertainment preferences",
      "Industry and Company Size",
      "Skills and Member Interests",
    ],
    correctIndices: [0, 1, 2, 4, 5],
    explanation:
      "LinkedIn offers professional targeting by job title, function/seniority, company name/list, industry/size, and skills/interests. Personal hobbies and entertainment preferences are more relevant to consumer platforms like Meta.",
  },
  {
    type: "multi-select",
    question:
      "Which LinkedIn ad formats appear natively in the feed? (Select all that apply)",
    options: [
      "Single image Sponsored Content",
      "Video Sponsored Content",
      "Carousel Sponsored Content",
      "Text Ads",
      "Document Ads",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Sponsored Content (single image, video, carousel, and document) all appear natively in the LinkedIn feed. Text Ads appear in the right rail on desktop, not in the feed.",
  },
  {
    type: "ordering",
    question:
      "Order these LinkedIn targeting approaches from most granular to broadest reach.",
    items: [
      "Job Title targeting",
      "Job Function + Seniority",
      "Industry + Company Size",
      "Skills and Member Interests",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Job titles are most specific (exact title match), function/seniority is broader (all VPs in Marketing), industry/size captures entire segments, and skills/interests cast the widest net across professional topics.",
  },
  {
    type: "ordering",
    question:
      "Rank these LinkedIn ad formats by typical engagement rate (highest first).",
    items: [
      "Sponsored Content (video)",
      "Sponsored Content (single image)",
      "Message Ads",
      "Text Ads",
    ],
    correctOrder: [0, 2, 1, 3],
    explanation:
      "Video Sponsored Content drives the highest engagement through rich storytelling. Message Ads have high open rates (50%+). Single image Sponsored Content has solid feed engagement. Text Ads have the lowest engagement due to their small, non-feed placement.",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What is Account-Based Marketing (ABM) on LinkedIn?",
    options: [
      "Running ads to all LinkedIn members simultaneously",
      "Targeting specific companies and roles within those companies",
      "Only advertising to your existing customers",
      "Managing multiple LinkedIn company pages",
    ],
    correctIndex: 1,
    explanation:
      "ABM on LinkedIn involves uploading a list of target accounts (companies), then layering job function and seniority to reach the buying committee within those organizations. It aligns advertising with sales outreach.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the minimum daily budget per campaign on LinkedIn?",
    options: ["$1", "$5", "$10", "$25"],
    correctIndex: 2,
    explanation:
      "LinkedIn requires a minimum daily budget of $10 per campaign. However, for meaningful data collection, at least $50-100 per day per campaign is recommended.",
  },
  {
    type: "multiple-choice",
    question:
      "Which LinkedIn bidding option sets bids automatically to maximize results within your budget?",
    options: [
      "Manual Bidding",
      "Cost Cap",
      "Maximum Delivery",
      "Enhanced CPC",
    ],
    correctIndex: 2,
    explanation:
      "Maximum Delivery is LinkedIn's automated bidding option that sets bids to maximize results within your budget. It is recommended for most campaigns as it leverages LinkedIn's optimization algorithms.",
  },
  {
    type: "multiple-choice",
    question:
      "If your average deal is $50,000 with a 20% close rate, what is the expected value per lead?",
    options: ["$2,500", "$5,000", "$10,000", "$25,000"],
    correctIndex: 2,
    explanation:
      "Expected value per lead = Average deal size x Close rate = $50,000 x 20% = $10,000. A $200 cost per lead against a $10,000 expected value represents a 50:1 ratio — highly profitable.",
  },
  {
    type: "multiple-choice",
    question:
      "What is Matched Audiences on LinkedIn?",
    options: [
      "Audiences created by LinkedIn's algorithm",
      "A feature combining company lists, website retargeting, and contact lists",
      "Audiences based solely on job titles",
      "Audiences matched to your ad creative preferences",
    ],
    correctIndex: 1,
    explanation:
      "Matched Audiences is LinkedIn's feature for combining company lists, website retargeting (via the Insight Tag), and contact list uploads into a closed-loop system for account-based advertising.",
  },
  {
    type: "multiple-choice",
    question:
      "Why are prospects more likely to engage with a cold email if they have already seen your LinkedIn ads?",
    options: [
      "LinkedIn sends email notifications about ads",
      "Ad exposure builds brand familiarity and credibility before outreach",
      "LinkedIn shares your contact information with prospects",
      "Cold emails are automatically personalized based on ad views",
    ],
    correctIndex: 1,
    explanation:
      "LinkedIn ads warm up target accounts by building brand familiarity. When sales reps then reach out via email, prospects already recognize the brand, making them significantly more likely to engage.",
  },
  {
    type: "true-false",
    question:
      "For meaningful data on LinkedIn, you should plan at least $50-100 per day per campaign.",
    correctAnswer: true,
    explanation:
      "While the minimum daily budget is $10, at least $50-100 per day per campaign is recommended to generate enough impressions and clicks for meaningful performance data and optimization insights.",
  },
  {
    type: "true-false",
    question:
      "Cost Cap bidding on LinkedIn guarantees you will never pay more than your specified CPA target.",
    correctAnswer: false,
    explanation:
      "Cost Cap sets a target CPA ceiling that LinkedIn aims to achieve on average, but individual conversions may cost more or less. It is a guide for the algorithm, not a hard cap on every single conversion.",
  },
  {
    type: "multi-select",
    question:
      "Which elements make up LinkedIn's Matched Audiences? (Select all that apply)",
    options: [
      "Company list uploads",
      "Website retargeting",
      "Contact list uploads",
      "Social media follower matching",
      "Engagement retargeting",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Matched Audiences combines company lists, website retargeting (via Insight Tag), contact list uploads, and engagement retargeting. Social media follower matching across other platforms is not a LinkedIn feature.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are LinkedIn bidding options? (Select all that apply)",
    options: [
      "Maximum Delivery",
      "Cost Cap",
      "Manual Bidding",
      "Target ROAS",
      "Maximize Impressions",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "LinkedIn offers Maximum Delivery (automated), Cost Cap (target CPA), and Manual Bidding (full control). Target ROAS and Maximize Impressions are Google Ads strategies, not LinkedIn options.",
  },
  {
    type: "ordering",
    question:
      "Arrange the steps of an ABM strategy on LinkedIn in the correct order.",
    items: [
      "Upload target company list",
      "Layer job function and seniority targeting",
      "Launch ads to warm up accounts",
      "Coordinate with sales team for outreach",
      "Retarget engaged prospects",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "ABM starts with uploading target companies, narrowing by role, running awareness ads, coordinating with sales for direct outreach, and retargeting those who engaged with your content.",
  },
  {
    type: "ordering",
    question:
      "Calculate and rank these lead economics from lowest to highest cost per lead.",
    items: [
      "$50,000 deal size, 25% close rate, targeting $500 CPL",
      "$20,000 deal size, 10% close rate, targeting $200 CPL",
      "$100,000 deal size, 15% close rate, targeting $300 CPL",
    ],
    correctOrder: [1, 2, 0],
    explanation:
      "Ranked by CPL: $200 (ROI = $2,000/$200 = 10:1), $300 (ROI = $15,000/$300 = 50:1), $500 (ROI = $12,500/$500 = 25:1). Despite higher CPL, the third option still has excellent ROI. Order is by absolute cost per lead.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "How many characters of introductory text are visible before the 'see more' truncation on LinkedIn Sponsored Content?",
    options: ["50 characters", "100 characters", "150 characters", "300 characters"],
    correctIndex: 2,
    explanation:
      "Only 150 characters are visible before LinkedIn truncates with 'see more.' Your hook must be delivered within these characters to capture attention before the cutoff.",
  },
  {
    type: "multiple-choice",
    question:
      "Which LinkedIn ad format drives extremely high engagement and dwell time, making it perfect for frameworks and playbooks?",
    options: [
      "Single image ads",
      "Video ads",
      "Document ads (PDF carousels)",
      "Text ads",
    ],
    correctIndex: 2,
    explanation:
      "Document ads (PDF carousels) drive extremely high engagement and dwell time on LinkedIn because users can swipe through multiple pages of valuable content directly in the feed.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the LinkedIn Insight Tag?",
    options: [
      "A social sharing button for LinkedIn",
      "A lightweight JavaScript tag for conversion tracking, retargeting, and demographic reporting",
      "A LinkedIn analytics dashboard",
      "An email tracking tool for LinkedIn messages",
    ],
    correctIndex: 1,
    explanation:
      "The Insight Tag is a lightweight JavaScript snippet installed site-wide that tracks conversions, enables website retargeting, and provides demographic reporting showing which professionals visit your site.",
  },
  {
    type: "multiple-choice",
    question:
      "Why is LinkedIn's Conversions API critical for B2B companies?",
    options: [
      "It replaces the need for a website",
      "It sends offline conversions and CRM events back to LinkedIn for optimization",
      "It automatically creates ad copy",
      "It connects LinkedIn to social media platforms",
    ],
    correctIndex: 1,
    explanation:
      "For B2B companies where real conversions (closed deals) happen weeks or months after the click, CAPI sends downstream pipeline data back to LinkedIn, enabling optimization on actual business outcomes rather than just form fills.",
  },
  {
    type: "multiple-choice",
    question:
      "What type of images perform best in LinkedIn Sponsored Content?",
    options: [
      "Stock photography with generic themes",
      "Images with people, using bright colors that stand out against LinkedIn's interface",
      "Black and white photography",
      "Screenshots of your product dashboard",
    ],
    correctIndex: 1,
    explanation:
      "Images featuring real people outperform stock graphics, and bright colors help ads stand out against LinkedIn's predominantly blue and white interface.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended deployment method for the LinkedIn Insight Tag?",
    options: [
      "Manual HTML code insertion",
      "WordPress plugin only",
      "Google Tag Manager",
      "LinkedIn mobile app",
    ],
    correctIndex: 2,
    explanation:
      "Google Tag Manager is recommended for clean deployment of the Insight Tag. It simplifies installation, allows easy management alongside other tags, and provides straightforward troubleshooting.",
  },
  {
    type: "true-false",
    question:
      "Document ads on LinkedIn require users to leave the platform to view the PDF content.",
    correctAnswer: false,
    explanation:
      "Document ads allow users to swipe through PDF content directly within the LinkedIn feed, which is why they drive such high dwell time and engagement — there is no need to leave the platform.",
  },
  {
    type: "true-false",
    question:
      "LinkedIn Lead Gen Form submissions can be connected directly to CRM platforms like HubSpot and Salesforce.",
    correctAnswer: true,
    explanation:
      "Lead Gen Forms integrate directly with CRM platforms via native integrations or tools like Zapier, ensuring sales teams receive leads instantly for rapid follow-up.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are best practices for LinkedIn ad creative? (Select all that apply)",
    options: [
      "Lead with a specific stat or bold claim",
      "Keep introductory text under 150 characters for the hook",
      "Use only generic stock photography",
      "Use bright colors that contrast with LinkedIn's interface",
      "Write long paragraphs in the ad copy",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Best practices include leading with stats, staying under 150 characters for the visible hook, and using bright contrasting colors. Generic stock photos underperform and long paragraphs get truncated.",
  },
  {
    type: "multi-select",
    question:
      "Which LinkedIn tracking methods should be implemented for complete measurement? (Select all that apply)",
    options: [
      "LinkedIn Insight Tag",
      "Conversions API",
      "CRM integration for Lead Gen Forms",
      "Facebook Pixel",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Complete LinkedIn measurement requires the Insight Tag (website tracking), Conversions API (server-side/offline events), and CRM integration (lead routing). The Facebook Pixel is a Meta tool, not a LinkedIn one.",
  },
  {
    type: "ordering",
    question:
      "Arrange the steps for setting up LinkedIn conversion tracking from first to last.",
    items: [
      "Install the LinkedIn Insight Tag via Google Tag Manager",
      "Define conversion actions in Campaign Manager",
      "Implement Conversions API for offline events",
      "Connect Lead Gen Forms to your CRM",
      "Verify tracking is firing correctly",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "Start with the Insight Tag for website tracking, define what counts as a conversion, add server-side CAPI for offline events, connect lead forms to your CRM, and verify everything works before relying on the data.",
  },
  {
    type: "ordering",
    question:
      "Rank these LinkedIn creative formats by their typical content depth (most in-depth first).",
    items: [
      "Document ads (PDF carousels)",
      "Video Sponsored Content",
      "Single image Sponsored Content",
      "Text Ads",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Document ads offer the most in-depth content with multiple swipeable pages. Video can tell a rich story. Single image ads convey a focused message. Text Ads are the most limited in content depth.",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What is the benchmark CTR range for LinkedIn Sponsored Content?",
    options: ["0.1-0.2%", "0.4-0.6%", "1-2%", "3-5%"],
    correctIndex: 1,
    explanation:
      "LinkedIn Sponsored Content benchmarks at 0.4-0.6% CTR. Below 0.35% signals poor creative or targeting. These are lower than search ads because LinkedIn is an interruption-based platform.",
  },
  {
    type: "multiple-choice",
    question:
      "What is a typical cost per lead range for B2B SaaS on LinkedIn?",
    options: ["$5-$15", "$20-$30", "$50-$150", "$500-$1,000"],
    correctIndex: 2,
    explanation:
      "$50-$150 is a typical CPL range for B2B SaaS on LinkedIn. However, this should always be evaluated against lead quality and downstream conversion rates rather than in isolation.",
  },
  {
    type: "multiple-choice",
    question:
      "Which metric reveals true targeting quality on LinkedIn by tracking what happens after lead capture?",
    options: [
      "Click-Through Rate",
      "Cost Per Click",
      "Lead-to-Opportunity Rate",
      "Impressions",
    ],
    correctIndex: 2,
    explanation:
      "Lead-to-Opportunity Rate tracks what percentage of LinkedIn leads become qualified opportunities in your CRM. This reveals whether your targeting is reaching the right people, not just generating form fills.",
  },
  {
    type: "multiple-choice",
    question:
      "What unique reporting capability does LinkedIn offer that other platforms lack?",
    options: [
      "Keyword-level performance data",
      "Demographic reporting showing which job titles, companies, and industries engaged",
      "Real-time auction insights",
      "Page load speed analytics",
    ],
    correctIndex: 1,
    explanation:
      "LinkedIn's demographic reporting shows exactly which job titles, companies, and industries interacted with your ads — data unavailable on other platforms. This informs targeting refinement and sales outreach.",
  },
  {
    type: "multiple-choice",
    question:
      "During weeks 1-2 of a new LinkedIn campaign, what is the recommended approach?",
    options: [
      "Make daily bid adjustments",
      "Let campaigns run with minimal changes to gather data",
      "Increase budget by 50% to accelerate learning",
      "Pause any ads with CTR below 1%",
    ],
    correctIndex: 1,
    explanation:
      "During the first 1-2 weeks, let campaigns run with minimal changes to gather sufficient data. Making premature changes prevents the algorithm from learning and leads to unreliable performance conclusions.",
  },
  {
    type: "multiple-choice",
    question:
      "What is 'Pipeline Influenced' as a LinkedIn metric?",
    options: [
      "Total number of LinkedIn impressions",
      "Total pipeline value where LinkedIn was a touchpoint",
      "The number of leads generated per campaign",
      "LinkedIn's estimated campaign impact score",
    ],
    correctIndex: 1,
    explanation:
      "Pipeline Influenced measures the total pipeline value (potential revenue) where LinkedIn advertising was one of the touchpoints in the buyer journey. It requires CRM attribution modeling to track accurately.",
  },
  {
    type: "true-false",
    question:
      "Judging LinkedIn campaigns solely on cost-per-lead provides a complete picture of performance.",
    correctAnswer: false,
    explanation:
      "Cost-per-lead alone ignores lead quality and downstream conversion. LinkedIn leads often convert at higher rates and larger deal sizes than leads from cheaper platforms, making CPL an incomplete metric.",
  },
  {
    type: "true-false",
    question:
      "Feeding closed-won CRM data back to LinkedIn helps optimize Lookalike audiences and Conversions API performance.",
    correctAnswer: true,
    explanation:
      "Sending closed-won deal data back to LinkedIn helps the algorithm understand which leads ultimately become customers, improving Lookalike audience quality and enabling optimization on downstream business outcomes.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are key metrics to track for LinkedIn advertising? (Select all that apply)",
    options: [
      "CTR",
      "Cost Per Lead",
      "Lead-to-Opportunity Rate",
      "Page likes",
      "Pipeline Influenced",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "CTR, CPL, Lead-to-Opportunity Rate, and Pipeline Influenced are the key LinkedIn metrics. Page likes are a vanity metric that does not directly indicate advertising effectiveness or business impact.",
  },
  {
    type: "multi-select",
    question:
      "Which optimization actions should happen during weeks 2-3 of a LinkedIn campaign? (Select all that apply)",
    options: [
      "Analyze demographic reports",
      "Identify top-performing job titles and industries",
      "Completely rebuild the campaign from scratch",
      "Exclude poor-performing segments",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "During weeks 2-3, analyze demographic data to see which job titles and industries engage most, then exclude underperformers. Rebuilding from scratch would lose all learning data and reset optimization.",
  },
  {
    type: "ordering",
    question:
      "Arrange the LinkedIn optimization timeline in the correct order.",
    items: [
      "Let campaigns gather data (Weeks 1-2)",
      "Analyze demographics and exclude poor performers (Weeks 2-3)",
      "Refresh creative and adjust bidding (Weeks 3-4)",
      "Review lead quality with sales and feed data back (Monthly)",
      "Audit structure and update company lists (Quarterly)",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "Optimization follows a progressive timeline: gather data first, then refine targeting, adjust creative and bidding, align with sales monthly, and conduct full audits quarterly.",
  },
  {
    type: "ordering",
    question:
      "Rank these LinkedIn metrics by how far downstream in the sales funnel they measure (furthest downstream first).",
    items: [
      "Pipeline Influenced (revenue impact)",
      "Lead-to-Opportunity Rate",
      "Cost Per Lead",
      "Click-Through Rate",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Pipeline Influenced measures actual revenue impact (furthest downstream), Lead-to-Opportunity tracks CRM qualification, CPL measures initial lead capture, and CTR measures initial ad engagement (most upstream).",
  },
];
