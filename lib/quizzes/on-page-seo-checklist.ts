import type { QuizQuestion } from "@/lib/academy-data";

export const onPageSeoChecklistQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question:
      "What is the recommended character length for an SEO title tag?",
    options: [
      "20-30 characters",
      "50-60 characters",
      "100-120 characters",
      "200+ characters",
    ],
    correctIndex: 1,
    explanation:
      "Title tags should be 50-60 characters to avoid being truncated in search results. This gives enough space to include your primary keyword and a compelling description.",
  },
  {
    type: "true-false",
    question:
      "Meta descriptions are a direct Google ranking factor that influence where your page appears in search results.",
    correctAnswer: false,
    explanation:
      "Meta descriptions are not a direct ranking factor. However, a compelling meta description improves click-through rate (CTR), which can indirectly influence rankings. Google may also bold matching query terms in the description, attracting more clicks.",
  },
  {
    type: "true-false",
    question: "Each page on your website should have exactly one H1 tag.",
    correctAnswer: true,
    explanation:
      "Each page should have exactly one H1 tag that clearly describes the page's primary topic. Multiple H1 tags can confuse search engines about the main focus of the page and dilute topical relevance.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are best practices for writing image alt text? (Select all that apply)",
    options: [
      "Describe the image content accurately and specifically",
      "Include relevant keywords naturally where appropriate",
      "Start every alt tag with 'Image of' or 'Picture of'",
      "Keep alt text concise, typically under 125 characters",
      "Leave alt text blank for decorative images that convey no information",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Good alt text is descriptive, includes relevant keywords naturally, stays concise (under 125 characters for screen reader compatibility), and is left empty for purely decorative images. Starting with 'Image of' is redundant since screen readers already announce it as an image.",
  },
  {
    type: "multiple-choice",
    question: "Which URL structure is best for SEO?",
    options: [
      "/blog?id=4521&cat=seo",
      "/blog/2026/02/15/the-ultimate-complete-definitive-guide-to-seo-tips-and-tricks",
      "/blog/seo-copywriting-guide",
      "/blog/page1",
    ],
    correctIndex: 2,
    explanation:
      "Short, descriptive URLs with keywords separated by hyphens are best for SEO. They are easy for both users and search engines to understand at a glance. Avoid query parameters, excessive dates, overly long slugs, and generic names.",
  },
  {
    type: "true-false",
    question:
      "Google's mobile-first indexing means that Google primarily uses the mobile version of your website's content for indexing and ranking.",
    correctAnswer: true,
    explanation:
      "Mobile-first indexing means Google predominantly uses the mobile version of your site for ranking and indexing. If your mobile experience is poor or missing content compared to desktop, your rankings will suffer.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following factors contribute to page load speed improvements? (Select all that apply)",
    options: [
      "Compressing and properly sizing images",
      "Minifying CSS, JavaScript, and HTML files",
      "Adding more third-party tracking scripts",
      "Using a content delivery network (CDN)",
      "Enabling browser caching for static assets",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Image compression, file minification, CDN usage, and browser caching all improve page load speed. Adding more third-party scripts does the opposite -- each script adds HTTP requests and processing time that slows down your page.",
  },
  {
    type: "true-false",
    question:
      "Schema markup (structured data) can help your pages earn rich snippets in search results, such as star ratings, FAQ dropdowns, and recipe cards.",
    correctAnswer: true,
    explanation:
      "Schema markup helps search engines understand your content's context and type, which can enable rich snippets in search results. These enhanced listings with ratings, FAQs, prices, recipes, and more can significantly improve click-through rates.",
  },
  {
    type: "multi-select",
    question:
      "Why is HTTPS important for SEO and website performance? (Select all that apply)",
    options: [
      "HTTPS is a confirmed Google ranking signal",
      "It encrypts data transmitted between the user's browser and your server",
      "Browsers display 'Not Secure' warnings on HTTP pages with forms",
      "HTTPS guarantees your site will rank on page one",
      "It builds user trust and protects sensitive information like passwords",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "HTTPS is a confirmed ranking signal, encrypts data in transit, prevents browser security warnings, and builds user trust. However, it does not guarantee page-one rankings -- it is one of many ranking factors.",
  },
  {
    type: "ordering",
    question:
      "Arrange these on-page SEO elements in the order you should prioritize them when optimizing a new page.",
    items: [
      "Add schema markup for rich snippets",
      "Write a compelling title tag with your primary keyword",
      "Optimize images with descriptive alt text and compression",
      "Craft a clear H1 and logical heading hierarchy",
      "Write a persuasive meta description to improve CTR",
    ],
    correctOrder: [1, 3, 4, 2, 0],
    explanation:
      "Start with the title tag (most important on-page element), then establish the H1 and heading structure, write the meta description, optimize images, and finally add schema markup. This order reflects the relative SEO impact of each element.",
  },
];
