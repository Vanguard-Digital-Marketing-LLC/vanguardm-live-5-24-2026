import type { QuizQuestion } from "@/lib/academy-data";

export const headingHierarchyQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question: "How many H1 tags should a page have?",
    options: [
      "As many as needed",
      "Exactly one",
      "At least two",
      "None — H1 is optional",
    ],
    correctIndex: 1,
    explanation:
      "Every page should have exactly one H1 tag that clearly states the page's main topic. Multiple H1s can confuse search engines and screen readers about the page's primary subject.",
  },
  {
    type: "multiple-choice",
    question:
      "What is wrong with going from <h2> directly to <h4>?",
    options: [
      "Nothing, it's perfectly fine",
      "It skips a heading level, breaking the document outline",
      "H4 tags are not valid HTML",
      "It only matters for print stylesheets",
    ],
    correctIndex: 1,
    explanation:
      "Skipping heading levels (like going from H2 to H4) breaks the document outline. Screen readers and search engines expect a sequential heading hierarchy without gaps.",
  },
  {
    type: "multiple-choice",
    question:
      "What WCAG success criterion requires correct heading hierarchy?",
    options: [
      "SC 2.1.1 — Keyboard Access",
      "SC 1.4.3 — Contrast",
      "SC 1.3.1 — Info and Relationships",
      "SC 4.1.2 — Name, Role, Value",
    ],
    correctIndex: 2,
    explanation:
      "WCAG Success Criterion 1.3.1 (Info and Relationships) requires that information and structure conveyed through presentation can be programmatically determined. Correct heading hierarchy satisfies this requirement.",
  },
  {
    type: "true-false",
    question:
      "It is acceptable to use heading tags (like H2 or H3) purely to make text appear larger on the page.",
    correctAnswer: false,
    explanation:
      "Heading tags convey semantic meaning about document structure, not visual styling. Using them just for appearance creates a misleading document outline. Use CSS to style text visually instead.",
  },
  {
    type: "true-false",
    question:
      "Screen reader users can press the 'H' key to jump between heading elements on a page.",
    correctAnswer: true,
    explanation:
      "Screen reader users commonly use the 'H' key to navigate between heading elements, allowing them to scan the page structure like a table of contents. This is why a logical heading hierarchy is essential for accessibility.",
  },
  {
    type: "true-false",
    question:
      "The heading sequence H1, H2, H3, H2, H3 is a valid heading hierarchy.",
    correctAnswer: true,
    explanation:
      "This is a valid hierarchy. After completing a subsection (H3 under the first H2), you can return to H2 to start a new section and nest new H3 elements within it. Heading levels can go back up without breaking the outline.",
  },
  {
    type: "true-false",
    question:
      "H5 and H6 headings are commonly needed on most web pages.",
    correctAnswer: false,
    explanation:
      "H5 and H6 should be used rarely — only when your content genuinely has 4-5 levels of nested subsections. Most web pages only need H1, H2, and H3 for an effective document structure.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are negative consequences of having no H1 tag on a page? (Select all that apply)",
    options: [
      "The page will not load in browsers",
      "Search engines cannot easily determine the main topic",
      "Screen reader users lose context about the page's purpose",
      "CSS styling will stop working on the page",
      "The page may rank lower due to unclear topic signals",
    ],
    correctIndices: [1, 2, 4],
    explanation:
      "Without an H1, search engines must guess the page's main topic, screen reader users lose important context, and the page may rank lower due to weaker topic signals. The page will still load and CSS will still function normally.",
  },
  {
    type: "ordering",
    question:
      "Arrange these heading levels from highest (most important) to lowest in a document outline.",
    items: ["H3 — Subsection", "H1 — Page Title", "H4 — Sub-subsection", "H2 — Section"],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "The correct hierarchy from highest to lowest is H1 (page title), H2 (main sections), H3 (subsections), and H4 (sub-subsections). Each level represents a deeper level of nesting within the document structure.",
  },
  {
    type: "ordering",
    question:
      "Arrange these elements in the order a screen reader typically encounters them when scanning a well-structured page.",
    items: [
      "H3 subtopic within the first section",
      "H2 second major section",
      "H1 page title",
      "H2 first major section",
    ],
    correctOrder: [2, 3, 0, 1],
    explanation:
      "A screen reader user scanning by headings would encounter the H1 page title first, then the first H2 section, followed by any H3 subtopics within that section, and then the next H2 section. This sequential flow demonstrates why logical heading order matters.",
  },
];
