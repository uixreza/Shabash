import { notFound } from "next/navigation";
import { getWeddingRequestAdmin } from "@/lib/admin";
import RequestEditor from "./RequestEditor";

export default async function ConsoleRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = await getWeddingRequestAdmin(id);
  if (!request) notFound();

  return <RequestEditor key={request.id} request={request} />;
}
