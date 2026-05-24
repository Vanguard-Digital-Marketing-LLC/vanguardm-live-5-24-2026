import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { contactWebhookSchema } from "@/lib/validations/ticket-messages";

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "webhook");
  if (blocked) return blocked;

  // Validate webhook secret
  const authHeader = request.headers.get("authorization");
  const expectedSecret = process.env.WEBHOOK_SECRET;
  if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = contactWebhookSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { domain, name, email, phone, message, service } = parsed.data;

  // Look up client by domain (exact match, case-insensitive, strip www)
  const normalizedDomain = domain.toLowerCase().replace(/^www\./, "");
  const client = await prisma.client.findFirst({
    where: {
      domain: { equals: normalizedDomain, mode: "insensitive" },
    },
    select: { id: true, name: true, slaResponseHours: true, agencyId: true },
  });

  if (!client) {
    return NextResponse.json({ error: "Unknown domain" }, { status: 404 });
  }

  // Calculate SLA deadline
  let slaDeadline = null;
  if (client.slaResponseHours) {
    slaDeadline = new Date(Date.now() + client.slaResponseHours * 60 * 60 * 1000);
  }

  // Create ticket in QUEUED status for manual processing
  const title = `Contact: ${name}${service ? ` — ${service}` : ""}`;
  const ticket = await prisma.supportTicket.create({
    data: {
      agencyId: client.agencyId || 'vanguard-seed',
      clientId: client.id,
      title: title.slice(0, 200),
      description: message,
      status: "QUEUED",
      source: "contact_form",
      priority: "NORMAL",
      slaDeadline,
    },
    include: {
      client: { select: { id: true, name: true, domain: true } },
    },
  });

  // Create SYSTEM message with contact details
  const contactDetails = [
    `**New contact form submission**`,
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    service ? `Service: ${service}` : null,
    ``,
    `Message:`,
    message,
  ]
    .filter(Boolean)
    .join("\n");

  await prisma.ticketMessage.create({
    data: {
      ticketId: ticket.id,
      type: "SYSTEM",
      content: contactDetails,
    },
  });

  return NextResponse.json({ success: true, ticketId: ticket.id }, { status: 201 });
}
