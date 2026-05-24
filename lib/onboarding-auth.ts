import { prisma } from "@/lib/db";

/**
 * Validate an onboarding token from the URL.
 * Returns the onboarding record if valid, null otherwise.
 */
export async function validateOnboardingToken(token: string) {
  if (!token || token.length < 10) return null;

  const onboarding = await prisma.clientOnboarding.findUnique({
    where: { token },
    include: {
      client: { select: { id: true, name: true } },
      responses: true,
      files: {
        select: {
          id: true,
          category: true,
          fileName: true,
          mimeType: true,
          fileSize: true,
          createdAt: true,
        },
      },
    },
  });

  if (!onboarding) return null;

  // Token expired
  if (onboarding.tokenExpiresAt < new Date()) return null;

  // Already completed — no more edits
  if (onboarding.status === "COMPLETED") return null;

  return onboarding;
}
