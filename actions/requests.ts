/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { items, requests } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { ERROR, isAdmin, SUCCESS } from "./helper";

export const getRequestById = async (
  id: string,
): Promise<{ success: boolean; content?: any }> => {
  const session = await getSession();
  if (!session) return ERROR("Unauthorized!");

  try {
    const data = await db.select().from(requests).where(eq(requests.id, id));
    return SUCCESS(data[0]);
  } catch (err) {
    console.log(err);
    return ERROR("Failed to get request!");
  }
};

export const getAllRequests = async (): Promise<{
  success: boolean;
  content?: any;
}> => {
  const session = await getSession();
  if (!session) return ERROR("Unauthorized!");

  try {
    const data = await db.select().from(requests);
    return SUCCESS(data);
  } catch (err) {
    console.log(err);
    return ERROR("Failed to get all requests!");
  }
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
}): Promise<{ success: boolean; content?: any }> => {
  const session = await getSession();
  if (!session) return ERROR("Unauthorized!");

  try {
    await db.insert(requests).values({
      requesterName,
      itemCode,
      quantity,
      reason,
      status: "Pending",
      userId: session.user.id,
    });
    return SUCCESS("Request created!");
  } catch (err) {
    console.log(err);
    return ERROR("Failed to create request!");
  }
};

export const updateRequestStatusById = async ({
  id,
  status,
}: {
  id: string;
  status: "Pending" | "Rejected" | "Approved";
}): Promise<{ success: boolean; content?: any }> => {
  const session = await getSession();
  if (!isAdmin(session)) return ERROR("Unauthorized!");

  try {
    await db
      .update(requests)
      .set({
        status,
      })
      .where(eq(requests.id, id));
    return SUCCESS("Request's status updated!");
  } catch (err) {
    console.log(err);
    return ERROR("Failed to update request's status!");
  }
};

export const fulfillRequest = async ({
  id,
  amount,
}: {
  id: string;
  amount: number;
}): Promise<{ success: boolean; content?: any }> => {
  const session = await getSession();
  if (!isAdmin(session)) return ERROR("Unauthorized!");

  try {
    const status = await db.transaction(async (tx) => {
      const [request] = await tx
        .select()
        .from(requests)
        .where(eq(requests.id, id));
      if (!request) return ERROR("Request not found!");

      const [item] = await tx
        .select()
        .from(items)
        .where(eq(items.code, request.itemCode));
      if (!item) return ERROR("Item not found!");

      if (request.status === "Fulfilled")
        return ERROR("Request already fulfilled!");

      if (item.availableQuantity < amount)
        return ERROR("Item not enough stock!");

      await Promise.all([
        tx
          .update(items)
          .set({
            availableQuantity: sql`${items.availableQuantity} - ${amount}`,
          })
          .where(eq(items.code, request.itemCode)),
        tx
          .update(requests)
          .set({ status: "Fulfilled" })
          .where(eq(requests.id, request.id)),
      ]);

      return SUCCESS("Request fulfilled!");
    });
    return status;
  } catch (err) {
    console.log(err);
    return ERROR("Failed to fulfill request!");
  }
};
