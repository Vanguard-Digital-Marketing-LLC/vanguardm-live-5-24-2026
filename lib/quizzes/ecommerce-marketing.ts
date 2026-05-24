import type { QuizQuestion } from "@/lib/academy-data";

export const ecommerceMarketingQuiz: QuizQuestion[] = [
  // === SECTION 1: Introduction & Overview (12 questions) ===
  {
    type: "multiple-choice",
    question: "What distinguishes e-commerce marketing from lead-generation marketing?",
    options: [
      "E-commerce marketing does not use digital channels",
      "E-commerce operates on a direct transaction model where every visitor is a potential buyer",
      "Lead-generation marketing generates more revenue",
      "E-commerce marketing only uses email",
    ],
    correctIndex: 1,
    explanation:
      "E-commerce operates on a direct transaction model — every visitor is a potential buyer and every optimization can be measured directly in revenue, unlike lead-gen where the goal is a form fill or call.",
  },
  {
    type: "multiple-choice",
    question: "What does AOV stand for?",
    options: [
      "Annual Online Volume",
      "Average Order Value",
      "Audience Optimization Variable",
      "Automated Order Verification",
    ],
    correctIndex: 1,
    explanation:
      "AOV stands for Average Order Value — the average revenue generated per transaction in your e-commerce store.",
  },
  {
    type: "multiple-choice",
    question: "What does ROAS stand for?",
    options: [
      "Revenue Over All Sales",
      "Return on Ad Spend",
      "Rate of Audience Segments",
      "Reach of Advertising Strategy",
    ],
    correctIndex: 1,
    explanation:
      "ROAS stands for Return on Ad Spend — the revenue generated for every dollar invested in advertising. A 4x ROAS means $4 in revenue for every $1 spent.",
  },
  {
    type: "true-false",
    question: "There are over 26 million online stores worldwide.",
    correctAnswer: true,
    explanation:
      "The e-commerce landscape is fiercely competitive with over 26 million online stores worldwide, making excellence across all areas of marketing essential.",
  },
  {
    type: "true-false",
    question: "E-commerce marketing fundamentals differ significantly between Shopify, Amazon, and custom platforms.",
    correctAnswer: false,
    explanation:
      "Regardless of the platform — Shopify, Amazon, or custom headless commerce — the fundamentals are the same: right product, right customer, right time, frictionless experience.",
  },
  {
    type: "multi-select",
    question: "Which are essential e-commerce metrics to track? (Select all that apply)",
    options: [
      "Average Order Value (AOV)",
      "Customer Lifetime Value (CLTV)",
      "Number of office employees",
      "Return on Ad Spend (ROAS)",
      "Cart Abandonment Rate",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "The four essential e-commerce metrics are AOV, CLTV, ROAS, and Cart Abandonment Rate. Number of employees is not an e-commerce performance metric.",
  },
  {
    type: "multi-select",
    question: "What factors determine e-commerce success? (Select all that apply)",
    options: [
      "Product presentation quality",
      "Pricing strategy",
      "Office location",
      "Customer experience",
      "Retention programs",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "E-commerce success depends on product presentation, pricing strategy, customer experience, and retention. Office location is irrelevant for online businesses.",
  },
  {
    type: "ordering",
    question: "Arrange the e-commerce customer journey from first interaction to loyalty.",
    items: [
      "Repeat purchase and loyalty",
      "Product discovery and browsing",
      "Cart and checkout",
      "Post-purchase experience",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "The e-commerce journey flows: product discovery and browsing, cart and checkout, post-purchase experience (delivery, support), and finally repeat purchase and loyalty.",
  },
  {
    type: "multiple-choice",
    question: "What is the average cart abandonment rate across e-commerce?",
    options: [
      "10%",
      "30%",
      "50%",
      "70%",
    ],
    correctIndex: 3,
    explanation:
      "The average cart abandonment rate across e-commerce is approximately 70%, meaning 7 out of 10 shoppers who add items to their cart do not complete the purchase.",
  },
  {
    type: "multiple-choice",
    question: "Why is e-commerce marketing considered highly measurable?",
    options: [
      "Because it uses fewer channels",
      "Because every click, view, add-to-cart, and purchase can be tracked and analyzed",
      "Because it is less competitive",
      "Because only one platform is used",
    ],
    correctIndex: 1,
    explanation:
      "E-commerce offers unparalleled measurability because every interaction — click, view, add-to-cart, and purchase — can be tracked and analyzed with digital tools.",
  },
  {
    type: "multiple-choice",
    question: "What does CLTV (Customer Lifetime Value) measure?",
    options: [
      "Revenue from a single transaction",
      "Total revenue a customer generates over their entire relationship with your brand",
      "The cost of acquiring one customer",
      "Monthly recurring revenue per customer",
    ],
    correctIndex: 1,
    explanation:
      "CLTV measures the total revenue a customer generates over their entire relationship with your brand, including all repeat purchases over time.",
  },
  {
    type: "ordering",
    question: "Rank e-commerce metrics by the scope of what they measure, from narrowest to broadest.",
    items: [
      "CLTV (Customer Lifetime Value)",
      "Conversion Rate (single session)",
      "AOV (Average Order Value per transaction)",
      "ROAS (Return on Ad Spend per campaign)",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "From narrowest to broadest: conversion rate (single session), AOV (single transaction), ROAS (campaign level), and CLTV (entire customer relationship).",
  },

  // === SECTION 2: Core Concepts (12 questions) ===
  {
    type: "multiple-choice",
    question: "Which of the following is the most critical element of a product page?",
    options: [
      "The website's footer design",
      "High-quality images from multiple angles with lifestyle and detail shots",
      "The navigation menu style",
      "The company's about page link",
    ],
    correctIndex: 1,
    explanation:
      "High-quality images from multiple angles (both lifestyle and detail shots) are the most critical product page element since online shoppers cannot physically examine products.",
  },
  {
    type: "multiple-choice",
    question: "What determines Google Shopping ad success?",
    options: [
      "The size of your marketing team",
      "Product feed quality including optimized titles, accurate GTINs, and real-time pricing",
      "The number of products in your store",
      "Your company's age",
    ],
    correctIndex: 1,
    explanation:
      "Google Shopping success depends heavily on product feed quality — optimized titles with high-value keywords, accurate GTINs/MPNs, and real-time price and availability updates.",
  },
  {
    type: "multiple-choice",
    question: "What has driven the explosion of social commerce?",
    options: [
      "Declining internet usage",
      "The ability to discover and purchase directly within social platforms without leaving",
      "Social media platforms banning advertising",
      "Increased shipping costs",
    ],
    correctIndex: 1,
    explanation:
      "Social commerce has exploded because platforms like Instagram, TikTok, and Pinterest allow customers to discover and purchase products without ever leaving the social app.",
  },
  {
    type: "multiple-choice",
    question: "By how much do products with 50+ reviews improve their conversion rate?",
    options: [
      "0.5%",
      "4.6%",
      "15%",
      "50%",
    ],
    correctIndex: 1,
    explanation:
      "Products with 50 or more reviews have a 4.6% higher conversion rate than those without, demonstrating the significant impact of social proof on purchasing decisions.",
  },
  {
    type: "true-false",
    question: "Google uses review signals like quantity, velocity, and sentiment as local ranking factors.",
    correctAnswer: true,
    explanation:
      "Google uses review signals including quantity (how many reviews), velocity (how frequently new reviews appear), diversity (across platforms), and sentiment as local ranking factors.",
  },
  {
    type: "true-false",
    question: "Social commerce only works on Instagram.",
    correctAnswer: false,
    explanation:
      "Social commerce operates across multiple platforms including Instagram Shopping, TikTok Shop, Facebook Marketplace, and Pinterest Buyable Pins.",
  },
  {
    type: "multi-select",
    question: "Which elements should a product page include? (Select all that apply)",
    options: [
      "High-quality multi-angle images",
      "Benefit-driven product descriptions",
      "Competitor pricing information",
      "Trust signals (reviews, guarantees, security badges)",
      "Prominent Add to Cart button",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Essential product page elements include high-quality images, benefit-driven descriptions, trust signals, and a prominent Add to Cart button. Displaying competitor pricing is not standard practice.",
  },
  {
    type: "multi-select",
    question: "Which social commerce platforms allow in-app purchasing? (Select all that apply)",
    options: [
      "Instagram Shopping",
      "TikTok Shop",
      "LinkedIn",
      "Pinterest Buyable Pins",
      "Facebook Marketplace",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Instagram Shopping, TikTok Shop, Pinterest Buyable Pins, and Facebook Marketplace all enable in-app purchasing. LinkedIn is not a social commerce platform.",
  },
  {
    type: "ordering",
    question: "Arrange the review generation process in the correct order.",
    items: [
      "Syndicate reviews across channels including Google Shopping",
      "Customer receives and uses the product",
      "Send automated review request email 7-14 days after delivery",
      "Display reviews prominently on product pages",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "The review process flows: customer uses the product, automated review request is sent 7-14 days post-delivery, reviews are displayed on product pages, and then syndicated across channels.",
  },
  {
    type: "multiple-choice",
    question: "What are GTINs and MPNs in the context of Google Shopping?",
    options: [
      "Google Tracking and Media Protocol Numbers",
      "Global Trade Item Numbers and Manufacturer Part Numbers used for product identification",
      "Graphic Templates and Marketing Plan Notes",
      "Google Tools and Navigation Parameters",
    ],
    correctIndex: 1,
    explanation:
      "GTINs (Global Trade Item Numbers) and MPNs (Manufacturer Part Numbers) are unique product identifiers that help Google accurately match and categorize your products in Shopping ads.",
  },
  {
    type: "multiple-choice",
    question: "What should product descriptions primarily focus on?",
    options: [
      "Technical specifications and dimensions",
      "Benefits and how the product solves customer pain points",
      "The manufacturing process",
      "Competitor comparisons and pricing",
    ],
    correctIndex: 1,
    explanation:
      "Product descriptions should be benefit-driven, addressing how the product solves customer pain points. Features and specs support the benefits but should not be the primary focus.",
  },
  {
    type: "multiple-choice",
    question: "When should you ask customers for product reviews?",
    options: [
      "Before they receive the product",
      "7-14 days after delivery so they have had time to use the product",
      "One year after purchase",
      "Never — reviews should be organic only",
    ],
    correctIndex: 1,
    explanation:
      "The optimal time to request reviews is 7-14 days after delivery, giving customers enough time to use and form an opinion about the product while the experience is still fresh.",
  },

  // === SECTION 3: Strategy & Planning (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is the advantage of a hybrid marketplace strategy (own store plus Amazon/eBay)?",
    options: [
      "It is the cheapest option",
      "Marketplaces provide discovery and volume while your own store offers higher margins and data ownership",
      "You can avoid all marketing costs",
      "Marketplaces offer better branding control",
    ],
    correctIndex: 1,
    explanation:
      "A hybrid approach uses marketplaces for discovery and volume (leveraging their built-in traffic) while your own store provides higher margins, full data ownership, and brand building.",
  },
  {
    type: "multiple-choice",
    question: "What percentage of abandoned carts can a cart abandonment email flow typically recover?",
    options: [
      "1-2%",
      "5-15%",
      "30-40%",
      "60-70%",
    ],
    correctIndex: 1,
    explanation:
      "A well-designed cart abandonment email flow typically recovers 5-15% of abandoned carts, representing significant recovered revenue for most e-commerce stores.",
  },
  {
    type: "multiple-choice",
    question: "When should a cart abandonment email be triggered?",
    options: [
      "Immediately during the checkout process",
      "Within 1 hour of abandonment",
      "One week after abandonment",
      "Only after the customer returns to the site",
    ],
    correctIndex: 1,
    explanation:
      "Cart abandonment emails should trigger within 1 hour of abandonment, when the purchase intent is still fresh. The sequence typically sends 2-3 emails over the following 48 hours.",
  },
  {
    type: "multiple-choice",
    question: "What is the fastest way to increase e-commerce profitability?",
    options: [
      "Hiring more staff",
      "Increasing Average Order Value (AOV)",
      "Reducing product quality",
      "Closing the store on weekends",
    ],
    correctIndex: 1,
    explanation:
      "Increasing AOV is one of the fastest ways to improve profitability because it generates more revenue per transaction without proportionally increasing acquisition costs.",
  },
  {
    type: "true-false",
    question: "Free shipping thresholds should be set just above the current AOV to encourage larger orders.",
    correctAnswer: true,
    explanation:
      "Setting the free shipping threshold slightly above your current AOV motivates customers to add more items to qualify, effectively increasing order value.",
  },
  {
    type: "true-false",
    question: "A browse abandonment flow should be as aggressive as a cart abandonment flow.",
    correctAnswer: false,
    explanation:
      "Browse abandonment flows should use a softer approach than cart abandonment because the visitor showed less intent — they viewed products but did not add anything to their cart.",
  },
  {
    type: "multi-select",
    question: "Which tactics can increase Average Order Value? (Select all that apply)",
    options: [
      "Free shipping thresholds above current AOV",
      "Product bundles and kits",
      "Removing all product recommendations",
      "Volume discounts (buy 2 get 10% off)",
      "Post-purchase one-click upsells",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "AOV can be increased through shipping thresholds, bundles, volume discounts, and upsells. Removing recommendations would likely decrease AOV.",
  },
  {
    type: "multi-select",
    question: "Which email flows are essential for e-commerce? (Select all that apply)",
    options: [
      "Cart abandonment flow",
      "Browse abandonment flow",
      "Post-purchase flow",
      "Employee onboarding flow",
      "Win-back flow",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Essential e-commerce email flows include cart abandonment, browse abandonment, post-purchase, and win-back. Employee onboarding is an HR process, not an e-commerce email flow.",
  },
  {
    type: "ordering",
    question: "Arrange the cart abandonment email sequence in the correct order.",
    items: [
      "Final email with small incentive (optional)",
      "Second reminder with social proof",
      "First reminder with product images and CTA",
    ],
    correctOrder: [2, 1, 0],
    explanation:
      "The cart abandonment sequence: first reminder with product images and clear CTA (1 hour), second reminder with social proof (24 hours), final email with optional small incentive (48 hours).",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of a win-back email flow?",
    options: [
      "To welcome new subscribers",
      "To re-engage customers who have not purchased in 60-90 days",
      "To apologize for order errors",
      "To announce store closures",
    ],
    correctIndex: 1,
    explanation:
      "Win-back flows re-engage customers who have not purchased in 60-90 days through exclusive discounts, new product showcases, or content that rebuilds interest.",
  },
  {
    type: "multi-select",
    question: "What data advantages does your own e-commerce store offer over marketplaces? (Select all that apply)",
    options: [
      "Full access to customer email addresses",
      "Detailed browsing behavior data",
      "Lower transaction fees guaranteed",
      "Complete purchase history for each customer",
      "Ability to build custom audience segments for retargeting",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Your own store provides full data ownership: email addresses, browsing behavior, purchase history, and custom audience building. Lower fees are not guaranteed and depend on the platform.",
  },
  {
    type: "multiple-choice",
    question: "What should a post-purchase email flow include?",
    options: [
      "Only a receipt",
      "Thank you, order tracking, complementary product suggestions, and a review request",
      "Only upsell offers",
      "Only a return policy reminder",
    ],
    correctIndex: 1,
    explanation:
      "A complete post-purchase flow includes order confirmation, shipping/tracking info, complementary product suggestions, and a review request 7-14 days after delivery.",
  },

  // === SECTION 4: Execution & Implementation (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is the difference between upselling and cross-selling?",
    options: [
      "They are the same thing",
      "Upselling suggests a higher-end version; cross-selling suggests complementary products",
      "Cross-selling is more expensive to implement",
      "Upselling only works in physical stores",
    ],
    correctIndex: 1,
    explanation:
      "Upselling encourages buying a higher-end version (premium alternative), while cross-selling suggests complementary products ('Customers also bought' or 'Complete the look').",
  },
  {
    type: "multiple-choice",
    question: "By how much does each 1-second delay in site loading reduce conversions?",
    options: [
      "1%",
      "3%",
      "7%",
      "15%",
    ],
    correctIndex: 2,
    explanation:
      "Every 1-second delay in page loading reduces conversions by approximately 7%, making site speed optimization one of the highest-impact CRO activities for e-commerce.",
  },
  {
    type: "multiple-choice",
    question: "What percentage of e-commerce traffic comes from mobile devices?",
    options: [
      "20%",
      "40%",
      "Over 60%",
      "Less than 10%",
    ],
    correctIndex: 2,
    explanation:
      "Over 60% of e-commerce traffic now comes from mobile devices, making mobile optimization essential for conversion rate performance.",
  },
  {
    type: "multiple-choice",
    question: "What are dynamic product ads?",
    options: [
      "Ads that change color randomly",
      "Retargeting ads that automatically show the exact products someone viewed on your site",
      "Ads that only appear on mobile",
      "Ads with animated text only",
    ],
    correctIndex: 1,
    explanation:
      "Dynamic product ads are retargeting ads on Meta and Google that automatically display the exact products a visitor viewed on your site, personalizing the ad creative at scale.",
  },
  {
    type: "true-false",
    question: "Guest checkout should be offered to reduce friction in the purchase process.",
    correctAnswer: true,
    explanation:
      "Offering guest checkout removes a significant friction point. Requiring account creation before purchase causes many customers to abandon their carts.",
  },
  {
    type: "true-false",
    question: "Recent purchasers should be included in retargeting campaigns for the products they just bought.",
    correctAnswer: false,
    explanation:
      "Recent purchasers should be excluded from retargeting for products they already bought. Seeing ads for items they just purchased is annoying and wastes ad budget.",
  },
  {
    type: "multi-select",
    question: "Where should cross-sell recommendations be placed? (Select all that apply)",
    options: [
      "On product pages",
      "In the shopping cart",
      "During checkout",
      "On the 404 error page",
      "In post-purchase emails",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Cross-sell recommendations work best on product pages, in the cart, during checkout, and in post-purchase emails. A 404 page is not an appropriate placement.",
  },
  {
    type: "multi-select",
    question: "What reduces checkout friction? (Select all that apply)",
    options: [
      "Guest checkout option",
      "Multiple payment options",
      "Requiring a minimum of 10 form fields",
      "Progress indicators",
      "Security badges and trust signals",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Checkout friction is reduced by guest checkout, multiple payment options, progress indicators, and trust signals. Excessive form fields increase friction.",
  },
  {
    type: "ordering",
    question: "Arrange the seasonal e-commerce marketing preparation steps in the correct order.",
    items: [
      "Analyze results and document learnings",
      "Plan creative and inventory weeks in advance",
      "Build email hype sequences leading up to the event",
      "Launch promotional campaigns across channels",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Seasonal prep flows: plan creative and inventory in advance, build email hype sequences, launch campaigns, and then analyze results and document learnings for next year.",
  },
  {
    type: "multiple-choice",
    question: "Why should retargeting audiences be segmented by behavior?",
    options: [
      "To make campaign management more complex",
      "Because product viewers and cart abandoners have different intent levels and need different messaging",
      "To increase ad spending",
      "Segmentation is not necessary for retargeting",
    ],
    correctIndex: 1,
    explanation:
      "Product viewers and cart abandoners have different intent levels. Cart abandoners are closer to purchase and may respond to urgency, while product viewers need more persuasion.",
  },
  {
    type: "multi-select",
    question: "What best practices should be followed for retargeting campaigns? (Select all that apply)",
    options: [
      "Set frequency caps to prevent ad fatigue",
      "Segment audiences by behavior (viewers vs. cart abandoners)",
      "Show the same generic ad to everyone",
      "Exclude recent purchasers from product-specific retargeting",
      "Use dynamic product ads showing items the user viewed",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Retargeting best practices include frequency caps, behavioral segmentation, purchaser exclusion, and dynamic product ads. Generic ads for everyone waste budget and reduce relevance.",
  },
  {
    type: "multiple-choice",
    question: "What should be done after each seasonal promotional event?",
    options: [
      "Immediately start the next promotion",
      "Take a month off from marketing",
      "Analyze what worked, document learnings for next year",
      "Delete all campaign data",
    ],
    correctIndex: 2,
    explanation:
      "After each seasonal event, conduct a thorough analysis of what worked and what did not, and document learnings to improve next year's campaigns.",
  },

  // === SECTION 5: Measurement & Optimization (12 questions) ===
  {
    type: "multiple-choice",
    question: "What is the industry average e-commerce conversion rate?",
    options: [
      "0.1-0.5%",
      "2-3%",
      "10-15%",
      "25-30%",
    ],
    correctIndex: 1,
    explanation:
      "The industry average e-commerce conversion rate is 2-3%, though this varies significantly by product category, price point, and traffic source.",
  },
  {
    type: "multiple-choice",
    question: "How do you calculate break-even ROAS?",
    options: [
      "Total revenue divided by total costs",
      "1 divided by your profit margin",
      "Ad spend divided by revenue",
      "Conversion rate multiplied by AOV",
    ],
    correctIndex: 1,
    explanation:
      "Break-even ROAS is calculated by dividing 1 by your profit margin. If your margin is 50%, break-even ROAS is 2x (1/0.50 = 2). Anything above is profit.",
  },
  {
    type: "multiple-choice",
    question: "If your profit margin is 25%, what is your break-even ROAS?",
    options: [
      "2x",
      "3x",
      "4x",
      "5x",
    ],
    correctIndex: 2,
    explanation:
      "Break-even ROAS = 1 / profit margin = 1 / 0.25 = 4x. You need at least $4 in revenue for every $1 in ad spend to break even at a 25% margin.",
  },
  {
    type: "multiple-choice",
    question: "What is the recommended target for Largest Contentful Paint (LCP) in e-commerce?",
    options: [
      "Under 10 seconds",
      "Under 5 seconds",
      "Under 2.5 seconds",
      "Under 0.5 seconds",
    ],
    correctIndex: 2,
    explanation:
      "The recommended target for Largest Contentful Paint (LCP) is under 2.5 seconds. Slower load times significantly reduce conversions and increase bounce rates.",
  },
  {
    type: "true-false",
    question: "A 4x ROAS always means you are profitable.",
    correctAnswer: false,
    explanation:
      "A 4x ROAS is not automatically profitable. If your product margins are only 25%, your break-even ROAS is 4x — meaning you are just covering costs, not making profit.",
  },
  {
    type: "true-false",
    question: "CLTV should be factored into ROAS calculations for a more complete picture.",
    correctAnswer: true,
    explanation:
      "Factoring in CLTV gives a more complete picture because you may accept a lower first-purchase ROAS if customer retention rates justify the initial acquisition investment.",
  },
  {
    type: "multi-select",
    question: "Which areas should be prioritized for e-commerce optimization? (Select all that apply)",
    options: [
      "Site speed improvement",
      "Checkout flow simplification",
      "Office interior design",
      "Product page element testing",
      "Email flow refinement",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Priority optimization areas include site speed, checkout flow, product page testing, and email flow refinement. Office interior design does not impact e-commerce performance.",
  },
  {
    type: "multi-select",
    question: "What should be A/B tested in email flows? (Select all that apply)",
    options: [
      "Send timing",
      "Subject lines",
      "Offers and incentives",
      "The email server provider",
      "Creative and imagery",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Email flow A/B tests should cover timing, subject lines, offers, and creative. The email server provider is a technical infrastructure decision, not a testable marketing variable.",
  },
  {
    type: "ordering",
    question: "Arrange e-commerce optimization priorities from highest impact to lowest impact.",
    items: [
      "Ad campaign segmentation",
      "Site speed optimization",
      "Checkout flow improvement",
      "Email flow testing",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Highest impact first: site speed (affects all visitors), checkout optimization (directly impacts conversion), email flows (recovers lost revenue), and ad segmentation (optimizes acquisition).",
  },
  {
    type: "multiple-choice",
    question: "Why can ROAS alone be a misleading metric?",
    options: [
      "Because ROAS is always accurate",
      "Because it does not account for product margins — a 4x ROAS with 25% margins means you barely break even",
      "Because ROAS is too difficult to calculate",
      "Because ROAS only works for social media ads",
    ],
    correctIndex: 1,
    explanation:
      "ROAS alone is misleading because it does not factor in profit margins. A seemingly strong ROAS may only be breaking even or losing money depending on your margin structure.",
  },
  {
    type: "ordering",
    question: "Arrange e-commerce optimization testing priorities from quick wins to long-term projects.",
    items: [
      "Full site redesign and platform migration",
      "CTA button copy and color A/B tests",
      "Checkout flow simplification",
      "Product page layout and social proof testing",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "Quick wins first: CTA tests (fastest to implement), product page testing, checkout flow optimization, and full redesign as a long-term project.",
  },
  {
    type: "ordering",
    question: "Arrange the ROAS profitability calculation steps in the correct order.",
    items: [
      "Compare actual ROAS against break-even ROAS",
      "Determine your product profit margin",
      "Factor in CLTV for long-term view",
      "Calculate break-even ROAS (1 / margin)",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "Calculate profitability: determine your margin, calculate break-even ROAS (1/margin), compare actual ROAS against break-even, and factor in CLTV for the full picture.",
  },
];
