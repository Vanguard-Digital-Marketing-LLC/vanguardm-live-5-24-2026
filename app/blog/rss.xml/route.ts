import { SITE_URL } from "@/lib/site-config";
import { prisma } from "@/lib/db";

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 50,
    include: {
      tags: { include: { tag: true } },
      categories: { include: { category: true } },
      author: { select: { name: true } },
    },
  });

  const siteUrl = SITE_URL;
  const now = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : new Date(post.createdAt).toUTCString();
      const categories = [
        ...post.categories.map((c) => c.category.name),
        ...post.tags.map((t) => t.tag.name),
      ];
      const categoryXml = categories
        .map((c) => `      <category><![CDATA[${c}]]></category>`)
        .join("\n");

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || post.content.slice(0, 300)}]]></description>
      <pubDate>${pubDate}</pubDate>
      <dc:creator><![CDATA[${post.author.name || "Vanguard Team"}]]></dc:creator>
${categoryXml}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
>
  <channel>
    <title>Vanguard Digital Marketing Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Digital marketing insights, SEO strategies, web design tips, and agency growth tactics from the Vanguard team.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
