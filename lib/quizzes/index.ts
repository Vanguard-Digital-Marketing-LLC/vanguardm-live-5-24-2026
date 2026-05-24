import type { QuizQuestion } from "@/lib/academy-data";

// SEO & Search (original 10)
import { seoFundamentalsQuiz } from "./seo-fundamentals";
import { frontendSeoQuiz } from "./frontend-seo";
import { headingHierarchyQuiz } from "./heading-hierarchy";
import { technicalSeoQuiz } from "./technical-seo";
import { cdnsAndCloudflareQuiz } from "./cdns-and-cloudflare";
import { aeoQuiz } from "./aeo";
import { seoCopywritingQuiz } from "./seo-copywriting";
import { blogPostsForSeoQuiz } from "./blog-posts-for-seo";
import { onPageSeoChecklistQuiz } from "./on-page-seo-checklist";
import { localSeoQuiz } from "./local-seo";

// PPC & Paid Advertising
import { googleAdsFundamentalsQuiz } from "./google-ads-fundamentals";
import { facebookInstagramAdsQuiz } from "./facebook-instagram-ads";
import { linkedinAdvertisingQuiz } from "./linkedin-advertising";
import { retargetingRemarketingQuiz } from "./retargeting-remarketing";
import { adCopywritingTestingQuiz } from "./ad-copywriting-testing";

// Social Media Marketing
import { socialMediaStrategyQuiz } from "./social-media-strategy";
import { instagramMarketingQuiz } from "./instagram-marketing";
import { linkedinContentStrategyQuiz } from "./linkedin-content-strategy";
import { tiktokMarketingQuiz } from "./tiktok-marketing";
import { communityManagementQuiz } from "./community-management";

// Content Marketing & Email
import { contentMarketingStrategyQuiz } from "./content-marketing-strategy";
import { videoMarketingYoutubeSeoQuiz } from "./video-marketing-youtube-seo";
import { emailMarketingMasteryQuiz } from "./email-marketing-mastery";
import { podcastMarketingQuiz } from "./podcast-marketing";
import { contentRepurposingQuiz } from "./content-repurposing";

// Branding & Creative
import { brandIdentityDevelopmentQuiz } from "./brand-identity-development";
import { brandVoiceMessagingQuiz } from "./brand-voice-messaging";
import { visualBrandingDigitalQuiz } from "./visual-branding-digital";
import { brandPositioningQuiz } from "./brand-positioning";

// Analytics & Data
import { googleAnalytics4Quiz } from "./google-analytics-4";
import { marketingAttributionQuiz } from "./marketing-attribution";
import { conversionRateOptimizationQuiz } from "./conversion-rate-optimization";
import { dataDrivenMarketingQuiz } from "./data-driven-marketing";

// Strategy & Growth
import { digitalMarketingStrategyQuiz } from "./digital-marketing-strategy";
import { marketingFunnelOptimizationQuiz } from "./marketing-funnel-optimization";
import { growthHackingQuiz } from "./growth-hacking";
import { competitorAnalysisQuiz } from "./competitor-analysis";

// E-Commerce & Industry
import { ecommerceMarketingQuiz } from "./ecommerce-marketing";
import { b2bLeadGenerationQuiz } from "./b2b-lead-generation";
import { reputationManagementQuiz } from "./reputation-management";

// Free Beginner Courses
import { howToSetUpGoogleAdsQuiz } from "./how-to-set-up-google-ads";
import { howToSetUpGoogleAnalyticsQuiz } from "./how-to-set-up-google-analytics";
import { howToSetUpGoogleTagManagerQuiz } from "./how-to-set-up-google-tag-manager";
import { howToSetUpFacebookAdsQuiz } from "./how-to-set-up-facebook-ads";
import { howToSetUpSearchConsoleQuiz } from "./how-to-set-up-search-console";
import { ppcVsSeoQuiz } from "./ppc-vs-seo";
import { howMuchDoGoogleAdsCostQuiz } from "./how-much-do-google-ads-cost";

const quizzes: Record<string, QuizQuestion[]> = {
  // SEO & Search
  "seo-fundamentals": seoFundamentalsQuiz,
  "frontend-seo": frontendSeoQuiz,
  "heading-hierarchy": headingHierarchyQuiz,
  "technical-seo": technicalSeoQuiz,
  "cdns-and-cloudflare": cdnsAndCloudflareQuiz,
  "aeo": aeoQuiz,
  "seo-copywriting": seoCopywritingQuiz,
  "blog-posts-for-seo": blogPostsForSeoQuiz,
  "on-page-seo-checklist": onPageSeoChecklistQuiz,
  "local-seo": localSeoQuiz,
  // PPC & Paid Advertising
  "google-ads-fundamentals": googleAdsFundamentalsQuiz,
  "facebook-instagram-ads": facebookInstagramAdsQuiz,
  "linkedin-advertising": linkedinAdvertisingQuiz,
  "retargeting-remarketing": retargetingRemarketingQuiz,
  "ad-copywriting-testing": adCopywritingTestingQuiz,
  // Social Media Marketing
  "social-media-strategy": socialMediaStrategyQuiz,
  "instagram-marketing": instagramMarketingQuiz,
  "linkedin-content-strategy": linkedinContentStrategyQuiz,
  "tiktok-marketing": tiktokMarketingQuiz,
  "community-management": communityManagementQuiz,
  // Content Marketing & Email
  "content-marketing-strategy": contentMarketingStrategyQuiz,
  "video-marketing-youtube-seo": videoMarketingYoutubeSeoQuiz,
  "email-marketing-mastery": emailMarketingMasteryQuiz,
  "podcast-marketing": podcastMarketingQuiz,
  "content-repurposing": contentRepurposingQuiz,
  // Branding & Creative
  "brand-identity-development": brandIdentityDevelopmentQuiz,
  "brand-voice-messaging": brandVoiceMessagingQuiz,
  "visual-branding-digital": visualBrandingDigitalQuiz,
  "brand-positioning": brandPositioningQuiz,
  // Analytics & Data
  "google-analytics-4": googleAnalytics4Quiz,
  "marketing-attribution": marketingAttributionQuiz,
  "conversion-rate-optimization": conversionRateOptimizationQuiz,
  "data-driven-marketing": dataDrivenMarketingQuiz,
  // Strategy & Growth
  "digital-marketing-strategy": digitalMarketingStrategyQuiz,
  "marketing-funnel-optimization": marketingFunnelOptimizationQuiz,
  "growth-hacking": growthHackingQuiz,
  "competitor-analysis": competitorAnalysisQuiz,
  // E-Commerce & Industry
  "ecommerce-marketing": ecommerceMarketingQuiz,
  "b2b-lead-generation": b2bLeadGenerationQuiz,
  "reputation-management": reputationManagementQuiz,
  // Free Beginner Courses
  "how-to-set-up-google-ads": howToSetUpGoogleAdsQuiz,
  "how-to-set-up-google-analytics": howToSetUpGoogleAnalyticsQuiz,
  "how-to-set-up-google-tag-manager": howToSetUpGoogleTagManagerQuiz,
  "how-to-set-up-facebook-ads": howToSetUpFacebookAdsQuiz,
  "how-to-set-up-search-console": howToSetUpSearchConsoleQuiz,
  "ppc-vs-seo": ppcVsSeoQuiz,
  "how-much-do-google-ads-cost": howMuchDoGoogleAdsCostQuiz,
};

export function getQuizQuestions(slug: string): QuizQuestion[] {
  return quizzes[slug] ?? [];
}

export default quizzes;
