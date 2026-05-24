import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/api-rate-limit";
import { requireAdminAuth } from "@/lib/api-middleware";
import { enforceClientLimit } from "@/lib/plan-limits";
import { createClientSchema, SERVICE_TYPES } from "@/lib/validations/client";

const VALID_STATUSES = ["PROSPECT", "ACTIVE", "PAUSED", "CHURNED"];

export async function GET(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth();
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const service = searchParams.get("service");
  const search = searchParams.get("search") || "";

  const where: Record<string, unknown> = { agencyId };
  if (status && status !== "ALL" && VALID_STATUSES.includes(status)) {
    where.status = status;
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { domain: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }
  if (service && service !== "ALL" && (SERVICE_TYPES as readonly string[]).includes(service)) {
    where.services = { some: { serviceType: service } };
  }

  const clients = await prisma.client.findMany({
    where,
    orderBy: { name: "asc" },
    include: {
      services: { select: { serviceType: true, status: true } },
      contacts: { where: { isPrimary: true }, take: 1, select: { name: true, email: true, phone: true } },
      _count: { select: { tasks: true, supportTickets: true, projects: true } },
    },
  });

  return NextResponse.json(clients);
}

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "admin");
  if (blocked) return blocked;
  const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
  if (errorResponse) return errorResponse;

  // Enforce plan client limit
  const limit = await enforceClientLimit(agencyId);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: `Client limit reached (${limit.current}/${limit.limit}). Upgrade your plan.` },
      { status: 403 },
    );
  }

  const body = await request.json();
  const parsed = createClientSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => i.message).join(", ");
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const d = parsed.data;

  const client = await prisma.client.create({
    data: {
      agencyId,
      name: d.name,
      domain: d.domain || null,
      phone: d.phone || null,
      email: d.email || null,
      address: d.address || null,
      status: d.status,
      monthlyRetainer: d.monthlyRetainer ?? null,
      billingCycle: d.billingCycle,
      contractStart: d.contractStart ? new Date(d.contractStart) : null,
      contractEnd: d.contractEnd ? new Date(d.contractEnd) : null,
      slaResponseHours: d.slaResponseHours,
      nimbataProjectId: d.nimbataProjectId || null,
      gtmContainerId: d.gtmContainerId || null,
      cloudflareZoneId: d.cloudflareZoneId || null,
      googleAdsCustomerId: d.googleAdsCustomerId || null,
      ga4PropertyId: d.ga4PropertyId || null,
      searchConsoleUrl: d.searchConsoleUrl || null,
      notes: d.notes || null,
      ...(d.contacts.length > 0 && {
        contacts: {
          create: d.contacts.map((c) => ({
            name: c.name,
            email: c.email,
            phone: c.phone || null,
            role: c.role,
            isPrimary: c.isPrimary,
          })),
        },
      }),
      ...(d.services.length > 0 && {
        services: {
          create: d.services.map((s) => ({
            serviceType: s.serviceType,
            monthlyBudget: s.monthlyBudget || null,
          })),
        },
      }),
    },
    include: {
      contacts: true,
      services: true,
    },
  });

  return NextResponse.json(client, { status: 201 });
}
