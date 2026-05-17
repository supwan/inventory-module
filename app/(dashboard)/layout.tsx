"use client";

import { AuthContext } from "@/components/auth-provider";
import LogOutButton from "@/components/logout-button";
import Link from "next/link";
import { useContext } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useContext(AuthContext);
  const userRole = session?.user.role;

  return (
    <>
      <nav className="mb-20 flex items-center justify-between py-4">
        <Link href="/" className="font-semibold">
          Inventory Module
        </Link>
        <div className="flex items-center justify-center gap-2">
          <UserRoleDiplay role={userRole ?? "Employee"} />
          <LogOutButton />
        </div>
      </nav>
      {children}
    </>
  );
}

const UserRoleDiplay = ({ role }: { role: string }) => (
  <div className="text-sm">
    <span className="font-semibold">Role: </span>
    <span>{role}</span>
  </div>
);
