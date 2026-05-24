import type { QuizQuestion } from "@/lib/academy-data";

export const b2bLeadGenerationQuiz: QuizQuestion[] = [
  // === SECTION 1: Introduction & Overview (12 questions) ===
  {
    type: "multiple-choice",
    question: "What percentage of their research do modern B2B buyers complete before contacting sales?",
    options: [
      "10%",
      "30%",
      "Up to 70%",
      "100%",
    ],
    correctIndex: 2,
    explanation:
      "Modern B2B buyers complete up to 70% of their research before ever contacting a sales team, making marketing's role in educating and nurturing prospects critical.",
  },
  {
    type: "multiple-choice",
    question: "How many people typically make up a B2B buying committee?",
    options: [
      "1-2",
      "3-4",
      "6-10",
      "20-30",
    ],
    correctIndex: 2,
    explanation:
      "B2B purchases typically involve a buying committee of 6-10 people, each with different concerns — usability, security, cost, and strategic fit.",
  },
  {
    type: "multiple-choice",
    question: "What makes B2B sales cycles different from B2C?",
    options: [
      "B2B cycles are shorter and simpler",
      "B2B cycles are longer, involve multiple decision-makers, and require demonstrating ROI",
      "B2B cycles do not require any marketing",
      "B2B purchases are always impulse buys",
    ],
    correctIndex: 1,
    explanation:
      "B2B sales cycles are longer, involve multiple decision-makers, and require building trust and demonstrating clear ROI, unlike the often impulsive nature of B2C purchases.",
  },
  {
    type: "true-false",
    question: "B2B lead generation only involves outbound tactics like cold calling.",
    correctAnswer: false,
    explanation:
      "B2B lead generation combines both inbound strategies (content, SEO, social) and outbound approaches (cold email, LinkedIn outreach, events) for optimal results.",
  },
  {
    type: "true-false",
    question: "Each member of a B2B buying committee has different concerns that marketing must address.",
    correctAnswer: true,
    explanation:
      "End users care about usability, IT leads about security, CFOs about cost, and CEOs about strategic fit. Your lead generation and nurturing must address all perspectives.",
  },
  {
    type: "multi-select",
    question: "Which approaches are part of a well-rounded B2B lead generation engine? (Select all that apply)",
    options: [
      "Inbound content strategies",
      "Outbound outreach (cold email, LinkedIn)",
      "Lead scoring and CRM systems",
      "Only relying on word-of-mouth referrals",
      "Sales-marketing alignment",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "A well-rounded B2B lead generation engine combines inbound content, outbound outreach, lead scoring, CRM management, and sales-marketing alignment.",
  },
  {
    type: "multi-select",
    question: "What concerns might different B2B buying committee members have? (Select all that apply)",
    options: [
      "End user: usability and ease of adoption",
      "IT lead: security and integration",
      "CFO: cost and ROI",
      "CEO: strategic fit",
      "Receptionist: office decor compatibility",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Different committee members focus on usability (end users), security/integration (IT), cost/ROI (finance), and strategic fit (executives).",
  },
  {
    type: "ordering",
    question: "Arrange the B2B buyer journey from earliest to latest stage.",
    items: [
      "Vendor evaluation and comparison",
      "Problem identification and research",
      "Purchase decision and implementation",
      "Awareness of potential solutions",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "The B2B journey flows: problem identification and research, awareness of solutions, vendor evaluation and comparison, and finally purchase decision and implementation.",
  },
  {
    type: "multiple-choice",
    question: "Why must B2B marketing address the full buying committee?",
    options: [
      "Because one person always makes the decision alone",
      "Because each stakeholder can block or champion the deal based on their concerns",
      "Because marketing needs to fill time with more content",
      "Because B2B purchases are always inexpensive",
    ],
    correctIndex: 1,
    explanation:
      "Each stakeholder in the buying committee can either block or champion the deal. Failing to address any stakeholder's concerns can derail the entire purchase process.",
  },
  {
    type: "multiple-choice",
    question: "What is the primary reason B2B marketing must educate prospects long before they are ready to buy?",
    options: [
      "Because B2B products are too complex to understand",
      "Because buyers complete most of their research independently before contacting sales",
      "Because B2B companies have unlimited marketing budgets",
      "Because B2B buyers do not use the internet",
    ],
    correctIndex: 1,
    explanation:
      "With buyers completing up to 70% of research before contacting sales, marketing must provide educational content that builds credibility during that independent research phase.",
  },
  {
    type: "multiple-choice",
    question: "What must B2B vendors demonstrate to win deals?",
    options: [
      "The largest social media following in their industry",
      "Trust, credibility, and clear ROI justification",
      "The lowest price in the market",
      "The most features regardless of relevance",
    ],
    correctIndex: 1,
    explanation:
      "B2B purchases involve significant investment, so buyers need to trust the vendor and see clear ROI justification before committing. Price and features alone are not sufficient.",
  },
  {
    type: "ordering",
    question: "Arrange the key B2B lead generation components by their role in the process, from earliest touch to latest.",
    items: [
      "Sales follow-up and closing",
      "Lead scoring and qualification",
      "Content creation and distribution (inbound)",
      "Lead nurturing sequences",
    ],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "The process flows: content attracts leads (inbound), leads are scored and qualified, nurturing sequences build trust over time, and finally sales follows up and closes.",
  },

  // === SECTION 2: Core Concepts (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is an MQL (Marketing Qualified Lead)?",
    options: [
      "A lead that has already purchased",
      "A lead that has shown enough engagement to warrant marketing follow-up but has not been validated by sales",
      "A lead from a competitor company",
      "A lead that unsubscribed from your email list",
    ],
    correctIndex: 1,
    explanation:
      "An MQL has shown enough engagement (content downloads, email opens, webinar attendance) to warrant marketing follow-up but has not yet been vetted by the sales team.",
  },
  {
    type: "multiple-choice",
    question: "What does BANT stand for in lead qualification?",
    options: [
      "Brand, Analytics, Network, Testing",
      "Budget, Authority, Need, Timeline",
      "Business, Action, Negotiation, Target",
      "Buyer, Account, Narrative, Tactic",
    ],
    correctIndex: 1,
    explanation:
      "BANT stands for Budget (can they afford it), Authority (can they decide), Need (do they have the problem), and Timeline (when will they buy).",
  },
  {
    type: "multiple-choice",
    question: "What two dimensions should lead scoring evaluate?",
    options: [
      "Revenue and profit",
      "Demographic/firmographic fit and behavioral engagement",
      "Social media following and website traffic",
      "Team size and budget",
    ],
    correctIndex: 1,
    explanation:
      "Lead scoring evaluates demographic/firmographic fit (job title, company size, industry) and behavioral engagement (pages visited, content downloaded, emails opened).",
  },
  {
    type: "multiple-choice",
    question: "What should happen with a lead that has high fit but low engagement?",
    options: [
      "Send immediately to sales",
      "Delete from database",
      "Nurture with more marketing content",
      "Ignore completely",
    ],
    correctIndex: 2,
    explanation:
      "A lead with high fit (right company/role) but low engagement needs more nurturing. They match your ICP but have not interacted enough to be sales-ready.",
  },
  {
    type: "true-false",
    question: "Inbound lead generation typically has a lower cost per lead than outbound.",
    correctAnswer: true,
    explanation:
      "Inbound strategies (content, SEO, social) typically produce lower cost per lead than outbound (cold email, paid ads) because they attract prospects organically, though they take longer to build.",
  },
  {
    type: "true-false",
    question: "A low MQL-to-SQL conversion rate always means your marketing content is poor.",
    correctAnswer: false,
    explanation:
      "A low MQL-to-SQL rate could indicate poor scoring criteria, misaligned targeting, or ineffective nurturing — not necessarily poor content quality. The root cause requires investigation.",
  },
  {
    type: "multi-select",
    question: "Which are inbound lead generation tactics? (Select all that apply)",
    options: [
      "SEO and blog content",
      "Cold calling",
      "Webinars and gated resources",
      "Social media content",
      "Direct mail campaigns",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Inbound tactics include SEO/blog content, webinars, gated resources, and social media content. Cold calling and direct mail are outbound approaches.",
  },
  {
    type: "multi-select",
    question: "Which factors contribute to a lead's firmographic score? (Select all that apply)",
    options: [
      "Company size",
      "Industry",
      "Personal hobbies",
      "Revenue range",
      "Technology stack",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Firmographic scoring includes company size, industry, revenue range, and technology stack. Personal hobbies are not a firmographic factor.",
  },
  {
    type: "ordering",
    question: "Arrange the CRM pipeline stages in the correct order.",
    items: [
      "Closed Won / Closed Lost",
      "SQL (Sales Qualified Lead)",
      "Opportunity",
      "New Lead",
      "MQL (Marketing Qualified Lead)",
    ],
    correctOrder: [3, 4, 1, 2, 0],
    explanation:
      "The CRM pipeline flows: New Lead, MQL (marketing qualified), SQL (sales qualified), Opportunity, and Closed Won or Closed Lost.",
  },
  {
    type: "multiple-choice",
    question: "What is the typical benchmark for MQL-to-SQL conversion rate?",
    options: [
      "1%",
      "13%",
      "50%",
      "90%",
    ],
    correctIndex: 1,
    explanation:
      "The benchmark MQL-to-SQL conversion rate is approximately 13%. If your rate is significantly below this, your scoring criteria or nurturing may need adjustment.",
  },
  {
    type: "multiple-choice",
    question: "What should you do with leads that have high engagement but low fit scores?",
    options: [
      "Send them to sales immediately since they are highly engaged",
      "Deprioritize them because they do not match your ideal customer profile",
      "Increase their lead score automatically",
      "Add them to your VIP customer list",
    ],
    correctIndex: 1,
    explanation:
      "Low-fit leads should be deprioritized regardless of engagement level. High engagement from wrong-fit leads wastes sales resources on prospects unlikely to convert or become valuable customers.",
  },
  {
    type: "multiple-choice",
    question: "What distinguishes an SQL from an MQL?",
    options: [
      "SQLs have been posted on social media",
      "SQLs have been vetted by sales and confirmed as genuine opportunities with BANT criteria",
      "SQLs have higher website traffic",
      "SQLs are from larger companies",
    ],
    correctIndex: 1,
    explanation:
      "An SQL has been vetted by the sales team and confirmed as a genuine opportunity with Budget, Authority, Need, and Timeline (BANT).",
  },

  // === SECTION 3: Strategy & Planning (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is an Ideal Customer Profile (ICP)?",
    options: [
      "A profile of your best-looking customers",
      "A definition of the type of company most likely to become a high-value customer",
      "A social media profile for your brand",
      "A list of all companies that have ever purchased",
    ],
    correctIndex: 1,
    explanation:
      "An ICP defines the type of company most likely to become a high-value customer, including industry, company size, revenue range, technology stack, and pain points.",
  },
  {
    type: "multiple-choice",
    question: "What does ABM (Account-Based Marketing) do differently from traditional lead generation?",
    options: [
      "ABM uses only email marketing",
      "ABM targets specific high-value accounts rather than casting a wide net",
      "ABM ignores the sales team",
      "ABM only works for startups",
    ],
    correctIndex: 1,
    explanation:
      "ABM flips the traditional funnel by targeting specific high-value accounts (top 50-200) with personalized campaigns rather than casting a wide net for volume.",
  },
  {
    type: "multiple-choice",
    question: "What is the primary platform for B2B lead generation?",
    options: [
      "TikTok",
      "Pinterest",
      "LinkedIn",
      "Snapchat",
    ],
    correctIndex: 2,
    explanation:
      "LinkedIn is the most important platform for B2B lead generation, offering organic thought leadership, Sales Navigator for prospecting, LinkedIn Ads, and professional networking.",
  },
  {
    type: "multiple-choice",
    question: "What is a Service Level Agreement (SLA) between sales and marketing?",
    options: [
      "A legal contract with customers",
      "An agreement where marketing commits to lead volume/quality and sales commits to follow-up speed",
      "A software licensing agreement",
      "An agreement about office space usage",
    ],
    correctIndex: 1,
    explanation:
      "A sales-marketing SLA formalizes commitments: marketing agrees to deliver a certain volume and quality of leads, and sales agrees to follow up within a specified timeframe.",
  },
  {
    type: "true-false",
    question: "ABM typically delivers higher deal sizes and better conversion rates than broad lead generation.",
    correctAnswer: true,
    explanation:
      "Because ABM focuses on high-value, well-researched accounts with personalized campaigns, it typically produces larger deal sizes and higher conversion rates than broad approaches.",
  },
  {
    type: "true-false",
    question: "Sales and marketing alignment is a nice-to-have, not essential for B2B success.",
    correctAnswer: false,
    explanation:
      "Misalignment between sales and marketing is the number one reason B2B lead generation fails. Alignment through shared definitions, SLAs, and closed-loop reporting is essential.",
  },
  {
    type: "multi-select",
    question: "Which ICP attributes should be defined? (Select all that apply)",
    options: [
      "Industry",
      "Company size and revenue range",
      "Favorite office snack brands",
      "Technology stack",
      "Pain points",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "ICP attributes include industry, company size, revenue range, technology stack, and pain points. Personal preferences like snack brands are not relevant.",
  },
  {
    type: "multi-select",
    question: "What LinkedIn strategies work for B2B lead generation? (Select all that apply)",
    options: [
      "Thought leadership content",
      "Sales Navigator for targeted prospecting",
      "LinkedIn Ads (Sponsored Content, Lead Gen Forms)",
      "Posting personal vacation photos",
      "Engaging in relevant groups and comments",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Effective LinkedIn strategies include thought leadership, Sales Navigator, LinkedIn Ads, and genuine group engagement. Personal vacation content is not a lead generation tactic.",
  },
  {
    type: "ordering",
    question: "Arrange the ABM campaign development steps in the correct order.",
    items: [
      "Create personalized campaigns for each account",
      "Research the buying committee at each account",
      "Coordinate sales outreach with marketing campaigns",
      "Identify top 50-200 target accounts",
    ],
    correctOrder: [3, 1, 0, 2],
    explanation:
      "ABM follows: identify target accounts, research buying committees, create personalized campaigns, and coordinate sales outreach with marketing efforts.",
  },
  {
    type: "multiple-choice",
    question: "What is the biggest reason B2B lead generation fails?",
    options: [
      "Insufficient advertising budget",
      "Misalignment between sales and marketing teams",
      "Too many leads in the pipeline",
      "Using too many marketing channels",
    ],
    correctIndex: 1,
    explanation:
      "Sales-marketing misalignment is the number one reason B2B lead generation fails. Without shared definitions, SLAs, and feedback loops, leads fall through the cracks.",
  },
  {
    type: "multi-select",
    question: "What makes LinkedIn lead generation effective? (Select all that apply)",
    options: [
      "Building genuine relationships before pitching",
      "Sending mass connection requests with sales pitches",
      "Sharing valuable thought leadership content",
      "Engaging authentically in comments and groups",
      "Using Sales Navigator for targeted prospecting",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "Effective LinkedIn strategies include genuine relationships, thought leadership, authentic engagement, and targeted prospecting. Mass pitches damage your professional reputation.",
  },
  {
    type: "multiple-choice",
    question: "How many target accounts does ABM typically focus on?",
    options: [
      "1-5",
      "50-200",
      "1,000-5,000",
      "All companies in your market",
    ],
    correctIndex: 1,
    explanation:
      "ABM typically targets 50-200 high-value accounts with personalized campaigns, though the exact number depends on your team's capacity and deal sizes.",
  },

  // === SECTION 4: Execution & Implementation (12 questions) ===
  {
    type: "multiple-choice",
    question: "What type of gated content works best for B2B lead generation?",
    options: [
      "Entertainment quizzes",
      "Industry reports, ROI calculators, and comprehensive guides",
      "Company press releases",
      "Employee headshots",
    ],
    correctIndex: 1,
    explanation:
      "High-value gated content like industry reports, ROI calculators, templates, and comprehensive guides attracts B2B leads because it provides genuine business value.",
  },
  {
    type: "multiple-choice",
    question: "How many fields should a B2B lead generation form typically have?",
    options: [
      "1 (email only)",
      "4 (name, email, company, job title)",
      "10-15 fields for maximum qualification",
      "20+ fields",
    ],
    correctIndex: 1,
    explanation:
      "Keep forms short with 4 key fields — name, email, company, and job title — to maximize conversion rates while capturing enough data for lead scoring.",
  },
  {
    type: "multiple-choice",
    question: "What is the maximum recommended length for a B2B cold email?",
    options: [
      "Under 50 words",
      "Under 150 words",
      "500-1000 words",
      "As long as needed",
    ],
    correctIndex: 1,
    explanation:
      "Cold emails should be under 150 words. Busy B2B professionals are more likely to read and respond to concise, personalized messages that lead with value.",
  },
  {
    type: "multiple-choice",
    question: "How quickly should event leads be contacted after an interaction?",
    options: [
      "Within 24-48 hours while the interaction is fresh",
      "Within one month",
      "Only if they contact you first",
      "After your next quarterly review",
    ],
    correctIndex: 0,
    explanation:
      "Event leads should be contacted within 24-48 hours while the interaction is fresh. Delayed follow-up dramatically reduces conversion rates as prospects forget the conversation.",
  },
  {
    type: "true-false",
    question: "Cold email requires domain warm-up and compliance with CAN-SPAM and GDPR.",
    correctAnswer: true,
    explanation:
      "Cold email requires warming up new domains to build sender reputation, maintaining clean lists, and complying with regulations like CAN-SPAM and GDPR to ensure deliverability.",
  },
  {
    type: "true-false",
    question: "B2B nurture sequences should move directly from welcome email to sales pitch.",
    correctAnswer: false,
    explanation:
      "B2B nurture sequences should progress through stages — education (days 0-14), consideration (days 15-30), and decision (days 30-45) — gradually building trust before pushing for conversion.",
  },
  {
    type: "multi-select",
    question: "What should a B2B cold email include? (Select all that apply)",
    options: [
      "A personalized opening referencing their company or role",
      "A value-led message (not feature-led)",
      "A 10-page company brochure attachment",
      "A single clear call-to-action",
      "Two to three follow-ups with different angles",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Effective cold emails are personalized, value-led, include one clear CTA, and are followed up 2-3 times. Large attachments trigger spam filters and overwhelm recipients.",
  },
  {
    type: "multi-select",
    question: "Which content types generate the highest-quality B2B leads? (Select all that apply)",
    options: [
      "Case studies with measurable results",
      "Webinars on ICP-relevant topics",
      "Generic company blog posts",
      "Industry reports and original research",
      "ROI calculators and templates",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "High-quality B2B leads come from high-value content: case studies, webinars, industry reports, and ROI calculators. Generic blog posts attract broader but lower-quality traffic.",
  },
  {
    type: "ordering",
    question: "Arrange the B2B nurturing sequence stages in the correct order.",
    items: [
      "Decision stage — free trials, demos, ROI data",
      "Consideration stage — case studies, product webinars",
      "Education stage — blog posts, industry insights",
    ],
    correctOrder: [2, 1, 0],
    explanation:
      "B2B nurture sequences progress: education (days 0-14) builds trust with insights, consideration (days 15-30) introduces solutions with case studies, decision (days 30-45) drives conversion with demos and ROI data.",
  },
  {
    type: "multiple-choice",
    question: "What is the most underused yet highest-value event lead generation strategy?",
    options: [
      "Collecting business cards",
      "Timely post-event follow-up within 24-48 hours",
      "Handing out promotional merchandise",
      "Setting up the biggest booth",
    ],
    correctIndex: 1,
    explanation:
      "Timely follow-up within 24-48 hours is the most critical and often underexecuted event strategy. Without prompt follow-up, even high-quality event leads go cold.",
  },
  {
    type: "multi-select",
    question: "How do webinars serve dual purposes in B2B marketing? (Select all that apply)",
    options: [
      "They generate leads through registration forms",
      "They educate prospects and build trust",
      "They replace the need for a sales team",
      "They demonstrate expertise on ICP-relevant topics",
      "They can be repurposed as on-demand nurturing content",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Webinars generate leads via registration, educate and build trust, demonstrate expertise, and can be repurposed as on-demand content. They complement but do not replace sales teams.",
  },
  {
    type: "multiple-choice",
    question: "How many follow-up emails should a B2B cold email sequence include?",
    options: [
      "0 — one email is enough",
      "2-3 with different angles",
      "10-15",
      "Send daily until they respond",
    ],
    correctIndex: 1,
    explanation:
      "A cold email sequence should include 2-3 follow-ups, each approaching from a different angle (different value proposition, social proof, or question). More than that risks spam reputation.",
  },

  // === SECTION 5: Measurement & Optimization (12 questions) ===
  {
    type: "multiple-choice",
    question: "What does pipeline velocity measure?",
    options: [
      "How fast your website loads",
      "How quickly deals move through your pipeline (leads x win rate x deal size / cycle length)",
      "The speed of your email delivery",
      "How fast marketing creates content",
    ],
    correctIndex: 1,
    explanation:
      "Pipeline velocity measures how quickly revenue moves through your sales pipeline, calculated as: number of leads x win rate x average deal size / average sales cycle length.",
  },
  {
    type: "multiple-choice",
    question: "What is closed-loop reporting?",
    options: [
      "Reporting that happens behind closed doors",
      "Tracking a lead from first marketing touch through to closed deal in your CRM",
      "Reporting on social media engagement only",
      "Annual financial reporting",
    ],
    correctIndex: 1,
    explanation:
      "Closed-loop reporting connects marketing activity to actual revenue by tracking a lead from first touch all the way through to closed deal, revealing true marketing ROI.",
  },
  {
    type: "multiple-choice",
    question: "Without closed-loop reporting, what does marketing typically optimize for?",
    options: [
      "Revenue",
      "Customer satisfaction",
      "Lead volume (which may not correlate with revenue)",
      "Brand awareness only",
    ],
    correctIndex: 2,
    explanation:
      "Without closed-loop reporting, marketing optimizes for lead volume because that is what they can measure. But lead volume may not correlate with revenue, leading to wasted resources.",
  },
  {
    type: "multiple-choice",
    question: "What metric measures how much it costs to generate a single lead?",
    options: [
      "CLV",
      "CPL (Cost Per Lead)",
      "ROAS",
      "NPS",
    ],
    correctIndex: 1,
    explanation:
      "Cost Per Lead (CPL) measures the total spend divided by the number of leads generated, calculated per channel to understand which sources are most cost-effective.",
  },
  {
    type: "true-false",
    question: "Closed-loop reporting reveals which campaigns and content pieces actually generate revenue.",
    correctAnswer: true,
    explanation:
      "By tracking leads from first touch to closed deal, closed-loop reporting shows exactly which channels, campaigns, and content pieces drive revenue — not just lead volume.",
  },
  {
    type: "true-false",
    question: "Sales follow-up speed does not significantly impact lead conversion rates.",
    correctAnswer: false,
    explanation:
      "Sales follow-up speed dramatically impacts conversion rates. Studies show leads contacted within 5 minutes are 21x more likely to convert than those contacted after 30 minutes.",
  },
  {
    type: "multi-select",
    question: "Which are key B2B lead generation metrics? (Select all that apply)",
    options: [
      "Cost Per Lead (CPL)",
      "MQL-to-SQL Conversion Rate",
      "Number of social media likes",
      "Sales Cycle Length",
      "Pipeline Velocity",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Key B2B metrics include CPL, MQL-to-SQL rate, sales cycle length, and pipeline velocity. Social media likes are a vanity metric for B2B lead generation.",
  },
  {
    type: "multi-select",
    question: "What should be reviewed weekly between sales and marketing? (Select all that apply)",
    options: [
      "Lead quality feedback from sales",
      "Office cafeteria menu options",
      "SLA compliance (follow-up speed, lead volume)",
      "Pipeline status and conversion rates",
      "A/B test results on landing pages",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "Weekly reviews should cover lead quality feedback, SLA compliance, pipeline status, and test results. Cafeteria menus are not a sales-marketing alignment topic.",
  },
  {
    type: "ordering",
    question: "Arrange B2B lead generation metrics from leading indicators to lagging indicators.",
    items: [
      "Revenue from closed deals",
      "Website traffic and content downloads",
      "SQL-to-Close conversion rate",
      "MQL volume and quality scores",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "From leading to lagging: website traffic and downloads (earliest indicator), MQL volume and quality (marketing output), SQL-to-Close rate (sales efficiency), revenue from closed deals (ultimate outcome).",
  },
  {
    type: "multiple-choice",
    question: "What should trigger a lead scoring criteria adjustment?",
    options: [
      "A new marketing team hire",
      "A consistently low MQL-to-SQL conversion rate",
      "A change in office location",
      "A new company logo",
    ],
    correctIndex: 1,
    explanation:
      "A consistently low MQL-to-SQL conversion rate indicates that marketing is sending leads to sales that are not actually qualified, signaling a need to adjust scoring criteria.",
  },
  {
    type: "ordering",
    question: "Arrange the lead-to-revenue tracking process in the correct order.",
    items: [
      "Attribute closed revenue back to originating channel",
      "Track lead source and first touch",
      "Monitor lead progression through CRM pipeline stages",
      "Calculate channel-level CPL and ROI",
    ],
    correctOrder: [1, 2, 0, 3],
    explanation:
      "The tracking process follows: track the lead source at first touch, monitor progression through pipeline stages, attribute closed revenue to the originating channel, and calculate channel-level CPL and ROI.",
  },
  {
    type: "ordering",
    question: "Arrange the optimization review cycle from most frequent to least frequent.",
    items: [
      "Quarterly strategy and SLA reviews",
      "Annual lead generation strategy overhaul",
      "Weekly lead quality reviews with sales",
      "Monthly pipeline and conversion analysis",
    ],
    correctOrder: [2, 3, 0, 1],
    explanation:
      "The review cycle from most to least frequent: weekly lead quality reviews, monthly pipeline analysis, quarterly strategy reviews, and annual strategy overhaul.",
  },
];
