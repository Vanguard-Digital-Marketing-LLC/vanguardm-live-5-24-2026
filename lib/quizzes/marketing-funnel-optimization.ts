import type { QuizQuestion } from "@/lib/academy-data";

export const marketingFunnelOptimizationQuiz: QuizQuestion[] = [
  // === SECTION 1: Introduction & Overview (12 questions) ===
  {
    type: "multiple-choice",
    question: "What does the traditional marketing funnel model?",
    options: [
      "The journey from employee to manager",
      "The journey from prospect awareness to purchase",
      "The journey from product idea to market launch",
      "The journey from social media post to viral content",
    ],
    correctIndex: 1,
    explanation:
      "The marketing funnel models the journey a potential customer takes from first becoming aware of your brand through to making a purchase.",
  },
  {
    type: "multiple-choice",
    question: "What distinguishes the flywheel model from the traditional funnel?",
    options: [
      "The flywheel only applies to B2B businesses",
      "The flywheel is linear while the funnel is circular",
      "The flywheel places the customer at the center and recognizes that happy customers fuel new growth",
      "The flywheel ignores customer retention",
    ],
    correctIndex: 2,
    explanation:
      "The flywheel model is circular, placing the customer at the center. It recognizes that happy customers drive referrals and word-of-mouth, reducing acquisition costs over time.",
  },
  {
    type: "multiple-choice",
    question: "Why is the modern buyer journey considered 'messier' than the traditional funnel?",
    options: [
      "Buyers only use one device now",
      "Buyers research across multiple devices, revisit stages, and are influenced by social proof at every step",
      "Buyers always follow a linear path",
      "Buyers no longer use search engines",
    ],
    correctIndex: 1,
    explanation:
      "Modern buyers research across multiple devices, revisit funnel stages, and are influenced by peer reviews and social proof at every step, making the journey non-linear.",
  },
  {
    type: "true-false",
    question: "The best marketing strategies use both funnel and flywheel models together.",
    correctAnswer: true,
    explanation:
      "The funnel is excellent for diagnosing and optimizing specific stages, while the flywheel ensures post-sale momentum. Using both gives you the most complete view.",
  },
  {
    type: "true-false",
    question: "The marketing funnel ends at the point of purchase.",
    correctAnswer: false,
    explanation:
      "Modern funnel models extend beyond purchase to include retention, loyalty, and advocacy stages. Post-purchase experiences determine whether customers become repeat buyers and brand advocates.",
  },
  {
    type: "multi-select",
    question: "Which stages are part of the traditional marketing funnel? (Select all that apply)",
    options: [
      "Awareness",
      "Interest",
      "Manufacturing",
      "Consideration",
      "Conversion",
      "Shipping",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "The traditional funnel stages are Awareness, Interest, Consideration, and Conversion. Manufacturing and Shipping are supply chain processes, not funnel stages.",
  },
  {
    type: "multi-select",
    question: "What does the flywheel model recognize about customers? (Select all that apply)",
    options: [
      "Happy customers fuel new growth through referrals",
      "Customers are unimportant after purchase",
      "Word-of-mouth reduces acquisition costs",
      "Customer delight drives the growth cycle",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "The flywheel model recognizes that happy customers drive referrals, reduce acquisition costs through word-of-mouth, and that customer delight powers the continuous growth cycle.",
  },
  {
    type: "ordering",
    question: "Put the traditional funnel stages in order from top to bottom.",
    items: [
      "Conversion",
      "Consideration",
      "Interest",
      "Awareness",
    ],
    correctOrder: [3, 2, 1, 0],
    explanation:
      "The funnel flows from Awareness (top) to Interest, then Consideration, and finally Conversion (bottom).",
  },
  {
    type: "multiple-choice",
    question: "What is the primary purpose of funnel optimization?",
    options: [
      "To make the funnel as wide as possible at every stage",
      "To identify where prospects drop off and improve those stages",
      "To eliminate all stages except conversion",
      "To spend more on advertising",
    ],
    correctIndex: 1,
    explanation:
      "Funnel optimization diagnoses where prospects are dropping off and focuses resources on the highest-impact improvements at those specific stages.",
  },
  {
    type: "multiple-choice",
    question: "What role do peer reviews and social proof play in the modern funnel?",
    options: [
      "They only matter at the bottom of the funnel",
      "They influence buyers at every stage of the journey",
      "They are irrelevant to purchase decisions",
      "They only apply to B2C purchases",
    ],
    correctIndex: 1,
    explanation:
      "In the modern buyer journey, peer reviews and social proof influence purchasing decisions at every stage, from initial awareness through post-purchase advocacy.",
  },
  {
    type: "multiple-choice",
    question: "How does funnel optimization help with resource allocation?",
    options: [
      "By spreading budget equally across all stages",
      "By identifying the biggest drop-off stages so resources focus on highest-impact improvements",
      "By eliminating the need for marketing spend",
      "By focusing all resources on the top of the funnel only",
    ],
    correctIndex: 1,
    explanation:
      "Funnel optimization identifies which stages have the biggest drop-offs, allowing you to focus resources on the highest-impact improvements rather than spreading efforts thin.",
  },
  {
    type: "ordering",
    question: "Arrange the funnel model evolution from oldest to newest concept.",
    items: [
      "Flywheel model (customer-centric, circular)",
      "AIDA model (Attention, Interest, Desire, Action)",
      "Modern full-lifecycle funnel (includes retention)",
      "Basic sales funnel (awareness to purchase)",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "The evolution progresses from AIDA (earliest framework), to the basic sales funnel, to the modern full-lifecycle funnel, and most recently to the flywheel model.",
  },

  // === SECTION 2: Core Concepts (12 questions) ===
  {
    type: "multiple-choice",
    question: "What does TOFU stand for in funnel marketing?",
    options: [
      "Total Outreach for Unified Funnels",
      "Top of Funnel",
      "Tracking Objectives for User Flow",
      "Testing Options for User Feedback",
    ],
    correctIndex: 1,
    explanation:
      "TOFU stands for Top of Funnel, which is the awareness stage where you attract the widest relevant audience.",
  },
  {
    type: "multiple-choice",
    question: "What is the primary goal at MOFU (Middle of Funnel)?",
    options: [
      "Drive immediate purchases",
      "Build trust and position your offering as the best solution",
      "Generate as many impressions as possible",
      "Reduce marketing spend",
    ],
    correctIndex: 1,
    explanation:
      "At MOFU, prospects are evaluating solutions. Your job is to build trust, provide value, and position your offering as the best option through case studies, webinars, and detailed content.",
  },
  {
    type: "multiple-choice",
    question: "Which content type is most appropriate for BOFU (Bottom of Funnel)?",
    options: [
      "General blog posts",
      "Inspirational social media content",
      "Free trials, consultations, and testimonials",
      "Industry news roundups",
    ],
    correctIndex: 2,
    explanation:
      "BOFU content should remove friction and address final objections. Free trials, consultations, testimonials, guarantees, and limited-time offers are ideal for converting ready-to-buy prospects.",
  },
  {
    type: "multiple-choice",
    question: "How is Customer Lifetime Value (CLV) calculated?",
    options: [
      "Total Revenue / Total Customers",
      "Average Order Value x Purchase Frequency x Customer Lifespan",
      "Monthly Revenue x 12",
      "Acquisition Cost x Conversion Rate",
    ],
    correctIndex: 1,
    explanation:
      "CLV is calculated as Average Order Value multiplied by Purchase Frequency multiplied by Customer Lifespan. This gives you the total revenue a customer generates over their entire relationship.",
  },
  {
    type: "true-false",
    question: "Webinars are considered a MOFU content type.",
    correctAnswer: true,
    explanation:
      "Webinars are ideal MOFU content because they help prospects evaluate solutions in depth, building trust and demonstrating expertise during the consideration phase.",
  },
  {
    type: "true-false",
    question: "It costs the same to acquire a new customer as it does to retain an existing one.",
    correctAnswer: false,
    explanation:
      "It costs five to seven times more to acquire a new customer than to retain an existing one, which is why retention should be planned from day one.",
  },
  {
    type: "multi-select",
    question: "Which of the following are key metrics for the TOFU (awareness) stage? (Select all that apply)",
    options: [
      "Impressions",
      "Conversion rate",
      "Website traffic",
      "Social engagement",
      "Cost per acquisition",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "TOFU metrics include impressions, reach, website traffic, social engagement, and brand search volume. Conversion rate and cost per acquisition are BOFU metrics.",
  },
  {
    type: "multi-select",
    question: "What should post-purchase retention strategies include? (Select all that apply)",
    options: [
      "Onboarding sequences",
      "Loyalty programs",
      "Ignoring customer feedback",
      "Referral incentives",
      "Customer communities",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Effective retention strategies include onboarding sequences, loyalty programs, referral incentives, and customer communities. Ignoring feedback is harmful to retention.",
  },
  {
    type: "ordering",
    question: "Arrange the funnel stages from widest audience to most qualified.",
    items: [
      "BOFU (Conversion)",
      "Post-Funnel (Retention & Advocacy)",
      "MOFU (Consideration)",
      "TOFU (Awareness)",
    ],
    correctOrder: [3, 2, 0, 1],
    explanation:
      "The funnel narrows from TOFU (widest audience) to MOFU (evaluating prospects), then BOFU (ready to buy), and finally Post-Funnel (existing customers in retention and advocacy).",
  },
  {
    type: "multiple-choice",
    question: "What is the typical overall conversion rate for e-commerce websites?",
    options: [
      "15-25%",
      "10-15%",
      "1-3%",
      "50-60%",
    ],
    correctIndex: 2,
    explanation:
      "The typical overall conversion rate (visitors to customers) for e-commerce is 1-3%, while SaaS companies typically see 2-5%.",
  },
  {
    type: "multiple-choice",
    question: "Why does a 10% increase in CLV dramatically improve profitability?",
    options: [
      "Because it reduces the need for any marketing",
      "Because acquisition costs are already paid, so additional revenue flows directly to profit",
      "Because CLV is not a real metric",
      "Because it doubles the number of customers",
    ],
    correctIndex: 1,
    explanation:
      "Since you have already invested in acquiring the customer, increasing their lifetime value through retention and repeat purchases flows directly to profit without additional acquisition cost.",
  },
  {
    type: "multiple-choice",
    question: "Which MOFU content type helps prospects compare your solution to alternatives?",
    options: [
      "Entertaining TikTok videos",
      "Comparison guides",
      "General industry blog posts",
      "Press releases",
    ],
    correctIndex: 1,
    explanation:
      "Comparison guides are ideal MOFU content because they help prospects actively evaluating solutions understand how your offering compares to alternatives.",
  },

  // === SECTION 3: Strategy & Planning (12 questions) ===
  {
    type: "multiple-choice",
    question: "What does the PIE framework stand for in CRO?",
    options: [
      "Price, Interest, Engagement",
      "Potential, Importance, Ease",
      "Performance, Insight, Execution",
      "Planning, Implementation, Evaluation",
    ],
    correctIndex: 1,
    explanation:
      "PIE stands for Potential (how much improvement is possible), Importance (how valuable is the page/element), and Ease (how easy is it to implement the test).",
  },
  {
    type: "multiple-choice",
    question: "What is the recommended approach for identifying funnel bottlenecks?",
    options: [
      "Guess based on intuition",
      "Map the current funnel with real data and measure drop-offs at each stage",
      "Ask competitors what their bottlenecks are",
      "Only look at the final conversion rate",
    ],
    correctIndex: 1,
    explanation:
      "Start by mapping your current funnel with real data from GA4, heatmaps, and CRM reports. Measure how many visitors reach each stage and identify the biggest drop-offs.",
  },
  {
    type: "multiple-choice",
    question: "A typical email nurture sequence should start with what type of content?",
    options: [
      "A hard sales pitch with pricing",
      "A welcome email followed by educational content",
      "A survey asking for personal information",
      "A discount coupon code",
    ],
    correctIndex: 1,
    explanation:
      "A typical nurture sequence begins with a welcome email (day 0) followed by educational content (day 2), gradually building trust before introducing sales-oriented content.",
  },
  {
    type: "multiple-choice",
    question: "Why is a 5% improvement in a high-drop-off stage often more valuable than a 20% improvement elsewhere?",
    options: [
      "High-drop-off stages are easier to optimize",
      "More absolute visitors are affected at high-drop-off stages",
      "Small improvements are always better than large ones",
      "High-drop-off stages cost less to optimize",
    ],
    correctIndex: 1,
    explanation:
      "A high-drop-off stage has more absolute visitors passing through, so even a small percentage improvement can convert significantly more people than a large improvement at a low-volume stage.",
  },
  {
    type: "true-false",
    question: "Retention should be planned from day one, not treated as an afterthought.",
    correctAnswer: true,
    explanation:
      "Retention should be planned from the beginning of your strategy. Building onboarding sequences, re-engagement campaigns, and loyalty programs from day one maximizes customer lifetime value.",
  },
  {
    type: "true-false",
    question: "Email nurture sequences should send the same generic content to all leads regardless of behavior.",
    correctAnswer: false,
    explanation:
      "Nurture sequences should be personalized based on behavior — which pages prospects visited, which emails they opened, and what content they downloaded.",
  },
  {
    type: "multi-select",
    question: "Which pages should be prioritized for CRO testing? (Select all that apply)",
    options: [
      "Pricing pages",
      "Product pages",
      "Legal disclaimer pages",
      "Checkout flows",
      "Landing pages",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "CRO should focus on high-traffic, high-intent pages: pricing pages, product pages, checkout flows, and landing pages. Legal disclaimer pages are low-intent and rarely worth testing.",
  },
  {
    type: "multi-select",
    question: "Which tools can be used for funnel mapping and bottleneck analysis? (Select all that apply)",
    options: [
      "Google Analytics 4 funnel exploration",
      "Heatmap tools (Hotjar, Microsoft Clarity)",
      "CRM stage reports",
      "Social media schedulers",
      "Word processing software",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Funnel mapping uses GA4 funnel exploration, heatmaps (Hotjar, Microsoft Clarity), and CRM stage reports to visualize the customer journey and identify drop-off points.",
  },
  {
    type: "ordering",
    question: "Arrange the email nurture sequence in the correct order.",
    items: [
      "Offer or CTA email",
      "Social proof / case study",
      "Welcome email",
      "Educational content",
      "Product comparison or demo",
    ],
    correctOrder: [2, 3, 1, 4, 0],
    explanation:
      "The nurture sequence progresses: welcome email (day 0), educational content (day 2), social proof/case study (day 5), product comparison or demo (day 8), and finally offer or CTA (day 12).",
  },
  {
    type: "multiple-choice",
    question: "What is the primary purpose of NPS surveys in retention planning?",
    options: [
      "To generate content for social media",
      "To collect customer feedback and measure loyalty",
      "To increase website traffic",
      "To replace email marketing",
    ],
    correctIndex: 1,
    explanation:
      "Net Promoter Score (NPS) surveys collect customer feedback and measure loyalty by asking how likely customers are to recommend your brand, providing actionable retention insights.",
  },
  {
    type: "multi-select",
    question: "What should re-engagement campaigns for inactive users include? (Select all that apply)",
    options: [
      "Incentives such as special discounts",
      "New product or content announcements",
      "Threatening to close their account",
      "Reminders of the value they previously received",
      "Personalized recommendations based on past behavior",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Re-engagement campaigns should include incentives, new announcements, value reminders, and personalized recommendations. Threatening account closure is counterproductive.",
  },
  {
    type: "ordering",
    question: "Arrange the CRO process steps in the correct order.",
    items: [
      "Analysis of results",
      "Prioritization using PIE framework",
      "Hypothesis generation",
      "A/B test execution",
    ],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "The CRO process follows: generate hypotheses about what to test, prioritize using the PIE framework, execute the A/B test, and then analyze the results.",
  },

  // === SECTION 4: Execution & Implementation (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is the most important rule when designing a landing page?",
    options: [
      "Include as many links and options as possible",
      "Have one clear objective and a single prominent call-to-action",
      "Use the longest possible copy",
      "Avoid all images and visual elements",
    ],
    correctIndex: 1,
    explanation:
      "Every landing page should have one clear objective and a single prominent CTA. Remove navigation menus and competing links to keep visitors focused on the desired action.",
  },
  {
    type: "multiple-choice",
    question: "When running an A/B test, how many variables should you change at once?",
    options: [
      "As many as possible for efficiency",
      "Three to five",
      "One",
      "The number does not matter",
    ],
    correctIndex: 2,
    explanation:
      "Change only one variable at a time in an A/B test. This ensures you can attribute any performance difference to that specific change rather than wondering which change caused the result.",
  },
  {
    type: "multiple-choice",
    question: "What confidence level should you typically reach before declaring an A/B test winner?",
    options: [
      "50%",
      "75%",
      "95%",
      "100%",
    ],
    correctIndex: 2,
    explanation:
      "Tests should run until they reach 95% statistical significance. Declaring winners before this threshold leads to false positives and unreliable results.",
  },
  {
    type: "multiple-choice",
    question: "What is lead scoring used for in marketing automation?",
    options: [
      "Grading the quality of your content",
      "Automatically qualifying leads and routing them to sales when they reach a threshold",
      "Scoring your social media posts",
      "Rating your competitors",
    ],
    correctIndex: 1,
    explanation:
      "Lead scoring assigns numerical values to leads based on their behavior and demographics, automatically qualifying them and routing them to sales when they reach a predetermined threshold.",
  },
  {
    type: "true-false",
    question: "You should peek at A/B test results early and call winners if the data looks promising.",
    correctAnswer: false,
    explanation:
      "Peeking at results and calling winners early leads to false positives. Let the test run until it reaches the pre-determined sample size and statistical significance level.",
  },
  {
    type: "true-false",
    question: "Marketing automation can trigger personalized messages based on user behavior.",
    correctAnswer: true,
    explanation:
      "Marketing automation platforms trigger personalized messages based on behavior such as page visits, email opens, content downloads, and cart abandonment.",
  },
  {
    type: "multi-select",
    question: "Which elements should a landing page include for maximum conversion? (Select all that apply)",
    options: [
      "A compelling headline",
      "Multiple navigation menus",
      "Social proof (testimonials, logos, stats)",
      "Benefit-driven copy",
      "A single prominent call-to-action",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "High-converting landing pages include a compelling headline, social proof, benefit-driven copy, and a single prominent CTA. Navigation menus should be removed to reduce distractions.",
  },
  {
    type: "multi-select",
    question: "Which actions can be automated with marketing automation platforms? (Select all that apply)",
    options: [
      "Cart abandonment email sequences",
      "Lead scoring and qualification",
      "Post-purchase follow-up sequences",
      "In-person sales meetings",
      "Re-engagement campaigns for inactive users",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Marketing automation can handle cart abandonment emails, lead scoring, post-purchase sequences, and re-engagement campaigns. In-person sales meetings require human interaction.",
  },
  {
    type: "ordering",
    question: "Put the A/B testing process in the correct order.",
    items: [
      "Implement winner and iterate",
      "Run test until statistical significance",
      "Form a clear hypothesis",
      "Design test with one variable change",
    ],
    correctOrder: [2, 3, 1, 0],
    explanation:
      "The A/B testing process follows: form a hypothesis, design the test with one variable, run it until significance, and then implement the winner and move to the next test.",
  },
  {
    type: "multiple-choice",
    question: "What traffic split is recommended for a standard A/B test?",
    options: [
      "90/10",
      "70/30",
      "50/50",
      "80/20",
    ],
    correctIndex: 2,
    explanation:
      "A 50/50 traffic split is standard for A/B tests. It ensures both variants receive equal exposure, leading to faster and more reliable results.",
  },
  {
    type: "true-false",
    question: "Landing pages should include navigation menus to give visitors more options.",
    correctAnswer: false,
    explanation:
      "Navigation menus and competing links should be removed from landing pages. They distract visitors from the single desired action and reduce conversion rates.",
  },
  {
    type: "multiple-choice",
    question: "Which marketing automation platform is commonly used for e-commerce email flows?",
    options: [
      "AutoCAD",
      "Klaviyo",
      "GitHub",
      "Figma",
    ],
    correctIndex: 1,
    explanation:
      "Klaviyo is a marketing automation platform specifically designed for e-commerce, offering advanced email flows, segmentation, and integration with e-commerce platforms.",
  },

  // === SECTION 5: Measurement & Optimization (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is a healthy CLV:CAC ratio target?",
    options: [
      "1:1 or higher",
      "3:1 or higher",
      "0.5:1",
      "10:1 minimum",
    ],
    correctIndex: 1,
    explanation:
      "Healthy businesses target a CLV:CAC ratio of 3:1 or higher, meaning each customer generates at least three times more revenue than the cost to acquire them.",
  },
  {
    type: "multiple-choice",
    question: "What does cohort analysis do?",
    options: [
      "Compares your brand to competitors",
      "Groups customers by acquisition date or behavior and tracks performance over time",
      "Measures your website's loading speed",
      "Counts total page views per month",
    ],
    correctIndex: 1,
    explanation:
      "Cohort analysis groups customers by their acquisition date or behavior and tracks how they perform over time, revealing whether retention is improving and which channels produce the best long-term customers.",
  },
  {
    type: "multiple-choice",
    question: "What is the first step in the continuous optimization loop?",
    options: [
      "Scale successful experiments",
      "Analyze the funnel stage with the biggest drop-off",
      "Run an A/B test",
      "Implement a new landing page",
    ],
    correctIndex: 1,
    explanation:
      "The optimization loop begins by analyzing data to identify the funnel stage with the biggest drop-off, then forming a hypothesis about why prospects leave.",
  },
  {
    type: "multiple-choice",
    question: "Which metric measures the percentage of people moving from one funnel stage to the next?",
    options: [
      "Overall conversion rate",
      "Stage conversion rate",
      "Bounce rate",
      "Customer lifetime value",
    ],
    correctIndex: 1,
    explanation:
      "Stage conversion rate measures the percentage of people who successfully move from one funnel stage to the next, helping identify specific bottlenecks.",
  },
  {
    type: "multi-select",
    question: "What insights can cohort analysis grouped by acquisition channel reveal? (Select all that apply)",
    options: [
      "Which channels bring in customers with the highest retention",
      "Which channels produce the highest CLV",
      "The exact ROI of each social media post",
      "Whether retention rates are improving over time",
      "How product changes impact long-term customer behavior",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Cohort analysis by acquisition channel reveals retention rates, CLV by source, retention trends, and product change impacts. It cannot attribute ROI to individual social posts.",
  },
  {
    type: "true-false",
    question: "Cost per acquisition (CPA) is calculated by dividing total customers by total marketing spend.",
    correctAnswer: false,
    explanation:
      "CPA is calculated by dividing total marketing spend by the number of new customers acquired, not the other way around.",
  },
  {
    type: "multi-select",
    question: "Which metrics are essential for funnel analytics? (Select all that apply)",
    options: [
      "Stage conversion rates",
      "Social media follower count",
      "Cost per acquisition (CPA)",
      "CLV:CAC ratio",
      "Number of marketing team members",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Essential funnel analytics metrics include stage conversion rates, CPA, and CLV:CAC ratio. Follower count and team size are not funnel performance metrics.",
  },
  {
    type: "multi-select",
    question: "What can cohort analysis reveal? (Select all that apply)",
    options: [
      "Whether retention is improving over time",
      "Your competitor's acquisition costs",
      "Which channels produce the best long-term customers",
      "Impact of product changes on CLV",
      "The optimal posting time on social media",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Cohort analysis reveals retention trends, which channels produce the best customers, and how product or experience changes impact CLV. It does not reveal competitor costs or optimal social posting times.",
  },
  {
    type: "ordering",
    question: "Arrange the continuous optimization loop steps in the correct order.",
    items: [
      "Test — run an A/B test or intervention",
      "Scale — roll out winners and move to next bottleneck",
      "Hypothesize — form a testable theory",
      "Analyze — identify the biggest drop-off",
      "Measure — track impact on conversion rate and CLV",
    ],
    correctOrder: [3, 2, 0, 4, 1],
    explanation:
      "The loop follows: Analyze (find the biggest drop-off), Hypothesize (form a theory), Test (run an experiment), Measure (track impact), Scale (roll out winners).",
  },
  {
    type: "multiple-choice",
    question: "What is the typical SaaS conversion rate from visitor to customer?",
    options: [
      "15-25%",
      "2-5%",
      "50-70%",
      "0.01-0.1%",
    ],
    correctIndex: 1,
    explanation:
      "SaaS companies typically see overall conversion rates of 2-5% from visitor to customer, while e-commerce averages 1-3%.",
  },
  {
    type: "multiple-choice",
    question: "Why is CLV considered more important than individual transaction revenue?",
    options: [
      "CLV is easier to calculate",
      "CLV captures the full value of a customer relationship over time",
      "Individual transactions are not measurable",
      "CLV does not require any data",
    ],
    correctIndex: 1,
    explanation:
      "CLV captures the total revenue a customer generates over their entire relationship, providing a more accurate picture of customer value than a single transaction.",
  },
  {
    type: "ordering",
    question: "Rank funnel metrics from earliest stage measurement to latest.",
    items: [
      "CLV and repeat purchase rate",
      "Stage conversion rates (TOFU to MOFU)",
      "Cost per acquisition",
      "Impressions and reach",
    ],
    correctOrder: [3, 1, 2, 0],
    explanation:
      "Metrics progress through the funnel: impressions and reach (awareness), stage conversion rates (mid-funnel), cost per acquisition (conversion), and CLV with repeat purchase rate (retention).",
  },
];
