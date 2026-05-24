import type { QuizQuestion } from "@/lib/academy-data";

export const instagramMarketingQuiz: QuizQuestion[] = [
  // ── Section 1: Introduction & Overview (12 questions) ──────────────
  {
    type: "multiple-choice",
    question: "Approximately how many monthly active users does Instagram have?",
    options: [
      "500 million",
      "1 billion",
      "Over 2 billion",
      "5 billion",
    ],
    correctIndex: 2,
    explanation:
      "Instagram has over 2 billion monthly active users, making it one of the most powerful marketing platforms in the world.",
  },
  {
    type: "multiple-choice",
    question:
      "What percentage of time spent on Instagram is now attributed to Reels?",
    options: ["10%", "25%", "Over 50%", "90%"],
    correctIndex: 2,
    explanation:
      "Reels now account for over 50% of time spent on the platform, reflecting Instagram's shift to a video-first model.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the primary growth lever for most brands on Instagram in 2026?",
    options: [
      "Buying followers",
      "Only posting static images",
      "Discoverability through Reels and the Explore page",
      "Sending mass DMs",
    ],
    correctIndex: 2,
    explanation:
      "The algorithm increasingly surfaces content from accounts users do not follow, making discoverability through Reels and the Explore page the primary growth lever.",
  },
  {
    type: "multiple-choice",
    question:
      "Which Instagram feature provides ephemeral 24-hour content?",
    options: ["Reels", "Stories", "Feed Posts", "Instagram Shopping"],
    correctIndex: 1,
    explanation:
      "Stories are ephemeral 24-hour content designed for engagement, polls, and direct interaction with your audience.",
  },
  {
    type: "true-false",
    question:
      "Instagram is still primarily a photo-sharing app with limited video capabilities.",
    correctAnswer: false,
    explanation:
      "Instagram has evolved far beyond a photo-sharing app into a full commerce, entertainment, and community platform, with a firm shift toward video-first content.",
  },
  {
    type: "true-false",
    question:
      "Instagram Shopping allows e-commerce brands to tag products directly in posts, Reels, and Stories.",
    correctAnswer: true,
    explanation:
      "Instagram Shopping provides native product tagging and checkout features that allow e-commerce brands to tag products in feed posts, Reels, and Stories.",
  },
  {
    type: "multi-select",
    question:
      "Which are primary content formats on Instagram? (Select all that apply)",
    options: [
      "Reels",
      "Stories",
      "Long-form blog posts",
      "Feed Posts (carousels and images)",
      "Instagram Shopping",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Instagram's primary content formats include Reels, Stories, Feed Posts (carousels and images), and Instagram Shopping. Long-form blog posts are not a native Instagram format.",
  },
  {
    type: "multi-select",
    question:
      "What makes Instagram valuable for marketers? (Select all that apply)",
    options: [
      "Visual storytelling capabilities",
      "Sophisticated algorithm rewarding quality content",
      "Guaranteed viral reach for every post",
      "Direct shopping integrations",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Instagram offers visual storytelling, a sophisticated algorithm, and direct shopping integrations. No platform guarantees viral reach for every post.",
  },
  {
    type: "ordering",
    question:
      "Rank these Instagram features by their primary purpose from awareness (top) to conversion (bottom).",
    items: [
      "Instagram Shopping",
      "Reels",
      "Stories engagement stickers",
      "Feed carousels",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "Reels drive top-of-funnel awareness, feed carousels provide education and brand building, Stories engagement stickers deepen relationships, and Instagram Shopping converts interest into purchases.",
  },
  {
    type: "multiple-choice",
    question: "Which format has the highest organic reach potential on Instagram?",
    options: [
      "Static single images",
      "Text-only posts",
      "Reels",
      "IGTV long-form videos",
    ],
    correctIndex: 2,
    explanation:
      "Reels are Instagram's highest-reach format, with short-form video (up to 90 seconds) having the greatest organic reach potential.",
  },
  {
    type: "multiple-choice",
    question: "What is the maximum duration for an Instagram Reel?",
    options: ["15 seconds", "30 seconds", "60 seconds", "90 seconds"],
    correctIndex: 3,
    explanation:
      "Instagram Reels can be up to 90 seconds long, though shorter Reels (15-30 seconds) tend to have higher completion rates.",
  },
  {
    type: "multi-select",
    question:
      "Which features did Instagram add as it evolved beyond a photo-sharing app? (Select all that apply)",
    options: [
      "Stories (ephemeral 24-hour content)",
      "Reels (short-form video)",
      "Instagram Shopping",
      "Podcast hosting",
      "Explore page algorithm",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Instagram evolved by adding Stories, Reels, Shopping, and the Explore page algorithm. Podcast hosting is not an Instagram feature.",
  },

  // ── Section 2: Core Concepts (12 questions) ────────────────────────
  {
    type: "multiple-choice",
    question:
      "How many algorithms does Instagram use?",
    options: [
      "One universal algorithm",
      "Two (one for feed, one for Stories)",
      "Multiple algorithms tailored to each surface (Feed, Stories, Explore, Reels)",
      "No algorithms — content is shown chronologically",
    ],
    correctIndex: 2,
    explanation:
      "Instagram does not have a single algorithm. It uses multiple algorithms and classifiers tailored to each surface: Feed, Stories, Explore, and Reels.",
  },
  {
    type: "multiple-choice",
    question:
      "Which is the most critical time window for capturing attention with a Reel?",
    options: [
      "The last 5 seconds",
      "The first 1-3 seconds",
      "The middle portion",
      "The caption below the Reel",
    ],
    correctIndex: 1,
    explanation:
      "The first 1-3 seconds are critical for Reels — you need a strong hook to stop the scroll and prevent viewers from swiping away.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the optimal number of hashtags recommended by Instagram's own team?",
    options: [
      "30 hashtags for maximum reach",
      "3-5 highly relevant hashtags",
      "Zero hashtags — they no longer matter",
      "15-20 hashtags per post",
    ],
    correctIndex: 1,
    explanation:
      "Instagram's own team has suggested that 3-5 highly relevant hashtags outperform 30 random ones. Quality and relevance matter more than quantity.",
  },
  {
    type: "multiple-choice",
    question:
      "Where should hashtags be placed for maximum indexing on Instagram?",
    options: [
      "In the comments section",
      "In the caption",
      "In the bio",
      "In Story text",
    ],
    correctIndex: 1,
    explanation:
      "Place hashtags in the caption (not comments) for maximum indexing. Instagram indexes caption hashtags more reliably for search and discovery.",
  },
  {
    type: "multi-select",
    question:
      "Which signals does the Reels algorithm heavily weight? (Select all that apply)",
    options: [
      "Watch time",
      "Follower count",
      "Rewatches",
      "Shares",
      "Audio usage",
      "Account age",
    ],
    correctIndices: [0, 2, 3, 4],
    explanation:
      "For Reels specifically, the algorithm heavily weights watch time, rewatches, shares, and audio usage as key ranking signals. Follower count and account age are not primary Reels signals.",
  },
  {
    type: "true-false",
    question:
      "Instagram SEO means users can search for topics, products, and brands directly in the Instagram app.",
    correctAnswer: true,
    explanation:
      "Instagram is now a search engine. Users search for topics, products, and brands directly in the app, making SEO optimization important for discovery.",
  },
  {
    type: "true-false",
    question:
      "The optimal Reel length for maximum completion rate is 60-90 seconds.",
    correctAnswer: false,
    explanation:
      "The optimal length for maximum completion rate is 15-30 seconds. Shorter Reels are more likely to be watched to completion, which signals quality to the algorithm.",
  },
  {
    type: "multi-select",
    question:
      "Which are key ranking signals across all Instagram surfaces? (Select all that apply)",
    options: [
      "Relationship (closeness to viewer)",
      "Interest (predicted relevance)",
      "Account verification status",
      "Timeliness (recency of post)",
      "Number of followers",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "The key ranking signals across all Instagram surfaces are relationship (how close you are to the viewer), interest (predicted relevance), and timeliness (recency of the post).",
  },
  {
    type: "multi-select",
    question:
      "How can you optimize for Instagram SEO? (Select all that apply)",
    options: [
      "Include keywords in your username and display name",
      "Write keyword-rich captions",
      "Add alt text to images and Reels",
      "Use only branded hashtags",
      "Leverage location tags",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "To optimize for Instagram SEO, include keywords in your username and display name, write keyword-rich captions, add alt text, and leverage location tags. Using only branded hashtags is too limiting.",
  },
  {
    type: "ordering",
    question:
      "Arrange the hashtag types from broadest reach to most targeted.",
    items: [
      "Branded hashtags",
      "Broad hashtags",
      "Niche-specific hashtags",
    ],
    correctOrder: [1, 2, 0],
    explanation:
      "Broad hashtags have the widest reach but most competition, niche-specific hashtags offer targeted discovery, and branded hashtags are the most targeted, used for community building.",
  },
  {
    type: "multiple-choice",
    question:
      "How many Reels per week should brands post for consistent momentum?",
    options: ["1-2", "4-7", "10-14", "20+"],
    correctIndex: 1,
    explanation:
      "Post Reels consistently, 4-7 per week, to train the algorithm and build momentum.",
  },
  {
    type: "multiple-choice",
    question:
      "What type of hashtag mix is recommended for Instagram posts?",
    options: [
      "Only trending hashtags",
      "A mix of niche-specific, moderately popular, and branded hashtags",
      "Only hashtags with over 1 million posts",
      "Random hashtags unrelated to your content",
    ],
    correctIndex: 1,
    explanation:
      "Use a mix of niche-specific, moderately popular, and branded hashtags. Research competitors and use Instagram's search suggestions to find relevant tags.",
  },

  // ── Section 3: Strategy & Planning (12 questions) ──────────────────
  {
    type: "multiple-choice",
    question:
      "How many content pillars should you define for your Instagram strategy?",
    options: ["1-2", "3-5", "8-10", "15+"],
    correctIndex: 1,
    explanation:
      "Define 3-5 content pillars specific to Instagram. Each pillar should map to a business objective and an audience need.",
  },
  {
    type: "multiple-choice",
    question: "What is the primary purpose of Instagram Stories for brands?",
    options: [
      "To replace feed posts entirely",
      "To serve as the engagement engine with daily, interactive content",
      "To post only promotional content",
      "To archive old content",
    ],
    correctIndex: 1,
    explanation:
      "Stories are your engagement engine. Use them daily to maintain top-of-feed visibility through polls, quizzes, behind-the-scenes content, and interactive stickers.",
  },
  {
    type: "multiple-choice",
    question: "How should you set up Instagram Shopping?",
    options: [
      "Through Instagram's settings menu",
      "Through Meta Commerce Manager by connecting your product catalog",
      "By emailing Instagram support",
      "Shopping features are automatic for business accounts",
    ],
    correctIndex: 1,
    explanation:
      "Set up Instagram Shopping through Meta Commerce Manager. Connect your product catalog, then tag products in feed posts, Reels, and Stories.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the goal of maintaining visual identity on Instagram?",
    options: [
      "To make every post look identical",
      "To achieve instant brand recognition as users scroll",
      "To copy competitor aesthetics",
      "Visual identity is no longer important on Instagram",
    ],
    correctIndex: 1,
    explanation:
      "The goal of visual consistency is instant brand recognition as users scroll. Choose a consistent color palette, font style, and editing preset that align with your brand.",
  },
  {
    type: "multiple-choice",
    question:
      "Which Story type drives interaction and gathers audience insights simultaneously?",
    options: [
      "Behind-the-scenes content",
      "Polls and Quizzes",
      "Countdown stickers",
      "Link stickers",
    ],
    correctIndex: 1,
    explanation:
      "Polls and Quizzes drive interaction and gather audience insights simultaneously, making them one of the most effective Story formats.",
  },
  {
    type: "true-false",
    question:
      "Obsessive grid planning is more important than ever on Instagram in 2026.",
    correctAnswer: false,
    explanation:
      "While visual consistency still matters, obsessive grid planning has faded in importance. Focus on consistent templates, color palettes, and on-screen text styles rather than perfect grid aesthetics.",
  },
  {
    type: "true-false",
    question:
      "Product tags on Instagram can increase purchase intent by providing a seamless path from discovery to checkout.",
    correctAnswer: true,
    explanation:
      "Product tags can increase purchase intent by giving users a seamless path from discovery to checkout without leaving the Instagram app.",
  },
  {
    type: "multi-select",
    question:
      "Which are best-performing Instagram Story types? (Select all that apply)",
    options: [
      "Polls and Quizzes",
      "Behind-the-Scenes",
      "Plain text-only Stories",
      "Countdowns and Launches",
      "Link Stickers",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Top-performing Story types include Polls and Quizzes, Behind-the-Scenes, Countdowns and Launches, and Link Stickers. Plain text-only Stories typically underperform compared to interactive formats.",
  },
  {
    type: "multi-select",
    question:
      "What should each content pillar map to? (Select all that apply)",
    options: [
      "A business objective",
      "An audience need",
      "A specific posting time",
      "A competitor's strategy",
    ],
    correctIndices: [0, 1],
    explanation:
      "Each content pillar should map to a business objective and an audience need. Posting times and competitor strategies inform execution but are not what pillars map to.",
  },
  {
    type: "ordering",
    question:
      "Arrange the Instagram Shopping setup steps in the correct order.",
    items: [
      "Tag products in posts, Reels, and Stories",
      "Set up Meta Commerce Manager",
      "Create shoppable collections",
      "Connect your product catalog",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "First set up Meta Commerce Manager, then connect your product catalog, tag products in your content, and create shoppable collections for organized browsing.",
  },
  {
    type: "multiple-choice",
    question:
      "How often should you post Instagram Stories for maximum visibility?",
    options: ["Weekly", "Daily", "Monthly", "Only during launches"],
    correctIndex: 1,
    explanation:
      "Use Stories daily to maintain top-of-feed visibility. Consistent daily Stories keep your brand at the front of your followers' Stories bar.",
  },
  {
    type: "ordering",
    question:
      "Rank content pillars by typical business impact from brand awareness to direct sales.",
    items: [
      "Product Showcases",
      "Lifestyle Inspiration",
      "Customer Testimonials",
      "Educational Tips",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "Lifestyle Inspiration builds broad awareness, Educational Tips establish expertise, Customer Testimonials build trust and consideration, and Product Showcases drive the closest to direct sales.",
  },

  // ── Section 4: Execution & Implementation (12 questions) ───────────
  {
    type: "multiple-choice",
    question:
      "Why does Instagram tend to favor content made with its own editing tools?",
    options: [
      "Because external tools are banned",
      "The platform tends to boost content created natively to keep users in-app",
      "External tools produce lower quality content",
      "Instagram's tools have AI that automatically optimizes content",
    ],
    correctIndex: 1,
    explanation:
      "The platform tends to favor content made with its own tools because it incentivizes creators to stay within the Instagram ecosystem, resulting in better algorithmic distribution.",
  },
  {
    type: "multiple-choice",
    question: "What feed format generates the highest save rate on Instagram?",
    options: ["Single images", "Videos", "Carousels", "Text posts"],
    correctIndex: 2,
    explanation:
      "Carousels generate the highest save rate of any feed format because they deliver concentrated value that users want to reference later.",
  },
  {
    type: "multiple-choice",
    question:
      "Within what time frame should you reply to comments for maximum algorithmic benefit?",
    options: [
      "Within the first hour",
      "Within 24 hours",
      "Within one week",
      "Timing doesn't matter for algorithmic ranking",
    ],
    correctIndex: 0,
    explanation:
      "Reply to every comment within the first hour to boost algorithmic ranking. Early engagement signals to Instagram that your post is generating conversation.",
  },
  {
    type: "multiple-choice",
    question: "What is proactive engagement on Instagram?",
    options: [
      "Waiting for people to comment on your posts",
      "Commenting on 10-20 accounts in your niche before and after posting",
      "Only responding to DMs",
      "Using automated bots to engage",
    ],
    correctIndex: 1,
    explanation:
      "Proactive engagement means commenting on 10-20 accounts in your niche before and after posting, building relationships and signaling activity to the algorithm.",
  },
  {
    type: "multiple-choice",
    question: "What is the Instagram Collab feature used for?",
    options: [
      "Scheduling posts for later",
      "Co-authoring posts to tap into new audiences",
      "Creating Instagram ads",
      "Managing multiple accounts",
    ],
    correctIndex: 1,
    explanation:
      "The Collab feature allows you to co-author posts with another account, displaying the content on both profiles and tapping into both audiences for expanded reach.",
  },
  {
    type: "true-false",
    question:
      "Buying followers is a recommended growth strategy for Instagram accounts.",
    correctAnswer: false,
    explanation:
      "Avoid buying followers or using engagement pods — these inflate vanity metrics while destroying your engagement rate and algorithmic standing.",
  },
  {
    type: "true-false",
    question:
      "The first slide of a carousel should serve as a bold hook to capture attention.",
    correctAnswer: true,
    explanation:
      "Use the first slide as a bold hook, deliver value on slides 2-9, and end with a clear CTA on the final slide for optimal carousel performance.",
  },
  {
    type: "multi-select",
    question:
      "Which are recommended engagement tactics for Instagram? (Select all that apply)",
    options: [
      "Reply to every comment within the first hour",
      "Proactive engagement on niche accounts",
      "Using engagement pods",
      "DM conversations from Story replies",
      "Collaborations using the Collab feature",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Recommended tactics include replying to comments quickly, proactive engagement, DM conversations, and using the Collab feature. Engagement pods are discouraged as they distort metrics.",
  },
  {
    type: "multi-select",
    question:
      "What makes for sustainable Instagram growth? (Select all that apply)",
    options: [
      "Creating shareable content",
      "Leveraging collaborations",
      "Buying followers for social proof",
      "Optimizing for the Explore page",
      "Running strategic giveaways",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Sustainable growth comes from shareable content, collaborations, Explore page optimization, and strategic giveaways. Buying followers is harmful to long-term growth.",
  },
  {
    type: "ordering",
    question: "Arrange the ideal carousel structure from first slide to last.",
    items: [
      "Clear CTA slide",
      "Bold hook slide",
      "Value delivery slides",
    ],
    correctOrder: [1, 2, 0],
    explanation:
      "Start with a bold hook slide to capture attention, deliver value on the middle slides, and end with a clear CTA slide to drive action.",
  },
  {
    type: "multiple-choice",
    question:
      "How many accounts should you proactively engage with before and after posting?",
    options: ["1-2", "5-8", "10-20", "50+"],
    correctIndex: 2,
    explanation:
      "Proactive engagement recommends commenting on 10-20 accounts in your niche before and after posting to build relationships and signal activity.",
  },
  {
    type: "ordering",
    question: "Put the Reels production steps in the correct order.",
    items: [
      "Edit natively in Instagram",
      "Script your hooks before filming",
      "Post consistently (4-7 per week)",
      "Batch-produce in filming sessions",
      "Use trending audio within 24-48 hours",
    ],
    correctOrder: [1, 3, 4, 0, 2],
    explanation:
      "Script hooks first, batch-produce in filming sessions, use trending audio while it's fresh, edit natively in Instagram, and post consistently for momentum.",
  },

  // ── Section 5: Measurement & Optimization (12 questions) ───────────
  {
    type: "multiple-choice",
    question: "What is a healthy engagement rate benchmark for accounts over 10K followers?",
    options: ["0.1-0.5%", "1-3%", "10-15%", "25%+"],
    correctIndex: 1,
    explanation:
      "A healthy engagement rate benchmark for accounts over 10K followers is 1-3%. Smaller accounts typically see higher rates due to closer audience relationships.",
  },
  {
    type: "multiple-choice",
    question:
      "Which engagement metrics are the strongest signals of valuable content?",
    options: [
      "Likes and profile views",
      "Saves and Shares",
      "Comments only",
      "Impressions and reach",
    ],
    correctIndex: 1,
    explanation:
      "Saves and Shares are the strongest engagement signals. High save rates indicate valuable, reference-worthy content, and shares expand reach to new audiences.",
  },
  {
    type: "multiple-choice",
    question: "What does Reels Watch Time measure?",
    options: [
      "Total number of Reels views",
      "Average percentage of the Reel that is viewed",
      "Time of day when Reels are most watched",
      "How many Reels you post per week",
    ],
    correctIndex: 1,
    explanation:
      "Reels Watch Time measures the average percentage of the Reel that is viewed. Higher watch time signals quality content to the algorithm.",
  },
  {
    type: "multiple-choice",
    question:
      "How often should you review your top and bottom performing posts?",
    options: ["Daily", "Weekly", "Monthly", "Quarterly"],
    correctIndex: 2,
    explanation:
      "Review your top 5 and bottom 5 performing posts each month to identify patterns in hooks, formats, topics, and posting times.",
  },
  {
    type: "multiple-choice",
    question:
      "How many posts should you test a new format with before drawing conclusions?",
    options: ["1 post", "3 posts", "5+ posts over at least 2 weeks", "20+ posts"],
    correctIndex: 2,
    explanation:
      "Test new formats regularly but give each test at least 2 weeks and 5+ posts before drawing conclusions to ensure reliable data.",
  },
  {
    type: "true-false",
    question:
      "Instagram Insights is available for all Instagram accounts regardless of account type.",
    correctAnswer: false,
    explanation:
      "Instagram Insights is only available for Professional accounts (Business or Creator). Personal accounts do not have access to detailed analytics.",
  },
  {
    type: "true-false",
    question:
      "Follower Growth Rate should be tracked alongside content type to identify growth drivers.",
    correctAnswer: true,
    explanation:
      "Track follower growth rate alongside content type to identify which content formats and topics are driving the most new followers to your account.",
  },
  {
    type: "multi-select",
    question:
      "Which metrics should you track weekly on Instagram? (Select all that apply)",
    options: [
      "Reach",
      "Engagement Rate",
      "Saves and Shares",
      "Account creation date",
      "Follower Growth Rate",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Track Reach, Engagement Rate, Saves and Shares, and Follower Growth Rate weekly. Account creation date is static and not a performance metric.",
  },
  {
    type: "multi-select",
    question:
      "What patterns should you analyze in your monthly content review? (Select all that apply)",
    options: [
      "Hooks that performed well",
      "Formats that drove engagement",
      "Topics that resonated",
      "Posting times that worked",
      "Competitor follower counts",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Analyze patterns in hooks, formats, topics, and posting times from your top and bottom performing posts. Competitor follower counts belong in competitive analysis, not content review.",
  },
  {
    type: "ordering",
    question:
      "Arrange the optimization cycle in the correct order.",
    items: [
      "Double down on what works",
      "Identify patterns in top performers",
      "Review top 5 and bottom 5 posts",
      "Retire underperforming formats",
    ],
    correctOrder: [2, 1, 0, 3],
    explanation:
      "First review your top 5 and bottom 5 posts, identify patterns in the top performers, double down on what works, and retire formats that consistently underperform.",
  },
  {
    type: "multiple-choice",
    question:
      "What does Reach measure on Instagram?",
    options: [
      "Total number of times your content was displayed",
      "Unique accounts that saw your content",
      "Number of followers gained",
      "Total engagement on a post",
    ],
    correctIndex: 1,
    explanation:
      "Reach measures the number of unique accounts that saw your content, indicating top-of-funnel visibility. This differs from impressions, which count total views including repeat views.",
  },
  {
    type: "ordering",
    question:
      "Rank these Instagram metrics from top-of-funnel awareness to bottom-of-funnel conversion.",
    items: [
      "Website clicks from profile",
      "Reach",
      "Saves",
      "Engagement Rate",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "Reach is the broadest awareness metric, Engagement Rate shows mid-funnel content resonance, Saves indicate deep interest, and Website clicks represent bottom-of-funnel conversion intent.",
  },
];
