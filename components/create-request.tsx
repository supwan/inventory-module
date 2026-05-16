"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { createRequest } from "@/actions/requests";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { items as itemsSchema } from "@/lib/db/schema";
import { delay } from "@/lib/utils";

export default function CreateNewInventoryRequest({
  items,
}: {
  items: (typeof itemsSchema.$inferSelect)[];
}) {
  // uses useRef instead of useState for performance improvements
  const requesterNameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLInputElement>(null);
  const [itemCode, setItemCode] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createItem = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmpty = (str: string) => !str || str.length === 0;

    const requesterName = requesterNameRef.current!.value;
    const quantity = quantityRef.current!.value;
    const reason = reasonRef.current!.value;

    if (
      isEmpty(requesterName) ||
      isEmpty(quantity) ||
      isEmpty(reason) ||
      isEmpty(itemCode)
    ) {
      return toast.error("Please enter all the required fields!");
    }
    setIsLoading(true);

    const { success } = await createRequest({
      requesterName,
      itemCode,
      quantity: parseInt(quantity),
      reason,
    });

    if (!success) {
      setIsLoading(false);
      return toast.error("Something is wrong");
    }

    toast.success("Request Created! Reloading...");
    await delay(3000);
    location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>
        New Request
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Inventory Request</DialogTitle>
        </DialogHeader>
        <form className="grid" onSubmit={createItem}>
          <div className="mb-4">
            <Label className="mb-1">Requester Name</Label>
            <Input
              placeholder="John Doe"
              disabled={isLoading}
              ref={requesterNameRef}
            />
          </div>
          <div className="mb-4">
            <Label className="mb-1">Item</Label>
            <Select
              value={itemCode}
              onValueChange={(value) => setItemCode(value!)}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an item" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Item Name</SelectLabel>
                  {items.length > 0 &&
                    items.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        {item.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label className="mb-1">Quantity</Label>
            <Input type="number" disabled={isLoading} ref={quantityRef} />
          </div>
          <div className="mb-4">
            <Label className="mb-1">Reason</Label>
            <Input disabled={isLoading} ref={reasonRef} />
          </div>
          <Button type="submit" className="mb-2" disabled={isLoading}>
            Create Request
          </Button>
          <DialogClose
            render={
              <Button
                type="button"
                className="w-full"
                variant="outline"
                disabled={isLoading}
              />
            }
          >
            Cancel
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
