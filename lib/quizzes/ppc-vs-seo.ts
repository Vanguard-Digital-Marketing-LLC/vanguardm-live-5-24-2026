import type { QuizQuestion } from "@/lib/academy-data";

export const ppcVsSeoQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question:
      "What is the most significant advantage PPC has over SEO for a brand new business?",
    options: [
      "PPC traffic is free once campaigns are set up",
      "PPC delivers immediate visibility at the top of search results from day one",
      "PPC rankings are permanent once achieved",
      "PPC builds long-term domain authority",
    ],
    correctIndex: 1,
    explanation:
      "PPC ads can appear at the top of search results within hours of launch, while SEO typically takes 3-6 months or longer. This makes PPC the right choice when speed to market matters.",
  },
  {
    type: "multiple-choice",
    question:
      "What happens to your PPC traffic when you stop spending?",
    options: [
      "Traffic declines gradually over 30 days",
      "Traffic stops almost immediately",
      "Traffic continues for 7 days",
      "Google redistributes your budget to similar advertisers",
    ],
    correctIndex: 1,
    explanation:
      "PPC traffic depends entirely on active spending. When you pause campaigns or exhaust your budget, ads stop showing and traffic drops to zero. SEO traffic continues flowing even if you stop investing.",
  },
  {
    type: "multiple-choice",
    question:
      "Which metric best describes the long-term ROI advantage of SEO over PPC?",
    options: [
      "SEO has a higher cost per click",
      "SEO generates compounding returns — content continues ranking and driving traffic without per-click cost",
      "SEO produces faster conversion rates",
      "SEO requires less upfront investment",
    ],
    correctIndex: 1,
    explanation:
      "SEO's advantage is compounding returns. A well-optimized page can drive free organic traffic for years. PPC requires continuous spend, so costs never decrease — but SEO's effective cost per visitor drops over time.",
  },
  {
    type: "true-false",
    question:
      "SEO is completely free because you don't pay per click like PPC.",
    correctAnswer: false,
    explanation:
      "SEO requires investment in content creation, technical optimization, link building, and ongoing management. The distinction is no per-click cost, but overall investment can be substantial.",
  },
  {
    type: "true-false",
    question:
      "PPC data such as which keywords generate clicks and conversions can directly inform your SEO keyword strategy.",
    correctAnswer: true,
    explanation:
      "PPC provides real conversion data on which keywords drive business outcomes. This data is invaluable for prioritizing SEO content — invest in ranking organically for keywords already proven to convert in paid campaigns.",
  },
  {
    type: "multi-select",
    question:
      "Which situations call for prioritizing PPC over SEO? (Select all that apply)",
    options: [
      "Launching a new product with no existing domain authority",
      "Running a seasonal promotion with a fixed end date",
      "Building long-term brand awareness at the lowest possible cost",
      "Testing whether a new service generates enough demand before investing in content",
      "Targeting highly competitive keywords where organic ranking would take years",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "PPC is better for speed (new launches, time-limited promotions), demand validation, and competing in markets where organic ranking is slow. Long-term brand awareness at lowest cost is better served by SEO.",
  },
  {
    type: "multi-select",
    question:
      "Which are characteristics of SEO traffic vs PPC traffic? (Select all that apply)",
    options: [
      "Stops immediately when you stop paying",
      "Builds over time and compounds as content matures",
      "Generates sustained traffic without ongoing per-click spend",
      "Provides immediate results from day one",
      "Typically has a lower cost per visitor over the long term",
    ],
    correctIndices: [1, 2, 4],
    explanation:
      "SEO traffic compounds over time, continues without per-click costs, and becomes cheaper per visitor as content matures. Stopping when payment stops and delivering day-one results are PPC characteristics.",
  },
  {
    type: "multiple-choice",
    question:
      "When running both PPC and SEO for the same keyword, what combined benefit is typically observed?",
    options: [
      "PPC campaigns lower organic rankings",
      "Organic rankings replace paid ads, eliminating PPC need",
      "Owning both paid and organic positions increases brand credibility and overall SERP real estate",
      "Google penalizes sites appearing in both paid and organic results",
    ],
    correctIndex: 2,
    explanation:
      "Appearing in both paid ads and organic results increases brand visibility and trust. Studies show combined SERP presence can increase total click-through rates beyond what either channel achieves alone.",
  },
  {
    type: "multiple-choice",
    question:
      "A time-sensitive promotion ending in two weeks is best served by which channel?",
    options: [
      "SEO, because it builds sustainable traffic",
      "PPC, because campaigns can launch quickly and stop when the promotion ends",
      "SEO, because it targets high-intent users",
      "PPC, because it permanently increases domain authority",
    ],
    correctIndex: 1,
    explanation:
      "PPC is right for time-limited promotions because campaigns go live within hours and can be paused when the promotion ends. SEO investments take months to build and can't be switched off for short windows.",
  },
  {
    type: "ordering",
    question:
      "Rank these scenarios from best suited for PPC to best suited for SEO:",
    items: [
      "Promoting a 48-hour flash sale",
      "Capturing demand for a competitive service in a new market",
      "Building authority in a niche with low competition over 12 months",
      "Generating recurring organic traffic from a library of how-to content",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Flash sales demand PPC's instant activation. New competitive markets favor PPC for quick visibility. As timelines lengthen and content depth increases, SEO becomes the better investment — especially for evergreen content.",
  },
];
