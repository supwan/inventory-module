/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { items, requests } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ERROR, isAdmin, SUCCESS } from "./helper";

export const getAllItems = async (): Promise<{
  success: boolean;
  content?: any;
}> => {
  const session = await getSession();
  if (!session) return ERROR("Unauthorized!");

  try {
    const data = await db.select().from(items);
    return SUCCESS(data);
  } catch (err) {
    console.log(err);
    return ERROR("Failed to get all items!");
  }
};

export const getItemByCode = async (
  code: string,
): Promise<{ success: boolean; content?: any }> => {
  const session = await getSession();
  if (!session) return ERROR("Unauthorized!");

  try {
    const data = await db.select().from(items).where(eq(items.code, code));
    return SUCCESS(data[0]);
  } catch (err) {
    console.log(err);
    return ERROR("Failed to get item!");
  }
};

export const getItemRequests = async (
  code: string,
): Promise<{ success: boolean; content?: any }> => {
  const session = await getSession();
  if (!session) return ERROR("Unauthorized!");

  try {
    const data = await db
      .select()
      .from(requests)
      .where(eq(requests.itemCode, code));
    return SUCCESS(data);
  } catch (err) {
    console.log(err);
    return ERROR("Failed to get item's requests!");
  }
};

export const createItem = async ({
  code,
  name,
  availableQuantity,
  category,
}: {
  code: string;
  name: string;
  availableQuantity: number;
  category: string;
}): Promise<{ success: boolean; content?: any }> => {
  const session = await getSession();
  if (!isAdmin(session)) return ERROR("Unauthorized!");

  try {
    await db.insert(items).values({
      code,
      name,
      availableQuantity,
      category,
    });
    return SUCCESS("Item created!");
  } catch (err) {
    console.log(err);
    return ERROR("Failed to create item!");
  }
};

export const updateItem = async ({
  code,
  newCode,
  name,
  availableQuantity,
  category,
}: {
  code: string;
  newCode: string;
  name: string;
  availableQuantity: number;
  category: string;
}): Promise<{ success: boolean; content?: any }> => {
  const session = await getSession();
  if (!isAdmin(session)) return ERROR("Unauthorized!");

  try {
    await db
      .update(items)
      .set({
        code: newCode,
        name,
        availableQuantity,
        category,
      })
      .where(eq(items.code, code));
    return SUCCESS("Item updated!");
  } catch (err) {
    console.log(err);
    return ERROR("Failed to update item!");
  }
};
