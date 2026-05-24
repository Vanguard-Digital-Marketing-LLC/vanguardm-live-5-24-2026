import { redirect } from "next/navigation";
import { auth } from "@/auth";
import TaskBoard from "@/components/admin/tasks/TaskBoard";

export const metadata = { title: "Tasks" };

export default async function TasksPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const role = session.user.role ?? (session.user.isAdmin ? "ADMIN" : "USER");
  if (role !== "ADMIN" && role !== "TEAM") redirect("/admin");

  return <TaskBoard role={role as "ADMIN" | "TEAM"} userId={session.user.id} />;
}
