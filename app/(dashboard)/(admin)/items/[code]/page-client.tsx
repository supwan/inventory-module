"use client";

import { updateItem } from "@/actions/items";
import RequestsTable from "@/components/table-requests";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  items as itemsSchema,
  requests as requestsSchema,
} from "@/lib/db/schema";
import { delay } from "@/lib/utils";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ItemPageClient({
  data,
  requests,
}: {
  data: typeof itemsSchema.$inferSelect;
  requests: (typeof requestsSchema.$inferSelect)[];
}) {
  const [newCode, setNewCode] = useState<string>(data.code);
  const [name, setName] = useState<string>(data.name);
  const [availableQuantity, setAvailableQuantity] = useState<string>(
    data.availableQuantity.toString(),
  );
  const [category, setCategory] = useState<string>(data.category);

  const updateItemFn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      newCode.length < 1 ||
      name.length < 1 ||
      availableQuantity.length < 1 ||
      category.length < 1
    ) {
      return toast.error("Please enter all the required fields!");
    }

    const req = await updateItem({
      code: data.code,
      newCode,
      name,
      availableQuantity: parseInt(availableQuantity),
      category,
    });

    if (!req.success) return toast.error(req.content);

    toast.success(req.content);
    await delay();
    redirect("/", RedirectType.push);
  };

  return (
    <>
      <Card className="mx-auto mb-8 max-w-100">
        <CardHeader>
          <CardAction>
            <Link href="/">{"<-"} Go Back</Link>
          </CardAction>
          <CardTitle>Item Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid" onSubmit={updateItemFn}>
            <div className="mb-4">
              <Label className="mb-1">SKU / Code</Label>
              <Input
                placeholder="0000-0000-0000-0000"
                value={newCode}
                onChange={({ target }) => setNewCode(target.value)}
              />
            </div>
            <div className="mb-4">
              <Label className="mb-1">Item Name</Label>
              <Input
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div className="mb-4">
              <Label className="mb-1">Available Quantity</Label>
              <Input
                type="number"
                value={availableQuantity}
                onChange={({ target }) => setAvailableQuantity(target.value)}
              />
            </div>
            <div className="mb-4">
              <Label className="mb-1">Category</Label>
              <Input
                value={category}
                onChange={({ target }) => setCategory(target.value)}
              />
            </div>
            <Button type="submit" className="mb-2">
              Update Item
            </Button>
          </form>
        </CardContent>
      </Card>
      <RequestsTable data={requests} />
    </>
  );
}
