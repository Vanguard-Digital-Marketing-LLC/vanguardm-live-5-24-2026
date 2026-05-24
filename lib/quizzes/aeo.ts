import type { QuizQuestion } from "@/lib/academy-data";

export const aeoQuiz: QuizQuestion[] = [
  // --- Multiple Choice (3) ---
  {
    type: "multiple-choice",
    question: "What does AEO stand for?",
    options: [
      "Automated Engine Optimization",
      "Answer Engine Optimization",
      "Advanced Entry Optimization",
      "Artificial Experience Optimization",
    ],
    correctIndex: 1,
    explanation:
      "AEO stands for Answer Engine Optimization — the practice of optimizing content to be selected as a direct answer by search engines, AI assistants, and voice assistants.",
  },
  {
    type: "multiple-choice",
    question: "What is a 'featured snippet' in Google search results?",
    options: [
      "A paid advertisement displayed at the top of the results",
      "A selected result displayed in a special box above organic listings (Position Zero)",
      "A preview of your site's homepage in search results",
      "A Google Maps listing for local businesses",
    ],
    correctIndex: 1,
    explanation:
      "Featured snippets are selected search results that appear at the top of Google's results page in a special box, above regular organic results. They are often called 'Position Zero.'",
  },
  {
    type: "multiple-choice",
    question: "What is the ideal length for a paragraph featured snippet answer?",
    options: [
      "10-20 words",
      "40-60 words",
      "100-150 words",
      "200+ words",
    ],
    correctIndex: 1,
    explanation:
      "The ideal length for a paragraph featured snippet is 40-60 words. This provides enough detail to answer the question concisely while fitting the space Google allocates for snippet extraction.",
  },
  // --- True/False (2) ---
  {
    type: "true-false",
    question:
      "Voice search queries tend to be longer and more conversational than typed queries.",
    correctAnswer: true,
    explanation:
      "Voice search queries are typically longer (often full sentences or questions) and more conversational in tone compared to typed queries, which tend to be shorter keyword phrases. Optimizing for natural language questions is key for voice search.",
  },
  {
    type: "true-false",
    question:
      "AEO and SEO are competing strategies — you should choose one or the other for your content.",
    correctAnswer: false,
    explanation:
      "AEO and SEO are complementary, not competing. AEO builds on top of strong SEO fundamentals. Good SEO gets your content indexed and ranked, while AEO optimizes that content to be selected as direct answers in featured snippets, AI overviews, and voice results.",
  },
  // --- Multi-Select (3) ---
  {
    type: "multi-select",
    question:
      "Which of the following are recognized types of Google featured snippets? (Select all that apply)",
    options: [
      "Paragraph snippet",
      "List snippet (ordered or unordered)",
      "Video snippet",
      "Table snippet",
      "Image carousel snippet",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "The three main types of featured snippets are paragraph snippets, list snippets (both ordered and unordered), and table snippets. While videos and image carousels appear in search results, they are separate SERP features, not featured snippet types.",
  },
  {
    type: "multi-select",
    question:
      "Which structured data types help your content appear as rich results for AEO? (Select all that apply)",
    options: [
      "FAQPage schema for question-and-answer pairs",
      "HowTo schema for step-by-step tutorials",
      "BlogPosting schema for article metadata",
      "Speakable schema for voice assistant content",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "FAQPage schema enables expandable Q&A rich results, HowTo schema displays step-by-step instructions with rich formatting, and Speakable schema identifies content suitable for text-to-speech by voice assistants. BlogPosting schema provides article metadata but does not generate AEO-specific rich results.",
  },
  {
    type: "multi-select",
    question:
      "Which strategies help your content get cited in Google AI Overviews? (Select all that apply)",
    options: [
      "Writing comprehensive, well-structured content with clear headings",
      "Including original data, statistics, or expert quotes",
      "Using keyword stuffing to maximize keyword density",
      "Building topical authority by covering related subtopics in depth",
      "Hiding content behind login walls to increase exclusivity",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Google AI Overviews favor well-structured, authoritative content with original data and strong topical coverage. Keyword stuffing is a spam signal that harms rankings, and gated content cannot be crawled or cited by AI systems.",
  },
  // --- Ordering (2) ---
  {
    type: "ordering",
    question:
      "Arrange the steps for optimizing a blog post for featured snippets in the correct order.",
    items: [
      "Expand with supporting details, examples, and data below",
      "Research question-based keywords your audience is searching",
      "Add FAQ schema markup to structured Q&A sections",
      "Use the target question as a heading (H2 or H3)",
      "Write a concise 40-60 word answer directly below the heading",
    ],
    correctOrder: [1, 3, 4, 0, 2],
    explanation:
      "The correct process is: (1) Research question-based keywords, (2) Use the question as a heading, (3) Write a concise 40-60 word answer immediately below, (4) Expand with supporting details and data, and (5) Add FAQ schema markup to structured sections.",
  },
  {
    type: "ordering",
    question:
      "Rank these content formats from MOST likely to LEAST likely to be selected for a featured snippet.",
    items: [
      "A wall of unformatted text with no headings",
      "A concise paragraph answer directly below a question heading",
      "A numbered step-by-step list with clear instructions",
      "A well-structured data table with labeled headers",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Concise paragraph answers under question headings are the most common snippet format. Numbered lists and structured tables are also frequently selected. Unformatted text walls with no headings are the least likely to be extracted as snippets because Google cannot easily parse them.",
  },
];
