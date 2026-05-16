"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requests } from "@/lib/db/schema";
import { redirect } from "next/navigation";

export default function RequestsTable({
  data,
}: {
  data: (typeof requests.$inferSelect)[];
}) {
  return (
    <div className="grid gap-2">
      <h3 className="font-semibold">Requests</h3>
      <Table className="bg-card">
        <TableHeader>
          <TableRow>
            <TableHead>Requester Name</TableHead>
            <TableHead>Item</TableHead>
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
                onClick={() => redirect("/requests/" + request.id)}
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
      </Table>
    </div>
  );
}
