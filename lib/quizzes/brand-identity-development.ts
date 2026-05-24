import type { QuizQuestion } from "@/lib/academy-data";

export const brandIdentityDevelopmentQuiz: QuizQuestion[] = [
  // ============================================================
  // SECTION 1: Introduction & Overview (12 questions)
  // 6 multiple-choice, 2 true-false, 2 multi-select, 2 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What is brand identity?",
    options: [
      "Just the logo and color palette of a business",
      "The complete system of visual, verbal, and experiential elements that shape audience perception",
      "The company's financial position in the market",
      "A marketing campaign strategy document",
    ],
    correctIndex: 1,
    explanation:
      "Brand identity is the complete system of visual, verbal, and experiential elements that shape how your audience perceives your business. It extends far beyond just a logo or color palette.",
  },
  {
    type: "multiple-choice",
    question:
      "According to Lucidpress research, consistent brand presentation across all platforms can increase revenue by up to what percentage?",
    options: ["10%", "15%", "23%", "35%"],
    correctIndex: 2,
    explanation:
      "Lucidpress research found that consistent brand presentation across all platforms can increase revenue by up to 23%, demonstrating that brand identity is a business imperative, not just a creative exercise.",
  },
  {
    type: "multiple-choice",
    question:
      "Which of the following best describes the primary purpose of brand identity development?",
    options: [
      "To create an attractive logo for business cards",
      "To create instant recognition, build trust, and differentiate a company in the marketplace",
      "To increase social media follower counts",
      "To reduce the cost of advertising production",
    ],
    correctIndex: 1,
    explanation:
      "The primary purpose of brand identity development is to create instant recognition, build trust over time, and differentiate your company in a crowded marketplace.",
  },
  {
    type: "multiple-choice",
    question: "Brand identity is best described as:",
    options: [
      "A one-time project completed during a company's launch",
      "Exclusively a visual design exercise",
      "A living system that requires ongoing management and evolution",
      "A document only used by the marketing department",
    ],
    correctIndex: 2,
    explanation:
      "Brand identity is a living system that must evolve with your audience, market conditions, and business growth. It is not a one-time project but an ongoing strategic effort.",
  },
  {
    type: "multiple-choice",
    question:
      "Which statement best distinguishes a brand refresh from a rebrand?",
    options: [
      "A brand refresh is more expensive than a rebrand",
      "A brand refresh updates visual or messaging elements while maintaining core equity; a rebrand is a fundamental transformation",
      "A brand refresh changes the company name; a rebrand updates the logo",
      "There is no difference between the two terms",
    ],
    correctIndex: 1,
    explanation:
      "A brand refresh updates visual or messaging elements while maintaining core brand equity — suitable when the brand feels dated but is still strategically sound. A rebrand is a more fundamental transformation of identity, positioning, or even the company name.",
  },
  {
    type: "multiple-choice",
    question: "Who benefits from a well-defined brand identity?",
    options: [
      "Only the company's design team",
      "Only the company's customers",
      "Both internal teams and external audiences including customers, partners, and stakeholders",
      "Only investors and shareholders",
    ],
    correctIndex: 2,
    explanation:
      "A well-defined brand identity benefits both internal teams (providing direction for decision-making and culture) and external audiences (creating recognition, trust, and differentiation for customers, partners, and stakeholders).",
  },
  {
    type: "true-false",
    question:
      "Brand identity is primarily concerned with creating an attractive logo and nothing more.",
    correctAnswer: false,
    explanation:
      "Brand identity encompasses the complete system of visual, verbal, and experiential elements — including mission, vision, values, visual identity, voice, brand architecture, and more. A logo is just one component.",
  },
  {
    type: "true-false",
    question:
      "A startup and an established business can both benefit from brand identity development.",
    correctAnswer: true,
    explanation:
      "Whether launching a startup or refreshing an established business, understanding the fundamentals of brand identity development is essential for long-term success. Both scenarios benefit from deliberate brand identity work.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are key outcomes of effective brand identity? (Select all that apply)",
    options: [
      "Instant recognition",
      "Guaranteed sales conversion",
      "Trust building over time",
      "Differentiation in the marketplace",
      "Elimination of all competition",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Effective brand identity creates instant recognition, builds trust over time, and differentiates your company. It does not guarantee sales conversions or eliminate competition — those depend on many additional factors.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are components of a comprehensive brand identity? (Select all that apply)",
    options: [
      "Visual identity system",
      "Stock market ticker symbol",
      "Voice and messaging guidelines",
      "Brand architecture",
      "Mission, vision, and values",
      "Employee salary structure",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "A comprehensive brand identity includes visual identity systems, voice and messaging guidelines, brand architecture, and mission/vision/values. Stock market symbols and salary structures are business operations elements, not brand identity components.",
  },
  {
    type: "ordering",
    question:
      "Place the following brand identity development phases in the correct order:",
    items: [
      "Define mission, vision, and values",
      "Develop visual identity system",
      "Create brand guidelines document",
      "Execute brand rollout across touchpoints",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Brand identity development follows a logical progression: first establish strategic foundations (mission, vision, values), then develop the visual identity system, compile everything into a brand guidelines document, and finally roll out the brand across all touchpoints.",
  },
  {
    type: "ordering",
    question:
      "Rank the following brand elements from most strategic (top-level) to most tactical (execution-level):",
    items: [
      "Brand mission statement",
      "Brand personality traits",
      "Color palette specifications",
      "Business card design",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "The brand hierarchy moves from strategic to tactical: the mission statement is the highest-level strategic element, personality traits derive from the mission, color palette specifications are design-level decisions, and business card design is a tactical execution of all the above.",
  },

  // ============================================================
  // SECTION 2: Core Concepts (12 questions)
  // 6 multiple-choice, 2 true-false, 2 multi-select, 2 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What does a mission statement define?",
    options: [
      "The future state a company is working toward",
      "Why the organization exists today — the problem it solves and the people it serves",
      "The guiding principles that shape company culture",
      "The company's five-year financial goals",
    ],
    correctIndex: 1,
    explanation:
      "A mission statement defines why your organization exists today — the problem you solve and the people you serve. It answers: What do we do? For whom? Why does it matter?",
  },
  {
    type: "multiple-choice",
    question: "How does a vision statement differ from a mission statement?",
    options: [
      "A vision statement is shorter than a mission statement",
      "A vision statement describes the future state you are working toward; a mission describes what you do today",
      "A vision statement is for internal use only while a mission is external",
      "There is no meaningful difference between the two",
    ],
    correctIndex: 1,
    explanation:
      "A vision statement describes the future state you are working toward — the aspirational impact you want to achieve. A mission statement defines why your organization exists today. Together they form the philosophical backbone of brand identity.",
  },
  {
    type: "multiple-choice",
    question: "How many core values should a brand typically define?",
    options: [
      "One or two",
      "Three to five",
      "Eight to ten",
      "As many as possible",
    ],
    correctIndex: 1,
    explanation:
      "Brands typically define three to five fundamental core values. Each value should be actionable — not just words on a wall — with a supporting statement explaining what it means in practice.",
  },
  {
    type: "multiple-choice",
    question:
      "Which of the following is NOT one of the 12 brand archetypes?",
    options: ["The Hero", "The Sage", "The Analyst", "The Outlaw"],
    correctIndex: 2,
    explanation:
      "The Analyst is not one of the 12 brand archetypes. The 12 archetypes are: Hero, Sage, Explorer, Creator, Ruler, Caregiver, Magician, Lover, Jester, Everyman, Outlaw, and Innocent.",
  },
  {
    type: "multiple-choice",
    question: "What is the primary purpose of defining brand personality?",
    options: [
      "To create entertaining social media content",
      "To humanize the business by assigning human traits that guide consistent creative decisions",
      "To determine the brand's pricing strategy",
      "To select which advertising channels to use",
    ],
    correctIndex: 1,
    explanation:
      "Brand personality humanizes your business by assigning human traits to your brand. This creates consistency across all touchpoints and helps creative teams make intuitive decisions about tone, imagery, and messaging.",
  },
  {
    type: "multiple-choice",
    question:
      "When selecting brand archetypes, how many should you typically choose?",
    options: [
      "Only one — brands must have a single archetype",
      "One or two primary archetypes",
      "At least four archetypes for variety",
      "All twelve to cover every audience segment",
    ],
    correctIndex: 1,
    explanation:
      "Selecting one or two primary archetypes creates consistency across all touchpoints. Using too many archetypes dilutes the brand personality and creates confusion.",
  },
  {
    type: "true-false",
    question:
      "Core values should be actionable principles, not just abstract words displayed on a wall.",
    correctAnswer: true,
    explanation:
      "Core values should be actionable — not just words on a wall. Each value should have a supporting statement explaining what it means in practice and how it guides decision-making and behavior.",
  },
  {
    type: "true-false",
    question:
      "A brand's personality traits and archetype should change frequently to keep the brand fresh.",
    correctAnswer: false,
    explanation:
      "Brand personality and archetype provide consistent foundations for creative decisions. They should remain stable over time to build recognition and trust. Frequent changes create confusion and undermine brand equity.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are questions a mission statement should answer? (Select all that apply)",
    options: [
      "What do we do?",
      "What are our revenue goals?",
      "For whom do we do it?",
      "Why does it matter?",
      "What is our stock price target?",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "A mission statement should answer three key questions: What do we do? For whom? Why does it matter? Revenue goals and stock price targets are business objectives, not mission components.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are recommended steps when defining brand personality? (Select all that apply)",
    options: [
      "Define 3-5 adjectives that describe your brand",
      "Copy a competitor's personality traits",
      "Choose a primary and secondary archetype",
      "Ensure personality resonates with your ideal customer",
      "Change personality traits for each marketing campaign",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Defining brand personality involves selecting 3-5 descriptive adjectives, choosing primary and secondary archetypes, and ensuring alignment with your target audience. Copying competitors or changing traits per campaign undermines authenticity and consistency.",
  },
  {
    type: "ordering",
    question:
      "Place the following strategic foundations in the order they should typically be developed:",
    items: [
      "Define mission statement",
      "Define vision statement",
      "Establish core values",
      "Develop brand personality and archetype",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Strategic foundations build upon each other: the mission (why you exist today) informs the vision (where you're headed), which shapes core values (guiding principles), which then inform brand personality and archetype (how you express yourself).",
  },
  {
    type: "ordering",
    question:
      "Rank the following vision statement qualities from most to least important:",
    items: [
      "Aspirational and inspiring",
      "Aligned with company mission",
      "Believable and achievable",
      "Cleverly worded",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "A vision statement should first be aspirational and inspiring, then aligned with the company mission, then believable and achievable. While good writing matters, clever wording is least important compared to strategic substance.",
  },

  // ============================================================
  // SECTION 3: Strategy & Planning (12 questions)
  // 6 multiple-choice, 2 true-false, 3 multi-select, 1 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What is a visual identity system?",
    options: [
      "A collection of stock photography for marketing use",
      "The collection of visual elements that represent a brand across every medium",
      "A website design template",
      "The brand's social media profile images",
    ],
    correctIndex: 1,
    explanation:
      "A visual identity system is the collection of visual elements — typography, color, imagery, iconography, logo, and layout patterns — that represent your brand across every medium. It extends far beyond just a logo.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the typical recommended color usage ratio for a brand palette?",
    options: [
      "50% primary, 30% secondary, 20% accent",
      "60% primary, 30% secondary, 10% accent",
      "33% primary, 33% secondary, 33% accent",
      "80% primary, 10% secondary, 10% accent",
    ],
    correctIndex: 1,
    explanation:
      "The typical recommended color usage ratio is 60% primary, 30% secondary, and 10% accent. This creates visual harmony while ensuring the primary brand color dominates for recognition.",
  },
  {
    type: "multiple-choice",
    question:
      "Which brand architecture model describes one master brand with descriptive sub-brands?",
    options: [
      "House of brands",
      "Endorsed brand",
      "Branded house",
      "Hybrid brand",
    ],
    correctIndex: 2,
    explanation:
      "A branded house uses one master brand with descriptive sub-brands (e.g., Google Maps, Google Drive, Google Photos). All sub-brands leverage the equity of the master brand.",
  },
  {
    type: "multiple-choice",
    question:
      "Which brand architecture model does Procter & Gamble use with brands like Tide, Gillette, and Pampers?",
    options: [
      "Branded house",
      "House of brands",
      "Endorsed brand",
      "Monolithic brand",
    ],
    correctIndex: 1,
    explanation:
      "Procter & Gamble uses a house of brands architecture — a parent company with distinct, independently branded products. Each brand (Tide, Gillette, Pampers) has its own identity and equity.",
  },
  {
    type: "multiple-choice",
    question:
      "What accessibility standard should brand color combinations meet?",
    options: [
      "W3C validation standards",
      "WCAG contrast requirements",
      "ISO color certification",
      "ADA physical accessibility standards only",
    ],
    correctIndex: 1,
    explanation:
      "Brand color combinations should meet WCAG (Web Content Accessibility Guidelines) accessibility contrast requirements to ensure text remains readable for all users, including those with visual impairments.",
  },
  {
    type: "multiple-choice",
    question: "A logo system should include all of the following EXCEPT:",
    options: [
      "A primary logo and secondary/alternate logo",
      "Clear space requirements and minimum sizes",
      "Animated logo variations for every social platform",
      "Full color, single color, reversed, and monochrome versions",
    ],
    correctIndex: 2,
    explanation:
      "A logo system includes primary and secondary logos, clear space requirements, minimum sizes, and multiple color format versions. While animated logos can be useful, they are not a required component of every logo system.",
  },
  {
    type: "true-false",
    question:
      "Typography guidelines should include fallback font stacks for digital use.",
    correctAnswer: true,
    explanation:
      "Typography guidelines should specify fallback font stacks for digital use to ensure consistent rendering when the primary web font is unavailable. This is essential for performance and cross-platform compatibility.",
  },
  {
    type: "true-false",
    question:
      "The endorsed brand architecture model means sub-brands have no connection to the parent brand.",
    correctAnswer: false,
    explanation:
      "In the endorsed brand model, sub-brands carry their own identity but are endorsed by the parent brand (e.g., Courtyard by Marriott). They maintain a visible connection to the parent, unlike a house of brands where products are independently branded.",
  },
  {
    type: "multi-select",
    question:
      "Which color format specifications should be documented in brand guidelines? (Select all that apply)",
    options: ["HEX", "RGB", "CMYK", "Pantone", "ASCII"],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Brand guidelines should document color values in HEX (web), RGB (digital screens), CMYK (print), and Pantone (standardized color matching). ASCII is a text encoding standard, not a color format.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are components of a comprehensive logo system? (Select all that apply)",
    options: [
      "Primary logo",
      "Submark / favicon",
      "Animated mascot",
      "Clear space requirements",
      "Minimum size specifications",
      "Competitor logo comparisons",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "A comprehensive logo system includes the primary logo, submark/favicon, clear space requirements, and minimum size specifications. Animated mascots and competitor comparisons are not standard logo system components.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are primary brand architecture models? (Select all that apply)",
    options: [
      "Branded house",
      "House of brands",
      "Digital house",
      "Endorsed brand",
      "Hybrid",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "The four primary brand architecture models are branded house, house of brands, endorsed brand, and hybrid. Digital house is not a recognized brand architecture model.",
  },
  {
    type: "ordering",
    question:
      "Place the following typography hierarchy elements in order from largest to smallest:",
    items: [
      "H1 heading",
      "H2 heading",
      "Body text",
      "Caption text",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Typography hierarchy flows from largest to smallest: H1 headings are the largest, followed by H2 headings, then body text, and finally caption text at the smallest size.",
  },

  // ============================================================
  // SECTION 4: Execution & Implementation (12 questions)
  // 6 multiple-choice, 2 true-false, 3 multi-select, 1 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question:
      "What is a brand guidelines document also commonly called?",
    options: [
      "A marketing plan",
      "A brand book or brand standards manual",
      "A creative brief",
      "A content calendar",
    ],
    correctIndex: 1,
    explanation:
      "A brand guidelines document is also commonly called a brand book or brand standards manual. It serves as the single source of truth for anyone creating brand materials.",
  },
  {
    type: "multiple-choice",
    question:
      "What should the first section of a brand guidelines document typically cover?",
    options: [
      "Logo specifications and color codes",
      "Social media templates",
      "Brand story and foundations (mission, vision, values, personality)",
      "Print production specifications",
    ],
    correctIndex: 2,
    explanation:
      "The first section should cover brand story and foundations — mission, vision, values, brand personality, target audience personas, and positioning statement. This provides the 'why' behind every creative decision that follows.",
  },
  {
    type: "multiple-choice",
    question:
      "Why should brand guidelines include examples of common misuse?",
    options: [
      "To shame teams that make mistakes",
      "To fill extra pages in the document",
      "To clearly show what NOT to do, preventing common errors in brand execution",
      "To demonstrate how competitors misuse their own brands",
    ],
    correctIndex: 2,
    explanation:
      "Including common misuse examples clearly shows what NOT to do, helping teams avoid frequent errors such as stretching logos, using incorrect colors, or applying improper spacing. This proactive guidance prevents brand inconsistency.",
  },
  {
    type: "multiple-choice",
    question: "A brand rollout should begin with which audience first?",
    options: [
      "Social media followers",
      "Internal employees and stakeholders",
      "The general public through advertising",
      "Industry press and media",
    ],
    correctIndex: 1,
    explanation:
      "A successful brand rollout begins with an internal launch to educate employees and stakeholders. Everyone must understand and be able to articulate the brand before the external launch.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of a centralized brand asset library?",
    options: [
      "To store the brand guidelines PDF only",
      "To create an accessible repository of approved logos, templates, images, and brand files",
      "To track brand-related expenses",
      "To monitor competitor brand assets",
    ],
    correctIndex: 1,
    explanation:
      "A centralized brand asset library creates an accessible repository of all approved logos, templates, images, and brand files. This ensures teams always use current, approved assets rather than outdated or incorrect versions.",
  },
  {
    type: "multiple-choice",
    question:
      "During a phased brand transition, which touchpoints should be updated first?",
    options: [
      "Internal memos and documents",
      "Archived content and old blog posts",
      "Highest-visibility touchpoints (website, main social profiles)",
      "Employee business cards",
    ],
    correctIndex: 2,
    explanation:
      "A phased transition plan prioritizes highest-visibility touchpoints first — such as the website and main social media profiles — then systematically updates remaining materials in order of visibility and impact.",
  },
  {
    type: "true-false",
    question:
      "Application templates in brand guidelines should only cover digital materials, not print.",
    correctAnswer: false,
    explanation:
      "Application templates should cover both digital and print materials including business cards, letterhead, email signatures, social media templates, presentation decks, packaging mockups, signage, and merchandise.",
  },
  {
    type: "true-false",
    question:
      "Feedback loops from teams executing the brand can help identify gaps in brand guidelines.",
    correctAnswer: true,
    explanation:
      "Collecting input from teams executing the brand is essential to identify gaps, confusion, or impractical elements in the guidelines. This feedback drives iterative improvement of the guidelines document.",
  },
  {
    type: "multi-select",
    question:
      "Which sections should be included in a comprehensive brand guidelines document? (Select all that apply)",
    options: [
      "Brand story and foundations",
      "Visual identity standards",
      "Competitor analysis report",
      "Voice and messaging guidelines",
      "Application templates",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "A brand guidelines document includes brand story/foundations, visual identity standards, voice/messaging guidelines, and application templates. While competitor analysis informs brand strategy, it is not typically included in the guidelines document itself.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are best practices for a brand rollout? (Select all that apply)",
    options: [
      "Conduct internal training sessions",
      "Launch all touchpoints simultaneously",
      "Create a centralized asset library",
      "Collect feedback from executing teams",
      "Use a phased transition plan",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "Brand rollout best practices include internal training, centralized asset libraries, feedback loops, and phased transitions. Launching all touchpoints simultaneously is impractical and increases the risk of errors.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following should application templates cover? (Select all that apply)",
    options: [
      "Business cards and letterhead",
      "Social media templates",
      "Competitor marketing materials",
      "Presentation decks",
      "Email signatures",
      "Annual tax returns",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Application templates should cover business cards, letterhead, social media templates, presentation decks, email signatures, and other brand touchpoints. Competitor materials and tax returns are not brand application templates.",
  },
  {
    type: "ordering",
    question:
      "Place the following brand rollout steps in the correct sequence:",
    items: [
      "Internal launch and employee training",
      "Update highest-visibility digital properties",
      "Update physical touchpoints (signage, packaging, print)",
      "Collect feedback and refine guidelines",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "The brand rollout sequence starts with internal alignment (training), then moves to high-visibility digital properties (website, social media), followed by physical touchpoints (signage, packaging), and concludes with feedback collection and refinement.",
  },

  // ============================================================
  // SECTION 5: Measurement & Optimization (12 questions)
  // 6 multiple-choice, 2 true-false, 2 multi-select, 2 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What does 'brand awareness' measure?",
    options: [
      "How much money is spent on brand advertising",
      "Aided and unaided recall — how well people recognize and remember your brand",
      "The total number of products a brand sells",
      "How many employees can recite the mission statement",
    ],
    correctIndex: 1,
    explanation:
      "Brand awareness measures aided and unaided recall — how well people recognize and remember your brand. It is tracked through surveys, search volume for branded keywords, and share of voice in the industry.",
  },
  {
    type: "multiple-choice",
    question: "What is a brand consistency score?",
    options: [
      "A financial metric measuring brand value",
      "A quarterly audit measuring adherence to brand guidelines across touchpoints",
      "The number of brand assets available in the asset library",
      "A social media engagement metric",
    ],
    correctIndex: 1,
    explanation:
      "A brand consistency score comes from auditing touchpoints quarterly to measure adherence to guidelines — including logo usage, color accuracy, and voice alignment. It tracks how well the brand is being executed.",
  },
  {
    type: "multiple-choice",
    question: "What does NPS stand for in brand measurement?",
    options: [
      "New Product Strategy",
      "Net Promoter Score",
      "National Positioning Standard",
      "Net Performance Score",
    ],
    correctIndex: 1,
    explanation:
      "NPS stands for Net Promoter Score — a metric that gauges emotional perception and customer loyalty by asking how likely someone is to recommend your brand to others.",
  },
  {
    type: "multiple-choice",
    question: "What is brand equity?",
    options: [
      "The total assets listed on a company's balance sheet",
      "The financial premium a brand commands, including customer willingness to pay and lifetime value",
      "The number of trademarks a brand holds",
      "The percentage of market share a brand owns",
    ],
    correctIndex: 1,
    explanation:
      "Brand equity measures the financial premium your brand commands, including customer willingness to pay, retention rates, and lifetime value. Strong brand equity means customers choose and pay more for your brand specifically.",
  },
  {
    type: "multiple-choice",
    question: "How often should brand audits be conducted?",
    options: [
      "Only when launching a new product",
      "Every five years",
      "Annually at minimum",
      "Only after a brand crisis",
    ],
    correctIndex: 2,
    explanation:
      "Annual brand audits are recommended to evaluate consistency and relevance. They review all customer-facing touchpoints, survey stakeholders, and compare the brand identity against competitors. Small iterative updates prevent costly rebrands.",
  },
  {
    type: "multiple-choice",
    question:
      "When is a full rebrand (rather than a refresh) most appropriate?",
    options: [
      "When the logo looks slightly outdated",
      "When social media engagement drops temporarily",
      "When the business model, target audience, or competitive landscape has shifted dramatically",
      "When a new marketing director is hired",
    ],
    correctIndex: 2,
    explanation:
      "A full rebrand is appropriate when the business model, target audience, or competitive landscape has shifted dramatically — requiring a fundamental transformation of identity, positioning, or even the company name.",
  },
  {
    type: "true-false",
    question:
      "Brand sentiment can be monitored through social media mentions, reviews, and NPS scores.",
    correctAnswer: true,
    explanation:
      "Brand sentiment is effectively monitored through social media mentions, customer reviews, and NPS (Net Promoter Score). These sources provide insight into the emotional perception of your brand among your audience.",
  },
  {
    type: "true-false",
    question:
      "Once a brand identity is established, it should never be changed or updated.",
    correctAnswer: false,
    explanation:
      "Brands are living systems that must evolve with the audience, market conditions, and business growth. Regular audits and iterative updates keep the brand relevant while maintaining core equity.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are key brand metrics for measurement? (Select all that apply)",
    options: [
      "Brand awareness",
      "Brand consistency score",
      "Number of logo file downloads",
      "Brand sentiment",
      "Brand equity",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Key brand metrics include brand awareness, brand consistency score, brand sentiment, and brand equity. The number of logo file downloads is an operational metric, not a strategic brand health indicator.",
  },
  {
    type: "multi-select",
    question:
      "Which activities should be part of an annual brand audit? (Select all that apply)",
    options: [
      "Review all customer-facing touchpoints",
      "Redesign the logo",
      "Survey stakeholders",
      "Compare identity against competitors",
      "Change the brand's core values",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "An annual brand audit should review all customer-facing touchpoints, survey stakeholders, and compare the identity against competitors. Redesigning the logo or changing core values are not routine audit activities — they may result from audit findings but are separate strategic decisions.",
  },
  {
    type: "ordering",
    question:
      "Place the following brand evolution approaches in order from least to most transformative:",
    items: [
      "Minor asset updates (refresh templates)",
      "Brand refresh (update visual or messaging elements)",
      "Repositioning (change audience perception)",
      "Full rebrand (fundamental transformation of identity)",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Brand evolution ranges from minor asset updates (least transformative) through brand refreshes and repositioning to a full rebrand (most transformative, involving fundamental identity change).",
  },
  {
    type: "ordering",
    question:
      "Place the following brand measurement activities in the recommended frequency order from most frequent to least frequent:",
    items: [
      "Monitor social media mentions (ongoing)",
      "Track engagement metrics (monthly)",
      "Conduct brand consistency audits (quarterly)",
      "Perform comprehensive brand audits (annually)",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Brand measurement activities should be conducted at different frequencies: social media monitoring is ongoing, engagement metrics are tracked monthly, consistency audits are conducted quarterly, and comprehensive brand audits are performed annually.",
  },
];
