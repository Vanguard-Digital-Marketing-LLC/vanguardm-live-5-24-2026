import { prisma } from "@/lib/db";

// Re-export the singleton instance
export { prisma };

// Expose generic CRUD helpers for common entities if needed
// For now, these are examples. We can expand based on specific app models.

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

// Add more centralized Prisma helpers here as the app grows
