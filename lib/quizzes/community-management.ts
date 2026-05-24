import type { QuizQuestion } from "@/lib/academy-data";

export const communityManagementQuiz: QuizQuestion[] = [
  // ── Section 1: Introduction & Overview (12 questions) ──────────────
  {
    type: "multiple-choice",
    question: "What is community management?",
    options: [
      "Posting content on social media",
      "Building, nurturing, and managing an engaged audience around your brand",
      "Running paid advertising campaigns",
      "Designing your website",
    ],
    correctIndex: 1,
    explanation:
      "Community management is the practice of building, nurturing, and managing an engaged audience around your brand across social media platforms, forums, and owned communities.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the key difference between an audience and a community?",
    options: [
      "An audience is larger than a community",
      "An audience watches (one-to-many); a community participates (many-to-many)",
      "A community is only on Facebook",
      "There is no meaningful difference",
    ],
    correctIndex: 1,
    explanation:
      "An audience watches (one-to-many broadcast). A community participates (many-to-many conversation). The goal of community management is to shift from broadcast to conversation.",
  },
  {
    type: "multiple-choice",
    question:
      "How much more do consumers trust user-generated content compared to brand-created content?",
    options: ["1.2x more", "2.4x more", "5x more", "10x more"],
    correctIndex: 1,
    explanation:
      "Consumers trust user-generated content 2.4x more than brand-created content, making UGC one of the most effective marketing assets.",
  },
  {
    type: "multiple-choice",
    question:
      "What converts followers into loyal brand advocates?",
    options: [
      "Paid advertising",
      "Community management and genuine engagement",
      "Discounts and promotions only",
      "Posting more content",
    ],
    correctIndex: 1,
    explanation:
      "While content creation attracts attention, community management is what converts followers into loyal advocates who defend, promote, and grow your brand organically.",
  },
  {
    type: "true-false",
    question:
      "Trust in advertising is increasing, making community management less important.",
    correctAnswer: false,
    explanation:
      "Trust in advertising is actually declining. In this environment, word-of-mouth and peer recommendations drive purchasing decisions, making community management more important than ever.",
  },
  {
    type: "true-false",
    question:
      "Brands with strong communities see higher retention rates and lower acquisition costs.",
    correctAnswer: true,
    explanation:
      "Brands with strong communities see higher retention rates, lower acquisition costs, and more authentic user-generated content because engaged community members become organic advocates.",
  },
  {
    type: "multi-select",
    question:
      "What are key benefits of community management? (Select all that apply)",
    options: [
      "Trust building through genuine interaction",
      "Real-time feedback loop for product insights",
      "Guaranteed sales increases",
      "Brand advocacy from loyal members",
      "Improved customer retention",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Key benefits include trust building, real-time feedback loops, brand advocacy, and improved retention. Community management supports sales but cannot guarantee specific increases.",
  },
  {
    type: "multi-select",
    question:
      "What does community management cover in this lesson? (Select all that apply)",
    options: [
      "Moderation",
      "Crisis management",
      "Paid advertising optimization",
      "UGC strategy",
      "Sentiment analysis",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "This lesson covers moderation, engagement tactics, crisis management, UGC strategy, brand advocacy programs, and sentiment analysis. Paid advertising optimization is covered in separate lessons.",
  },
  {
    type: "ordering",
    question:
      "Arrange the community building journey from initial contact to advocacy.",
    items: [
      "Brand advocate",
      "Follower",
      "Engaged community member",
      "Passive viewer",
    ],
    correctOrder: [3, 1, 2, 0],
    explanation:
      "The journey progresses from passive viewer to follower, then to engaged community member, and finally to brand advocate who actively promotes your brand.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the direction of communication in a community?",
    options: [
      "One-to-one only",
      "One-to-many (broadcast)",
      "Many-to-many (conversation)",
      "No communication is needed",
    ],
    correctIndex: 2,
    explanation:
      "A community has many-to-many communication (conversation) as opposed to an audience which has one-to-many communication (broadcast).",
  },
  {
    type: "multiple-choice",
    question:
      "Why do peer recommendations drive purchasing decisions in modern marketing?",
    options: [
      "Because advertisements are more expensive",
      "Because trust in traditional advertising is declining",
      "Because social media is free",
      "Because companies stopped advertising",
    ],
    correctIndex: 1,
    explanation:
      "In an era where trust in advertising is declining, word-of-mouth and peer recommendations from community members have become more influential in purchasing decisions.",
  },
  {
    type: "ordering",
    question:
      "Rank community benefits from most immediate to longest-term impact.",
    items: [
      "Reduced customer acquisition costs",
      "Real-time feedback on products",
      "Brand advocacy network",
      "Increased customer lifetime value",
    ],
    correctOrder: [1, 0, 3, 2],
    explanation:
      "Real-time feedback is the most immediate benefit, followed by reduced acquisition costs, increased lifetime value over time, and building a brand advocacy network as the longest-term investment.",
  },

  // ── Section 2: Core Concepts (12 questions) ────────────────────────
  {
    type: "multiple-choice",
    question:
      "What should community guidelines define?",
    options: [
      "Only what content to post",
      "Acceptable behavior, prohibited content, and consequences for violations",
      "Only the posting schedule",
      "Only the brand's products and services",
    ],
    correctIndex: 1,
    explanation:
      "Community guidelines should define acceptable behavior, prohibited content, and consequences for violations. They should be specific enough to enforce but flexible enough to allow genuine expression.",
  },
  {
    type: "multiple-choice",
    question: "What moderation approach do most brands use?",
    options: [
      "Purely automated moderation",
      "No moderation at all",
      "A hybrid approach: automated filters with human moderators",
      "Only reactive moderation",
    ],
    correctIndex: 2,
    explanation:
      "Most brands use a hybrid approach: automated filters catch obvious violations while human moderators handle nuanced situations requiring judgment.",
  },
  {
    type: "multiple-choice",
    question:
      "What erodes community trust faster than no moderation at all?",
    options: [
      "Over-moderation",
      "Selective enforcement",
      "Automated moderation",
      "Community guidelines",
    ],
    correctIndex: 1,
    explanation:
      "Selective enforcement erodes trust faster than no moderation at all. Consistency is critical — all members must be held to the same standards.",
  },
  {
    type: "multiple-choice",
    question: "What is sentiment analysis in community management?",
    options: [
      "Counting the number of comments",
      "Monitoring and categorizing community conversations as positive, negative, or neutral",
      "Analyzing your competitor's community",
      "Measuring your posting frequency",
    ],
    correctIndex: 1,
    explanation:
      "Sentiment analysis is the process of monitoring and categorizing community conversations as positive, negative, or neutral using tools like Brandwatch, Sprout Social, or Mention.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the primary purpose of member spotlights in community engagement?",
    options: [
      "To create free content",
      "To make community members feel valued",
      "To reduce your content creation workload",
      "To compete with other brands",
    ],
    correctIndex: 1,
    explanation:
      "Member spotlights feature community members, their stories, or their content to make them feel valued and recognized, strengthening their connection to the community.",
  },
  {
    type: "true-false",
    question:
      "Proactive moderation means reviewing content before it goes live.",
    correctAnswer: true,
    explanation:
      "Proactive moderation involves reviewing content before it goes live, as opposed to reactive moderation which responds to flagged content after publication.",
  },
  {
    type: "true-false",
    question:
      "UGC should always be reshared without asking permission from the original creator.",
    correctAnswer: false,
    explanation:
      "Always ask permission and credit creators when resharing user-generated content. This respects intellectual property and strengthens relationships with community members.",
  },
  {
    type: "multi-select",
    question:
      "Which are effective community engagement tactics? (Select all that apply)",
    options: [
      "Prompt-based posts (questions, polls, fill-in-the-blank)",
      "Member spotlights",
      "Exclusive content for active members",
      "Ignoring all feedback",
      "Events and challenges",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Effective engagement tactics include prompt-based posts, member spotlights, exclusive content, and events/challenges. Ignoring feedback is the opposite of good community management.",
  },
  {
    type: "multi-select",
    question:
      "Which tools can be used for sentiment analysis? (Select all that apply)",
    options: [
      "Brandwatch",
      "Sprout Social",
      "Mention",
      "Microsoft Paint",
      "Canva",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Brandwatch, Sprout Social, and Mention are social listening tools used for sentiment analysis. Microsoft Paint and Canva are design tools.",
  },
  {
    type: "ordering",
    question:
      "Arrange the moderation approaches from most preventive to most reactive.",
    items: [
      "Reactive (responding to flagged content)",
      "Proactive (reviewing before publication)",
      "Automated (filters for spam and profanity)",
    ],
    correctOrder: [1, 2, 0],
    explanation:
      "Proactive moderation is the most preventive (catching issues before publication), automated filters work continuously to prevent obvious violations, and reactive moderation addresses issues after they appear.",
  },
  {
    type: "multiple-choice",
    question:
      "What can sentiment shifts serve as in community management?",
    options: [
      "Social media post ideas",
      "Early warning systems for crises or indicators of campaign success",
      "Design inspiration",
      "Content scheduling guidelines",
    ],
    correctIndex: 1,
    explanation:
      "Sentiment shifts often serve as early warning systems for potential crises or indicators of successful campaigns, making real-time monitoring essential.",
  },
  {
    type: "multi-select",
    question:
      "Which are essential steps in the UGC lifecycle? (Select all that apply)",
    options: [
      "Encourage creation through branded hashtags and contests",
      "Monitor and identify high-quality UGC",
      "Request permission from creators before resharing",
      "Automatically reshare all tagged content",
      "Credit original creators when resharing",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "The UGC lifecycle includes encouraging creation, monitoring for quality, requesting permission, and crediting creators. You should never automatically reshare all tagged content without review and permission.",
  },

  // ── Section 3: Strategy & Planning (12 questions) ──────────────────
  {
    type: "multiple-choice",
    question:
      "What response time SLA should you aim for during business hours?",
    options: [
      "Within 24 hours",
      "Within 1-2 hours",
      "Within 1 week",
      "Response time doesn't matter",
    ],
    correctIndex: 1,
    explanation:
      "Aim to respond to all community interactions within 1-2 hours during business hours and within 4-8 hours outside business hours.",
  },
  {
    type: "multiple-choice",
    question:
      "How many severity tiers should a crisis management plan include?",
    options: ["1 tier", "2 tiers", "3 tiers", "5 tiers"],
    correctIndex: 2,
    explanation:
      "Classify crises into three tiers: Level 1 (minor complaint), Level 2 (growing negative sentiment), and Level 3 (viral PR crisis). Each tier has different response protocols.",
  },
  {
    type: "multiple-choice",
    question:
      "What is a 'pause protocol' in crisis management?",
    options: [
      "Taking a break from social media permanently",
      "When to pause scheduled content and shift to crisis-only communication",
      "Stopping all employee communication",
      "Deleting your social media accounts",
    ],
    correctIndex: 1,
    explanation:
      "A pause protocol defines when to pause scheduled content and shift to crisis-only communication, preventing tone-deaf posts from going live during a crisis.",
  },
  {
    type: "multiple-choice",
    question:
      "What makes brand advocates feel like insiders rather than promoters?",
    options: [
      "Paying them commissions",
      "Giving them early access, exclusive perks, and a sense of ownership",
      "Requiring them to post daily",
      "Sending them free products only",
    ],
    correctIndex: 1,
    explanation:
      "The best advocacy programs give members early access, exclusive perks, and a sense of ownership. Making them feel like insiders rather than promoters drives authentic advocacy.",
  },
  {
    type: "multiple-choice",
    question:
      "Which platform is best for older demographics and niche interest communities?",
    options: [
      "Discord",
      "Facebook Groups",
      "Slack",
      "TikTok",
    ],
    correctIndex: 1,
    explanation:
      "Facebook Groups are best for older demographics and niche interest communities, offering strong discussion features and member management tools.",
  },
  {
    type: "true-false",
    question:
      "Every brand will eventually face a social media crisis.",
    correctAnswer: true,
    explanation:
      "Every brand will face a social media crisis at some point. The difference between brands that survive and those that suffer lasting damage is preparation.",
  },
  {
    type: "true-false",
    question:
      "Brand advocacy programs should require advocates to post promotional content on a strict schedule.",
    correctAnswer: false,
    explanation:
      "Brand advocacy programs should make members feel like insiders, not promoters. Requiring strict promotional schedules makes advocacy feel forced and inauthentic.",
  },
  {
    type: "multi-select",
    question:
      "What should a crisis management plan include? (Select all that apply)",
    options: [
      "Severity tiers",
      "Escalation chain",
      "Response templates",
      "Competitor sabotage plans",
      "Pause protocol",
      "Post-crisis review",
    ],
    correctIndices: [0, 1, 2, 4, 5],
    explanation:
      "A crisis plan should include severity tiers, escalation chain, response templates, pause protocol, and post-crisis review. Competitor sabotage plans are unethical and not part of crisis management.",
  },
  {
    type: "multi-select",
    question:
      "Which platforms work well for real-time chat communities? (Select all that apply)",
    options: [
      "Discord",
      "Slack",
      "Facebook Groups",
      "Email newsletters",
    ],
    correctIndices: [0, 1],
    explanation:
      "Discord and Slack are best for real-time chat communities. Facebook Groups are discussion-based (not real-time chat), and email newsletters are one-directional communications.",
  },
  {
    type: "ordering",
    question:
      "Arrange the crisis severity levels from least severe to most severe.",
    items: [
      "Level 3 — Viral PR crisis",
      "Level 1 — Minor complaint",
      "Level 2 — Growing negative sentiment",
    ],
    correctOrder: [1, 2, 0],
    explanation:
      "Level 1 is a minor complaint (least severe), Level 2 is growing negative sentiment (moderate), and Level 3 is a viral PR crisis (most severe).",
  },
  {
    type: "multiple-choice",
    question:
      "What should a post-crisis review accomplish?",
    options: [
      "Assign blame to team members",
      "Document learnings and update the crisis management plan",
      "Delete all records of the crisis",
      "Ignore what happened and move on",
    ],
    correctIndex: 1,
    explanation:
      "A post-crisis review is a debrief process to document learnings and update the crisis management plan, ensuring the team is better prepared for future incidents.",
  },
  {
    type: "multi-select",
    question:
      "Which community platforms require dedicated app installation or registration beyond existing social accounts? (Select all that apply)",
    options: [
      "Social media comments",
      "Discord",
      "Slack",
      "Facebook Groups",
      "Owned platforms (Circle, Mighty Networks)",
    ],
    correctIndices: [1, 2, 4],
    explanation:
      "Discord, Slack, and owned platforms like Circle/Mighty Networks require dedicated app installation or separate registration. Social media comments and Facebook Groups use existing accounts.",
  },

  // ── Section 4: Execution & Implementation (12 questions) ───────────
  {
    type: "multiple-choice",
    question:
      "How should the daily community management workflow be structured?",
    options: [
      "One engagement session per week",
      "Three engagement windows: morning, midday, and evening",
      "Only respond when tagged",
      "Automate all responses",
    ],
    correctIndex: 1,
    explanation:
      "Structure your day around three engagement windows: morning (clear overnight messages), midday (proactive engagement), and evening (final response sweep).",
  },
  {
    type: "multiple-choice",
    question:
      "How quickly should you respond to urgent customer complaints?",
    options: [
      "Within 30 minutes",
      "Within 2 hours",
      "Within 24 hours",
      "Within one week",
    ],
    correctIndex: 0,
    explanation:
      "Urgent issues like customer complaints, product issues, and trending negative sentiment should receive a response within 30 minutes.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended formula for handling negative feedback?",
    options: [
      "Delete the comment and block the user",
      "Acknowledge, apologize, explain resolution, and follow up",
      "Ignore it and hope it goes away",
      "Respond with a legal threat",
    ],
    correctIndex: 1,
    explanation:
      "The formula for handling negative feedback is: Acknowledge the issue, apologize sincerely, explain the resolution, and follow up to confirm satisfaction.",
  },
  {
    type: "multiple-choice",
    question:
      "Why should you never delete legitimate complaints?",
    options: [
      "It's against platform rules",
      "It escalates frustration and damages trust",
      "Deleted comments reappear automatically",
      "It improves your engagement rate",
    ],
    correctIndex: 1,
    explanation:
      "Never delete legitimate complaints — it escalates frustration and damages trust. Respond publicly with empathy, then move to DMs for resolution.",
  },
  {
    type: "multiple-choice",
    question:
      "What type of inbox tool helps manage community interactions across platforms?",
    options: [
      "Email clients like Gmail",
      "Unified inbox tools like Sprout Social or Hootsuite",
      "Calendar apps",
      "Project management tools",
    ],
    correctIndex: 1,
    explanation:
      "Use a unified inbox tool like Sprout Social or Hootsuite to manage all platform interactions from one dashboard, ensuring no community messages are missed.",
  },
  {
    type: "true-false",
    question:
      "Low-priority comments like spam and off-topic messages should still be moderated.",
    correctAnswer: true,
    explanation:
      "Low-priority comments (spam, off-topic, emoji-only) should be acknowledged or moderated as appropriate to maintain community quality and standards.",
  },
  {
    type: "true-false",
    question:
      "Negative feedback should always be handled entirely in public view.",
    correctAnswer: false,
    explanation:
      "Respond publicly with empathy and accountability, then move the conversation to DMs for resolution. This shows the community you care while handling sensitive details privately.",
  },
  {
    type: "multi-select",
    question:
      "Which are the response priority categories? (Select all that apply)",
    options: [
      "Urgent (within 30 minutes)",
      "High Priority (within 2 hours)",
      "Standard (within 4-8 hours)",
      "Critical (within 5 minutes)",
      "Low Priority (moderate as appropriate)",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "The response framework includes Urgent (30 min), High Priority (2 hours), Standard (4-8 hours), and Low Priority (moderate as appropriate). 'Critical (5 minutes)' is not a defined tier.",
  },
  {
    type: "multi-select",
    question:
      "What should a UGC collection system include? (Select all that apply)",
    options: [
      "Monitoring branded hashtags and @mentions daily",
      "Using tools like TINT or Pixlee to track UGC",
      "Reaching out for permission to reshare",
      "Automatically resharing without permission",
      "A content library organized by platform and theme",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "A UGC system should include daily monitoring, tracking tools, permission requests, and an organized content library. Never reshare UGC without permission.",
  },
  {
    type: "ordering",
    question:
      "Arrange the negative feedback response steps in the correct order.",
    items: [
      "Follow up to confirm satisfaction",
      "Acknowledge the issue",
      "Explain the resolution",
      "Apologize sincerely",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "First acknowledge the issue, then apologize sincerely, explain the resolution, and follow up to confirm the customer is satisfied.",
  },
  {
    type: "multiple-choice",
    question:
      "What should the morning engagement window focus on?",
    options: [
      "Creating new content",
      "Clearing overnight messages, responding to comments, checking sentiment",
      "Running paid ads",
      "Analyzing competitor content",
    ],
    correctIndex: 1,
    explanation:
      "The morning window should focus on clearing overnight messages, responding to comments, and checking community sentiment to address any issues that arose overnight.",
  },
  {
    type: "ordering",
    question:
      "Arrange the daily community management workflow windows in order.",
    items: [
      "Evening — Final response sweep, flag escalations",
      "Morning — Clear overnight messages, check sentiment",
      "Midday — Proactive engagement, post prompts, monitor",
    ],
    correctOrder: [1, 2, 0],
    explanation:
      "The daily workflow follows: Morning (clear overnight messages and check sentiment), Midday (proactive engagement and monitoring), and Evening (final response sweep and escalation flagging).",
  },

  // ── Section 5: Measurement & Optimization (12 questions) ───────────
  {
    type: "multiple-choice",
    question:
      "What is the response time benchmark for business hours?",
    options: [
      "Under 30 seconds",
      "Under 2 hours",
      "Under 24 hours",
      "Under 1 week",
    ],
    correctIndex: 1,
    explanation:
      "The benchmark for average response time is under 2 hours during business hours. Faster response times correlate with higher community satisfaction.",
  },
  {
    type: "multiple-choice",
    question:
      "What is a healthy Active Member Rate for a community?",
    options: ["1-5%", "10-15%", "20-30%", "80-90%"],
    correctIndex: 2,
    explanation:
      "Healthy communities see 20-30% active member rate, meaning that percentage of community members engage at least once per month.",
  },
  {
    type: "multiple-choice",
    question: "What is a Community Health Score?",
    options: [
      "A medical assessment of community members",
      "A composite metric combining sentiment ratio, active member rate, response time, and growth rate",
      "The number of posts in the community",
      "A rating given by community platforms",
    ],
    correctIndex: 1,
    explanation:
      "A Community Health Score is a composite metric that combines sentiment ratio, active member rate, response time, and growth rate into a single monthly metric.",
  },
  {
    type: "multiple-choice",
    question:
      "How often should you track the Community Health Score?",
    options: ["Daily", "Weekly", "Monthly", "Annually"],
    correctIndex: 2,
    explanation:
      "Track the Community Health Score monthly to identify trends and trigger intervention when metrics dip below acceptable thresholds.",
  },
  {
    type: "multiple-choice",
    question:
      "What makes community management a strategic function rather than just a support role?",
    options: [
      "Having a large team",
      "Surfacing community insights to product, marketing, and leadership teams",
      "Responding to every comment",
      "Using expensive tools",
    ],
    correctIndex: 1,
    explanation:
      "Building a process for surfacing community insights to product, marketing, and leadership teams transforms community management from a support role into a strategic function.",
  },
  {
    type: "multiple-choice",
    question:
      "What should a monthly community insights report summarize?",
    options: [
      "Only positive feedback",
      "Top themes, feature requests, common complaints, and sentiment trends",
      "Competitor community sizes",
      "Employee performance reviews",
    ],
    correctIndex: 1,
    explanation:
      "A monthly community insights report should summarize top themes, feature requests, common complaints, and sentiment trends to inform business decisions.",
  },
  {
    type: "true-false",
    question:
      "UGC Volume (user-generated posts per month) indicates organic brand advocacy.",
    correctAnswer: true,
    explanation:
      "UGC Volume — the number of user-generated posts per month — is a key indicator of organic brand advocacy, showing how much your community naturally promotes your brand.",
  },
  {
    type: "true-false",
    question:
      "Community-Driven Revenue is impossible to track or attribute.",
    correctAnswer: false,
    explanation:
      "Community-Driven Revenue can be tracked through conversions, referral codes, and purchases attributed to community members. While attribution can be complex, it is not impossible.",
  },
  {
    type: "multi-select",
    question:
      "Which metrics make up the Community Health Score? (Select all that apply)",
    options: [
      "Sentiment ratio",
      "Active member rate",
      "Response time",
      "Number of social media platforms used",
      "Growth rate",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "The Community Health Score combines sentiment ratio, active member rate, response time, and growth rate. The number of platforms used is an operational choice, not a health metric.",
  },
  {
    type: "multi-select",
    question:
      "What should a community insights report inform? (Select all that apply)",
    options: [
      "Product team decisions",
      "Marketing strategy",
      "Leadership priorities",
      "Competitor pricing",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Community insights should inform product team decisions, marketing strategy, and leadership priorities. Competitor pricing is gathered through market research, not community insights.",
  },
  {
    type: "ordering",
    question:
      "Arrange community management metrics from quantitative to qualitative.",
    items: [
      "Common complaint themes",
      "Response time",
      "Feature request analysis",
      "Active member rate",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "Response time and active member rate are purely quantitative metrics, common complaint themes require qualitative categorization, and feature request analysis is the most qualitative requiring interpretation.",
  },
  {
    type: "ordering",
    question:
      "Rank these community health indicators from easiest to hardest to measure.",
    items: [
      "Community-driven revenue attribution",
      "Response time",
      "Sentiment ratio",
      "Active member rate",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "Response time is easiest to measure (simple time tracking), active member rate requires engagement tracking, sentiment ratio needs analysis tools, and community-driven revenue attribution is the most complex requiring multi-touch tracking.",
  },
];
