import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail, escapeHtml } from "@/lib/email";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { getBaseUrl } from "@/lib/site-config";

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  const where: Record<string, unknown> = role === "TEAM"
    ? { assigneeId: session.user.id, agencyId }
    : { agencyId };

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");
  const serviceType = searchParams.get("serviceType");
  const projectId = searchParams.get("projectId");

  const priority = searchParams.get("priority");
  const search = searchParams.get("search");

  if (clientId) where.clientId = clientId;
  if (serviceType && serviceType !== "ALL") where.serviceType = serviceType;
  if (projectId) where.projectId = projectId;
  if (priority && priority !== "ALL") where.priority = priority;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const tasks = await prisma.task.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      assignee: { select: { id: true, name: true, email: true } },
      createdBy: { select: { id: true, name: true } },
      client: { select: { id: true, name: true } },
      project: { select: { id: true, name: true } },
      _count: { select: { comments: true } },
    },
  });

  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const body = await request.json();

  const task = await prisma.task.create({
    data: {
      agencyId,
      title: body.title,
      description: body.description || null,
      priority: body.priority || "NORMAL",
      category: body.category || null,
      clientId: body.clientId || null,
      projectId: body.projectId || null,
      serviceType: body.serviceType || null,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      assigneeId: body.assigneeId || null,
      createdById: session.user.id,
    },
    include: {
      assignee: { select: { id: true, name: true, email: true } },
      createdBy: { select: { id: true, name: true } },
      client: { select: { id: true, name: true } },
      project: { select: { id: true, name: true } },
      _count: { select: { comments: true } },
    },
  });

  // Notify assigned team member via email (fire-and-forget)
  if (task.assignee?.email) {
    const dueLine = task.dueDate
      ? `<p><strong>Due:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>`
      : "";
    const clientLine = task.client
      ? `<p><strong>Client:</strong> ${escapeHtml(task.client.name)}</p>`
      : "";

    sendEmail({
      to: task.assignee.email,
      subject: `New Task Assigned: ${task.title.slice(0, 100)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px;">
          <h2 style="color: #10b981;">New Task Assigned to You</h2>
          <p><strong>${escapeHtml(task.title)}</strong></p>
          ${task.description ? `<p style="color: #64748b;">${escapeHtml(task.description)}</p>` : ""}
          <p><strong>Priority:</strong> ${escapeHtml(task.priority)}</p>
          ${clientLine}
          ${dueLine}
          <p><strong>Assigned by:</strong> ${escapeHtml(task.createdBy?.name || "Admin")}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p><a href="${getBaseUrl(request)}/admin/tasks" style="color: #10b981;">View in Dashboard</a></p>
        </div>
      `,
    }).catch(() => {});
  }

  return NextResponse.json(task, { status: 201 });
}
