import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { getAdminUser } from "@/lib/admin";

export default async function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminUser();
  if (!admin) redirect("/dashboard");

  return <DashboardShell area="admin">{children}</DashboardShell>;
}
