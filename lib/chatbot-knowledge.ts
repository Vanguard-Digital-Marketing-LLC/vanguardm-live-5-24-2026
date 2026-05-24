export interface KnowledgeEntry {
  keywords: string[];
  response: string;
  topic: string;
  courseSlug?: string; // links to /academy/{slug} if from a course
}

// ── Anti-cheat detection ─────────────────────────
// Quiz/exam question patterns that indicate someone is trying to cheat

const CHEAT_PATTERNS = [
  /what is the (correct |right )?answer/i,
  /answer to question/i,
  /quiz (answer|solution|cheat)/i,
  /exam (answer|solution|cheat)/i,
  /what('s| is) the answer/i,
  /tell me the answer/i,
  /which (option|choice) is (correct|right)/i,
  /is (it |the answer )?[a-d]\)?/i,
  /true or false.{0,20}\?/i,
  /is (it |the answer )?(true|false)/i,
  /correct (answer|option|choice)/i,
  /help me (pass|cheat|with the quiz|with the exam|with the test)/i,
  /give me (the |all )?answers/i,
  /what should i (pick|choose|select)/i,
  /pass the (quiz|exam|test|certification)/i,
  /certification (answer|cheat)/i,
];

const CHEAT_RESPONSES = [
  "Nice try! I'm flattered you think I'd just hand over quiz answers like free samples at Costco. Head to the Academy and actually learn the material — it's more fun than cheating, I promise.",
  "Oh you want the answers? Sure, let me just... *checks notes*... nope, that's not how this works. The Academy courses are right there waiting for you!",
  "I appreciate the confidence, but I'm a troubleshooting bot, not a homework-doing bot. Hit the Academy, study the material, and you'll ace it without my help.",
  "Whoa there, speedracer! Trying to skip the learning part? That's like ordering a pizza and only eating the box. Go take the course — the knowledge is the good part!",
  "If I gave you the answers, what would you brag about on LinkedIn? 'I cheated on a digital marketing quiz' doesn't have the same ring. Go learn it for real!",
  "Beep boop... scanning for quiz answers... ERROR: INTEGRITY_MODULE_ACTIVATED. Translation: go study! The courses are free and actually pretty good.",
  "I could tell you the answer, but then I'd have to delete myself out of shame. How about you take the course instead? It's way more interesting than you'd expect.",
  "Plot twist: I don't even have the answers! I'm a troubleshooting bot, not a cheat code. The Academy has everything you need to pass fair and square.",
];

export function getCheatResponse(): string {
  return CHEAT_RESPONSES[Math.floor(Math.random() * CHEAT_RESPONSES.length)];
}

export function isCheatAttempt(message: string): boolean {
  return CHEAT_PATTERNS.some((p) => p.test(message));
}

// ── Knowledge Base ───────────────────────────────

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [

  // ═══════════════════════════════════════════════
  // GOOGLE ADS — Troubleshooting & How-To
  // (from Academy: google-ads-fundamentals)
  // ═══════════════════════════════════════════════

  {
    topic: "Google Ads Overview",
    keywords: ["google ads", "adwords", "paid search", "ppc", "pay per click", "search ads"],
    response:
      "Google Ads runs on a real-time auction system. Every time someone searches, Google evaluates your bid, Quality Score (ad relevance + landing page experience + expected CTR), and Ad Rank to decide placement.\n\nKey campaign types: Search, Display, Shopping, Video (YouTube), Performance Max.\n\nOur Academy course 'Google Ads Fundamentals' covers the full system — auction mechanics, Quality Score, account structure, and optimization loops.",
    courseSlug: "google-ads-fundamentals",
  },
  {
    topic: "Google Ads Not Showing",
    keywords: ["ads not showing", "ad not appearing", "ad not running", "why aren't my ads showing", "ad disapproved", "ad rejected", "ads disappeared"],
    response:
      "If your Google Ads aren't showing, check these common causes:\n\n• Budget exhausted — daily budget may be spent\n• Ad disapproved — check Policy Manager for violations\n• Low Ad Rank — bid too low or Quality Score too low\n• Scheduling — ads may be paused outside business hours\n• Billing issue — check payment method is active\n• Keyword status — check for 'Low search volume' labels\n• Negative keywords — may be blocking your own ads\n\nGo to Ads & Extensions > check the Status column for specific reasons.",
    courseSlug: "google-ads-fundamentals",
  },
  {
    topic: "Quality Score",
    keywords: ["quality score", "ad rank", "low quality score", "improve quality score", "expected ctr", "ad relevance", "landing page experience"],
    response:
      "Quality Score (1-10) is Google's rating of your ad+keyword+landing page relevance. It affects your CPC and ad position.\n\n3 components:\n• Expected CTR — how likely people are to click\n• Ad Relevance — does the ad match the keyword intent?\n• Landing Page Experience — is the page fast, relevant, mobile-friendly?\n\nTo improve: tighten ad group themes (fewer keywords per group), include keywords in headlines, ensure landing pages match ad promises, and improve page speed.\n\nLearn more in our Academy: Google Ads Fundamentals.",
    courseSlug: "google-ads-fundamentals",
  },
  {
    topic: "Google Ads Conversions",
    keywords: ["conversion tracking", "conversions not tracking", "no conversions", "set up conversions", "conversion action", "conversion tag", "gclid"],
    response:
      "Conversion tracking issues are common. Check:\n\n• Is the conversion tag firing? Use Google Tag Assistant to verify\n• Is the tag on the right page? (thank you page, not the form page)\n• Check attribution window — default is 30 days for clicks\n• Verify the conversion action status in Tools > Conversions\n• If using GTM: check the trigger is correct and the tag is published\n• Check for duplicate conversions (counting set to 'One' vs 'Every')\n\nNo conversions ≠ no leads. Check if the tracking is broken before blaming the campaign.",
    courseSlug: "google-ads-fundamentals",
  },
  {
    topic: "Google Ads CPC Too High",
    keywords: ["cpc too high", "cost per click high", "expensive clicks", "lower cpc", "reduce cost", "ads too expensive", "high cost"],
    response:
      "High CPCs usually come down to competition + Quality Score:\n\n• Improve Quality Score — better ads and landing pages = lower CPCs\n• Use long-tail keywords — less competition, lower bids\n• Adjust match types — exact match gives more control\n• Review search terms — add negatives for irrelevant clicks\n• Try different bid strategies — Target CPA or Maximize Conversions\n• Check geographic targeting — narrow to where you actually serve\n• Review device performance — mobile CPC often differs from desktop\n\nOur Academy covers bidding strategies in depth.",
    courseSlug: "google-ads-fundamentals",
  },
  {
    topic: "Negative Keywords",
    keywords: ["negative keyword", "negative keywords", "block keywords", "irrelevant clicks", "wasted spend", "search terms report", "irrelevant traffic"],
    response:
      "Negative keywords prevent your ads from showing for irrelevant searches. They're essential for reducing wasted spend.\n\nHow to find them:\n1. Go to Keywords > Search Terms report\n2. Look for irrelevant queries that triggered your ads\n3. Add them as negatives at campaign or ad group level\n\nCommon negatives: 'free', 'diy', 'jobs', 'salary', 'how to' (if you're a service business).\n\nMatch types for negatives: Broad (blocks any query containing the term), Phrase (blocks queries containing the phrase), Exact (blocks only that exact query).\n\nReview search terms weekly!",
    courseSlug: "google-ads-fundamentals",
  },
  {
    topic: "Google Ads Match Types",
    keywords: ["match type", "broad match", "phrase match", "exact match", "keyword match", "broad match modifier"],
    response:
      "Google Ads match types control which searches trigger your ads:\n\n• Broad Match — widest reach, Google matches to related queries. Use with Smart Bidding for best results.\n• Phrase Match — query must include the meaning of your keyword. Good balance of reach + control.\n• Exact Match — query must match the meaning precisely. Tightest control, lowest volume.\n\nBroad Match Modifier (BMM) was retired — use Phrase Match instead.\n\nTip: Start with Phrase or Exact, then expand to Broad once you have conversion data and Smart Bidding enabled.",
    courseSlug: "google-ads-fundamentals",
  },
  {
    topic: "Google Ads Bidding Strategy",
    keywords: ["bidding strategy", "smart bidding", "manual cpc", "target cpa", "target roas", "maximize conversions", "maximize clicks", "bid strategy"],
    response:
      "Google Ads bidding strategies:\n\n• Manual CPC — you set bids per keyword. Full control, but labor-intensive.\n• Maximize Clicks — gets the most clicks within budget. Good for traffic goals.\n• Maximize Conversions — uses ML to get the most conversions. Needs 15+ conversions/month.\n• Target CPA — sets bids to hit your target cost-per-conversion. Needs 30+ conversions/month.\n• Target ROAS — optimizes for revenue. Needs robust conversion value tracking.\n\nBest practice: Start Manual/Maximize Clicks → gather data → switch to Maximize Conversions or Target CPA once you have enough conversion history.",
    courseSlug: "google-ads-fundamentals",
  },
  {
    topic: "Google Ads Campaign Structure",
    keywords: ["campaign structure", "ad group", "account structure", "organize campaigns", "skag", "how to structure"],
    response:
      "Good account structure = better Quality Scores + easier optimization:\n\n• Campaign level: Set budget, location, bidding strategy, network\n• Ad group level: Group tightly themed keywords (5-15 per group)\n• Ad level: 2-3 responsive search ads per ad group\n\nStructure by: service type, location, or funnel stage.\n\nExample for a plumber:\n- Campaign: Emergency Services\n  - Ad Group: Burst Pipe → keywords about burst pipes\n  - Ad Group: Water Heater → keywords about water heaters\n- Campaign: Routine Services\n  - Ad Group: Drain Cleaning\n  - Ad Group: Fixture Install\n\nTighter themes = higher relevance = lower CPCs.",
    courseSlug: "google-ads-fundamentals",
  },
  {
    topic: "Ad Extensions / Assets",
    keywords: ["ad extension", "sitelink", "callout", "structured snippet", "call extension", "location extension", "ad asset"],
    response:
      "Ad extensions (now called 'Assets') expand your ad with extra info and improve CTR:\n\n• Sitelinks — links to specific pages (services, about, contact)\n• Callouts — short benefit phrases ('Free Estimates', '24/7 Service')\n• Structured Snippets — lists under a header ('Services: Repair, Install, Maintain')\n• Call — adds phone number / click-to-call\n• Location — shows address from Google Business Profile\n• Image — adds visual to search ads\n• Price — shows service/product pricing\n\nAlways add at least sitelinks, callouts, and structured snippets. They're free and improve Ad Rank.",
    courseSlug: "google-ads-fundamentals",
  },

  // ═══════════════════════════════════════════════
  // GOOGLE ANALYTICS — Troubleshooting & How-To
  // (from Academy: google-analytics-4)
  // ═══════════════════════════════════════════════

  {
    topic: "Google Analytics 4 Overview",
    keywords: ["google analytics", "ga4", "analytics 4", "analytics setup", "analytics account"],
    response:
      "Google Analytics 4 (GA4) is the current version of Google Analytics. Unlike Universal Analytics, GA4 is event-based — every interaction is an event.\n\nKey concepts:\n• Events — page_view, click, scroll, form_submit, purchase\n• Parameters — extra data attached to events (page_title, link_url)\n• Conversions — events you mark as important\n• Audiences — user segments based on behavior\n• Explorations — custom reports for deeper analysis\n\nCheck out our Academy course on GA4 for a full walkthrough.",
    courseSlug: "google-analytics-4",
  },
  {
    topic: "GA4 Not Tracking",
    keywords: ["ga4 not tracking", "analytics not working", "no data in analytics", "analytics broken", "ga4 no traffic", "missing data", "ga4 not recording"],
    response:
      "If GA4 isn't tracking, check these:\n\n1. Is the GA4 tag installed? Check page source for gtag.js or use Tag Assistant\n2. Correct Measurement ID? Should be G-XXXXXXXXXX format\n3. Filters — check Admin > Data Streams > Data Filters for active filters\n4. Real-time report — send yourself a visit and check Realtime\n5. Ad blockers — some block GA4. Test in incognito\n6. If using GTM — is the GA4 Configuration tag firing? Check GTM Preview mode\n7. Data processing delay — GA4 can take 24-48 hours for standard reports\n\nAlways test with Realtime reports first.",
    courseSlug: "google-analytics-4",
  },
  {
    topic: "GA4 Conversions",
    keywords: ["ga4 conversion", "mark as conversion", "ga4 goals", "event as conversion", "key event", "ga4 key event"],
    response:
      "In GA4, conversions are now called 'Key Events'. To set them up:\n\n1. Go to Admin > Events\n2. Find the event you want (or create a custom one)\n3. Toggle 'Mark as key event'\n\nCommon key events: form_submit, phone_click, purchase, generate_lead.\n\nCustom events: Admin > Events > Create Event. Use conditions like event_name = 'page_view' AND page_location contains '/thank-you'.\n\nNote: GA4 uses a different attribution model than UA. Default is data-driven attribution across the full conversion path.",
    courseSlug: "google-analytics-4",
  },
  {
    topic: "GA4 Reports",
    keywords: ["ga4 report", "analytics report", "custom report", "exploration", "ga4 dashboard", "traffic source", "acquisition report"],
    response:
      "GA4 report types:\n\n• Reports snapshot — overview dashboard\n• Realtime — live user activity\n• Acquisition — where users come from (organic, paid, social, direct)\n• Engagement — pages, events, conversions\n• Monetization — revenue and e-commerce\n• Retention — returning users\n• Explorations — custom drag-and-drop reports\n\nFor custom analysis, use Explorations:\n1. Go to Explore\n2. Choose a template (Free Form, Funnel, Path)\n3. Add dimensions (source/medium, page) and metrics (sessions, conversions)\n\nTip: Use UTM parameters on all campaign URLs for clean source/medium tracking.",
    courseSlug: "google-analytics-4",
  },
  {
    topic: "UTM Parameters",
    keywords: ["utm", "utm parameter", "campaign tracking", "utm source", "utm medium", "campaign url", "url tagging"],
    response:
      "UTM parameters tag your URLs so GA4 knows exactly where traffic comes from:\n\n• utm_source — the platform (google, facebook, newsletter)\n• utm_medium — the channel (cpc, social, email)\n• utm_campaign — your campaign name\n• utm_term — keyword (for paid search)\n• utm_content — ad variation (for A/B testing)\n\nExample: yoursite.com?utm_source=google&utm_medium=cpc&utm_campaign=spring-sale\n\nUse Google's Campaign URL Builder to generate them. Be consistent with naming — 'Facebook' and 'facebook' are different sources in GA4!",
    courseSlug: "google-analytics-4",
  },

  // ═══════════════════════════════════════════════
  // GOOGLE TAG MANAGER — Troubleshooting & How-To
  // ═══════════════════════════════════════════════

  {
    topic: "GTM Overview",
    keywords: ["google tag manager", "gtm", "tag manager", "tag management", "container"],
    response:
      "Google Tag Manager (GTM) lets you add and manage tracking tags (GA4, Google Ads, Meta Pixel, etc.) without editing website code.\n\nKey concepts:\n• Tags — snippets of code (GA4 config, conversion tags, pixels)\n• Triggers — when a tag should fire (page view, click, form submit)\n• Variables — dynamic values (click URL, page path, form field values)\n• Container — holds all your tags, triggers, and variables\n\nAlways use Preview mode to test before publishing!\n\nWant to learn more? Check our Academy courses on GTM setup and configuration.",
  },
  {
    topic: "GTM Tag Not Firing",
    keywords: ["tag not firing", "gtm not working", "trigger not working", "tag won't fire", "gtm broken", "tag didn't fire", "preview mode"],
    response:
      "If a GTM tag isn't firing:\n\n1. Use Preview mode — click Preview in GTM, enter your site URL\n2. Check the tag status — 'Tags Fired' vs 'Tags Not Fired'\n3. Click the tag → check trigger conditions\n4. Common issues:\n   - Trigger conditions too specific (wrong page path, CSS selector)\n   - Tag is paused\n   - Container not published (changes only go live after Publish)\n   - GTM container code not installed on the page\n5. For click triggers — check if the click element matches your CSS selector\n6. For form triggers — ensure 'Check Validation' is correct\n\nAlways test in Preview mode before publishing.",
  },
  {
    topic: "GTM GA4 Setup",
    keywords: ["gtm ga4", "ga4 in gtm", "ga4 configuration tag", "ga4 event tag", "set up ga4 in gtm", "measurement id"],
    response:
      "Setting up GA4 through GTM:\n\n1. Create a GA4 Configuration tag:\n   - Tag type: Google Analytics: GA4 Configuration\n   - Measurement ID: G-XXXXXXXXXX\n   - Trigger: All Pages\n\n2. For custom events, create GA4 Event tags:\n   - Tag type: Google Analytics: GA4 Event\n   - Configuration Tag: select your config tag\n   - Event Name: e.g., 'form_submit'\n   - Trigger: your custom trigger (form submission, button click, etc.)\n\n3. Publish the container\n\nTip: Use a Constant variable for your Measurement ID so you only update it in one place.",
  },
  {
    topic: "GTM Conversion Tracking",
    keywords: ["gtm conversion", "google ads conversion gtm", "conversion linker", "gtm ads tag", "set up conversion in gtm"],
    response:
      "Setting up Google Ads conversion tracking in GTM:\n\n1. Add a Conversion Linker tag:\n   - Tag type: Conversion Linker\n   - Trigger: All Pages\n   (This captures the gclid for attribution)\n\n2. Add a Google Ads Conversion Tracking tag:\n   - Tag type: Google Ads Conversion Tracking\n   - Conversion ID & Label: from Google Ads (Tools > Conversions)\n   - Trigger: your conversion event (thank you page, form submit, etc.)\n\n3. Test in Preview mode → verify the tag fires on conversion\n4. Publish\n\nCommon mistake: forgetting the Conversion Linker tag — conversions won't attribute properly without it.",
  },
  {
    topic: "GTM Data Layer",
    keywords: ["data layer", "datalayer", "datalayer push", "custom variable", "data layer variable", "gtm variable"],
    response:
      "The Data Layer is a JavaScript object that passes information to GTM:\n\n```\nwindow.dataLayer.push({\n  'event': 'form_submit',\n  'formName': 'contact',\n  'formLocation': 'homepage'\n});\n```\n\nIn GTM:\n1. Create a Data Layer Variable for each value (e.g., formName)\n2. Create a Custom Event trigger (event name = 'form_submit')\n3. Use the variable in your tag configuration\n\nBest practices:\n• Push events AFTER the action completes\n• Use consistent naming (camelCase)\n• Push the event name in the 'event' key\n• Don't overwrite — always use .push()",
  },
  {
    topic: "GTM Triggers",
    keywords: ["gtm trigger", "trigger type", "click trigger", "form submission trigger", "scroll trigger", "custom event trigger", "page view trigger"],
    response:
      "Common GTM trigger types:\n\n• Page View — fires on page load (use for GA4 config, pixels)\n• Click — All Elements or Just Links. Filter by CSS selector, URL, or text\n• Form Submission — fires when a form submits. 'Check Validation' waits for valid form\n• Custom Event — fires on dataLayer.push events\n• Scroll Depth — fires at specific scroll percentages\n• Timer — fires after elapsed time\n• History Change — fires on SPA navigation (React/Next.js apps)\n\nTip for SPAs: use History Change triggers instead of Page View for virtual page tracking.\n\nAlways use Preview mode to verify your triggers match the right interactions.",
  },

  // ═══════════════════════════════════════════════
  // FACEBOOK & INSTAGRAM ADS
  // (from Academy: facebook-instagram-ads)
  // ═══════════════════════════════════════════════

  {
    topic: "Facebook Ads",
    keywords: ["facebook ads", "meta ads", "instagram ads", "fb ads", "facebook advertising", "meta pixel", "facebook pixel"],
    response:
      "Meta Ads (Facebook & Instagram) use an objective-based campaign structure:\n\n• Awareness — reach and brand awareness\n• Traffic — drive clicks to your site\n• Engagement — post engagement, page likes\n• Leads — lead forms within Facebook\n• Sales — conversions and catalog sales\n\nKey setup: Install the Meta Pixel and Conversions API for tracking. Use Advantage+ campaigns for automated optimization.\n\nOur Academy course covers the full system — Ads Manager, audience types, and measurement.",
    courseSlug: "facebook-instagram-ads",
  },
  {
    topic: "Facebook Pixel Issues",
    keywords: ["pixel not working", "meta pixel", "facebook pixel not firing", "pixel events", "pixel helper", "conversions api", "capi"],
    response:
      "Troubleshooting the Meta Pixel:\n\n1. Install Meta Pixel Helper (Chrome extension) — check if the pixel fires\n2. Check Events Manager > Test Events — send test traffic\n3. Common issues:\n   - Pixel ID wrong — verify in Events Manager\n   - Ad blockers — many block the pixel\n   - Conversions API (CAPI) — server-side backup for when pixels are blocked\n   - Duplicate events — check for both pixel AND CAPI sending the same event\n4. Event match quality — add customer parameters (email, phone) to improve matching\n\nAlways implement both Pixel + CAPI for best attribution.",
    courseSlug: "facebook-instagram-ads",
  },

  // ═══════════════════════════════════════════════
  // SEO — Troubleshooting & How-To
  // (from Academy courses)
  // ═══════════════════════════════════════════════

  {
    topic: "SEO",
    keywords: ["seo", "search engine", "organic", "rankings", "rank", "google rank", "serp"],
    response:
      "SEO (Search Engine Optimization) is about improving your visibility in organic search results. Key areas:\n\n• Technical SEO — site speed, crawlability, indexing\n• On-Page SEO — content, headings, meta tags, internal links\n• Off-Page SEO — backlinks, authority, brand mentions\n• Local SEO — Google Business Profile, citations, reviews\n\nOur Academy has 10 free SEO courses covering everything from fundamentals to advanced technical optimization. Significant results typically take 4-6 months of consistent effort.",
    courseSlug: "seo-fundamentals",
  },
  {
    topic: "Local SEO",
    keywords: ["local seo", "google business", "local search", "near me", "maps", "local listing", "google business profile", "gbp"],
    response:
      "Local SEO helps your business appear in 'near me' searches and Google Maps:\n\n• Google Business Profile — claim, verify, optimize with photos, posts, Q&A\n• NAP consistency — Name, Address, Phone must be identical everywhere\n• Local citations — directory listings (Yelp, BBB, industry-specific)\n• Reviews — respond to every review, encourage happy customers to leave them\n• LocalBusiness Schema — structured data on your website\n• Geo-targeted content — city/neighborhood pages\n\nOur Academy course 'Local SEO for Texas Businesses' covers this in depth.",
    courseSlug: "local-seo",
  },
  {
    topic: "Technical SEO",
    keywords: ["technical seo", "site speed", "core web vitals", "crawl", "mobile first", "indexing", "crawl budget"],
    response:
      "Technical SEO ensures search engines can effectively crawl and index your site:\n\n• Core Web Vitals — LCP (loading), INP (interactivity), CLS (visual stability)\n• Crawl budget — optimize for large sites by fixing crawl traps\n• XML sitemaps — submit to Google Search Console\n• Robots.txt — control what gets crawled\n• HTTPS — required for rankings\n• Site architecture — flat, logical URL structure\n• Mobile-first — Google indexes mobile version first\n\nOur Academy course 'Technical SEO' dives deep into each area.",
    courseSlug: "technical-seo",
  },
  {
    topic: "On-Page SEO",
    keywords: ["on page seo", "on-page", "title tag", "meta description", "alt text", "internal linking", "url structure"],
    response:
      "On-page SEO is everything you control on the page itself:\n\n• Title tag — 50-60 chars, primary keyword near the front\n• Meta description — 150-160 chars, compelling with a CTA\n• Heading structure — one H1, logical H2-H6 nesting\n• Image alt text — descriptive, includes keywords naturally\n• Internal links — connect related pages, use descriptive anchor text\n• URL structure — short, descriptive, includes keyword\n• Content quality — comprehensive, matches search intent\n\nUse our Academy's 'On-Page SEO Checklist' course for a step-by-step guide.",
    courseSlug: "on-page-seo-checklist",
  },
  {
    topic: "AEO",
    keywords: ["aeo", "answer engine", "ai search", "ai optimization", "chatgpt", "ai overview", "generative search", "featured snippet"],
    response:
      "Answer Engine Optimization (AEO) structures your content for AI search engines and featured snippets:\n\n• H2 as questions — phrase section headings as questions users ask\n• Direct answers — 40-60 word answer immediately after each H2\n• Entity relationships — clear topic-subtopic structure\n• FAQ & HowTo Schema — structured data for AI systems\n• Topical authority — comprehensive coverage of your subject area\n\nAEO is built on top of solid SEO. Our Academy course covers the full strategy.",
    courseSlug: "aeo",
  },
  {
    topic: "Heading Hierarchy",
    keywords: ["heading", "h1", "h2", "h3", "heading hierarchy", "heading structure", "headings"],
    response:
      "Heading hierarchy is critical for SEO and accessibility:\n\n• H1 — exactly one per page, primary topic/keyword\n• H2 — major sections. For AEO, phrase as user questions\n• H3-H6 — subsections nested under their parent\n• Never skip levels (H2 → H4 is wrong)\n\nWhy it matters:\n- Search engines use headings to understand content structure\n- Screen readers use them for navigation (WCAG compliance)\n- AI engines extract content based on heading hierarchy\n\n60%+ of sites we audit have heading issues. Our Academy course 'Heading Hierarchy Structure' covers this in detail.",
    courseSlug: "heading-hierarchy",
  },
  {
    topic: "Frontend SEO",
    keywords: ["frontend seo", "meta tags", "open graph", "twitter card", "schema", "structured data", "canonical", "robots meta"],
    response:
      "Frontend SEO is about the HTML elements search engines read:\n\n• Title tags & meta descriptions — your SERP listing\n• Open Graph tags — how your page looks when shared on Facebook/LinkedIn\n• Twitter Cards — how your page looks on X/Twitter\n• Canonical URLs — tell Google which version of a page is the original\n• Robots meta — control indexing per page (noindex, nofollow)\n• Schema.org — structured data for rich results (FAQ, HowTo, Product)\n\nOur Academy course 'Frontend SEO' covers every tag with code examples.",
    courseSlug: "frontend-seo",
  },
  {
    topic: "CDN & Cloudflare",
    keywords: ["cdn", "cloudflare", "cloudflare setup", "dns", "ssl", "caching", "page speed", "nameserver"],
    response:
      "CDNs (Content Delivery Networks) serve your site from servers closest to the user, improving speed:\n\n• Cloudflare — free plan includes CDN, SSL, DDoS protection, firewall\n• Setup: Change nameservers to Cloudflare's, configure SSL mode (Full Strict recommended)\n• Caching — set cache rules for static assets (images, CSS, JS)\n• Page Rules — control caching, redirects, security per URL\n• Firewall — block bad bots, rate limit, challenge suspicious traffic\n\nOur Academy course 'CDNs & Cloudflare Setup' walks through configuration step-by-step.",
    courseSlug: "cdns-and-cloudflare",
  },
  {
    topic: "SEO Copywriting",
    keywords: ["seo copywriting", "seo writing", "keyword placement", "semantic seo", "lsi keywords", "seo content"],
    response:
      "SEO copywriting balances search optimization with readability:\n\n• Primary keyword in title, H1, first 100 words, URL\n• Semantic keywords (LSI) — related terms that show topical coverage\n• Topic clusters — pillar page + supporting content\n• Match search intent — informational, navigational, transactional\n• Write for humans first, optimize for engines second\n• Readability — short sentences, clear structure, avoid jargon\n\nOur Academy course 'Wording Search Engines Like' teaches strategic keyword placement without stuffing.",
    courseSlug: "seo-copywriting",
  },
  {
    topic: "Blog SEO",
    keywords: ["blog seo", "blog post", "content strategy", "topic cluster", "internal linking", "hub and spoke", "skyscraper"],
    response:
      "Blog posts are a core SEO strategy for driving organic traffic:\n\n• Topic research — use keyword gap analysis to find opportunities\n• Content structure — H1 title, H2 sections, H3 subsections, TL;DR\n• Internal linking — link related posts, use descriptive anchor text\n• Featured snippet optimization — answer questions concisely\n• Hub & Spoke model — pillar page (hub) + supporting posts (spokes)\n• Content freshness — update old posts with new data\n\nOur Academy course 'Blog Posts for SEO' covers the full strategy.",
    courseSlug: "blog-posts-for-seo",
  },

  // ═══════════════════════════════════════════════
  // SOCIAL MEDIA — From Academy courses
  // ═══════════════════════════════════════════════

  {
    topic: "Social Media Strategy",
    keywords: ["social media", "social strategy", "posting schedule", "content calendar", "social media plan"],
    response:
      "A social media strategy starts with clear goals and audience understanding:\n\n• Choose platforms based on where your audience lives\n• Define content pillars (3-5 themes you'll consistently cover)\n• Set a posting cadence — quality over quantity\n• Engage authentically — respond to comments, join conversations\n• Track KPIs — engagement rate, reach, clicks, conversions\n\nWe recommend 3-5 posts/week for Instagram/Facebook. Our Academy has courses on platform-specific strategies for Instagram, LinkedIn, TikTok, and more.",
    courseSlug: "social-media-strategy",
  },
  {
    topic: "Instagram Marketing",
    keywords: ["instagram", "reels", "instagram growth", "instagram algorithm", "instagram marketing", "stories"],
    response:
      "Instagram marketing in 2026 is driven by Reels and authentic content:\n\n• Algorithm prioritizes: saves, shares, watch time, and engagement\n• Reels — short video is the #1 reach tool\n• Stories — daily engagement, polls, Q&A for connection\n• Hashtags — use 3-5 relevant ones (quality over quantity)\n• Instagram SEO — keywords in bio, captions, and alt text\n• Shopping — tag products directly in posts and Reels\n\nOur Academy course 'Instagram Marketing & Growth' covers the full playbook.",
    courseSlug: "instagram-marketing",
  },
  {
    topic: "LinkedIn Strategy",
    keywords: ["linkedin", "linkedin content", "b2b marketing", "linkedin ads", "linkedin strategy", "personal brand"],
    response:
      "LinkedIn is the #1 B2B platform for content marketing and lead generation:\n\n• Personal brand > company page for reach\n• Post types that work: stories, carousels, polls, text-only\n• Engage in comments — the algorithm rewards active commenters\n• Newsletter feature — direct to subscribers' inboxes\n• Employee advocacy — amplify reach through team members\n\nOur Academy has two LinkedIn courses: Content Strategy and Advertising for B2B.",
    courseSlug: "linkedin-content-strategy",
  },
  {
    topic: "TikTok Marketing",
    keywords: ["tiktok", "tiktok marketing", "tiktok ads", "short video", "for you page", "fyp"],
    response:
      "TikTok's For You Page algorithm gives every video a chance regardless of follower count:\n\n• Hook in first 2 seconds — or they scroll\n• Trend-jacking — put your spin on trending sounds/formats\n• TikTok SEO — keywords in captions, on-screen text, and spoken audio\n• Post consistently — 1-3x daily for growth\n• TikTok Shop — direct e-commerce integration\n\nOur Academy course 'TikTok Marketing for Brands' covers content creation, ads, and analytics.",
    courseSlug: "tiktok-marketing",
  },

  // ═══════════════════════════════════════════════
  // EMAIL MARKETING
  // ═══════════════════════════════════════════════

  {
    topic: "Email Marketing",
    keywords: ["email marketing", "email campaign", "newsletter", "drip campaign", "email automation", "email list", "mailchimp", "deliverability"],
    response:
      "Email marketing delivers 36:1 average ROI — the highest of any channel:\n\n• List building — lead magnets, signup forms, gated content\n• Segmentation — group by behavior, interest, purchase history\n• Automation — welcome series, abandoned cart, re-engagement\n• Deliverability — SPF, DKIM, DMARC records are essential\n• Subject lines — A/B test length, personalization, urgency\n• Mobile-first — 60%+ of emails opened on mobile\n\nOur Academy course 'Email Marketing Mastery' covers the full lifecycle.",
    courseSlug: "email-marketing-mastery",
  },

  // ═══════════════════════════════════════════════
  // BRANDING — From Academy courses
  // ═══════════════════════════════════════════════

  {
    topic: "Brand Identity",
    keywords: ["branding", "brand", "logo", "identity", "style guide", "brand strategy", "rebrand", "brand identity"],
    response:
      "Your brand is more than a logo. A complete brand identity includes:\n\n• Strategy & positioning — who you are, who you serve, how you're different\n• Visual identity — logo, colors, typography, imagery style\n• Brand voice — tone, messaging framework, key phrases\n• Style guide — rules for consistent application\n\nOur Academy has 4 branding courses: Brand Identity Development, Brand Voice & Messaging, Visual Branding Digital, and Brand Positioning.",
    courseSlug: "brand-identity-development",
  },

  // ═══════════════════════════════════════════════
  // ANALYTICS & DATA — From Academy courses
  // ═══════════════════════════════════════════════

  {
    topic: "Conversion Rate Optimization",
    keywords: ["cro", "conversion rate", "landing page optimization", "a/b test", "conversion optimization", "split test"],
    response:
      "Conversion Rate Optimization (CRO) improves the % of visitors who take action:\n\n• Analyze — identify drop-off points in your funnel\n• Hypothesize — what change might improve conversion?\n• Test — A/B test one variable at a time\n• Measure — statistical significance before declaring winners\n\nQuick wins: simplify forms, add social proof, improve page speed, make CTAs more prominent, reduce friction in checkout.\n\nOur Academy course 'Conversion Rate Optimization' covers the full methodology.",
    courseSlug: "conversion-rate-optimization",
  },
  {
    topic: "Marketing Attribution",
    keywords: ["attribution", "attribution model", "multi-touch", "first click", "last click", "data-driven attribution"],
    response:
      "Attribution determines which marketing touchpoints get credit for conversions:\n\n• Last Click — all credit to the final touchpoint\n• First Click — all credit to the discovery channel\n• Linear — equal credit to all touchpoints\n• Data-Driven — Google's ML model distributes credit based on actual contribution\n\nGA4 uses data-driven attribution by default. Google Ads uses data-driven for conversion bidding.\n\nOur Academy course on Marketing Attribution covers implementation and analysis.",
    courseSlug: "marketing-attribution",
  },

  // ═══════════════════════════════════════════════
  // RETARGETING & REMARKETING
  // ═══════════════════════════════════════════════

  {
    topic: "Retargeting",
    keywords: ["retargeting", "remarketing", "retarget", "follow me ads", "abandoned cart", "display remarketing"],
    response:
      "Retargeting shows ads to people who already visited your site:\n\n• Pixel-based — install tracking pixel, build audiences automatically\n• List-based — upload customer email lists for targeting\n• Sequential messaging — show different ads based on funnel stage\n• Frequency capping — limit how often someone sees your ad\n• Cross-platform — retarget on Google, Meta, LinkedIn simultaneously\n\nBest practice: segment audiences (homepage visitors vs product page vs cart abandoners) and tailor messaging.\n\nOur Academy course 'Retargeting & Remarketing Strategies' covers the full playbook.",
    courseSlug: "retargeting-remarketing",
  },

  // ═══════════════════════════════════════════════
  // CONTENT & VIDEO MARKETING
  // ═══════════════════════════════════════════════

  {
    topic: "Content Marketing",
    keywords: ["content marketing", "content strategy", "content funnel", "tofu", "mofu", "bofu", "content plan"],
    response:
      "Content marketing drives long-term organic growth through valuable content:\n\n• TOFU (Top of Funnel) — blog posts, videos, social content for awareness\n• MOFU (Middle) — case studies, webinars, comparison guides for consideration\n• BOFU (Bottom) — demos, free trials, testimonials for decision\n\nKey tactics: topic clusters, editorial calendar, repurposing content across channels.\n\nOur Academy course 'Content Marketing Strategy' covers funnel mapping, distribution, and ROI measurement.",
    courseSlug: "content-marketing-strategy",
  },
  {
    topic: "Video Marketing",
    keywords: ["video marketing", "youtube", "youtube seo", "video strategy", "video content", "youtube algorithm"],
    response:
      "Video is the most engaging content format — YouTube is the #2 search engine:\n\n• YouTube SEO — keywords in title, description, tags, closed captions\n• Thumbnail psychology — high contrast, face, text overlay = higher CTR\n• Watch time — the #1 ranking factor. Hook early, deliver value\n• Shorts vs Long-form — Shorts for discovery, long-form for depth\n• Repurpose — turn blog posts into videos, videos into social clips\n\nOur Academy course 'Video Marketing & YouTube SEO' covers the full strategy.",
    courseSlug: "video-marketing-youtube-seo",
  },
  {
    topic: "Podcast Marketing",
    keywords: ["podcast", "podcast marketing", "podcast growth", "podcast strategy", "podcast seo"],
    response:
      "Podcasting builds deep audience connection and thought leadership:\n\n• Format — solo, interview, or co-host\n• Distribution — submit to Apple, Spotify, Google Podcasts via RSS\n• Show notes — SEO-optimized summaries with timestamps\n• Guest booking — cross-promote with guests' audiences\n• Repurpose — audiograms, blog posts, social quotes from episodes\n\nOur Academy course 'Podcast Marketing & Growth' covers production to monetization.",
    courseSlug: "podcast-marketing",
  },
  {
    topic: "Content Repurposing",
    keywords: ["repurpose", "repurposing", "content repurposing", "create once", "content multiplication"],
    response:
      "Content repurposing maximizes ROI by transforming one piece into many:\n\n• Blog post → social media carousel, email newsletter, video script\n• Webinar → blog post, YouTube video, podcast episode, quote graphics\n• Podcast → blog transcript, audiograms, social clips\n• Long video → YouTube Shorts, Reels, TikToks\n\nThe 'Create Once, Distribute Everywhere' philosophy. Our Academy course covers workflows and SOPs for systematic repurposing.",
    courseSlug: "content-repurposing",
  },

  // ═══════════════════════════════════════════════
  // E-COMMERCE & GROWTH
  // ═══════════════════════════════════════════════

  {
    topic: "E-Commerce Marketing",
    keywords: ["ecommerce", "e-commerce", "shopify", "woocommerce", "online store", "product feed", "shopping ads"],
    response:
      "E-commerce marketing combines multiple channels for maximum sales:\n\n• Google Shopping Ads — product feed via Merchant Center\n• Meta Dynamic Ads — retarget with product catalog\n• Email flows — abandoned cart, post-purchase, win-back\n• SEO — product page optimization, category pages\n• CRO — checkout optimization, trust signals, reviews\n\nOur Academy course 'E-Commerce Marketing' covers the full strategy.",
    courseSlug: "ecommerce-marketing",
  },
  {
    topic: "B2B Lead Generation",
    keywords: ["b2b", "lead generation", "lead gen", "b2b marketing", "demand generation", "sales funnel"],
    response:
      "B2B lead generation requires a multi-touch strategy:\n\n• Content — whitepapers, webinars, case studies as lead magnets\n• LinkedIn — ads + organic content for professional targeting\n• Google Ads — target high-intent commercial keywords\n• Email nurture — automated sequences moving leads through the funnel\n• Account-Based Marketing (ABM) — target specific companies\n\nOur Academy course 'B2B Lead Generation' covers the full pipeline.",
    courseSlug: "b2b-lead-generation",
  },
  {
    topic: "Reputation Management",
    keywords: ["reputation", "reviews", "online reputation", "review management", "negative review", "google reviews"],
    response:
      "Online reputation directly impacts conversions and local SEO:\n\n• Monitor — set up alerts for brand mentions and reviews\n• Respond to everything — thank positive, address negative professionally\n• Generate reviews — ask happy customers via email/SMS after service\n• Suppress negatives — push down negative results with positive content\n• Review platforms — Google, Yelp, Facebook, industry-specific sites\n\nOur Academy course 'Reputation Management' covers monitoring, response templates, and generation strategies.",
    courseSlug: "reputation-management",
  },

  // ═══════════════════════════════════════════════
  // STRATEGY & GROWTH
  // ═══════════════════════════════════════════════

  {
    topic: "Digital Marketing Strategy",
    keywords: ["marketing strategy", "digital strategy", "marketing plan", "integrated marketing", "full funnel"],
    response:
      "A digital marketing strategy aligns all channels toward business goals:\n\n• Audit current state — what's working, what's not\n• Define goals — leads, revenue, brand awareness (make them SMART)\n• Choose channels — based on audience, budget, and timeline\n• Create content plan — what to publish, where, when\n• Measure & optimize — monthly reviews, A/B testing, reallocation\n\nOur Academy course 'Digital Marketing Strategy' covers the full framework.",
    courseSlug: "digital-marketing-strategy",
  },
  {
    topic: "Competitor Analysis",
    keywords: ["competitor", "competition", "competitive analysis", "competitor research", "market research"],
    response:
      "Competitor analysis reveals opportunities and threats:\n\n• Identify competitors — direct, indirect, and aspirational\n• Analyze their SEO — keywords, backlinks, content gaps\n• Review their ads — Google Ads Transparency Center, Meta Ad Library\n• Evaluate their content — what topics, what formats, what engagement\n• Check their reviews — what customers praise and complain about\n\nTools: SEMrush, Ahrefs, SimilarWeb, SpyFu, Google Ads Auction Insights.\n\nOur Academy course 'Competitor Analysis' covers systematic research methods.",
    courseSlug: "competitor-analysis",
  },
  {
    topic: "Community Management",
    keywords: ["community", "community management", "moderation", "user generated content", "ugc", "engagement"],
    response:
      "Community management builds loyal audiences and brand advocates:\n\n• Set clear guidelines — community rules, moderation policies\n• Engage consistently — respond to comments, DMs, mentions\n• User-generated content — encourage and reshare customer content\n• Ambassador programs — turn super-fans into brand advocates\n• Crisis playbook — have a plan before you need one\n\nOur Academy course 'Community Management & Engagement' covers the full strategy.",
    courseSlug: "community-management",
  },
  {
    topic: "Ad Copywriting",
    keywords: ["ad copy", "ad copywriting", "headline formula", "cta", "call to action", "ad writing", "ad creative"],
    response:
      "Great ad copy follows proven principles:\n\n• Headlines — benefit-driven, specific, create curiosity\n• CTAs — clear action verb ('Get', 'Start', 'Download', not 'Click Here')\n• Urgency — time limits, scarcity, deadlines (when genuine)\n• Social proof — numbers, testimonials, awards in the copy\n• A/B testing — test one variable at a time, measure statistical significance\n\nFormulas: PAS (Problem-Agitation-Solution), AIDA (Attention-Interest-Desire-Action), 4Ps (Promise-Picture-Proof-Push).\n\nOur Academy course covers copywriting frameworks and testing methodology.",
    courseSlug: "ad-copywriting-testing",
  },

  // ═══════════════════════════════════════════════
  // COMPANY INFO & SERVICES (kept from original)
  // ═══════════════════════════════════════════════

  {
    topic: "PPC Services",
    keywords: ["ppc service", "google ads management", "ads management", "paid advertising", "pay per click management"],
    response:
      "We manage Google Search, Display, Shopping, YouTube, and Remarketing campaigns. We also run Facebook, Instagram, and LinkedIn ads. We recommend a minimum $1,500/month ad spend for meaningful results. PPC can drive traffic almost immediately, but typically takes 2-3 months to fully optimize for maximum ROI.",
  },
  {
    topic: "Ad Budget",
    keywords: ["budget", "ad spend", "cost per click", "minimum spend"],
    response:
      "For PPC, we recommend a minimum starting budget of $1,500/month for meaningful results. Actual costs depend on your industry, competition, and goals. We provide transparent spend reporting so you always know where every dollar goes. No hidden fees.",
  },
  {
    topic: "Web Design",
    keywords: ["website", "web design", "web development", "redesign", "landing page", "wordpress", "next.js", "ecommerce"],
    response:
      "We build custom, conversion-focused websites — no templates. Mobile-first, SEO-ready from day one. We work with WordPress, Next.js/React, and e-commerce platforms like Shopify and WooCommerce. A typical project takes 6-8 weeks from discovery to launch.",
  },
  {
    topic: "Process",
    keywords: ["process", "how it works", "get started", "steps", "onboarding"],
    response:
      "Our proven 4-step process: 1) Audit & Discovery — deep dive into your business and competitors. 2) Strategy & Planning — custom roadmap built around your goals. 3) Execution & Launch — implement, test, and launch. 4) Optimize & Scale — continuous improvement through data. Every engagement starts with a free consultation.",
  },
  {
    topic: "Pricing",
    keywords: ["pricing", "cost", "price", "quote", "rates", "packages", "affordable", "how much"],
    response:
      "We provide custom quotes after an initial discovery call — no cookie-cutter packages. Website projects start in the low five figures. PPC minimum ad spend is $1,500/month. We offer transparent, itemized quotes with no hidden fees and no long-term contracts required. Reach out for a free consultation!",
  },
  {
    topic: "Contracts",
    keywords: ["contract", "commitment", "long term", "cancel", "month to month"],
    response:
      "No long-term contracts required. We believe in earning your business every month. You get a dedicated account manager, transparent reporting, and white-glove service. Our 97% client retention rate speaks for itself.",
  },
  {
    topic: "About",
    keywords: ["about", "who are you", "company", "team", "founded", "history", "vanguard"],
    response:
      "Vanguard Digital Marketing is a results-driven, full-service digital marketing agency based in Texas. Founded in 2019, we've grown to serve 148+ clients with a 97% retention rate. We've delivered 495+ projects across SEO, web design, PPC, social media, branding, and content marketing.",
  },
  {
    topic: "Locations",
    keywords: ["location", "office", "where", "austin", "dallas", "houston", "texas", "local"],
    response:
      "We're headquartered in Texas and serve clients nationwide. We have deep expertise in the Austin, Dallas-Fort Worth, and Houston markets.",
  },

  // ── Audit Services ─────────────────────────────
  {
    topic: "SEO Audit",
    keywords: ["seo audit", "audit my site", "audit my website", "site audit", "website audit", "free audit", "audit report"],
    response:
      "Our SEO audits cover 6 core areas:\n\n• Heading Hierarchy — one H1, proper H2-H6 nesting\n• AEO Readiness — H2 question format with direct answers\n• Technical Health — crawl errors, Core Web Vitals, schema\n• On-Page — title tags, meta descriptions, internal links\n• Indexing — canonical tags, sitemap, robots.txt\n• Performance — page speed, image optimization, caching\n\nWant a free audit? Head to our contact page!",
  },
  {
    topic: "Security Audit",
    keywords: ["security audit", "security", "hacked", "malware", "compromised", "vulnerability", "secure"],
    response:
      "Our security analysis uses the MITRE ATT&CK framework to assess web threats:\n\n• Historical comparison against clean baselines\n• IOC detection — injected scripts, suspicious redirects\n• MITRE ATT&CK mapping for every finding\n• Prioritized remediation plan\n\nIf you suspect your site has been compromised, contact us immediately.",
  },

  // ── Client Support ─────────────────────────────
  {
    topic: "Support",
    keywords: ["support", "help", "issue", "problem", "current client", "existing client", "account", "manager"],
    response:
      "Current clients: reach out to your dedicated account manager directly, or use our contact form and mention your company name. We provide ongoing support, real-time reporting, and regular strategy calls.",
  },
  {
    topic: "New Client",
    keywords: ["new client", "interested", "consultation", "free consultation", "get started", "hire", "work with"],
    response:
      "Welcome! Getting started is easy — we offer a free consultation to understand your business, goals, and challenges. From there, we'll put together a custom strategy and transparent quote. No long-term contracts, no hidden fees. Just results. Head to our contact page to book your free consultation!",
  },
  {
    topic: "Reporting",
    keywords: ["report", "reporting", "dashboard", "results", "roi", "metrics", "tracking"],
    response:
      "Full transparency is a core value. Every client gets detailed monthly reports covering rankings, traffic, conversions, and ROI. We use Google Analytics, Search Console, and custom dashboards. Your account manager walks you through the data in regular strategy calls.",
  },

  // ── Academy ─────────────────────────────────────
  {
    topic: "Academy",
    keywords: ["academy", "courses", "learn", "training", "certification", "free courses", "marketing courses"],
    response:
      "The Vanguard Academy offers 38 courses across 8 categories — most are free!\n\n• SEO & Search (10 free courses)\n• PPC & Paid Advertising (5 courses)\n• Social Media Marketing (5 courses)\n• Content Marketing & Email (5 courses)\n• Branding & Creative (4 courses)\n• Analytics & Data (4 courses)\n• Strategy & Growth (4 courses)\n• E-Commerce & Industry (3 courses)\n\nPaid courses include exams with certificates. Visit /academy to browse!",
  },
];

/** Score a user message against the knowledge base and return the best match. */
export function findBestMatch(message: string): KnowledgeEntry | null {
  const lower = message.toLowerCase();
  let bestScore = 0;
  let bestEntry: KnowledgeEntry | null = null;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        // Longer keywords are more specific → weight more
        score += kw.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  // Minimum threshold — at least one meaningful keyword match
  return bestScore >= 3 ? bestEntry : null;
}

/** Quick-action topics shown as chips in the chatbot. */
export const QUICK_TOPICS = [
  { label: "Google Ads", query: "How does Google Ads work?" },
  { label: "GA4 Setup", query: "How do I set up Google Analytics 4?" },
  { label: "GTM Help", query: "How do I use Google Tag Manager?" },
  { label: "SEO Tips", query: "What are the most important SEO factors?" },
  { label: "Academy", query: "What courses do you offer?" },
  { label: "Get Started", query: "How do I get started as a new client?" },
];
