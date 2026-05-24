import type { QuizQuestion } from "@/lib/academy-data";

export const emailMarketingMasteryQuiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is the average ROI of email marketing per dollar spent?",
    options: [
      "$4-$8",
      "$12-$18",
      "$36-$42",
      "$80-$100",
    ],
    correctIndex: 2,
    explanation:
      "Email marketing generates an average return of $36-$42 for every $1 spent, making it the highest-ROI digital marketing channel available to marketers.",
  },
  {
    type: "multiple-choice",
    question: "Why is an email list considered a superior marketing asset compared to social media followers?",
    options: [
      "Email lists are always larger than social media followings",
      "Email gives you direct, owned access that cannot be taken away by platform changes",
      "Email is free while social media requires paid ads",
      "Email subscribers always open every message you send",
    ],
    correctIndex: 1,
    explanation:
      "Your email list is an asset you control — it cannot be taken away by a platform change, algorithm update, or account suspension. Unlike social media, email provides direct, owned access to your audience.",
  },
  {
    type: "multi-select",
    question: "Which statistics about email marketing are accurate? (Select all that apply)",
    options: [
      "4.4 billion people use email worldwide",
      "99% of email users check their inbox daily",
      "Email is 40x more effective at customer acquisition than Facebook and Twitter combined",
      "Email marketing has a lower ROI than social media marketing",
      "Most people only check email once per month",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "All three positive statements are accurate: 4.4 billion email users worldwide, 99% daily inbox checking, and 40x customer acquisition effectiveness vs. social media. Email marketing has the highest ROI of any digital channel, not lower than social media.",
  },
  {
    type: "multi-select",
    question: "Which capabilities does modern email marketing encompass beyond simple newsletters? (Select all that apply)",
    options: [
      "Sophisticated audience segmentation",
      "Behavioral automation workflows",
      "Guaranteed inbox placement for every email",
      "Dynamic content personalization",
      "Deliverability engineering (SPF/DKIM/DMARC)",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Modern email marketing encompasses segmentation, behavioral automation, dynamic personalization, and deliverability engineering. However, no technology can guarantee inbox placement — deliverability depends on sender reputation, authentication, and content quality.",
  },
  {
    type: "multiple-choice",
    question: "What does modern email marketing encompass beyond simple newsletters?",
    options: [
      "Only promotional sales emails",
      "Sophisticated segmentation, behavioral automation, dynamic personalization, and deliverability engineering",
      "Exclusively cold outreach to purchased lists",
      "Only transactional emails like receipts and shipping updates",
    ],
    correctIndex: 1,
    explanation:
      "Modern email marketing goes far beyond batch-and-blast newsletters. It encompasses sophisticated segmentation, behavioral automation, dynamic personalization, and deliverability engineering.",
  },
  {
    type: "true-false",
    question: "Email marketing's high ROI means it will produce results immediately without any strategic planning.",
    correctAnswer: false,
    explanation:
      "While email marketing has the highest ROI of any digital channel, achieving those returns requires strategic planning including list building, segmentation, automation workflows, deliverability optimization, and continuous testing.",
  },
  {
    type: "true-false",
    question: "99% of email users check their inbox daily.",
    correctAnswer: true,
    explanation:
      "Research shows that 99% of email users check their inbox daily, often multiple times per day. This makes email one of the most reliable channels for reaching your audience consistently.",
  },
  {
    type: "multi-select",
    question: "Which of the following can email marketing accomplish for a business? (Select all that apply)",
    options: [
      "Nurture leads through the sales funnel",
      "Onboard new customers",
      "Replace the need for a website entirely",
      "Reactivate dormant subscribers",
      "Drive repeat purchases",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Email marketing can nurture leads, onboard customers, reactivate dormant subscribers, and drive repeat purchases. However, it cannot replace a website — email drives traffic to your website and other conversion points.",
  },
  {
    type: "multi-select",
    question: "What makes email marketing different from social media marketing? (Select all that apply)",
    options: [
      "You own your email list rather than renting access from a platform",
      "Email is immune to spam filters",
      "Algorithms do not control who sees your emails",
      "Email provides direct one-to-one communication",
      "Email lists cannot be affected by regulation",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Email gives you owned access (not rented), is not subject to social media algorithms, and provides direct one-to-one communication. However, emails can still be caught by spam filters and are subject to regulations like GDPR and CAN-SPAM.",
  },
  {
    type: "ordering",
    question: "Arrange these email marketing capabilities from most basic to most advanced.",
    items: ["Behavioral automation workflows", "Sending a single broadcast newsletter", "Dynamic personalization with AI", "Segmented campaign sends"],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "Single broadcast newsletters are the most basic. Segmented campaigns add targeting. Behavioral automation adds trigger-based sequences. Dynamic personalization with AI represents the most advanced capability, adapting content in real-time.",
  },
  {
    type: "multiple-choice",
    question: "What percentage of email users check their inbox on a daily basis?",
    options: [
      "65%",
      "78%",
      "89%",
      "99%",
    ],
    correctIndex: 3,
    explanation:
      "99% of email users check their inbox daily, making email one of the most consistently accessed digital channels. This daily habit makes email a reliable way to reach your audience.",
  },
  {
    type: "ordering",
    question: "Put the email marketing system components in order from foundational to advanced.",
    items: ["Analytics and optimization", "List building", "Segmentation and automation", "Deliverability setup (SPF/DKIM/DMARC)"],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "First build your list (foundation), then set up deliverability authentication to ensure emails reach inboxes, then implement segmentation and automation for targeted messaging, and finally layer in analytics and optimization for continuous improvement.",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is SPF in email authentication?",
    options: [
      "Spam Protection Filter — a tool that blocks spam emails",
      "Sender Policy Framework — a DNS record specifying authorized mail servers",
      "Secure Protocol Format — an encryption standard for email",
      "Subscriber Preference Form — a page where users set email preferences",
    ],
    correctIndex: 1,
    explanation:
      "SPF (Sender Policy Framework) is a DNS TXT record that specifies which mail servers are authorized to send email on behalf of your domain. It prevents spammers from spoofing your 'from' address.",
  },
  {
    type: "multiple-choice",
    question: "What does DKIM use to verify email authenticity?",
    options: [
      "Password protection on each email",
      "IP address whitelisting",
      "Public/private key cryptographic pairs",
      "Two-factor authentication for recipients",
    ],
    correctIndex: 2,
    explanation:
      "DKIM (DomainKeys Identified Mail) uses public/private key cryptographic pairs to add a signature to email headers that verifies the message was not altered in transit and was sent by an authorized sender.",
  },
  {
    type: "multiple-choice",
    question: "What does DMARC tell receiving servers to do when email authentication fails?",
    options: [
      "Automatically forward the email to the sender",
      "None, quarantine, or reject the message, plus provide reporting",
      "Delete all future emails from that domain",
      "Send a warning to the recipient's phone",
    ],
    correctIndex: 1,
    explanation:
      "DMARC builds on SPF and DKIM by telling receiving servers what action to take when authentication fails: none (monitor only), quarantine (send to spam), or reject (block entirely). It also provides reporting on unauthorized domain use.",
  },
  {
    type: "multiple-choice",
    question: "How much higher are open rates for segmented campaigns compared to non-segmented campaigns?",
    options: [
      "2.1% higher",
      "7.5% higher",
      "14.3% higher",
      "25.0% higher",
    ],
    correctIndex: 2,
    explanation:
      "Segmented campaigns drive 14.3% higher open rates and 100.9% higher click-through rates compared to non-segmented campaigns, demonstrating the significant impact of sending targeted, relevant messages.",
  },
  {
    type: "multiple-choice",
    question: "Why should you never buy email lists?",
    options: [
      "Purchased lists are too expensive",
      "They destroy deliverability, violate regulations, and attract disengaged recipients",
      "Purchased lists only contain business emails",
      "Email providers do not allow imported contacts",
    ],
    correctIndex: 1,
    explanation:
      "Purchased lists destroy deliverability by generating high bounce rates and spam complaints, violate regulations like GDPR and CAN-SPAM (which require explicit opt-in consent), and attract disengaged recipients who damage your sender reputation.",
  },
  {
    type: "true-false",
    question: "A content upgrade is a bonus resource specific to a blog post, offered in exchange for an email address.",
    correctAnswer: true,
    explanation:
      "A content upgrade is a targeted lead magnet specific to the content the visitor is reading, such as a downloadable PDF version, worksheet, or checklist related to a particular blog post. They convert well because they are highly relevant to the reader's current interest.",
  },
  {
    type: "true-false",
    question: "DMARC works independently and does not require SPF or DKIM to be configured first.",
    correctAnswer: false,
    explanation:
      "DMARC builds on top of SPF and DKIM. It requires at least one (ideally both) of these authentication protocols to be properly configured before DMARC can function, as it defines the policy for handling messages that fail SPF and/or DKIM checks.",
  },
  {
    type: "multi-select",
    question: "Which of the following are proven list building tactics? (Select all that apply)",
    options: [
      "Lead magnets (e-books, templates, checklists)",
      "Purchasing email lists from data brokers",
      "Exit-intent popups",
      "Content upgrades",
      "Webinar registrations",
      "Scraping emails from websites",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "Proven list building tactics include lead magnets, exit-intent popups, content upgrades, and webinar registrations. Purchasing lists and scraping emails violate regulations and destroy deliverability.",
  },
  {
    type: "multi-select",
    question: "Which criteria can be used for email segmentation? (Select all that apply)",
    options: [
      "Demographics (location, job title)",
      "Behavior (purchase history, email engagement)",
      "Zodiac sign",
      "Lifecycle stage (new subscriber, active customer)",
      "Preferences (content topics, email frequency)",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Email segmentation criteria include demographics, behavior, lifecycle stage, and preferences. Zodiac signs are not a meaningful or data-driven segmentation criterion for marketing purposes.",
  },
  {
    type: "ordering",
    question: "Arrange these email authentication protocols in the order they should be implemented.",
    items: ["DMARC", "DKIM", "SPF"],
    correctOrder: [2, 1, 0],
    explanation:
      "Implement SPF first (defines authorized sending servers), then DKIM (adds cryptographic signature verification), and finally DMARC (defines policy for failures and enables reporting). DMARC depends on SPF and DKIM being in place.",
  },
  {
    type: "multiple-choice",
    question: "What is the primary purpose of an exit-intent popup?",
    options: [
      "To display a farewell message to departing visitors",
      "To offer a compelling reason to subscribe when a user is about to leave the page",
      "To redirect users to a competitor's website",
      "To force users to stay on the page longer",
    ],
    correctIndex: 1,
    explanation:
      "Exit-intent popups are triggered when a user's cursor movement suggests they are about to leave the page. They offer a compelling reason to subscribe — such as a discount, free resource, or exclusive content — capturing visitors who would otherwise leave without converting.",
  },
  {
    type: "multiple-choice",
    question: "How much higher are click-through rates for segmented campaigns compared to non-segmented ones?",
    options: [
      "25.4% higher",
      "50.2% higher",
      "75.6% higher",
      "100.9% higher",
    ],
    correctIndex: 3,
    explanation:
      "Segmented campaigns drive 100.9% higher click-through rates compared to non-segmented campaigns. This dramatic improvement demonstrates that relevant, targeted messaging significantly outperforms one-size-fits-all broadcasts.",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question: "How many emails should a typical welcome sequence contain?",
    options: [
      "1 email",
      "3-7 emails over 1-2 weeks",
      "15-20 emails over 2 months",
      "50+ emails over 6 months",
    ],
    correctIndex: 1,
    explanation:
      "A typical welcome sequence contains 3-7 emails sent over 1-2 weeks after signup. It introduces your brand, sets expectations, delivers the lead magnet, and guides the subscriber toward key actions.",
  },
  {
    type: "multiple-choice",
    question: "What triggers an abandoned cart email sequence?",
    options: [
      "A user visiting your homepage without purchasing",
      "A user adding items to their cart but not completing checkout",
      "A user unsubscribing from your newsletter",
      "A user leaving a product review",
    ],
    correctIndex: 1,
    explanation:
      "Abandoned cart emails are triggered when a user adds items to their cart but does not complete checkout. They typically consist of 3 emails over 48 hours with escalating urgency and social proof to recover the sale.",
  },
  {
    type: "multiple-choice",
    question: "What is the maximum fine per email for CAN-SPAM violations?",
    options: [
      "$500",
      "$5,000",
      "$16,000",
      "$50,120",
    ],
    correctIndex: 3,
    explanation:
      "CAN-SPAM violations can result in fines of up to $50,120 per email. This underscores the importance of complying with email marketing regulations including proper consent, physical address inclusion, and unsubscribe mechanisms.",
  },
  {
    type: "multiple-choice",
    question: "How quickly must unsubscribe requests be honored under CAN-SPAM?",
    options: [
      "Immediately",
      "Within 24 hours",
      "Within 10 business days",
      "Within 30 calendar days",
    ],
    correctIndex: 2,
    explanation:
      "Under CAN-SPAM, unsubscribe requests must be honored within 10 business days. Best practice is to process them immediately, and most modern email platforms handle unsubscribes automatically and instantly.",
  },
  {
    type: "multiple-choice",
    question: "What is the maximum GDPR fine as a percentage of annual global revenue?",
    options: [
      "1%",
      "2%",
      "4%",
      "10%",
    ],
    correctIndex: 2,
    explanation:
      "GDPR violations can result in fines of up to 4% of annual global revenue or 20 million euros, whichever is higher. This applies to any business processing data of EU residents, regardless of where the business is located.",
  },
  {
    type: "true-false",
    question: "A re-engagement email campaign targets subscribers who have not opened or clicked in 60-90 days.",
    correctAnswer: true,
    explanation:
      "Re-engagement campaigns target subscribers who have not opened or clicked in 60-90 days. They offer a compelling reason to re-engage or a clean opt-out, helping maintain list health and sender reputation.",
  },
  {
    type: "true-false",
    question: "B2B companies typically send more marketing emails per week than B2C brands.",
    correctAnswer: false,
    explanation:
      "Most B2B companies send 1-2 emails per week, while B2C brands may send 3-5. B2C audiences often expect more frequent communication about promotions, new products, and seasonal offers.",
  },
  {
    type: "multi-select",
    question: "Which of the following are essential automated email workflows? (Select all that apply)",
    options: [
      "Welcome sequence",
      "Daily weather update",
      "Abandoned cart recovery",
      "Nurture sequence",
      "Re-engagement campaign",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "Essential automated workflows include welcome sequences, abandoned cart recovery, nurture sequences, and re-engagement campaigns. Daily weather updates are not a standard marketing email workflow.",
  },
  {
    type: "multi-select",
    question: "Which regulations govern email marketing? (Select all that apply)",
    options: [
      "CAN-SPAM (United States)",
      "GDPR (European Union)",
      "CASL (Canada)",
      "FIFA (International Soccer)",
      "SOX (Sarbanes-Oxley Act)",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Email marketing is governed by CAN-SPAM (US), GDPR (EU), and CASL (Canada). FIFA governs international soccer and SOX governs financial reporting — neither relates to email marketing.",
  },
  {
    type: "ordering",
    question: "Put these email types in order from most automated/triggered to most manually sent.",
    items: ["Monthly promotional campaign", "Welcome sequence after signup", "Quarterly company newsletter", "Abandoned cart reminder"],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "Welcome sequences are triggered automatically at signup. Abandoned cart reminders are triggered by cart abandonment. Monthly promotions are often scheduled but may involve manual elements. Quarterly newsletters typically require the most manual curation and sending.",
  },
  {
    type: "multiple-choice",
    question: "What are the three types of email sends that should be planned in an email calendar?",
    options: [
      "Morning emails, afternoon emails, and evening emails",
      "Automated flows, regular broadcasts, and event-driven campaigns",
      "Text emails, HTML emails, and image-only emails",
      "Short emails, medium emails, and long emails",
    ],
    correctIndex: 1,
    explanation:
      "An email calendar should plan around three types: automated flows (triggered by behavior), regular broadcasts (newsletters, promotions), and event-driven campaigns (product launches, seasonal promotions, holidays).",
  },
  {
    type: "ordering",
    question: "Arrange the emails in a typical abandoned cart sequence from first sent to last.",
    items: ["Final urgency email with discount or scarcity", "Friendly reminder about items left in cart", "Social proof email with reviews and testimonials"],
    correctOrder: [1, 2, 0],
    explanation:
      "An abandoned cart sequence typically starts with a friendly reminder, follows up with social proof (reviews and testimonials to build confidence), and ends with urgency (limited-time discount or low-stock warning) to drive the final conversion.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is the recommended maximum length for email subject lines?",
    options: [
      "Under 20 characters",
      "Under 50 characters",
      "Under 100 characters",
      "Under 200 characters",
    ],
    correctIndex: 1,
    explanation:
      "Keep subject lines under 50 characters to ensure they display fully on mobile devices. Subject lines that are too long get truncated, losing their impact and reducing open rates.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of preview text (preheader) in an email?",
    options: [
      "To display the sender's physical address",
      "To complement the subject line without repeating it",
      "To show the email's unsubscribe link",
      "To include tracking pixels for analytics",
    ],
    correctIndex: 1,
    explanation:
      "Preview text (preheader) appears next to or below the subject line in the inbox preview. It should complement the subject line by adding context or creating additional curiosity, not repeating the same message.",
  },
  {
    type: "multiple-choice",
    question: "What percentage of email opens occur on mobile devices?",
    options: [
      "20%",
      "40%",
      "Over 60%",
      "95%",
    ],
    correctIndex: 2,
    explanation:
      "Over 60% of email opens occur on mobile devices. This means every email must be designed for mobile-first: single-column layout, large tap targets (minimum 44x44 pixels), and body text of at least 14px.",
  },
  {
    type: "multiple-choice",
    question: "What is the maximum recommended email file size to avoid Gmail clipping?",
    options: [
      "25KB",
      "50KB",
      "100KB",
      "500KB",
    ],
    correctIndex: 2,
    explanation:
      "Keep emails under 100KB to avoid clipping in Gmail. When emails exceed this size, Gmail truncates the message with a '[Message clipped]' notice, which hides content and tracking elements.",
  },
  {
    type: "multiple-choice",
    question: "What is the recommended minimum sample size per variation for A/B testing email subject lines?",
    options: [
      "50 recipients",
      "250 recipients",
      "1,000 recipients",
      "10,000 recipients",
    ],
    correctIndex: 2,
    explanation:
      "A/B tests should use at least 1,000 recipients per variation to achieve statistical significance. Smaller samples may produce misleading results that do not reflect true audience preferences.",
  },
  {
    type: "true-false",
    question: "Every email should have multiple calls-to-action to give subscribers as many options as possible.",
    correctAnswer: false,
    explanation:
      "Every email should have a single primary call-to-action. Multiple CTAs dilute focus and reduce click-through rates. One email, one goal is the principle that drives the highest conversion rates.",
  },
  {
    type: "true-false",
    question: "Using too many images in an email can trigger spam filters and reduce deliverability.",
    correctAnswer: true,
    explanation:
      "A high image-to-text ratio can trigger spam filters. Additionally, many email clients block images by default, so emails that rely heavily on images may appear broken or empty to recipients who have image blocking enabled.",
  },
  {
    type: "multi-select",
    question: "Which of the following are email copywriting best practices? (Select all that apply)",
    options: [
      "Write conversationally using 'you' language",
      "Use ALL CAPS for emphasis in subject lines",
      "Front-load the most important information",
      "Keep one email focused on one primary CTA",
      "Use power words like 'discover' and 'proven'",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "Email copywriting best practices include writing conversationally, front-loading value, maintaining a single CTA, and using power words. ALL CAPS in subject lines often triggers spam filters and appears unprofessional.",
  },
  {
    type: "multi-select",
    question: "Which elements should be A/B tested in email marketing? (Select all that apply)",
    options: [
      "Subject lines",
      "Send times",
      "Recipient's birth date",
      "CTAs and button copy",
      "Email length and design",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "A/B testing should cover subject lines, send times, CTAs, email length, and design elements. Recipient birth dates are fixed data points that cannot be tested or changed.",
  },
  {
    type: "ordering",
    question: "Put these A/B testing steps in the correct order.",
    items: ["Send winner to remaining list", "Wait for sufficient data (2-4 hours for opens)", "Send test variations to sample groups", "Identify the variable to test"],
    correctOrder: [3, 2, 1, 0],
    explanation:
      "First identify the single variable to test, then send test variations to statistically significant sample groups, wait for sufficient data to declare a winner, and finally send the winning variation to the remaining list.",
  },
  {
    type: "multiple-choice",
    question: "What is the minimum recommended tap target size for mobile email buttons?",
    options: [
      "20x20 pixels",
      "30x30 pixels",
      "44x44 pixels",
      "60x60 pixels",
    ],
    correctIndex: 2,
    explanation:
      "Mobile email buttons should have a minimum tap target of 44x44 pixels, following Apple's Human Interface Guidelines. Smaller buttons lead to accidental taps or difficulty clicking, reducing engagement.",
  },
  {
    type: "multiple-choice",
    question: "Which words should you avoid in email subject lines to prevent spam filter triggers?",
    options: [
      "News, update, and invitation",
      "Free, guarantee, and act now",
      "Thanks, welcome, and confirmed",
      "Question, idea, and thought",
    ],
    correctIndex: 1,
    explanation:
      "Words like 'free,' 'guarantee,' 'act now,' 'limited time,' and similar high-pressure terms are common spam trigger words. While modern spam filters use more sophisticated analysis, avoiding these terms reduces the risk of being flagged.",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is the industry average open rate for email campaigns?",
    options: [
      "5-10%",
      "20-25%",
      "40-50%",
      "70-80%",
    ],
    correctIndex: 1,
    explanation:
      "The industry average open rate is 20-25%, though this varies by industry and list quality. Note that Apple Mail Privacy Protection (introduced in 2021) can inflate open rates by pre-loading tracking pixels.",
  },
  {
    type: "multiple-choice",
    question: "What does CTOR (Click-to-Open Rate) measure?",
    options: [
      "The percentage of all recipients who clicked a link",
      "Clicks divided by opens — measuring content effectiveness independent of subject line",
      "The rate at which emails are opened from mobile devices",
      "How quickly recipients open an email after it is sent",
    ],
    correctIndex: 1,
    explanation:
      "CTOR (Click-to-Open Rate) is calculated by dividing clicks by opens. It isolates content effectiveness from subject line performance — a high CTOR means your email body content and CTAs are compelling to those who opened.",
  },
  {
    type: "multiple-choice",
    question: "What bounce rate should email marketers aim to stay below?",
    options: [
      "Under 0.5%",
      "Under 2%",
      "Under 5%",
      "Under 10%",
    ],
    correctIndex: 1,
    explanation:
      "Keep bounce rates under 2%. High bounce rates damage sender reputation and can cause email providers to block your messages. Hard bounces (invalid addresses) should be removed immediately.",
  },
  {
    type: "multiple-choice",
    question: "After how many days of inactivity should subscribers be considered for a re-engagement campaign?",
    options: [
      "7-14 days",
      "30-45 days",
      "90-180 days",
      "365+ days",
    ],
    correctIndex: 2,
    explanation:
      "Subscribers who have not opened or clicked in 90-180 days should be targeted with re-engagement campaigns. This timeframe balances giving subscribers enough time to naturally re-engage while not letting inactive addresses damage your sender reputation.",
  },
  {
    type: "multiple-choice",
    question: "What should the unsubscribe rate stay below per campaign?",
    options: [
      "0.1%",
      "0.5%",
      "2%",
      "5%",
    ],
    correctIndex: 1,
    explanation:
      "Unsubscribe rates should stay below 0.5% per campaign. Spikes above this threshold indicate problems with content relevance, sending frequency, or audience targeting that need to be addressed immediately.",
  },
  {
    type: "true-false",
    question: "Apple Mail Privacy Protection, introduced in 2021, can inflate email open rates by pre-loading tracking pixels.",
    correctAnswer: true,
    explanation:
      "Apple Mail Privacy Protection pre-loads tracking pixels regardless of whether the recipient actually opens the email, which inflates open rate data. This has made click-based metrics like CTR and CTOR more reliable indicators of true engagement.",
  },
  {
    type: "true-false",
    question: "A large email list is always more valuable than a smaller, more engaged one.",
    correctAnswer: false,
    explanation:
      "A healthy, engaged list is more important than a large list. Chronically unengaged subscribers damage your sender reputation, increase bounce rates, and reduce deliverability. Regular list cleaning and re-engagement campaigns maintain list health.",
  },
  {
    type: "multi-select",
    question: "Which tools can be used to monitor email sender reputation? (Select all that apply)",
    options: [
      "Google Postmaster Tools",
      "Microsoft SNDS",
      "Google Ads Manager",
      "Sender Score (third-party)",
      "Instagram Insights",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Sender reputation can be monitored through Google Postmaster Tools, Microsoft SNDS (Smart Network Data Services), and third-party services like Sender Score. Google Ads Manager and Instagram Insights are for advertising and social media analytics.",
  },
  {
    type: "multi-select",
    question: "Which of the following are key email marketing metrics? (Select all that apply)",
    options: [
      "Open rate",
      "Click-through rate (CTR)",
      "Website page load speed",
      "Bounce rate",
      "Unsubscribe rate",
      "Conversion rate",
    ],
    correctIndices: [0, 1, 3, 4, 5],
    explanation:
      "Key email metrics include open rate, CTR, bounce rate, unsubscribe rate, and conversion rate. Website page load speed is a web performance metric, not an email metric.",
  },
  {
    type: "ordering",
    question: "Arrange these list hygiene actions in order of urgency (most urgent first).",
    items: ["Sunset chronically unengaged subscribers (no opens in 180 days)", "Run re-engagement campaigns for inactive contacts", "Remove hard bounces immediately", "Suppress unsubscribes"],
    correctOrder: [2, 3, 1, 0],
    explanation:
      "Remove hard bounces immediately (they damage reputation with every send), suppress unsubscribes right away (legally required), run re-engagement campaigns for inactive contacts (give them a chance to re-engage), then sunset those who still don't respond.",
  },
  {
    type: "multiple-choice",
    question: "What is the industry average click-through rate (CTR) for email campaigns?",
    options: [
      "0.1-0.5%",
      "2-5%",
      "10-15%",
      "25-30%",
    ],
    correctIndex: 1,
    explanation:
      "The industry average CTR for email campaigns is 2-5%, varying by industry and email type. CTR measures the percentage of all recipients who clicked a link, making it one of the most reliable engagement metrics.",
  },
  {
    type: "ordering",
    question: "Put these email engagement metrics in order from broadest reach measure to deepest engagement measure.",
    items: ["Conversion rate", "Open rate", "Click-through rate (CTR)", "Delivery rate"],
    correctOrder: [3, 1, 2, 0],
    explanation:
      "Delivery rate measures how many emails reached any inbox (broadest). Open rate measures who opened it. CTR measures who clicked a link (deeper engagement). Conversion rate measures who completed the desired action (deepest engagement).",
  },
];
