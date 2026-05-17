"use client";

import { AuthContext } from "@/components/auth-provider";
import Unauthorized from "@/components/unauthorized";
import { useContext } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useContext(AuthContext);
  if (session?.user.role !== "Admin") return <Unauthorized />;

  return <>{children}</>;
}
