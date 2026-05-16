import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Inventory Request Module",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.className, "dark")}
    >
      <body>
        <main className="mx-auto max-w-200 px-4">
          {children}
          <nav className="text-muted-foreground mt-4 py-4 text-center text-xs">
            Copyright @ {new Date().getFullYear()} Wan Isa
          </nav>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
