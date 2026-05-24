import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// POST /api/e2e/portal-teardown — clean up test data
// Disabled in production
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

    const { clientId, userId } = await req.json();

    // Delete user first, then client (cascade handles related records)
    if (userId) {
      await prisma.user.deleteMany({ where: { id: userId } });
    }
    if (clientId) {
      await prisma.user.deleteMany({ where: { clientId } });
      await prisma.client.deleteMany({ where: { id: clientId } });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[e2e/portal-teardown] Error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
