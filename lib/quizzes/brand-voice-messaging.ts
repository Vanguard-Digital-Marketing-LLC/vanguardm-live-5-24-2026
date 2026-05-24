import type { QuizQuestion } from "@/lib/academy-data";

export const brandVoiceMessagingQuiz: QuizQuestion[] = [
  // ============================================================
  // SECTION 1: Introduction & Overview (12 questions)
  // 6 multiple-choice, 2 true-false, 2 multi-select, 2 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What is brand voice?",
    options: [
      "The literal sound of a brand's spokesperson in commercials",
      "The consistent expression of a brand through words — the verbal counterpart to visual identity",
      "The specific words used in a brand's tagline",
      "The tone used exclusively on social media",
    ],
    correctIndex: 1,
    explanation:
      "Brand voice is the consistent expression of your brand through words. It is the verbal counterpart to your visual identity — the personality and character that comes through in every piece of written and spoken communication.",
  },
  {
    type: "multiple-choice",
    question:
      "According to Sprout Social research, what percentage of consumers cite a distinct personality as what makes a brand memorable on social media?",
    options: ["15%", "25%", "33%", "50%"],
    correctIndex: 2,
    explanation:
      "Research from Sprout Social shows that 33% of consumers cite a distinct personality as the factor that makes a brand memorable on social media. Voice is how brand personality comes alive in content.",
  },
  {
    type: "multiple-choice",
    question:
      "Which statement best describes the relationship between brand voice and brand personality?",
    options: [
      "They are the same thing",
      "Brand voice is how brand personality comes alive in written and spoken content",
      "Brand personality is a subset of brand voice",
      "They are unrelated concepts used by different departments",
    ],
    correctIndex: 1,
    explanation:
      "Brand voice is how your brand personality comes alive in every piece of content. While brand personality defines the traits (e.g., bold, approachable), brand voice is the expression of those traits through language.",
  },
  {
    type: "multiple-choice",
    question:
      "Why is mastering brand voice important for a solo founder writing their own copy?",
    options: [
      "It is only important for large teams, not solo founders",
      "It ensures consistency across all communications, building recognition and trust even from a single writer",
      "It eliminates the need for professional copywriters",
      "It is required by advertising regulations",
    ],
    correctIndex: 1,
    explanation:
      "Even solo founders benefit from defined brand voice because it ensures consistency across all communications — from website copy to emails to social posts — building recognition and trust with the audience over time.",
  },
  {
    type: "multiple-choice",
    question: "Brand voice creates emotional connections that:",
    options: [
      "Last only during a single campaign",
      "Are limited to social media platforms",
      "Transcend individual campaigns",
      "Apply only to B2C businesses",
    ],
    correctIndex: 2,
    explanation:
      "When done well, a distinctive brand voice builds recognition, fosters trust, and creates emotional connections that transcend individual campaigns. It becomes a recognizable constant across all brand touchpoints.",
  },
  {
    type: "multiple-choice",
    question: "Which of the following is NOT a benefit of a well-defined brand voice?",
    options: [
      "Builds audience recognition",
      "Fosters trust over time",
      "Guarantees viral content",
      "Creates emotional connections with audiences",
    ],
    correctIndex: 2,
    explanation:
      "A well-defined brand voice builds recognition, fosters trust, and creates emotional connections. However, it does not guarantee viral content — virality depends on many factors beyond voice consistency.",
  },
  {
    type: "true-false",
    question:
      "Brand voice is only relevant for companies that produce written content like blog posts and articles.",
    correctAnswer: false,
    explanation:
      "Brand voice applies to every form of communication — written and spoken — including website copy, social media posts, customer support interactions, video scripts, advertising, email marketing, and even internal communications.",
  },
  {
    type: "true-false",
    question:
      "A distinctive brand voice helps differentiate a brand in a crowded marketplace.",
    correctAnswer: true,
    explanation:
      "A distinctive voice is one of the most effective ways to differentiate in a crowded market. When products and services are similar, the way a brand communicates becomes a key competitive advantage.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are outcomes of effective brand voice? (Select all that apply)",
    options: [
      "Recognition across different channels",
      "Elimination of all negative reviews",
      "Trust building with audiences",
      "Emotional connections with customers",
      "Guaranteed higher search rankings",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Effective brand voice creates recognition across channels, builds trust, and fosters emotional connections. It does not eliminate negative reviews or guarantee search rankings — those depend on many other factors.",
  },
  {
    type: "multi-select",
    question:
      "Which skills does this lesson cover? (Select all that apply)",
    options: [
      "Distinguishing between voice and tone",
      "Building a company budget",
      "Creating a messaging hierarchy",
      "Defining voice attributes",
      "Writing style guidelines",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "This lesson covers the voice vs. tone distinction, defining voice attributes, building a messaging hierarchy, and creating style guidelines. Company budgeting is a finance topic, not a brand voice topic.",
  },
  {
    type: "ordering",
    question:
      "Place the following brand communication elements in order from most foundational to most executional:",
    items: [
      "Brand personality definition",
      "Voice attributes",
      "Messaging hierarchy",
      "Individual content pieces",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "The hierarchy flows from foundational to executional: brand personality informs voice attributes, which guide the messaging hierarchy, which then shapes individual content pieces.",
  },
  {
    type: "ordering",
    question:
      "Rank the following from broadest strategic element to most specific tactical element:",
    items: [
      "Brand voice definition",
      "Channel-specific tone guidelines",
      "Style and grammar rules",
      "Individual social media post copy",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Strategic to tactical: brand voice definition is the broadest strategic element, followed by channel-specific tone guidelines, then style/grammar rules, and finally individual social media post copy as the most specific tactical output.",
  },

  // ============================================================
  // SECTION 2: Core Concepts (12 questions)
  // 6 multiple-choice, 2 true-false, 3 multi-select, 1 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What is the key difference between voice and tone?",
    options: [
      "Voice is for marketing and tone is for sales",
      "Voice is your brand's consistent personality; tone is the emotional inflection that changes by context",
      "Voice is formal and tone is casual",
      "Voice is used online and tone is used offline",
    ],
    correctIndex: 1,
    explanation:
      "Voice is your brand's consistent personality in communication — it does not change. Tone is the emotional inflection you apply to your voice depending on the situation, audience, and channel. Voice is personality; tone is mood.",
  },
  {
    type: "multiple-choice",
    question: "Which analogy best describes the voice vs. tone relationship?",
    options: [
      "Voice is the car; tone is the color of the car",
      "Voice is your personality; tone is your mood",
      "Voice is the script; tone is the actor",
      "Voice is the channel; tone is the content",
    ],
    correctIndex: 1,
    explanation:
      "Voice is your personality (constant and recognizable) while tone is your mood (variable depending on the situation). A brand can be consistently friendly (voice) while being celebratory or empathetic (tone) depending on context.",
  },
  {
    type: "multiple-choice",
    question: "How many voice attributes should a brand typically define?",
    options: [
      "One or two",
      "Three to five",
      "Seven to ten",
      "As many as possible for flexibility",
    ],
    correctIndex: 1,
    explanation:
      "Brands should typically define three to five voice attributes — the defining characteristics of the brand's communication style. Each should be documented with a definition, do's and don'ts, and example copy.",
  },
  {
    type: "multiple-choice",
    question:
      "What is a tone spectrum?",
    options: [
      "A color palette used for emotional marketing",
      "A map of how your voice adapts across different communication contexts",
      "A tool for measuring audience sentiment",
      "A ranking of tone from positive to negative",
    ],
    correctIndex: 1,
    explanation:
      "The tone spectrum maps how your voice adapts across different communication contexts — marketing campaigns, customer support, crisis communications, social media, internal communications, and legal content.",
  },
  {
    type: "multiple-choice",
    question:
      "On the 'Formal ↔ Casual' voice spectrum, a brand positioned toward casual would likely:",
    options: [
      "Use long, complex sentences with industry jargon",
      "Use conversational language, contractions, and relatable phrasing",
      "Avoid addressing the audience directly",
      "Only communicate through press releases",
    ],
    correctIndex: 1,
    explanation:
      "A brand positioned toward casual on the formality spectrum would use conversational language, contractions, and relatable phrasing that makes the audience feel like they are talking to a friend rather than reading a formal document.",
  },
  {
    type: "multiple-choice",
    question:
      "When documenting voice attributes, each attribute should include:",
    options: [
      "Only a one-word descriptor",
      "A clear definition, practical do's and don'ts, and example copy",
      "Only a list of approved words",
      "A financial justification for the attribute",
    ],
    correctIndex: 1,
    explanation:
      "Each voice attribute should be documented with a clear definition, practical do's and don'ts, and example copy. This level of detail makes the attributes actionable for writers across the organization.",
  },
  {
    type: "true-false",
    question:
      "A brand's tone should remain exactly the same whether writing a product launch announcement or a crisis communication.",
    correctAnswer: false,
    explanation:
      "Tone should adapt to context while voice remains consistent. A product launch may call for an enthusiastic, celebratory tone, while a crisis requires a serious, empathetic tone — but both should still sound like the same brand.",
  },
  {
    type: "true-false",
    question:
      "Voice attributes should be documented on spectrum scales (e.g., Formal ↔ Casual) to show where the brand falls.",
    correctAnswer: true,
    explanation:
      "Spectrum scales are an effective framework for documenting voice attributes because they show exactly where the brand sits on dimensions like Formal ↔ Casual, Serious ↔ Playful, and Technical ↔ Accessible.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are common voice attribute spectrums? (Select all that apply)",
    options: [
      "Formal ↔ Casual",
      "Expensive ↔ Affordable",
      "Serious ↔ Playful",
      "Technical ↔ Accessible",
      "Reserved ↔ Enthusiastic",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "Common voice attribute spectrums include Formal ↔ Casual, Serious ↔ Playful, Technical ↔ Accessible, and Reserved ↔ Enthusiastic. Expensive ↔ Affordable describes pricing strategy, not voice characteristics.",
  },
  {
    type: "multi-select",
    question:
      "Which communication contexts should be included in a tone spectrum? (Select all that apply)",
    options: [
      "Marketing campaigns",
      "Customer support",
      "Crisis communications",
      "Legal and compliance content",
      "All contexts use identical tone",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "A tone spectrum should address all major communication contexts including marketing, support, crisis, and legal content. Each requires different emotional modulation of your voice — not identical tone treatment.",
  },
  {
    type: "multi-select",
    question:
      "For each scenario in the tone spectrum, what should be documented? (Select all that apply)",
    options: [
      "The emotional quality (e.g., encouraging, serious)",
      "Sample phrases",
      "The budget for that communication type",
      "Words or approaches to avoid",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "For each tone spectrum scenario, document the emotional quality, provide sample phrases, and note words or approaches to avoid. Budget information is a financial planning element, not a tone documentation component.",
  },
  {
    type: "ordering",
    question:
      "Place the following tone contexts from typically most formal to most casual:",
    items: [
      "Legal and compliance content",
      "Crisis communications",
      "Email marketing",
      "Social media posts",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Tone typically moves from most formal to most casual: legal content requires the highest formality, crisis communications need serious professionalism, email marketing allows some warmth, and social media tends to be the most casual.",
  },

  // ============================================================
  // SECTION 3: Strategy & Planning (12 questions)
  // 6 multiple-choice, 2 true-false, 2 multi-select, 2 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What is a messaging hierarchy?",
    options: [
      "A ranking of team members who approve messages",
      "An organized structure of brand messages from broadest positioning down to specific proof points",
      "A list of social media platforms ranked by importance",
      "The order in which marketing emails are sent",
    ],
    correctIndex: 1,
    explanation:
      "A messaging hierarchy organizes brand messages from the broadest positioning down to specific proof points. This pyramid structure ensures every piece of content aligns with the overarching brand narrative.",
  },
  {
    type: "multiple-choice",
    question:
      "What is Level 1 (the top) of the messaging hierarchy?",
    options: [
      "Proof points and statistics",
      "Supporting messages and features",
      "Value propositions",
      "Brand promise or tagline",
    ],
    correctIndex: 3,
    explanation:
      "Level 1 of the messaging hierarchy is the brand promise or tagline — the single most important message your brand communicates, distilled into a memorable phrase (e.g., Nike's 'Just Do It').",
  },
  {
    type: "multiple-choice",
    question:
      "How many value propositions should typically support your brand promise?",
    options: [
      "One",
      "Three to four",
      "Seven to eight",
      "As many as possible",
    ],
    correctIndex: 1,
    explanation:
      "Three to four key value propositions typically support the brand promise. Each should address a specific customer need or pain point and form the backbone of website headlines, ad copy, and sales materials.",
  },
  {
    type: "multiple-choice",
    question: "What are proof points in the messaging hierarchy?",
    options: [
      "The brand's tagline variations",
      "Internal mission statements",
      "Evidence that validates claims — statistics, testimonials, case studies, awards",
      "Social media metrics and follower counts",
    ],
    correctIndex: 2,
    explanation:
      "Proof points are evidence that validates your claims — including statistics, testimonials, case studies, awards, certifications, and third-party endorsements. They build credibility and overcome skepticism.",
  },
  {
    type: "multiple-choice",
    question:
      "A value proposition framework typically includes all of the following EXCEPT:",
    options: [
      "Target audience",
      "Key benefit / point of difference",
      "Reason to believe / unique differentiator",
      "Annual revenue projections",
    ],
    correctIndex: 3,
    explanation:
      "The value proposition framework includes: For [target audience] who [need/pain point], our [brand/product] provides [key benefit] because [unique differentiator]. Revenue projections are financial planning elements, not value proposition components.",
  },
  {
    type: "multiple-choice",
    question:
      "What does the 'so what?' test evaluate in a value proposition?",
    options: [
      "Whether the proposition is grammatically correct",
      "Whether a customer would actually care about and be moved by the stated benefit",
      "Whether the proposition fits within a character limit",
      "Whether the proposition includes keywords for SEO",
    ],
    correctIndex: 1,
    explanation:
      "The 'so what?' test evaluates whether a customer would actually care about the stated benefit. If the response to a value proposition is 'so what?' — meaning the customer is unmoved — it needs refinement.",
  },
  {
    type: "true-false",
    question:
      "Supporting messages in the messaging hierarchy elaborate on each value proposition with features, benefits, and differentiators.",
    correctAnswer: true,
    explanation:
      "Level 3 supporting messages elaborate on each value proposition with detailed features, benefits, and differentiators. They populate product pages, case studies, and detailed marketing content.",
  },
  {
    type: "true-false",
    question:
      "The messaging hierarchy should be reorganized for every new marketing campaign.",
    correctAnswer: false,
    explanation:
      "The messaging hierarchy is a strategic framework that provides consistent structure. While individual campaigns may emphasize different value propositions or proof points, the overall hierarchy should remain stable to ensure brand coherence.",
  },
  {
    type: "multi-select",
    question:
      "What qualities should an effective value proposition have? (Select all that apply)",
    options: [
      "Clarity",
      "Maximum word count",
      "Relevance to the target audience",
      "Differentiation from competitors",
      "Believability",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "An effective value proposition should be clear, relevant, differentiated, and believable. Maximum word count is not a quality of a value proposition — conciseness matters, but there is no universal word count requirement.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are levels in the messaging hierarchy? (Select all that apply)",
    options: [
      "Brand promise / tagline",
      "Value propositions",
      "Competitor weaknesses",
      "Supporting messages",
      "Proof points",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "The four levels of the messaging hierarchy are: brand promise/tagline (Level 1), value propositions (Level 2), supporting messages (Level 3), and proof points (Level 4). Competitor weaknesses are part of competitive analysis, not the messaging hierarchy.",
  },
  {
    type: "ordering",
    question:
      "Place the messaging hierarchy levels in order from broadest (top) to most specific (bottom):",
    items: [
      "Brand promise / tagline",
      "Value propositions",
      "Supporting messages",
      "Proof points",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "The messaging hierarchy flows from broadest to most specific: brand promise/tagline at the top, followed by value propositions, then supporting messages, and finally proof points at the bottom.",
  },
  {
    type: "ordering",
    question:
      "Place the following value proposition development steps in the correct order:",
    items: [
      "Identify target audience and their needs",
      "Define the key benefit your brand delivers",
      "Articulate the unique differentiator",
      "Test with the 'so what?' test",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Value proposition development follows a logical sequence: first identify who you serve and their needs, then define the key benefit, articulate what makes it unique, and finally test whether customers would actually care.",
  },

  // ============================================================
  // SECTION 4: Execution & Implementation (12 questions)
  // 6 multiple-choice, 2 true-false, 3 multi-select, 1 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "What do style guidelines cover beyond voice attributes?",
    options: [
      "Only the brand's logo usage rules",
      "Grammar, punctuation, formatting, and terminology preferences for consistent writing",
      "Advertising budget allocation",
      "Website hosting configuration",
    ],
    correctIndex: 1,
    explanation:
      "Style guidelines cover practical writing rules including grammar, punctuation, formatting, and terminology preferences. They go beyond voice attributes to ensure consistency across writers and channels.",
  },
  {
    type: "multiple-choice",
    question:
      "Which of the following is an example of a grammar/punctuation style guideline?",
    options: [
      "The brand archetype is the Sage",
      "Oxford comma usage and capitalization rules for headings",
      "The primary color is HEX #10B981",
      "The logo minimum size is 24px",
    ],
    correctIndex: 1,
    explanation:
      "Oxford comma usage and capitalization rules for headings are examples of grammar/punctuation style guidelines. These practical rules ensure writing consistency across all content creators.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the purpose of a branded vocabulary/glossary in style guidelines?",
    options: [
      "To list all industry jargon that writers should use",
      "To document approved terminology and words to avoid, with plain language alternatives",
      "To define all marketing acronyms",
      "To translate brand content into multiple languages",
    ],
    correctIndex: 1,
    explanation:
      "A branded vocabulary/glossary documents approved terminology and words to avoid, along with plain language alternatives for industry jargon. This ensures consistent and accessible language across all brand communications.",
  },
  {
    type: "multiple-choice",
    question:
      "How should brand voice be adapted for customer support interactions?",
    options: [
      "Use the most casual tone possible to seem friendly",
      "Ignore voice guidelines and use a generic corporate tone",
      "Use empathetic, solution-oriented language while maintaining the brand voice",
      "Copy the exact language from marketing campaigns",
    ],
    correctIndex: 2,
    explanation:
      "Customer support should use empathetic, solution-oriented language while maintaining the brand voice. Response templates should feel personal and helpful, not robotic, while staying true to the brand's personality.",
  },
  {
    type: "multiple-choice",
    question:
      "Social media voice adaptation typically includes guidelines for:",
    options: [
      "Only hashtag usage",
      "Emoji usage, platform-specific character limits, and community engagement tone",
      "Only posting frequency",
      "Only paid advertising copy",
    ],
    correctIndex: 1,
    explanation:
      "Social media voice adaptation includes emoji usage guidelines, platform-specific character limits and norms, hashtag conventions, and community engagement tone — all while maintaining the consistent brand voice.",
  },
  {
    type: "multiple-choice",
    question:
      "Email marketing voice guidelines should address which of the following?",
    options: [
      "Only the unsubscribe link text",
      "Subject line formulas, preview text, personalization approach, and consistent sign-offs",
      "Only the sender's email address format",
      "Only the promotional discount amounts",
    ],
    correctIndex: 1,
    explanation:
      "Email marketing voice guidelines should address subject line formulas, preview text guidelines, the personalization approach, how to balance promotional and value-driven messaging, and consistent sign-offs and sender names.",
  },
  {
    type: "true-false",
    question:
      "Active voice is generally preferred over passive voice in brand communications.",
    correctAnswer: true,
    explanation:
      "Most brand style guidelines prefer active voice because it is more direct, engaging, and easier to read. However, the degree of this preference varies by brand — some contexts (like legal content) may warrant passive voice.",
  },
  {
    type: "true-false",
    question:
      "Website copy and social media posts should use completely different brand voices.",
    correctAnswer: false,
    explanation:
      "The brand voice remains consistent across all channels. The execution adapts to each channel's conventions (more casual on social media, more structured on websites), but the fundamental voice personality should be recognizable everywhere.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following should be addressed in style guidelines? (Select all that apply)",
    options: [
      "Oxford comma usage",
      "Heading capitalization rules",
      "Office dress code",
      "Average sentence length targets",
      "Formatting conventions for lists and CTAs",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Style guidelines should cover Oxford comma usage, heading capitalization, sentence length targets, and formatting conventions. Office dress code is an HR policy, not a writing style guideline.",
  },
  {
    type: "multi-select",
    question:
      "Which channels typically require specific voice adaptation guidelines? (Select all that apply)",
    options: [
      "Website and landing pages",
      "Social media",
      "Email marketing",
      "Customer support",
      "All of the above require adaptation",
    ],
    correctIndices: [0, 1, 2, 3, 4],
    explanation:
      "All major channels require specific voice adaptation guidelines: websites need clear CTAs and scannable copy, social media needs casual engagement, email needs personalization, and support needs empathetic language. Each channel has unique conventions.",
  },
  {
    type: "multi-select",
    question:
      "What should website and landing page voice guidelines emphasize? (Select all that apply)",
    options: [
      "Clear, benefit-focused headlines",
      "Scannable copy with short paragraphs",
      "Strong CTAs using action verbs",
      "Balancing SEO requirements with natural language",
      "Using as many keywords as possible regardless of readability",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Website voice guidelines should emphasize benefit-focused headlines, scannable copy, strong CTAs, and balancing SEO with natural language. Keyword stuffing at the expense of readability harms both user experience and SEO.",
  },
  {
    type: "ordering",
    question:
      "Place the following channel adaptations in order from typically most formal to most casual:",
    items: [
      "Legal disclaimers and terms of service",
      "Website landing pages",
      "Email marketing newsletters",
      "Instagram captions",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Channel formality typically ranges from legal content (most formal) to website landing pages, then email marketing, and finally Instagram captions (most casual). Voice remains consistent; tone and formality adapt.",
  },

  // ============================================================
  // SECTION 5: Measurement & Optimization (12 questions)
  // 6 multiple-choice, 2 true-false, 2 multi-select, 2 ordering
  // ============================================================
  {
    type: "multiple-choice",
    question: "How often should voice consistency audits be conducted?",
    options: ["Weekly", "Monthly", "Quarterly", "Annually"],
    correctIndex: 2,
    explanation:
      "Voice consistency audits should be conducted quarterly by collecting samples from every active channel and evaluating them against voice attributes. This frequency balances thoroughness with practicality.",
  },
  {
    type: "multiple-choice",
    question: "What is a content scoring rubric used for in voice measurement?",
    options: [
      "Grading the SEO performance of each piece of content",
      "Rating each voice attribute on a 1-5 scale for any piece of content",
      "Measuring the word count of each content piece",
      "Scoring content based on how many likes it receives",
    ],
    correctIndex: 1,
    explanation:
      "A content scoring rubric is a standardized tool that rates each voice attribute on a 1-5 scale for any piece of content. This provides objective, consistent evaluation of voice adherence across all channels.",
  },
  {
    type: "multiple-choice",
    question:
      "What is a common issue that voice consistency audits reveal?",
    options: [
      "Content is too long",
      "Gradual deviation from established voice attributes as new writers join",
      "Images are low resolution",
      "CTAs are missing from every page",
    ],
    correctIndex: 1,
    explanation:
      "A common issue revealed by audits is gradual deviation from established voice attributes as new writers join the team. Without ongoing training and monitoring, voice drift is natural and must be actively managed.",
  },
  {
    type: "multiple-choice",
    question: "What is a 'voice cheat sheet'?",
    options: [
      "A full brand guidelines document",
      "A one-page reference with voice attributes, example sentences, and approved/avoided words",
      "A list of competitor voice strategies",
      "A template for social media captions",
    ],
    correctIndex: 1,
    explanation:
      "A voice cheat sheet is a one-page reference with voice attributes, three example sentences for each attribute, five words you always use, and five words you never use. This simple tool dramatically improves consistency across teams.",
  },
  {
    type: "multiple-choice",
    question:
      "Which metric helps evaluate how brand voice resonates with audiences?",
    options: [
      "Page load speed",
      "Engagement metrics from A/B testing different tone variations",
      "Domain authority score",
      "Server uptime percentage",
    ],
    correctIndex: 1,
    explanation:
      "A/B testing different tone variations in emails, ads, and landing pages helps identify which expressions of your voice drive the strongest engagement and conversion — directly measuring audience resonance.",
  },
  {
    type: "multiple-choice",
    question:
      "Voice guidelines should be included in which employee process?",
    options: [
      "Only the annual review process",
      "Only the exit interview process",
      "New hire onboarding and regular writing workshops",
      "Only the IT security training",
    ],
    correctIndex: 2,
    explanation:
      "Voice guidelines should be included in new hire onboarding to establish standards from day one, and reinforced through regular writing workshops to address common challenges and maintain consistency as the team grows.",
  },
  {
    type: "true-false",
    question:
      "A/B testing can be used to determine which tone variations drive the strongest engagement and conversion.",
    correctAnswer: true,
    explanation:
      "A/B testing different tone variations in emails, ads, and landing pages is an effective way to identify which expressions of your voice drive the strongest engagement and conversion rates.",
  },
  {
    type: "true-false",
    question:
      "Once voice guidelines are created, no further training or workshops are needed.",
    correctAnswer: false,
    explanation:
      "Ongoing training is essential. Voice consistency depends on the people creating content. Regular writing workshops reinforce standards, address common challenges, and help new team members internalize the brand voice.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are components of a voice consistency audit? (Select all that apply)",
    options: [
      "Collecting samples from every active channel",
      "Evaluating samples against voice attributes",
      "Scoring each sample on a scale for each attribute",
      "Replacing all content that scores below average",
      "Identifying patterns of drift",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Voice consistency audits involve collecting samples, evaluating them against voice attributes, scoring them systematically, and identifying patterns of drift. Content that scores low should be improved, not necessarily replaced entirely.",
  },
  {
    type: "multi-select",
    question:
      "What should a voice cheat sheet include? (Select all that apply)",
    options: [
      "Voice attributes",
      "Three example sentences for each attribute",
      "Complete brand guidelines",
      "Five words you always use",
      "Five words you never use",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "A voice cheat sheet includes voice attributes, example sentences for each, and lists of words to always/never use. It is intentionally a one-page quick reference — not the complete brand guidelines document.",
  },
  {
    type: "ordering",
    question:
      "Place the following voice optimization activities in the recommended order:",
    items: [
      "Collect content samples from all channels",
      "Score samples against voice attributes",
      "Identify patterns of drift and inconsistency",
      "Update training materials and conduct workshops",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Voice optimization follows a logical sequence: first collect content samples, then score them against attributes, identify patterns of drift, and finally update training materials and conduct workshops to address the findings.",
  },
  {
    type: "ordering",
    question:
      "Place the following voice training elements in order from most important for new hires to most advanced:",
    items: [
      "Voice cheat sheet overview",
      "Voice attribute deep dive with examples",
      "Channel-specific writing exercises",
      "Advanced A/B testing and voice optimization",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Voice training progresses from basic (cheat sheet overview for quick orientation) to intermediate (deep dive into attributes, then channel-specific exercises) to advanced (A/B testing and optimization techniques).",
  },
];
