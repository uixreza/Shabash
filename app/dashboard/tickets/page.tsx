import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { listSupportTickets } from "./actions";
import TicketsClient from "./TicketsClient";

export default async function TicketsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.phone) redirect("/");

  const result = await listSupportTickets();
  return (
    <TicketsClient
      initialTickets={result.tickets}
      initialError={result.error ?? ""}
    />
  );
}
