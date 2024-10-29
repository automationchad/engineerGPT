"use server";

import { createClient } from "@/lib/services/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();

export const createPlaygroundHistory = async (data: any, settings: any, answer: string) => {
  const { error: historyError } = await supabase
    .from("playground_history")
    .insert({ response: answer, settings, query: data.query, knowledgeId: data.db }); // Adjust fields as necessary

  if (historyError) {
    throw historyError;
  }
  revalidatePath("/playground", "layout");
};
