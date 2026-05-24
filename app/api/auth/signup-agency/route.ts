import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "auth");
  if (blocked) return blocked;

  const body = await request.json();
  const { agencyName, email, password, name } = body;

  if (!agencyName || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  // Check email uniqueness
  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  // Generate unique slug
  let slug = slugify(agencyName);
  const existingSlug = await prisma.agency.findUnique({ where: { slug } });
  if (existingSlug) {
    slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  }

  // Reserve "vanguard", "www", "api", "admin", "mail" slugs
  const reserved = ["vanguard", "www", "api", "admin", "mail", "app", "portal", "test"];
  if (reserved.includes(slug)) {
    slug = `${slug}-agency`;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  // Create agency + admin user in a transaction
  const result = await prisma.$transaction(async (tx) => {
    const agency = await tx.agency.create({
      data: {
        name: agencyName.trim(),
        slug,
        planTier: "STARTER",
        subscriptionStatus: "TRIALING",
        maxClients: 5,
      },
    });

    const user = await tx.user.create({
      data: {
        name: name?.trim() || agencyName.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: "ADMIN",
        isAdmin: true,
        agencyId: agency.id,
      },
    });

    // Set owner
    await tx.agency.update({
      where: { id: agency.id },
      data: { ownerUserId: user.id },
    });

    return { agency, user };
  });

  return NextResponse.json({
    agencyId: result.agency.id,
    slug: result.agency.slug,
    redirectUrl: `https://${result.agency.slug}.vanguardm.com/admin`,
  }, { status: 201 });
}
