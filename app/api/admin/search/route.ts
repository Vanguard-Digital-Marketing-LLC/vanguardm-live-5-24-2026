import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const agencyId = await resolveAgencyId();
  if (!agencyId) return NextResponse.json({ results: [] });

  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "").trim();
  if (q.length < 2) return NextResponse.json({ results: [] });

  const limit = 6;
  const contains = { contains: q, mode: "insensitive" as const };

  const [clients, leads, tickets, users, keywords] = await Promise.all([
    prisma.client.findMany({
      where: { agencyId, OR: [{ name: contains }, { domain: contains }] },
      select: { id: true, name: true, domain: true, status: true },
      take: limit,
    }),
    prisma.lead.findMany({
      where: { agencyId, OR: [{ name: contains }, { email: contains }, { company: contains }] },
      select: { id: true, name: true, email: true, company: true, status: true },
      take: limit,
    }),
    prisma.supportTicket.findMany({
      where: { agencyId, OR: [{ title: contains }] },
      select: { id: true, title: true, status: true, priority: true, client: { select: { name: true } } },
      take: limit,
    }),
    role === "ADMIN"
      ? prisma.user.findMany({
          where: { agencyId, OR: [{ name: contains }, { email: contains }] },
          select: { id: true, name: true, email: true, role: true },
          take: limit,
        })
      : Promise.resolve([] as Array<{ id: string; name: string | null; email: string; role: string }>),
    prisma.keyword.findMany({
      where: { agencyId, term: contains },
      select: { id: true, term: true, volume: true, intent: true },
      take: limit,
    }),
  ]);

  const results = [
    ...clients.map((c) => ({
      group: "Clients",
      id: c.id,
      title: c.name,
      subtitle: c.domain || c.status,
      href: `/admin/clients/${c.id}`,
    })),
    ...leads.map((l) => ({
      group: "Leads",
      id: l.id,
      title: l.name,
      subtitle: [l.company, l.email].filter(Boolean).join(" · ") || l.status,
      href: `/admin/leads/${l.id}`,
    })),
    ...tickets.map((t) => ({
      group: "Tickets",
      id: t.id,
      title: t.title,
      subtitle: [t.client?.name, t.priority, t.status].filter(Boolean).join(" · "),
      href: `/admin/tickets/${t.id}`,
    })),
    ...users.map((u) => ({
      group: "Users",
      id: u.id,
      title: u.name || u.email,
      subtitle: `${u.role} · ${u.email}`,
      href: `/admin/users/${u.id}`,
    })),
    ...keywords.map((k) => ({
      group: "Keywords",
      id: k.id,
      title: k.term,
      subtitle: [k.intent, k.volume ? `${k.volume.toLocaleString()}/mo` : null].filter(Boolean).join(" · "),
      href: `/admin/seo/keywords?q=${encodeURIComponent(k.term)}`,
    })),
  ];

  return NextResponse.json({ results });
}
