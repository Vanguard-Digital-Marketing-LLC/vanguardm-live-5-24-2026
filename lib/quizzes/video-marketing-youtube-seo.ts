import type { QuizQuestion } from "@/lib/academy-data";

export const videoMarketingYoutubeSeoQuiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question: "YouTube is often described as the world's second-largest what?",
    options: [
      "Social media platform",
      "Search engine",
      "E-commerce marketplace",
      "Email provider",
    ],
    correctIndex: 1,
    explanation:
      "YouTube is the world's second-largest search engine after Google. Users actively search for content on YouTube, making YouTube SEO a critical skill for content marketers.",
  },
  {
    type: "multiple-choice",
    question: "How many hours of video are uploaded to YouTube every minute?",
    options: [
      "50 hours",
      "100 hours",
      "250 hours",
      "500 hours",
    ],
    correctIndex: 3,
    explanation:
      "YouTube processes over 500 hours of video uploaded every minute, reflecting the massive scale of content on the platform and the competitive landscape creators face.",
  },
  {
    type: "multiple-choice",
    question: "What percentage of consumers say video helps them make purchase decisions?",
    options: [
      "45%",
      "65%",
      "90%",
      "99%",
    ],
    correctIndex: 2,
    explanation:
      "90% of consumers say video helps them make purchase decisions, making video marketing one of the most effective formats for influencing buying behavior.",
  },
  {
    type: "multiple-choice",
    question: "How does a well-optimized YouTube video compare to social media posts in terms of longevity?",
    options: [
      "Both disappear from feeds within hours",
      "YouTube videos drive traffic for years while social posts disappear quickly",
      "Social posts last longer than YouTube videos",
      "Both have the same lifespan of about one week",
    ],
    correctIndex: 1,
    explanation:
      "Unlike social media posts that disappear from feeds in hours, a well-optimized YouTube video can drive traffic for years because it continues to appear in search results and recommendations.",
  },
  {
    type: "multiple-choice",
    question: "What does YouTube primarily reward in its algorithm?",
    options: [
      "Videos with the most expensive production",
      "Watch time, engagement, and relevance",
      "Videos uploaded by verified accounts only",
      "Videos with the most tags",
    ],
    correctIndex: 1,
    explanation:
      "YouTube rewards watch time, engagement, and relevance. The platform actively promotes content that viewers find valuable, regardless of production budget or creator size.",
  },
  {
    type: "true-false",
    question: "Video marketers get 66% more qualified leads per year compared to those who do not use video.",
    correctAnswer: true,
    explanation:
      "Research shows that video marketers get 66% more qualified leads per year. Video's ability to educate, demonstrate, and build trust makes it exceptionally effective for lead generation.",
  },
  {
    type: "true-false",
    question: "YouTube only serves content to users who search for it directly — it has no recommendation system.",
    correctAnswer: false,
    explanation:
      "YouTube has a sophisticated recommendation system that surfaces content across multiple areas: Search, Suggested Videos, Browse (Homepage), Shorts Feed, and Notifications. Most views actually come from recommendations, not direct search.",
  },
  {
    type: "multi-select",
    question: "Which of the following are benefits of video marketing? (Select all that apply)",
    options: [
      "Higher qualified lead generation",
      "Ability to combine visual, audio, and text elements",
      "Guaranteed viral reach for every video",
      "Long-term traffic from well-optimized content",
      "Influence on purchase decisions",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Video marketing provides higher lead generation, multi-sensory engagement, long-term traffic from optimized videos, and strong influence on purchase decisions. However, no format guarantees viral reach.",
  },
  {
    type: "multi-select",
    question: "Which surfaces does the YouTube algorithm operate across? (Select all that apply)",
    options: [
      "Search results",
      "Suggested Videos",
      "Browse / Homepage",
      "Email inbox",
      "Shorts Feed",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "The YouTube algorithm operates across Search, Suggested Videos, Browse (Homepage), Shorts Feed, and Notifications. It does not operate in email inboxes, though YouTube can send email notifications.",
  },
  {
    type: "ordering",
    question: "Arrange these aspects of the video marketing lifecycle in the correct order.",
    items: ["Analyze performance data", "Script and produce the video", "Understand the YouTube algorithm", "Optimize and distribute"],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "First understand the YouTube algorithm to inform your strategy, then script and produce the video, then optimize metadata and distribute across channels, and finally analyze performance data to improve future content.",
  },
  {
    type: "multi-select",
    question: "Which of the following are true about YouTube's scale and reach? (Select all that apply)",
    options: [
      "YouTube serves over 2 billion logged-in users monthly",
      "Over 500 hours of video are uploaded every minute",
      "YouTube is the world's second-largest search engine",
      "YouTube only allows professional content creators to upload",
      "YouTube is only available in English-speaking countries",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "YouTube serves over 2 billion logged-in users monthly, processes 500+ hours of video uploads per minute, and is the world's second-largest search engine. It is open to all creators and available in over 100 countries and 80 languages.",
  },
  {
    type: "ordering",
    question: "Rank these content formats from lowest to highest typical engagement depth.",
    items: ["Social media image post", "Short-form video (under 60s)", "Blog article", "Long-form YouTube video"],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Social media image posts get the briefest attention. Short-form videos are slightly more engaging. Blog articles require deliberate reading. Long-form YouTube videos demand the deepest engagement, with viewers voluntarily spending 10-60+ minutes consuming content.",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is the single biggest factor in whether someone clicks on your YouTube video?",
    options: [
      "The video description",
      "The number of tags",
      "The thumbnail",
      "The channel subscriber count",
    ],
    correctIndex: 2,
    explanation:
      "Your thumbnail is the single biggest factor in whether someone clicks your video. Effective thumbnails use high contrast, bold text (3-5 words max), expressive faces, and consistent branding.",
  },
  {
    type: "multiple-choice",
    question: "What resolution and aspect ratio should YouTube thumbnails use?",
    options: [
      "800x600 pixels (4:3)",
      "1080x1080 pixels (1:1)",
      "1280x720 pixels (16:9)",
      "1920x1080 pixels (16:9)",
    ],
    correctIndex: 2,
    explanation:
      "YouTube thumbnails should use 1280x720 pixel resolution with a 16:9 aspect ratio. This is the standard recommended by YouTube and ensures your thumbnail looks good across all devices.",
  },
  {
    type: "multiple-choice",
    question: "Which metric measures the percentage of a video viewers watch before leaving?",
    options: [
      "Click-through rate",
      "Audience retention",
      "Session time",
      "Impressions",
    ],
    correctIndex: 1,
    explanation:
      "Audience retention measures the percentage of the video viewers watch before leaving. It is a critical algorithm signal because YouTube wants to promote videos that keep viewers watching.",
  },
  {
    type: "multiple-choice",
    question: "Where should the target keyword appear in a YouTube video description?",
    options: [
      "Only in the last sentence",
      "Nowhere — descriptions don't affect SEO",
      "In the first 25 words of a 200+ word description",
      "Repeated 20 times throughout the description",
    ],
    correctIndex: 2,
    explanation:
      "Descriptions should be at least 200 words, with the keyword appearing in the first 25 words and a clear summary of what the viewer will learn. Keyword stuffing (excessive repetition) can harm your SEO.",
  },
  {
    type: "multiple-choice",
    question: "What does 'session time' measure on YouTube?",
    options: [
      "How long it takes to upload a video",
      "Whether your video leads viewers to watch more content on YouTube",
      "The time between video uploads on your channel",
      "How long your editing session lasts",
    ],
    correctIndex: 1,
    explanation:
      "Session time measures whether your video leads viewers to watch more content on YouTube. YouTube values videos that keep people on the platform, making this an important algorithm signal.",
  },
  {
    type: "true-false",
    question: "The YouTube algorithm simply promotes the most-viewed videos to everyone.",
    correctAnswer: false,
    explanation:
      "The YouTube algorithm does not simply promote the most-viewed videos. It matches content to individual viewer preferences based on their watch history and behavior, optimizing for viewer satisfaction rather than raw view counts.",
  },
  {
    type: "true-false",
    question: "Clickbait thumbnails that misrepresent content will ultimately be penalized by YouTube's algorithm because they lead to low audience retention.",
    correctAnswer: true,
    explanation:
      "Clickbait thumbnails that misrepresent content cause viewers to click away quickly, resulting in low audience retention. Since the algorithm prioritizes retention and viewer satisfaction, these videos get fewer recommendations over time.",
  },
  {
    type: "multi-select",
    question: "Which of the following are key YouTube algorithm signals? (Select all that apply)",
    options: [
      "Watch time",
      "Number of tags used",
      "Audience retention",
      "Click-through rate (CTR)",
      "Video file size",
      "Engagement (likes, comments, shares)",
    ],
    correctIndices: [0, 2, 3, 5],
    explanation:
      "Key YouTube algorithm signals include watch time, audience retention, CTR, and engagement (likes, comments, shares, subscribes). The number of tags and video file size are not primary algorithm signals.",
  },
  {
    type: "multi-select",
    question: "Which elements are important for YouTube SEO optimization? (Select all that apply)",
    options: [
      "Video title with target keyword",
      "Video description of 200+ words",
      "The color of your studio walls",
      "Tags mixing broad and specific terms",
      "Closed captions / SRT files",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "YouTube SEO involves optimizing titles with keywords, writing detailed descriptions, using relevant tags, and providing accurate captions. Studio wall color has no impact on search optimization.",
  },
  {
    type: "ordering",
    question: "Arrange these YouTube SEO elements in order of their impact on video discoverability (most impactful first).",
    items: ["Tags", "Title", "Thumbnail", "Description"],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "Thumbnail has the highest impact on discoverability (it drives CTR). Title is next (it affects both search ranking and CTR). Description provides context and keyword signals. Tags help YouTube understand content but have the least direct impact.",
  },
  {
    type: "multiple-choice",
    question: "How many words of bold text should an effective YouTube thumbnail contain?",
    options: [
      "0 — no text is best",
      "3-5 words maximum",
      "10-15 words",
      "A full sentence of 20+ words",
    ],
    correctIndex: 1,
    explanation:
      "Effective YouTube thumbnails use 3-5 words of bold text maximum. Thumbnails need to be readable at small sizes on mobile devices, so keeping text minimal and high-contrast is essential.",
  },
  {
    type: "multi-select",
    question: "Which of the following are best practices for YouTube thumbnails? (Select all that apply)",
    options: [
      "Use high contrast and bold colors",
      "Include 3-5 words of text maximum",
      "Use expressive faces when applicable",
      "Fill the entire thumbnail with small detailed text",
      "Use 1280x720 pixel resolution (16:9 aspect ratio)",
      "A/B test thumbnails using YouTube's built-in testing feature",
    ],
    correctIndices: [0, 1, 2, 4, 5],
    explanation:
      "Thumbnail best practices include high contrast, 3-5 bold words, expressive faces, 1280x720 resolution, and A/B testing. Filling thumbnails with small detailed text makes them unreadable at small sizes on mobile devices.",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is the recommended structure for a YouTube video?",
    options: [
      "Introduction, sponsor read, main content, outro",
      "Hook (first 5-10 seconds), body (value delivery), and CTA",
      "Thumbnail, title, description, tags",
      "Upload, publish, share, forget",
    ],
    correctIndex: 1,
    explanation:
      "Every high-performing video follows a proven structure: the hook (first 5-10 seconds) grabs attention, the body delivers on the promise with organized content, and the CTA tells viewers what to do next.",
  },
  {
    type: "multiple-choice",
    question: "What is an 'open loop' in video scripting?",
    options: [
      "A video that has no ending",
      "A question or tease posed early that is answered later to maintain attention",
      "A circular reference in the video description",
      "A playlist that repeats automatically",
    ],
    correctIndex: 1,
    explanation:
      "An open loop is a scripting technique where you pose a question or tease information early in the video that you answer later. This creates curiosity and motivates viewers to keep watching to get the payoff.",
  },
  {
    type: "multiple-choice",
    question: "What is the maximum duration for a YouTube Short?",
    options: [
      "15 seconds",
      "30 seconds",
      "60 seconds",
      "3 minutes",
    ],
    correctIndex: 2,
    explanation:
      "YouTube Shorts are videos under 60 seconds in vertical format. They serve as a discovery engine for your long-form content, reaching audiences through the Shorts shelf and feed.",
  },
  {
    type: "multiple-choice",
    question: "What is the number-one production factor that affects viewer retention?",
    options: [
      "Camera resolution (4K vs 1080p)",
      "Studio lighting setup",
      "Audio quality",
      "Background design",
    ],
    correctIndex: 2,
    explanation:
      "Audio quality is the number-one production factor that affects viewer retention. Viewers will tolerate average video quality but will abandon content with poor audio. Investing in a good microphone should come before upgrading your camera.",
  },
  {
    type: "multiple-choice",
    question: "Which software is recommended as a free video editing option?",
    options: [
      "Adobe Premiere Pro",
      "Final Cut Pro",
      "DaVinci Resolve",
      "Avid Media Composer",
    ],
    correctIndex: 2,
    explanation:
      "DaVinci Resolve is a professional-grade video editing software available for free. It is the recommended option for budget setups and offers powerful editing, color grading, and audio tools.",
  },
  {
    type: "true-false",
    question: "You need expensive professional equipment to start creating YouTube videos.",
    correctAnswer: false,
    explanation:
      "You do not need expensive equipment to start. A modern smartphone shoots excellent 4K video. A basic setup with a smartphone, clip-on lavalier mic, natural window light, and free editing software like DaVinci Resolve is enough to create quality content.",
  },
  {
    type: "true-false",
    question: "YouTube Shorts can serve as a discovery engine for long-form content on your channel.",
    correctAnswer: true,
    explanation:
      "YouTube Shorts reach a different audience through the Shorts shelf and feed, acting as a powerful discovery engine for your long-form content. The best strategy is to repurpose highlights from long-form videos into Shorts.",
  },
  {
    type: "multi-select",
    question: "Which of the following are effective YouTube Shorts strategies? (Select all that apply)",
    options: [
      "Repurpose highlights from long-form videos",
      "Use horizontal 16:9 format",
      "Include an immediate hook in the first second",
      "Create loop-worthy endings",
      "Make them 5-10 minutes long",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Effective Shorts strategies include repurposing highlights from long-form content, hooking viewers in the first second, and creating loop-worthy endings. Shorts must be vertical (not horizontal) and under 60 seconds (not 5-10 minutes).",
  },
  {
    type: "multi-select",
    question: "Which items are included in a budget video setup ($0-200)? (Select all that apply)",
    options: [
      "Smartphone camera",
      "Clip-on lavalier microphone",
      "Full-frame mirrorless camera",
      "Natural window light",
      "3-point lighting kit",
      "Free editing software",
    ],
    correctIndices: [0, 1, 3, 5],
    explanation:
      "A budget setup ($0-200) includes a smartphone, clip-on lav mic, natural window light, and free editing software like DaVinci Resolve. Full-frame cameras and 3-point lighting belong to professional ($3000+) setups.",
  },
  {
    type: "ordering",
    question: "Arrange these video scripting elements in the order they should appear in a YouTube video.",
    items: ["Call-to-action", "Hook / pattern interrupt", "Main content delivery", "Preview of what viewers will learn"],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "A YouTube video should start with a hook or pattern interrupt (first 5-10 seconds), then preview what viewers will learn (to set expectations and create open loops), then deliver the main content, and close with a clear call-to-action.",
  },
  {
    type: "multiple-choice",
    question: "Why should YouTube creators write full scripts or detailed outlines rather than 'winging it'?",
    options: [
      "YouTube requires scripts to be submitted before publishing",
      "Winging it leads to rambling content with poor retention",
      "Scripts are required for monetization",
      "The algorithm can read your script and rank you higher",
    ],
    correctIndex: 1,
    explanation:
      "Writing full scripts or detailed outlines prevents rambling content that causes poor audience retention. Structured content keeps viewers engaged longer, which signals to the algorithm that your video is valuable.",
  },
  {
    type: "ordering",
    question: "Arrange these equipment upgrade priorities in the order most creators should invest (first purchase to last).",
    items: ["Professional lighting kit", "XLR microphone with audio interface", "Quality USB microphone", "Full-frame camera body"],
    correctOrder: [2, 1, 0, 3],
    explanation:
      "Start with a quality USB microphone (audio matters most), then upgrade to an XLR mic with audio interface for professional sound, then add professional lighting to improve video quality, and lastly upgrade to a full-frame camera body.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question: "What should you name your video file before uploading to YouTube?",
    options: [
      "video_final_v3.mp4",
      "Your target keyword (e.g., youtube-seo-tutorial.mp4)",
      "The upload date (e.g., 2026-02-16.mp4)",
      "It doesn't matter — YouTube ignores filenames",
    ],
    correctIndex: 1,
    explanation:
      "Name your video file with your target keyword before uploading (e.g., youtube-seo-tutorial.mp4). YouTube reads the filename as a relevance signal, so including your keyword provides an additional SEO benefit.",
  },
  {
    type: "multiple-choice",
    question: "How many tags should you use per YouTube video?",
    options: [
      "0 — tags are obsolete",
      "1-2 exact match keywords only",
      "5-15 tags mixing exact keywords, variations, and broad topics",
      "50+ tags to cover every possible search term",
    ],
    correctIndex: 2,
    explanation:
      "Use 5-15 tags that mix your exact target keyword, keyword variations, and broader topic tags. This helps YouTube understand your video's context without appearing spammy.",
  },
  {
    type: "multiple-choice",
    question: "What is the typical click-through rate (CTR) range for YouTube videos?",
    options: [
      "0.1-0.5%",
      "1-2%",
      "4-10%",
      "20-30%",
    ],
    correctIndex: 2,
    explanation:
      "A typical CTR for YouTube videos ranges from 4-10%. CTR measures how often viewers click your video when they see the thumbnail and title in search results or recommendations.",
  },
  {
    type: "multiple-choice",
    question: "Why should you respond to comments within the first hour of publishing?",
    options: [
      "YouTube will delete comments that are not responded to",
      "YouTube uses early engagement as a freshness signal for the algorithm",
      "Viewers cannot leave comments after the first hour",
      "It is required by YouTube's terms of service",
    ],
    correctIndex: 1,
    explanation:
      "Responding to comments within the first hour of publishing matters because YouTube uses early engagement as a freshness signal. Active comment sections tell the algorithm that your video is generating meaningful interaction.",
  },
  {
    type: "multiple-choice",
    question: "What should you include at the end of every YouTube video to promote related content?",
    options: [
      "A disclaimer about copyright",
      "Cards and end screens",
      "A 30-second silence",
      "An advertisement for your channel",
    ],
    correctIndex: 1,
    explanation:
      "Add clickable cards at key moments throughout the video and an end screen in the final 5-20 seconds promoting related content. These features increase session watch time and drive viewers to more of your content.",
  },
  {
    type: "true-false",
    question: "Embedding YouTube videos in blog posts can boost SEO and dwell time on your website.",
    correctAnswer: true,
    explanation:
      "Embedding YouTube videos in blog posts increases dwell time (how long visitors stay on the page), which is a positive signal for both Google SEO and user engagement. It also gives your video additional views from website traffic.",
  },
  {
    type: "true-false",
    question: "You should only share YouTube videos on YouTube and never distribute clips to other platforms.",
    correctAnswer: false,
    explanation:
      "Maximizing reach requires distributing across multiple platforms. Share native clips on LinkedIn, Twitter/X, Instagram Reels, and TikTok. Extract audio for podcasts. Create quote graphics and carousels for social media. Send video links in email newsletters.",
  },
  {
    type: "multi-select",
    question: "Which elements should be included in a YouTube upload optimization checklist? (Select all that apply)",
    options: [
      "Keyword-optimized filename",
      "Custom thumbnail at 1280x720",
      "Description with 200+ words",
      "The creator's home address",
      "Accurate closed captions / SRT files",
      "Cards and end screens",
    ],
    correctIndices: [0, 1, 2, 4, 5],
    explanation:
      "A YouTube upload checklist should include a keyword-optimized filename, custom thumbnail, detailed description, accurate captions, and cards/end screens. Personal information like home addresses should never be included.",
  },
  {
    type: "multi-select",
    question: "Which are effective ways to distribute YouTube content beyond the platform itself? (Select all that apply)",
    options: [
      "Embed videos in blog posts",
      "Share native clips on LinkedIn and Instagram",
      "Extract audio for podcast episodes",
      "Print video transcripts as flyers",
      "Send video links in email newsletters",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "Effective cross-platform distribution includes embedding in blog posts, sharing native clips on social platforms, extracting audio for podcasts, and including video links in email newsletters. Printing transcripts as flyers is not an effective digital distribution strategy.",
  },
  {
    type: "ordering",
    question: "Put these YouTube upload optimization steps in the correct order.",
    items: ["Add cards and end screens", "Name file with target keyword", "Write 200+ word description", "Upload and set custom thumbnail", "Craft keyword-rich title"],
    correctOrder: [1, 3, 4, 2, 0],
    explanation:
      "First name the file with your target keyword, then upload and set a custom thumbnail, craft a keyword-rich title, write a detailed description, and finally add cards and end screens to promote related content.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of pinning a comment on your YouTube video?",
    options: [
      "To hide negative comments from viewers",
      "To feature a question or CTA that drives engagement",
      "To automatically respond to all new comments",
      "To prevent other users from commenting",
    ],
    correctIndex: 1,
    explanation:
      "Pinning a comment with a question or CTA on every video drives engagement by prompting viewers to respond. Pinned comments appear at the top of the comment section and can encourage discussion, answer FAQs, or link to related resources.",
  },
  {
    type: "multiple-choice",
    question: "What is the recommended purpose of YouTube playlists?",
    options: [
      "To hide old videos from your channel page",
      "To organize content and increase session watch time",
      "To limit who can view your videos",
      "To automatically delete videos after a set time",
    ],
    correctIndex: 1,
    explanation:
      "Playlists organize your content into themed collections and increase session watch time by auto-playing related videos sequentially. This benefits both viewer experience and algorithm performance.",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question: "What average view duration percentage should you aim for on YouTube?",
    options: [
      "10%+",
      "25%+",
      "50%+",
      "95%+",
    ],
    correctIndex: 2,
    explanation:
      "Aim for 50%+ average view duration (audience retention). This means viewers are watching at least half of your video on average, which signals to the algorithm that your content is engaging and valuable.",
  },
  {
    type: "multiple-choice",
    question: "How long should you wait after publishing to get a full picture of a video's performance?",
    options: [
      "2 hours",
      "24 hours",
      "28 days",
      "6 months",
    ],
    correctIndex: 2,
    explanation:
      "While initial data is available after 48 hours, you should wait 28 days for a full picture of a video's performance. This allows enough time for the algorithm to fully test and distribute your content.",
  },
  {
    type: "multiple-choice",
    question: "If your video's CTR is low, what should you test first?",
    options: [
      "Video length",
      "Thumbnails and titles",
      "Video description",
      "Tags",
    ],
    correctIndex: 1,
    explanation:
      "If CTR is low, test new thumbnails and titles first because these are the primary elements viewers see before deciding to click. CTR is directly determined by how compelling your thumbnail and title combination appears.",
  },
  {
    type: "multiple-choice",
    question: "What does the Audience Retention Graph show?",
    options: [
      "How many subscribers you gained from each video",
      "The geographic distribution of your viewers",
      "Exactly where viewers drop off, rewatch, or skip within a video",
      "The total revenue generated by each video",
    ],
    correctIndex: 2,
    explanation:
      "The Audience Retention Graph shows exactly where viewers drop off, rewatch, or skip within your video. This data is invaluable for improving future scripts by identifying which sections lose or gain viewer attention.",
  },
  {
    type: "multiple-choice",
    question: "If retention drops early in your video, what should you improve?",
    options: [
      "Your end screens",
      "Your hooks (first 5-10 seconds)",
      "Your video description",
      "Your channel banner",
    ],
    correctIndex: 1,
    explanation:
      "If retention drops early, your hook (first 5-10 seconds) is not compelling enough. Improve it by making a stronger promise, using a pattern interrupt, or immediately addressing the viewer's problem.",
  },
  {
    type: "true-false",
    question: "Most YouTube channels find their stride after publishing just 5-10 videos.",
    correctAnswer: false,
    explanation:
      "Most channels take 50-100 videos to find their stride. YouTube success requires patience, consistent publishing, and continuous optimization based on analytics data over an extended period.",
  },
  {
    type: "true-false",
    question: "YouTube Studio provides analytics showing traffic sources, which reveal where your views come from (Search, Suggested, Browse, External).",
    correctAnswer: true,
    explanation:
      "YouTube Studio's Traffic Sources report shows where views come from — Search, Suggested Videos, Browse (Homepage), External sources, and more. This data informs your SEO and distribution strategy.",
  },
  {
    type: "multi-select",
    question: "Which of the following are key YouTube analytics metrics? (Select all that apply)",
    options: [
      "Views and watch time",
      "Average view duration",
      "Printer ink costs",
      "Click-through rate (CTR)",
      "Traffic sources",
      "Audience retention graph",
    ],
    correctIndices: [0, 1, 3, 4, 5],
    explanation:
      "Key YouTube analytics metrics include views and watch time, average view duration, CTR, traffic sources, and the audience retention graph. Printer ink costs are not a YouTube metric.",
  },
  {
    type: "multi-select",
    question: "What should you do if your Suggested traffic is low? (Select all that apply)",
    options: [
      "Optimize end screens to promote related content",
      "Create tighter content clusters around related topics",
      "Delete all your old videos",
      "Improve video packaging (thumbnails and titles)",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "To increase Suggested traffic, optimize end screens to chain related videos, create content clusters so YouTube associates your videos with each other, and improve packaging to increase CTR from the Suggested sidebar. Deleting old videos removes potential traffic sources.",
  },
  {
    type: "ordering",
    question: "Put the YouTube continuous improvement cycle steps in the correct order.",
    items: ["Iterate and apply changes", "Publish content", "Identify patterns in data", "Analyze after 48 hours and 28 days"],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "The optimization loop is: publish content, analyze performance data (after 48 hours for initial trends and 28 days for a full picture), identify patterns in the data, and iterate by applying changes to future content.",
  },
  {
    type: "multiple-choice",
    question: "If retention drops in the middle of your video, what is the most likely issue?",
    options: [
      "Your thumbnail is misleading",
      "Your script has too much filler content that needs tightening",
      "Your video title is too long",
      "Your channel does not have enough subscribers",
    ],
    correctIndex: 1,
    explanation:
      "If retention falls in the middle of the video, the content likely has filler or loses momentum. Tighten your script, remove tangents, and ensure every section delivers clear value to keep viewers engaged.",
  },
  {
    type: "ordering",
    question: "Arrange these video performance issues with their correct diagnostic action, from the first thing to check to the last.",
    items: ["Low Suggested traffic — optimize end screens and content clusters", "Low CTR — test new thumbnails and titles", "Early retention drop — improve hooks", "Mid-video drop — tighten script"],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Start by checking CTR (the gateway to all other metrics), then early retention (which affects whether viewers stay), then mid-video retention (which impacts total watch time), and finally Suggested traffic optimization (which depends on all other metrics being healthy).",
  },
];
