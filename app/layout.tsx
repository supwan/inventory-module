import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/auth-provider";
import { auth, getSession } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Inventory Request Module",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en" className={cn("dark h-full antialiased", inter.className)}>
      <body>
        <AuthProvider session={session as typeof auth.$Infer.Session}>
          <main className="mx-auto max-w-200 px-4">
            {children}
            <nav className="text-muted-foreground mt-4 py-4 text-center text-xs">
              Copyright @ {new Date().getFullYear()} Wan Isa
            </nav>
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
