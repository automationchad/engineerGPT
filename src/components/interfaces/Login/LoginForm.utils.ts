"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import { createClient } from "@/lib/services/supabase/server";

export async function login({ email, password }: { email: string; password: string }) {
  const supabase = createClient();

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  revalidatePath("/", "layout");
  redirect("/projects");
}

// Update the signup function similarly
export async function signup(formData: { email: string; password: string }) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/projects");
}
