import type { QuizQuestion } from "@/lib/academy-data";

export const frontendSeoQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question: "What is the recommended maximum length for a title tag?",
    options: [
      "30 characters",
      "60 characters",
      "100 characters",
      "160 characters",
    ],
    correctIndex: 1,
    explanation:
      "Title tags should be kept under 60 characters to prevent truncation in search engine results pages (SERPs).",
  },
  {
    type: "multiple-choice",
    question: "What format does Google recommend for structured data?",
    options: ["Microdata", "RDFa", "JSON-LD", "XML"],
    correctIndex: 2,
    explanation:
      "Google recommends JSON-LD (JavaScript Object Notation for Linked Data) as the preferred format for structured data because it's easy to implement and maintain separately from the HTML markup.",
  },
  {
    type: "multiple-choice",
    question: "What does a canonical tag tell search engines?",
    options: [
      "That the page should be redirected",
      "Which version of a page is the preferred master copy",
      "That the page should not be cached",
      "Which language the page is written in",
    ],
    correctIndex: 1,
    explanation:
      "A canonical tag (rel=\"canonical\") tells search engines which URL is the preferred version of a page, preventing duplicate content issues when multiple URLs serve similar content.",
  },
  {
    type: "true-false",
    question:
      "The meta description is a direct Google ranking factor.",
    correctAnswer: false,
    explanation:
      "The meta description is not a direct ranking factor. However, a compelling meta description improves click-through rate (CTR), which can indirectly benefit SEO performance.",
  },
  {
    type: "true-false",
    question:
      "Open Graph tags require absolute URLs (including the protocol like https://) rather than relative paths.",
    correctAnswer: true,
    explanation:
      "Open Graph tags require absolute URLs so that social media platforms can correctly resolve and fetch the referenced resources, such as images and page URLs.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are valid Open Graph meta properties? (Select all that apply)",
    options: [
      "og:title",
      "og:description",
      "og:ranking",
      "og:image",
      "og:keywords",
      "og:url",
    ],
    correctIndices: [0, 1, 3, 5],
    explanation:
      "The standard Open Graph properties include og:title, og:description, og:image, and og:url. There is no og:ranking or og:keywords property in the Open Graph protocol.",
  },
  {
    type: "multi-select",
    question:
      "Which Schema.org types can generate rich results in Google Search? (Select all that apply)",
    options: [
      "FAQPage",
      "HowTo",
      "Article",
      "GenericWebContent",
      "Product",
      "BreadcrumbList",
    ],
    correctIndices: [0, 1, 2, 4, 5],
    explanation:
      "FAQPage, HowTo, Article, Product, and BreadcrumbList are all Schema.org types that Google supports for rich results. GenericWebContent is not a recognized Schema.org type that triggers rich results.",
  },
  {
    type: "multi-select",
    question:
      "Which of these are valid values for the robots meta tag? (Select all that apply)",
    options: [
      "noindex",
      "nofollow",
      "nocrawl",
      "noarchive",
      "nosnippet",
      "nofetch",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Valid robots meta directives include noindex, nofollow, noarchive, and nosnippet. There are no standard 'nocrawl' or 'nofetch' directives — crawl control is handled by robots.txt.",
  },
  {
    type: "ordering",
    question:
      "Place the primary keyword in the title tag from most effective position to least effective.",
    items: [
      "In the middle of the title",
      "At the beginning of the title",
      "At the very end of the title",
    ],
    correctOrder: [1, 0, 2],
    explanation:
      "Search engines give slightly more weight to words appearing earlier in the title tag, and users scan from left to right. Placing your primary keyword at the beginning is most effective, followed by the middle, and then the end.",
  },
  {
    type: "ordering",
    question:
      "Arrange these image SEO optimizations in order of importance, from most important to least important.",
    items: [
      "Adding a creative file name like 'IMG_2024.jpg'",
      "Writing descriptive alt text",
      "Using a modern format like WebP",
      "Compressing the image file size",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "Descriptive alt text is the most important image SEO factor because it helps search engines understand the image content and improves accessibility. Compressing file size improves page speed (a ranking factor), modern formats further optimize delivery, and a generic file name like 'IMG_2024.jpg' provides no SEO value — descriptive file names like 'seo-checklist-infographic.webp' are better.",
  },
];
