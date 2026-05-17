import { getItemByCode, getItemRequests } from "@/actions/items";
import ItemPageClient from "./page-client";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const item = await getItemByCode(code);
  const requests = await getItemRequests(code);

  return <ItemPageClient data={item.content} requests={requests.content} />;
}
