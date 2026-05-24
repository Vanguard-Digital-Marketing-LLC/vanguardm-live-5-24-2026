import { prisma } from "@/lib/db";

export async function hasAccessServer(
  userId: string | undefined,
  courseSlug: string,
): Promise<boolean> {
  if (!userId) return false;

  // Check for admin/team role or existing purchase in parallel
  const [user, purchase] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true, role: true },
    }),
    prisma.coursePurchase.findUnique({
      where: { userId_courseSlug: { userId, courseSlug } },
    }),
  ]);

  // Admins and team members have access to all courses
  if (user?.isAdmin || user?.role === "ADMIN" || user?.role === "TEAM") return true;

  return !!purchase;
}
