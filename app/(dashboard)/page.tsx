import { getAllItems } from "@/actions/items";
import { getAllRequests } from "@/actions/requests";
import CreateNewInventoryItem from "@/components/create-item";
import CreateNewInventoryRequest from "@/components/create-request";
import ItemsTable from "@/components/table-items";
import RequestsTable from "@/components/table-requests";

export const revalidate = 0;

export default async function Home() {
  const [items, requests] = await Promise.all([
    getAllItems(),
    getAllRequests(),
  ]);

  return (
    <div className="grid gap-4">
      <div className="flex gap-1">
        <CreateNewInventoryItem />
        <CreateNewInventoryRequest items={items} />
      </div>

      <ItemsTable data={items} />
      <RequestsTable data={requests} />
    </div>
  );
}
