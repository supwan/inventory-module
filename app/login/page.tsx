import Link from "next/link";
import { LoginPageClient } from "./page-client";

export default function Page() {
  return (
    <div>
      <nav className="mb-20 flex items-center justify-between py-4">
        <Link href="/" className="font-semibold">
          Inventory Module
        </Link>
      </nav>
      <LoginPageClient />
    </div>
  );
}
