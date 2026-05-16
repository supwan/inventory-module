"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { redirect, RedirectType } from "next/navigation";

export function LoginPageClient() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.length < 1 || password.length < 1) {
      return toast.error("Please fill all the required fields!");
    }

    authClient.signIn.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          redirect("/", RedirectType.push);
        },
        onError: (ctx) => {
          setIsLoading(false);
          console.log(ctx);
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const register = () => {
    if (email.length < 1 || password.length < 1) {
      return toast.error("Please fill all the required fields!");
    }

    authClient.signUp.email(
      {
        name: "undefined",
        email,
        password,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          redirect("/", RedirectType.push);
        },
        onError: (ctx) => {
          setIsLoading(false);
          console.log(ctx);
          toast.error(ctx.error.statusText);
        },
      },
    );
  };

  return (
    <Card className="mx-auto max-w-100">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={login}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                disabled={isLoading}
              />
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                disabled={isLoading}
              />
            </Field>
            <Field>
              <Button type="submit" disabled={isLoading}>
                Login
              </Button>
              <Button type="button" variant="secondary" onClick={register}>
                Register
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
