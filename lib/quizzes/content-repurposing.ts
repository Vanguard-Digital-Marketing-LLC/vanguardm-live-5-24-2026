import type { QuizQuestion } from "@/lib/academy-data";

export const contentRepurposingQuiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question: "What does the 'CODE' approach stand for in content repurposing?",
    options: [
      "Content Optimization and Digital Enhancement",
      "Create Once, Distribute Everywhere",
      "Centralized Online Distribution Engine",
      "Content Organization for Digital Engagement",
    ],
    correctIndex: 1,
    explanation:
      "CODE stands for 'Create Once, Distribute Everywhere' — the core philosophy of content repurposing where a single piece of comprehensive content is transformed into multiple formats for distribution across different channels.",
  },
  {
    type: "multiple-choice",
    question: "What percentage of a content piece's potential audience does it typically reach on a single platform?",
    options: [
      "10%",
      "35%",
      "60%",
      "85%",
    ],
    correctIndex: 0,
    explanation:
      "The average piece of content reaches only 10% of its potential audience on a single platform. Repurposing extends your reach to the other 90% by adapting the content for multiple platforms and formats.",
  },
  {
    type: "multiple-choice",
    question: "How much more output can brands that repurpose effectively produce with the same resources?",
    options: [
      "1.5x more",
      "2x more",
      "3x more",
      "5x more",
    ],
    correctIndex: 2,
    explanation:
      "Brands that repurpose content effectively produce 3x more output with the same resources while maintaining or improving quality. This efficiency gain is the primary business case for building a repurposing system.",
  },
  {
    type: "multiple-choice",
    question: "What is 'pillar content' in the context of content repurposing?",
    options: [
      "Any social media post that gets high engagement",
      "A comprehensive, high-value piece that serves as the source for multiple derivative formats",
      "Content published on pillar pages for SEO",
      "The first piece of content a company ever publishes",
    ],
    correctIndex: 1,
    explanation:
      "Pillar content is a comprehensive, high-value piece — like a long-form video, webinar, or in-depth guide — that serves as the 'trunk' from which all derivative 'branches' grow through format transformation.",
  },
  {
    type: "multiple-choice",
    question: "What is 'content multiplication'?",
    options: [
      "Duplicating the same post across multiple accounts",
      "The systematic process of extracting maximum derivative pieces from every pillar piece",
      "Paying to boost content reach with advertising",
      "Writing multiple drafts of the same article",
    ],
    correctIndex: 1,
    explanation:
      "Content multiplication is the systematic process of extracting the maximum number of derivative pieces from every pillar content piece, following a hierarchy from highest-effort to lowest-effort formats.",
  },
  {
    type: "true-false",
    question: "Content repurposing means copying and pasting the same content across every platform without any changes.",
    correctAnswer: false,
    explanation:
      "Content repurposing is not about copying and pasting. Each derivative piece must be native to its platform, providing genuine value in the format and context where it appears. Lazy cross-posting is the opposite of strategic repurposing.",
  },
  {
    type: "true-false",
    question: "A single 45-minute webinar can potentially be repurposed into a blog post, social media posts, email newsletters, video clips, an infographic, and a podcast episode.",
    correctAnswer: true,
    explanation:
      "A single 45-minute webinar can become a blog post, 10+ social media posts, multiple email newsletters, a YouTube video, several Shorts/Reels, an infographic, a slide deck, and a podcast episode — demonstrating the power of content multiplication.",
  },
  {
    type: "multi-select",
    question: "Which of the following are benefits of content repurposing? (Select all that apply)",
    options: [
      "Extends reach to audiences on different platforms",
      "Reduces content production costs per piece",
      "Eliminates the need for original content creation",
      "Extends the lifespan of content investments",
      "Maintains multi-platform presence efficiently",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Repurposing extends reach, reduces per-piece costs, extends content lifespan, and maintains multi-platform presence. However, it does not eliminate the need for original content — you still need high-quality pillar content as the source.",
  },
  {
    type: "multi-select",
    question: "Which formats work well as pillar content for repurposing? (Select all that apply)",
    options: [
      "Long-form video (20-60 minutes)",
      "Webinars",
      "A single tweet",
      "Podcast interviews",
      "Comprehensive guides (3,000+ words)",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Effective pillar content includes long-form video, webinars, podcast interviews, and comprehensive guides. A single tweet is a micro-content piece — it lacks the depth needed to serve as a source for multiple derivative formats.",
  },
  {
    type: "ordering",
    question: "Arrange these from the content that reaches the smallest audience to the largest potential audience through repurposing.",
    items: ["Content on one platform only", "Content repurposed to 3 platforms", "Content repurposed to 8+ platforms", "Content repurposed to 5 platforms"],
    correctOrder: [0, 1, 3, 2],
    explanation:
      "A single platform reaches the smallest audience (about 10% of potential). Each additional platform extends reach. Repurposing to 3, then 5, then 8+ platforms progressively expands your content's total audience.",
  },
  {
    type: "multi-select",
    question: "Which of the following accurately describe the relationship between pillar and derivative content? (Select all that apply)",
    options: [
      "Pillar content is the comprehensive source from which derivatives are created",
      "Derivatives must be adapted to each platform's native format",
      "Derivatives should always be exact copies of the pillar content",
      "Pillar content serves as the 'trunk' and derivatives are the 'branches'",
      "Each derivative should provide standalone value on its platform",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Pillar content is the comprehensive source (trunk), and derivatives are adapted branches formatted for specific platforms. Each derivative must provide standalone value — they should never be exact copies of the pillar content.",
  },
  {
    type: "multi-select",
    question: "Which of the following are long-term benefits of content repurposing? (Select all that apply)",
    options: [
      "Compounding SEO benefits from multiple indexed pages",
      "Building topical authority across platforms over time",
      "Eliminating the need for any new content creation",
      "Reduced per-piece production cost as processes mature",
      "Extended content lifespan beyond initial publication",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Long-term repurposing benefits include compounding SEO, building topical authority, reducing per-piece costs, and extending content lifespan. However, repurposing does not eliminate the need for new pillar content creation.",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question: "What makes pillar content effective for repurposing?",
    options: [
      "It must be at least 10,000 words long",
      "It has a modular structure that can stand alone as individual pieces",
      "It must be written by a professional journalist",
      "It should only cover one narrow point",
    ],
    correctIndex: 1,
    explanation:
      "Effective pillar content has a modular structure organized in clearly defined sections that can stand alone as individual derivative pieces. It also contains quotable moments, visual potential, evergreen value, and multi-format compatibility.",
  },
  {
    type: "multiple-choice",
    question: "What is the key principle of format transformation in repurposing?",
    options: [
      "Always use the exact same text across all platforms",
      "Adapt the message to fit each platform's native format and audience expectations",
      "Only repurpose content that has gone viral",
      "Transform content into one additional format maximum",
    ],
    correctIndex: 1,
    explanation:
      "Effective format transformation adapts the message to fit each platform's native format, audience expectations, and consumption patterns. A LinkedIn post requires a different structure than a TikTok video, even if the core insight is identical.",
  },
  {
    type: "multiple-choice",
    question: "In the content multiplication hierarchy, what format should you typically start with?",
    options: [
      "Social media posts (lowest effort)",
      "Blog posts (medium effort)",
      "Video (highest effort)",
      "Email newsletters",
    ],
    correctIndex: 2,
    explanation:
      "The content multiplication framework starts with your highest-effort format (typically video), then works down to lower-effort derivatives. Video becomes audio (podcast), audio becomes text (blog), text becomes social posts, and social posts become ads.",
  },
  {
    type: "multiple-choice",
    question: "Why should pillar content be evergreen rather than time-sensitive?",
    options: [
      "Evergreen content is cheaper to produce",
      "Time-sensitive content cannot be repurposed at all",
      "Evergreen insights remain relevant for months or years, maximizing repurposing ROI",
      "Platforms only promote evergreen content",
    ],
    correctIndex: 2,
    explanation:
      "Evergreen pillar content has core insights that remain relevant for months or years, maximizing the ROI of repurposing because derivative pieces continue to perform long after the original is published.",
  },
  {
    type: "multiple-choice",
    question: "What question should you ask when adapting content for a specific platform?",
    options: [
      "How can I use the exact same copy here?",
      "How does this platform's audience prefer to consume information, and how do I adapt this insight to match?",
      "How quickly can I post this without any changes?",
      "How many hashtags should I include?",
    ],
    correctIndex: 1,
    explanation:
      "The key question is: 'How does this platform's audience prefer to consume information, and how do I adapt this insight to match?' This ensures each derivative piece is native to its platform rather than a lazy cross-post.",
  },
  {
    type: "true-false",
    question: "Pillar content should contain quotable moments, statistics, and insights that work as standalone social posts.",
    correctAnswer: true,
    explanation:
      "Great pillar content contains memorable statements, statistics, and insights that can be extracted as standalone social media posts. Building these quotable moments into your pillar content intentionally makes the repurposing process more efficient.",
  },
  {
    type: "true-false",
    question: "The content multiplication hierarchy works from lowest-effort formats up to highest-effort formats.",
    correctAnswer: false,
    explanation:
      "The content multiplication hierarchy works from highest-effort to lowest-effort: start with video, extract audio for podcast, transcribe to blog post, pull quotes for social media, and use social posts as ad copy. Each step down requires less production effort.",
  },
  {
    type: "multi-select",
    question: "Which characteristics make content effective as pillar material? (Select all that apply)",
    options: [
      "Modular structure with standalone sections",
      "Contains quotable moments and statistics",
      "Only discusses trending topics",
      "Has visual potential (data, frameworks, processes)",
      "Multi-format compatibility",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Effective pillar content has modular structure, quotable moments, visual potential, multi-format compatibility, and evergreen value. Limiting to trending topics undermines the evergreen quality that maximizes repurposing ROI.",
  },
  {
    type: "multi-select",
    question: "Which of the following represent the correct content multiplication hierarchy? (Select all that apply)",
    options: [
      "Video becomes audio (podcast)",
      "Audio becomes text (blog post/transcript)",
      "Text becomes social posts",
      "Social posts become full-length videos",
      "Social posts become ad copy",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "The hierarchy flows downward: video to audio, audio to text, text to social posts, and social posts to ads. Each step requires less effort. Going from social posts to full-length videos would go against the hierarchy (up instead of down).",
  },
  {
    type: "ordering",
    question: "Put the content multiplication hierarchy in the correct order from highest-effort source to lowest-effort derivative.",
    items: ["Social media posts", "Blog post / transcript", "Video (long-form)", "Audio / podcast episode"],
    correctOrder: [2, 3, 1, 0],
    explanation:
      "The hierarchy flows: Video (highest effort to create) to Audio/podcast (extract audio track) to Blog post/transcript (convert to text) to Social media posts (extract key quotes and insights — lowest effort per piece).",
  },
  {
    type: "multiple-choice",
    question: "What is the difference between strategic repurposing and lazy cross-posting?",
    options: [
      "There is no difference — they are the same thing",
      "Strategic repurposing adapts content to each platform; lazy cross-posting shares identical content everywhere",
      "Lazy cross-posting is more effective because it saves time",
      "Strategic repurposing only works for video content",
    ],
    correctIndex: 1,
    explanation:
      "Strategic repurposing adapts the message to fit each platform's native format, audience expectations, and consumption patterns. Lazy cross-posting shares identical content everywhere without adaptation, which typically underperforms on every platform.",
  },
  {
    type: "ordering",
    question: "Arrange these pillar content formats from typically most repurposable to least repurposable.",
    items: ["A single data point", "45-minute video interview", "A brief social media caption", "3,000-word comprehensive guide"],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "A 45-minute video interview offers the most repurposable material (video, audio, transcript, clips, quotes). A comprehensive guide is also highly repurposable. Brief social captions have limited material. A single data point provides the least source material for derivatives.",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question: "How many tiers does a typical repurposing waterfall have?",
    options: [
      "1 tier",
      "2 tiers",
      "3 tiers (long-form, mid-form, micro-content)",
      "5 tiers",
    ],
    correctIndex: 2,
    explanation:
      "A typical repurposing waterfall has 3 tiers: Tier 1 (long-form derivatives like full videos, podcasts, and blog posts), Tier 2 (mid-form like LinkedIn articles, Shorts, and threads), and Tier 3 (micro-content like social posts, audiograms, and story slides).",
  },
  {
    type: "multiple-choice",
    question: "What is an SOP in the context of content repurposing?",
    options: [
      "Social Optimization Platform — a tool for scheduling posts",
      "Standard Operating Procedure — a documented step-by-step process for specific transformations",
      "Search Optimization Protocol — an SEO framework",
      "Subscriber Outreach Plan — a strategy for growing email lists",
    ],
    correctIndex: 1,
    explanation:
      "An SOP (Standard Operating Procedure) is a step-by-step documented process that enables anyone on your team to execute a specific repurposing transformation consistently, such as 'Blog Post to Twitter Thread' or 'Podcast Episode to Blog Post.'",
  },
  {
    type: "multiple-choice",
    question: "What should each repurposing SOP include?",
    options: [
      "Only the final output format",
      "Input format, output specifications, platform requirements, tools needed, quality checklist, and estimated time",
      "Just the writer's name and deadline",
      "Only the platform where it will be published",
    ],
    correctIndex: 1,
    explanation:
      "Each SOP should cover the input format, output specifications, platform requirements, tools needed, quality checklist, and estimated time. This ensures consistent, high-quality output regardless of who executes the process.",
  },
  {
    type: "multiple-choice",
    question: "Which platform favors professional insights and storytelling in text format?",
    options: [
      "TikTok",
      "Instagram",
      "LinkedIn",
      "YouTube Shorts",
    ],
    correctIndex: 2,
    explanation:
      "LinkedIn favors professional insights and storytelling in text format. Understanding platform-specific content preferences is essential for adapting derivative content to perform well on each channel.",
  },
  {
    type: "multiple-choice",
    question: "How often should SOPs be reviewed and updated?",
    options: [
      "Never — once written, they are final",
      "Daily",
      "Quarterly",
      "Every 2-3 years",
    ],
    correctIndex: 2,
    explanation:
      "SOPs should be reviewed quarterly to account for platform changes, new tools, updated best practices, and lessons learned from team feedback. Regular review ensures processes stay current and effective.",
  },
  {
    type: "true-false",
    question: "TikTok and YouTube Shorts demand immediate hooks and fast pacing for repurposed content.",
    correctAnswer: true,
    explanation:
      "TikTok and YouTube Shorts reward content with immediate hooks (within the first second), fast pacing, and pattern interrupts. Repurposed clips must be adapted to match these platform-specific expectations to perform well.",
  },
  {
    type: "true-false",
    question: "Email allows for longer, more detailed repurposed content compared to social media platforms.",
    correctAnswer: true,
    explanation:
      "Email provides a more intimate, focused environment where subscribers are willing to consume longer, more detailed content. This makes it ideal for repurposing in-depth sections of pillar content that would be too long for social media.",
  },
  {
    type: "multi-select",
    question: "Which items belong in Tier 1 (long-form derivatives) of the repurposing waterfall? (Select all that apply)",
    options: [
      "Full YouTube video",
      "Individual social media quote post",
      "Podcast episode (audio extract)",
      "Comprehensive blog post",
      "Instagram Story slide",
      "Email newsletter feature",
    ],
    correctIndices: [0, 2, 3, 5],
    explanation:
      "Tier 1 long-form derivatives include full YouTube videos, podcast episodes, comprehensive blog posts, and email newsletter features. Individual social media posts and Story slides are Tier 3 micro-content.",
  },
  {
    type: "multi-select",
    question: "Which are examples of Tier 3 micro-content? (Select all that apply)",
    options: [
      "Quote graphics for social media",
      "Full podcast episode",
      "Individual tip posts",
      "Audiograms",
      "Comprehensive blog post",
      "Community discussion prompts",
    ],
    correctIndices: [0, 2, 3, 5],
    explanation:
      "Tier 3 micro-content includes quote graphics, individual tip posts, audiograms, story slides, and community discussion prompts. Full podcast episodes and comprehensive blog posts are Tier 1 long-form derivatives.",
  },
  {
    type: "ordering",
    question: "Arrange these repurposing waterfall tiers from first to create to last to create.",
    items: ["Tier 3: Micro-content (quotes, audiograms, story slides)", "Tier 1: Long-form derivatives (video, podcast, blog)", "Tier 2: Mid-form (articles, Shorts, threads, infographics)"],
    correctOrder: [1, 2, 0],
    explanation:
      "Create Tier 1 long-form derivatives first (they require the most adaptation from the pillar), then Tier 2 mid-form content (extracted from long-form), and finally Tier 3 micro-content (the quickest to produce from existing material).",
  },
  {
    type: "multiple-choice",
    question: "Where should repurposing SOPs be stored?",
    options: [
      "In the team leader's personal notebook",
      "In a shared knowledge base (Notion, Google Docs, Confluence)",
      "Memorized by each team member",
      "On a physical whiteboard in the office",
    ],
    correctIndex: 1,
    explanation:
      "SOPs should be stored in a shared knowledge base like Notion, Google Docs, or Confluence where all team members can access, reference, and contribute to them. This ensures processes are documented, accessible, and not dependent on individual memory.",
  },
  {
    type: "multiple-choice",
    question: "What separates strategic repurposing from lazy cross-posting according to platform adaptation?",
    options: [
      "Strategic repurposing uses better hashtags",
      "Understanding that each platform has unique specifications and audience expectations",
      "Strategic repurposing costs more money",
      "Lazy cross-posting is actually the better approach",
    ],
    correctIndex: 1,
    explanation:
      "Strategic repurposing is built on understanding that each platform has unique specifications and audience expectations. LinkedIn favors professional text, TikTok demands fast-paced video, email allows detailed content — each derivative must be adapted accordingly.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is the first step in the repurposing production line?",
    options: [
      "Schedule distribution across platforms",
      "Create the comprehensive pillar content",
      "Extract key moments from content",
      "Track performance metrics",
    ],
    correctIndex: 1,
    explanation:
      "The repurposing production line starts with creating the pillar content — the comprehensive source piece. Without a high-quality pillar, there is nothing valuable to repurpose into derivative formats.",
  },
  {
    type: "multiple-choice",
    question: "What type of tool is Opus Clip used for in content repurposing?",
    options: [
      "Email marketing automation",
      "Graphic design and infographics",
      "Automatic video clipping — identifying and extracting highlight clips from long-form video",
      "Podcast hosting and distribution",
    ],
    correctIndex: 2,
    explanation:
      "Opus Clip is a video clipping tool that uses AI to automatically identify and extract highlight clips from long-form video, adding captions and formatting them for short-form platforms like TikTok, Shorts, and Reels.",
  },
  {
    type: "multiple-choice",
    question: "What is 'batch processing' in content repurposing?",
    options: [
      "Publishing all content at the same time",
      "Grouping similar tasks together on specific days for efficiency",
      "Deleting old content in batches",
      "Creating content in batch sizes of exactly 10 pieces",
    ],
    correctIndex: 1,
    explanation:
      "Batch processing means grouping similar tasks together for efficiency — dedicating specific days to specific activities (e.g., Monday for pillar creation, Tuesday for extraction, Wednesday for design). This reduces context switching and improves productivity.",
  },
  {
    type: "multiple-choice",
    question: "In a sample batch processing week, what activity is recommended for Mondays?",
    options: [
      "Analysis and reporting",
      "Pillar content creation",
      "Scheduling posts",
      "Design and formatting",
    ],
    correctIndex: 1,
    explanation:
      "In a sample batch processing week: Monday is for pillar creation, Tuesday for extraction and transformation, Wednesday for design and formatting, Thursday for scheduling, and Friday for analysis. Starting with pillar creation ensures source material is ready for the rest of the week.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of staggering derivative content distribution over days or weeks?",
    options: [
      "To confuse the algorithm into promoting your content more",
      "To maximize visibility and avoid overwhelming your audience on any single day",
      "Because platforms only allow one post per week",
      "To make your content appear newer than it is",
    ],
    correctIndex: 1,
    explanation:
      "Staggering distribution maximizes visibility across different time zones and audience segments while avoiding audience fatigue from seeing too much content from you at once. It also extends the effective lifespan of your pillar content.",
  },
  {
    type: "true-false",
    question: "Descript is a tool that can be used for both transcription and video editing in content repurposing.",
    correctAnswer: true,
    explanation:
      "Descript serves dual purposes in content repurposing: it provides accurate transcription (converting audio/video to text) and offers video editing capabilities including text-based editing where you edit video by editing the transcript.",
  },
  {
    type: "true-false",
    question: "Batch processing reduces context switching and allows you to produce an entire week or month of derivative content in concentrated sessions.",
    correctAnswer: true,
    explanation:
      "Batch processing reduces context switching by grouping similar tasks together, allowing you to enter a focused workflow state. This approach enables producing a week or even a month of derivative content in concentrated work sessions.",
  },
  {
    type: "multi-select",
    question: "Which tools are used for video clipping in content repurposing? (Select all that apply)",
    options: [
      "Opus Clip",
      "Mailchimp",
      "Descript",
      "CapCut",
      "QuickBooks",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Opus Clip, Descript, and CapCut are all used for video clipping — identifying and extracting highlight clips from long-form video with captions. Mailchimp is for email marketing and QuickBooks is for accounting.",
  },
  {
    type: "multi-select",
    question: "Which steps are part of the repurposing production line? (Select all that apply)",
    options: [
      "Create the pillar content",
      "Extract key moments and insights",
      "Delete all original source content",
      "Transform formats using SOPs",
      "Schedule distribution across platforms",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "The production line includes: create pillar content, extract key moments, transform formats using SOPs, schedule distribution, and track/iterate. You should never delete original source content — it continues to provide value.",
  },
  {
    type: "ordering",
    question: "Put the repurposing production line steps in the correct order.",
    items: ["Track and iterate on performance", "Extract key moments and insights", "Create the pillar content", "Schedule distribution", "Transform into platform-native formats"],
    correctOrder: [2, 1, 4, 3, 0],
    explanation:
      "The production line flows: Create the pillar content, extract key moments and insights, transform into platform-native formats using SOPs, schedule distribution across platforms, and track performance to iterate and improve.",
  },
  {
    type: "multiple-choice",
    question: "Which tool category is used for creating carousel posts and infographics from pillar content?",
    options: [
      "Video clipping tools",
      "Transcription tools",
      "Design and graphics tools (Canva, Figma)",
      "Scheduling tools",
    ],
    correctIndex: 2,
    explanation:
      "Design and graphics tools like Canva and Figma are used to create carousel posts, infographics, quote graphics, and branded templates for each platform from pillar content insights and data.",
  },
  {
    type: "ordering",
    question: "Arrange these batch processing days in the recommended weekly order.",
    items: ["Analysis", "Scheduling", "Design and formatting", "Extraction and transformation", "Pillar creation"],
    correctOrder: [4, 3, 2, 1, 0],
    explanation:
      "The recommended batch week: Monday for pillar creation, Tuesday for extraction and transformation, Wednesday for design and formatting, Thursday for scheduling, and Friday for analysis. This logical flow builds on each previous day's output.",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is the 'content multiplication ratio'?",
    options: [
      "The ratio of paid to organic content",
      "The number of derivative pieces produced per pillar piece",
      "The ratio of text to image content",
      "The number of platforms you publish on",
    ],
    correctIndex: 1,
    explanation:
      "The content multiplication ratio measures the number of derivative pieces produced per pillar piece. A good target is 15-25x, meaning each pillar piece generates 15-25 individual pieces of derivative content.",
  },
  {
    type: "multiple-choice",
    question: "What content multiplication ratio should you aim for?",
    options: [
      "2-5x",
      "5-10x",
      "15-25x",
      "50-100x",
    ],
    correctIndex: 2,
    explanation:
      "Aim for a content multiplication ratio of 15-25x, meaning each pillar piece generates 15-25 individual derivative pieces. This ratio ensures you are extracting substantial value from each pillar investment.",
  },
  {
    type: "multiple-choice",
    question: "Which type of pillar content should receive the most repurposing effort?",
    options: [
      "The newest content regardless of performance",
      "Content that performed best in its original format",
      "Content that was cheapest to produce",
      "Content from external guest contributors",
    ],
    correctIndex: 1,
    explanation:
      "Prioritize repurposing your top-performing pillar content — the pieces that drove the most engagement, traffic, or conversions in their original format. High-performing source material is more likely to produce high-performing derivatives.",
  },
  {
    type: "multiple-choice",
    question: "Why should you prioritize repurposing evergreen content over time-sensitive content?",
    options: [
      "Evergreen content is always shorter",
      "Evergreen derivatives continue to perform for months, maximizing repurposing ROI",
      "Time-sensitive content cannot be shared on social media",
      "Evergreen content requires no editing",
    ],
    correctIndex: 1,
    explanation:
      "Evergreen topics produce derivatives that continue to perform for months or years after publication, maximizing the ROI of the repurposing effort. Time-sensitive content becomes irrelevant quickly, limiting the lifespan of its derivatives.",
  },
  {
    type: "multiple-choice",
    question: "What does 'cost per piece' measure in repurposing?",
    options: [
      "The price of each social media platform subscription",
      "Total content production cost divided by number of published pieces (pillar + derivatives)",
      "The cost of hiring freelance writers per article",
      "The advertising budget per content piece",
    ],
    correctIndex: 1,
    explanation:
      "Cost per piece is calculated by dividing total content production cost by the total number of published pieces (pillar + all derivatives). This metric demonstrates the efficiency gains of repurposing by showing how the per-piece cost decreases with more derivatives.",
  },
  {
    type: "true-false",
    question: "Not all content deserves equal repurposing effort — you should prioritize top-performing pillar content.",
    correctAnswer: true,
    explanation:
      "Not all content deserves equal repurposing effort. Focus more resources on repurposing pillar content that performed best in its original format, as this is more likely to produce high-performing derivatives.",
  },
  {
    type: "true-false",
    question: "The most common repurposing mistake is spending too much time adapting content for each platform.",
    correctAnswer: false,
    explanation:
      "The most common repurposing mistakes are actually the opposite: lazy cross-posting (sharing identical content everywhere without adaptation), repurposing low-quality source content, and neglecting platform-specific optimization.",
  },
  {
    type: "multi-select",
    question: "Which of the following are key repurposing metrics? (Select all that apply)",
    options: [
      "Content multiplication ratio",
      "Per-platform performance of derivatives",
      "Number of employees on the team",
      "Time-to-publish for derivatives",
      "Cross-platform attribution",
      "Cost per piece",
    ],
    correctIndices: [0, 1, 3, 4, 5],
    explanation:
      "Key repurposing metrics include content multiplication ratio, per-platform performance, time-to-publish, cross-platform attribution, and cost per piece. Team size is an operational metric, not a repurposing performance metric.",
  },
  {
    type: "multi-select",
    question: "What are common repurposing pitfalls to avoid? (Select all that apply)",
    options: [
      "Lazy cross-posting without platform adaptation",
      "Repurposing low-quality source content",
      "Creating too many platform-specific versions",
      "Neglecting platform-specific optimization",
      "Failing to add fresh context for each platform",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Common pitfalls include lazy cross-posting, repurposing poor source material, neglecting platform optimization, and failing to add fresh context. Creating platform-specific versions is actually the goal, not a pitfall.",
  },
  {
    type: "ordering",
    question: "Arrange these repurposing optimization priorities from most important to least important.",
    items: ["Test new derivative formats", "Identify top-performing pillar content to repurpose more", "Review per-platform performance data", "Eliminate consistently underperforming derivative formats"],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "Start by reviewing data to understand what's working, then identify top performers to double down on, eliminate what consistently fails, and finally test new formats. This data-driven approach ensures resources go to proven strategies first.",
  },
  {
    type: "multiple-choice",
    question: "How should you treat each derivative piece when repurposing content?",
    options: [
      "As a lesser version of the original pillar content",
      "As a standalone piece that must earn attention on its own, even though the core insight is borrowed",
      "As an exact copy of the pillar content",
      "As temporary content that should be deleted after one week",
    ],
    correctIndex: 1,
    explanation:
      "Every derivative should be treated as a standalone piece that must earn attention on its own platform, even if the core insight is borrowed from the pillar. This mindset ensures each piece is properly adapted and provides genuine value.",
  },
  {
    type: "ordering",
    question: "Put these content repurposing analysis steps in the correct order.",
    items: ["Allocate more resources to top performers", "Review analytics monthly", "Identify which pillars and derivatives consistently outperform", "Track performance across all platforms"],
    correctOrder: [3, 1, 2, 0],
    explanation:
      "First track performance across all platforms (collect data), review analytics monthly (establish a review cadence), identify which pillars and derivatives consistently outperform (find patterns), and then allocate more resources to top performers (take action).",
  },
];
