import { redirect } from "next/navigation";
import { auth } from "@/auth";
import TicketBoard from "@/components/admin/tickets/TicketBoard";

export const metadata = { title: "Support Tickets" };

export default async function TicketsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") redirect("/admin");

  return <TicketBoard role={role as "ADMIN" | "TEAM"} userId={session.user.id} />;
}
