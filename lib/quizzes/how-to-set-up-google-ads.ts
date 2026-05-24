import type { QuizQuestion } from "@/lib/academy-data";

export const howToSetUpGoogleAdsQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question:
      "When creating a new Google Ads account, which mode should you switch to immediately for full control over campaign settings?",
    options: [
      "Smart Mode",
      "Expert Mode",
      "Basic Mode",
      "Automated Mode",
    ],
    correctIndex: 1,
    explanation:
      "Expert Mode gives you full control over campaign settings, bidding strategies, keyword match types, and ad group structure. Smart Mode hides most controls and automates decisions, which limits your ability to optimize effectively.",
  },
  {
    type: "multiple-choice",
    question:
      "In Google Ads, what is the correct hierarchy of account structure from top to bottom?",
    options: [
      "Ad Groups > Campaigns > Keywords > Ads",
      "Campaigns > Ad Groups > Keywords & Ads",
      "Account > Keywords > Campaigns > Ad Groups",
      "Campaigns > Keywords > Ad Groups > Ads",
    ],
    correctIndex: 1,
    explanation:
      "Google Ads follows a three-tier hierarchy: Campaigns (where you set budget, bidding, and geo targeting), Ad Groups (where you group related keywords and ads by theme), and Keywords & Ads at the bottom level. Each ad group should focus on a single theme.",
  },
  {
    type: "multiple-choice",
    question:
      "Which keyword match type gives you the most control by only showing ads for very close variants of your exact keyword?",
    options: [
      "Broad match",
      "Phrase match (\"keyword\")",
      "Exact match ([keyword])",
      "Negative match",
    ],
    correctIndex: 2,
    explanation:
      "Exact match, denoted by brackets like [ac repair near me], only triggers your ad for searches that closely match your keyword. This gives the highest relevance and typically the best conversion rates, though with lower volume than broader match types.",
  },
  {
    type: "true-false",
    question:
      "Responsive Search Ads allow you to provide up to 15 headlines and 4 descriptions, and Google automatically tests different combinations.",
    correctAnswer: true,
    explanation:
      "RSAs accept up to 15 headlines (30 characters each) and 4 descriptions (90 characters each). Google's machine learning tests different combinations to find which perform best for different search queries and users.",
  },
  {
    type: "true-false",
    question:
      "Google Ads may spend up to 2x your daily budget on high-traffic days, but will never exceed your monthly limit (daily budget x 30.4).",
    correctAnswer: true,
    explanation:
      "Google can overspend up to 2x your daily budget on days with high search volume to capture demand, but your monthly total will never exceed your daily budget multiplied by 30.4 (the average number of days in a month).",
  },
  {
    type: "multi-select",
    question:
      "Which of the following should you track as conversions for a local service business? (Select all that apply)",
    options: [
      "Form submissions on your website",
      "Phone calls from ad extensions",
      "Phone calls from your website",
      "Page views on your homepage",
      "Chat initiations",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "For service businesses, track form submissions, phone calls from ads, phone calls from your website (via call tracking), and chat initiations as conversions. Homepage page views are not meaningful conversions — they don't indicate a lead or customer action.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are recommended practices when setting up a new Google Ads account? (Select all that apply)",
    options: [
      "Switch to Expert Mode immediately",
      "Skip the guided campaign setup and configure from scratch",
      "Link your Google Analytics property before launching",
      "Set your time zone carefully since it cannot be changed later",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "All four are recommended. Expert Mode gives full control, skipping the guided setup prevents a poorly configured default campaign, linking Analytics provides cross-platform data, and the time zone setting is permanent and affects all reporting.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended bidding strategy progression for a new campaign without any conversion data?",
    options: [
      "Start with Target CPA immediately",
      "Start with Maximize Clicks, then switch to Maximize Conversions after 30+ conversions, then consider Target CPA after 50+ monthly conversions",
      "Always use Manual CPC for full control",
      "Start with Target ROAS from day one",
    ],
    correctIndex: 1,
    explanation:
      "Start with Maximize Clicks to gather data cheaply for 2-4 weeks. Once you have 30+ conversions, switch to Maximize Conversions so the algorithm can optimize. After 50+ monthly conversions, set a Target CPA to control costs. Jumping to Target CPA without data often stalls campaigns.",
  },
  {
    type: "multiple-choice",
    question:
      "When setting up conversion tracking, what counting method should you use for lead generation (form submissions, phone calls)?",
    options: [
      "Every — count each conversion from the same user",
      "One — count only one conversion per click",
      "Custom — count conversions over $100 only",
      "None — let Google decide automatically",
    ],
    correctIndex: 1,
    explanation:
      "For lead generation, set counting to 'One' per click. If someone submits the same form twice from one ad click, that's still one lead. 'Every' counting is for e-commerce where each purchase is a separate transaction worth tracking.",
  },
  {
    type: "ordering",
    question:
      "Put these Google Ads setup steps in the correct order:",
    items: [
      "Create your Google Ads account in Expert Mode",
      "Set up conversion tracking with the Google tag",
      "Build your campaign structure (campaigns and ad groups)",
      "Add keywords with appropriate match types and negative keywords",
      "Write Responsive Search Ads and add ad extensions",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "Start by creating the account in Expert Mode. Install conversion tracking BEFORE launching any campaigns so you can measure results from day one. Then build your campaign structure, add keywords, and finally write your ads with extensions.",
  },
];
