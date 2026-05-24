import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requireAuth } from "@/lib/api-middleware";

export const GET = withRateLimit("portal", async (req: NextRequest) => {
  const { session, errorResponse } = await requireAuth();
  if (errorResponse) return errorResponse;

  const clientId = session.user.clientId;
  if (!clientId) {
    return NextResponse.json(
      { error: "No client account linked" },
      { status: 403 },
    );
  }

  // Build list of emails to match payments against
  // Also verifies client belongs to user's agency
  const client = await prisma.client.findFirst({
    where: {
      id: clientId,
      ...(session.user.agencyId ? { agencyId: session.user.agencyId } : {}),
    },
    select: {
      email: true,
      contacts: { select: { email: true } },
    },
  });

  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  const emails: string[] = [];
  if (client.email) emails.push(client.email.toLowerCase());
  for (const contact of client.contacts) {
    if (contact.email) emails.push(contact.email.toLowerCase());
  }
  // Include the logged-in user's email
  if (session.user.email) emails.push(session.user.email.toLowerCase());

  // Deduplicate
  const uniqueEmails = [...new Set(emails)];

  if (uniqueEmails.length === 0) {
    return NextResponse.json([]);
  }

  const payments = await prisma.servicePayment.findMany({
    where: {
      customerEmail: { in: uniqueEmails, mode: "insensitive" },
    },
    orderBy: { paidAt: "desc" },
  });

  return NextResponse.json(payments);
});
