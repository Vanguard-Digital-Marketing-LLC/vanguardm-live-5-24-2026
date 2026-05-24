import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LeadPipeline from "@/components/admin/leads/LeadPipeline";
import { requireFeature } from "@/lib/require-feature";

export const metadata = { title: "Lead Pipeline" };

export default async function LeadsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") redirect("/admin");

  const gate = await requireFeature("leads");
  if (gate) return gate;

  return <LeadPipeline />;
}
