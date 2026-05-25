import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { resolveAgencyId } from "@/lib/resolve-agency";
import { signPaymentParams } from "@/lib/payment-links";
import { checkRateLimit } from "@/lib/api-rate-limit";

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (!["ADMIN", "TEAM"].includes(role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const agencyId = await resolveAgencyId();
  if (!agencyId) {
    return NextResponse.json({ error: "No agency context" }, { status: 400 });
  }

  const { amount, description, email } = await request.json();

  const cents = Number(amount);
  if (!Number.isInteger(cents) || cents < 100 || cents > 10_000_00) {
    return NextResponse.json({ error: "Amount must be between $1.00 and $100,000.00 (in cents)." }, { status: 400 });
  }

  if (!description || typeof description !== "string") {
    return NextResponse.json({ error: "Description is required." }, { status: 400 });
  }

  const { exp, signature } = signPaymentParams(cents, description, agencyId);
  const base = process.env.NEXTAUTH_URL || "https://vanguardm.com";
  const params = new URLSearchParams({
    amount: String(cents),
    desc: description,
    sig: signature,
    exp: String(exp),
    agency: agencyId,
  });
  if (email) params.set("email", email);

  const url = `${base}/pay?${params.toString()}`;

  return NextResponse.json({ url, signature, exp });
}
