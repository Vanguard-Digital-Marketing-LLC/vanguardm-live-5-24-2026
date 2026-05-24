import type { QuizQuestion } from "@/lib/academy-data";

export const localSeoQuiz: QuizQuestion[] = [
  {
    type: "multiple-choice",
    question: "Approximately what percentage of all Google searches have local intent?",
    options: [
      "About 10%",
      "About 25%",
      "About 46%",
      "About 80%",
    ],
    correctIndex: 2,
    explanation:
      "Approximately 46% of all Google searches have local intent, meaning nearly half of searchers are looking for local businesses, services, or information. This makes local SEO critical for any business serving a geographic area.",
  },
  {
    type: "multiple-choice",
    question: "What is the Google Map Pack (Local Pack)?",
    options: [
      "A paid Google Ads feature for local businesses",
      "The top 3 local business results displayed with a map at the top of search results",
      "A Google Maps mobile app for creating driving directions",
      "A tool for embedding custom maps on your website",
    ],
    correctIndex: 1,
    explanation:
      "The Map Pack (Local Pack) shows the top 3 local business listings with a map at the top of search results for queries with local intent. Appearing here is driven primarily by your Google Business Profile optimization, relevance, and proximity.",
  },
  {
    type: "true-false",
    question:
      "NAP stands for Name, Address, and Phone number, and having inconsistent NAP information across directories can hurt your local search rankings.",
    correctAnswer: true,
    explanation:
      "NAP consistency is a critical local ranking factor. When Google finds conflicting name, address, or phone number information across different directories and listings, it loses confidence in the accuracy of your business data and may rank you lower.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are key elements to optimize on your Google Business Profile? (Select all that apply)",
    options: [
      "Complete and accurate business name, address, and phone number",
      "Relevant business categories (primary and secondary)",
      "High-quality photos of your business, team, and work",
      "A fake address in a larger city to appear in more searches",
      "Regular posts and updates to signal activity",
    ],
    correctIndices: [0, 1, 2, 4],
    explanation:
      "A well-optimized Google Business Profile includes accurate NAP information, relevant categories, quality photos, and regular posts. Using a fake address violates Google's guidelines and can result in your listing being suspended.",
  },
  {
    type: "multiple-choice",
    question: "What is a local citation?",
    options: [
      "A backlink from a local newspaper's website",
      "Any online mention of your business's name, address, and phone number on directories, websites, or platforms",
      "A customer review posted on your Google Business Profile",
      "A mention of your business on social media without contact details",
    ],
    correctIndex: 1,
    explanation:
      "A local citation is any online mention of your business's NAP information, whether on directories like Yelp, industry sites, or data aggregators. Citations serve as trust signals that confirm your business is legitimate and located where you say it is.",
  },
  {
    type: "ordering",
    question:
      "Arrange these steps in the correct order for responding to a negative customer review.",
    items: [
      "Offer to resolve the issue offline with a direct contact method",
      "Thank the reviewer for their feedback",
      "Follow up to ensure the issue was resolved satisfactorily",
      "Acknowledge the specific issue they experienced",
      "Apologize for their negative experience",
    ],
    correctOrder: [1, 4, 3, 0, 2],
    explanation:
      "The proper response flow is: thank the reviewer for their feedback, apologize for the negative experience, acknowledge the specific issue, offer to resolve it offline (with a phone number or email), and follow up after resolution. This shows professionalism to both the reviewer and potential customers reading the exchange.",
  },
  {
    type: "true-false",
    question:
      "Using 'near me' repeatedly throughout your website content is the most effective local keyword strategy.",
    correctAnswer: false,
    explanation:
      "Stuffing 'near me' into your content is not effective because Google determines 'near me' results based on the searcher's location, not the phrase on your page. Instead, use specific geographic keywords like city names, neighborhoods, and service areas (e.g., 'web design Dallas' or 'plumber in Frisco, TX').",
  },
  {
    type: "multiple-choice",
    question:
      "Which schema markup type should a local business implement on their website?",
    options: [
      "Article schema",
      "Product schema",
      "LocalBusiness schema (or a more specific subtype like ProfessionalService)",
      "WebPage schema only",
    ],
    correctIndex: 2,
    explanation:
      "Local businesses should implement LocalBusiness schema or a more specific subtype (e.g., ProfessionalService, Restaurant, MedicalBusiness). This helps search engines understand your business type, location, hours, and services, which can enhance your appearance in local search results.",
  },
  {
    type: "multi-select",
    question:
      "Which of the following are effective strategies for earning more Google reviews? (Select all that apply)",
    options: [
      "Ask satisfied customers directly after completing a service",
      "Offer discounts or gifts in exchange for positive reviews",
      "Send a follow-up email with a direct link to your Google review page",
      "Make the review process easy with a short URL or QR code",
      "Create fake reviews using employee accounts",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "Asking customers directly, sending follow-up emails with review links, and making the process easy with short URLs or QR codes are all legitimate strategies. Offering incentives for reviews and creating fake reviews both violate Google's policies and can result in penalties or listing removal.",
  },
  {
    type: "ordering",
    question:
      "Arrange these local SEO activities in order from most impactful to least impactful for ranking in the Map Pack.",
    items: [
      "Building local citations on niche industry directories",
      "Claiming and fully optimizing your Google Business Profile",
      "Earning positive customer reviews consistently",
      "Adding LocalBusiness schema markup to your website",
    ],
    correctOrder: [1, 2, 0, 3],
    explanation:
      "Google Business Profile optimization is the single most impactful factor for Map Pack rankings. Customer reviews are the second strongest signal, providing social proof and relevance. Local citations on authoritative directories reinforce your NAP data. Schema markup supports your local presence but has a smaller direct impact on Map Pack rankings compared to the other factors.",
  },
];
