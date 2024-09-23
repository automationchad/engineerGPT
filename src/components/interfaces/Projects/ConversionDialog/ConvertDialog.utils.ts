"use server";

import { createClient } from "@/lib/services/supabase/server";
import { inngest } from "@/lib/services/inngest/client";
import { Conversion, User } from "@/types";

export async function handleConvert(project: Project, user: User, conversionId: string): Promise<Conversion> {
  const supabase = createClient();

  // Get total number of questions for the project

  // Filter the entries to only includes where

   const teamIds = user.user_teams.map((userTeam) => userTeam.teams.loopio_id);

  const totalQuestions = project.sections.reduce((acc, section) => {
    const filteredEntries = section.entries.filter(
      (entry) => teamIds.includes(entry.assignee_id) || entry.assignee_id === user.id
    );
    return acc + filteredEntries.length;
  }, 0);

  // Create a new conversion record
  const { data: newConversion, error } = await supabase
    .from("conversions")
    .insert({
      project_id: project.id,
      status: "queued",
      total_questions: totalQuestions,
      processed_questions: 0,
    })
    .select("*")
    .single();

  if (error) {
    console.error("Error creating conversion:", error);
    throw error;
  }

  // Send Inngest event to start processing
  console.log("Sending Inngest event");
  try {
    await inngest.send({
      name: "project/convert-questions",
      data: {
        conversionId: newConversion.id,
        user: user,
        projectId: project.id,
      },
    });
  } catch (inngestError) {
    console.error("Error sending Inngest event:", inngestError);
    await supabase
      .from("conversions")
      .update({ status: "failed", completed_at: new Date(), error_message: "Failed to start conversion process" })
      .eq("id", newConversion.id);
    throw inngestError;
  }

  return newConversion;
}
