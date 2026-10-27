import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DashboardHome from "@/components/dashboard/DashboardHome";
import { authOptions } from "@/lib/auth";
import { listWeddingRequests } from "@/lib/requests";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const phone = session?.user?.phone;
  if (!phone) redirect("/");

  const requests = await listWeddingRequests(phone);

  return <DashboardHome requests={requests} />;
}
