import type { QuizQuestion } from "@/lib/academy-data";

export const linkedinContentStrategyQuiz: QuizQuestion[] = [
  // ── Section 1: Introduction & Overview (12 questions) ──────────────
  {
    type: "multiple-choice",
    question: "How many members does LinkedIn have?",
    options: [
      "100 million",
      "500 million",
      "Over 1 billion",
      "5 billion",
    ],
    correctIndex: 2,
    explanation:
      "LinkedIn has over 1 billion members, making it the world's largest professional networking platform and a powerful B2B content platform.",
  },
  {
    type: "multiple-choice",
    question:
      "What fraction of LinkedIn members drive business decisions?",
    options: [
      "1 out of 5",
      "2 out of 5",
      "3 out of 5",
      "4 out of 5",
    ],
    correctIndex: 3,
    explanation:
      "4 out of 5 LinkedIn members drive business decisions, which is why the platform has the highest-converting organic social media presence for B2B companies.",
  },
  {
    type: "multiple-choice",
    question:
      "How long can a single LinkedIn post generate engagement?",
    options: [
      "2-4 hours",
      "24-72 hours or more",
      "One week exactly",
      "30 days minimum",
    ],
    correctIndex: 1,
    explanation:
      "Unlike other social platforms where content is fleeting, a single LinkedIn post can generate engagement for 24-72 hours or more.",
  },
  {
    type: "multiple-choice",
    question:
      "Why is LinkedIn considered the highest-converting organic social platform for B2B?",
    options: [
      "It has the most users overall",
      "Users are in a professional context and primed for business conversations",
      "LinkedIn ads are the cheapest",
      "It has the best video editing tools",
    ],
    correctIndex: 1,
    explanation:
      "LinkedIn's professional context means users are primed for business conversations, making it the highest-converting organic social platform for B2B companies.",
  },
  {
    type: "true-false",
    question:
      "LinkedIn has transformed from a digital resume repository into a powerful B2B content platform.",
    correctAnswer: true,
    explanation:
      "LinkedIn has evolved beyond its origins as a digital resume repository into the world's most powerful B2B content platform with rising organic reach.",
  },
  {
    type: "true-false",
    question:
      "LinkedIn content typically stops generating impressions within 2-4 hours of posting.",
    correctAnswer: false,
    explanation:
      "LinkedIn content has a long lifespan — posts continue generating impressions 48-72 hours after publishing, much longer than most social platforms.",
  },
  {
    type: "multi-select",
    question:
      "What are LinkedIn's unique advantages for marketers? (Select all that apply)",
    options: [
      "Strong organic reach for consistent creators",
      "Professional context with business-minded audiences",
      "Guaranteed viral distribution",
      "Long content lifespan (48-72 hours)",
      "Higher quality leads closer to purchase decisions",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "LinkedIn offers strong organic reach, professional context, long content lifespan, and higher quality leads. No platform guarantees viral distribution.",
  },
  {
    type: "multi-select",
    question:
      "What does this lesson cover? (Select all that apply)",
    options: [
      "LinkedIn algorithm",
      "Personal branding",
      "Instagram Reels strategy",
      "Hook writing",
      "Sales Navigator",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "This lesson covers the LinkedIn algorithm, personal branding, content formats, hook writing, strategic commenting, and Sales Navigator. Instagram Reels strategy belongs to the Instagram Marketing lesson.",
  },
  {
    type: "ordering",
    question:
      "Rank LinkedIn's benefits from broadest impact to most specific.",
    items: [
      "Higher quality leads",
      "Organic reach for creators",
      "Professional audience context",
      "Long content lifespan",
    ],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "Professional audience context is the broadest benefit, organic reach impacts all creators, long content lifespan extends each post's value, and higher quality leads is the most specific business outcome.",
  },
  {
    type: "multiple-choice",
    question:
      "What type of companies benefit most from LinkedIn marketing?",
    options: [
      "Only Fortune 500 companies",
      "B2B companies of any size",
      "Only consumer product brands",
      "Only recruiting agencies",
    ],
    correctIndex: 1,
    explanation:
      "B2B companies of any size benefit most from LinkedIn marketing because the platform's professional context and decision-maker audience align perfectly with B2B sales cycles.",
  },
  {
    type: "multiple-choice",
    question:
      "What makes LinkedIn leads typically higher quality than other social platforms?",
    options: [
      "They cost more to acquire",
      "They are closer to purchase decisions due to the professional context",
      "They have more social media followers",
      "They respond faster to cold emails",
    ],
    correctIndex: 1,
    explanation:
      "LinkedIn leads tend to be higher quality and closer to purchase decisions because users are in a professional, business-minded context when engaging with content.",
  },
  {
    type: "multi-select",
    question:
      "Which social platforms have a longer organic content lifespan than Twitter/X? (Select all that apply)",
    options: [
      "LinkedIn (48-72+ hours)",
      "TikTok (24-48 hours)",
      "Instagram Feed (24-48 hours)",
      "Snapchat (24 hours max)",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Twitter/X has the shortest organic content lifespan at 15-30 minutes. LinkedIn (48-72+ hours), TikTok (24-48 hours), Instagram Feed (24-48 hours), and even Snapchat (24 hours) all last longer.",
  },

  // ── Section 2: Core Concepts (12 questions) ────────────────────────
  {
    type: "multiple-choice",
    question:
      "What is the first step in LinkedIn's algorithm evaluation process?",
    options: [
      "Showing the post to your entire network",
      "Classifying the post as spam, low-quality, or high-quality",
      "Counting the number of hashtags",
      "Checking your follower count",
    ],
    correctIndex: 1,
    explanation:
      "LinkedIn's algorithm first classifies your post as spam, low-quality, or high-quality before any distribution occurs.",
  },
  {
    type: "multiple-choice",
    question:
      "What percentage of your network typically sees your post in the initial test?",
    options: ["1-2%", "8-10%", "25-30%", "50%"],
    correctIndex: 1,
    explanation:
      "High-quality posts are shown to a small test audience of roughly 8-10% of your network. If early engagement is strong, the algorithm expands distribution.",
  },
  {
    type: "multiple-choice",
    question:
      "Which engagement signal does LinkedIn weight heavily for content distribution?",
    options: [
      "Like count only",
      "Comment velocity and dwell time",
      "Share count only",
      "Profile photo quality",
    ],
    correctIndex: 1,
    explanation:
      "Key ranking signals include comment velocity (how quickly comments arrive) and dwell time (how long readers spend on your post). These indicate genuine engagement.",
  },
  {
    type: "multiple-choice",
    question:
      "What type of content has LinkedIn begun prioritizing?",
    options: [
      "Viral engagement-bait posts",
      "Knowledge and advice content",
      "Memes and entertainment",
      "Controversial political content",
    ],
    correctIndex: 1,
    explanation:
      "LinkedIn has begun prioritizing 'knowledge and advice' content over viral or engagement-bait posts, rewarding genuine expertise.",
  },
  {
    type: "multiple-choice",
    question:
      "Why do personal brands outperform company pages on LinkedIn?",
    options: [
      "Company pages are not allowed to post",
      "People want to connect with people, not logos",
      "Company pages have algorithmic penalties",
      "Personal profiles can use more hashtags",
    ],
    correctIndex: 1,
    explanation:
      "Personal brands consistently outperform company pages because people want to connect with people, not logos. The personal connection drives higher engagement.",
  },
  {
    type: "multiple-choice",
    question:
      "What determines whether someone clicks 'see more' on your LinkedIn post?",
    options: [
      "Your profile picture",
      "The first 2-3 lines (the hook)",
      "The number of hashtags",
      "Your job title",
    ],
    correctIndex: 1,
    explanation:
      "The first 2-3 lines of your LinkedIn post determine whether someone clicks 'see more.' Effective hooks create curiosity, make bold claims, or share surprising statistics.",
  },
  {
    type: "true-false",
    question:
      "LinkedIn carousels (PDF documents) have the highest save and share rates among content formats.",
    correctAnswer: true,
    explanation:
      "Carousels (document posts with swipeable slides) generate the highest save and share rates on LinkedIn. They're excellent for frameworks and tutorials.",
  },
  {
    type: "true-false",
    question:
      "Clickbait hooks are recommended on LinkedIn because they increase 'see more' clicks.",
    correctAnswer: false,
    explanation:
      "Avoid clickbait — deliver on the promise your hook makes. LinkedIn has been actively penalizing engagement-bait content and prioritizing genuine knowledge-sharing.",
  },
  {
    type: "multi-select",
    question:
      "Which are key ranking signals for the LinkedIn algorithm? (Select all that apply)",
    options: [
      "Comment velocity",
      "Dwell time",
      "Follower count",
      "Relevance to your network",
      "Credibility of people engaging",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Key LinkedIn ranking signals include comment velocity, dwell time, relevance to your network, and the credibility of people engaging. Follower count is not a primary ranking signal.",
  },
  {
    type: "multi-select",
    question:
      "What are the three elements of a LinkedIn personal brand? (Select all that apply)",
    options: [
      "Your profile (foundation)",
      "Your follower count",
      "Your content (engine)",
      "Your engagement (accelerant)",
      "Your job title",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "A LinkedIn personal brand is built through three elements: your profile (the foundation), your content (the engine), and your engagement (the accelerant).",
  },
  {
    type: "ordering",
    question:
      "Arrange the LinkedIn algorithm distribution stages in order.",
    items: [
      "Expand to wider audience including 2nd/3rd connections",
      "Classify post quality",
      "Show to test audience (8-10% of network)",
      "Evaluate early engagement signals",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "LinkedIn first classifies post quality, shows it to a test audience (8-10% of network), evaluates early engagement signals, and then expands to a wider audience if signals are strong.",
  },
  {
    type: "multi-select",
    question:
      "Which LinkedIn content formats typically generate high save and share rates? (Select all that apply)",
    options: [
      "Carousels (PDF)",
      "Text-only posts",
      "Video posts",
      "Polls",
      "Job postings",
    ],
    correctIndices: [0, 2],
    explanation:
      "Carousels (PDF) have the highest save and share rates, and video posts also generate strong saves and shares. Text posts, polls, and job postings generate engagement but have lower save/share rates.",
  },

  // ── Section 3: Strategy & Planning (12 questions) ──────────────────
  {
    type: "multiple-choice",
    question:
      "How many content pillars should you choose for LinkedIn?",
    options: ["1-2", "3-5", "8-10", "15+"],
    correctIndex: 1,
    explanation:
      "Choose 3-5 pillars that sit at the intersection of your expertise and your audience's needs. Rotate through pillars weekly for a fresh yet focused feed.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended starting posting frequency for LinkedIn?",
    options: [
      "1 post per week",
      "3 posts per week, scaling to 5",
      "10 posts per week",
      "Multiple posts per day",
    ],
    correctIndex: 1,
    explanation:
      "Start with 3 posts per week and scale to 5 as you build a content library. Consistency outweighs frequency on LinkedIn.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the optimal time gap between LinkedIn posts?",
    options: [
      "2-4 hours",
      "6-8 hours",
      "18-24 hours",
      "48-72 hours",
    ],
    correctIndex: 2,
    explanation:
      "Allow at least 18-24 hours between posts so they do not compete with each other for algorithmic distribution.",
  },
  {
    type: "multiple-choice",
    question:
      "How many strategic comments per day are recommended for LinkedIn growth?",
    options: ["1-3", "5-7", "15-20", "50+"],
    correctIndex: 2,
    explanation:
      "Target 15-20 strategic comments per day on posts from people in your niche, industry leaders, and ideal clients. A thoughtful comment on a viral post can generate thousands of profile views.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the primary purpose of Sales Navigator for content strategy?",
    options: [
      "Sending cold InMails",
      "Identifying your ideal audience and tailoring content to their pain points",
      "Boosting LinkedIn posts",
      "Purchasing LinkedIn Premium",
    ],
    correctIndex: 1,
    explanation:
      "Sales Navigator helps you identify your ideal audience, monitor their activity, and tailor content to their pain points. It informs what you should write about and who you should connect with.",
  },
  {
    type: "true-false",
    question:
      "Commenting on other creators' posts is the most underrated LinkedIn growth strategy.",
    correctAnswer: true,
    explanation:
      "Strategic commenting is the most underrated LinkedIn growth strategy. A thoughtful comment on a viral post can generate thousands of profile views and new connection requests.",
  },
  {
    type: "true-false",
    question:
      "You should post on LinkedIn during weekends for the highest engagement.",
    correctAnswer: false,
    explanation:
      "Post during business hours in your target audience's timezone — typically Tuesday through Thursday between 7-9 AM. Weekends typically see lower engagement on LinkedIn.",
  },
  {
    type: "multi-select",
    question:
      "What does the 5-3-1 daily LinkedIn routine include? (Select all that apply)",
    options: [
      "5 thoughtful comments on niche creators' posts",
      "5 connection requests to strangers",
      "3 DM conversations",
      "1 original post on a chosen content pillar",
      "1 LinkedIn article",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "The 5-3-1 routine consists of 5 thoughtful comments on niche creators' posts, 3 DM conversations with connections, and 1 original post on a chosen content pillar.",
  },
  {
    type: "multi-select",
    question:
      "Which are common LinkedIn content pillar categories? (Select all that apply)",
    options: [
      "Industry Insights",
      "Lessons Learned",
      "How-To Frameworks",
      "Personal vacation photos",
      "Contrarian Takes",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Common LinkedIn pillar categories include Industry Insights, Lessons Learned, How-To Frameworks, Career Advice, and Contrarian Takes. Personal vacation photos are not typically a LinkedIn content pillar.",
  },
  {
    type: "ordering",
    question:
      "Arrange the strategic commenting approach from most to least important.",
    items: [
      "Share a relevant experience or counterpoint",
      "Read the full post carefully",
      "Target posts from ideal clients and industry leaders",
      "Add additional resources or insights",
    ],
    correctOrder: [2, 1, 0, 3],
    explanation:
      "First target the right posts from ideal clients and industry leaders, read the full post carefully, share a relevant experience or counterpoint, and add additional resources for maximum value.",
  },
  {
    type: "multiple-choice",
    question:
      "When should you post on LinkedIn for maximum engagement?",
    options: [
      "Late at night (10 PM - 12 AM)",
      "Tuesday through Thursday, 7-9 AM in your target timezone",
      "Saturday and Sunday mornings",
      "Posting time has zero impact on engagement",
    ],
    correctIndex: 1,
    explanation:
      "Post during business hours in your target audience's timezone — typically Tuesday through Thursday between 7-9 AM for maximum engagement.",
  },
  {
    type: "ordering",
    question:
      "Order the LinkedIn growth strategies from organic (free) to paid.",
    items: [
      "Sales Navigator",
      "Strategic commenting",
      "LinkedIn Ads",
      "Original post creation",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "Strategic commenting and original post creation are fully organic (free), Sales Navigator requires a subscription, and LinkedIn Ads are the fully paid option.",
  },

  // ── Section 4: Execution & Implementation (12 questions) ───────────
  {
    type: "multiple-choice",
    question: "What does the AIDA framework stand for in LinkedIn post writing?",
    options: [
      "Audience, Interest, Data, Analytics",
      "Attention, Interest, Desire, Action",
      "Algorithm, Impressions, Distribution, Analytics",
      "Authenticity, Insight, Discovery, Advocacy",
    ],
    correctIndex: 1,
    explanation:
      "AIDA stands for Attention (hook), Interest (context or story), Desire (insight or framework), and Action (CTA or question). It's a proven structure for high-performing LinkedIn posts.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended paragraph length for LinkedIn posts?",
    options: [
      "5-6 sentences per paragraph",
      "1-2 sentences maximum per paragraph",
      "One continuous block of text",
      "Paragraph length doesn't matter",
    ],
    correctIndex: 1,
    explanation:
      "Use short paragraphs (1-2 sentences max) with line breaks for scanability. LinkedIn posts need to be easy to skim on mobile devices.",
  },
  {
    type: "multiple-choice",
    question:
      "How many content slides should a LinkedIn carousel have?",
    options: [
      "2-3 slides",
      "A bold title slide, 6-10 content slides, and a CTA slide",
      "50+ slides for maximum value",
      "Exactly 3 slides",
    ],
    correctIndex: 1,
    explanation:
      "Design carousels with a bold title slide, 6-10 content slides with one key idea per slide, and a CTA slide at the end.",
  },
  {
    type: "multiple-choice",
    question:
      "What format should LinkedIn carousels be uploaded as?",
    options: ["JPEG images", "PDFs", "PowerPoint files", "MP4 videos"],
    correctIndex: 1,
    explanation:
      "LinkedIn carousels are uploaded as PDF documents, which the platform renders as swipeable slides.",
  },
  {
    type: "multiple-choice",
    question:
      "How should every LinkedIn post end?",
    options: [
      "With a series of hashtags",
      "With a question to spark comments or a clear call to action",
      "With your contact information",
      "Posts don't need endings",
    ],
    correctIndex: 1,
    explanation:
      "End every post with either a question to spark comments or a clear call to action. This drives engagement and tells the algorithm your content generates conversation.",
  },
  {
    type: "true-false",
    question:
      "Employee advocacy programs can multiply a company's LinkedIn reach by 10x or more.",
    correctAnswer: true,
    explanation:
      "Encouraging employees to create their own content through employee advocacy programs can multiply a company's LinkedIn reach by 10x or more.",
  },
  {
    type: "true-false",
    question:
      "Your LinkedIn headline should simply state your job title and nothing else.",
    correctAnswer: false,
    explanation:
      "Optimize your headline to communicate the value you provide, not just your job title. Use a format like 'I help [audience] achieve [result]' for maximum impact.",
  },
  {
    type: "multi-select",
    question:
      "Which elements should your LinkedIn profile include? (Select all that apply)",
    options: [
      "Professional headshot with clean background",
      "Value-communicating headline",
      "Custom banner image",
      "Personal phone number in the headline",
      "Featured section with best content",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Your profile should include a professional headshot, value-communicating headline, custom banner image, compelling About section, and a Featured section. Avoid putting personal phone numbers in your headline.",
  },
  {
    type: "multi-select",
    question:
      "Which tools are good for creating LinkedIn carousel (PDF) content? (Select all that apply)",
    options: [
      "Canva",
      "Figma",
      "PowerPoint",
      "Instagram",
      "TikTok",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Canva, Figma, and PowerPoint are all effective tools for creating LinkedIn carousel content that can be exported as PDFs. Instagram and TikTok are not carousel design tools.",
  },
  {
    type: "ordering",
    question:
      "Arrange the AIDA framework steps for a LinkedIn post in order.",
    items: [
      "Desire (insight or framework)",
      "Attention (hook)",
      "Action (CTA or question)",
      "Interest (context or story)",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "The AIDA framework follows: Attention (hook to stop the scroll), Interest (context or story to engage), Desire (insight or framework to deliver value), Action (CTA or question to drive engagement).",
  },
  {
    type: "multiple-choice",
    question:
      "What should the company page focus on while personal profiles drive content?",
    options: [
      "Identical content to personal profiles",
      "Employer branding, product updates, and thought leadership reposts",
      "Only job postings",
      "Memes and entertainment content",
    ],
    correctIndex: 1,
    explanation:
      "The company page should focus on employer branding, product updates, and thought leadership reposts while personal profiles drive the primary content strategy.",
  },
  {
    type: "ordering",
    question:
      "Arrange the LinkedIn profile optimization steps from most foundational to finishing touches.",
    items: [
      "Add a Featured section",
      "Upload a professional headshot",
      "Write a value-driven headline",
      "Create a custom banner image",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Start with a professional headshot (most foundational), write a compelling headline, create a custom banner, and add a Featured section as the finishing touch.",
  },

  // ── Section 5: Measurement & Optimization (12 questions) ───────────
  {
    type: "multiple-choice",
    question:
      "What is a strong engagement rate benchmark for LinkedIn?",
    options: ["0.1-0.5%", "2-5%", "15-20%", "50%+"],
    correctIndex: 1,
    explanation:
      "A 2-5% engagement rate ((Reactions + Comments + Reposts) / Impressions) is considered strong on LinkedIn.",
  },
  {
    type: "multiple-choice",
    question:
      "What does the Social Selling Index (SSI) measure?",
    options: [
      "Your total revenue from LinkedIn",
      "A score from 0-100 based on four pillars: brand, finding people, engaging with insights, and building relationships",
      "The number of products you've sold through LinkedIn",
      "Your posting frequency score",
    ],
    correctIndex: 1,
    explanation:
      "LinkedIn's SSI scores users from 0-100 based on four pillars: establishing your professional brand, finding the right people, engaging with insights, and building relationships.",
  },
  {
    type: "multiple-choice",
    question:
      "At what SSI score do users typically see significantly better content distribution?",
    options: ["Above 30", "Above 50", "Above 70", "Above 95"],
    correctIndex: 2,
    explanation:
      "Users with SSI above 70 typically see significantly better content distribution on LinkedIn.",
  },
  {
    type: "multiple-choice",
    question:
      "How often should you audit your LinkedIn content?",
    options: ["Daily", "Every 30 days", "Quarterly", "Annually"],
    correctIndex: 1,
    explanation:
      "Every 30 days, review your top 5 posts by impressions and engagement. Look for patterns in hooks, formats, and topics to inform your next month's content calendar.",
  },
  {
    type: "multiple-choice",
    question:
      "Which metric indicates your content is attracting the right audience?",
    options: [
      "Total impressions",
      "Inbound connection requests",
      "Number of posts published",
      "Hashtag reach",
    ],
    correctIndex: 1,
    explanation:
      "Inbound connection requests indicate your content is attracting the right audience — people who are interested enough to proactively connect with you.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the ultimate B2B metric for LinkedIn success?",
    options: [
      "Follower count",
      "Number of likes",
      "Inbound leads (DMs, meeting requests, form fills)",
      "Number of connections",
    ],
    correctIndex: 2,
    explanation:
      "Inbound leads — DMs, meeting requests, or form fills from LinkedIn — are the ultimate B2B metric because they directly measure business pipeline impact.",
  },
  {
    type: "true-false",
    question:
      "Profile views are a useful metric because they indicate how many people visited your profile after seeing your content.",
    correctAnswer: true,
    explanation:
      "Profile views measure how many people visited your profile after seeing your content, indicating interest in learning more about you and your offerings.",
  },
  {
    type: "true-false",
    question:
      "You should track your Social Selling Index (SSI) annually for meaningful insights.",
    correctAnswer: false,
    explanation:
      "Track your SSI monthly, not annually. Monthly tracking allows you to see how your LinkedIn activities correlate with your SSI score and content distribution.",
  },
  {
    type: "multi-select",
    question:
      "Which are the four pillars of LinkedIn's Social Selling Index? (Select all that apply)",
    options: [
      "Establishing your professional brand",
      "Finding the right people",
      "Posting frequency",
      "Engaging with insights",
      "Building relationships",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "The four SSI pillars are: establishing your professional brand, finding the right people, engaging with insights, and building relationships. Posting frequency is not a separate SSI pillar.",
  },
  {
    type: "multi-select",
    question:
      "What should your monthly LinkedIn content audit examine? (Select all that apply)",
    options: [
      "Which hooks worked best",
      "Which formats drove comments",
      "Competitor employee headcounts",
      "Which topics generated profile views",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Your monthly audit should examine which hooks worked, which formats drove comments, and which topics generated profile views. Competitor employee headcounts are not part of a content audit.",
  },
  {
    type: "ordering",
    question:
      "Arrange LinkedIn metrics from leading indicators to lagging business outcomes.",
    items: [
      "Inbound leads",
      "Impressions",
      "Profile views",
      "Engagement rate",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "Impressions are the earliest indicator (content was seen), engagement rate shows content resonance, profile views indicate interest, and inbound leads are the final business outcome.",
  },
  {
    type: "ordering",
    question:
      "Rank these LinkedIn analytics sources from most accessible to requiring a subscription.",
    items: [
      "Sales Navigator analytics",
      "Personal profile analytics",
      "LinkedIn company page analytics",
      "Third-party tools (Sprout Social)",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Personal profile analytics are free for all Professional accounts, company page analytics are free for page admins, third-party tools require a subscription, and Sales Navigator analytics require LinkedIn's premium subscription.",
  },
];
