import type { QuizQuestion } from "@/lib/academy-data";

export const reputationManagementQuiz: QuizQuestion[] = [
  // === SECTION 1: Introduction & Overview (12 questions) ===
  {
    type: "multiple-choice",
    question: "What percentage of consumers say online reviews influence their purchase decisions?",
    options: [
      "25%",
      "50%",
      "75%",
      "93%",
    ],
    correctIndex: 3,
    explanation:
      "93% of consumers say online reviews influence their purchase decisions, making reputation management essential for business success.",
  },
  {
    type: "multiple-choice",
    question: "What does ORM stand for?",
    options: [
      "Online Revenue Management",
      "Online Reputation Management",
      "Organic Reach Marketing",
      "Outbound Relationship Management",
    ],
    correctIndex: 1,
    explanation:
      "ORM stands for Online Reputation Management — the practice of monitoring, influencing, and protecting how your brand is perceived across the internet.",
  },
  {
    type: "multiple-choice",
    question: "What is the goal of online reputation management?",
    options: [
      "To suppress all negative feedback",
      "To build a strong foundation of positive sentiment so negative experiences are seen in context",
      "To eliminate all online reviews",
      "To only focus on social media presence",
    ],
    correctIndex: 1,
    explanation:
      "The goal is not to suppress negative feedback but to build such a strong foundation of positive sentiment that isolated negative experiences are seen in proper context.",
  },
  {
    type: "true-false",
    question: "A single viral negative post can reach millions within hours.",
    correctAnswer: true,
    explanation:
      "Social media amplifies negative content rapidly. A single viral negative post can reach millions in hours, making proactive reputation management essential.",
  },
  {
    type: "true-false",
    question: "Online reputation management only involves responding to reviews.",
    correctAnswer: false,
    explanation:
      "ORM encompasses review management, social media monitoring, crisis communication, SERP management, PR strategies, sentiment analysis, and proactive content creation.",
  },
  {
    type: "multi-select",
    question: "What disciplines does ORM operate at the intersection of? (Select all that apply)",
    options: [
      "Customer experience",
      "Public relations",
      "Warehouse logistics",
      "SEO",
      "Social media",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "ORM operates at the intersection of customer experience, public relations, SEO, and social media. Warehouse logistics is a supply chain concern, not a reputation management discipline.",
  },
  {
    type: "multi-select",
    question: "What contributes to your online reputation? (Select all that apply)",
    options: [
      "Reviews on Google and Yelp",
      "Social media comments and mentions",
      "Your office building's architecture",
      "Search engine results for your brand name",
      "News articles about your company",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Online reputation is shaped by reviews, social mentions, search results, and news articles. Physical office architecture is not an online reputation factor.",
  },
  {
    type: "ordering",
    question: "Arrange the reputation management priorities from proactive to reactive.",
    items: [
      "Crisis communication response",
      "Building a positive review profile",
      "Setting up brand monitoring systems",
      "Managing SERP results for branded queries",
    ],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "Proactive to reactive: set up monitoring systems first, build a positive review profile, manage SERP results, and have crisis communication ready as a reactive measure.",
  },
  {
    type: "multiple-choice",
    question: "What is the 'reputation equation'?",
    options: [
      "Revenue divided by customer complaints",
      "The sum of every review, mention, search result, social comment, and news article about your brand",
      "Total positive reviews minus negative reviews",
      "Your advertising budget divided by brand mentions",
    ],
    correctIndex: 1,
    explanation:
      "Your online reputation is the sum of every review, mention, search result, social comment, and news article. You cannot control what people say, but you can control how you respond and what content you create.",
  },
  {
    type: "multiple-choice",
    question: "Why is proactive reputation management better than reactive management?",
    options: [
      "It costs less in tools",
      "Preventing crises and building positive sentiment is more effective than only responding to problems",
      "Proactive management eliminates all negative feedback",
      "Reactive management is not a real practice",
    ],
    correctIndex: 1,
    explanation:
      "Proactive reputation management prevents crises and builds a strong positive foundation, which is far more effective and less costly than only reacting when problems arise.",
  },
  {
    type: "multiple-choice",
    question: "What aspects of online reputation CAN you directly control?",
    options: [
      "What customers write in their reviews",
      "How you respond, what content you create, and how proactively you manage your footprint",
      "What journalists write about your brand",
      "What competitors say about you on social media",
    ],
    correctIndex: 1,
    explanation:
      "You cannot control what others say, but you can control your responses, your content creation, and how proactively you manage your digital footprint.",
  },
  {
    type: "ordering",
    question: "Arrange the components of online reputation from most controllable to least controllable.",
    items: [
      "Customer reviews on third-party sites",
      "News articles and media coverage",
      "Your website and owned content",
      "Social media comments and mentions",
    ],
    correctOrder: [2, 3, 0, 1],
    explanation:
      "Most to least controllable: your own website/content (fully owned), social media (semi-controllable), third-party reviews (influence through responses), news/media (least controllable).",
  },

  // === SECTION 2: Core Concepts (12 questions) ===
  {
    type: "multiple-choice",
    question: "How quickly should businesses respond to online reviews?",
    options: [
      "Within 1 week",
      "Within 24-48 hours",
      "Within 30 days",
      "Only respond to negative reviews",
    ],
    correctIndex: 1,
    explanation:
      "Best practice is to respond to all reviews — both positive and negative — within 24-48 hours. This demonstrates engagement and shows other readers you value feedback.",
  },
  {
    type: "multiple-choice",
    question: "What is the difference between brand monitoring and social listening?",
    options: [
      "They are the same thing",
      "Brand monitoring tracks direct mentions; social listening analyzes broader conversations and sentiment",
      "Social listening only works on Twitter",
      "Brand monitoring is more expensive",
    ],
    correctIndex: 1,
    explanation:
      "Brand monitoring tracks direct mentions of your brand name. Social listening goes deeper, analyzing conversations, trends, and sentiment around topics relevant to your industry.",
  },
  {
    type: "multiple-choice",
    question: "What is SERP reputation management?",
    options: [
      "Managing your server infrastructure",
      "Optimizing owned properties to dominate the first page of Google for branded searches",
      "Buying all ad space on Google",
      "Removing Google search results",
    ],
    correctIndex: 1,
    explanation:
      "SERP reputation management involves creating and optimizing owned properties (website, social profiles, blog) to dominate the first page for branded searches.",
  },
  {
    type: "multiple-choice",
    question: "What does sentiment analysis use to classify mentions?",
    options: [
      "Manual counting of words",
      "Natural language processing to classify mentions as positive, negative, or neutral",
      "Only star ratings from reviews",
      "Social media follower counts",
    ],
    correctIndex: 1,
    explanation:
      "Sentiment analysis uses natural language processing (NLP) to automatically classify brand mentions as positive, negative, or neutral, providing quantitative reputation measurement.",
  },
  {
    type: "true-false",
    question: "Google uses review signals including quantity, velocity, and sentiment as local ranking factors.",
    correctAnswer: true,
    explanation:
      "Google uses review signals — quantity (how many), velocity (how frequently new ones appear), diversity (across platforms), and sentiment — as factors in local search rankings.",
  },
  {
    type: "true-false",
    question: "You should only respond to negative reviews, not positive ones.",
    correctAnswer: false,
    explanation:
      "Respond to every review — positive and negative — within 24-48 hours. Responding to positive reviews shows appreciation and reinforces positive experiences for other readers.",
  },
  {
    type: "multi-select",
    question: "Which tools can be used for brand monitoring? (Select all that apply)",
    options: [
      "Google Alerts",
      "Mention",
      "Brand24",
      "Microsoft Excel",
      "Brandwatch",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Google Alerts, Mention, Brand24, and Brandwatch are brand monitoring tools. Microsoft Excel is a spreadsheet tool, not a monitoring platform.",
  },
  {
    type: "multi-select",
    question: "What platforms should be monitored for review management? (Select all that apply)",
    options: [
      "Google Business Profile",
      "Yelp",
      "Trustpilot",
      "Personal blog comments",
      "G2 (for B2B/SaaS)",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Key review platforms include Google, Yelp, Trustpilot, and industry-specific sites like G2 for B2B. Personal blog comments are not a standard review platform.",
  },
  {
    type: "ordering",
    question: "Arrange the review management workflow in the correct order.",
    items: [
      "Flag fake or policy-violating reviews for removal",
      "Solicit reviews from satisfied customers",
      "Respond to reviews within 24-48 hours",
      "Address legitimate complaints with empathy and solutions",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "The workflow: proactively solicit reviews, respond to all reviews promptly, address legitimate complaints with empathy, and flag policy-violating reviews for removal.",
  },
  {
    type: "multiple-choice",
    question: "When negative content appears in branded search results, what is the recommended approach?",
    options: [
      "Try to hack the search engine to remove it",
      "Create authoritative, SEO-optimized content on high-domain-authority platforms to push it down",
      "Ignore it and hope it goes away",
      "Send threatening legal letters to the publisher",
    ],
    correctIndex: 1,
    explanation:
      "The recommended approach is to create authoritative content on high-domain-authority platforms that will rank above the negative content, effectively pushing it off the first page.",
  },
  {
    type: "multiple-choice",
    question: "Why are sentiment shifts considered leading indicators in reputation management?",
    options: [
      "Because sentiment always directly causes revenue changes",
      "Because changes in sentiment often appear before their impact on reviews or revenue",
      "Because sentiment data is more accurate than revenue data",
      "Because sentiment only changes after revenue declines",
    ],
    correctIndex: 1,
    explanation:
      "Changes in sentiment often appear before their impact on reviews or revenue, making sentiment tracking a valuable early warning system for emerging reputation issues.",
  },
  {
    type: "multiple-choice",
    question: "How often should sentiment scores be tracked?",
    options: [
      "Once a year",
      "Monthly, segmented by platform and topic",
      "Only during a crisis",
      "Every five years",
    ],
    correctIndex: 1,
    explanation:
      "Sentiment scores should be tracked monthly, segmented by platform and topic, to identify trends and use shifts as leading indicators of reputation changes.",
  },

  // === SECTION 3: Strategy & Planning (12 questions) ===
  {
    type: "multiple-choice",
    question: "Why is the first 60 minutes of a crisis critical?",
    options: [
      "Because the media loses interest after an hour",
      "Because having a plan enables a quick, measured, professional response rather than scrambling",
      "Because social media platforms restrict posts after 60 minutes",
      "Because legal teams need exactly 60 minutes to respond",
    ],
    correctIndex: 1,
    explanation:
      "The first 60 minutes set the tone for the entire crisis response. Having a plan means you respond quickly with a measured, professional voice rather than scrambling.",
  },
  {
    type: "multiple-choice",
    question: "What should a crisis communication plan include?",
    options: [
      "Only a list of social media passwords",
      "A crisis team, escalation criteria, response templates, approval workflows, and media contacts",
      "Only an apology template",
      "Only legal disclaimers",
    ],
    correctIndex: 1,
    explanation:
      "A complete crisis plan includes a crisis team with defined roles, escalation criteria, response templates, approval workflows for fast responses, and a media contact list.",
  },
  {
    type: "multiple-choice",
    question: "What is a 'content shield' strategy?",
    options: [
      "Using a firewall to protect your website",
      "Building a collection of high-authority web properties you control that rank for your brand name",
      "Blocking competitors from creating content",
      "Encrypting your marketing content",
    ],
    correctIndex: 1,
    explanation:
      "A content shield is a collection of high-authority web properties you control (website, blog, social profiles, press pages) optimized to rank for your brand name, making it harder for negative content to appear on page one.",
  },
  {
    type: "multiple-choice",
    question: "When soliciting reviews, should you incentivize specific star ratings?",
    options: [
      "Yes, always offer money for 5-star reviews",
      "No — encourage honest feedback and use negative reviews as improvement opportunities",
      "Yes, but only for 4-star or higher",
      "Only incentivize reviews on Google",
    ],
    correctIndex: 1,
    explanation:
      "Never incentivize specific ratings — this violates platform policies and undermines trust. Instead, encourage honest feedback and use negative reviews as opportunities to improve.",
  },
  {
    type: "true-false",
    question: "Every brand should have a crisis communication plan before a crisis hits.",
    correctAnswer: true,
    explanation:
      "Creating a crisis plan during a crisis is too late. Having one ready enables the rapid, measured response that is critical in the first 60 minutes.",
  },
  {
    type: "multi-select",
    question: "Why is earned media coverage valuable for reputation management? (Select all that apply)",
    options: [
      "It carries more credibility than paid advertising",
      "Readers perceive it as an independent endorsement",
      "It guarantees positive coverage every time",
      "It can be amplified across your own channels",
      "It contributes to your SERP content shield",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Earned media is credible (independent endorsement), can be amplified, and strengthens your SERP presence. However, it does not guarantee positive coverage — editorial independence means the angle is up to the journalist.",
  },
  {
    type: "multi-select",
    question: "What should a crisis communication team include? (Select all that apply)",
    options: [
      "A designated spokesperson",
      "A social media lead",
      "An office janitor",
      "Legal counsel",
      "An executive sponsor",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "A crisis team needs a spokesperson, social media lead, legal counsel, and executive sponsor. Each role has specific responsibilities during a crisis.",
  },
  {
    type: "multi-select",
    question: "Which properties should be part of your content shield? (Select all that apply)",
    options: [
      "Main website and blog",
      "Social media profiles",
      "Competitor websites",
      "Executive LinkedIn profiles",
      "Third-party industry platform profiles",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Your content shield includes owned properties: main website, blog, social profiles, executive profiles, and profiles on industry platforms. Competitor websites are not part of your shield.",
  },
  {
    type: "ordering",
    question: "Arrange the review generation strategy steps in the correct order.",
    items: [
      "Use negative reviews as improvement opportunities",
      "Make the review process easy with direct links",
      "Identify the optimal moment to ask (after a positive experience)",
      "Set up automated email and SMS review request flows",
    ],
    correctOrder: [2, 3, 1, 0],
    explanation:
      "The review generation process: identify the right moment to ask, set up automated request flows, make it easy with direct links, and use negative feedback to improve.",
  },
  {
    type: "multiple-choice",
    question: "What type of PR content should be amplified across your own channels?",
    options: [
      "Only paid advertisements",
      "Positive earned media coverage from reputable publications",
      "Competitor press releases",
      "Internal meeting notes",
    ],
    correctIndex: 1,
    explanation:
      "When positive media coverage appears in reputable publications, amplify it across your own channels (social media, email, website) to maximize its impact on your reputation.",
  },
  {
    type: "multi-select",
    question: "What are the risks of incentivizing specific star ratings in review requests? (Select all that apply)",
    options: [
      "Violation of review platform policies",
      "Potential review removal or account penalties",
      "Undermining the authenticity and trust of your reviews",
      "Improved SEO rankings",
      "Legal liability under consumer protection laws",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Incentivizing specific ratings violates platform policies, risks penalties and removal, undermines trust, and may violate consumer protection laws. It does not improve SEO rankings.",
  },
  {
    type: "multiple-choice",
    question: "What makes a content shield effective against negative search results?",
    options: [
      "Having more social media followers than competitors",
      "Controlling multiple high-authority properties optimized for your brand name keywords",
      "Spending more on Google Ads",
      "Posting more frequently on social media",
    ],
    correctIndex: 1,
    explanation:
      "A content shield works by filling the first page of branded search results with properties you control, making it mathematically harder for negative content to rank there.",
  },

  // === SECTION 4: Execution & Implementation (12 questions) ===
  {
    type: "multiple-choice",
    question: "When responding to a positive review, what should you include?",
    options: [
      "A generic 'Thank you' only",
      "The reviewer's name, a reference to something specific from their review, and reinforcement of the positive experience",
      "An upsell offer for additional products",
      "A request for them to leave reviews on other platforms",
    ],
    correctIndex: 1,
    explanation:
      "Thank the reviewer by name, reference something specific from their review, and reinforce the positive experience. This shows genuine engagement to future readers.",
  },
  {
    type: "multiple-choice",
    question: "What is the correct approach when responding to a negative review?",
    options: [
      "Argue with the reviewer and defend your brand aggressively",
      "Respond promptly, acknowledge their frustration, apologize, offer a resolution, and move the conversation offline",
      "Delete the review",
      "Ignore it completely",
    ],
    correctIndex: 1,
    explanation:
      "Respond professionally: acknowledge frustration, apologize, offer a specific resolution, and move offline. Never argue or get defensive — other readers are watching how you handle complaints.",
  },
  {
    type: "multiple-choice",
    question: "What are the 'three A's' of crisis response?",
    options: [
      "Analyze, Adapt, Advance",
      "Acknowledge, Apologize, Action",
      "Assess, Address, Archive",
      "Alert, Announce, Affirm",
    ],
    correctIndex: 1,
    explanation:
      "The three A's: Acknowledge the issue quickly, Apologize sincerely if at fault, and commit to Action with specific steps to resolve and prevent recurrence.",
  },
  {
    type: "multiple-choice",
    question: "What should you monitor for in social listening that goes beyond brand mentions?",
    options: [
      "Only your brand name",
      "Brand name, product names, executive names, competitor brands, industry keywords, and sentiment themes",
      "Only hashtags you created",
      "Only your own social media posts",
    ],
    correctIndex: 1,
    explanation:
      "Comprehensive social listening monitors your brand name, product names, executive names, competitors, industry keywords and hashtags, and customer sentiment themes.",
  },
  {
    type: "true-false",
    question: "When responding to negative reviews, it is acceptable to blame the customer if they are wrong.",
    correctAnswer: false,
    explanation:
      "Never argue, blame, or get defensive in review responses. Other readers are watching how you handle complaints, and defensive responses damage trust more than the original complaint.",
  },
  {
    type: "true-false",
    question: "After a crisis passes, a post-mortem should be conducted to improve future crisis response.",
    correctAnswer: true,
    explanation:
      "Post-crisis, conduct a thorough post-mortem analyzing what happened, how you responded, what worked, what did not, and update your crisis plan with these learnings.",
  },
  {
    type: "multi-select",
    question: "What should social listening alerts be configured for? (Select all that apply)",
    options: [
      "Volume spikes in brand mentions",
      "Sudden sentiment drops",
      "Competitor weather patterns",
      "Common misspellings of your brand name",
      "Industry keyword trends",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Social listening alerts should cover mention volume spikes, sentiment drops, brand misspellings, and industry trends. Weather patterns are not a social listening concern.",
  },
  {
    type: "multi-select",
    question: "What should a negative review response include? (Select all that apply)",
    options: [
      "Acknowledgment of their frustration",
      "A sincere apology for the experience",
      "A personal insult toward the reviewer",
      "A specific resolution offer",
      "An invitation to continue the conversation offline",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Negative review responses should acknowledge frustration, apologize sincerely, offer a resolution, and move offline. Personal insults are never appropriate.",
  },
  {
    type: "ordering",
    question: "Put the crisis response steps in the correct order.",
    items: [
      "Conduct post-mortem and update crisis plan",
      "Commit to specific corrective actions",
      "Acknowledge the issue quickly",
      "Apologize sincerely if at fault",
      "Keep stakeholders updated regularly",
    ],
    correctOrder: [2, 3, 1, 4, 0],
    explanation:
      "Crisis response order: acknowledge quickly, apologize if at fault, commit to action, keep stakeholders updated, and after resolution, conduct a post-mortem.",
  },
  {
    type: "multiple-choice",
    question: "How should fake or abusive reviews be handled?",
    options: [
      "Respond aggressively to discredit the reviewer",
      "Flag for policy violations, document evidence, and respond professionally",
      "Create fake positive reviews to counter them",
      "Sue the reviewer immediately",
    ],
    correctIndex: 1,
    explanation:
      "Flag fake reviews for policy violations, document evidence (no purchase record, competitor patterns), and respond professionally. Other readers will recognize inauthenticity.",
  },
  {
    type: "ordering",
    question: "Arrange the steps for handling a fake or abusive review from first action to last.",
    items: [
      "Respond professionally for the benefit of other readers",
      "Document evidence that the review is fake or violates policies",
      "Flag the review for platform policy violation removal",
      "Identify the review as potentially fake or abusive",
    ],
    correctOrder: [3, 1, 0, 2],
    explanation:
      "First identify the review as potentially fake, document evidence (no purchase record, competitor patterns), respond professionally for other readers, and then flag it for removal.",
  },
  {
    type: "multiple-choice",
    question: "What should happen during a crisis when you do not have all the details yet?",
    options: [
      "Wait until you have complete information before saying anything",
      "Acknowledge the issue quickly even with limited details, promising updates as you learn more",
      "Deny everything until forced to respond",
      "Post detailed speculation about what might have happened",
    ],
    correctIndex: 1,
    explanation:
      "Acknowledge the issue quickly even with limited details. Silence is interpreted as indifference. Promise updates as you learn more and follow through on that commitment.",
  },

  // === SECTION 5: Measurement & Optimization (12 questions) ===
  {
    type: "multiple-choice",
    question: "What response rate should best-in-class brands aim for when responding to reviews?",
    options: [
      "25%",
      "50%",
      "Over 90%",
      "100% of negative reviews only",
    ],
    correctIndex: 2,
    explanation:
      "Best-in-class brands respond to over 90% of all reviews (both positive and negative) within 24 hours. Higher response rates correlate with better customer satisfaction.",
  },
  {
    type: "multiple-choice",
    question: "What does NPS (Net Promoter Score) measure?",
    options: [
      "Net profit per sale",
      "Customer loyalty and likelihood to recommend your brand",
      "Number of products sold",
      "Social media post reach",
    ],
    correctIndex: 1,
    explanation:
      "NPS measures customer loyalty by asking how likely customers are to recommend your brand on a scale of 0-10. The score ranges from -100 to +100.",
  },
  {
    type: "multiple-choice",
    question: "What does 'SERP Ownership' measure in reputation management?",
    options: [
      "How much you spend on Google Ads",
      "The number of first-page Google results you control for branded queries",
      "Your Google Analytics account permissions",
      "The number of pages on your website",
    ],
    correctIndex: 1,
    explanation:
      "SERP Ownership measures how many of the first-page Google results for your brand name are properties you control (website, social profiles, press page, etc.).",
  },
  {
    type: "multiple-choice",
    question: "How often should NPS surveys be conducted?",
    options: [
      "Daily",
      "Quarterly, with benchmarking against industry standards",
      "Only once when launching a product",
      "Every five years",
    ],
    correctIndex: 1,
    explanation:
      "NPS surveys should be conducted quarterly, with results compared against industry benchmarks and previous periods to track whether customer loyalty is improving.",
  },
  {
    type: "true-false",
    question: "Faster review response times correlate with higher customer satisfaction and better review platform placement.",
    correctAnswer: true,
    explanation:
      "Research shows faster response times improve customer satisfaction and can positively influence how review platforms algorithmically display and rank your business.",
  },
  {
    type: "true-false",
    question: "Review volume and velocity are not important — only the average star rating matters.",
    correctAnswer: false,
    explanation:
      "Review volume (how many), velocity (how frequently new ones appear), diversity (across platforms), and average rating all matter. A high rating with few reviews is less convincing than a strong rating with hundreds.",
  },
  {
    type: "multi-select",
    question: "Which are key reputation health metrics? (Select all that apply)",
    options: [
      "Average review rating across platforms",
      "Review volume and velocity",
      "Number of marketing team members",
      "Net Promoter Score (NPS)",
      "Sentiment score across channels",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Key reputation metrics include average rating, review volume/velocity, NPS, and sentiment score. Team size is an operational metric, not a reputation health indicator.",
  },
  {
    type: "multi-select",
    question: "What should a reputation management dashboard track? (Select all that apply)",
    options: [
      "Average rating and review volume monthly",
      "Branded SERP results weekly",
      "Social listening alerts daily",
      "Office supply inventory",
      "Competitor review benchmarks",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "A reputation dashboard should track ratings/volume monthly, SERP results weekly, social alerts daily, and competitor benchmarks. Office supplies are not a reputation metric.",
  },
  {
    type: "ordering",
    question: "Arrange the reputation monitoring activities from most frequent to least frequent.",
    items: [
      "Quarterly NPS surveys and benchmarking",
      "Weekly branded SERP monitoring",
      "Monthly rating and volume tracking",
      "Daily social listening alert review",
    ],
    correctOrder: [3, 1, 2, 0],
    explanation:
      "From most to least frequent: daily social listening, weekly SERP monitoring, monthly rating/volume tracking, and quarterly NPS surveys with benchmarking.",
  },
  {
    type: "multiple-choice",
    question: "What is the NPS score range?",
    options: [
      "0 to 100",
      "-100 to +100",
      "1 to 10",
      "0 to 1000",
    ],
    correctIndex: 1,
    explanation:
      "NPS ranges from -100 to +100. Scores above 0 are generally positive, above 50 are excellent, and above 70 are world-class.",
  },
  {
    type: "true-false",
    question: "You should benchmark your reputation metrics against competitors, not just your own historical data.",
    correctAnswer: true,
    explanation:
      "Benchmarking against competitors provides context for your metrics. A 4.2-star rating might seem good, but if competitors average 4.7, you have a competitive disadvantage.",
  },
  {
    type: "ordering",
    question: "Arrange these reputation improvement actions from foundational to advanced.",
    items: [
      "Proactive SERP management and content shield strategy",
      "Responding to all reviews within 24 hours",
      "Implementing automated review generation flows",
      "Setting up brand monitoring and social listening tools",
    ],
    correctOrder: [3, 1, 2, 0],
    explanation:
      "Foundation first: set up monitoring tools, then respond to all reviews promptly, implement automated review generation, and finally build advanced SERP management and content shield strategies.",
  },
];
