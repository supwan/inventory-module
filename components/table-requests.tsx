"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requests } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "./auth-provider";
import { cn } from "@/lib/utils";

export default function RequestsTable({
  data,
}: {
  data: (typeof requests.$inferSelect)[];
}) {
  const session = useContext(AuthContext);
  const isAdmin = session?.user.role === "Admin";

  return (
    <div className="grid gap-2">
      <h3 className="font-semibold">Requests</h3>
      <Table className="bg-card">
        <TableHeader>
          <TableRow>
            <TableHead>Requester Name</TableHead>
            <TableHead>Item Code</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 &&
            data.map((request) => (
              <TableRow
                key={request.id}
                onClick={() => isAdmin && redirect("/requests/" + request.id)}
                className={cn(isAdmin && "cursor-pointer")}
              >
                <TableCell className="font-medium">
                  {request.requesterName}
                </TableCell>
                <TableCell>{request.itemCode}</TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>{request.reason}</TableCell>

                <TableCell className="text-right">{request.status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        {isAdmin && <TableCaption>Click request to edit</TableCaption>}
      </Table>
    </div>
  );
}
