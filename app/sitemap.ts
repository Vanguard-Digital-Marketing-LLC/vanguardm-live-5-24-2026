import { SITE_URL } from "@/lib/site-config";
import type { MetadataRoute } from "next";
import { COURSES } from "@/lib/academy-data";
import { prisma } from "@/lib/db";

const BASE_URL = SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/academy`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = [
    "seo",
    "ppc",
    "web-design",
    "branding",
    "content-marketing",
    "social-media",
  ].map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const academyPages: MetadataRoute.Sitemap = COURSES.flatMap((course) => [
    {
      url: `${BASE_URL}/academy/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/academy/${course.slug}/quiz`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ]);

  const locationPages: MetadataRoute.Sitemap = [
    "austin",
    "dallas",
    "houston",
  ].map((slug) => ({
    url: `${BASE_URL}/locations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog posts (dynamic)
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    });
    blogPages = [
      {
        url: `${BASE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      ...posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    // Blog table may not exist yet before migration
    blogPages = [
      {
        url: `${BASE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
    ];
  }

  return [...staticPages, ...servicePages, ...locationPages, ...academyPages, ...blogPages];
}
