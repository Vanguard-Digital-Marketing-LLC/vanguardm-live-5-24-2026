import type { QuizQuestion } from "@/lib/academy-data";

export const googleAnalytics4Quiz: QuizQuestion[] = [
  // ===== SECTION 1: Introduction & Overview (12 questions) =====
  {
    type: "multiple-choice",
    question: "What data model does GA4 use to track user interactions?",
    options: [
      "Session-based model",
      "Event-based model",
      "Pageview-based model",
      "Cookie-based model",
    ],
    correctIndex: 1,
    explanation:
      "GA4 uses an event-based data model where every user interaction — pageviews, clicks, purchases — is recorded as a discrete event, unlike Universal Analytics which used a session-based model.",
  },
  {
    type: "multiple-choice",
    question:
      "What was the primary tracking model used by Universal Analytics (GA4's predecessor)?",
    options: [
      "Event-based tracking",
      "User-based tracking",
      "Session-based tracking with pageviews at its core",
      "Server-side tracking",
    ],
    correctIndex: 2,
    explanation:
      "Universal Analytics was built on a session-based model with pageviews as the foundational hit type. GA4 replaced this with a more flexible event-based model.",
  },
  {
    type: "multiple-choice",
    question: "Which of the following is NOT a key advantage of GA4 over Universal Analytics?",
    options: [
      "Cross-platform measurement across websites and apps",
      "Built-in machine learning for data gap filling",
      "Unlimited data retention for all properties",
      "Privacy-centric design with cookieless modeling",
    ],
    correctIndex: 2,
    explanation:
      "GA4 does not offer unlimited data retention. User-level data retention is limited to 2 or 14 months. Cross-platform measurement, machine learning, and privacy-centric design are all genuine advantages.",
  },
  {
    type: "multiple-choice",
    question:
      "What type of measurement does GA4 natively support that Universal Analytics did not?",
    options: [
      "Email open tracking",
      "Cross-platform measurement across websites and mobile apps",
      "Social media follower counting",
      "Print advertising tracking",
    ],
    correctIndex: 1,
    explanation:
      "GA4 was specifically designed for cross-platform measurement, natively supporting unified tracking across websites and mobile apps in a single property.",
  },
  {
    type: "multiple-choice",
    question:
      "How does GA4's data model fundamentally differ from Universal Analytics?",
    options: [
      "GA4 uses a session-based model; UA used an event-based model",
      "GA4 uses an event-based model; UA used a session-based model",
      "Both use the same model but with different report interfaces",
      "GA4 uses a page-based model; UA used a hit-based model",
    ],
    correctIndex: 1,
    explanation:
      "GA4 uses a fundamentally different event-based data model where every interaction is an event with parameters, while Universal Analytics used a session-based approach with pageviews as the core hit type.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following challenges was GA4 designed to address? (Select all that apply)",
    options: [
      "Cross-device and cross-platform user journeys",
      "Declining cookie consent rates",
      "Server infrastructure costs",
      "Privacy regulations like GDPR and CCPA",
      "Social media content creation",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "GA4 was designed to handle cross-platform measurement, adapt to declining consent rates through machine learning, and comply with privacy regulations. Server costs and content creation are not problems GA4 was built to solve.",
  },
  {
    type: "multi-select",
    question:
      "Which types of digital properties can GA4 measure? (Select all that apply)",
    options: [
      "Websites",
      "iOS mobile apps",
      "Android mobile apps",
      "Desktop software applications",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "GA4 can measure websites (via web data streams) and mobile apps (via iOS and Android data streams). Traditional desktop software is not directly measured by GA4.",
  },
  {
    type: "ordering",
    question:
      "Arrange the evolution of Google's analytics platforms in chronological order.",
    items: [
      "Google Analytics 4",
      "Universal Analytics",
      "Urchin Analytics",
      "Classic Google Analytics",
    ],
    correctOrder: [2, 3, 1, 0],
    explanation:
      "Google's analytics evolved from Urchin Analytics (acquired in 2005), to Classic Google Analytics, to Universal Analytics (2012), and finally to Google Analytics 4 (2020).",
  },
  {
    type: "ordering",
    question:
      "Put these GA4 learning milestones in the recommended order for a new user.",
    items: [
      "Build custom Explorations",
      "Install the GA4 tag on your website",
      "Create a measurement plan",
      "Configure conversion events",
      "Analyze standard reports",
    ],
    correctOrder: [2, 1, 3, 4, 0],
    explanation:
      "Start by creating a measurement plan, then install the GA4 tag, configure conversions, review standard reports, and finally build advanced Explorations.",
  },
  {
    type: "multiple-choice",
    question: "What identifier format does a GA4 web data stream Measurement ID use?",
    options: [
      "UA-XXXXXXX-X",
      "G-XXXXXXXXXX",
      "AW-XXXXXXXXX",
      "DC-XXXXXXXXX",
    ],
    correctIndex: 1,
    explanation:
      "GA4 web data stream Measurement IDs start with 'G-' followed by alphanumeric characters. The 'UA-' prefix was used by Universal Analytics.",
  },
  {
    type: "multi-select",
    question:
      "Which technologies does GA4 use to fill data gaps from users who decline cookies? (Select all that apply)",
    options: [
      "Behavioral modeling",
      "Conversion modeling",
      "Third-party cookie workarounds",
      "Machine learning algorithms",
      "Manual data imputation",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "GA4 uses behavioral modeling, conversion modeling, and machine learning algorithms to estimate metrics for users who decline cookies. It does not use cookie workarounds or manual imputation.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the primary benefit of GA4's unified measurement framework?",
    options: [
      "It reduces server costs",
      "It follows users across platforms and devices",
      "It eliminates the need for Google Tag Manager",
      "It automatically creates marketing campaigns",
    ],
    correctIndex: 1,
    explanation:
      "GA4's unified measurement framework is designed to follow users across platforms (web and app) and devices, providing a holistic view of the customer journey.",
  },

  // ===== SECTION 2: Core Concepts (12 questions) =====
  {
    type: "multiple-choice",
    question: "Which of the following is an 'automatically collected' event in GA4?",
    options: [
      "purchase",
      "add_to_cart",
      "session_start",
      "calculator_submit",
    ],
    correctIndex: 2,
    explanation:
      "session_start is automatically collected by GA4 without any configuration. purchase and add_to_cart are recommended events, and calculator_submit would be a custom event.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the default scroll depth threshold for the Enhanced Measurement scroll event?",
    options: ["25%", "50%", "75%", "90%"],
    correctIndex: 3,
    explanation:
      "GA4's Enhanced Measurement scroll event fires when a user scrolls to 90% of the page depth. This single threshold was chosen to indicate meaningful content consumption.",
  },
  {
    type: "multiple-choice",
    question:
      "In GA4, what defines an 'engaged session'?",
    options: [
      "Any session where the user clicks at least once",
      "A session lasting longer than 10 seconds, having a conversion, or having 2+ pageviews",
      "A session where the user visits at least 3 pages",
      "Any session from a returning user",
    ],
    correctIndex: 1,
    explanation:
      "An engaged session in GA4 is one that lasts longer than 10 seconds, includes at least one conversion event, or has two or more page/screen views.",
  },
  {
    type: "multiple-choice",
    question: "What has replaced bounce rate as GA4's primary quality indicator?",
    options: [
      "Exit rate",
      "Pages per session",
      "Engagement rate",
      "Average session duration",
    ],
    correctIndex: 2,
    explanation:
      "Engagement rate (engaged sessions divided by total sessions) has replaced bounce rate as the primary quality indicator in GA4. It provides a more nuanced view of user interaction.",
  },
  {
    type: "multiple-choice",
    question:
      "How long does a GA4 session last before it times out due to inactivity?",
    options: ["15 minutes", "20 minutes", "30 minutes", "60 minutes"],
    correctIndex: 2,
    explanation:
      "GA4 sessions end after 30 minutes of inactivity by default. This timeout period can be adjusted in the GA4 admin settings.",
  },
  {
    type: "true-false",
    question:
      "Enhanced Measurement events in GA4 require custom code to implement.",
    correctAnswer: false,
    explanation:
      "Enhanced Measurement events can be toggled on/off in the GA4 data stream settings without any code changes. They automatically capture scrolls, outbound clicks, site search, video engagement, and file downloads.",
  },
  {
    type: "true-false",
    question:
      "In GA4, event parameters are key-value pairs that add context to events.",
    correctAnswer: true,
    explanation:
      "Events in GA4 can carry parameters (key-value pairs) that add context, such as the value of a purchase, the title of a page, or the name of a button clicked.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are Enhanced Measurement events in GA4? (Select all that apply)",
    options: [
      "scroll",
      "purchase",
      "file_download",
      "site_search",
      "add_to_cart",
      "video_start",
    ],
    correctIndices: [0, 2, 3, 5],
    explanation:
      "scroll, file_download, site_search, and video_start are all Enhanced Measurement events that can be toggled on without code. purchase and add_to_cart are recommended events requiring separate implementation.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following correctly describe GA4's User-ID feature? (Select all that apply)",
    options: [
      "It stitches together sessions across devices",
      "It requires users to be logged in",
      "It replaces the Client ID entirely",
      "It provides cross-device reporting",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "User-ID stitches sessions across devices and enables cross-device reporting, but it requires users to log in. It supplements rather than replaces the Client ID.",
  },
  {
    type: "ordering",
    question:
      "Arrange GA4 event categories from least to most implementation effort.",
    items: [
      "Custom events",
      "Automatically collected events",
      "Enhanced Measurement events",
      "Recommended events",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "Automatically collected events require zero effort, Enhanced Measurement events need only a toggle, recommended events need implementation following Google's naming conventions, and custom events require full custom implementation.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the recommended deployment method for GA4 tags?",
    options: [
      "Directly in the HTML source code",
      "Google Tag Manager",
      "WordPress plugin only",
      "Google Search Console",
    ],
    correctIndex: 1,
    explanation:
      "Google Tag Manager (GTM) is the recommended deployment method for GA4 because it allows you to add, edit, and version-control tags without modifying your site's source code.",
  },
  {
    type: "ordering",
    question:
      "Put the steps for configuring a GA4 event in GTM in the correct order.",
    items: [
      "Set the trigger conditions",
      "Create a new tag",
      "Select GA4 Event tag type",
      "Enter the event name and parameters",
      "Publish the container",
    ],
    correctOrder: [1, 2, 3, 0, 4],
    explanation:
      "In GTM, you first create a new tag, select the GA4 Event tag type, enter the event name and parameters, set the trigger conditions, and finally publish the container.",
  },

  // ===== SECTION 3: Strategy & Planning (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "What is the first step in building a GA4 measurement plan?",
    options: [
      "Install Google Tag Manager",
      "Define business objectives",
      "Create custom events",
      "Set up conversion tracking",
    ],
    correctIndex: 1,
    explanation:
      "A measurement plan starts with defining business objectives — what success looks like for your organization. All subsequent decisions about KPIs, events, and configurations flow from these objectives.",
  },
  {
    type: "multiple-choice",
    question:
      "In GA4, what are conversion events now officially called?",
    options: [
      "Goal completions",
      "Key Events",
      "Conversion Actions",
      "Success Metrics",
    ],
    correctIndex: 1,
    explanation:
      "GA4 has renamed conversion events to 'Key Events' to distinguish them from Google Ads conversion actions and provide clearer terminology.",
  },
  {
    type: "multiple-choice",
    question:
      "What benefit does linking GA4 to Google Ads provide?",
    options: [
      "Free advertising credits",
      "Automatic ad creation",
      "Import of Key Events for smart bidding and audience sharing",
      "Guaranteed higher Quality Scores",
    ],
    correctIndex: 2,
    explanation:
      "Linking GA4 to Google Ads enables importing Key Events as conversion actions for smart bidding (Target CPA, Target ROAS) and sharing audiences for remarketing.",
  },
  {
    type: "multiple-choice",
    question:
      "How many KPIs should you typically map to each business objective in a measurement plan?",
    options: ["1", "2-3", "5-7", "10+"],
    correctIndex: 1,
    explanation:
      "Best practice is to map 2-3 measurable KPIs to each business objective. Too many KPIs dilute focus, while too few may not capture the full picture.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the purpose of GA4 audiences?",
    options: [
      "To delete user data for privacy compliance",
      "To group users by conditions for analysis and remarketing",
      "To block certain users from being tracked",
      "To automatically generate content for users",
    ],
    correctIndex: 1,
    explanation:
      "GA4 audiences are dynamically updating groups of users defined by conditions you set, used for both analysis within GA4 and sharing with Google Ads for remarketing.",
  },
  {
    type: "true-false",
    question:
      "GA4 audiences update dynamically and can be shared with Google Ads for remarketing.",
    correctAnswer: true,
    explanation:
      "GA4 audiences are dynamic — users are automatically added or removed as they meet or stop meeting the defined conditions. These audiences can be shared directly with linked Google Ads accounts.",
  },
  {
    type: "true-false",
    question:
      "A measurement plan should be created after GA4 tags have been deployed.",
    correctAnswer: false,
    explanation:
      "A measurement plan should be created before any tags are deployed. It translates business objectives into trackable metrics and events, ensuring every data point collected has a clear purpose.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following should be included in a GA4 measurement plan? (Select all that apply)",
    options: [
      "Business objectives",
      "KPI definitions",
      "Required events and parameters",
      "Social media posting schedule",
      "Conversion event documentation",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "A measurement plan should include business objectives, KPI definitions, required events with parameters, and conversion event documentation. A social media posting schedule is a separate operational document.",
  },
  {
    type: "multi-select",
    question:
      "Which Google Ads bidding strategies can leverage imported GA4 Key Events? (Select all that apply)",
    options: [
      "Target CPA",
      "Manual CPC",
      "Target ROAS",
      "Maximize Conversions",
      "Target Impression Share",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Target CPA, Target ROAS, and Maximize Conversions are smart bidding strategies that use GA4 Key Events to optimize. Manual CPC and Target Impression Share do not use conversion data for bidding.",
  },
  {
    type: "ordering",
    question:
      "Arrange the steps of building a measurement plan in the correct order.",
    items: [
      "Identify required events",
      "Define business objectives",
      "Document conversion events",
      "Map objectives to KPIs",
      "Define event parameters and custom dimensions",
    ],
    correctOrder: [1, 3, 0, 4, 2],
    explanation:
      "Start with business objectives, map them to KPIs, identify required events, define event parameters and custom dimensions, and finally document which events count as conversions.",
  },
  {
    type: "true-false",
    question:
      "Google Ads campaign data such as cost, clicks, and impressions can flow into GA4 when the accounts are linked.",
    correctAnswer: true,
    explanation:
      "When GA4 and Google Ads are linked, campaign data (cost, clicks, impressions) flows from Google Ads into GA4, enabling unified cross-channel reporting.",
  },
  {
    type: "multiple-choice",
    question:
      "What type of custom dimension should you register to track a 'content_group' event parameter in GA4 reports?",
    options: [
      "User-scoped custom dimension",
      "Session-scoped custom dimension",
      "Event-scoped custom dimension",
      "Item-scoped custom dimension",
    ],
    correctIndex: 2,
    explanation:
      "Event parameters like content_group should be registered as event-scoped custom dimensions in GA4's Custom Definitions so they appear in reports and Explorations.",
  },

  // ===== SECTION 4: Execution & Implementation (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "Where should the GTM container snippet be installed on a webpage?",
    options: [
      "Only in the footer",
      "In the <head> and after the opening <body> tag",
      "Only in the <head>",
      "Inside a JavaScript module",
    ],
    correctIndex: 1,
    explanation:
      "The GTM container snippet has two parts: one goes in the <head> section and the noscript fallback goes immediately after the opening <body> tag for optimal loading.",
  },
  {
    type: "multiple-choice",
    question:
      "What trigger should a GA4 Configuration (Google Tag) use in GTM?",
    options: [
      "Click - All Elements",
      "Form Submission",
      "All Pages",
      "Custom Event",
    ],
    correctIndex: 2,
    explanation:
      "The GA4 Configuration Tag (Google Tag) should fire on 'All Pages' so that GA4 loads and begins tracking on every page of your site.",
  },
  {
    type: "multiple-choice",
    question:
      "Which GA4 Exploration type visualizes step-by-step conversion paths?",
    options: [
      "Free-Form Exploration",
      "Funnel Exploration",
      "Path Exploration",
      "Cohort Exploration",
    ],
    correctIndex: 1,
    explanation:
      "Funnel Exploration visualizes step-by-step conversion paths, showing drop-off between each step. You can create open or closed funnels and break them down by any dimension.",
  },
  {
    type: "multiple-choice",
    question:
      "What does the GA4 Path Exploration show?",
    options: [
      "Revenue attribution by channel",
      "A tree-style visualization of the sequence of pages or events users follow",
      "A comparison of two user segments",
      "Historical trend lines for key metrics",
    ],
    correctIndex: 1,
    explanation:
      "Path Exploration provides a tree-style visualization showing the sequence of pages or events users follow, helping discover unexpected navigation patterns.",
  },
  {
    type: "multiple-choice",
    question:
      "What tool should you use alongside GTM Preview mode to validate GA4 event data?",
    options: [
      "Google Search Console",
      "GA4 DebugView",
      "Google PageSpeed Insights",
      "Google Ads Editor",
    ],
    correctIndex: 1,
    explanation:
      "GA4 DebugView (found in Admin > DebugView) shows real-time event data from debug-enabled devices, making it the ideal tool for validating that events fire correctly with expected parameters.",
  },
  {
    type: "true-false",
    question:
      "Custom dimensions must be registered in GA4 Admin before event parameters appear in reports.",
    correctAnswer: true,
    explanation:
      "Event parameters are collected automatically but do not appear in GA4 reports until you register them as custom dimensions or metrics under Admin > Custom Definitions.",
  },
  {
    type: "true-false",
    question:
      "In a Funnel Exploration, an 'open' funnel requires users to enter at the first step.",
    correctAnswer: false,
    explanation:
      "In an open funnel, users can enter at any step. A closed funnel requires users to begin at the first step. Open funnels provide a more realistic view of user behavior.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are types of GA4 Explorations? (Select all that apply)",
    options: [
      "Free-Form Exploration",
      "Funnel Exploration",
      "Path Exploration",
      "Revenue Exploration",
      "Cohort Exploration",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "GA4 offers Free-Form, Funnel, Path, and Cohort Explorations (among others). There is no specific 'Revenue Exploration' type.",
  },
  {
    type: "multi-select",
    question:
      "Which tools can be used to validate a GA4 implementation? (Select all that apply)",
    options: [
      "GA4 DebugView",
      "GTM Preview mode",
      "Google Analytics Debugger Chrome extension",
      "Google Ads Keyword Planner",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "GA4 DebugView, GTM Preview mode, and the Google Analytics Debugger Chrome extension are all valid tools for validating GA4 implementations. Google Ads Keyword Planner is for keyword research.",
  },
  {
    type: "ordering",
    question:
      "Put the GA4 implementation steps in GTM in the correct order.",
    items: [
      "Enable Enhanced Measurement",
      "Create GA4 Event tags for custom events",
      "Install GTM container snippet on your site",
      "Add Google Tag with Measurement ID",
      "Register custom dimensions in GA4 admin",
      "Mark events as Key Events",
    ],
    correctOrder: [2, 3, 0, 1, 4, 5],
    explanation:
      "Install GTM first, then add the Google Tag, enable Enhanced Measurement, create event tags, register custom dimensions, and finally mark Key Events.",
  },
  {
    type: "multiple-choice",
    question:
      "In a Free-Form Exploration, how do you compare different user groups?",
    options: [
      "By creating multiple properties",
      "By applying segments",
      "By changing the Measurement ID",
      "By adjusting the data retention period",
    ],
    correctIndex: 1,
    explanation:
      "In Free-Form Explorations, you apply segments to compare different user groups. Segments can be based on user attributes, session properties, or event conditions.",
  },
  {
    type: "ordering",
    question:
      "Arrange these GTM debugging steps in the recommended order.",
    items: [
      "Check event parameters in DebugView",
      "Enter GTM Preview mode",
      "Trigger the user action on the website",
      "Verify the tag fired in the GTM debug panel",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation:
      "First enter GTM Preview mode, then trigger the action on your site, verify the tag fired in the GTM debug panel, and finally check the event parameters in GA4 DebugView.",
  },

  // ===== SECTION 5: Measurement & Optimization (12 questions) =====
  {
    type: "multiple-choice",
    question:
      "How is the GA4 Reports section organized?",
    options: [
      "By date range and channel",
      "Lifecycle and User collections",
      "Alphabetically by metric name",
      "By conversion funnel stage only",
    ],
    correctIndex: 1,
    explanation:
      "GA4 Reports are organized into Lifecycle (Acquisition, Engagement, Monetization, Retention) and User (Demographics, Tech) collections.",
  },
  {
    type: "multiple-choice",
    question:
      "What does Google Consent Mode v2 do when a user declines cookie consent?",
    options: [
      "Stops all data collection entirely",
      "Sends cookieless pings that fuel behavioral and conversion modeling",
      "Switches to server-side tracking automatically",
      "Redirects the user to a consent page",
    ],
    correctIndex: 1,
    explanation:
      "When consent is denied, Consent Mode v2 adjusts GA4 tag behavior to send cookieless pings. Google uses these pings for behavioral and conversion modeling to fill data gaps.",
  },
  {
    type: "multiple-choice",
    question:
      "What are the data retention options for user-level data in GA4?",
    options: [
      "30 days or 90 days",
      "2 months or 14 months",
      "6 months or 24 months",
      "Unlimited retention",
    ],
    correctIndex: 1,
    explanation:
      "GA4 offers 2-month or 14-month data retention for user-level data. This affects Explorations but not standard reports, which use aggregated data.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the cost of GA4's BigQuery export feature?",
    options: [
      "$150/month flat fee",
      "Free for GA4 properties; you pay only for BigQuery storage and queries",
      "Included only with GA4 360",
      "Based on the number of events exported",
    ],
    correctIndex: 1,
    explanation:
      "GA4's BigQuery export is available at no additional cost for all GA4 properties. You only pay for BigQuery storage and query processing on the Google Cloud side.",
  },
  {
    type: "multiple-choice",
    question:
      "What advantage does server-side tagging provide for GA4?",
    options: [
      "It eliminates the need for a measurement plan",
      "It gives greater control over what data leaves the browser",
      "It automatically creates audiences",
      "It doubles the data retention period",
    ],
    correctIndex: 1,
    explanation:
      "Server-side tagging proxies data collection through a server-side GTM container, giving you greater control over what data leaves the browser and reducing third-party cookie dependence.",
  },
  {
    type: "true-false",
    question: "GA4 logs and stores users' IP addresses.",
    correctAnswer: false,
    explanation:
      "GA4 does not log or store IP addresses, making it more privacy-friendly by design compared to Universal Analytics, which required separate IP anonymization configuration.",
  },
  {
    type: "true-false",
    question:
      "GA4's standard reports are affected by the data retention setting.",
    correctAnswer: false,
    explanation:
      "The data retention setting (2 or 14 months) affects Explorations and user-level data, not standard reports. Standard reports use aggregated data that is retained indefinitely.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are privacy features in GA4? (Select all that apply)",
    options: [
      "Consent Mode v2",
      "IP anonymization by default",
      "Data deletion requests",
      "Automatic GDPR consent banners",
      "Configurable data retention periods",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "GA4 includes Consent Mode v2, automatic IP anonymization, data deletion requests, and configurable data retention. GA4 does not create consent banners — that requires a separate consent management platform.",
  },
  {
    type: "multi-select",
    question:
      "Which Lifecycle report collections are available in GA4? (Select all that apply)",
    options: [
      "Acquisition",
      "Engagement",
      "Monetization",
      "Retention",
      "Attribution",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "The four Lifecycle report collections are Acquisition, Engagement, Monetization, and Retention. Attribution is found under the Advertising section, not Lifecycle.",
  },
  {
    type: "ordering",
    question:
      "Arrange these GA4 report customization steps in the correct order.",
    items: [
      "Add the custom report to navigation",
      "Choose metrics and dimensions",
      "Identify the stakeholder audience",
      "Select the report template",
    ],
    correctOrder: [2, 3, 1, 0],
    explanation:
      "First identify who the report is for, select the appropriate template, choose relevant metrics and dimensions, and finally add it to the navigation for easy access.",
  },
  {
    type: "true-false",
    question:
      "BigQuery export allows you to join GA4 data with CRM and advertising data for advanced analysis.",
    correctAnswer: true,
    explanation:
      "BigQuery export streams raw event-level data into Google's data warehouse, where you can run SQL queries and join GA4 data with CRM, advertising, and other business data sources.",
  },
  {
    type: "multi-select",
    question:
      "Which actions can you perform with GA4 data in BigQuery? (Select all that apply)",
    options: [
      "Run SQL queries against raw event-level data",
      "Join GA4 data with CRM data",
      "Build custom attribution models",
      "Directly edit GA4 report interfaces",
      "Analyze individual user event streams",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "BigQuery allows SQL queries on raw events, joining with external data, custom attribution models, and individual event stream analysis. You cannot edit GA4 report interfaces from BigQuery.",
  },
];
