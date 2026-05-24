import type { QuizQuestion } from "@/lib/academy-data";

export const podcastMarketingQuiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question: "How many podcast listeners are there worldwide?",
    options: [
      "50 million",
      "150 million",
      "Over 500 million",
      "2 billion",
    ],
    correctIndex: 2,
    explanation:
      "There are over 500 million podcast listeners worldwide, and this number continues to grow as podcasts become more accessible across platforms and devices.",
  },
  {
    type: "multiple-choice",
    question: "What is the average weekly podcast listening time for podcast consumers?",
    options: [
      "1 hour per week",
      "3 hours per week",
      "7 hours per week",
      "15 hours per week",
    ],
    correctIndex: 2,
    explanation:
      "The average podcast listener consumes about 7 hours of podcast content per week, reflecting the high engagement level of podcast audiences compared to other content formats.",
  },
  {
    type: "multi-select",
    question: "Which of the following podcast listener statistics are accurate? (Select all that apply)",
    options: [
      "80% listen to all or most of each episode",
      "Listeners are 20% more likely to follow brands on social media",
      "Most podcast listeners only listen for 2-3 minutes per episode",
      "54% are more likely to consider purchasing from advertised brands",
      "Over 500 million people listen to podcasts worldwide",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "All four positive statements are accurate: 80% episode completion, 20% higher brand social following, 54% higher purchase consideration, and 500 million+ global listeners. Most listeners consume far more than 2-3 minutes per episode.",
  },
  {
    type: "multiple-choice",
    question: "What unique advantage does podcasting offer compared to other content formats?",
    options: [
      "It is the cheapest content format to produce",
      "It creates a one-on-one intimate connection through headphone listening",
      "It guarantees viral reach for every episode",
      "It requires no planning or preparation",
    ],
    correctIndex: 1,
    explanation:
      "Podcasting creates a unique one-on-one connection because listeners voluntarily choose to spend 20-60 minutes consuming your content, often through headphones, creating an intimate experience that no other medium can replicate.",
  },
  {
    type: "multi-select",
    question: "Which of the following are ways podcasting benefits businesses and personal brands? (Select all that apply)",
    options: [
      "Builds authority and thought leadership",
      "Expands professional network through guest interviews",
      "Guarantees immediate revenue from the first episode",
      "Provides rich source content for repurposing across channels",
      "Generates leads and consulting inquiries",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Podcasting builds authority, expands networks, provides repurposable content, and generates leads. However, it does not guarantee immediate revenue — podcast monetization typically builds over time as audience grows.",
  },
  {
    type: "true-false",
    question: "The barrier to entry for podcasting is very high, requiring thousands of dollars in equipment to get started.",
    correctAnswer: false,
    explanation:
      "The barrier to entry for podcasting is remarkably low. You can launch a professional-quality podcast with a few hundred dollars of equipment and free distribution through RSS feeds.",
  },
  {
    type: "true-false",
    question: "Podcast listeners are 20% more likely to follow a brand on social media compared to non-listeners.",
    correctAnswer: true,
    explanation:
      "Research shows that podcast listeners are 20% more likely to follow a brand on social media, demonstrating how podcasting drives cross-platform engagement and audience growth.",
  },
  {
    type: "multi-select",
    question: "Which of the following are business benefits of podcasting? (Select all that apply)",
    options: [
      "Building authority in your niche",
      "Expanding your network through guest interviews",
      "Guaranteed revenue from day one",
      "Generating leads for your business",
      "Providing repurposable source content",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Podcasting builds authority, expands networks through guests, generates leads, and provides rich repurposable content. However, revenue from podcasting typically builds over time and is never guaranteed from day one.",
  },
  {
    type: "multi-select",
    question: "What makes podcast audiences particularly valuable for marketers? (Select all that apply)",
    options: [
      "They are highly engaged and listen deeply",
      "They voluntarily choose to spend 20-60 minutes with your content",
      "They always purchase every product mentioned",
      "They have higher brand recall and purchase intent",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Podcast audiences are highly engaged, voluntarily spend extended time with content, and show higher brand recall and purchase intent. However, not every listener purchases every product mentioned.",
  },
  {
    type: "ordering",
    question: "Arrange these content formats from lowest to highest typical audience engagement time per session.",
    items: ["Social media post", "Blog article", "YouTube video", "Podcast episode"],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Social media posts get seconds of attention, blog articles get 2-5 minutes, YouTube videos average 5-15 minutes, and podcast episodes typically keep listeners for 20-60 minutes, the highest engagement time.",
  },
  {
    type: "multiple-choice",
    question: "What does RSS stand for in the context of podcast distribution?",
    options: [
      "Rapid Streaming Service",
      "Really Simple Syndication",
      "Remote Sound System",
      "Recording and Sharing Standard",
    ],
    correctIndex: 1,
    explanation:
      "RSS stands for Really Simple Syndication. It is the backbone of podcast distribution — an XML-based feed format that allows you to upload once and have new episodes automatically appear on all podcast platforms.",
  },
  {
    type: "ordering",
    question: "Put these podcast marketing topics in the order they are typically addressed when launching a show.",
    items: ["Monetization strategy", "Format planning", "Recording setup", "RSS distribution to platforms"],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "First plan your format, then set up your recording environment, then distribute via RSS to platforms, and finally develop monetization strategies once you have an established audience.",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question: "Which podcast format requires the least scheduling coordination with others?",
    options: [
      "Interview format",
      "Co-hosted format",
      "Solo / monologue format",
      "Panel discussion format",
    ],
    correctIndex: 2,
    explanation:
      "Solo/monologue format requires the least coordination because you deliver content on your own schedule without coordinating with guests or co-hosts. It is the easiest to schedule but requires strong presentation skills.",
  },
  {
    type: "multiple-choice",
    question: "What is the single most important production factor for podcast quality?",
    options: [
      "Camera quality for video podcasts",
      "Audio quality",
      "Studio background design",
      "Intro music composition",
    ],
    correctIndex: 1,
    explanation:
      "Audio quality makes or breaks a podcast. Listeners will tolerate average video quality but will abandon a podcast with poor audio within seconds. Your recording environment matters even more than your microphone.",
  },
  {
    type: "multiple-choice",
    question: "What type of microphone requires an audio interface to operate?",
    options: [
      "USB microphone",
      "Bluetooth microphone",
      "XLR microphone",
      "Built-in laptop microphone",
    ],
    correctIndex: 2,
    explanation:
      "XLR microphones require an audio interface (like the Focusrite Scarlett or Rodecaster Pro) to connect to your computer. They offer superior audio quality compared to USB mics but require the additional hardware investment.",
  },
  {
    type: "multiple-choice",
    question: "What is the recommended distance between your mouth and the microphone?",
    options: [
      "1-2 inches",
      "6-8 inches",
      "12-18 inches",
      "24-36 inches",
    ],
    correctIndex: 1,
    explanation:
      "Position your microphone 6-8 inches from your mouth using a boom arm. This distance provides optimal sound quality — close enough for a warm, full tone but far enough to avoid plosives and breathing sounds.",
  },
  {
    type: "multiple-choice",
    question: "What does an RSS feed contain for podcast distribution?",
    options: [
      "Only the audio files",
      "Show metadata, episode titles, descriptions, and audio file URLs",
      "Only the podcast artwork",
      "Listener analytics and download counts",
    ],
    correctIndex: 1,
    explanation:
      "An RSS feed is an XML file containing your show metadata, episode titles, descriptions, and audio file URLs. You submit this single feed to podcast directories, and new episodes automatically appear on all platforms.",
  },
  {
    type: "true-false",
    question: "Your recording environment matters more than your microphone for audio quality.",
    correctAnswer: true,
    explanation:
      "A quiet room with soft furnishings to absorb reflections is more important than an expensive microphone. Even the best microphone will sound poor in a room with echo, background noise, or hard reflective surfaces.",
  },
  {
    type: "true-false",
    question: "With podcast RSS distribution, you need to manually upload each episode to every individual platform separately.",
    correctAnswer: false,
    explanation:
      "RSS distribution means you upload once to your podcast host, which generates an RSS feed. You submit this feed to directories (Apple Podcasts, Spotify, etc.), and new episodes automatically appear on all platforms simultaneously.",
  },
  {
    type: "multi-select",
    question: "Which of the following are common podcast formats? (Select all that apply)",
    options: [
      "Solo / monologue",
      "Interview",
      "Written blog post",
      "Co-hosted discussion",
      "Narrative / storytelling",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Common podcast formats include solo/monologue, interview, co-hosted discussion, and narrative/storytelling. Written blog posts are a text content format, not a podcast format.",
  },
  {
    type: "multi-select",
    question: "Which equipment is essential for a podcast recording setup? (Select all that apply)",
    options: [
      "Quality microphone (USB or XLR)",
      "Closed-back headphones",
      "Professional video camera",
      "Pop filter",
      "Recording software",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Essential podcast equipment includes a quality microphone, closed-back headphones for monitoring, a pop filter to reduce plosives, and recording software. A professional video camera is only needed for video podcasts, not audio-only shows.",
  },
  {
    type: "ordering",
    question: "Arrange these microphone types from most beginner-friendly to most professional.",
    items: ["Built-in laptop mic", "XLR mic with audio interface", "USB microphone"],
    correctOrder: [0, 2, 1],
    explanation:
      "Built-in laptop mics require no setup (most beginner-friendly but lowest quality). USB microphones plug directly into your computer with good quality. XLR mics with audio interfaces offer the most professional quality but require additional equipment and knowledge.",
  },
  {
    type: "multiple-choice",
    question: "Which podcast hosting platform is now owned by Spotify?",
    options: [
      "Buzzsprout",
      "Libsyn",
      "Anchor (Spotify for Podcasters)",
      "Podbean",
    ],
    correctIndex: 2,
    explanation:
      "Anchor was acquired by Spotify and rebranded as Spotify for Podcasters. It offers free hosting and distribution, making it a popular choice for beginning podcasters.",
  },
  {
    type: "multiple-choice",
    question: "Why are closed-back headphones specifically recommended for podcast monitoring?",
    options: [
      "They are cheaper than open-back headphones",
      "They prevent audio bleed from speakers back into the microphone",
      "They are wireless and more convenient",
      "They automatically remove background noise",
    ],
    correctIndex: 1,
    explanation:
      "Closed-back headphones prevent audio bleed — sound leaking from the headphones back into the microphone during recording. Open-back headphones allow sound to escape, which can cause echo or feedback in recordings.",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question: "How many words should podcast show notes contain at minimum?",
    options: [
      "50-100 words",
      "300-500 words",
      "1,000-2,000 words",
      "5,000+ words",
    ],
    correctIndex: 1,
    explanation:
      "Show notes should be at least 300-500 words, summarizing key takeaways, including timestamps, linking to resources mentioned, and embedding the audio player. Full transcripts provide additional SEO value with thousands of indexable words.",
  },
  {
    type: "multiple-choice",
    question: "How many episodes should you launch with to give new listeners enough content to binge?",
    options: [
      "1 episode",
      "3-5 episodes",
      "10-15 episodes",
      "25+ episodes",
    ],
    correctIndex: 1,
    explanation:
      "Launch with 3-5 episodes to give new listeners enough content to binge and subscribe. This provides a strong first impression and increases the likelihood that new listeners will commit to following your show.",
  },
  {
    type: "multiple-choice",
    question: "What is the primary benefit of including full transcripts with podcast episodes?",
    options: [
      "They replace the need for show notes",
      "They provide thousands of indexable words per episode for SEO",
      "They are required by all podcast platforms",
      "They automatically generate social media posts",
    ],
    correctIndex: 1,
    explanation:
      "Full transcripts provide thousands of indexable words per episode, significantly boosting SEO. They also improve accessibility for hearing-impaired audiences and give readers who prefer text an alternative consumption method.",
  },
  {
    type: "multiple-choice",
    question: "What should you do before inviting guests to your own podcast?",
    options: [
      "Wait until you have 100,000 subscribers",
      "Guest on other podcasts first to build skills and reciprocal relationships",
      "Send mass outreach emails to celebrities",
      "Purchase a professional studio setup",
    ],
    correctIndex: 1,
    explanation:
      "Start by guesting on other podcasts before inviting guests to yours. This builds your interviewing skills, exposes you to new audiences, and creates reciprocal relationships where hosts become your future guests.",
  },
  {
    type: "multiple-choice",
    question: "How far ahead should you plan your podcast content calendar?",
    options: [
      "1 day ahead",
      "1 week ahead",
      "4-8 weeks ahead",
      "12 months ahead",
    ],
    correctIndex: 2,
    explanation:
      "Plan episodes 4-8 weeks ahead to maintain consistency and reduce production stress. This lead time allows for proper guest coordination, research, and batched recording sessions.",
  },
  {
    type: "true-false",
    question: "Ratings and reviews on Apple Podcasts influence podcast discoverability.",
    correctAnswer: true,
    explanation:
      "Ratings and reviews are a significant factor in Apple Podcasts' discovery algorithm. More and better reviews improve your show's visibility in search results and category rankings, especially important during launch.",
  },
  {
    type: "true-false",
    question: "A guest prep document should include the show format, audience demographics, sample questions, and technical requirements.",
    correctAnswer: true,
    explanation:
      "A thorough guest prep document ensures guests know what to expect and can deliver their best performance. It should include your show format, audience demographics, sample questions, technical requirements, and logistical details.",
  },
  {
    type: "multi-select",
    question: "What should podcast show notes include for SEO optimization? (Select all that apply)",
    options: [
      "Optimized title tag and meta description",
      "Keyword-rich episode summary",
      "Guest's personal phone number",
      "Timestamps for key segments",
      "Links to resources mentioned",
      "Embedded audio player",
    ],
    correctIndices: [0, 1, 3, 4, 5],
    explanation:
      "SEO-optimized show notes include an optimized title tag, keyword-rich summary, timestamps, resource links, and embedded audio player. Personal contact information like phone numbers should never be published in show notes.",
  },
  {
    type: "multi-select",
    question: "Which strategies help amplify guest episodes? (Select all that apply)",
    options: [
      "Provide audiograms for guests to share",
      "Create quote graphics from the interview",
      "Keep the episode private and don't tell the guest",
      "Write pre-written social posts for guests",
      "Send guests the episode link when published",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Amplify guest episodes by providing audiograms, quote graphics, pre-written social posts, and sharing the episode link. Making it easy for guests to share extends your reach to their audience.",
  },
  {
    type: "ordering",
    question: "Put these podcast launch steps in the correct order.",
    items: ["Ask for ratings and reviews", "Promote launch across all channels", "Record 3-5 launch episodes", "Submit RSS feed to directories"],
    correctOrder: [2, 3, 1, 0],
    explanation:
      "First record 3-5 launch episodes (so you have content ready), submit your RSS feed to directories (so your show is available), promote the launch across all channels (email, social, website), and then ask for ratings and reviews.",
  },
  {
    type: "multiple-choice",
    question: "What is the recommended size of a podcast launch team?",
    options: [
      "3-5 people",
      "20-50 people",
      "200-500 people",
      "1,000+ people",
    ],
    correctIndex: 1,
    explanation:
      "A launch team of 20-50 people who commit to listening, rating, and sharing in the first week can significantly boost your initial visibility on podcast platforms, especially Apple Podcasts which values early engagement.",
  },
  {
    type: "ordering",
    question: "Arrange these episode structure elements in the correct order.",
    items: ["Clear call-to-action", "Cold open or hook", "Key takeaways summary", "Main content", "Branded intro"],
    correctOrder: [1, 4, 3, 2, 0],
    explanation:
      "A well-structured episode starts with a cold open or hook, then the branded intro, followed by the main content, a key takeaways summary, and ends with a clear call-to-action.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question: "How much faster do podcasts that publish weekly on a consistent schedule grow compared to irregular schedules?",
    options: [
      "No difference",
      "1.5x faster",
      "2-3x faster",
      "10x faster",
    ],
    correctIndex: 2,
    explanation:
      "Podcasts that publish weekly on the same day grow 2-3x faster than those with irregular schedules. Consistency builds habitual listening and signals to algorithms that your show is reliably active.",
  },
  {
    type: "multiple-choice",
    question: "What CPM (cost per thousand listens) do mid-roll podcast ads typically pay?",
    options: [
      "$5-$10",
      "$18-$25",
      "$25-$50",
      "$100-$200",
    ],
    correctIndex: 2,
    explanation:
      "Mid-roll ads (60-second ads placed in the middle of an episode) typically pay $25-$50 CPM. They command higher rates than pre-roll because listeners are more deeply engaged at that point.",
  },
  {
    type: "multiple-choice",
    question: "How many downloads per episode do most sponsors require as a minimum?",
    options: [
      "100-500",
      "1,000-2,500",
      "5,000-10,000",
      "50,000-100,000",
    ],
    correctIndex: 2,
    explanation:
      "Most sponsors require a minimum of 5,000-10,000 downloads per episode before they will invest in sponsorship. Below this threshold, podcasters typically rely on other monetization strategies like affiliate marketing or premium content.",
  },
  {
    type: "multiple-choice",
    question: "What is the most important factor for podcast audience growth?",
    options: [
      "Expensive equipment",
      "Celebrity guests every episode",
      "Consistent publishing schedule",
      "Aggressive paid advertising",
    ],
    correctIndex: 2,
    explanation:
      "Consistency is the most important factor for podcast growth. Publishing weekly on the same day builds habitual listening, signals reliability to platforms, and creates compounding discoverability over time.",
  },
  {
    type: "multiple-choice",
    question: "What CPM do pre-roll podcast ads (15-30 seconds at the start) typically pay?",
    options: [
      "$5-$10",
      "$18-$25",
      "$50-$75",
      "$100-$150",
    ],
    correctIndex: 1,
    explanation:
      "Pre-roll ads (15-30 seconds at the start of an episode) typically pay $18-$25 CPM. They are shorter and played before the main content, so they command lower rates than mid-roll placements.",
  },
  {
    type: "true-false",
    question: "Most successful business podcasts focus on indirect monetization, using the show as a top-of-funnel awareness tool.",
    correctAnswer: true,
    explanation:
      "Most successful business podcasts focus on indirect monetization — using the show to generate leads, consulting inquiries, speaking opportunities, book sales, and course promotion rather than relying solely on sponsorships or ad revenue.",
  },
  {
    type: "true-false",
    question: "Editing a podcast means only removing long silences — filler words like 'um' and 'uh' should always be left in for authenticity.",
    correctAnswer: false,
    explanation:
      "Good podcast editing removes filler words and long pauses, normalizes audio levels, and adds intro/outro music and sound effects. While some natural speech patterns can remain for authenticity, excessive filler words reduce listener retention.",
  },
  {
    type: "multi-select",
    question: "Which of the following are stages in a podcast production workflow? (Select all that apply)",
    options: [
      "Pre-production (research and preparation)",
      "Recording in a quiet environment",
      "Buying radio station airtime",
      "Editing and post-production",
      "Promotion across channels",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "The podcast workflow includes pre-production (research, prep), recording, editing/post-production, and promotion. Buying radio station airtime is traditional broadcast media, not part of podcast production.",
  },
  {
    type: "multi-select",
    question: "Which are effective strategies for growing a podcast audience? (Select all that apply)",
    options: [
      "Appearing as a guest on other shows",
      "Optimizing show notes for SEO",
      "Only sharing episodes on your personal Facebook page",
      "Creating shareable audiograms and video clips",
      "Cross-promoting with complementary podcasts",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Effective growth strategies include guesting on other shows, SEO-optimized show notes, shareable audiograms, and cross-promotion. Limiting distribution to only your personal Facebook page severely restricts reach.",
  },
  {
    type: "ordering",
    question: "Put these podcast production stages in the correct workflow order.",
    items: ["Promotion across channels", "Editing and post-production", "Pre-production and research", "Recording the episode", "Write show notes and create assets"],
    correctOrder: [2, 3, 1, 4, 0],
    explanation:
      "The production workflow follows: pre-production (research and prep), recording the episode, editing and post-production, writing show notes and creating promotional assets, and finally promoting across channels.",
  },
  {
    type: "multiple-choice",
    question: "Which is the most valuable form of podcast monetization for most business podcasters?",
    options: [
      "CPM-based sponsorships",
      "Patreon premium subscriptions",
      "Indirect monetization (leads, consulting, speaking)",
      "Merchandise sales",
    ],
    correctIndex: 2,
    explanation:
      "For most business podcasters, indirect monetization through lead generation, consulting inquiries, speaking opportunities, and product/course promotion is more valuable than direct monetization like sponsorships, which require large audience sizes.",
  },
  {
    type: "multiple-choice",
    question: "What is an audiogram in podcast marketing?",
    options: [
      "A hearing test for podcast listeners",
      "A visual audio waveform clip shared on social media to promote episodes",
      "A transcript of the audio recording",
      "A chart showing download analytics",
    ],
    correctIndex: 1,
    explanation:
      "An audiogram is a short visual audio clip — typically featuring a waveform animation, captions, and branded graphics — shared on social media to promote podcast episodes and attract new listeners.",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question: "What is the primary reach metric for podcast performance?",
    options: [
      "Social media impressions",
      "Downloads per episode",
      "Website page views",
      "Email open rate",
    ],
    correctIndex: 1,
    explanation:
      "Downloads per episode is the primary reach metric for podcasts. Track both 7-day and 30-day download windows for consistent comparison across episodes and over time.",
  },
  {
    type: "multiple-choice",
    question: "What listener retention percentage should you aim for on podcast episodes?",
    options: [
      "20%+ completion",
      "40%+ completion",
      "60%+ completion",
      "95%+ completion",
    ],
    correctIndex: 2,
    explanation:
      "Aim for 60%+ episode completion rate, available through analytics on Spotify and Apple Podcasts. This indicates that the majority of your listeners are finding enough value to consume most of the episode.",
  },
  {
    type: "multiple-choice",
    question: "How should you track traffic driven from podcast to your website?",
    options: [
      "Count total website visits and assume they are from the podcast",
      "Use UTM-tagged links in show notes to measure traffic attribution",
      "Ask every website visitor how they found you",
      "Monitor your Alexa ranking",
    ],
    correctIndex: 1,
    explanation:
      "Use UTM-tagged links in show notes and episode descriptions to accurately track traffic driven from your podcast to your website. This allows you to attribute visits and conversions to specific episodes.",
  },
  {
    type: "multiple-choice",
    question: "How often should you review podcast analytics to identify performance patterns?",
    options: [
      "After every episode",
      "Monthly",
      "Once per year",
      "Never — just focus on creating content",
    ],
    correctIndex: 1,
    explanation:
      "Review analytics monthly to identify patterns: which topics drive the most downloads, which guests bring the largest audience, and where listeners drop off. Use this data to refine your content calendar and improve episode structure.",
  },
  {
    type: "multiple-choice",
    question: "What kind of research should you conduct annually to understand your podcast audience?",
    options: [
      "Competitive analysis only",
      "Listener survey to understand preferences and unmet needs",
      "Technical audio quality audit",
      "Financial audit of monetization",
    ],
    correctIndex: 1,
    explanation:
      "Conduct an annual listener survey to understand your audience's preferences, unmet needs, and feedback. This direct audience input helps you make data-informed decisions about content direction, format, and topics.",
  },
  {
    type: "true-false",
    question: "Podcast analytics are as mature and detailed as web analytics platforms like Google Analytics.",
    correctAnswer: false,
    explanation:
      "Podcast analytics are less mature than web analytics. While platforms like Spotify and Apple provide useful data on downloads, retention, and demographics, the analytics ecosystem lacks the granular tracking and attribution capabilities of web analytics.",
  },
  {
    type: "true-false",
    question: "You should track both 7-day and 30-day download windows for consistent episode comparison.",
    correctAnswer: true,
    explanation:
      "Tracking both 7-day and 30-day download windows allows for consistent comparison across episodes. The 7-day window shows initial performance, while the 30-day window captures the long tail of discovery through search and recommendations.",
  },
  {
    type: "multi-select",
    question: "Which of the following are key podcast metrics to track? (Select all that apply)",
    options: [
      "Downloads per episode",
      "Listener retention / completion rate",
      "Printer paper usage",
      "Subscriber growth",
      "Ratings and reviews",
      "Website traffic from show notes",
    ],
    correctIndices: [0, 1, 3, 4, 5],
    explanation:
      "Key podcast metrics include downloads per episode, listener retention, subscriber growth, ratings and reviews, and website traffic from show notes. Printer paper usage is not a podcast metric.",
  },
  {
    type: "multi-select",
    question: "Which data points help identify what content to produce more of? (Select all that apply)",
    options: [
      "Topics that drive the most downloads",
      "Guests who bring the largest audience",
      "The host's personal content preferences",
      "Listener drop-off points in episodes",
      "Annual listener survey results",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Data-driven content decisions should be based on download performance by topic, guest audience impact, listener retention patterns, and survey feedback. The host's personal preferences should inform but not override audience data.",
  },
  {
    type: "ordering",
    question: "Arrange these podcast optimization activities in order from most frequent to least frequent.",
    items: ["Annual listener survey", "Monthly analytics review", "Episode-level performance check", "Quarterly content calendar adjustment"],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "Check episode-level performance after each episode, review comprehensive analytics monthly, adjust your content calendar quarterly based on trends, and conduct a full listener survey annually.",
  },
  {
    type: "multiple-choice",
    question: "Which podcast platforms provide listener retention data?",
    options: [
      "Only Apple Podcasts",
      "Only Spotify",
      "Both Spotify and Apple Podcasts",
      "No podcast platform provides retention data",
    ],
    correctIndex: 2,
    explanation:
      "Both Spotify and Apple Podcasts provide listener retention data showing how much of each episode listeners consume. This data is invaluable for understanding where listeners drop off and improving episode structure.",
  },
  {
    type: "ordering",
    question: "Put these podcast performance indicators in order from easiest to measure to hardest to measure.",
    items: ["Lead generation attribution from podcast", "Total episode downloads", "Listener retention percentage", "Subscriber growth rate"],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "Total downloads are the easiest metric to track. Subscriber growth is available on most platforms. Retention data requires platform-specific analytics. Lead generation attribution is the hardest as it requires UTM tracking, CRM integration, and multi-touch attribution.",
  },
];
