"use server";

import db from "@/lib/db";
import { items } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const getAllItems = async () => {
  const data = await db.select().from(items);
  return data;
};

export const getItemByCode = async (code: string) => {
  const data = await db.select().from(items).where(eq(items.code, code));
  return data[0];
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
}) => {
  try {
    await db.insert(items).values({
      code,
      name,
      availableQuantity,
      category,
    });
    return { success: true };
  } catch {
    return { success: false };
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
}) => {
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
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
};
