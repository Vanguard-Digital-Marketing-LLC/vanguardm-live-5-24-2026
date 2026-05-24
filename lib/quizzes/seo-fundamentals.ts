import type { QuizQuestion } from "@/lib/academy-data";

export const seoFundamentalsQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question: "What does SEO stand for?",
    options: [
      "Search Engine Optimization",
      "Search Engine Operations",
      "Site Enhancement Optimization",
      "Social Engine Outreach",
    ],
    correctIndex: 0,
    explanation:
      "SEO stands for Search Engine Optimization — the practice of improving your website to increase its visibility in search results.",
  },
  {
    type: "multiple-choice",
    question: "What does E-E-A-T stand for in Google's quality guidelines?",
    options: [
      "Engagement, Expertise, Authority, Trust",
      "Experience, Expertise, Authoritativeness, Trustworthiness",
      "External, Expertise, Analysis, Tracking",
      "Experience, Engagement, Analytics, Testing",
    ],
    correctIndex: 1,
    explanation:
      "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness — the framework Google's quality raters use to evaluate content.",
  },
  {
    type: "multiple-choice",
    question: "Which search intent does 'best SEO tools 2026' represent?",
    options: [
      "Informational",
      "Navigational",
      "Commercial",
      "Transactional",
    ],
    correctIndex: 2,
    explanation:
      "This is commercial intent — the user is researching and comparing options before making a purchase decision.",
  },
  {
    type: "multiple-choice",
    question: "What is a sitemap?",
    options: [
      "A visual design of your website layout",
      "An XML file listing pages for search engines to discover",
      "A navigation menu on your website",
      "A report of your site's traffic",
    ],
    correctIndex: 1,
    explanation:
      "A sitemap is an XML file that lists important pages on your site, helping search engines discover and crawl them efficiently.",
  },
  {
    type: "true-false",
    question:
      "HTTPS is a confirmed Google ranking signal.",
    correctAnswer: true,
    explanation:
      "Google confirmed HTTPS as a ranking signal in 2014. It encrypts data between the user and your server, building trust and security.",
  },
  {
    type: "true-false",
    question:
      "Social media follower count is a direct Google ranking factor.",
    correctAnswer: false,
    explanation:
      "Social media follower count is not a direct Google ranking factor. While social signals may correlate with visibility, Google has stated they are not used directly in ranking algorithms.",
  },
  {
    type: "true-false",
    question:
      "Backlinks from other websites act as 'votes of confidence' and are a major ranking factor.",
    correctAnswer: true,
    explanation:
      "Backlinks are links from external websites pointing to your pages. Google treats them as endorsements of your content's quality and relevance, making them one of the most important ranking factors.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are core components of E-E-A-T? (Select all that apply)",
    options: [
      "Experience",
      "Engagement",
      "Expertise",
      "Authoritativeness",
      "Analytics",
      "Trustworthiness",
    ],
    correctIndices: [0, 2, 3, 5],
    explanation:
      "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness. Engagement and Analytics are not part of the framework.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are types of search intent? (Select all that apply)",
    options: [
      "Informational",
      "Navigational",
      "Analytical",
      "Commercial",
      "Transactional",
      "Promotional",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "The four main types of search intent are Informational (learning), Navigational (finding a specific site), Commercial (researching before buying), and Transactional (ready to take action). Analytical and Promotional are not recognized search intent categories.",
  },
  {
    type: "ordering",
    question:
      "Put the three stages of how Google processes web pages in the correct order.",
    items: ["Ranking", "Crawling", "Indexing"],
    correctOrder: [1, 2, 0],
    explanation:
      "Google first crawls pages by following links and reading sitemaps, then indexes the content by analyzing and storing it, and finally ranks pages in search results based on relevance and quality signals.",
  },
];
