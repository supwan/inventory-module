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
import { useContext, useRef, useState } from "react";
import { createItem } from "@/actions/items";
import { toast } from "sonner";
import { delay } from "@/lib/utils";
import { AuthContext } from "./auth-provider";

export default function CreateNewInventoryItem() {
  // uses useRef instead of useState for performance improvements
  const codeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const availableQuantityRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useContext(AuthContext);
  if (session?.user.role !== "Admin") return <></>;

  const createItemFn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmpty = (str: string) => !str || str.length === 0;

    const code = codeRef.current!.value;
    const name = nameRef.current!.value;
    const availableQuantity = availableQuantityRef.current!.value;
    const category = categoryRef.current!.value;

    if (
      isEmpty(code) ||
      isEmpty(name) ||
      isEmpty(availableQuantity) ||
      isEmpty(category)
    ) {
      return toast.error("Please enter all the required fields!");
    }
    setIsLoading(true);

    const { success } = await createItem({
      code,
      name,
      availableQuantity: parseInt(availableQuantity),
      category,
    });

    if (!success) {
      setIsLoading(false);
      return toast.error("Something is wrong");
    }

    toast.success("Item Created! Reloading...");
    await delay(3000);
    location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button />}>New Item</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Inventory Item</DialogTitle>
        </DialogHeader>
        <form className="grid" onSubmit={createItemFn}>
          <div className="mb-4">
            <Label className="mb-1">SKU / Code</Label>
            <Input
              placeholder="0000-0000-0000-0000"
              ref={codeRef}
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label className="mb-1">Item Name</Label>
            <Input ref={nameRef} disabled={isLoading} />
          </div>
          <div className="mb-4">
            <Label className="mb-1">Available Quantity</Label>
            <Input
              type="number"
              ref={availableQuantityRef}
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label className="mb-1">Category</Label>
            <Input ref={categoryRef} disabled={isLoading} />
          </div>
          <Button type="submit" className="mb-2" disabled={isLoading}>
            Create Item
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
