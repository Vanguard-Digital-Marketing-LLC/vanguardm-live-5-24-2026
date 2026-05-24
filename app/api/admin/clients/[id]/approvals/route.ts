import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminFeature } from "@/lib/api-middleware";
import { withRateLimit } from "@/lib/api-middleware";
import { createApprovalSchema } from "@/lib/validations/approvals";
import { sendEmail, escapeHtml } from "@/lib/email";

// GET /api/admin/clients/[id]/approvals — list approvals for a client
export const GET = withRateLimit("admin", async (
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
): Promise<NextResponse> => {
  const authResult = await requireAdminFeature("approvals", "ADMIN");
  if (authResult.errorResponse) return authResult.errorResponse;
  const { agencyId } = authResult;

  const { id: clientId } = await context.params;

  // Verify the client belongs to this agency
  const clientCheck = await prisma.client.findFirst({ where: { id: clientId, agencyId } });
  if (!clientCheck) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit") || "20")));
  const status = url.searchParams.get("status") || undefined;

  // Expire overdue approvals (check-on-read)
  await prisma.approval.updateMany({
    where: { clientId, status: "PENDING", dueDate: { lt: new Date() } },
    data: { status: "EXPIRED" },
  });

  const where = {
    clientId,
    deletedAt: null,
    ...(status ? { status: status as "PENDING" | "APPROVED" | "REVISION_REQUESTED" | "EXPIRED" } : {}),
  };

  const [approvals, total] = await Promise.all([
    prisma.approval.findMany({
      where,
      include: {
        project: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true } },
        responses: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: { user: { select: { id: true, name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.approval.count({ where }),
  ]);

  return NextResponse.json({ approvals, total, page, limit });
});

// POST /api/admin/clients/[id]/approvals — create approval
export const POST = withRateLimit("admin", async (
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
): Promise<NextResponse> => {
  const authResult = await requireAdminFeature("approvals", "ADMIN");
  if (authResult.errorResponse) return authResult.errorResponse;
  const { agencyId } = authResult;

  const { id: clientId } = await context.params;

  // Verify the client belongs to this agency
  const client = await prisma.client.findFirst({
    where: { id: clientId, agencyId },
    select: { id: true, name: true },
  });
  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = createApprovalSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { title, description, category, projectId, dueDate, fileUrls } = parsed.data;

  const approval = await prisma.approval.create({
    data: {
      agencyId,
      clientId,
      title,
      description,
      category: category || null,
      projectId: projectId || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      fileUrls: fileUrls || [],
      createdById: authResult.session.user.id,
    },
  });

  // Send email notification to all portal users for this client
  try {
    const portalUsers = await prisma.user.findMany({
      where: {
        clientId,
        role: "CLIENT",
        emailOnApprovalRequest: true,
      },
      select: { email: true, name: true },
    });

    const portalUrl = `${process.env.NEXTAUTH_URL || "https://vanguardm.com"}/portal/approvals/${approval.id}`;

    for (const user of portalUsers) {
      if (!user.email) continue;
      await sendEmail({
        to: user.email,
        subject: `Approval Requested: ${title}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="border-bottom: 2px solid #0891b2; padding-bottom: 16px; margin-bottom: 24px;">
              <h1 style="color: #0a0f1a; font-size: 20px; margin: 0;">Approval Requested</h1>
              <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">Vanguard Digital Marketing</p>
            </div>
            <p style="font-size: 14px; color: #0a0f1a; line-height: 1.6;">
              Hi ${escapeHtml(user.name || "there")},
            </p>
            <p style="font-size: 14px; color: #0a0f1a; line-height: 1.6;">
              A new item requires your approval:
            </p>
            <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0;">
              <p style="font-size: 16px; font-weight: 600; color: #0a0f1a; margin: 0 0 8px 0;">${escapeHtml(title)}</p>
              <p style="font-size: 14px; color: #475569; margin: 0; white-space: pre-wrap;">${escapeHtml(description.slice(0, 200))}${description.length > 200 ? "..." : ""}</p>
              ${dueDate ? `<p style="font-size: 13px; color: #ef4444; margin: 8px 0 0 0;">Due: ${new Date(dueDate).toLocaleDateString()}</p>` : ""}
            </div>
            <a href="${portalUrl}" style="display: inline-block; background: #0891b2; color: #fff; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">
              Review &amp; Respond
            </a>
          </div>
        `,
      });
    }
  } catch (err) {
    console.error("Failed to send approval notification emails:", err);
  }

  return NextResponse.json(approval, { status: 201 });
});
