"use client";

import { toast } from "sonner";

import { useState } from "react";
import { Icons } from "@/components/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { login } from "./LoginForm.utils";
import { Loader2 } from "lucide-react";
import { headers } from "next/headers";
import { createClient } from "@/lib/services/supabase/client";
import { redirect } from "next/navigation";

const signInSchema = z.object({
  email: z.string().email("Must be a valid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  async function signInWithAzure() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "email",
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error signing in with Azure:", error);
      setError("Failed to sign in with Microsoft");
    } else if (data.url) {
      window.location.href = data.url;
    }
  }

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Define a submit handler
  async function onSignIn({ email, password, rememberMe }: { email: string; password: string; rememberMe: boolean }) {
    const toastId = toast.loading("Signing in...");
    try {
      await login({ email, password });
      toast.success("Signed in successfully", { id: toastId });
    } catch (error: any) {
      if (error.message.toLowerCase() === "email not confirmed") {
        return toast.error("Account has not been verified, please check the link sent to your email", { id: toastId });
      }

      toast.error(error.message, { id: toastId });
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-500">Sign into account</p>
      </div>
      {error !== null && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col gap-6">
        <Button variant="outline" onClick={signInWithAzure}>
          <Icons.microsoft className="mr-2 h-4 w-4" />
          Microsoft
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSignIn)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Remember me</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <div></div>
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
