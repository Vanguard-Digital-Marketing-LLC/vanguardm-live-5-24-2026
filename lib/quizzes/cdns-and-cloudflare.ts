import type { QuizQuestion } from "@/lib/academy-data";

export const cdnsAndCloudflareQuiz: QuizQuestion[] = [
  // --- Multiple Choice (4) ---
  {
    type: "multiple-choice",
    question: "What does CDN stand for?",
    options: [
      "Central Data Network",
      "Content Delivery Network",
      "Cloud Distribution Node",
      "Cached Domain Network",
    ],
    correctIndex: 1,
    explanation:
      "CDN stands for Content Delivery Network — a globally distributed network of servers that delivers your website's content from the server closest to each visitor's physical location.",
  },
  {
    type: "multiple-choice",
    question:
      "What does the orange cloud icon mean in Cloudflare's DNS settings?",
    options: [
      "The DNS record is disabled",
      "Traffic is proxied through Cloudflare (CDN and security enabled)",
      "The DNS record has a configuration error",
      "DNS propagation is still pending",
    ],
    correctIndex: 1,
    explanation:
      "The orange cloud (Proxied) means traffic flows through Cloudflare, enabling CDN caching, DDoS protection, and SSL. A grey cloud means DNS Only — traffic goes directly to your origin server with no Cloudflare protection.",
  },
  {
    type: "multiple-choice",
    question:
      "What is the most common cause of 'ERR_TOO_MANY_REDIRECTS' with Cloudflare?",
    options: [
      "Having too many DNS records configured",
      "SSL mode set to Flexible while the origin server forces HTTPS",
      "Using too many Cloudflare page rules",
      "Having Rocket Loader enabled on the dashboard",
    ],
    correctIndex: 1,
    explanation:
      "When SSL is set to Flexible, Cloudflare connects to your origin over HTTP. If your origin redirects HTTP to HTTPS, this creates an infinite redirect loop. The fix is to use Full or Full (Strict) SSL mode.",
  },
  {
    type: "multiple-choice",
    question: "What does TTFB stand for?",
    options: [
      "Time to First Build",
      "Time to First Byte",
      "Total Transfer File Bandwidth",
      "Time to Full Browser",
    ],
    correctIndex: 1,
    explanation:
      "TTFB (Time to First Byte) measures how long until the browser receives the first byte of data from the server. CDNs reduce TTFB by serving cached content from edge servers geographically close to the user.",
  },
  // --- True/False (4) ---
  {
    type: "true-false",
    question:
      "Cloudflare's Full (Strict) SSL/TLS mode is the recommended setting because it encrypts traffic end-to-end and validates the origin server's SSL certificate.",
    correctAnswer: true,
    explanation:
      "Full (Strict) encrypts traffic between the visitor and Cloudflare, and between Cloudflare and the origin server, while also validating that the origin has a trusted SSL certificate. This is the most secure configuration.",
  },
  {
    type: "true-false",
    question:
      "A CDN improves website performance only for visitors who are geographically far from the origin server.",
    correctAnswer: false,
    explanation:
      "CDNs benefit all visitors, not just distant ones. Even nearby users benefit from optimizations like caching, Brotli compression, HTTP/2 multiplexing, and reduced server load on the origin.",
  },
  {
    type: "true-false",
    question:
      "Brotli compression, enabled by default on Cloudflare, typically achieves 15-25% better compression ratios than gzip.",
    correctAnswer: true,
    explanation:
      "Brotli is a modern compression algorithm developed by Google that compresses text-based files (HTML, CSS, JS) 15-25% better than gzip, resulting in faster page loads and lower bandwidth usage.",
  },
  {
    type: "true-false",
    question:
      "DNS propagation after switching nameservers to Cloudflare always completes within 5 minutes.",
    correctAnswer: false,
    explanation:
      "DNS propagation typically takes a few hours but can take up to 24-48 hours to fully complete worldwide. During this period, some visitors may still be directed to the old servers depending on their ISP's DNS cache.",
  },
  // --- Multi-Select (1) ---
  {
    type: "multi-select",
    question:
      "Which of the following are direct performance benefits of using a CDN? (Select all that apply)",
    options: [
      "Reduced latency through geographically closer edge servers",
      "Automatic generation of backlinks to your site",
      "Decreased Time to First Byte (TTFB)",
      "Lower bandwidth costs through caching and compression",
      "Improved keyword density on your pages",
    ],
    correctIndices: [0, 2, 3],
    explanation:
      "CDNs reduce latency via edge servers, decrease TTFB by serving cached content closer to users, and lower bandwidth costs through caching and compression (like Brotli). They do not generate backlinks or affect keyword density.",
  },
  // --- Ordering (1) ---
  {
    type: "ordering",
    question:
      "Put the steps for setting up Cloudflare on a new website in the correct order.",
    items: [
      "Verify your site loads correctly through Cloudflare",
      "Create a free Cloudflare account and add your domain",
      "Update your domain's nameservers at your registrar to Cloudflare's nameservers",
      "Review DNS records imported by Cloudflare and configure SSL/TLS mode",
      "Wait for DNS propagation to complete",
    ],
    correctOrder: [1, 3, 2, 4, 0],
    explanation:
      "The correct setup flow is: (1) Create a Cloudflare account and add your domain, (2) Review the imported DNS records and configure SSL/TLS, (3) Update nameservers at your registrar, (4) Wait for DNS propagation, and (5) Verify your site loads correctly through Cloudflare.",
  },
];
