"use server";

import { createClient } from "@/lib/services/supabase/server";

export async function useUser() {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();
  return { user, error };
}
