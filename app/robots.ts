import { SITE_URL } from "@/lib/site-config";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/admin/",
        "/portal/",
        "/auth/",
        "/category/",
        "/author/",
        "/wp-content/",
        "/wp-admin/",
        "/wp-includes/",
        "/sample-page/",
        "/vdm-blogs/",
        "/seo-strategy-tactics/",
        "/page/",
        "/en/",
        "/reports/",
        "/_next/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
