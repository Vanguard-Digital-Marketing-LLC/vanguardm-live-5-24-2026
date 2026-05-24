import type { ComponentType } from "react";

// SEO & Search (original 10)
import SeoFundamentals from "./seo-fundamentals";
import FrontendSeo from "./frontend-seo";
import HeadingHierarchy from "./heading-hierarchy";
import TechnicalSeo from "./technical-seo";
import CdnsAndCloudflare from "./cdns-and-cloudflare";
import Aeo from "./aeo";
import SeoCopywritingLesson from "./seo-copywriting";
import BlogPostsForSeoLesson from "./blog-posts-for-seo";
import OnPageSeoChecklistLesson from "./on-page-seo-checklist";
import LocalSeoLesson from "./local-seo";

// PPC & Paid Advertising
import GoogleAdsFundamentals from "./google-ads-fundamentals";
import FacebookInstagramAds from "./facebook-instagram-ads";
import LinkedinAdvertising from "./linkedin-advertising";
import RetargetingRemarketing from "./retargeting-remarketing";
import AdCopywritingTesting from "./ad-copywriting-testing";

// Social Media Marketing
import SocialMediaStrategy from "./social-media-strategy";
import InstagramMarketing from "./instagram-marketing";
import LinkedinContentStrategy from "./linkedin-content-strategy";
import TiktokMarketing from "./tiktok-marketing";
import CommunityManagement from "./community-management";

// Content Marketing & Email
import ContentMarketingStrategy from "./content-marketing-strategy";
import VideoMarketingYoutubeSeo from "./video-marketing-youtube-seo";
import EmailMarketingMastery from "./email-marketing-mastery";
import PodcastMarketing from "./podcast-marketing";
import ContentRepurposing from "./content-repurposing";

// Branding & Creative
import BrandIdentityDevelopment from "./brand-identity-development";
import BrandVoiceMessaging from "./brand-voice-messaging";
import VisualBrandingDigital from "./visual-branding-digital";
import BrandPositioning from "./brand-positioning";

// Analytics & Data
import GoogleAnalytics4 from "./google-analytics-4";
import MarketingAttribution from "./marketing-attribution";
import ConversionRateOptimization from "./conversion-rate-optimization";
import DataDrivenMarketing from "./data-driven-marketing";

// Strategy & Growth
import DigitalMarketingStrategy from "./digital-marketing-strategy";
import MarketingFunnelOptimization from "./marketing-funnel-optimization";
import GrowthHacking from "./growth-hacking";
import CompetitorAnalysis from "./competitor-analysis";

// E-Commerce & Industry
import EcommerceMarketing from "./ecommerce-marketing";
import B2bLeadGeneration from "./b2b-lead-generation";
import ReputationManagement from "./reputation-management";

// Free Beginner Courses
import HowToSetUpGoogleAds from "./how-to-set-up-google-ads";
import HowToSetUpGoogleAnalytics from "./how-to-set-up-google-analytics";
import HowToSetUpGoogleTagManager from "./how-to-set-up-google-tag-manager";
import HowToSetUpFacebookAds from "./how-to-set-up-facebook-ads";
import HowToSetUpSearchConsole from "./how-to-set-up-search-console";
import PpcVsSeo from "./ppc-vs-seo";
import HowMuchDoGoogleAdsCost from "./how-much-do-google-ads-cost";

const lessons: Record<string, ComponentType> = {
  // SEO & Search
  "seo-fundamentals": SeoFundamentals,
  "frontend-seo": FrontendSeo,
  "heading-hierarchy": HeadingHierarchy,
  "technical-seo": TechnicalSeo,
  "cdns-and-cloudflare": CdnsAndCloudflare,
  "aeo": Aeo,
  "seo-copywriting": SeoCopywritingLesson,
  "blog-posts-for-seo": BlogPostsForSeoLesson,
  "on-page-seo-checklist": OnPageSeoChecklistLesson,
  "local-seo": LocalSeoLesson,
  // PPC & Paid Advertising
  "google-ads-fundamentals": GoogleAdsFundamentals,
  "facebook-instagram-ads": FacebookInstagramAds,
  "linkedin-advertising": LinkedinAdvertising,
  "retargeting-remarketing": RetargetingRemarketing,
  "ad-copywriting-testing": AdCopywritingTesting,
  // Social Media Marketing
  "social-media-strategy": SocialMediaStrategy,
  "instagram-marketing": InstagramMarketing,
  "linkedin-content-strategy": LinkedinContentStrategy,
  "tiktok-marketing": TiktokMarketing,
  "community-management": CommunityManagement,
  // Content Marketing & Email
  "content-marketing-strategy": ContentMarketingStrategy,
  "video-marketing-youtube-seo": VideoMarketingYoutubeSeo,
  "email-marketing-mastery": EmailMarketingMastery,
  "podcast-marketing": PodcastMarketing,
  "content-repurposing": ContentRepurposing,
  // Branding & Creative
  "brand-identity-development": BrandIdentityDevelopment,
  "brand-voice-messaging": BrandVoiceMessaging,
  "visual-branding-digital": VisualBrandingDigital,
  "brand-positioning": BrandPositioning,
  // Analytics & Data
  "google-analytics-4": GoogleAnalytics4,
  "marketing-attribution": MarketingAttribution,
  "conversion-rate-optimization": ConversionRateOptimization,
  "data-driven-marketing": DataDrivenMarketing,
  // Strategy & Growth
  "digital-marketing-strategy": DigitalMarketingStrategy,
  "marketing-funnel-optimization": MarketingFunnelOptimization,
  "growth-hacking": GrowthHacking,
  "competitor-analysis": CompetitorAnalysis,
  // E-Commerce & Industry
  "ecommerce-marketing": EcommerceMarketing,
  "b2b-lead-generation": B2bLeadGeneration,
  "reputation-management": ReputationManagement,
  // Free Beginner Courses
  "how-to-set-up-google-ads": HowToSetUpGoogleAds,
  "how-to-set-up-google-analytics": HowToSetUpGoogleAnalytics,
  "how-to-set-up-google-tag-manager": HowToSetUpGoogleTagManager,
  "how-to-set-up-facebook-ads": HowToSetUpFacebookAds,
  "how-to-set-up-search-console": HowToSetUpSearchConsole,
  "ppc-vs-seo": PpcVsSeo,
  "how-much-do-google-ads-cost": HowMuchDoGoogleAdsCost,
};

export function getLessonContent(slug: string): ComponentType | undefined {
  return lessons[slug];
}

export default lessons;
