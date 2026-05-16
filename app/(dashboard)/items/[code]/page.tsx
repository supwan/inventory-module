import { getItemByCode } from "@/actions/items";
import ItemPageClient from "./page-client";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const item = await getItemByCode(code);

  return <ItemPageClient data={item} />;
}
