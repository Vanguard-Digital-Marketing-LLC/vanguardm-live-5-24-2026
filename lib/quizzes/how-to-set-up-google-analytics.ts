import type { QuizQuestion } from "@/lib/academy-data";

export const howToSetUpGoogleAnalyticsQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question:
      "What is the format of a GA4 Measurement ID?",
    options: [
      "UA-XXXXXXX-X",
      "G-XXXXXXXXXX",
      "AW-XXXXXXXX",
      "GT-XXXXXXXX",
    ],
    correctIndex: 1,
    explanation:
      "GA4 uses Measurement IDs in the format G-XXXXXXXXXX. The old UA-XXXXXXX format was for Universal Analytics, which has been sunset. AW- is for Google Ads and GT- is for Google Tag.",
  },
  {
    type: "multiple-choice",
    question:
      "What are the two primary methods for installing the GA4 tracking code on your website?",
    options: [
      "WordPress plugin and Shopify app",
      "Google Tag (gtag.js) directly in your HTML, or through Google Tag Manager",
      "Meta Pixel and Google Ads tag",
      "Server-side tracking and email integration",
    ],
    correctIndex: 1,
    explanation:
      "GA4 can be installed either by adding the gtag.js snippet directly in your site's <head>, or by setting up a GA4 Configuration tag in Google Tag Manager. GTM is preferred for most businesses because it makes managing multiple tags easier without touching site code.",
  },
  {
    type: "multiple-choice",
    question:
      "In GA4, what is an 'event' and how does it differ from Universal Analytics?",
    options: [
      "Events are only manual button clicks tracked with custom code",
      "Everything in GA4 is tracked as an event — page views, scrolls, clicks, and custom interactions are all events",
      "Events are the same as goals in Universal Analytics",
      "Events only fire when a user makes a purchase",
    ],
    correctIndex: 1,
    explanation:
      "GA4 uses an event-based data model where every user interaction is an event. Page views (page_view), scrolls (scroll), outbound clicks (click), file downloads, and video engagement are all events. This differs from Universal Analytics which separated hits into pageviews, events, and transactions.",
  },
  {
    type: "true-false",
    question:
      "GA4's Enhanced Measurement automatically tracks page views, scrolls, outbound clicks, site search, video engagement, and file downloads without any additional code.",
    correctAnswer: true,
    explanation:
      "Enhanced Measurement is enabled by default in GA4 data streams and automatically collects: page_view, scroll (90% depth), click (outbound links), view_search_results (site search), video_start/progress/complete (YouTube embeds), and file_download events.",
  },
  {
    type: "true-false",
    question:
      "Linking GA4 to Google Ads allows you to import GA4 conversions into Google Ads and build audiences for remarketing.",
    correctAnswer: true,
    explanation:
      "When you link GA4 to Google Ads (under Admin > Google Ads Links), you can import GA4 conversion events into Google Ads for bid optimization, and share GA4 audiences with Google Ads for remarketing campaigns.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are automatically tracked by GA4 Enhanced Measurement? (Select all that apply)",
    options: [
      "Page views",
      "Scroll depth (90%)",
      "Form submissions",
      "Outbound link clicks",
      "File downloads",
    ],
    correctIndices: [0, 1, 3, 4],
    explanation:
      "Enhanced Measurement tracks page views, scrolls (at 90% depth), outbound clicks, site search, video engagement, and file downloads. Form submissions are NOT automatically tracked — you need to set up custom event tracking or use GTM to capture form submits.",
  },
  {
    type: "multi-select",
    question:
      "Which reports are available in the standard GA4 Reports section? (Select all that apply)",
    options: [
      "Realtime report",
      "Acquisition (where users come from)",
      "Engagement (what users do on your site)",
      "Monetization (revenue and e-commerce)",
      "Bounce rate report",
    ],
    correctIndices: [0, 1, 2, 3],
    explanation:
      "GA4's standard reports include Realtime, Acquisition (traffic sources), Engagement (pages, events, conversions), Monetization (purchases, revenue), and Retention. There is no standalone 'Bounce rate report' — bounce rate is available as a metric within other reports.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the purpose of GA4 Explorations?",
    options: [
      "They replace the standard reports entirely",
      "They are advanced, customizable analysis tools for creating funnels, path analyses, cohort analyses, and custom data tables beyond standard reports",
      "They are templates for building landing pages",
      "They are automated email reports sent to stakeholders",
    ],
    correctIndex: 1,
    explanation:
      "Explorations are GA4's advanced analysis hub. They include Free-form exploration (custom tables), Funnel exploration (conversion funnels), Path exploration (user journeys), Segment overlap, User explorer, Cohort analysis, and User lifetime. They let you dig deeper than standard reports.",
  },
  {
    type: "multiple-choice",
    question:
      "To mark an event as a conversion in GA4, what do you need to do?",
    options: [
      "Create a goal in the Goals section",
      "Toggle the event as a conversion under Admin > Events or Admin > Conversions",
      "Add conversion code to your website separately",
      "Import the event from Google Ads",
    ],
    correctIndex: 1,
    explanation:
      "In GA4, you mark any event as a conversion by toggling it on in Admin > Events (toggle the 'Mark as conversion' switch) or by adding it in Admin > Conversions. There are no separate 'goals' — conversions are simply flagged events.",
  },
  {
    type: "ordering",
    question:
      "Put these GA4 setup steps in the correct order:",
    items: [
      "Create a GA4 property in your Google Analytics account",
      "Set up a web data stream and get your Measurement ID",
      "Install the tracking code via gtag.js or Google Tag Manager",
      "Verify data is flowing in the Realtime report",
      "Mark key events as conversions and link to Google Ads",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "Start by creating the GA4 property, then set up your data stream to get the Measurement ID. Install the tracking code, verify it's working in Realtime, and finally configure your conversions and integrations.",
  },
];
