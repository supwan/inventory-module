import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import db from "./db";
import * as schema from "@/lib/db/schema";
import { admin } from "better-auth/plugins";
import { headers } from "next/headers";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: true },
  plugins: [admin()],
});

export const getSession = async () =>
  await auth.api.getSession({
    headers: await headers(),
  });
