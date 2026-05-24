import type { QuizQuestion } from "@/lib/academy-data";

export const blogPostsForSeoQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question: "Why are blog posts important for SEO?",
    options: [
      "They replace the need for service pages",
      "They create new indexable pages targeting long-tail keywords and signal site activity to Google",
      "They only matter if you post daily",
      "Blog posts have no impact on search rankings",
    ],
    correctIndex: 1,
    explanation:
      "Blog posts create new indexable pages that can target specific long-tail keywords, build topical authority, and signal to Google that your site is active and worth crawling frequently.",
  },
  {
    type: "true-false",
    question:
      "Google Search Console can show you queries where your site gets impressions but has a low click-through rate, revealing opportunities for new or optimized blog content.",
    correctAnswer: true,
    explanation:
      "Google Search Console's Performance report shows queries your site appears for, including those with high impressions but low CTR. These are prime opportunities for new blog posts or content optimization.",
  },
  {
    type: "multiple-choice",
    question:
      "Which of the following is the best approach to keyword placement in a blog post?",
    options: [
      "Stuff the keyword into every sentence for maximum density",
      "Place the primary keyword in the headline, first 100 words, at least one subheading, and naturally throughout the body",
      "Only include the keyword in the meta description",
      "Avoid using the exact keyword and rely solely on synonyms",
    ],
    correctIndex: 1,
    explanation:
      "Your primary keyword should appear in the H1 headline, within the first 100 words, in at least one subheading, and naturally throughout the body. This signals relevance without keyword stuffing.",
  },
  {
    type: "ordering",
    question:
      "Arrange these steps in the correct order for optimizing a blog post to win a featured snippet.",
    items: [
      "Write a concise, direct answer in 40-60 words immediately after the question heading",
      "Identify a question-based query your audience is searching for",
      "Expand on the answer with detailed supporting content below",
      "Use the exact question as an H2 or H3 heading in your post",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "To target a featured snippet: first identify the question query, then use it as a heading, immediately provide a concise direct answer (the snippet bait), and finally expand with detailed supporting content.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are characteristics of the pillar and cluster content model? (Select all that apply)",
    options: [
      "A comprehensive pillar page covers a broad topic in depth",
      "Cluster posts cover specific subtopics and link back to the pillar page",
      "The pillar page should be shorter than any cluster post",
      "Internal links connect the pillar and cluster pages together",
      "Cluster posts should never link to each other",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "The pillar/cluster model uses a comprehensive pillar page (typically the longest piece) that links to supporting cluster posts on subtopics. Cluster posts link back to the pillar, and internal links connect the entire topic ecosystem. Cluster posts can also link to each other when relevant.",
  },
  {
    type: "multiple-choice",
    question: "What is the best anchor text practice for internal blog links?",
    options: [
      "Always use 'click here' so readers know to click",
      "Paste the full raw URL as the link text",
      "Use descriptive, keyword-rich text that tells users and search engines what the linked page is about",
      "Use the same generic anchor text for every internal link on the page",
    ],
    correctIndex: 2,
    explanation:
      "Descriptive, keyword-rich anchor text tells both users and search engines what the linked page is about, improving SEO value and user experience. Avoid generic phrases like 'click here' or pasting raw URLs.",
  },
  {
    type: "true-false",
    question:
      "Evergreen content and trending content serve the same purpose in a blog strategy and can be used interchangeably.",
    correctAnswer: false,
    explanation:
      "Evergreen content (e.g., 'What is SEO?') stays relevant for years and drives consistent traffic, while trending content (e.g., 'Google March 2026 Core Update') captures short-term spikes. A strong strategy uses both types for different purposes.",
  },
  {
    type: "ordering",
    question:
      "Put these content refresh steps in the correct order for updating an old blog post.",
    items: [
      "Update the publication date to reflect the refresh",
      "Review analytics to identify underperforming posts worth refreshing",
      "Add internal links to newer related content on your site",
      "Rewrite outdated statistics, examples, and information",
      "Re-submit the updated URL in Google Search Console",
    ],
    correctOrder: [1, 3, 2, 0, 4],
    explanation:
      "Start by reviewing analytics to find refresh candidates, then update the outdated content, add internal links to newer posts, update the publication date, and finally re-submit the URL in Search Console to prompt re-crawling.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are valid types of featured snippets that Google displays? (Select all that apply)",
    options: [
      "Paragraph snippet (a block of text answering a question)",
      "List snippet (numbered or bulleted list)",
      "Table snippet (data formatted in rows and columns)",
      "Video snippet (a short auto-playing video ad)",
      "Carousel snippet (rotating paid product listings)",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Google displays three main types of featured snippets: paragraph snippets (text answers), list snippets (ordered or unordered lists), and table snippets (structured data in rows and columns). Video snippets exist but are not auto-playing ads, and carousels are a separate SERP feature.",
  },
  {
    type: "ordering",
    question:
      "Arrange these blog content types from most evergreen (longest-lasting relevance) to most time-sensitive.",
    items: [
      "Industry news commentary on a recent algorithm update",
      "A glossary of SEO terminology",
      "A seasonal guide to holiday marketing campaigns",
      "A how-to tutorial on writing meta descriptions",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "A glossary remains relevant indefinitely. A how-to tutorial stays useful for years with minor updates. A seasonal guide is cyclically relevant but tied to specific time periods. Industry news commentary becomes outdated the fastest as new updates replace it.",
  },
];
