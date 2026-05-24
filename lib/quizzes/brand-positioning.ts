import type { QuizQuestion } from "@/lib/academy-data";

export const brandPositioningQuiz: QuizQuestion[] = [
  // ============================================================
  // SECTION 1: Introduction & Overview (12 questions)
  // 6 multiple-choice, 2 true-false, 2 multi-select, 2 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What is brand positioning?",
    options: [
      "The physical location of a brand's headquarters",
      "The strategic process of defining how your brand occupies a distinct place in the minds of your target audience relative to competitors",
      "The ranking of a brand on search engine results pages",
      "The order in which products are displayed on a shelf",
    ],
    correctIndex: 1,
    explanation:
      "Brand positioning is the strategic process of defining how your brand occupies a distinct and valued place in the minds of your target audience relative to competitors. It answers why a customer should choose you over every other option.",
  },
  {
    type: "multiple-choice",
    question:
      "Who originally articulated the foundational concept that 'Positioning is what you do to the mind of the prospect'?",
    options: [
      "Philip Kotler",
      "Seth Godin",
      "Al Ries and Jack Trout",
      "Peter Drucker",
    ],
    correctIndex: 2,
    explanation:
      "Al Ries and Jack Trout wrote in their foundational work on positioning: 'Positioning is not what you do to a product. Positioning is what you do to the mind of the prospect.' This captures the essence of positioning as a mental, not physical, exercise.",
  },
  {
    type: "multiple-choice",
    question:
      "Brand positioning serves as the foundation for which business decisions?",
    options: [
      "Only advertising campaign decisions",
      "All marketing, messaging, product development, and customer experience decisions",
      "Only pricing decisions",
      "Only visual design decisions",
    ],
    correctIndex: 1,
    explanation:
      "Effective positioning is the foundation upon which ALL marketing, messaging, product development, and customer experience decisions are built. It is not limited to any single business function.",
  },
  {
    type: "multiple-choice",
    question:
      "The 'battle for market share' is ultimately won or lost in:",
    options: [
      "The retail environment",
      "The advertising budget",
      "The mental space your brand occupies in the prospect's mind",
      "The supply chain efficiency",
    ],
    correctIndex: 2,
    explanation:
      "According to positioning theory, the battle for market share is ultimately won or lost in the mental space your brand occupies. Positioning is fundamentally about owning a distinct perception in the customer's mind.",
  },
  {
    type: "multiple-choice",
    question: "Brand positioning is relevant for:",
    options: [
      "Only new brands entering the market",
      "Only established brands needing a refresh",
      "Both new brands entering crowded markets and established brands capturing new opportunities",
      "Only luxury brands seeking premium pricing",
    ],
    correctIndex: 2,
    explanation:
      "Brand positioning is relevant for both new brands entering crowded markets and established brands looking to capture new opportunities. Every brand, regardless of stage, benefits from deliberate positioning strategy.",
  },
  {
    type: "multiple-choice",
    question: "What fundamental question does brand positioning answer?",
    options: [
      "How much should we charge for our product?",
      "Why should a customer choose you over every other option available?",
      "What colors should our brand use?",
      "How many employees should we hire?",
    ],
    correctIndex: 1,
    explanation:
      "Brand positioning answers the fundamental question: why should a customer choose you over every other option available to them? This question drives all positioning strategy and execution.",
  },
  {
    type: "true-false",
    question:
      "Positioning is something you do to a product or service.",
    correctAnswer: false,
    explanation:
      "As Al Ries and Jack Trout stated, positioning is NOT what you do to a product — it is what you do to the mind of the prospect. The focus is on managing perceptions, not modifying products.",
  },
  {
    type: "true-false",
    question:
      "Effective brand positioning helps differentiate a company in a crowded marketplace.",
    correctAnswer: true,
    explanation:
      "Effective positioning defines how your brand occupies a distinct and valued place relative to competitors. This differentiation is essential for standing out in crowded markets where products and services may be similar.",
  },
  {
    type: "multi-select",
    question:
      "Which strategic frameworks are covered in this lesson? (Select all that apply)",
    options: [
      "Competitive analysis",
      "Supply chain optimization",
      "Perceptual maps",
      "Blue ocean strategy",
      "Category creation",
      "Inventory management",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "This lesson covers competitive analysis, perceptual maps, blue ocean strategy, and category creation. Supply chain optimization and inventory management are operations topics, not brand positioning frameworks.",
  },
  {
    type: "multi-select",
    question:
      "What does effective brand positioning provide? (Select all that apply)",
    options: [
      "A distinct place in the customer's mind",
      "Guaranteed market dominance",
      "Differentiation from competitors",
      "Foundation for marketing and messaging decisions",
      "Automatic customer loyalty",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Effective positioning provides a distinct mental position, differentiation, and a foundation for decisions. It does not guarantee market dominance or automatic loyalty — those require execution across many dimensions.",
  },
  {
    type: "ordering",
    question:
      "Place the following brand positioning activities in the correct strategic sequence:",
    items: [
      "Conduct competitive analysis",
      "Identify white space and opportunities",
      "Craft positioning statement",
      "Execute positioning through marketing and messaging",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Positioning follows a logical sequence: first understand the competitive landscape, then identify opportunities in that landscape, craft the positioning statement to claim that space, and finally execute through marketing and messaging.",
  },
  {
    type: "ordering",
    question:
      "Rank the following from most foundational positioning concept to most advanced strategy:",
    items: [
      "Understanding competitive landscape",
      "Crafting a positioning statement",
      "Building value propositions",
      "Category creation and blue ocean strategy",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Positioning concepts range from foundational to advanced: understanding the competitive landscape is the starting point, positioning statements define your claim, value propositions bring it to life, and category creation/blue ocean strategies represent the most advanced approaches.",
  },

  // ============================================================
  // SECTION 2: Core Concepts (12 questions)
  // 6 multiple-choice, 2 true-false, 3 multi-select, 1 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What are direct competitors?",
    options: [
      "Businesses in a completely different industry",
      "Businesses offering the same product or service to the same target audience",
      "Businesses that share the same office building",
      "Businesses that advertise on the same platforms",
    ],
    correctIndex: 1,
    explanation:
      "Direct competitors are businesses offering the same product or service to the same target audience. For example, Coca-Cola and Pepsi are direct competitors in the carbonated soft drink market.",
  },
  {
    type: "multiple-choice",
    question: "What are indirect competitors?",
    options: [
      "Businesses in a partnership with your company",
      "Businesses solving the same problem with a different approach",
      "Businesses that are geographically distant",
      "Businesses with a smaller marketing budget",
    ],
    correctIndex: 1,
    explanation:
      "Indirect competitors solve the same customer problem with a different approach. For example, Coca-Cola's indirect competitor could be a smoothie brand — different product, but competing for the same 'refreshing beverage' need.",
  },
  {
    type: "multiple-choice",
    question: "What is a perceptual map?",
    options: [
      "A road map showing a brand's physical retail locations",
      "A visual tool that plots brands on a two-dimensional grid based on attributes that matter to consumers",
      "A flowchart of the customer purchase journey",
      "A diagram of a company's organizational structure",
    ],
    correctIndex: 1,
    explanation:
      "A perceptual map (or positioning map) is a visual tool that plots brands on a two-dimensional grid based on attributes important to consumers. It helps identify white space — unoccupied positions where a brand could differentiate.",
  },
  {
    type: "multiple-choice",
    question:
      "What should perceptual map positions be based on?",
    options: [
      "The company CEO's personal preferences",
      "Customer perceptions, not internal assumptions",
      "Advertising budget size",
      "Product feature count",
    ],
    correctIndex: 1,
    explanation:
      "Perceptual map positions should be based on customer perceptions, not internal assumptions. Researching actual customer views through surveys or review analysis ensures the map accurately represents the market landscape.",
  },
  {
    type: "multiple-choice",
    question:
      "What are substitute competitors?",
    options: [
      "Businesses that act as temporary replacements for your company",
      "Entirely different categories that compete for the same budget or attention",
      "Companies that copy your product design",
      "Distributors who sell your products alongside others",
    ],
    correctIndex: 1,
    explanation:
      "Substitute competitors come from entirely different categories but compete for the same budget or attention. For example, premium water could be a substitute competitor for Coca-Cola — different category, same consumer spending.",
  },
  {
    type: "multiple-choice",
    question:
      "The primary purpose of competitive analysis in positioning is to:",
    options: [
      "Copy the best elements from each competitor",
      "Identify strengths, weaknesses, opportunities, and gaps in the market for differentiated positioning",
      "Determine which competitor to acquire",
      "Set identical pricing to the market leader",
    ],
    correctIndex: 1,
    explanation:
      "Competitive analysis identifies strengths, weaknesses, opportunities, and threats to provide the market context necessary for differentiated positioning. The goal is to find gaps and unmet needs, not to copy competitors.",
  },
  {
    type: "true-false",
    question:
      "A perceptual map should only include direct competitors, not indirect or substitute competitors.",
    correctAnswer: false,
    explanation:
      "A perceptual map can and often should include indirect and substitute competitors, as they compete for the same customer needs and budgets. Including all relevant competitors provides a more complete view of the market landscape.",
  },
  {
    type: "true-false",
    question:
      "White space on a perceptual map represents unoccupied or underrepresented positions in the market.",
    correctAnswer: true,
    explanation:
      "White space on a perceptual map represents positions that are unoccupied or underrepresented — potential opportunities where a brand could create strong differentiation without direct head-to-head competition.",
  },
  {
    type: "multi-select",
    question:
      "Which competitor types should be analyzed in a comprehensive competitive analysis? (Select all that apply)",
    options: [
      "Direct competitors",
      "Indirect competitors",
      "Substitute competitors",
      "Aspirational competitors",
      "All of the above",
    ],
    correctIndices: [0, 1, 2, 3, 4],
    explanation:
      "A comprehensive competitive analysis should include direct competitors (same product/audience), indirect competitors (different approach, same problem), substitute competitors (different category, same budget), and aspirational competitors (brands to learn from).",
  },
  {
    type: "multi-select",
    question:
      "Common axes used in perceptual maps include which of the following? (Select all that apply)",
    options: [
      "Price (low to high)",
      "Quality (basic to premium)",
      "Employee count (small to large)",
      "Innovation (traditional to cutting-edge)",
      "Accessibility (niche to mass-market)",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Common perceptual map axes include price, quality, innovation, and accessibility — attributes that matter to consumers when evaluating brands. Employee count is an internal business metric, not a consumer-facing attribute.",
  },
  {
    type: "multi-select",
    question:
      "For each competitor in a competitive analysis, what should you analyze? (Select all that apply)",
    options: [
      "Their positioning statement and value propositions",
      "Their visual identity and key messaging",
      "Their employee satisfaction scores",
      "Their pricing strategy and target audience",
      "Their customer reviews and channel strategy",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "For each competitor, analyze their positioning, value propositions, messaging, visual identity, pricing, target audience, channel strategy, and customer reviews. Employee satisfaction is an internal HR metric not directly relevant to competitive positioning analysis.",
  },
  {
    type: "ordering",
    question:
      "Place the following perceptual map creation steps in the correct order:",
    items: [
      "Select two attributes most relevant to your category",
      "Research customer perceptions through surveys",
      "Plot competitors on the grid based on customer perception",
      "Identify clusters, gaps, and opportunities",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Perceptual map creation follows a systematic process: select relevant attributes, research actual customer perceptions, plot competitors on the grid, and then analyze the resulting patterns to identify opportunities.",
  },

  // ============================================================
  // SECTION 3: Strategy & Planning (12 questions)
  // 6 multiple-choice, 2 true-false, 2 multi-select, 2 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What is a positioning statement?",
    options: [
      "A customer-facing tagline used in advertising",
      "An internal strategic document that articulates who you serve, your category, unique benefit, and reason to believe",
      "A press release announcing a new product",
      "A financial statement showing brand value",
    ],
    correctIndex: 1,
    explanation:
      "A positioning statement is an internal strategic document that concisely articulates who you serve, what category you compete in, what unique benefit you deliver, and why customers should believe you. It is NOT a tagline — it is the foundation from which taglines are derived.",
  },
  {
    type: "multiple-choice",
    question:
      "The positioning statement framework follows which structure?",
    options: [
      "Product name + price point + distribution channel",
      "For [target audience], [brand] is the [category] that [key benefit] because [reason to believe]",
      "Mission + vision + values + tagline",
      "Problem + solution + call to action",
    ],
    correctIndex: 1,
    explanation:
      "The standard positioning statement framework is: For [target audience], [brand name] is the [category/frame of reference] that [key benefit/point of difference] because [reason to believe].",
  },
  {
    type: "multiple-choice",
    question:
      "Which type of differentiation does Harley-Davidson primarily use?",
    options: [
      "Functional differentiation through superior engine performance",
      "Price-value differentiation through affordable pricing",
      "Emotional differentiation — selling freedom and rebellion, not just motorcycles",
      "Experiential differentiation through retail store design",
    ],
    correctIndex: 2,
    explanation:
      "Harley-Davidson primarily uses emotional differentiation — selling freedom and rebellion rather than just motorcycles. This emotional connection creates loyalty that transcends product features and specifications.",
  },
  {
    type: "multiple-choice",
    question:
      "Which differentiation strategy does Apple primarily use?",
    options: [
      "Price-value differentiation through lowest prices",
      "Functional differentiation through most features",
      "Experiential differentiation through seamless ecosystem, retail design, and unboxing",
      "Emotional differentiation through nostalgic advertising",
    ],
    correctIndex: 2,
    explanation:
      "Apple primarily uses experiential differentiation through seamless ecosystem integration, retail store design, and premium unboxing experiences. The total customer experience from discovery to post-sale is their key differentiator.",
  },
  {
    type: "multiple-choice",
    question:
      "A strong positioning statement should be all of the following EXCEPT:",
    options: [
      "Specific — clearly defines the target",
      "Differentiated — identifies a unique point of difference",
      "Vague — applicable to any market or audience",
      "Sustainable — defensible over time against competitive imitation",
    ],
    correctIndex: 2,
    explanation:
      "A strong positioning statement should be specific, differentiated, credible, and sustainable. Vagueness is the opposite of effective positioning — a statement that could apply to any brand provides no differentiation.",
  },
  {
    type: "multiple-choice",
    question:
      "Price-value differentiation is best described as:",
    options: [
      "Always being the cheapest option in the market",
      "Offering the best value equation at a given price point",
      "Charging the highest price to signal premium quality",
      "Matching the exact price of the market leader",
    ],
    correctIndex: 1,
    explanation:
      "Price-value differentiation is about offering the best value equation at a given price point — not always being cheapest. IKEA exemplifies this by delivering design-forward furniture at mass-market prices.",
  },
  {
    type: "true-false",
    question:
      "A positioning statement and a tagline are the same thing.",
    correctAnswer: false,
    explanation:
      "A positioning statement is an internal strategic document — not a tagline. It is the strategic foundation from which taglines, messaging, and creative executions are derived. Taglines are external-facing; positioning statements are internal.",
  },
  {
    type: "true-false",
    question:
      "Emotional differentiation can create customer loyalty that transcends product features.",
    correctAnswer: true,
    explanation:
      "Emotional differentiation creates deep connections with customers that transcend product features. When customers buy into the feelings and identity a brand represents (like Harley-Davidson's freedom), loyalty endures even as product features change.",
  },
  {
    type: "multi-select",
    question:
      "What qualities should a strong positioning statement have? (Select all that apply)",
    options: [
      "Specific",
      "Differentiated",
      "Credible",
      "Generic enough to apply broadly",
      "Sustainable against competitive imitation",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "A strong positioning statement should be specific, differentiated, credible, and sustainable. Being generic defeats the purpose of positioning — the goal is to claim a distinct space, not a broad one.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are types of brand differentiation strategies? (Select all that apply)",
    options: [
      "Functional differentiation",
      "Emotional differentiation",
      "Geographical differentiation",
      "Experiential differentiation",
      "Price-value differentiation",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "The four main differentiation strategies are functional (superior features), emotional (feelings and identity), experiential (total customer experience), and price-value (best value equation). Geographical differentiation is not a standard positioning strategy.",
  },
  {
    type: "ordering",
    question:
      "Place the following positioning statement components in the correct framework order:",
    items: [
      "Target audience (For...)",
      "Category / frame of reference (is the...)",
      "Key benefit / point of difference (that...)",
      "Reason to believe (because...)",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "The positioning statement framework follows this order: For [target audience], [brand] is the [category] that [key benefit/point of difference] because [reason to believe].",
  },
  {
    type: "ordering",
    question:
      "Rank the following differentiation strategies from most easily copied by competitors to most difficult to replicate:",
    items: [
      "Price-value differentiation",
      "Functional differentiation (features)",
      "Experiential differentiation",
      "Emotional differentiation (brand meaning)",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Differentiation defensibility increases: price can be matched quickly, features can be copied over time, experiences require organizational capability to replicate, and emotional meaning/identity is the hardest to copy because it is built over years.",
  },

  // ============================================================
  // SECTION 4: Execution & Implementation (12 questions)
  // 6 multiple-choice, 2 true-false, 3 multi-select, 1 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What is blue ocean strategy?",
    options: [
      "A strategy focused on competing aggressively in existing markets",
      "A strategy that challenges brands to create uncontested market space where competition is irrelevant",
      "A maritime shipping logistics optimization strategy",
      "A social media strategy focused on aquatic-themed content",
    ],
    correctIndex: 1,
    explanation:
      "Blue ocean strategy, developed by W. Chan Kim and Renee Mauborgne, challenges brands to stop competing in crowded 'red oceans' and instead create uncontested market space — 'blue oceans' — where competition is irrelevant.",
  },
  {
    type: "multiple-choice",
    question:
      "Which of the following is NOT one of the Four Actions in the Blue Ocean Framework?",
    options: ["Eliminate", "Reduce", "Replicate", "Create"],
    correctIndex: 2,
    explanation:
      "The Four Actions Framework consists of Eliminate, Reduce, Raise, and Create. 'Replicate' is not one of the four actions — in fact, the strategy specifically aims to move away from copying existing market practices.",
  },
  {
    type: "multiple-choice",
    question: "What is category creation?",
    options: [
      "Reorganizing products within an existing retail category",
      "Defining and owning an entirely new market category where you become the default leader",
      "Creating a new product line within an existing category",
      "Filing a trademark for a new product name",
    ],
    correctIndex: 1,
    explanation:
      "Category creation is the strategy of defining and owning an entirely new market category. When you create a category, you become the default leader by definition — as Salesforce did with 'cloud CRM' and HubSpot with 'inbound marketing.'",
  },
  {
    type: "multiple-choice",
    question:
      "When is repositioning most necessary?",
    options: [
      "When a company hires a new marketing director",
      "When market conditions shift, a competitor disrupts, the audience evolves, or current positioning no longer drives growth",
      "Every calendar year as a routine exercise",
      "Only when sales decline for two consecutive years",
    ],
    correctIndex: 1,
    explanation:
      "Repositioning is necessary when market conditions shift, a new competitor disrupts the landscape, the audience evolves, or the current positioning no longer drives growth. It is triggered by strategic need, not arbitrary schedules.",
  },
  {
    type: "multiple-choice",
    question:
      "Why should repositioning typically follow a gradual transition approach?",
    options: [
      "Because gradual changes are cheaper",
      "Because abrupt repositioning can alienate existing customers",
      "Because regulatory agencies require gradual changes",
      "Because designers need time to create new assets",
    ],
    correctIndex: 1,
    explanation:
      "Abrupt repositioning can alienate existing customers. A phased approach bridges the current and desired positions, maintaining elements of brand equity that still resonate while evolving the aspects that need to change.",
  },
  {
    type: "multiple-choice",
    question:
      "Why is internal alignment critical before an external repositioning launch?",
    options: [
      "To get budget approval from finance",
      "Because confused employees create confused customers",
      "To update the company's legal documents first",
      "Because IT systems need to be reconfigured",
    ],
    correctIndex: 1,
    explanation:
      "Every team member must understand and embody the new positioning before the external launch. Confused employees create confused customers, so investing in training, workshops, and internal communications is critical.",
  },
  {
    type: "true-false",
    question:
      "The 'Raise' action in the Blue Ocean Framework asks which factors should be raised well above the industry standard.",
    correctAnswer: true,
    explanation:
      "The 'Raise' action in the Four Actions Framework asks: which factors should be raised well above the industry standard? This identifies areas where exceeding expectations creates new value for customers.",
  },
  {
    type: "true-false",
    question:
      "Repositioning should always be based on data and evidence, not just intuition.",
    correctAnswer: true,
    explanation:
      "Repositioning requires a clear rationale supported by data — declining market share, brand perception studies, competitive analysis. Repositioning without evidence often leads to confusion rather than clarity.",
  },
  {
    type: "multi-select",
    question:
      "What are the four actions in the Blue Ocean Four Actions Framework? (Select all that apply)",
    options: [
      "Eliminate",
      "Reduce",
      "Replicate",
      "Raise",
      "Create",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "The Four Actions Framework consists of Eliminate (remove industry-standard factors), Reduce (lower factors below standard), Raise (increase factors above standard), and Create (introduce new factors). 'Replicate' is not part of the framework.",
  },
  {
    type: "multi-select",
    question:
      "Which brands are examples of successful category creation? (Select all that apply)",
    options: [
      "Salesforce (cloud CRM)",
      "HubSpot (inbound marketing)",
      "Coca-Cola (carbonated beverages)",
      "Uber (ride-sharing)",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Salesforce created 'cloud CRM,' HubSpot created 'inbound marketing,' and Uber created 'ride-sharing.' Coca-Cola operates within the existing carbonated beverage category rather than having created it.",
  },
  {
    type: "multi-select",
    question:
      "What does successful repositioning require? (Select all that apply)",
    options: [
      "Clear rationale supported by data",
      "Gradual transition to avoid alienating existing customers",
      "Complete abandonment of all existing brand equity",
      "Internal alignment before external launch",
      "Training and workshops for employees",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Successful repositioning requires data-driven rationale, gradual transition, internal alignment, and employee training. Complete abandonment of brand equity is counterproductive — the goal is to evolve while maintaining elements that still resonate.",
  },
  {
    type: "ordering",
    question:
      "Place the following category creation steps in the correct order:",
    items: [
      "Name the new category",
      "Educate the market on the problem the category solves",
      "Establish your brand as the category pioneer",
      "Build a community of evangelists to spread the narrative",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Category creation follows a progression: first name the category to define it, then educate the market on the problem it solves, establish your brand as the pioneer, and finally build an evangelist community to amplify the category narrative.",
  },

  // ============================================================
  // SECTION 5: Measurement & Optimization (12 questions)
  // 6 multiple-choice, 2 true-false, 2 multi-select, 2 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What does 'share of voice' measure?",
    options: [
      "The volume level of your brand's audio advertising",
      "Your brand's visibility relative to competitors across search, social, PR, and advertising",
      "The number of customer service calls your brand handles",
      "The percentage of employees who can recite the brand tagline",
    ],
    correctIndex: 1,
    explanation:
      "Share of voice measures your brand's visibility relative to competitors across search, social media, PR, and advertising channels. It is a key indicator of how prominently your brand appears in the market conversation.",
  },
  {
    type: "multiple-choice",
    question: "What do brand association studies measure?",
    options: [
      "How many brands a customer has purchased in the past year",
      "Which attributes audiences associate with your brand vs. competitors",
      "The number of partnerships your brand has with other companies",
      "How many brand assets exist in your library",
    ],
    correctIndex: 1,
    explanation:
      "Brand association studies survey your audience to measure which attributes they associate with your brand vs. competitors. The results should align with your intended positioning — misalignment signals a need for adjustment.",
  },
  {
    type: "multiple-choice",
    question: "What is consideration set tracking?",
    options: [
      "Tracking which products customers add to their shopping cart",
      "Monitoring whether your brand is included when customers evaluate options in your category",
      "Measuring the number of consideration meetings held internally",
      "Tracking how long customers consider before making a purchase",
    ],
    correctIndex: 1,
    explanation:
      "Consideration set tracking monitors whether your brand is included when customers evaluate options in your category. It is tracked through surveys, search behavior analysis, and win/loss data to ensure your positioning keeps you in the competitive conversation.",
  },
  {
    type: "multiple-choice",
    question:
      "How often should positioning reviews be conducted?",
    options: ["Weekly", "Monthly", "Quarterly", "Every five years"],
    correctIndex: 2,
    explanation:
      "Quarterly positioning reviews should be built into your marketing rhythm. They involve updating perceptual maps, reviewing brand association metrics, analyzing win/loss patterns, and assessing messaging resonance.",
  },
  {
    type: "multiple-choice",
    question:
      "What does price premium analysis indicate about brand positioning?",
    options: [
      "Whether your products are overpriced",
      "Whether strong positioning enables premium pricing and customers are willing to pay more",
      "The exact price point to set for maximum profit",
      "How competitor pricing has changed over time",
    ],
    correctIndex: 1,
    explanation:
      "Price premium analysis indicates whether strong positioning enables premium pricing. Tracking your price relative to competitors and monitoring customer willingness to pay reveals whether your positioning justifies a premium in the market.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the best foundation for a defensible brand position?",
    options: [
      "Having the largest advertising budget",
      "Positioning on features that competitors can easily copy",
      "The intersection of unique capabilities, audience needs, and competitor white space",
      "Copying the positioning of the current market leader",
    ],
    correctIndex: 2,
    explanation:
      "The strongest positions are built on the intersection of your unique capabilities, your audience's deepest needs, and the white space competitors have left unoccupied. This 'sweet spot' creates positioning that is both defensible and compelling.",
  },
  {
    type: "true-false",
    question:
      "Positioning on features alone is a strong long-term strategy because features are difficult for competitors to replicate.",
    correctAnswer: false,
    explanation:
      "Positioning on features alone is NOT a strong long-term strategy because features can be copied. Instead, position on the intersection of unique capabilities, audience needs, and competitive white space for defensible, sustainable positioning.",
  },
  {
    type: "true-false",
    question:
      "Small adjustments like sharpening language and refining target audience definitions can keep positioning fresh without a full repositioning effort.",
    correctAnswer: true,
    explanation:
      "Small adjustments — sharpening language, emphasizing different proof points, refining target audience definitions — can keep positioning fresh and relevant without requiring a disruptive full repositioning effort.",
  },
  {
    type: "multi-select",
    question:
      "Which metrics should be tracked to assess positioning health? (Select all that apply)",
    options: [
      "Share of voice",
      "Brand association alignment",
      "Office square footage",
      "Consideration set inclusion",
      "Price premium analysis",
      "Competitive movement monitoring",
    ],
    correctIndices: [0, 1, 3, 4, 5],
    explanation:
      "Positioning health metrics include share of voice, brand association alignment, consideration set tracking, price premium analysis, and competitive movement monitoring. Office square footage is a facilities metric with no relevance to positioning.",
  },
  {
    type: "multi-select",
    question:
      "What should a quarterly positioning review include? (Select all that apply)",
    options: [
      "Update perceptual map with fresh competitive data",
      "Review brand association metrics",
      "Redesign the company logo",
      "Analyze win/loss patterns",
      "Assess whether messaging still resonates",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "A quarterly positioning review should update the perceptual map, review brand associations, analyze win/loss patterns, and assess messaging resonance. Logo redesign is a major brand decision, not a quarterly review activity.",
  },
  {
    type: "ordering",
    question:
      "Place the following positioning optimization steps in the correct sequence:",
    items: [
      "Update perceptual map with fresh data",
      "Review brand association metrics",
      "Identify messaging gaps and opportunities",
      "Implement language and proof point adjustments",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Positioning optimization follows a data-to-action sequence: update the market map with fresh data, review how associations are tracking, identify specific gaps, and then implement targeted adjustments to language and proof points.",
  },
  {
    type: "ordering",
    question:
      "Rank the following positioning defenses from weakest to strongest long-term protection:",
    items: [
      "Feature-based positioning",
      "Price-based positioning",
      "Experience-based positioning",
      "Positioning on the intersection of unique capabilities, audience needs, and competitive white space",
    ],
    correctOrder: [1, 0, 2, 3],
    explanation:
      "Long-term positioning defensibility: price-based is weakest (easily matched), feature-based is slightly stronger but still copyable, experience-based requires organizational capability to replicate, and the intersection of unique capabilities, needs, and white space is most defensible.",
  },
];
