import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin: boolean;
      role: "ADMIN" | "TEAM" | "USER" | "CLIENT";
      clientId?: string | null;
      portalOnboarded?: boolean;
      agencyId?: string | null;
      agencySlug?: string | null;
    };
  }
}
