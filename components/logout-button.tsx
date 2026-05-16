"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { redirect, RedirectType } from "next/navigation";

export default function LogOutButton() {
  return (
    <Button
      variant="secondary"
      onClick={() => {
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              redirect("/login", RedirectType.push);
            },
          },
        });
      }}
    >
      Log Out
    </Button>
  );
}
