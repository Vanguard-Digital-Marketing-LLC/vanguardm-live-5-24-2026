import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { sendEmail, escapeHtml } from "@/lib/email";
import { requireAdminAuth } from "@/lib/api-middleware";
import { getBaseUrl } from "@/lib/site-config";

const TASK_NOTIFY_EMAIL = process.env.TASK_NOTIFY_EMAIL || "howdy@mentservices.com";

async function sendTaskCompletedEmail(task: {
  title: string;
  description: string | null;
  client: { name: string } | null;
  assignee: { name: string | null; email: string } | null;
  completedBy: string;
}) {
  const clientLine = task.client ? `<tr><td style="padding:6px 12px;font-size:13px;color:#64748b;font-weight:600;width:100px">Client</td><td style="padding:6px 12px;font-size:14px;color:#0a0f1a">${escapeHtml(task.client.name)}</td></tr>` : "";
  const assigneeLine = task.assignee?.name ? `<tr style="background:#f8fafc"><td style="padding:6px 12px;font-size:13px;color:#64748b;font-weight:600">Assignee</td><td style="padding:6px 12px;font-size:14px;color:#0a0f1a">${escapeHtml(task.assignee.name)}</td></tr>` : "";

  await sendEmail({
    to: TASK_NOTIFY_EMAIL,
    subject: `Task Completed: ${task.title.slice(0, 100)}`,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <div style="border-bottom:2px solid #0891b2;padding-bottom:16px;margin-bottom:24px">
          <h1 style="color:#0a0f1a;font-size:20px;margin:0">Task Completed</h1>
          <p style="color:#64748b;font-size:14px;margin:4px 0 0">Vanguard Digital Marketing</p>
        </div>
        <div style="background:#ecfdf5;border-left:4px solid #0891b2;padding:12px 16px;margin-bottom:24px;border-radius:0 8px 8px 0">
          <p style="font-size:16px;font-weight:600;color:#065f46;margin:0">${escapeHtml(task.title)}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          ${clientLine}
          ${assigneeLine}
          <tr><td style="padding:6px 12px;font-size:13px;color:#64748b;font-weight:600">Completed by</td><td style="padding:6px 12px;font-size:14px;color:#0a0f1a">${escapeHtml(task.completedBy)}</td></tr>
          <tr style="background:#f8fafc"><td style="padding:6px 12px;font-size:13px;color:#64748b;font-weight:600">Date</td><td style="padding:6px 12px;font-size:14px;color:#0a0f1a">${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td></tr>
        </table>
        ${task.description ? `<div style="background:#f8fafc;border-radius:8px;padding:16px;margin-bottom:24px"><p style="font-size:13px;color:#64748b;font-weight:600;margin:0 0 8px">Description</p><p style="font-size:14px;color:#0a0f1a;line-height:1.6;margin:0;white-space:pre-wrap">${escapeHtml(task.description)}</p></div>` : ""}
        <p style="font-size:12px;color:#94a3b8;margin:0">This is an automated notification from Vanguard Digital Marketing.</p>
      </div>
    `,
  });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  const { id } = await params;
  const body = await request.json();

  // Team members can only update status of assigned tasks
  if (role === "TEAM") {
    const task = await prisma.task.findFirst({ where: { id, agencyId } });
    if (!task || task.assigneeId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const wasCompleted = task.status === "COMPLETED";
    const updated = await prisma.task.update({
      where: { id },
      data: { status: body.status },
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        createdBy: { select: { id: true, name: true } },
        client: { select: { id: true, name: true } },
        project: { select: { id: true, name: true } },
        _count: { select: { comments: true } },
      },
    });

    if (!wasCompleted && body.status === "COMPLETED") {
      sendTaskCompletedEmail({
        title: updated.title,
        description: updated.description,
        client: updated.client,
        assignee: updated.assignee,
        completedBy: session.user.name || session.user.email || "Team Member",
      }).catch(console.error);
    }

    return NextResponse.json(updated);
  }

  // Admin can update everything
  const data: Record<string, unknown> = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.description !== undefined) data.description = body.description;
  if (body.status !== undefined) data.status = body.status;
  if (body.priority !== undefined) data.priority = body.priority;
  if (body.category !== undefined) data.category = body.category;
  if (body.dueDate !== undefined) data.dueDate = body.dueDate ? new Date(body.dueDate) : null;
  if (body.assigneeId !== undefined) data.assigneeId = body.assigneeId || null;
  if (body.serviceType !== undefined) data.serviceType = body.serviceType || null;
  if (body.clientId !== undefined) data.clientId = body.clientId || null;
  if (body.projectId !== undefined) data.projectId = body.projectId || null;
  if (body.subtasks !== undefined) data.subtasks = body.subtasks;

  const existing = await prisma.task.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Task not found" }, { status: 404 });

  const task = await prisma.task.update({
    where: { id },
    data,
    include: {
      assignee: { select: { id: true, name: true, email: true } },
      createdBy: { select: { id: true, name: true } },
      client: { select: { id: true, name: true } },
      project: { select: { id: true, name: true } },
      _count: { select: { comments: true } },
    },
  });

  // Send email when task is newly completed
  if (existing.status !== "COMPLETED" && body.status === "COMPLETED") {
    sendTaskCompletedEmail({
      title: task.title,
      description: task.description,
      client: task.client,
      assignee: task.assignee,
      completedBy: session.user.name || session.user.email || "Admin",
    }).catch(console.error);
  }

  // Notify new assignee when task is reassigned
  if (body.assigneeId && body.assigneeId !== existing.assigneeId && task.assignee?.email) {
    const dueLine = task.dueDate
      ? `<p><strong>Due:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>`
      : "";
    const clientLine = task.client
      ? `<p><strong>Client:</strong> ${escapeHtml(task.client.name)}</p>`
      : "";
    sendEmail({
      to: task.assignee.email,
      subject: `Task Assigned to You: ${task.title.slice(0, 100)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px;">
          <h2 style="color: #10b981;">Task Assigned to You</h2>
          <p><strong>${escapeHtml(task.title)}</strong></p>
          ${task.description ? `<p style="color: #64748b;">${escapeHtml(task.description)}</p>` : ""}
          <p><strong>Priority:</strong> ${escapeHtml(task.priority)}</p>
          ${clientLine}
          ${dueLine}
          <p><strong>Assigned by:</strong> ${escapeHtml(session.user.name || session.user.email || "Admin")}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p><a href="${getBaseUrl(request)}/admin/tasks" style="color: #10b981;">View in Dashboard</a></p>
        </div>
      `,
    }).catch(() => {});
  }

  return NextResponse.json(task);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { session, agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  const { id } = await params;

  // Verify ownership before deleting
  const existing = await prisma.task.findFirst({ where: { id, agencyId } });
  if (!existing) return NextResponse.json({ error: "Task not found" }, { status: 404 });

  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
