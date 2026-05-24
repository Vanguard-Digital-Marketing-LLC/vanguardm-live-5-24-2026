import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { resolveAgencyId } from "@/lib/resolve-agency";
import ProjectsClient from "@/components/admin/projects/ProjectsClient";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const agencyId = await resolveAgencyId();
  if (!agencyId) redirect("/auth/sign-in");

  const [activeCount, planningCount, completedCount, onHoldCount, projects, clients] = await Promise.all([
    prisma.project.count({ where: { client: { agencyId }, status: "ACTIVE" } }),
    prisma.project.count({ where: { client: { agencyId }, status: "PLANNING" } }),
    prisma.project.count({ where: { client: { agencyId }, status: "COMPLETED" } }),
    prisma.project.count({ where: { client: { agencyId }, status: "ON_HOLD" } }),
    prisma.project.findMany({
      where: { client: { agencyId } },
      orderBy: { createdAt: "desc" },
      include: {
        client: { select: { id: true, name: true, domain: true } },
        _count: { select: { tasks: true } },
      },
    }),
    prisma.client.findMany({
      where: { agencyId, status: { in: ["ACTIVE", "PROSPECT"] } },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  // Serialize dates for client component
  const serializedProjects = projects.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    serviceType: p.serviceType,
    status: p.status,
    dueDate: p.dueDate ? p.dueDate.toISOString() : null,
    client: p.client,
    _count: p._count,
  }));

  return (
    <ProjectsClient
      projects={serializedProjects}
      clients={clients}
      metrics={{ activeCount, planningCount, completedCount, onHoldCount }}
    />
  );
}
