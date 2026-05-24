import type { QuizQuestion } from "@/lib/academy-data";

export const contentMarketingStrategyQuiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is the primary goal of content marketing?",
    options: [
      "To interrupt audiences with promotional messages",
      "To create and distribute valuable content that drives profitable customer action",
      "To produce as much content as possible across all channels",
      "To rank #1 on Google for every keyword in your industry",
    ],
    correctIndex: 1,
    explanation:
      "Content marketing is the strategic practice of creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience and drive profitable customer action.",
  },
  {
    type: "multiple-choice",
    question: "What is a 'content engine' in the context of content marketing?",
    options: [
      "A software tool that automatically generates blog posts",
      "A repeatable, scalable system that consistently produces high-quality content aligned with business goals",
      "A search engine specifically designed for content marketers",
      "An AI tool that writes and publishes content without human input",
    ],
    correctIndex: 1,
    explanation:
      "A content engine is a repeatable, scalable system that consistently produces high-quality content aligned with your business goals. It fuels every stage of the buyer journey and creates compounding returns over time.",
  },
  {
    type: "multiple-choice",
    question: "According to industry data, businesses with blogs generate how many more leads per month compared to those without?",
    options: [
      "25% more leads",
      "40% more leads",
      "67% more leads",
      "90% more leads",
    ],
    correctIndex: 2,
    explanation:
      "Research shows that businesses with blogs generate 67% more leads per month than those without, demonstrating the significant impact of consistent content creation on lead generation.",
  },
  {
    type: "multiple-choice",
    question: "How does content marketing primarily differ from traditional advertising?",
    options: [
      "Content marketing is always free while advertising costs money",
      "Content marketing earns attention by providing value rather than interrupting the audience",
      "Content marketing only works for B2B companies",
      "Content marketing focuses exclusively on social media platforms",
    ],
    correctIndex: 1,
    explanation:
      "Unlike traditional advertising that interrupts your audience, content marketing earns their attention by solving problems, answering questions, and providing genuine value before asking for anything in return.",
  },
  {
    type: "true-false",
    question: "Content marketing only benefits B2B companies and is not effective for B2C brands.",
    correctAnswer: false,
    explanation:
      "Content marketing is effective for both B2B and B2C. According to the Content Marketing Institute, 73% of B2B marketers and 70% of B2C marketers use content marketing as part of their overall strategy.",
  },
  {
    type: "true-false",
    question: "A well-built content engine creates compounding returns over time as the library of assets continues to attract organic traffic long after publication.",
    correctAnswer: true,
    explanation:
      "Content marketing is a long-term investment. A well-built content engine creates compounding returns because each piece of content continues to attract organic traffic and generate leads long after its initial publication date.",
  },
  {
    type: "multi-select",
    question: "Which of the following are key components of a content marketing strategy? (Select all that apply)",
    options: [
      "Audience research",
      "Content pillars",
      "Cold calling scripts",
      "Funnel mapping",
      "Distribution planning",
      "Billboard placement",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "A comprehensive content marketing strategy includes audience research, content pillars, funnel mapping, and distribution planning. Cold calling scripts and billboard placement are traditional marketing tactics, not content marketing components.",
  },
  {
    type: "multi-select",
    question: "Which benefits does content marketing provide compared to traditional advertising? (Select all that apply)",
    options: [
      "Compounding organic traffic over time",
      "Building trust and authority with audiences",
      "Immediate results within 24 hours",
      "Generating leads at lower cost over time",
      "Educating prospects through the buyer journey",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Content marketing provides compounding organic traffic, builds trust and authority, generates leads at lower cost over time, and educates prospects through the buyer journey. However, it typically takes 6-12 months to show meaningful ROI, not 24 hours.",
  },
  {
    type: "ordering",
    question: "Put the stages of a content marketing program in the correct order, from initial setup to ongoing improvement.",
    items: ["Measure and optimize", "Research your audience", "Create and publish content", "Define content pillars and strategy"],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "The correct order is: Research your audience first to understand their needs, then define your content pillars and strategy, then create and publish content, and finally measure and optimize based on performance data.",
  },
  {
    type: "multi-select",
    question: "Which of the following are true about content marketing adoption? (Select all that apply)",
    options: [
      "73% of B2B marketers use content marketing",
      "70% of B2C marketers use content marketing",
      "Content marketing is only used by enterprise companies",
      "Businesses with blogs generate 67% more leads per month",
      "Content marketing has been declining in adoption since 2020",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "According to the Content Marketing Institute, 73% of B2B and 70% of B2C marketers use content marketing, and businesses with blogs generate 67% more leads. Content marketing adoption has been increasing, not declining, and it is used by businesses of all sizes.",
  },
  {
    type: "multiple-choice",
    question: "How long does it typically take for a content marketing program to show meaningful ROI?",
    options: [
      "1-2 weeks",
      "1-3 months",
      "6-12 months",
      "2-3 years",
    ],
    correctIndex: 2,
    explanation:
      "Most content programs take 6-12 months to show meaningful ROI. Content marketing is a long-term investment that builds compounding value over time, unlike paid advertising which can show immediate but non-compounding results.",
  },
  {
    type: "multi-select",
    question: "Which of the following are strategic-level content marketing activities rather than tactical execution? (Select all that apply)",
    options: [
      "Defining brand mission and target audience",
      "Writing an individual blog post",
      "Setting SMART goals for your content program",
      "Formatting images for a social media post",
      "Conducting a content audit and gap analysis",
    ],
    correctIndices: [0, 2, 4],
    explanation:
      "Strategic activities include defining your brand mission and audience, setting SMART goals, and conducting content audits. Writing individual blog posts and formatting social media images are tactical execution tasks, not strategic planning.",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is a buyer persona?",
    options: [
      "A real customer who agreed to be a brand ambassador",
      "A semi-fictional representation of your ideal customer based on real data and informed assumptions",
      "A celebrity influencer who endorses your product",
      "A customer service representative who handles buyer inquiries",
    ],
    correctIndex: 1,
    explanation:
      "A buyer persona is a semi-fictional representation of your ideal customer based on real data and informed assumptions about demographics, behaviors, motivations, and goals.",
  },
  {
    type: "multiple-choice",
    question: "How many content pillars should a business typically define?",
    options: [
      "1-2",
      "3-5",
      "8-10",
      "15-20",
    ],
    correctIndex: 1,
    explanation:
      "Businesses typically define 3-5 content pillars. Each pillar should be broad enough to generate dozens of subtopics but focused enough to build topical authority.",
  },
  {
    type: "multiple-choice",
    question: "What type of content is most appropriate for the TOFU (Top of Funnel) stage?",
    options: [
      "Product demos and free trials",
      "ROI calculators and pricing pages",
      "Blog posts, infographics, and how-to videos",
      "Customer testimonials and case studies",
    ],
    correctIndex: 2,
    explanation:
      "TOFU content is educational and broad, aimed at building awareness. Blog posts, infographics, social media content, podcasts, and how-to videos are ideal for attracting prospects who are just realizing they have a problem.",
  },
  {
    type: "multiple-choice",
    question: "Which funnel stage does a product comparison guide belong to?",
    options: [
      "TOFU — Top of Funnel",
      "MOFU — Middle of Funnel",
      "BOFU — Bottom of Funnel",
      "Post-purchase retention",
    ],
    correctIndex: 1,
    explanation:
      "Comparison guides belong to MOFU (Middle of Funnel / Consideration stage) where the prospect is actively researching solutions. Content here includes white papers, case studies, webinars, and comparison guides.",
  },
  {
    type: "multiple-choice",
    question: "What does BOFU stand for in the marketing funnel?",
    options: [
      "Beginning of Funnel Understanding",
      "Bottom of Funnel",
      "Basis of Funnel Utility",
      "Brand Outreach and Follow-Up",
    ],
    correctIndex: 1,
    explanation:
      "BOFU stands for Bottom of Funnel, the decision stage where the prospect is ready to buy. Content at this stage includes product demos, free trials, customer testimonials, ROI calculators, and pricing pages.",
  },
  {
    type: "true-false",
    question: "Content pillars should be narrow enough that you can only create 2-3 articles per pillar.",
    correctAnswer: false,
    explanation:
      "Content pillars should be broad enough to generate dozens of subtopics but focused enough to build topical authority. If a pillar only supports 2-3 articles, it is too narrow to be an effective pillar.",
  },
  {
    type: "true-false",
    question: "MOFU content aims to position your brand as the best solution and build trust with prospects who are actively researching.",
    correctAnswer: true,
    explanation:
      "MOFU (Middle of Funnel / Consideration) content goes deeper than awareness-stage content. Its goal is to position your brand as the best solution and build trust through content like white papers, case studies, webinars, and comparison guides.",
  },
  {
    type: "multi-select",
    question: "Which of the following are essential elements of a buyer persona? (Select all that apply)",
    options: [
      "Demographics and job role",
      "Social media passwords",
      "Goals and challenges",
      "Buying triggers",
      "Credit card information",
      "Information sources they trust",
    ],
    correctIndices: [0, 2, 3, 5],
    explanation:
      "Essential buyer persona elements include demographics and job role, goals and challenges, buying triggers, and information sources they trust. Personal financial information like credit card details and passwords are never part of a persona.",
  },
  {
    type: "multi-select",
    question: "Which content formats are appropriate for BOFU (Bottom of Funnel) stage? (Select all that apply)",
    options: [
      "Product demonstrations",
      "Awareness-level blog posts",
      "Free trials",
      "ROI calculators",
      "Customer testimonials",
      "General how-to infographics",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "BOFU content closes deals and includes product demos, free trials, ROI calculators, customer testimonials, and pricing pages. General blog posts and how-to infographics are TOFU content.",
  },
  {
    type: "ordering",
    question: "Put the marketing funnel stages in order from top to bottom.",
    items: ["BOFU — Decision", "TOFU — Awareness", "MOFU — Consideration"],
    correctOrder: [1, 2, 0],
    explanation:
      "The marketing funnel flows from TOFU (Top of Funnel / Awareness) where prospects first realize they have a problem, to MOFU (Middle of Funnel / Consideration) where they research solutions, to BOFU (Bottom of Funnel / Decision) where they are ready to purchase.",
  },
  {
    type: "multiple-choice",
    question: "Where do content pillars sit strategically?",
    options: [
      "At the intersection of trending topics and competitor weaknesses",
      "At the intersection of what your audience cares about and what your brand has authority to speak on",
      "At the intersection of high search volume and low competition keywords",
      "At the intersection of paid advertising and organic content",
    ],
    correctIndex: 1,
    explanation:
      "Content pillars sit at the intersection of what your audience cares about and what your brand has authority to speak on. This ensures content is both relevant to readers and credible from your brand.",
  },
  {
    type: "ordering",
    question: "Arrange these data sources for building buyer personas from most direct to least direct.",
    items: ["Social media listening", "Customer interviews", "Website analytics", "Industry reports"],
    correctOrder: [1, 2, 0, 3],
    explanation:
      "Customer interviews provide the most direct persona insights through face-to-face conversation. Website analytics show actual behavior on your site. Social media listening captures broader conversations. Industry reports provide general market data but are least specific to your audience.",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question: "What does the 'M' in SMART goals stand for?",
    options: [
      "Manageable",
      "Measurable",
      "Marketing-focused",
      "Meaningful",
    ],
    correctIndex: 1,
    explanation:
      "SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound. Measurable means you can quantify progress and know when the goal has been achieved.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of a content audit?",
    options: [
      "To calculate how much money was spent on content creation",
      "To catalog existing content and identify gaps and opportunities for improvement",
      "To count the total number of words published on your blog",
      "To determine which writers produce content the fastest",
    ],
    correctIndex: 1,
    explanation:
      "A content audit catalogs every existing piece by URL, topic, funnel stage, format, and performance metrics. It identifies content gaps (topics your audience searches for that you have not covered) and content that needs updating.",
  },
  {
    type: "multiple-choice",
    question: "What is the recommended distribution split for an integrated content strategy?",
    options: [
      "100% owned media",
      "50% owned, 30% earned, 20% paid",
      "70% owned, 20% earned, 10% paid",
      "33% owned, 33% earned, 33% paid",
    ],
    correctIndex: 2,
    explanation:
      "The best content distribution strategies often follow a 70/20/10 split: 70% owned media (blog, email, website), 20% earned media (press, guest posts, social shares), and 10% paid media (social ads, sponsored content, PPC).",
  },
  {
    type: "multiple-choice",
    question: "Which of the following is an example of 'earned media'?",
    options: [
      "A blog post on your company website",
      "A sponsored LinkedIn ad",
      "A guest post published on an industry publication",
      "A promotional email to your subscriber list",
    ],
    correctIndex: 2,
    explanation:
      "Earned media includes press mentions, guest posts, and social shares — coverage you earn through the quality and relevance of your content rather than paying for it or publishing on your own platforms.",
  },
  {
    type: "multiple-choice",
    question: "What tool category is recommended for managing an editorial calendar?",
    options: [
      "Graphic design software like Photoshop",
      "Project management tools like Notion, Asana, or Monday.com",
      "Video editing software like Premiere Pro",
      "Accounting software like QuickBooks",
    ],
    correctIndex: 1,
    explanation:
      "Project management tools like Notion, Asana, or Monday.com are ideal for managing editorial calendars. They allow you to include columns for status, assignee, publish date, target keyword, funnel stage, and distribution channels.",
  },
  {
    type: "true-false",
    question: "A content gap analysis identifies topics your audience searches for that you have not yet covered.",
    correctAnswer: true,
    explanation:
      "A content gap analysis is part of the content audit process. It identifies topics and keywords your audience is searching for that your existing content library does not address, revealing opportunities for new content.",
  },
  {
    type: "true-false",
    question: "An editorial calendar should only track publication dates and article titles, without additional details like keywords or funnel stage.",
    correctAnswer: false,
    explanation:
      "An effective editorial calendar includes much more than dates and titles. It should track status, assignee, publish date, target keyword, funnel stage, distribution channels, and content format to ensure strategic alignment.",
  },
  {
    type: "multi-select",
    question: "Which of the following are examples of 'owned media'? (Select all that apply)",
    options: [
      "Your company blog",
      "A newspaper article about your brand",
      "Your email newsletter",
      "A paid Facebook ad",
      "Your website",
      "A guest appearance on a podcast",
    ],
    correctIndices: [0, 2, 4],
    explanation:
      "Owned media includes channels you control: your blog, email newsletter, and website. A newspaper article and podcast guest appearance are earned media. A paid Facebook ad is paid media.",
  },
  {
    type: "multi-select",
    question: "Which columns should be included in a well-structured editorial calendar? (Select all that apply)",
    options: [
      "Target keyword",
      "Employee salary information",
      "Funnel stage",
      "Distribution channels",
      "Content status and assignee",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "A well-structured editorial calendar should include target keyword, funnel stage, distribution channels, content status, and assignee. Employee salary information is not relevant to editorial planning.",
  },
  {
    type: "ordering",
    question: "Put these content strategy planning steps in the correct order.",
    items: ["Build editorial calendar", "Set SMART goals", "Conduct content audit", "Define distribution channels"],
    correctOrder: [1, 2, 0, 3],
    explanation:
      "First set SMART goals to define what success looks like, then conduct a content audit to understand your current state, then build an editorial calendar to plan new content, and finally define distribution channels to maximize reach.",
  },
  {
    type: "multiple-choice",
    question: "Which SMART goal is the best example for a content marketing strategy?",
    options: [
      "Get more blog traffic",
      "Become the best content marketing brand",
      "Increase organic blog traffic by 40% within 6 months by publishing 12 pillar articles",
      "Write lots of great content this year",
    ],
    correctIndex: 2,
    explanation:
      "This goal is SMART: Specific (organic blog traffic), Measurable (40% increase), Achievable (via 12 pillar articles), Relevant (to content marketing), and Time-bound (within 6 months).",
  },
  {
    type: "multiple-choice",
    question: "Which tool is commonly used for content auditing to crawl a website and catalog pages?",
    options: [
      "Canva",
      "Screaming Frog",
      "Mailchimp",
      "Hootsuite",
    ],
    correctIndex: 1,
    explanation:
      "Screaming Frog is a website crawling tool commonly used in content audits to catalog pages, analyze metadata, and identify technical issues. Canva is for design, Mailchimp for email, and Hootsuite for social media management.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question: "What should a content brief include?",
    options: [
      "Only the article title and word count",
      "Target keyword, search intent, funnel stage, outline, word count, CTA, and reference links",
      "Just the writer's name and deadline",
      "A complete first draft of the article",
    ],
    correctIndex: 1,
    explanation:
      "A comprehensive content brief includes the target keyword, search intent, funnel stage, content outline, recommended word count, call-to-action, and reference links to ensure writers produce strategically aligned content.",
  },
  {
    type: "multiple-choice",
    question: "What is a topic cluster in content marketing?",
    options: [
      "A group of social media posts published on the same day",
      "A pillar page linked to multiple supporting articles on related subtopics",
      "A collection of competitor content on the same topic",
      "A set of keywords with similar search volume",
    ],
    correctIndex: 1,
    explanation:
      "A topic cluster consists of a comprehensive pillar page linked to multiple supporting articles on related subtopics. This structure builds topical authority and improves search rankings across an entire subject area.",
  },
  {
    type: "multiple-choice",
    question: "When building a content team, what is the recommended approach for balancing in-house and external talent?",
    options: [
      "Only use in-house talent for all content",
      "Outsource everything to the cheapest freelancers",
      "Use in-house talent for strategic, brand-critical content and freelancers for scale",
      "Hire only generalists who can do everything",
    ],
    correctIndex: 2,
    explanation:
      "The recommended approach is a mix of in-house talent for strategic, brand-critical content (where deep brand knowledge is essential) and freelancers or agencies for scale (to increase output without proportionally increasing headcount).",
  },
  {
    type: "multiple-choice",
    question: "How many secondary keywords should you target per content piece alongside the primary keyword?",
    options: [
      "0 — only target one keyword per piece",
      "2-3 related secondary keywords",
      "10-15 secondary keywords",
      "As many as possible",
    ],
    correctIndex: 1,
    explanation:
      "Best practice is to target one primary keyword and 2-3 related secondary keywords per piece. This focuses the content enough to rank well while naturally covering related search queries.",
  },
  {
    type: "multiple-choice",
    question: "What is the primary purpose of a style guide in content marketing?",
    options: [
      "To list all company passwords and login credentials",
      "To define brand voice, tone, formatting conventions, and visual standards",
      "To track content performance metrics",
      "To manage the editorial calendar",
    ],
    correctIndex: 1,
    explanation:
      "A style guide defines brand voice, tone, formatting conventions, and visual standards. It ensures consistency across all content, regardless of which team member or freelancer creates it.",
  },
  {
    type: "true-false",
    question: "Standard Operating Procedures (SOPs) should be documented so that any team member can follow the content creation workflow.",
    correctAnswer: true,
    explanation:
      "SOPs ensure consistent quality and enable any team member to execute content creation processes. They prevent knowledge from being siloed and make it easier to onboard new team members or freelancers.",
  },
  {
    type: "true-false",
    question: "Interactive content like quizzes and calculators is not considered a valid content marketing format.",
    correctAnswer: false,
    explanation:
      "Interactive content such as quizzes, calculators, tools, and assessments is a highly effective content marketing format. These formats engage users directly and often generate higher engagement and conversion rates than passive content.",
  },
  {
    type: "multi-select",
    question: "Which of the following are stages in a typical content creation workflow? (Select all that apply)",
    options: [
      "Ideation",
      "Brief creation",
      "Stock trading",
      "Drafting and editing",
      "Publishing and distribution",
      "Office interior design",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "A typical content workflow includes ideation, brief creation, drafting and editing, design/formatting, review/approval, publishing, and distribution. Stock trading and office interior design are not content workflow stages.",
  },
  {
    type: "multi-select",
    question: "Which of the following should be checked before publishing a piece of content? (Select all that apply)",
    options: [
      "SEO optimization (title tags, meta descriptions, headings)",
      "Brand voice and style consistency",
      "Competitor's publishing schedule",
      "Accuracy of facts and data",
      "Internal links to related content",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Pre-publish quality checks should include SEO optimization, brand consistency, accuracy of facts and data, and internal linking. While monitoring competitors is useful strategically, it is not a pre-publish checklist item.",
  },
  {
    type: "ordering",
    question: "Put these content creation workflow stages in the correct order.",
    items: ["Publishing", "Drafting", "Ideation", "Editing and review", "Brief creation"],
    correctOrder: [2, 4, 1, 3, 0],
    explanation:
      "The content creation workflow follows: Ideation (generating topics), Brief creation (defining requirements), Drafting (writing the content), Editing and review (quality assurance), and Publishing (making it live).",
  },
  {
    type: "multiple-choice",
    question: "What is the best way to vet freelance content writers?",
    options: [
      "Hire whoever charges the lowest rate",
      "Review portfolios, assign paid test pieces, and check for subject-matter expertise",
      "Only hire writers with journalism degrees",
      "Use only AI-generated content to avoid hiring writers",
    ],
    correctIndex: 1,
    explanation:
      "The best vetting process includes reviewing portfolios to assess writing quality, assigning paid test pieces to evaluate their ability with your specific content, and checking for subject-matter expertise relevant to your industry.",
  },
  {
    type: "ordering",
    question: "Arrange these content formats from typically shortest to longest production time.",
    items: ["Social media post", "Blog article", "Original research report", "Infographic"],
    correctOrder: [0, 1, 3, 2],
    explanation:
      "Social media posts are quickest to produce, followed by blog articles. Infographics require writing, data visualization, and design. Original research reports demand data collection, analysis, writing, and design — making them the most time-intensive.",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is the basic formula for calculating content marketing ROI?",
    options: [
      "Total content pieces / Total website visits x 100",
      "(Revenue from Content - Cost of Content) / Cost of Content x 100",
      "Social media followers / Email subscribers x 100",
      "Organic traffic / Paid traffic x 100",
    ],
    correctIndex: 1,
    explanation:
      "The basic ROI formula is: (Revenue from Content - Cost of Content) / Cost of Content x 100. This accounts for all content costs (writer fees, designer time, tools, distribution spend, management overhead) and revenue attributed to content.",
  },
  {
    type: "multiple-choice",
    question: "Which metric is most appropriate for measuring TOFU content performance?",
    options: [
      "Sales qualified leads (SQLs)",
      "Revenue attributed to content",
      "Organic traffic and social impressions",
      "Customer acquisition cost (CAC)",
    ],
    correctIndex: 2,
    explanation:
      "TOFU metrics focus on awareness and reach: organic traffic, social impressions, brand search volume, new users, page views, and social shares. SQLs, revenue, and CAC are BOFU metrics.",
  },
  {
    type: "multiple-choice",
    question: "How often should you schedule content audits at minimum?",
    options: [
      "Daily",
      "Weekly",
      "Quarterly",
      "Once per year",
    ],
    correctIndex: 2,
    explanation:
      "Content audits should be scheduled quarterly at minimum. This allows you to identify underperforming content, update outdated information, improve internal linking, and re-optimize for current keyword trends on a regular cadence.",
  },
  {
    type: "multiple-choice",
    question: "By how much can content refreshing increase organic traffic to a page?",
    options: [
      "5-10%",
      "15-25%",
      "50-100%",
      "200-500%",
    ],
    correctIndex: 2,
    explanation:
      "Content refreshing — updating statistics, adding new sections, improving internal linking, and re-optimizing for current keywords — can increase organic traffic to a page by 50-100% with far less effort than creating something entirely new.",
  },
  {
    type: "multiple-choice",
    question: "Which attribution model helps track revenue from content marketing?",
    options: [
      "Single-touch attribution only",
      "Multi-touch attribution models combined with UTM parameters and CRM integration",
      "Social media follower count",
      "Email open rates alone",
    ],
    correctIndex: 1,
    explanation:
      "Revenue attribution for content marketing is best tracked through a combination of UTM parameters (to tag content links), CRM integration (to connect content touches to deals), and multi-touch attribution models (to credit multiple content interactions in the buyer journey).",
  },
  {
    type: "true-false",
    question: "Content is 'set and forget' — once published, it does not need to be updated or refreshed.",
    correctAnswer: false,
    explanation:
      "Content is not 'set and forget.' Regular content audits and refreshing are essential. Updating outdated statistics, adding new sections, improving internal linking, and re-optimizing for current keywords can significantly boost performance.",
  },
  {
    type: "true-false",
    question: "Marketing qualified leads (MQLs) and conversion rate are examples of BOFU metrics.",
    correctAnswer: true,
    explanation:
      "BOFU metrics measure bottom-of-funnel performance near the point of purchase. They include MQLs, SQLs, conversion rate, customer acquisition cost (CAC), and revenue attributed to content.",
  },
  {
    type: "multi-select",
    question: "Which of the following are considered MOFU metrics? (Select all that apply)",
    options: [
      "Email subscribers",
      "Organic traffic",
      "Lead magnet downloads",
      "Revenue per customer",
      "Webinar registrations",
      "Newsletter open rates",
    ],
    correctIndices: [0, 2, 4, 5],
    explanation:
      "MOFU metrics include email subscribers, lead magnet downloads, webinar registrations, return visits, pages per session, and newsletter open rates. Organic traffic is a TOFU metric, and revenue per customer is a BOFU/retention metric.",
  },
  {
    type: "multi-select",
    question: "What should be included in content costs when calculating ROI? (Select all that apply)",
    options: [
      "Writer fees",
      "Office rent for entire company",
      "Designer time",
      "Content marketing tools and software",
      "Distribution spend",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "Content costs include writer fees, designer time, tools and software, distribution spend, and management overhead directly related to content production. General office rent for the entire company is an overhead cost, not a content-specific cost.",
  },
  {
    type: "ordering",
    question: "Arrange these content optimization actions from least effort to most effort.",
    items: ["Update internal links", "Rewrite an entire article from scratch", "Refresh outdated statistics", "Add new sections to existing content"],
    correctOrder: [0, 2, 3, 1],
    explanation:
      "Updating internal links requires the least effort (just adding or modifying links). Refreshing statistics is relatively quick. Adding new sections requires research and writing. Rewriting an entire article from scratch is the most effort-intensive optimization.",
  },
  {
    type: "multiple-choice",
    question: "What are UTM parameters used for in content marketing measurement?",
    options: [
      "Optimizing page load speed",
      "Tracking the source, medium, and campaign of traffic to attribute visits and conversions to specific content",
      "Improving email deliverability",
      "Designing better thumbnails for social media",
    ],
    correctIndex: 1,
    explanation:
      "UTM (Urchin Tracking Module) parameters are tags added to URLs that track the source, medium, and campaign of incoming traffic. They allow you to attribute website visits and conversions to specific content pieces and distribution channels.",
  },
  {
    type: "ordering",
    question: "Put these content performance analysis steps in the correct sequence.",
    items: ["Implement improvements based on findings", "Collect performance data from analytics", "Identify patterns and underperformers", "Set benchmarks and KPIs"],
    correctOrder: [3, 1, 2, 0],
    explanation:
      "First set benchmarks and KPIs to define success, then collect performance data from analytics, then identify patterns and underperformers by comparing against benchmarks, and finally implement improvements based on your findings.",
  },
];
