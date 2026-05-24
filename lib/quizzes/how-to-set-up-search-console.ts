import type { QuizQuestion } from "@/lib/academy-data";

export const howToSetUpSearchConsoleQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question:
      "Which verification method lets you confirm Search Console ownership without touching your website's code?",
    options: [
      "HTML file upload",
      "HTML meta tag",
      "DNS TXT record",
      "Google Analytics tracking code",
    ],
    correctIndex: 2,
    explanation:
      "Adding a DNS TXT record to your domain registrar verifies ownership at the domain level without touching website files. It's the recommended method for Domain properties because it covers all subdomains and protocols.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the difference between a Domain property and a URL prefix property in Search Console?",
    options: [
      "Domain properties only cover HTTPS; URL prefix covers HTTP",
      "Domain properties cover all URLs across all subdomains and protocols; URL prefix covers only the exact URL prefix entered",
      "URL prefix requires DNS verification; Domain does not",
      "No functional difference — they show identical data",
    ],
    correctIndex: 1,
    explanation:
      "A Domain property aggregates data for all subdomains (www, m, blog) and both http/https. A URL prefix property only tracks URLs beginning with the exact URL you enter, such as https://example.com/.",
  },
  {
    type: "multiple-choice",
    question:
      "In the Performance report, what does 'Average Position' measure?",
    options: [
      "Average ad position in Google Ads",
      "Average ranking position in Google search results for selected queries",
      "Percentage of clicks compared to impressions",
      "Average page load speed",
    ],
    correctIndex: 1,
    explanation:
      "Average Position is the mean ranking your pages held in search results for a given query. Position 1 is the top result. It's an average across all impressions for the selected filter.",
  },
  {
    type: "multiple-choice",
    question:
      "The URL Inspection tool is primarily used for which purpose?",
    options: [
      "Checking keyword rankings across multiple pages",
      "Analyzing backlink profiles",
      "Viewing how Google crawled and indexed a specific URL, and requesting re-indexing",
      "Diagnosing Core Web Vitals",
    ],
    correctIndex: 2,
    explanation:
      "The URL Inspection tool shows a URL's crawl and index status, last crawl date, detected structured data, and search eligibility. You can also request a fresh crawl to speed up indexing of new or updated content.",
  },
  {
    type: "true-false",
    question:
      "Submitting a sitemap to Google Search Console guarantees that all URLs in the sitemap will be indexed.",
    correctAnswer: false,
    explanation:
      "Submitting a sitemap signals which URLs you want crawled, but indexing is never guaranteed. Google evaluates each URL for quality, duplication, crawlability, and relevance before deciding whether to index it.",
  },
  {
    type: "true-false",
    question:
      "The Removals tool in Search Console permanently deletes a page from Google's index.",
    correctAnswer: false,
    explanation:
      "The Removals tool only temporarily suppresses a URL from results for about 6 months. For permanent removal, add a noindex meta tag, return a 404/410 status code, or use password protection.",
  },
  {
    type: "multi-select",
    question:
      "Which metrics are available in the Search Console Performance report? (Select all that apply)",
    options: [
      "Total clicks",
      "Total impressions",
      "Average CTR",
      "Average position",
      "Bounce rate",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "The Performance report provides total clicks, impressions, average CTR, and average position. Bounce rate is a Google Analytics metric, not a Search Console metric.",
  },
  {
    type: "multi-select",
    question:
      "Which are valid verification methods for a URL prefix property? (Select all that apply)",
    options: [
      "HTML file upload",
      "HTML meta tag",
      "Google Analytics",
      "DNS TXT record",
      "Google Tag Manager",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "URL prefix properties can be verified via HTML file upload, HTML meta tag, Google Analytics, and Google Tag Manager. DNS TXT record verification is only available for Domain properties.",
  },
  {
    type: "multiple-choice",
    question:
      "After submitting a sitemap, which status indicates Google has successfully processed it?",
    options: ["Submitted", "Pending", "Success", "Indexed"],
    correctIndex: 2,
    explanation:
      "A 'Success' status means Google fetched and processed your sitemap without errors. 'Submitted' is the initial state, and specific error messages appear if something went wrong.",
  },
  {
    type: "ordering",
    question:
      "Arrange these steps to set up Google Search Console in the correct order:",
    items: [
      "Go to search.google.com/search-console and add your property",
      "Choose Domain or URL prefix property type",
      "Complete verification (DNS, HTML tag, etc.)",
      "Submit your sitemap under Sitemaps section",
      "Review the Performance and Coverage reports for insights",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "Start by adding your property, choose the type, verify ownership, submit your sitemap for faster discovery, then monitor Performance and Coverage reports for ongoing optimization.",
  },
];
