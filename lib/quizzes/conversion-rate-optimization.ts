import type { QuizQuestion } from "@/lib/academy-data";

export const conversionRateOptimizationQuiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question: "What does CRO stand for?",
    options: [
      "Customer Retention Optimization",
      "Conversion Rate Optimization",
      "Content Revenue Operations",
      "Click Rate Optimization",
    ],
    correctIndex: 1,
    explanation:
      "CRO stands for Conversion Rate Optimization — the systematic process of increasing the percentage of website visitors who take a desired action.",
  },
  {
    type: "multiple-choice",
    question:
      "A site has 50,000 monthly visitors and a 2% conversion rate. If CRO increases the rate to 3%, how many additional monthly conversions result?",
    options: ["250", "500", "750", "1,000"],
    correctIndex: 1,
    explanation:
      "At 2%, the site produces 1,000 conversions. At 3%, it produces 1,500 conversions — an increase of 500 additional conversions per month without any extra traffic spend.",
  },
  {
    type: "multiple-choice",
    question: "How does CRO differ from most other marketing disciplines?",
    options: [
      "CRO focuses on brand awareness",
      "CRO focuses on getting more value from existing traffic rather than driving more traffic",
      "CRO is only applicable to e-commerce sites",
      "CRO replaces the need for advertising",
    ],
    correctIndex: 1,
    explanation:
      "While most marketing disciplines focus on driving more traffic, CRO focuses on increasing the percentage of existing visitors who convert, amplifying the ROI of every other channel.",
  },
  {
    type: "multiple-choice",
    question: "Why is CRO described as an 'ROI amplifier' for other marketing channels?",
    options: [
      "It increases the cost of advertising",
      "It improves conversion rates so every traffic source produces more results",
      "It eliminates the need for paid advertising",
      "It only works with organic traffic",
    ],
    correctIndex: 1,
    explanation:
      "CRO amplifies ROI because improving conversion rates means every visitor — regardless of source — is more likely to convert. A 50% lift in conversion rate effectively makes all traffic 50% more valuable.",
  },
  {
    type: "true-false",
    question: "CRO is primarily about guessing what design changes will improve conversions.",
    correctAnswer: false,
    explanation:
      "CRO is not about guessing. It is a data-driven discipline that combines analytics, user research, psychology, and rigorous experimentation to systematically improve performance.",
  },
  {
    type: "true-false",
    question:
      "CRO only applies to e-commerce purchase conversions.",
    correctAnswer: false,
    explanation:
      "CRO applies to any desired action — purchases, lead form submissions, newsletter signups, account registrations, CTA clicks, and more. Any measurable goal can be optimized.",
  },
  {
    type: "multiple-choice",
    question:
      "If a site's conversion rate increases from 2% to 3%, what is the relative percentage improvement?",
    options: [
      "1%",
      "33%",
      "50%",
      "100%",
    ],
    correctIndex: 2,
    explanation:
      "Going from 2% to 3% is a 50% relative increase (1 percentage point / 2% baseline = 50%). This means 50% more conversions from the same traffic volume.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are examples of conversions that CRO can optimize? (Select all that apply)",
    options: [
      "Making a purchase",
      "Filling out a lead form",
      "Subscribing to a newsletter",
      "Server uptime percentage",
      "Clicking a call-to-action button",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Purchases, lead forms, newsletter signups, and CTA clicks are all user actions that CRO can optimize. Server uptime is an infrastructure metric, not a conversion.",
  },
  {
    type: "multi-select",
    question:
      "Which disciplines does CRO combine? (Select all that apply)",
    options: [
      "Analytics and data analysis",
      "User research",
      "Psychology and persuasion",
      "Server administration",
      "Experimentation and testing",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "CRO combines analytics, user research, psychology, and experimentation. While page speed matters, server administration is a DevOps concern, not a core CRO discipline.",
  },
  {
    type: "ordering",
    question:
      "Arrange these marketing activities by their focus, from traffic acquisition to conversion optimization.",
    items: [
      "A/B testing landing page headlines",
      "Running Google Ads campaigns",
      "Optimizing form field count",
      "Publishing SEO blog content",
      "Analyzing heatmap data",
    ],
    correctOrder: [1, 3, 4, 0, 2],
    explanation:
      "Google Ads and SEO content drive traffic (acquisition), while heatmap analysis, A/B testing headlines, and form optimization focus on converting that traffic (CRO).",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are signs of a mature CRO program? (Select all that apply)",
    options: [
      "A prioritized test backlog with scored hypotheses",
      "An experiment library documenting all results",
      "Making design changes based on executive opinions",
      "Running tests on high-traffic pages first",
      "Continuous iteration using the CRO methodology cycle",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "A mature CRO program has a scored backlog, documented results, prioritizes high-traffic pages, and follows a continuous cycle. Design changes based on opinion alone indicate immaturity.",
  },
  {
    type: "multiple-choice",
    question: "What is the conversion rate formula?",
    options: [
      "Total visitors divided by conversions",
      "Conversions divided by total visitors, multiplied by 100",
      "Revenue divided by total visitors",
      "Conversions divided by page views",
    ],
    correctIndex: 1,
    explanation:
      "Conversion rate = (Conversions / Total Visitors) x 100. For example, 1,000 conversions from 50,000 visitors = (1,000 / 50,000) x 100 = 2%.",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is the first phase of the CRO methodology cycle?",
    options: [
      "Hypothesis formation",
      "Test design and execution",
      "Research and data collection",
      "Implementation and iteration",
    ],
    correctIndex: 2,
    explanation:
      "The CRO cycle begins with research and data collection — analyzing both quantitative data (GA4, funnel reports) and qualitative data (heatmaps, surveys) to identify where and why users drop off.",
  },
  {
    type: "multiple-choice",
    question:
      "What format should a CRO hypothesis follow?",
    options: [
      "'This page needs to be redesigned'",
      "'If we [change], then [metric] will [improve] because [reason]'",
      "'Users do not like this page'",
      "'We should test a new button color'",
    ],
    correctIndex: 1,
    explanation:
      "A proper CRO hypothesis follows the structure: 'If we [change], then [metric] will [improve] because [reason].' This makes it testable, measurable, and grounded in reasoning.",
  },
  {
    type: "multiple-choice",
    question: "What does ICE stand for in hypothesis prioritization?",
    options: [
      "Insight, Conversion, Engagement",
      "Impact, Confidence, Ease",
      "Interaction, Cost, Effectiveness",
      "Innovation, Clarity, Efficiency",
    ],
    correctIndex: 1,
    explanation:
      "ICE stands for Impact (potential effect on metrics), Confidence (how sure you are), and Ease (how simple to implement). Each is scored 1-10 and averaged to prioritize hypotheses.",
  },
  {
    type: "multiple-choice",
    question: "What is the primary purpose of heatmaps in CRO?",
    options: [
      "To measure page load speed",
      "To show where users click, move their mouse, and how far they scroll",
      "To track revenue per visitor",
      "To test different page variations",
    ],
    correctIndex: 1,
    explanation:
      "Heatmaps provide visual overlays showing where users click (click heatmaps), how they move their mouse (move heatmaps), and how far they scroll (scroll heatmaps), revealing attention patterns.",
  },
  {
    type: "multiple-choice",
    question: "What should you watch for in session recordings?",
    options: [
      "Page load times only",
      "Rage clicks, hesitation, u-turns, and abandonment patterns",
      "Server error codes",
      "Social media mentions",
    ],
    correctIndex: 1,
    explanation:
      "Session recordings reveal behavioral signals like rage clicks (frustrated repeated clicking), hesitation, navigation u-turns, and abandonment patterns that indicate UX problems.",
  },
  {
    type: "multiple-choice",
    question:
      "What type of data do on-site surveys provide?",
    options: [
      "Quantitative analytics data",
      "Server performance metrics",
      "Qualitative feedback about user experience, objections, and satisfaction",
      "A/B test results",
    ],
    correctIndex: 2,
    explanation:
      "On-site surveys capture qualitative feedback directly from users — their experience, objections, confusion points, and satisfaction — providing the 'why' behind behavioral patterns.",
  },
  {
    type: "true-false",
    question:
      "Form analytics can track which specific fields cause the most abandonment.",
    correctAnswer: true,
    explanation:
      "Form analytics tools track field-level interactions, showing which fields users hesitate on, make errors in, or abandon at — enabling targeted optimization of the most problematic fields.",
  },
  {
    type: "true-false",
    question:
      "The CRO cycle should stop once a winning test variation is found.",
    correctAnswer: false,
    explanation:
      "CRO is a continuous cycle. After implementing a winning variation, learnings feed back into the research phase to generate new hypotheses. The cycle never truly ends.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are phases of the CRO methodology? (Select all that apply)",
    options: [
      "Research and data collection",
      "Hypothesis formation",
      "Budget allocation",
      "Test design and execution",
      "Analysis and learning",
      "Implementation and iteration",
    ],
    correctIndices: [0, 1, 3, 4, 5],
    explanation:
      "The five CRO phases are: Research, Hypothesis Formation, Test Design & Execution, Analysis & Learning, and Implementation & Iteration. Budget allocation is a marketing strategy activity.",
  },
  {
    type: "multi-select",
    question:
      "Which behavioral analytics tools help answer 'why' users behave a certain way? (Select all that apply)",
    options: [
      "Heatmaps",
      "Session recordings",
      "Google Ads reports",
      "On-site surveys",
      "Form analytics",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Heatmaps, session recordings, on-site surveys, and form analytics are qualitative/behavioral tools that reveal why users behave as they do. Google Ads reports show campaign performance, not user behavior.",
  },
  {
    type: "ordering",
    question: "Put the five phases of the CRO methodology in the correct order.",
    items: [
      "Analysis and learning",
      "Hypothesis formation",
      "Implementation and iteration",
      "Research and data collection",
      "Test design and execution",
    ],
    correctOrder: [3, 1, 4, 0, 2],
    explanation:
      "The CRO cycle follows: Research & Data Collection, Hypothesis Formation, Test Design & Execution, Analysis & Learning, and Implementation & Iteration.",
  },
  {
    type: "ordering",
    question:
      "Arrange these CRO research methods from quantitative to qualitative.",
    items: [
      "User interviews",
      "GA4 funnel reports",
      "Session recordings",
      "On-site surveys",
      "Click heatmaps",
    ],
    correctOrder: [1, 4, 2, 3, 0],
    explanation:
      "GA4 funnel reports are purely quantitative, heatmaps and recordings blend quantitative and qualitative, surveys provide structured qualitative data, and user interviews are the most qualitative.",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What is the 'bar test' for landing page headlines?",
    options: [
      "Testing whether the headline fits in a navigation bar",
      "Whether a stranger in a noisy bar would understand your value proposition in under 5 seconds",
      "Measuring the headline against a performance bar chart",
      "Testing the headline with a focus group at a bar",
    ],
    correctIndex: 1,
    explanation:
      "The bar test asks: if you read the headline to a stranger in a noisy bar, would they understand what you offer? It tests headline clarity and value proposition communication.",
  },
  {
    type: "multiple-choice",
    question: "What is 'message match' on a landing page?",
    options: [
      "Matching the headline font to the body font",
      "Ensuring the landing page headline and imagery match the ad or link that brought the user",
      "Making all pages on the site look the same",
      "Translating the page into multiple languages",
    ],
    correctIndex: 1,
    explanation:
      "Message match means the landing page headline and imagery must match the ad or link that brought the user. Mismatched messaging creates cognitive dissonance and increases bounce rates.",
  },
  {
    type: "multiple-choice",
    question: "Why should a landing page have a single primary call-to-action?",
    options: [
      "Multiple CTAs increase page load time",
      "Google penalizes pages with multiple CTAs",
      "Multiple competing actions create decision paralysis and reduce conversion rates",
      "A single CTA is easier to design",
    ],
    correctIndex: 2,
    explanation:
      "Multiple competing CTAs create decision paralysis (Hick's Law) — the more choices presented, the harder it becomes to decide, leading to lower conversion rates.",
  },
  {
    type: "multiple-choice",
    question:
      "Which persuasion principle does a limited-time offer leverage?",
    options: [
      "Reciprocity",
      "Anchoring",
      "Scarcity and urgency",
      "Social proof",
    ],
    correctIndex: 2,
    explanation:
      "Limited-time offers leverage scarcity and urgency, triggering fear of missing out (FOMO). This motivates users to act now rather than delaying and potentially never returning.",
  },
  {
    type: "multiple-choice",
    question: "What is the anchoring principle in pricing page design?",
    options: [
      "Always showing the cheapest option first",
      "Presenting a higher-priced option first so subsequent options feel more reasonable",
      "Anchoring the page to the top of search results",
      "Using anchor links for navigation",
    ],
    correctIndex: 1,
    explanation:
      "Anchoring presents a higher-priced option first, making subsequent options feel more reasonable by comparison. This is why many pricing pages show the enterprise tier before the standard tier.",
  },
  {
    type: "true-false",
    question:
      "Using fake scarcity tactics (e.g., fake countdown timers) is a recommended CRO practice.",
    correctAnswer: false,
    explanation:
      "Fake scarcity erodes trust and can damage brand credibility. Scarcity and urgency should only be used honestly when offers are genuinely limited.",
  },
  {
    type: "true-false",
    question:
      "Social proof elements like testimonials and trust badges help reduce perceived risk for visitors.",
    correctAnswer: true,
    explanation:
      "Social proof — testimonials, reviews, case studies, client logos, and trust badges — reduces perceived risk and builds credibility by showing that others have had positive experiences.",
  },
  {
    type: "multi-select",
    question:
      "Which elements are essential for a high-converting landing page? (Select all that apply)",
    options: [
      "Clear headline communicating the value proposition",
      "Message match with the referring ad or link",
      "Multiple competing calls-to-action",
      "Social proof elements",
      "Strong visual hierarchy",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "High-converting pages need clear headlines, message match, social proof, and visual hierarchy. Multiple competing CTAs actually hurt conversion rates by creating decision paralysis.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are established persuasion psychology principles used in CRO? (Select all that apply)",
    options: [
      "Scarcity and urgency",
      "Reciprocity",
      "Loss aversion",
      "Keyword density",
      "Anchoring",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Scarcity, reciprocity, loss aversion, and anchoring are all psychological principles used in CRO. Keyword density is an SEO concept, not a persuasion principle.",
  },
  {
    type: "ordering",
    question:
      "Arrange these landing page elements in the order a visitor typically encounters them (top to bottom).",
    items: [
      "Testimonials and social proof",
      "Primary call-to-action button",
      "Headline and value proposition",
      "Supporting copy and benefits",
    ],
    correctOrder: [2, 3, 0, 1],
    explanation:
      "Visitors first see the headline, then supporting copy/benefits, then social proof that validates claims, and finally the CTA button. This follows the AIDA framework: Attention, Interest, Desire, Action.",
  },
  {
    type: "multi-select",
    question:
      "Which persuasion techniques are most effective for first-time visitors unfamiliar with your brand? (Select all that apply)",
    options: [
      "Clear value proposition headline",
      "Aggressive scarcity countdown timers",
      "Free trial or money-back guarantee to reduce risk",
      "Customer testimonials showing real results",
      "Multiple pop-up offers",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "For first-time visitors, clarity (value proposition), risk reduction (free trial/guarantee), and social proof (testimonials) are most effective. Aggressive scarcity and multiple pop-ups can alienate unfamiliar visitors.",
  },
  {
    type: "multiple-choice",
    question:
      "What does visual hierarchy on a landing page accomplish?",
    options: [
      "It makes the page load faster",
      "It guides the user's eye from headline to supporting copy to CTA using size, color, contrast, and white space",
      "It ensures all elements are the same size",
      "It reduces the amount of content needed",
    ],
    correctIndex: 1,
    explanation:
      "Visual hierarchy uses design principles — size, color, contrast, and white space — to guide the visitor's eye through the page in a deliberate sequence from headline to CTA.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question: "What confidence level is typically required for statistical significance in A/B testing?",
    options: ["80%", "90%", "95%", "99%"],
    correctIndex: 2,
    explanation:
      "A 95% confidence level is the standard threshold for A/B testing. This means there is only a 5% probability that the observed difference is due to random chance.",
  },
  {
    type: "multiple-choice",
    question:
      "What happens if you stop an A/B test early because one variant looks better?",
    options: [
      "You save time and get results faster",
      "The results may be unreliable due to insufficient sample size",
      "The results are more accurate with fewer data points",
      "Nothing — early stopping is best practice",
    ],
    correctIndex: 1,
    explanation:
      "Stopping tests early often leads to false positives. Early trends can reverse as more data is collected. Always wait until the predetermined sample size is reached before declaring a winner.",
  },
  {
    type: "multiple-choice",
    question: "How long should an A/B test typically run at minimum?",
    options: [
      "24 hours",
      "3 days",
      "At least one full business cycle (1-2 weeks)",
      "One month minimum",
    ],
    correctIndex: 2,
    explanation:
      "Tests should run for at least one full business cycle (typically 1-2 weeks) to account for day-of-week and time-of-day variations that can skew results.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the difference between an A/B test and a multivariate test (MVT)?",
    options: [
      "A/B tests are more expensive",
      "A/B tests change one variable per variation; MVTs test multiple changes simultaneously",
      "MVTs are faster to run",
      "There is no difference",
    ],
    correctIndex: 1,
    explanation:
      "In a standard A/B test, you change only one element per variation to isolate its impact. Multivariate tests (MVTs) test multiple changes simultaneously to find optimal combinations.",
  },
  {
    type: "multiple-choice",
    question:
      "Which form optimization technique reduces perceived effort in multi-step forms?",
    options: [
      "Removing all labels",
      "Adding a progress bar indicator",
      "Making all fields required",
      "Using red error messages for empty fields on load",
    ],
    correctIndex: 1,
    explanation:
      "A progress bar sets expectations for how many steps remain, reducing perceived effort. Users are more likely to complete a form when they can see how far along they are.",
  },
  {
    type: "multiple-choice",
    question:
      "What button text is more effective than 'Submit' according to CRO best practices?",
    options: [
      "Click Here",
      "Send",
      "Get My Free Quote",
      "OK",
    ],
    correctIndex: 2,
    explanation:
      "'Get My Free Quote' is action-specific and communicates the value the user receives. Generic labels like 'Submit' or 'Click Here' lack specificity and motivation.",
  },
  {
    type: "true-false",
    question:
      "Every 100ms delay in page load time can reduce conversion rates by up to 7%.",
    correctAnswer: true,
    explanation:
      "Research has shown that even 100ms of additional page load time can reduce conversion rates by up to 7%. Page speed is a critical CRO factor.",
  },
  {
    type: "true-false",
    question:
      "Inline form validation (real-time feedback) is less effective than showing all errors after form submission.",
    correctAnswer: false,
    explanation:
      "Inline validation is significantly more effective. It catches errors as users fill in each field, reducing frustration and preventing the discouraging experience of submitting a form only to see a list of errors.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are valid form optimization techniques? (Select all that apply)",
    options: [
      "Reducing field count to essentials only",
      "Enabling browser autofill",
      "Adding as many fields as possible for data collection",
      "Using inline validation",
      "Showing a progress bar for multi-step forms",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Reducing fields, enabling autofill, inline validation, and progress bars all improve form completion rates. Adding excessive fields increases friction and abandonment.",
  },
  {
    type: "multi-select",
    question:
      "Which UX principles directly improve conversion rates? (Select all that apply)",
    options: [
      "Reducing cognitive load",
      "Ensuring accessibility",
      "Optimizing page speed",
      "Using as many animations as possible",
      "Mobile-first design",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Reducing cognitive load, accessibility, page speed, and mobile-first design all improve conversions. Excessive animations can slow pages and distract users.",
  },
  {
    type: "ordering",
    question: "Put these A/B testing steps in the correct order.",
    items: [
      "Analyze results at statistical significance",
      "Design the test variation",
      "Calculate required sample size",
      "Form a testable hypothesis",
      "Launch the test",
      "Implement the winning variation",
    ],
    correctOrder: [3, 1, 2, 4, 0, 5],
    explanation:
      "Start with a hypothesis, design the variation, calculate sample size, launch, wait for significance to analyze, then implement the winner.",
  },
  {
    type: "ordering",
    question:
      "Rank these form optimization changes from typically highest to lowest impact on completion rates.",
    items: [
      "Changing the submit button color",
      "Reducing the number of required fields",
      "Adding inline validation",
      "Writing a descriptive CTA button label",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Reducing fields has the highest impact (each removed field increases completion), followed by inline validation, then descriptive CTAs, and finally button color (which typically has the smallest effect).",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What is revenue per visitor (RPV) and why is it better than conversion rate alone?",
    options: [
      "RPV is total visits divided by revenue; it measures traffic quality",
      "RPV is total revenue divided by total visitors; it accounts for average order value changes",
      "RPV is the same as conversion rate but expressed in dollars",
      "RPV only applies to subscription businesses",
    ],
    correctIndex: 1,
    explanation:
      "RPV (Revenue / Visitors) is better than conversion rate alone because it also captures changes in average order value. A test could lower conversion rate but increase RPV through higher-value purchases.",
  },
  {
    type: "multiple-choice",
    question:
      "What are micro-conversions and why should you track them?",
    options: [
      "Very small purchases; they help track low-value customers",
      "Intermediate steps like add-to-cart or start-checkout; they identify exactly where funnels leak",
      "Conversions on mobile devices; they measure mobile performance",
      "Social media interactions; they measure brand engagement",
    ],
    correctIndex: 1,
    explanation:
      "Micro-conversions are intermediate steps (add to cart, start checkout, newsletter signup) that help identify exactly where the funnel leaks and where optimization efforts should focus.",
  },
  {
    type: "multiple-choice",
    question: "What does 'time to conversion' measure?",
    options: [
      "How long a web page takes to load",
      "How long from first visit to conversion",
      "The duration of an A/B test",
      "Time between purchasing and receiving a product",
    ],
    correctIndex: 1,
    explanation:
      "Time to conversion measures how long it takes from a user's first visit to completing a conversion. Shorter times generally indicate less friction in the conversion process.",
  },
  {
    type: "multiple-choice",
    question:
      "When building a testing roadmap, which pages should you prioritize?",
    options: [
      "Pages with the most design flaws",
      "Recently redesigned pages",
      "High-traffic, high-value pages for faster and bigger results",
      "Pages with the least traffic to test safely",
    ],
    correctIndex: 2,
    explanation:
      "High-traffic, high-value pages produce results fastest. A page with 100,000 monthly visitors reaches statistical significance 100x faster than a page with 1,000 visitors, and improvements impact more users.",
  },
  {
    type: "multiple-choice",
    question: "How many A/B tests should a mature CRO program aim to run per month?",
    options: ["1 at most", "2-4", "10-15", "As many as possible simultaneously"],
    correctIndex: 1,
    explanation:
      "A sustainable CRO program should aim for 2-4 tests per month, ensuring each test has adequate traffic and time to reach statistical significance while maintaining a steady pace of learning.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of an experiment library?",
    options: [
      "A collection of testing tools and software",
      "A shared repository documenting every test result so institutional knowledge accumulates",
      "A library of pre-built test templates",
      "A database of competitor experiments",
    ],
    correctIndex: 1,
    explanation:
      "An experiment library is a shared document or database where every test result — wins and losses — is recorded. This builds institutional knowledge and prevents repeating past experiments.",
  },
  {
    type: "true-false",
    question:
      "Funnel drop-off rate should be compared across devices, traffic sources, and user segments for meaningful insights.",
    correctAnswer: true,
    explanation:
      "Comparing drop-off rates across segments reveals important differences. Mobile users may abandon at different steps than desktop users, and paid traffic may behave differently from organic traffic.",
  },
  {
    type: "true-false",
    question:
      "A/B test losses provide no value and should not be documented.",
    correctAnswer: false,
    explanation:
      "Test losses are just as valuable as wins. They reveal what does NOT work, prevent future teams from repeating the same hypotheses, and deepen understanding of user behavior.",
  },
  {
    type: "multi-select",
    question:
      "Which CRO metrics should you track beyond overall conversion rate? (Select all that apply)",
    options: [
      "Micro-conversion rates",
      "Revenue per visitor (RPV)",
      "Time to conversion",
      "Domain authority",
      "Funnel drop-off rate",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Micro-conversion rates, RPV, time to conversion, and funnel drop-off rate all provide deeper CRO insights. Domain authority is an SEO metric, not a CRO metric.",
  },
  {
    type: "multi-select",
    question:
      "What should be included in each entry of an experiment library? (Select all that apply)",
    options: [
      "The hypothesis tested",
      "Test results (win, loss, or inconclusive)",
      "The developer's name who built it",
      "Key learnings and insights",
      "Screenshot of the variations",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Each experiment entry should include the hypothesis, results, learnings, and visual documentation. The developer's identity is not critical to institutional knowledge.",
  },
  {
    type: "ordering",
    question:
      "Put these CRO metrics in order from broadest to most granular.",
    items: [
      "Individual field drop-off rate in a form",
      "Overall site conversion rate",
      "Funnel step drop-off rate",
      "Page-level conversion rate",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "Overall site rate is the broadest view, then page-level breaks it down by page, funnel step shows within-funnel behavior, and field-level drop-off is the most granular.",
  },
  {
    type: "ordering",
    question:
      "Arrange these testing roadmap activities in the correct order.",
    items: [
      "Document results in the experiment library",
      "Score hypotheses using ICE or PIE framework",
      "Run prioritized tests on high-traffic pages",
      "Generate hypotheses from research data",
      "Feed learnings into next research cycle",
    ],
    correctOrder: [3, 1, 2, 0, 4],
    explanation:
      "Generate hypotheses from research, score and prioritize them, run tests on high-traffic pages, document results, and feed learnings back into the next research cycle.",
  },
];
