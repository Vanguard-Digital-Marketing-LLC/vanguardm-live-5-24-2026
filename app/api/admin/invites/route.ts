import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withRateLimit, requireAdminAuth } from "@/lib/api-middleware";

export const GET = withRateLimit(
  "admin",
  async (req: NextRequest): Promise<NextResponse> => {
    const { agencyId, errorResponse } = await requireAdminAuth("ADMIN");
    if (errorResponse) return errorResponse;

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const q = searchParams.get("q");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const skip = (page - 1) * limit;

    const now = new Date();

    // Build where clause — scope to agency via client relation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { client: { agencyId } };

    if (status === "pending") {
      where.acceptedAt = null;
      where.revokedAt = null;
      where.expiresAt = { gt: now };
    } else if (status === "accepted") {
      where.acceptedAt = { not: null };
    } else if (status === "expired") {
      where.acceptedAt = null;
      where.revokedAt = null;
      where.expiresAt = { lt: now };
    } else if (status === "revoked") {
      where.revokedAt = { not: null };
    }

    if (q) {
      where.OR = [
        { email: { contains: q, mode: "insensitive" } },
        { client: { name: { contains: q, mode: "insensitive" } } },
      ];
    }

    const [invites, total] = await Promise.all([
      prisma.clientInvite.findMany({
        where,
        include: { client: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip,
      }),
      prisma.clientInvite.count({ where }),
    ]);

    // Compute status for each invite
    const invitesWithStatus = invites.map((inv) => {
      let computedStatus: string;
      if (inv.acceptedAt) computedStatus = "accepted";
      else if (inv.revokedAt) computedStatus = "revoked";
      else if (inv.expiresAt < now) computedStatus = "expired";
      else computedStatus = "pending";

      return {
        id: inv.id,
        email: inv.email,
        clientId: inv.clientId,
        clientName: inv.client.name,
        status: computedStatus,
        createdAt: inv.createdAt,
        expiresAt: inv.expiresAt,
        acceptedAt: inv.acceptedAt,
        revokedAt: inv.revokedAt,
      };
    });

    return NextResponse.json({
      invites: invitesWithStatus,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  },
);
