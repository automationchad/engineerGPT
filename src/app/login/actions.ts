"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/services/supabase/server";

export async function login(formData: { email: string; password: string; rememberMe: boolean }) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  console.log("Data:", data);
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  } else {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("User:", user);
  }

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
