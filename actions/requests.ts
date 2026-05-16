"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { items, requests } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";

export const getRequestById = async (id: string) => {
  const data = await db.select().from(requests).where(eq(requests.id, id));
  return data[0];
};

export const getAllRequests = async () => {
  const data = await db.select().from(requests);
  return data;
};

export const createRequest = async ({
  requesterName,
  itemCode,
  quantity,
  reason,
}: {
  requesterName: string;
  itemCode: string;
  quantity: number;
  reason: string;
}): Promise<{ success: boolean; message?: string }> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return { success: false, message: "Unauthorized" };

  try {
    await db.insert(requests).values({
      requesterName,
      itemCode,
      quantity,
      reason,
      status: "Pending",
      userId: session.user.id,
    });
    return { success: true };
  } catch {
    return { success: false };
  }
};

export const updateRequestStatusById = async ({
  id,
  status,
}: {
  id: string;
  status: "Pending" | "Rejected" | "Approved";
}) => {
  try {
    await db
      .update(requests)
      .set({
        status,
      })
      .where(eq(requests.id, id));
    return { success: true };
  } catch {
    return { success: false };
  }
};

export const fulfillRequest = async ({
  id,
  amount,
}: {
  id: string;
  amount: number;
}): Promise<{
  success: boolean;
  message?: string;
}> => {
  const [request] = await db.select().from(requests).where(eq(requests.id, id));
  if (!request) return { success: false, message: "Request not found!" };

  const [item] = await db
    .select()
    .from(items)
    .where(eq(items.code, request.itemCode));
  if (!request) return { success: false, message: "Item not found!" };

  if (request.status === "Fulfilled")
    return { success: false, message: "Request already fulfilled!" };

  if (item.availableQuantity < amount)
    return { success: false, message: "Not enough stock" };

  await Promise.all([
    db
      .update(items)
      .set({
        availableQuantity: sql`${items.availableQuantity} - ${amount}`,
      })
      .where(eq(items.code, request.itemCode)),
    db
      .update(requests)
      .set({ status: "Fulfilled" })
      .where(eq(requests.id, request.id)),
  ]);

  return { success: true };
};
