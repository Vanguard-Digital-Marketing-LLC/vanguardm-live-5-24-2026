import type { QuizQuestion } from "@/lib/academy-data";

export const howMuchDoGoogleAdsCostQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question:
      "What two primary factors combine to determine your Ad Rank in the Google Ads auction?",
    options: [
      "Daily budget and geographic targeting",
      "Maximum bid and Quality Score",
      "Ad format and campaign type",
      "Impression share and CTR",
    ],
    correctIndex: 1,
    explanation:
      "Ad Rank is determined primarily by your maximum bid and Quality Score, along with expected ad extension impact and contextual signals. Higher Quality Score lets you achieve strong positions at a lower actual CPC.",
  },
  {
    type: "multiple-choice",
    question:
      "Approximately what is the average cost-per-click across all industries on Google Search Ads?",
    options: [
      "$0.10 - $0.50",
      "$1 - $2",
      "$2 - $4",
      "$8 - $12",
    ],
    correctIndex: 2,
    explanation:
      "The average CPC across all industries on Google Search falls between $2 and $4. However, this varies dramatically — legal keywords can exceed $50 per click, while retail keywords may cost under $1.",
  },
  {
    type: "multiple-choice",
    question:
      "Which industry historically has some of the highest average CPCs on Google Search Ads?",
    options: [
      "Fashion and apparel",
      "Food and beverage",
      "Legal services",
      "Entertainment and media",
    ],
    correctIndex: 2,
    explanation:
      "Legal services consistently ranks among the highest-CPC industries, with keywords like 'personal injury lawyer' or 'mesothelioma attorney' exceeding $50-$100 per click. This reflects the high lifetime value of a legal client.",
  },
  {
    type: "multiple-choice",
    question:
      "A campaign spends $2,000 and generates $5,000 in revenue. What is the ROAS?",
    options: ["0.25x", "1x", "2.5x", "5x"],
    correctIndex: 2,
    explanation:
      "ROAS = Revenue / Ad Spend = $5,000 / $2,000 = 2.5x. This means the campaign returned $2.50 for every $1 spent. Whether this is profitable depends on profit margins.",
  },
  {
    type: "true-false",
    question:
      "Google Ads requires a minimum daily budget of at least $10 before campaigns can run.",
    correctAnswer: false,
    explanation:
      "Google Ads has no mandatory minimum daily budget. You can run campaigns with as little as $1 per day, though very low budgets significantly limit volume, data collection, and automated bidding effectiveness.",
  },
  {
    type: "true-false",
    question:
      "Improving your landing page experience can lower your actual CPC without changing your maximum bid.",
    correctAnswer: true,
    explanation:
      "Landing page experience is one of the three Quality Score components. A better landing page raises Quality Score, which improves Ad Rank. Higher Ad Rank means you spend less to outrank competitors, lowering your actual CPC.",
  },
  {
    type: "multi-select",
    question:
      "Which tactics directly reduce your cost-per-click in Google Ads? (Select all that apply)",
    options: [
      "Improving ad relevance to increase Quality Score",
      "Adding negative keywords to eliminate wasted spend",
      "Increasing your daily budget cap",
      "Improving landing page speed and relevance",
      "Using tightly themed ad groups with closely matched keywords",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Improving ad relevance, adding negatives, enhancing landing pages, and tight ad group theming all contribute to higher Quality Score and lower CPC. Increasing budget does not lower CPC — it only allows more clicks at the same cost.",
  },
  {
    type: "multi-select",
    question:
      "Which factors does Google consider when calculating your actual CPC? (Select all that apply)",
    options: [
      "Your maximum bid",
      "Your Quality Score",
      "Expected impact of ad extensions",
      "Your total account lifetime spend",
      "Auction-time context signals (device, location)",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Actual CPC is calculated from your max bid, Quality Score, expected extension impact, and real-time context signals. Total lifetime spend is not a factor — each auction is evaluated independently.",
  },
  {
    type: "multiple-choice",
    question:
      "What does a Quality Score of 8/10 mean for your CPC compared to a competitor with a Quality Score of 4/10?",
    options: [
      "Your CPC will be exactly double",
      "Quality Score has no effect on CPC",
      "You can achieve equal or better ad positions at a significantly lower CPC",
      "Google gives you a fixed 40% discount",
    ],
    correctIndex: 2,
    explanation:
      "Higher Quality Score directly lowers actual CPC. In Google's second-price auction, you pay the minimum needed to beat the next Ad Rank. With higher QS, you achieve strong Ad Rank at lower bids, reducing CPC vs low-QS competitors.",
  },
  {
    type: "ordering",
    question:
      "Arrange these steps for calculating whether a Google Ads campaign is profitable:",
    items: [
      "Define your target CPA based on profit margins",
      "Launch campaigns and collect conversion data",
      "Calculate actual CPA (spend / conversions)",
      "Compare actual CPA to target CPA",
      "Scale budget if profitable, or optimize if CPA exceeds target",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "Start by setting a CPA target grounded in margins. Run campaigns to gather data, calculate actual CPA, compare to target, and make scaling or optimization decisions based on the gap.",
  },
];
