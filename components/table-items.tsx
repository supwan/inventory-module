"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { items } from "@/lib/db/schema";
import { redirect, RedirectType } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "./auth-provider";

const LowStockPing = () => {
  return (
    <span className="flex items-center justify-center gap-2 text-red-400">
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
      </span>
      Low Stock
    </span>
  );
};

export default function ItemsTable({
  data,
}: {
  data: (typeof items.$inferSelect)[];
}) {
  const session = useContext(AuthContext);
  const isAdmin = session?.user.role === "Admin";

  return (
    <div className="grid gap-2">
      <h3 className="font-semibold">Items</h3>
      <Table className="bg-card">
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>SKU / Code</TableHead>
            <TableHead>Available Quantity</TableHead>
            <TableHead className="text-right">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 &&
            data.map((data) => (
              <TableRow
                key={data.code}
                onClick={() =>
                  isAdmin && redirect("/items/" + data.code, RedirectType.push)
                }
              >
                <TableCell className="font-medium">{data.name}</TableCell>
                <TableCell>{data.code}</TableCell>
                <TableCell className="flex gap-2">
                  {data.availableQuantity}
                  {data.availableQuantity < 20 && <LowStockPing />}
                </TableCell>
                <TableCell className="text-right">{data.category}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
