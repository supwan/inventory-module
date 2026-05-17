"use client";

import { fulfillRequest, updateRequestStatusById } from "@/actions/requests";
import { Button } from "@/components/ui/button";
import { requests } from "@/lib/db/schema";
import { delay } from "@/lib/utils";
import { redirect, RedirectType } from "next/navigation";
import { toast } from "sonner";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";

export default function RequestPageClient({
  data,
}: {
  data: typeof requests.$inferSelect;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateStatus = async (
    status: "Pending" | "Rejected" | "Approved" | "Fulfilled",
  ) => {
    setIsLoading(true);
    if (status === "Fulfilled") {
      const req = await fulfillRequest({
        id: data.id,
        amount: data.quantity,
      });

      if (!req.success) {
        setIsLoading(false);
        return toast.error(req.content);
      }

      toast.success(req.content);
      await delay();
      redirect("/", RedirectType.push); // this also returns the function
    }

    const req = await updateRequestStatusById({
      id: data.id,
      status,
    });

    if (!req.success) return toast.error(req.content);

    toast.success(req.content);
    await delay();
    redirect("/", RedirectType.push);
  };

  return (
    <Card className="mx-auto max-w-100">
      <CardHeader>
        <CardTitle>Request Details</CardTitle>
        <CardAction>
          <Link href="/">{"<-"} Go Back</Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="bg-accent grid divide-y overflow-hidden rounded-md">
          <Detail name="Requester Name" value={data.requesterName} />
          <Detail name="Item Code" value={data.itemCode} />
          <Detail name="Quantity" value={data.quantity.toString()} />
          <Detail name="Reason" value={data.reason} />
          <Detail name="Status" value={data.status} />
        </div>
      </CardContent>
      {data.status !== "Fulfilled" && (
        <CardFooter className="flex justify-center border-t">
          {isLoading ? (
            <LoadingIcon />
          ) : (
            <div className="grid w-full grid-cols-3 gap-2">
              <Button
                disabled={data.status === "Rejected"}
                variant={"destructive"}
                onClick={() => updateStatus("Rejected")}
              >
                Reject
              </Button>
              <Button
                disabled={data.status === "Approved"}
                variant={"outline"}
                onClick={() => updateStatus("Approved")}
              >
                Approve
              </Button>
              <Button onClick={() => updateStatus("Fulfilled")}>Fulfill</Button>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

const Detail = ({ name, value }: { name: string; value: string }) => {
  return (
    <span className="px-4 py-3">
      <span className="font-semibold">{name}: </span>
      {value}
    </span>
  );
};

const LoadingIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
