import type { QuizQuestion } from "@/lib/academy-data";

export const howToSetUpFacebookAdsQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question:
      "Why should you use Meta Business Manager instead of running ads from a personal Facebook account?",
    options: [
      "It's Meta's billing portal for ads over $500/month",
      "It separates business assets from personal profiles, provides team permissions, audit logs, and better security",
      "It's a free analytics tool replacing Google Analytics",
      "It's only for scheduling organic posts",
    ],
    correctIndex: 1,
    explanation:
      "Meta Business Manager separates business assets (ad accounts, Pages, pixels) from personal profiles. It allows team/agency access with defined roles, provides audit logs, and protects assets if a personal account is compromised.",
  },
  {
    type: "multiple-choice",
    question:
      "What does the Meta Pixel enable advertisers to do?",
    options: [
      "Block competitor ads on Facebook",
      "Track website visitor actions, enable conversion tracking, build retargeting audiences, and power ad optimization",
      "Measure organic post reach only",
      "Create Instagram Stories ads exclusively",
    ],
    correctIndex: 1,
    explanation:
      "The Meta Pixel is a JavaScript snippet placed on your website that tracks standard events (Purchase, Lead, ViewContent, AddToCart). It powers conversion tracking, website custom audiences for retargeting, lookalike audiences, and the optimization algorithm.",
  },
  {
    type: "true-false",
    question:
      "In Meta Ads Manager, the campaign level is where you set your objective, while audience targeting and placements are set at the ad set level.",
    correctAnswer: true,
    explanation:
      "Meta Ads follow a three-level structure: Campaign (objective + optional CBO budget), Ad Set (budget, schedule, audience, placements, optimization event), and Ad (creative, copy, CTA, destination URL).",
  },
  {
    type: "multiple-choice",
    question:
      "What is a Lookalike Audience and what source size is recommended?",
    options: [
      "A list of competitor customers; minimum 10 people",
      "Auto-generated from page likes; no source needed",
      "People who share characteristics with your source audience; 1,000-50,000 high-quality source users recommended",
      "Only available to advertisers spending over $10,000/month",
    ],
    correctIndex: 2,
    explanation:
      "Lookalike Audiences let Meta find new users resembling your best customers. While the minimum is 100 people from one country, 1,000-50,000 high-quality source users (purchasers, not all visitors) produces the best results. You can select 1%-10% similarity range.",
  },
  {
    type: "true-false",
    question:
      "Meta recommends keeping ad creative unchanged for the entire campaign duration to avoid resetting the learning phase.",
    correctAnswer: false,
    explanation:
      "While significant ad set changes can reset learning, Meta recommends refreshing creative regularly to combat ad fatigue. Creative refresh is standard practice, especially in retargeting campaigns where the same audience sees ads repeatedly.",
  },
  {
    type: "multi-select",
    question:
      "Which are valid Meta Ads targeting options at the ad set level? (Select all that apply)",
    options: [
      "Location (country, region, city, zip code)",
      "Detailed targeting (interests, behaviors, demographics)",
      "Custom Audiences (website visitors, customer lists)",
      "Keyword targeting (like Google Ads search keywords)",
      "Lookalike Audiences",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Meta offers location, detailed targeting, Custom Audiences, and Lookalike Audiences. Meta does NOT offer keyword-based search targeting — that's a Google/Bing Ads feature. Meta targets people based on who they are, not what they search for.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are Meta Ads campaign objectives? (Select all that apply)",
    options: [
      "Awareness",
      "Traffic",
      "Leads",
      "Organic Reach",
      "Sales",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Meta's campaign objectives include Awareness, Traffic, Engagement, Leads, App Promotion, and Sales. 'Organic Reach' is not a paid campaign objective — organic reach refers to unpaid post distribution.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the difference between CBO and ABO in Meta Ads?",
    options: [
      "CBO is for video ads; ABO is for image ads",
      "CBO sets one budget at campaign level with auto-distribution; ABO sets individual budgets per ad set",
      "CBO requires $1,000/day minimum; ABO has no minimum",
      "No functional difference",
    ],
    correctIndex: 1,
    explanation:
      "With CBO (Advantage Campaign Budget), you set one budget and Meta distributes spend to best-performing ad sets. With ABO, you control each ad set's budget individually. CBO is efficient for algorithm optimization; ABO gives guaranteed spend control.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the Meta Ads 'learning phase' and when does it end?",
    options: [
      "A 30-day mandatory review before ads go live",
      "When the algorithm explores delivery; ends after ~50 optimization events in 7 days",
      "Only applies to new advertisers",
      "Meta's A/B testing period lasting exactly 14 days",
    ],
    correctIndex: 1,
    explanation:
      "When you create or significantly edit an ad set, Meta enters a learning phase. Performance is less stable during this period. The ad set exits learning after accumulating ~50 optimization events within 7 days. Avoid major edits during learning.",
  },
  {
    type: "ordering",
    question:
      "Put these steps in the correct order for launching your first Meta Ads campaign:",
    items: [
      "Create your Meta Business Manager account and ad account",
      "Install the Meta Pixel on your website and verify it fires",
      "Create a campaign and select your objective",
      "Configure your ad set: audience, placements, budget, schedule",
      "Upload ad creative and write copy, then publish",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "Start with Business Manager setup, install the Pixel for conversion tracking, then create your campaign with objective, configure the ad set with targeting and budget, and finally add your creative and publish.",
  },
];
