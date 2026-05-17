import { auth } from "@/lib/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SUCCESS = (content?: any) => ({ success: true, content });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ERROR = (content: any) => ({ success: false, content });

export const isAdmin = (session: typeof auth.$Infer.Session | null) =>
  session?.user && session?.user.role === "Admin";
