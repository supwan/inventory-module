import LogOutButton from "@/components/logout-button";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="mb-20 flex items-center justify-between py-4">
        <Link href="/" className="font-semibold">
          Inventory Module
        </Link>
        <LogOutButton />
      </nav>
      {children}
    </>
  );
}
