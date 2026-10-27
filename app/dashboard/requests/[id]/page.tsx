import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import RequestDetail from "@/components/dashboard/RequestDetail";
import { authOptions } from "@/lib/auth";
import { getWeddingRequest } from "@/lib/requests";

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  const phone = session?.user?.phone;
  if (!phone) redirect("/");

  const { id } = await params;
  const request = await getWeddingRequest(phone, id);

  if (!request) notFound();

  return <RequestDetail request={request} />;
}
