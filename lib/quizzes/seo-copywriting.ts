import type { QuizQuestion } from "@/lib/academy-data";

export const seoCopywritingQuiz: QuizQuestion[] = [
  // --- Multiple Choice (4) ---
  {
    type: "multiple-choice",
    question: "What is the most important factor in modern SEO copywriting?",
    options: [
      "Using the keyword as many times as possible",
      "Writing content that matches user search intent",
      "Making every page at least 3,000 words long",
      "Using exact-match keywords in every sentence",
    ],
    correctIndex: 1,
    explanation:
      "Search engines prioritize content that directly matches what users are looking for. Aligning your content with user intent is the foundation of modern SEO copywriting.",
  },
  {
    type: "multiple-choice",
    question:
      "Where should you place your primary keyword for maximum SEO impact?",
    options: [
      "Only in the meta description",
      "In the footer of the page",
      "In the title tag, first paragraph, headings, and naturally throughout",
      "Repeated 20+ times in the body text",
    ],
    correctIndex: 2,
    explanation:
      "Strategic keyword placement in the title tag, first paragraph, at least one heading, and naturally throughout the content signals relevance to search engines without keyword stuffing.",
  },
  {
    type: "multiple-choice",
    question: "What are LSI keywords?",
    options: [
      "Keywords with low search intent",
      "Latent Semantic Indexing keywords — related terms and synonyms",
      "Long-string indexed keywords used in PPC campaigns",
      "Keywords that only apply to local searches",
    ],
    correctIndex: 1,
    explanation:
      "LSI (Latent Semantic Indexing) keywords are contextually related terms and synonyms that help search engines understand the full topic of your content. For example, an article about 'running shoes' might include LSI terms like 'arch support,' 'marathon training,' and 'cushioning.'",
  },
  {
    type: "multiple-choice",
    question: "Which of these is a strong call-to-action (CTA)?",
    options: [
      "Click here",
      "Submit",
      "Get your free SEO audit today",
      "Learn more",
    ],
    correctIndex: 2,
    explanation:
      "Strong CTAs are specific, action-oriented, and communicate clear value to the reader. 'Get your free SEO audit today' tells users exactly what they will receive and creates urgency with the word 'today.'",
  },
  // --- True/False (3) ---
  {
    type: "true-false",
    question:
      "Keyword stuffing — unnaturally repeating a keyword to manipulate rankings — can result in a Google penalty.",
    correctAnswer: true,
    explanation:
      "Keyword stuffing is a black-hat SEO tactic that violates Google's spam policies. It degrades user experience and can result in manual actions or algorithmic penalties that significantly reduce your search visibility.",
  },
  {
    type: "true-false",
    question:
      "Most SEO content should be written at a college graduate reading level to demonstrate expertise.",
    correctAnswer: false,
    explanation:
      "Most SEO content should target an 8th-grade reading level to be accessible to the widest audience. Overly complex language increases bounce rates and reduces engagement. Expertise is demonstrated through accuracy and depth, not vocabulary difficulty.",
  },
  {
    type: "true-false",
    question:
      "Semantic SEO means covering a topic comprehensively with related terms and context, rather than focusing on a single exact-match keyword.",
    correctAnswer: true,
    explanation:
      "Semantic SEO involves covering a topic thoroughly using related terms, synonyms, and contextually relevant phrases. This helps search engines understand your topical authority and can help you rank for a broader set of related queries.",
  },
  // --- Multi-Select (2) ---
  {
    type: "multi-select",
    question:
      "Which of the following are recognized types of search intent? (Select all that apply)",
    options: [
      "Informational — the user wants to learn something",
      "Navigational — the user wants to find a specific website",
      "Computational — the user wants to perform a calculation",
      "Commercial — the user is researching before a purchase",
      "Transactional — the user is ready to buy or take action",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "The four recognized types of search intent are informational (learning), navigational (finding a specific site), commercial (researching options), and transactional (ready to buy). 'Computational' is not a standard search intent category.",
  },
  {
    type: "multi-select",
    question:
      "Which power word categories are effective for increasing click-through rates in titles? (Select all that apply)",
    options: [
      "Urgency words — limited, now, today, deadline",
      "Curiosity words — secret, insider, hidden, little-known",
      "Value words — free, bonus, ultimate, exclusive",
      "Filler words — the, and, of, with",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Urgency words compel immediate action, curiosity words entice clicks through mystery, and value words promise tangible benefits. Common filler words like 'the' and 'and' do not increase click-through rates.",
  },
  // --- Ordering (1) ---
  {
    type: "ordering",
    question:
      "Put the steps for writing an SEO-optimized blog post in the correct order.",
    items: [
      "Add internal links, a meta description, and a compelling CTA",
      "Research target keywords and analyze search intent",
      "Write the body content using LSI keywords and semantic variations",
      "Craft a keyword-rich title tag and H1 heading",
      "Write a strong opening paragraph that includes the primary keyword",
    ],
    correctOrder: [1, 3, 4, 2, 0],
    explanation:
      "The correct process is: (1) Research keywords and search intent, (2) Craft a keyword-rich title and H1, (3) Write a strong opening paragraph with the primary keyword, (4) Write the body using LSI and semantic variations, and (5) Add internal links, meta description, and a CTA.",
  },
];
