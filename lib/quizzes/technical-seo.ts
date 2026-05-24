import type { QuizQuestion } from "@/lib/academy-data";

export const technicalSeoQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question: "What two factors determine a site's crawl budget?",
    options: [
      "Domain age and backlink count",
      "Crawl rate limit and crawl demand",
      "Page count and word count",
      "Server location and hosting provider",
    ],
    correctIndex: 1,
    explanation:
      "Google allocates crawl budget based on crawl rate limit (how fast it can crawl without overloading your server) and crawl demand (how much Google wants to crawl based on popularity and freshness).",
  },
  {
    type: "multiple-choice",
    question:
      "What is the maximum number of URLs recommended per XML sitemap file?",
    options: ["10,000", "25,000", "50,000", "100,000"],
    correctIndex: 2,
    explanation:
      "XML sitemaps should contain no more than 50,000 URLs and be no larger than 50MB uncompressed. For larger sites, use a sitemap index file that references multiple individual sitemaps.",
  },
  {
    type: "multiple-choice",
    question: "What does LCP (Largest Contentful Paint) measure?",
    options: [
      "How quickly the page becomes interactive",
      "How much the layout shifts during loading",
      "How quickly the largest visible content element renders",
      "How fast the browser establishes a server connection",
    ],
    correctIndex: 2,
    explanation:
      "LCP measures loading performance by marking the point when the largest content element (image, video, or text block) becomes visible in the viewport. A good LCP score is 2.5 seconds or less.",
  },
  {
    type: "true-false",
    question:
      "A robots.txt 'Disallow' directive is a security measure that prevents all access to the specified URLs.",
    correctAnswer: false,
    explanation:
      "Robots.txt directives are requests to compliant crawlers, not security measures. Non-compliant bots can ignore them, and disallowed pages can still appear in search results if other pages link to them. Use authentication or server-side access controls for actual security.",
  },
  {
    type: "true-false",
    question:
      "INP (Interaction to Next Paint) replaced FID (First Input Delay) as a Core Web Vital in March 2024.",
    correctAnswer: true,
    explanation:
      "INP replaced FID in March 2024. Unlike FID, which only measured the delay of the first interaction, INP observes the latency of all interactions throughout the entire page lifecycle and reports the worst (or near-worst) interaction.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are current Core Web Vitals metrics? (Select all that apply)",
    options: [
      "LCP (Largest Contentful Paint)",
      "FID (First Input Delay)",
      "CLS (Cumulative Layout Shift)",
      "TTFB (Time to First Byte)",
      "INP (Interaction to Next Paint)",
      "FCP (First Contentful Paint)",
    ],
    correctIndices: [0, 2, 4],
    explanation:
      "The current Core Web Vitals are LCP (loading performance), CLS (visual stability), and INP (interactivity). FID was replaced by INP in March 2024. TTFB and FCP are useful performance metrics but are not Core Web Vitals.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are best practices for URL structure? (Select all that apply)",
    options: [
      "Use hyphens to separate words",
      "Use lowercase letters only",
      "Use underscores to separate words",
      "Keep URLs short and descriptive",
      "Include session IDs in URLs",
      "Use a flat, logical hierarchy",
    ],
    correctIndices: [0, 1, 3, 5],
    explanation:
      "Best practices include using hyphens (not underscores) to separate words, lowercase letters, short descriptive paths, and a flat logical hierarchy. Google treats hyphens as word separators but not underscores. Session IDs in URLs create duplicate content and crawling issues.",
  },
  {
    type: "ordering",
    question:
      "Arrange these Core Web Vitals thresholds for 'good' scores from smallest to largest value.",
    items: [
      "INP: 200 milliseconds",
      "CLS: 0.1",
      "LCP: 2.5 seconds",
    ],
    correctOrder: [1, 0, 2],
    explanation:
      "The 'good' thresholds are: CLS at 0.1 or less (smallest numeric value), INP at 200 milliseconds or less, and LCP at 2.5 seconds (2,500 milliseconds) or less. These thresholds represent the upper bound of the 'good' range for each metric.",
  },
  {
    type: "ordering",
    question:
      "Arrange these site architecture depths from best to worst for SEO.",
    items: [
      "4+ clicks from homepage (deep architecture)",
      "2-3 clicks from homepage (flat architecture)",
      "1 click from homepage (very flat)",
      "6+ clicks from homepage (very deep)",
    ],
    correctOrder: [2, 1, 0, 3],
    explanation:
      "Flatter architectures are better for SEO. Pages reachable in 1 click get the most link equity and are crawled most frequently. At 2-3 clicks, pages are still well-connected. As depth increases to 4+ or 6+ clicks, crawlers discover pages less often and link equity diminishes significantly.",
  },
  {
    type: "ordering",
    question:
      "Arrange these steps in the correct order for diagnosing a page that is not appearing in Google search results.",
    items: [
      "Check robots.txt for Disallow rules blocking the URL",
      "Use Google Search Console to request indexing",
      "Verify the page doesn't have a noindex meta tag",
      "Confirm the page returns a 200 status code",
    ],
    correctOrder: [3, 0, 2, 1],
    explanation:
      "First confirm the page loads correctly (200 status code), then check if robots.txt is blocking crawlers from accessing it, verify there is no noindex meta tag preventing indexing, and finally use Search Console to request indexing if everything else checks out.",
  },
];
