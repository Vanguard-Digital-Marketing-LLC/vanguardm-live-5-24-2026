import type { QuizQuestion } from "@/lib/academy-data";

export const howToSetUpGoogleTagManagerQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question:
      "What are the three core building blocks in Google Tag Manager?",
    options: [
      "Tags, Triggers, and Variables",
      "Scripts, Events, and Conditions",
      "Pixels, Listeners, and Goals",
      "Containers, Workspaces, and Environments",
    ],
    correctIndex: 0,
    explanation:
      "GTM operates on three core concepts: Tags (the code snippets that fire, e.g., GA4, Google Ads), Triggers (conditions that determine when a tag fires, e.g., page view, click), and Variables (dynamic values used by tags and triggers, e.g., Page URL, Click Text).",
  },
  {
    type: "multiple-choice",
    question:
      "Where should the two parts of the GTM container snippet be placed?",
    options: [
      "Both parts in the <footer>",
      "The <script> in the <head>, and the <noscript> immediately after the opening <body> tag",
      "Only in the <head> — the noscript is optional",
      "In an external .js file",
    ],
    correctIndex: 1,
    explanation:
      "GTM has two parts: a JavaScript snippet that goes as high as possible in the <head>, and a <noscript> iframe that goes immediately after the opening <body> tag. Both are required — the noscript ensures basic tracking for users with JavaScript disabled.",
  },
  {
    type: "true-false",
    question:
      "Changes in GTM only go live on your website after you click Submit to publish a new container version.",
    correctAnswer: true,
    explanation:
      "GTM uses a workspace and versioning system. Changes saved in your workspace do NOT affect your live site until you explicitly Submit (publish) a new container version. This allows drafting, testing, and reviewing before anything goes live.",
  },
  {
    type: "multiple-choice",
    question:
      "When setting up a GA4 tag in GTM, what is the minimum required field?",
    options: [
      "GA4 API Secret",
      "Measurement ID (G-XXXXXXXXXX)",
      "Google Analytics Account ID",
      "Data Stream Name",
    ],
    correctIndex: 1,
    explanation:
      "The GA4 tag in GTM requires the Measurement ID — the unique identifier for your GA4 data stream formatted as G-XXXXXXXXXX. This tells GTM which GA4 property to send data to.",
  },
  {
    type: "true-false",
    question:
      "A single GTM trigger can be shared by multiple tags. For example, one 'All Pages' trigger can fire both a GA4 tag and a Facebook Pixel tag.",
    correctAnswer: true,
    explanation:
      "Triggers are reusable in GTM. You can assign the same trigger to multiple tags, which is efficient and ensures consistency. A single 'All Pages' trigger can fire GA4, Facebook Pixel, Google Ads remarketing, and any other page-load tags simultaneously.",
  },
  {
    type: "multi-select",
    question:
      "Which steps are required to track a Google Ads conversion in GTM? (Select all that apply)",
    options: [
      "Create a Google Ads Conversion Tracking tag in GTM",
      "Enter the Conversion ID and Conversion Label from Google Ads",
      "Set up a trigger for the conversion confirmation page",
      "Also add the gtag global site tag separately outside of GTM",
      "Test in GTM Preview mode before publishing",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "To track Google Ads conversions via GTM: create the tag, enter the Conversion ID and Label, set a trigger for the thank-you page, and test in Preview mode. You do NOT need a separate global site tag — GTM handles the full implementation.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are built-in GTM variables? (Select all that apply)",
    options: [
      "Page URL",
      "Click Text",
      "Form ID",
      "Data Layer Variable",
      "Custom JavaScript",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Page URL, Click Text, and Form ID are built-in variables that can be enabled in Variables > Configure. Data Layer Variable and Custom JavaScript are user-defined variable types — they need to be created and configured manually.",
  },
  {
    type: "multiple-choice",
    question:
      "What is GTM Preview mode used for?",
    options: [
      "Showing how your site will look after a redesign",
      "Connecting your browser to your GTM workspace to see which tags fire, which triggers activated, and variable values — before publishing",
      "A read-only view of published containers",
      "Generating a PDF report of active tags",
    ],
    correctIndex: 1,
    explanation:
      "Preview mode opens your site in a connected debug session showing real-time data: which tags fired or didn't fire, which trigger caused each tag to fire, and the current values of all variables. Essential for QA before publishing.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the GTM Data Layer and why is it important?",
    options: [
      "GTM's version history that stores previous container versions",
      "A JavaScript array (window.dataLayer) that passes dynamic values like transaction IDs, user types, and product details from your website to GTM",
      "A Google Sheets integration for offline analytics data",
      "The visual interface where you drag and drop tags",
    ],
    correctIndex: 1,
    explanation:
      "The Data Layer (window.dataLayer = []) is a JavaScript array on your web page that stores key-value pairs. GTM reads these via Data Layer Variables. It's essential for e-commerce tracking, form data capture, and any dynamic information not available in the DOM.",
  },
  {
    type: "ordering",
    question:
      "Put these steps in the correct order for tracking a custom button click in GTM:",
    items: [
      "Enable built-in Click variables (Click Text, Click ID, Click Classes)",
      "Create a Click trigger with conditions matching your button",
      "Create a GA4 Event tag using that trigger",
      "Test in Preview mode to verify the tag fires on the button click",
      "Publish the container version to make it live",
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      "First enable click variables so GTM can read click attributes, then create a trigger that identifies your button, create the event tag, test in Preview mode, and finally publish.",
  },
];
