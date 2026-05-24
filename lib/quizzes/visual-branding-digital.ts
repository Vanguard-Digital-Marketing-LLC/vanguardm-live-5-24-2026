import type { QuizQuestion } from "@/lib/academy-data";

export const visualBrandingDigitalQuiz: QuizQuestion[] = [
  // ============================================================
  // SECTION 1: Introduction & Overview (12 questions)
  // 6 multiple-choice, 2 true-false, 2 multi-select, 2 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question:
      "How quickly do people form a first impression of a brand, according to research?",
    options: [
      "5 seconds",
      "1 second",
      "50 milliseconds",
      "500 milliseconds",
    ],
    correctIndex: 2,
    explanation:
      "Research shows that people form a first impression of a brand in just 50 milliseconds, and 94% of those first impressions are design-related. Visual branding is the first and most powerful communication tool.",
  },
  {
    type: "multiple-choice",
    question:
      "What percentage of first impressions of a brand are design-related?",
    options: ["50%", "72%", "85%", "94%"],
    correctIndex: 3,
    explanation:
      "94% of first impressions are design-related, emphasizing that visual branding is not decoration — it is your most immediate and impactful communication tool.",
  },
  {
    type: "multiple-choice",
    question: "Visual branding for digital platforms requires:",
    options: [
      "Only aesthetic taste and creative instinct",
      "A systematic approach to color, typography, imagery, and layout across formats and screen sizes",
      "Only a well-designed logo",
      "Hiring a full-time graphic designer",
    ],
    correctIndex: 1,
    explanation:
      "Effective visual branding for digital platforms requires a systematic approach to color, typography, imagery, and layout that maintains consistency across dozens of formats and screen sizes — not just aesthetic taste alone.",
  },
  {
    type: "multiple-choice",
    question:
      "Which of the following best describes the scope of digital visual branding?",
    options: [
      "Creating logos and business cards",
      "Managing social media profiles only",
      "A comprehensive system spanning social media, websites, email, ads, and all digital touchpoints",
      "Selecting stock photography for blog posts",
    ],
    correctIndex: 2,
    explanation:
      "Digital visual branding is a comprehensive system that spans social media ads, website landing pages, email newsletters, digital advertising, and all other digital touchpoints where audiences encounter your brand.",
  },
  {
    type: "multiple-choice",
    question:
      "Why is visual branding considered a communication tool rather than decoration?",
    options: [
      "Because it is expensive to produce",
      "Because it communicates brand identity in milliseconds before any text is read",
      "Because regulatory agencies require specific visual standards",
      "Because search engines index images",
    ],
    correctIndex: 1,
    explanation:
      "Visual elements communicate your brand identity in milliseconds — long before a single word is read. This makes visual branding a primary communication tool, not merely decorative.",
  },
  {
    type: "multiple-choice",
    question: "This lesson covers all of the following EXCEPT:",
    options: [
      "Color psychology and typography pairing",
      "Social media templates and design systems",
      "Product manufacturing and packaging processes",
      "Canva and Figma usage for brand execution",
    ],
    correctIndex: 2,
    explanation:
      "This lesson covers color psychology, typography pairing, imagery guidelines, social media templates, design systems, and Canva/Figma usage. Product manufacturing and packaging processes are not within the scope of digital visual branding.",
  },
  {
    type: "true-false",
    question:
      "Visual branding is only important for consumer-facing brands, not B2B companies.",
    correctAnswer: false,
    explanation:
      "Visual branding is critical for all brands — B2B and B2C alike. B2B audiences also form impressions based on design quality, and strong visual branding builds credibility and trust regardless of the business model.",
  },
  {
    type: "true-false",
    question:
      "Consistency in visual branding across digital channels helps build audience recognition over time.",
    correctAnswer: true,
    explanation:
      "Consistent visual branding across all digital channels creates cumulative recognition. When audiences see the same colors, typography, and imagery style repeatedly, they develop automatic brand association and trust.",
  },
  {
    type: "multi-select",
    question:
      "Which visual elements are essential components of digital visual branding? (Select all that apply)",
    options: [
      "Color palette",
      "Typography",
      "Office interior design",
      "Imagery and photography style",
      "Layout and grid systems",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Essential digital visual branding components include color palette, typography, imagery/photography style, and layout/grid systems. Office interior design is a physical space concern, not a digital visual branding element.",
  },
  {
    type: "multi-select",
    question:
      "Which digital touchpoints require consistent visual branding? (Select all that apply)",
    options: [
      "Social media ads",
      "Website landing pages",
      "Email newsletters",
      "Internal code repositories",
      "Digital advertising banners",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Social media ads, website landing pages, email newsletters, and digital advertising banners all require consistent visual branding. Internal code repositories are development tools, not customer-facing brand touchpoints.",
  },
  {
    type: "ordering",
    question:
      "Place the following visual branding development phases in the correct order:",
    items: [
      "Define color palette and typography",
      "Establish imagery guidelines",
      "Build design systems and component libraries",
      "Create channel-specific templates",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Visual branding development progresses logically: first define foundational elements (color, type), then establish imagery guidelines, build systematic design components, and finally create channel-specific templates.",
  },
  {
    type: "ordering",
    question:
      "Rank the following factors from most immediate to least immediate in forming a brand impression:",
    items: [
      "Visual design elements (color, layout)",
      "Typography and text styling",
      "Content and messaging quality",
      "Product or service experience",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Brand impressions form from most immediate to least: visual design is perceived in milliseconds, followed by typography, then content quality as text is read, and finally the product/service experience over time.",
  },

  // ============================================================
  // SECTION 2: Core Concepts (12 questions)
  // 6 multiple-choice, 2 true-false, 3 multi-select, 1 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What does color psychology study?",
    options: [
      "How to mix paint colors for printing",
      "How colors influence human perception, emotion, and behavior",
      "How to choose colors that look good together",
      "The chemical composition of pigments",
    ],
    correctIndex: 1,
    explanation:
      "Color psychology is the study of how colors influence human perception, emotion, and behavior. In branding, color choices communicate values, evoke feelings, and drive action.",
  },
  {
    type: "multiple-choice",
    question:
      "Which color is most commonly associated with trust, stability, and professionalism?",
    options: ["Red", "Green", "Blue", "Yellow"],
    correctIndex: 2,
    explanation:
      "Blue communicates trust, stability, and professionalism. It is used by brands like Facebook and IBM precisely because of these associations. Blue is the most commonly used color in corporate branding.",
  },
  {
    type: "multiple-choice",
    question:
      "Which color conveys urgency, passion, and energy?",
    options: ["Purple", "Green", "Orange", "Red"],
    correctIndex: 3,
    explanation:
      "Red conveys urgency, passion, and energy. It is used by brands like Coca-Cola and YouTube. As a warm color, red advances visually and creates a sense of excitement.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the most reliable approach to typography pairing?",
    options: [
      "Using three or more display typefaces for variety",
      "Pairing a display typeface for headlines with a text typeface for body copy",
      "Using a single typeface weight for all content",
      "Randomly selecting typefaces from different eras",
    ],
    correctIndex: 1,
    explanation:
      "The most reliable typography pairing approach combines a display typeface for headlines with a text typeface for body copy. This creates clear visual hierarchy while maintaining readability.",
  },
  {
    type: "multiple-choice",
    question: "Why are variable fonts recommended for digital branding?",
    options: [
      "They are always free to use",
      "They reduce HTTP requests by consolidating multiple weights into a single file",
      "They look better on paper",
      "They are required by accessibility standards",
    ],
    correctIndex: 1,
    explanation:
      "Variable fonts consolidate multiple weights and styles into a single file, reducing HTTP requests and improving page load performance. This is especially important for digital platforms where performance impacts user experience.",
  },
  {
    type: "multiple-choice",
    question:
      "What does 'x-height' refer to in typography?",
    options: [
      "The maximum width of a character",
      "The height of lowercase letters relative to the baseline, which affects readability",
      "The spacing between lines of text",
      "The height of capital letters",
    ],
    correctIndex: 1,
    explanation:
      "X-height refers to the height of lowercase letters (specifically the letter 'x') relative to the baseline. Typefaces with generous x-height tend to be more legible at small sizes on screens, making them ideal for digital body text.",
  },
  {
    type: "true-false",
    question:
      "Color associations are universal across all cultures and regions.",
    correctAnswer: false,
    explanation:
      "Color associations vary across cultures and regions. For example, white symbolizes purity in Western cultures but is associated with mourning in some Eastern cultures. Understanding cultural context is important for global brands.",
  },
  {
    type: "true-false",
    question:
      "Neutral colors like black, white, and gray provide essential contrast and breathing room within a color palette.",
    correctAnswer: true,
    explanation:
      "Neutral colors provide essential contrast and breathing room within color palettes. They balance the energy of primary and accent colors, create visual hierarchy, and prevent designs from feeling overwhelming.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are warm colors and their typical brand associations? (Select all that apply)",
    options: [
      "Red — urgency, passion, energy",
      "Blue — trust, stability",
      "Orange — enthusiasm, creativity, friendliness",
      "Yellow — optimism, warmth, attention",
      "Green — growth, health",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Warm colors include red (urgency, passion, energy), orange (enthusiasm, creativity, friendliness), and yellow (optimism, warmth, attention). Blue and green are cool colors with different associations.",
  },
  {
    type: "multi-select",
    question:
      "Which are key principles of effective typography pairing? (Select all that apply)",
    options: [
      "Contrast between typefaces",
      "Using as many typefaces as possible",
      "Body text readability at small sizes",
      "Multiple weight availability",
      "Web font performance optimization",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "Key typography pairing principles include contrast, body text readability, multiple weight availability, and performance optimization. Using too many typefaces creates visual chaos rather than harmony.",
  },
  {
    type: "multi-select",
    question:
      "Which factors should be considered when selecting typefaces for digital use? (Select all that apply)",
    options: [
      "Open counters and generous spacing for screen readability",
      "The typeface's historical era of origin",
      "Licensing for web and digital use",
      "Fallback font stack compatibility",
      "The typeface designer's nationality",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "When selecting digital typefaces, consider screen readability characteristics (open counters, spacing), licensing for web use, and fallback font compatibility. A typeface's historical era or designer's nationality are not functional selection criteria.",
  },
  {
    type: "ordering",
    question:
      "Place the following color properties in order from most emotionally activating to most calming:",
    items: [
      "Red (urgency, passion)",
      "Orange (enthusiasm, creativity)",
      "Green (growth, health)",
      "Blue (trust, stability)",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Colors range from most activating to most calming: red is the most energizing and urgent, followed by orange, then green which is balanced and natural, and blue which is the calmest and most stable.",
  },

  // ============================================================
  // SECTION 3: Strategy & Planning (12 questions)
  // 6 multiple-choice, 2 true-false, 2 multi-select, 2 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What do imagery guidelines define?",
    options: [
      "The number of images to use per page",
      "The photographic and illustrative style that represents your brand",
      "The stock photo subscription to purchase",
      "The image file formats to use on websites",
    ],
    correctIndex: 1,
    explanation:
      "Imagery guidelines define the photographic and illustrative style that represents your brand. This includes photography style, illustration approach, iconography standards, and representation considerations.",
  },
  {
    type: "multiple-choice",
    question: "What are design tokens?",
    options: [
      "Physical tokens used in design workshops",
      "Foundational variables (colors, spacing, typography) stored as named values for consistency",
      "Authentication tokens for design tools",
      "Digital currency used to purchase design assets",
    ],
    correctIndex: 1,
    explanation:
      "Design tokens are foundational variables — colors, spacing, typography scales, border radii, shadows — stored as named values. They ensure pixel-perfect consistency between design files and code as the single source of truth for visual properties.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of a component library in a design system?",
    options: [
      "To store stock photos and illustrations",
      "To provide reusable UI components with documented variants and states for consistency",
      "To list all fonts available on the internet",
      "To catalog competitor design patterns",
    ],
    correctIndex: 1,
    explanation:
      "A component library provides reusable UI components (buttons, cards, forms) built with design tokens. Each component has documented variants, states, and usage guidelines that accelerate design and development while ensuring consistency.",
  },
  {
    type: "multiple-choice",
    question:
      "Photography style guidelines should define all of the following EXCEPT:",
    options: [
      "Lighting preferences (natural vs. studio)",
      "Color treatment (warm, cool, desaturated)",
      "The specific camera model to use",
      "Composition preferences and subject matter",
    ],
    correctIndex: 2,
    explanation:
      "Photography style guidelines should define lighting, color treatment, composition, and subject matter. The specific camera model is a technical equipment choice, not a brand style guideline — the same style can be achieved with various equipment.",
  },
  {
    type: "multiple-choice",
    question:
      "Why is a responsive grid system important in a design system?",
    options: [
      "It makes designs look more artistic",
      "It creates visual rhythm and helps users navigate content intuitively across devices",
      "It is required by web hosting providers",
      "It reduces the number of pages needed on a website",
    ],
    correctIndex: 1,
    explanation:
      "A responsive grid system creates visual rhythm and helps users navigate content intuitively across different devices. Consistent layout patterns, breakpoints, and spacing scales ensure a cohesive experience on any screen size.",
  },
  {
    type: "multiple-choice",
    question:
      "What aspect of imagery guidelines addresses ensuring content reflects the diversity of your audience?",
    options: [
      "Photography lighting guidelines",
      "Illustration line weight specifications",
      "Diversity and representation guidelines",
      "Iconography stroke weight standards",
    ],
    correctIndex: 2,
    explanation:
      "Diversity and representation guidelines ensure imagery reflects the diversity of your audience and avoids stereotypes or exclusionary visuals. This is an essential component of modern imagery guidelines.",
  },
  {
    type: "true-false",
    question:
      "Design tokens are only useful for designers and have no relevance to developers.",
    correctAnswer: false,
    explanation:
      "Design tokens bridge design and development by providing a single source of truth for visual properties. They ensure pixel-perfect consistency between design files and code, making them critical for both designers and developers.",
  },
  {
    type: "true-false",
    question:
      "A design system includes reusable components, patterns, and standards for creating consistent designs at scale.",
    correctAnswer: true,
    explanation:
      "A design system is a collection of reusable components, patterns, and standards that enable teams to create consistent designs at scale. It typically includes design tokens, a component library, and layout/grid systems.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are components of a comprehensive design system? (Select all that apply)",
    options: [
      "Design tokens",
      "Component library",
      "Competitor analysis",
      "Layout and grid system",
      "Marketing budget",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "A comprehensive design system includes design tokens, a component library, and a layout/grid system. Competitor analysis and marketing budgets are strategic planning elements, not design system components.",
  },
  {
    type: "multi-select",
    question:
      "What should iconography guidelines specify? (Select all that apply)",
    options: [
      "Line icon, filled, or duotone style choice",
      "Consistent stroke weight",
      "The icon designer's name",
      "Corner radius standards",
      "Consistent sizing across the icon set",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Iconography guidelines should specify the style (line, filled, duotone), stroke weight, corner radius, and sizing. The icon designer's name is attribution information, not a style guideline.",
  },
  {
    type: "ordering",
    question:
      "Place the following design system elements in order from most foundational to most complex:",
    items: [
      "Design tokens (colors, spacing, typography scales)",
      "Base components (buttons, inputs, cards)",
      "Composite components (forms, navigation bars)",
      "Page templates and layouts",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Design systems build from foundational to complex: design tokens are the most basic variables, base components use those tokens, composite components combine base components, and page templates combine everything into full layouts.",
  },
  {
    type: "ordering",
    question:
      "Place the following imagery guideline elements in order from broadest to most specific:",
    items: [
      "Overall photography style direction",
      "Lighting and composition preferences",
      "Color treatment specifications",
      "Individual image approval criteria",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Imagery guidelines move from broadest to most specific: overall style direction sets the vision, lighting/composition provides structural guidance, color treatment adds specific parameters, and approval criteria define the standards for individual assets.",
  },

  // ============================================================
  // SECTION 4: Execution & Implementation (12 questions)
  // 6 multiple-choice, 2 true-false, 3 multi-select, 1 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question:
      "What is the recommended image dimension for Instagram feed posts?",
    options: [
      "800x800 pixels",
      "1080x1080 pixels",
      "1200x627 pixels",
      "1920x1080 pixels",
    ],
    correctIndex: 1,
    explanation:
      "Instagram feed posts are recommended at 1080x1080 pixels for square format. This dimension ensures sharp display on most devices without excessive file size.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended dimension for Instagram Stories and Reels covers?",
    options: [
      "1080x1080 pixels",
      "1200x627 pixels",
      "1080x1920 pixels",
      "1600x900 pixels",
    ],
    correctIndex: 2,
    explanation:
      "Instagram Stories and Reels covers should be 1080x1920 pixels (9:16 vertical aspect ratio). This fills the full screen on mobile devices for maximum visual impact.",
  },
  {
    type: "multiple-choice",
    question:
      "What does Canva's Brand Kit feature allow teams to do?",
    options: [
      "Automatically generate social media content using AI",
      "Set up brand colors, fonts, and logos so all designs start on-brand",
      "Manage social media posting schedules only",
      "Purchase stock photography at a discount",
    ],
    correctIndex: 1,
    explanation:
      "Canva's Brand Kit allows teams to set up brand colors, fonts, and logos in a centralized location. This ensures all designs start on-brand, and locked templates prevent non-designers from making off-brand modifications.",
  },
  {
    type: "multiple-choice",
    question: "Figma's Dev Mode is primarily used for:",
    options: [
      "Creating social media graphics",
      "Seamless designer-to-developer handoff",
      "Writing code for websites",
      "Managing brand photography",
    ],
    correctIndex: 1,
    explanation:
      "Figma's Dev Mode facilitates seamless designer-to-developer handoff by providing developers with specifications, code snippets, and design token values directly from design files.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the purpose of locked templates in Canva?",
    options: [
      "To prevent anyone from using the templates",
      "To allow non-designers to edit only text and images, preventing off-brand modifications",
      "To encrypt sensitive brand information",
      "To limit the number of designs created per month",
    ],
    correctIndex: 1,
    explanation:
      "Locked templates in Canva allow non-designers to edit only designated elements (text and images) while keeping brand elements (colors, fonts, layouts) fixed. This prevents off-brand modifications while enabling team members to create content.",
  },
  {
    type: "multiple-choice",
    question:
      "For LinkedIn content, which format is recommended for thought leadership?",
    options: [
      "Animated GIFs only",
      "Data visualizations and professional document carousels",
      "Casual memes and trends",
      "Vertical video only",
    ],
    correctIndex: 1,
    explanation:
      "LinkedIn content should maintain a professional tone with clean layouts. Data visualizations, document carousels (1080x1080 per slide), and thought leadership formats are most effective for this platform's professional audience.",
  },
  {
    type: "true-false",
    question:
      "Canva is best suited for system-level design work like building comprehensive design systems.",
    correctAnswer: false,
    explanation:
      "Figma is better suited for system-level design work (websites, apps, design systems) due to features like auto-layout, variants, and design tokens. Canva excels at rapid content production for social posts, presentations, and marketing materials.",
  },
  {
    type: "true-false",
    question:
      "Social media templates should be designed mobile-first since most social media consumption happens on mobile devices.",
    correctAnswer: true,
    explanation:
      "Most social media consumption happens on mobile devices, so templates should be designed mobile-first with large, readable text overlays and visual elements that remain clear at small screen sizes.",
  },
  {
    type: "multi-select",
    question:
      "Which Instagram template types should a brand create? (Select all that apply)",
    options: [
      "Feed posts (1080x1080)",
      "Stories (1080x1920)",
      "Carousel slides",
      "Desktop wallpapers",
      "Reels covers",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Brands should create Instagram templates for feed posts, Stories, carousel slides, and Reels covers. Desktop wallpapers are not an Instagram content format.",
  },
  {
    type: "multi-select",
    question:
      "What are recommended uses for Canva vs. Figma? (Select all that apply)",
    options: [
      "Canva for rapid social media content production",
      "Figma for building component libraries with auto-layout",
      "Canva for building design systems with design tokens",
      "Figma for designer-to-developer handoff",
      "Canva for presentations and marketing materials",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Canva excels at rapid content production (social posts, presentations, marketing materials) while Figma is ideal for component libraries, design systems, and developer handoff. Design systems with tokens are Figma's domain, not Canva's.",
  },
  {
    type: "multi-select",
    question:
      "Template governance best practices include which of the following? (Select all that apply)",
    options: [
      "Assign brand managers as template owners",
      "Allow anyone to modify master designs freely",
      "Establish a review process for new templates",
      "Create a retirement process for outdated templates",
      "Lock all templates so they can never be updated",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Template governance requires designated owners, a review process for new templates, and a retirement process for outdated ones. Allowing free modifications defeats the purpose, and permanently locking templates prevents necessary updates.",
  },
  {
    type: "ordering",
    question:
      "Place the following social media template creation steps in the correct order:",
    items: [
      "Define platform-specific dimensions and formats",
      "Apply brand colors, typography, and imagery guidelines",
      "Create template variations for different content types",
      "Test templates on actual devices for readability",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Template creation follows a logical sequence: first define the technical dimensions, then apply brand visual standards, create variations for different content types, and finally test on actual devices to verify readability.",
  },

  // ============================================================
  // SECTION 5: Measurement & Optimization (12 questions)
  // 6 multiple-choice, 2 true-false, 2 multi-select, 2 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question:
      "What is the WCAG AA minimum contrast ratio for text on a background?",
    options: ["2:1", "3:1", "4.5:1", "7:1"],
    correctIndex: 2,
    explanation:
      "WCAG AA requires a minimum contrast ratio of 4.5:1 for normal text. This ensures text remains readable for users with visual impairments, including those with moderate color blindness.",
  },
  {
    type: "multiple-choice",
    question:
      "What does brand recognition testing involve?",
    options: [
      "Testing how fast a website loads",
      "Surveys where participants identify your brand from visual elements alone with the logo removed",
      "Counting social media followers",
      "Measuring how many people click on ads",
    ],
    correctIndex: 1,
    explanation:
      "Brand recognition testing involves surveys where participants identify your brand from visual elements alone (with the logo removed). This measures visual distinctiveness — whether your color palette, typography, and imagery are recognizable without the logo.",
  },
  {
    type: "multiple-choice",
    question:
      "Which metric helps determine which visual styles generate the highest engagement?",
    options: [
      "Domain authority",
      "Engagement rates tracked by visual style, color treatment, and layout",
      "Number of brand guidelines pages",
      "File size of design assets",
    ],
    correctIndex: 1,
    explanation:
      "Tracking engagement rates by visual style, color treatment, and layout helps determine which design approaches generate the highest engagement on each platform, enabling data-driven visual optimization.",
  },
  {
    type: "multiple-choice",
    question:
      "How often should visual brand audits be conducted across channels?",
    options: ["Daily", "Monthly", "Quarterly", "Biannually"],
    correctIndex: 2,
    explanation:
      "Visual brand audits should be conducted quarterly across all active channels. This frequency ensures timely identification of inconsistencies while providing enough time to observe meaningful patterns.",
  },
  {
    type: "multiple-choice",
    question:
      "How often should templates and design assets be refreshed?",
    options: [
      "Weekly",
      "Monthly",
      "Semi-annually",
      "Only when a complete rebrand occurs",
    ],
    correctIndex: 2,
    explanation:
      "Templates and design assets should be refreshed semi-annually. This keeps the brand feeling fresh and current without losing the recognition built through consistency. It also accounts for evolving platform specifications.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the primary purpose of A/B testing visual variations in ads and social posts?",
    options: [
      "To increase the number of design assets produced",
      "To identify which design elements drive the strongest action and engagement",
      "To test the speed of design production workflows",
      "To compare designer performance",
    ],
    correctIndex: 1,
    explanation:
      "A/B testing visual variations identifies which specific design elements — colors, layouts, imagery styles, CTAs — drive the strongest user action and engagement, enabling data-driven optimization of visual branding.",
  },
  {
    type: "true-false",
    question:
      "Accessibility compliance should only be checked during the initial brand design phase.",
    correctAnswer: false,
    explanation:
      "Accessibility compliance should be audited regularly — not just during initial design. Regular audits of color contrast ratios, alt text coverage, and touch target sizes ensure ongoing compliance as content and designs evolve.",
  },
  {
    type: "true-false",
    question:
      "Small, data-driven visual iterations keep a brand feeling fresh without losing built recognition.",
    correctAnswer: true,
    explanation:
      "Small, data-driven iterations are preferable to major overhauls. They keep the brand current while preserving the recognition equity built through consistency. Monthly performance reviews and quarterly audits support this approach.",
  },
  {
    type: "multi-select",
    question:
      "Which metrics should be used to measure visual branding effectiveness? (Select all that apply)",
    options: [
      "Engagement rates by visual style",
      "Brand recognition testing results",
      "Number of design files created",
      "Click-through rates from A/B tests",
      "Accessibility compliance scores",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Visual branding effectiveness is measured through engagement rates by style, brand recognition testing, A/B test click-through rates, and accessibility compliance. The raw number of design files created is a productivity metric, not an effectiveness measure.",
  },
  {
    type: "multi-select",
    question:
      "What should a visual audit checklist cover? (Select all that apply)",
    options: [
      "Logo usage accuracy",
      "Color accuracy across channels",
      "Designer salary benchmarks",
      "Typography consistency",
      "Template compliance",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "A visual audit checklist should cover logo usage, color accuracy, typography consistency, imagery style adherence, and template compliance. Designer salary benchmarks are an HR concern, not an audit item.",
  },
  {
    type: "ordering",
    question:
      "Place the following visual optimization review cadences from most frequent to least frequent:",
    items: [
      "Review performance data (monthly)",
      "Conduct competitive visual audits (quarterly)",
      "Refresh templates and assets (semi-annually)",
      "Evaluate overall visual strategy (annually)",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Visual optimization follows a tiered cadence: monthly performance data reviews, quarterly competitive audits, semi-annual template refreshes, and annual overall strategy evaluations.",
  },
  {
    type: "ordering",
    question:
      "Place the following accessibility checks in order from most critical to supplementary:",
    items: [
      "Color contrast ratios (WCAG AA compliance)",
      "Alt text coverage on images",
      "Touch target sizes for interactive elements",
      "Animation and motion sensitivity preferences",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Accessibility priorities: color contrast is most critical (affects all text readability), alt text enables screen reader access, touch targets affect mobile usability, and motion preferences address comfort — all important but in decreasing criticality.",
  },
];
