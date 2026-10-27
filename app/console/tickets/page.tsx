import { redirect } from "next/navigation";
import { getAdminUser, listAllSupportTickets } from "@/lib/admin";
import TicketsAdminClient from "./TicketsAdminClient";

export default async function ConsoleTicketsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/dashboard");

  const tickets = await listAllSupportTickets();

  return <TicketsAdminClient initialTickets={tickets} />;
}
