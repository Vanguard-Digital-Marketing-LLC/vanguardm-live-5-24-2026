import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import { Search, FileText, Share2, TrendingUp, Radar, Database } from "lucide-react";
import MetricCard from "@/components/admin/shared/MetricCard";
import Link from "next/link";

export const metadata = { title: "SEO & Marketing" };

export default async function SeoOverviewPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const [
    totalKeywords,
    serpSnapshots,
    serpResults,
    contentProjects,
    totalEntries,
    socialPosts,
    scheduledPosts,
  ] = await Promise.all([
    prisma.keyword.count({ where: { agencyId } }),
    prisma.serpSnapshot.count({ where: { agencyId } }),
    prisma.serpResult.count({ where: { snapshot: { agencyId } } }),
    prisma.contentProject.count({ where: { agencyId } }),
    prisma.contentEntry.count({ where: { project: { agencyId } } }),
    prisma.socialPost.count({ where: { agencyId } }),
    prisma.socialPost.count({ where: { agencyId, status: "SCHEDULED" } }),
  ]);

  const tools = [
    {
      title: "Keywords Explorer",
      description: "Domain reverse-lookup, keyword seed database, SERP tracking with live fetch, and CTR-based traffic estimation.",
      href: "/admin/seo/keywords",
      icon: Search,
      stats: `${totalKeywords} keywords · ${serpSnapshots} snapshots · ${serpResults} SERP results`,
      accent: "emerald" as const,
    },
    {
      title: "Content Explorer",
      description: "Discover high-performing content, track backlinks, and find link-building opportunities.",
      href: "/admin/seo/content",
      icon: FileText,
      stats: `${contentProjects} projects · ${totalEntries} entries`,
      accent: "cyan" as const,
    },
    {
      title: "Social Media Manager",
      description: "Plan, schedule, and track social media posts across X, LinkedIn, Facebook, and Instagram.",
      href: "/admin/seo/social",
      icon: Share2,
      stats: `${socialPosts} posts · ${scheduledPosts} scheduled`,
      accent: "purple" as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">SEO & Marketing</h1>
        <p className="text-sm text-slate-400 mt-1">Keyword research, SERP tracking, content analysis, and social media</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <MetricCard label="Seed Keywords" value={totalKeywords} icon={Database} accent="emerald" />
        <MetricCard label="SERP Snapshots" value={serpSnapshots} icon={Radar} accent="emerald" />
        <MetricCard label="SERP Results" value={serpResults} icon={TrendingUp} accent="emerald" />
        <MetricCard label="Content Entries" value={totalEntries} icon={FileText} accent="cyan" />
        <MetricCard label="Social Posts" value={socialPosts} trend={`${scheduledPosts} scheduled`} icon={Share2} accent="purple" />
        <MetricCard label="Content Projects" value={contentProjects} icon={Search} accent="cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group bg-[#111827] border border-white/6 rounded-xl p-6 hover:border-white/12 transition-all"
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              tool.accent === "emerald" ? "bg-emerald/10 text-emerald" :
              tool.accent === "cyan" ? "bg-cyan-400/10 text-cyan-400" :
              "bg-purple-400/10 text-purple-400"
            }`}>
              <tool.icon size={24} />
            </div>
            <h2 className="font-display text-lg font-semibold text-white group-hover:text-emerald transition-colors">
              {tool.title}
            </h2>
            <p className="text-sm text-slate-400 mt-2">{tool.description}</p>
            <p className="text-xs text-slate-500 mt-3">{tool.stats}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
