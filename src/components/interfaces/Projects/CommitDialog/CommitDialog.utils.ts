"use server";

import { createClient } from "@/lib/services/supabase/server";
import { inngest } from "@/lib/services/inngest/client";

export async function handleCommit(projectId: string): Promise<{ commitId: string }> {
  const supabase = createClient();

  try {
    // Create a new commit record
    const { data: commit, error } = await supabase
      .from("commits")
      .insert({ project_id: projectId, status: "queued" })
      .select()
      .single();

    if (error) throw error;

    // Trigger the Inngest job using the SDK
    await inngest.send({
      name: "project/push-answers-to-loopio",
      data: { projectId, commitId: commit.id },
    });

    return { commitId: commit.id };
  } catch (error) {
    console.error("Error starting commit:", error);
    throw error;
  }
}