import { getRequestById } from "@/actions/requests";
import RequestPageClient from "./page-client";

export default async function RequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getRequestById(id);

  return <RequestPageClient data={item.content} />;
}
