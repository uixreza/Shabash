import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { getAdminUser } from "@/lib/admin";

export const metadata: Metadata = {
  title: "پیشخوان مدیریت",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminUser();
  if (!admin) redirect("/dashboard");

  return <DashboardShell area="admin">{children}</DashboardShell>;
}
