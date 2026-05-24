import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

// POST /api/e2e/portal-setup — create test client + user for E2E tests
// Protected by shared secret — disabled in production
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const secret = req.headers.get("x-e2e-secret");
    const expected = process.env.E2E_SECRET;
    if (!expected || secret !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { clientName, email, password, onboard } = await req.json();

    // Clean up any existing test data first
    // Delete user first (FK to client), then client (cascades tickets, messages, etc.)
    await prisma.user.deleteMany({ where: { email } });
    const existingClient = await prisma.client.findFirst({ where: { name: clientName } });
    if (existingClient) {
      // User records linked to this client
      await prisma.user.deleteMany({ where: { clientId: existingClient.id } });
      // Client delete cascades related records (tickets, messages, approvals, etc.)
      await prisma.client.deleteMany({ where: { id: existingClient.id } });
    }

    // Create client
    const client = await prisma.client.create({
      data: {
        agencyId: 'vanguard-seed',
        name: clientName,
        email,
        status: "ACTIVE",
      },
    });

    // Create user with CLIENT role, not yet onboarded
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name: "E2E Test User",
        password: hashedPassword,
        role: "CLIENT",
        clientId: client.id,
        portalOnboarded: !!onboard,
      },
    });

    return NextResponse.json({ clientId: client.id, userId: user.id });
  } catch (err) {
    console.error("[e2e/portal-setup] Error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
