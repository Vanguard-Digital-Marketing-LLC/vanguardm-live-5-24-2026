import type { QuizQuestion } from "@/lib/academy-data";

export const tiktokMarketingQuiz: QuizQuestion[] = [
  // ── Section 1: Introduction & Overview (12 questions) ──────────────
  {
    type: "multiple-choice",
    question:
      "What makes TikTok unique compared to other social media platforms?",
    options: [
      "Content is only shown to followers",
      "The algorithm distributes content based on predicted interest, not follower count",
      "It only supports long-form video content",
      "It requires a business license to post",
    ],
    correctIndex: 1,
    explanation:
      "TikTok's algorithm-first approach distributes content to anyone based on predicted interest, meaning a brand-new account can reach millions with a single video.",
  },
  {
    type: "multiple-choice",
    question:
      "How many monthly active users does TikTok have?",
    options: [
      "500 million",
      "800 million",
      "Over 1.5 billion",
      "3 billion",
    ],
    correctIndex: 2,
    explanation:
      "TikTok has over 1.5 billion monthly active users with average daily usage exceeding 90 minutes.",
  },
  {
    type: "multiple-choice",
    question:
      "What is TikTok's motto for creators?",
    options: [
      "Think outside the box",
      "Don't make ads, make TikToks",
      "Content is king",
      "Go viral or go home",
    ],
    correctIndex: 1,
    explanation:
      "TikTok's motto for creators is 'Don't make ads, make TikToks.' Content that feels native to the platform outperforms polished, ad-like content.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the average daily usage time on TikTok?",
    options: [
      "15 minutes",
      "30 minutes",
      "Exceeding 90 minutes",
      "Exactly 2 hours",
    ],
    correctIndex: 2,
    explanation:
      "Average daily TikTok usage exceeds 90 minutes, making it one of the most engaging social platforms.",
  },
  {
    type: "true-false",
    question: "TikTok is only popular with Gen Z users.",
    correctAnswer: false,
    explanation:
      "TikTok is no longer just a Gen Z platform. It spans all demographics and has become a primary search engine for younger audiences.",
  },
  {
    type: "true-false",
    question:
      "A brand-new TikTok account can potentially reach millions of viewers with a single video.",
    correctAnswer: true,
    explanation:
      "Because TikTok's FYP algorithm distributes content based on predicted interest rather than follower count, a new account can indeed reach millions with a single compelling video.",
  },
  {
    type: "multi-select",
    question:
      "What are the core principles of TikTok success? (Select all that apply)",
    options: [
      "Algorithm-first distribution",
      "Entertainment-driven content",
      "Polished, ad-like production",
      "Trend participation",
      "Commerce integration through TikTok Shop",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "TikTok success is built on algorithm-first distribution, entertainment-driven content, trend participation, and commerce integration. Polished, ad-like production actually underperforms on TikTok.",
  },
  {
    type: "multi-select",
    question:
      "What has TikTok become beyond an entertainment platform? (Select all that apply)",
    options: [
      "A search engine for younger audiences",
      "A social commerce platform",
      "A professional networking site",
      "A platform spanning all demographics",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "TikTok has become a search engine for younger audiences, a social commerce platform through TikTok Shop, and a platform spanning all demographics. It is not a professional networking site like LinkedIn.",
  },
  {
    type: "ordering",
    question:
      "Rank TikTok's content priorities from most to least important for success.",
    items: [
      "High production value",
      "Authenticity",
      "Entertainment value",
      "Trend participation",
    ],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "Entertainment value is the top priority on TikTok, followed by authenticity, trend participation, and then production value. High production can actually work against you if it feels inauthentic.",
  },
  {
    type: "multiple-choice",
    question:
      "Which is the fastest-growing social commerce platform globally?",
    options: [
      "Instagram Shopping",
      "Facebook Marketplace",
      "TikTok Shop",
      "Pinterest Shopping",
    ],
    correctIndex: 2,
    explanation:
      "TikTok Shop is the fastest-growing social commerce platform globally, allowing direct product sales through the app.",
  },
  {
    type: "multiple-choice",
    question:
      "What type of content outperforms polished, ad-like content on TikTok?",
    options: [
      "Content with the highest production budget",
      "Content that feels native and authentic to the platform",
      "Content copied exactly from TV commercials",
      "Content with the most special effects",
    ],
    correctIndex: 1,
    explanation:
      "Content that feels native to the platform outperforms polished, ad-like content. Authenticity, entertainment value, and trend participation are the currency of TikTok success.",
  },
  {
    type: "multi-select",
    question:
      "Which platforms distribute content primarily based on algorithmic signals rather than follower count? (Select all that apply)",
    options: [
      "TikTok",
      "Email newsletter",
      "Instagram Explore/Reels",
      "LinkedIn",
      "YouTube Shorts",
    ],
    correctIndices: [0, 2, 4],
    explanation:
      "TikTok, Instagram Explore/Reels, and YouTube Shorts all distribute content based on algorithmic signals regardless of follower count. Email newsletters are subscriber-dependent and LinkedIn shows content primarily to your network first.",
  },

  // ── Section 2: Core Concepts (12 questions) ────────────────────────
  {
    type: "multiple-choice",
    question:
      "What is the most important ranking signal for TikTok's FYP algorithm?",
    options: [
      "Number of followers",
      "Watch time",
      "Number of hashtags",
      "Account age",
    ],
    correctIndex: 1,
    explanation:
      "Watch time is the most important signal for TikTok's algorithm. Videos watched to completion or rewatched get massive distribution.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the strongest engagement action on TikTok?",
    options: ["Liking a video", "Commenting", "Sharing a video", "Following the creator"],
    correctIndex: 2,
    explanation:
      "Sharing a video is the strongest engagement action, signaling high value to the algorithm and expanding reach to new audiences.",
  },
  {
    type: "multiple-choice",
    question:
      "How quickly should you jump on a TikTok trend for maximum impact?",
    options: [
      "Within the first 24-72 hours",
      "Within the first week",
      "After a month of observation",
      "Trends don't matter on TikTok",
    ],
    correctIndex: 0,
    explanation:
      "Jump on trends within the first 24-72 hours for maximum impact. The algorithm actively promotes content using trending elements during their peak.",
  },
  {
    type: "multiple-choice",
    question:
      "How much time do you have to capture attention on TikTok?",
    options: [
      "5-10 seconds",
      "0.5-1 second",
      "15-30 seconds",
      "The entire video length",
    ],
    correctIndex: 1,
    explanation:
      "You have roughly 0.5-1 second to capture attention on TikTok. Strong hooks must immediately stop the scroll.",
  },
  {
    type: "multiple-choice",
    question:
      "What tool can you use to discover trending sounds and hashtags in real time?",
    options: [
      "Google Trends",
      "TikTok Creative Center",
      "Instagram Insights",
      "YouTube Analytics",
    ],
    correctIndex: 1,
    explanation:
      "The TikTok Creative Center provides real-time data on trending sounds, hashtags, and content formats to help inform your trend participation.",
  },
  {
    type: "multiple-choice",
    question:
      "What does TikTok index to surface content in search results?",
    options: [
      "Only hashtags",
      "Only the video description",
      "Captions, on-screen text, spoken audio, and hashtags",
      "Only the account bio",
    ],
    correctIndex: 2,
    explanation:
      "TikTok indexes captions, on-screen text, spoken audio, and hashtags to surface content in search results, making all of these important for TikTok SEO.",
  },
  {
    type: "true-false",
    question:
      "When a TikTok video's engagement rate drops below a threshold, the algorithm stops expanding its distribution.",
    correctAnswer: true,
    explanation:
      "TikTok shows videos to increasingly larger batches of users. This process continues until the engagement rate drops below a threshold, at which point distribution stops expanding.",
  },
  {
    type: "true-false",
    question:
      "You should copy TikTok trends exactly without any brand personalization.",
    correctAnswer: false,
    explanation:
      "The key is to put your unique brand spin on the trend rather than copying it exactly. Authentic trend participation with your own twist performs better than exact copies.",
  },
  {
    type: "multi-select",
    question:
      "Which are primary FYP ranking signals? (Select all that apply)",
    options: [
      "Watch time",
      "Shares",
      "Follower count",
      "Comments",
      "Saves",
      "Profile visits",
    ],
    correctIndices: [0, 1, 3, 4, 5],
    explanation:
      "Primary FYP ranking signals include watch time, shares, comments, saves, and profile visits. Follower count is not a primary ranking signal — TikTok evaluates each video independently.",
  },
  {
    type: "multi-select",
    question:
      "Which are effective TikTok hook types? (Select all that apply)",
    options: [
      "Pattern interrupt",
      "Open loop",
      "Long introduction",
      "Bold claim",
      "Relatable scenario",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Effective hook types include pattern interrupts, open loops, bold claims, and relatable scenarios. Long introductions are the opposite of an effective hook — they cause viewers to scroll away.",
  },
  {
    type: "ordering",
    question:
      "Rank TikTok engagement signals from strongest to weakest.",
    items: [
      "Likes",
      "Shares",
      "Watch time / Rewatches",
      "Comments",
    ],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "Watch time and rewatches are the strongest signals, followed by shares (the strongest single action), comments, and likes (the weakest signal).",
  },
  {
    type: "ordering",
    question:
      "Put the TikTok FYP distribution stages in order.",
    items: [
      "Expand to larger batches if engagement is strong",
      "Publish video",
      "Show to small batch (few hundred users)",
      "Distribution stops when engagement drops below threshold",
    ],
    correctOrder: [1, 2, 0, 3],
    explanation:
      "After publishing, TikTok shows the video to a small batch, expands to larger batches if engagement is strong, and stops expanding when engagement drops below the threshold.",
  },

  // ── Section 3: Strategy & Planning (12 questions) ──────────────────
  {
    type: "multiple-choice",
    question:
      "In the Hero-Hub-Help framework, what percentage of content should be Help content?",
    options: ["10%", "30%", "60%", "90%"],
    correctIndex: 2,
    explanation:
      "Help Content should make up 60% of your TikTok content. This includes educational, how-to, and tip-based content that answers common questions.",
  },
  {
    type: "multiple-choice",
    question:
      "What is Hero content on TikTok?",
    options: [
      "Educational tip videos",
      "High-production tentpole videos designed for maximum reach and brand awareness",
      "Daily recurring content series",
      "Behind-the-scenes footage",
    ],
    correctIndex: 1,
    explanation:
      "Hero Content (10%) consists of high-production tentpole videos designed for maximum reach and brand awareness.",
  },
  {
    type: "multiple-choice",
    question:
      "How many posts per day should you aim for during a TikTok growth phase?",
    options: ["1 per week", "1-3 per day", "10 per day", "1 per month"],
    correctIndex: 1,
    explanation:
      "During growth phases, aim for 1-3 posts per day. TikTok rewards volume more than any other platform, and each video is evaluated independently.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the purpose of TikTok Creator Marketplace?",
    options: [
      "Selling physical products",
      "Finding creators by audience demographics, engagement rates, and content style for partnerships",
      "Purchasing TikTok ads",
      "Managing your TikTok analytics",
    ],
    correctIndex: 1,
    explanation:
      "TikTok Creator Marketplace helps you find creators by audience demographics, engagement rates, and content style for brand partnerships and collaborations.",
  },
  {
    type: "multiple-choice",
    question:
      "What is Hub content on TikTok?",
    options: [
      "One-time viral videos",
      "Recurring series and formats that build audience loyalty and expectations",
      "Product advertisement videos",
      "Reposted content from other platforms",
    ],
    correctIndex: 1,
    explanation:
      "Hub Content (30%) consists of recurring series and formats that build audience loyalty and expectations, giving followers a reason to come back.",
  },
  {
    type: "true-false",
    question:
      "TikTok Shop allows direct product sales through shoppable videos, live shopping, and a dedicated shop tab.",
    correctAnswer: true,
    explanation:
      "TikTok Shop enables direct product sales through shoppable videos, live shopping events, and a dedicated shop tab, with the platform actively promoting shoppable content.",
  },
  {
    type: "true-false",
    question:
      "On TikTok, you should give creator partners strict brand briefs with no creative freedom.",
    correctAnswer: false,
    explanation:
      "Give creators creative freedom — they know what resonates with their audience better than any brand brief. Overly strict briefs produce inauthentic content that underperforms.",
  },
  {
    type: "multi-select",
    question:
      "What are the three content categories in the Hero-Hub-Help framework? (Select all that apply)",
    options: [
      "Hero Content (10%)",
      "Hype Content (25%)",
      "Hub Content (30%)",
      "Help Content (60%)",
      "Hashtag Content (15%)",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "The three content categories are Hero Content (10%), Hub Content (30%), and Help Content (60%). Hype Content and Hashtag Content are not part of this framework.",
  },
  {
    type: "multi-select",
    question:
      "How can you succeed with TikTok Shop? (Select all that apply)",
    options: [
      "Create authentic product demonstrations",
      "Leverage affiliate creators",
      "Run live shopping sessions during peak hours",
      "Only use traditional ad creative",
      "Post stock product images",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Succeed with TikTok Shop by creating authentic product demonstrations, leveraging affiliate creators, and running live shopping sessions. Traditional ad creative and stock images underperform on TikTok.",
  },
  {
    type: "ordering",
    question:
      "Arrange the Hero-Hub-Help content types from least frequent to most frequent.",
    items: [
      "Help Content",
      "Hero Content",
      "Hub Content",
    ],
    correctOrder: [1, 2, 0],
    explanation:
      "Hero Content is the least frequent at 10%, Hub Content is mid-frequency at 30%, and Help Content is the most frequent at 60%.",
  },
  {
    type: "multiple-choice",
    question:
      "Why does TikTok reward posting volume more than other platforms?",
    options: [
      "Because the platform lacks content",
      "Because each video is evaluated independently, giving more chances to go viral",
      "Because TikTok penalizes accounts that post infrequently",
      "Because advertisers demand more content",
    ],
    correctIndex: 1,
    explanation:
      "Since each TikTok video is evaluated independently by the algorithm, more posts mean more chances to go viral. Volume creates more opportunities for algorithmic success.",
  },
  {
    type: "multi-select",
    question:
      "Which are organic (non-paid) TikTok Shop sales channels? (Select all that apply)",
    options: [
      "Shoppable organic videos",
      "Live shopping events",
      "TikTok Ads promoting shop products",
      "Dedicated shop tab on your profile",
      "Display banner ads",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Shoppable organic videos, live shopping events, and the dedicated shop tab are organic TikTok Shop channels. TikTok Ads and display banners are paid formats.",
  },

  // ── Section 4: Execution & Implementation (12 questions) ───────────
  {
    type: "multiple-choice",
    question: "What video orientation should all TikTok videos use?",
    options: [
      "Horizontal (16:9)",
      "Square (1:1)",
      "Vertical (9:16)",
      "Any orientation works equally well",
    ],
    correctIndex: 2,
    explanation:
      "Film vertically in 9:16 ratio for TikTok. This is the platform's native format and fills the entire screen for maximum impact.",
  },
  {
    type: "multiple-choice",
    question:
      "What percentage of TikTok viewing may be done with sound off?",
    options: ["5%", "Up to 50%", "75%", "100%"],
    correctIndex: 1,
    explanation:
      "Up to 50% of TikTok viewing is done muted, which is why adding on-screen text is essential for accessibility and engagement.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the optimal video length for maximum completion rate on TikTok?",
    options: ["5-10 seconds", "15-30 seconds", "60-90 seconds", "3-5 minutes"],
    correctIndex: 1,
    explanation:
      "Keep videos 15-30 seconds for maximum completion rate. Shorter videos are more likely to be watched fully, boosting the watch time signal.",
  },
  {
    type: "multiple-choice",
    question:
      "Which ad format on TikTok boosts existing organic or creator content?",
    options: ["In-Feed Ads", "Spark Ads", "TopView Ads", "Shopping Ads"],
    correctIndex: 1,
    explanation:
      "Spark Ads boost existing organic posts or creator content, achieving the highest ROAS due to built-in social proof.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the correct structure for a high-performing TikTok?",
    options: [
      "Introduction → Background → Main point → Conclusion",
      "Hook (0-1s) → Context (1-5s) → Value Delivery (5-20s) → Payoff/CTA (final 2-3s)",
      "Logo reveal → Product features → Pricing → Website URL",
      "Music first → Dancing → Product placement → End card",
    ],
    correctIndex: 1,
    explanation:
      "The structure for high-performing TikToks is: Hook (0-1 second) → Context (1-5 seconds) → Value Delivery (5-20 seconds) → Payoff or CTA (final 2-3 seconds).",
  },
  {
    type: "true-false",
    question:
      "Replying to TikTok comments with video responses can often go viral.",
    correctAnswer: true,
    explanation:
      "Reply to comments with video responses — these often go viral and show the algorithm you are an active creator engaged with your community.",
  },
  {
    type: "true-false",
    question:
      "TikTok videos should always be scripted word-for-word and delivered in a formal tone.",
    correctAnswer: false,
    explanation:
      "Script your hooks and key talking points, but keep delivery conversational. Formal, word-for-word scripts feel inauthentic on TikTok and underperform.",
  },
  {
    type: "multi-select",
    question:
      "Which are TikTok ad formats? (Select all that apply)",
    options: [
      "In-Feed Ads",
      "Spark Ads",
      "TopView Ads",
      "Banner Ads",
      "Shopping Ads",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "TikTok ad formats include In-Feed Ads, Spark Ads, TopView Ads, and Shopping Ads. Banner Ads are not a TikTok ad format.",
  },
  {
    type: "multi-select",
    question:
      "Which community engagement tactics work well on TikTok? (Select all that apply)",
    options: [
      "Replying to comments with video responses",
      "Pinning your best comments",
      "Using Stitch and Duet features",
      "Going live regularly",
      "Ignoring all comments",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Effective TikTok engagement includes video comment replies, pinning comments, Stitch/Duet features, and going live. Ignoring comments hurts community building and algorithmic standing.",
  },
  {
    type: "ordering",
    question:
      "Arrange the TikTok video structure in the correct order.",
    items: [
      "Value delivery (5-20 seconds)",
      "Hook (0-1 second)",
      "Payoff or CTA (final 2-3 seconds)",
      "Context (1-5 seconds)",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "The correct structure is: Hook (0-1 second) to capture attention, Context (1-5 seconds) to set up the value, Value Delivery (5-20 seconds) as the main content, and Payoff or CTA (final 2-3 seconds).",
  },
  {
    type: "multiple-choice",
    question:
      "Which TikTok ad format appears first when users open the app?",
    options: ["In-Feed Ads", "Spark Ads", "TopView Ads", "Shopping Ads"],
    correctIndex: 2,
    explanation:
      "TopView Ads are the first ad users see when opening TikTok, offering premium placement for maximum brand awareness.",
  },
  {
    type: "ordering",
    question:
      "Rank TikTok ad formats from most organic-feeling to most premium/interruptive.",
    items: [
      "TopView Ads",
      "Spark Ads",
      "In-Feed Ads",
      "Shopping Ads",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Spark Ads feel most organic (they boost existing content), followed by In-Feed Ads (native feed placement), Shopping Ads (product-focused), and TopView Ads (premium interruptive placement).",
  },

  // ── Section 5: Measurement & Optimization (12 questions) ───────────
  {
    type: "multiple-choice",
    question:
      "What is the single most important metric for TikTok content?",
    options: [
      "Follower count",
      "Number of likes",
      "Average watch time",
      "Number of hashtags used",
    ],
    correctIndex: 2,
    explanation:
      "Average watch time — how long viewers watch before scrolling — is the single most important metric for TikTok content because it directly drives algorithmic distribution.",
  },
  {
    type: "multiple-choice",
    question:
      "What does Completion Rate measure on TikTok?",
    options: [
      "The percentage of your videos that get published",
      "The percentage of viewers who watch the entire video",
      "The percentage of followers who see your content",
      "The percentage of comments you reply to",
    ],
    correctIndex: 1,
    explanation:
      "Completion Rate measures the percentage of viewers who watch the entire video. Higher rates trigger broader distribution from the algorithm.",
  },
  {
    type: "multiple-choice",
    question:
      "What does the Traffic Source metric reveal?",
    options: [
      "Which countries your viewers are from",
      "How your content is being discovered (FYP vs. Following vs. Search)",
      "Which device type viewers use",
      "How fast your internet connection is",
    ],
    correctIndex: 1,
    explanation:
      "Traffic Source shows how your content is being discovered — For You Page vs. Following vs. Search — helping you understand your distribution channels.",
  },
  {
    type: "multiple-choice",
    question:
      "How should you identify winning content patterns on TikTok?",
    options: [
      "Analyze your bottom 10% of videos",
      "Analyze your top 10% of videos by views each month",
      "Only look at your most recent post",
      "Ignore analytics and post by intuition",
    ],
    correctIndex: 1,
    explanation:
      "Analyze your top 10% of videos by views each month. Identify the hooks, formats, sounds, and topics that drove outperformance, then create more variations of winning content.",
  },
  {
    type: "multiple-choice",
    question:
      "How many attempts should you give a format before concluding it consistently underperforms?",
    options: ["1-2 attempts", "5 attempts", "10+ attempts", "50+ attempts"],
    correctIndex: 2,
    explanation:
      "Kill formats that consistently underperform after 10+ attempts. Testing fewer posts doesn't provide enough data to make confident decisions.",
  },
  {
    type: "true-false",
    question:
      "TikTok Analytics is available on both Business and Creator accounts.",
    correctAnswer: true,
    explanation:
      "TikTok Analytics is available on Business and Creator accounts, providing detailed performance data including watch time, traffic sources, and audience demographics.",
  },
  {
    type: "true-false",
    question:
      "Share Rate (shares per 1,000 views) is a weak signal of content quality on TikTok.",
    correctAnswer: false,
    explanation:
      "Share Rate is the strongest signal of content worth to the algorithm. It indicates viewers find the content valuable enough to actively send to others.",
  },
  {
    type: "multi-select",
    question:
      "Which are key TikTok metrics to track? (Select all that apply)",
    options: [
      "Average Watch Time",
      "Completion Rate",
      "Share Rate",
      "Account age",
      "Traffic Source",
      "Follower Activity",
    ],
    correctIndices: [0, 1, 2, 4, 5],
    explanation:
      "Key TikTok metrics include Average Watch Time, Completion Rate, Share Rate, Traffic Source, and Follower Activity. Account age is not a performance metric.",
  },
  {
    type: "multi-select",
    question:
      "When optimizing TikTok content, what variables should you test one at a time? (Select all that apply)",
    options: [
      "Hook style",
      "Video length",
      "Posting time",
      "Sound choice",
      "All variables simultaneously",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "Test one variable at a time — hook style, video length, posting time, or sound choice — to clearly attribute performance changes. Testing all variables simultaneously makes it impossible to determine what caused changes.",
  },
  {
    type: "ordering",
    question:
      "Rank TikTok metrics by their impact on algorithmic distribution from highest to lowest.",
    items: [
      "Likes",
      "Watch time",
      "Shares",
      "Comments",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Watch time has the highest impact on distribution, followed by shares (strongest single action), comments, and likes (lowest impact among these metrics).",
  },
  {
    type: "multiple-choice",
    question:
      "What should you use the Follower Activity metric for?",
    options: [
      "Deciding which hashtags to use",
      "Optimizing posting times to when your audience is most active",
      "Determining your content pillar topics",
      "Choosing which sounds to use",
    ],
    correctIndex: 1,
    explanation:
      "Follower Activity shows when your audience is most active, allowing you to optimize posting times to these windows for the best initial engagement.",
  },
  {
    type: "ordering",
    question:
      "Arrange the TikTok optimization cycle in the correct order.",
    items: [
      "Kill consistently underperforming formats",
      "Analyze top 10% of videos by views",
      "Create variations of winning content",
      "Identify hooks, formats, sounds, and topics that drove outperformance",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "First analyze your top 10% of videos, identify what drove their success, create more variations of that winning content, and finally kill formats that consistently underperform after sufficient testing.",
  },
];
