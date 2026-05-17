"use client";

import { auth } from "@/lib/auth";
import { createContext } from "react";

export const AuthContext = createContext<typeof auth.$Infer.Session | null>(
  null,
);

export default function AuthProvider({
  session,
  children,
}: {
  session: typeof auth.$Infer.Session;
  children: React.ReactNode;
}) {
  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
}
