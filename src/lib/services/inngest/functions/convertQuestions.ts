import { inngest } from "../client";
import { createClient } from "@/lib/services/supabase/server";
import { LoopioAPI } from "@/lib/services/loopio/api";
import { defaultSettings, defaultDB } from "@/lib/constants";
import { useUser } from "@/hooks/use-user";

export const convertQuestions = inngest.createFunction(
  { id: "convertQuestions" },
  { event: "project/convert-questions" },
  async ({ event, step }) => {
    const { projectId, conversionId, user } = event.data;

    const supabase = createClient();

    try {
      console.log(`Starting conversion process for conversionId: ${conversionId}`);

      // Check if conversion is already in progress
      const { data: conversionData } = await supabase
        .from("conversions")
        .select("status, processed_questions")
        .eq("id", conversionId)
        .single();

      if (conversionData?.status === "completed") {
        console.log(`Conversion ${conversionId} already completed. Skipping.`);
        return { success: true, totalProcessedEntries: conversionData.processed_questions };
      }

      await supabase.from("conversions").update({ status: "in_progress" }).eq("id", conversionId);

      const { data: sections } = await supabase
        .from("sections")
        .select("id, loopio_id, name, context")
        .eq("project_id", projectId)
        .order("loopio_id", { ascending: true });

      let totalProcessedEntries = conversionData?.processed_questions || 0;
      const teamIds = user.user_teams.map((userTeam) => userTeam.teams.loopio_id);

      for (const section of sections) {
        await step.run(`process-section-${section.id}`, async () => {
          console.log(`Processing section ${section.id}: ${section.name}`);
          const { data: entries, error: entriesError } = await supabase
            .from("entries")
            .select("*")
            .eq("section_id", section.id);

          if (!entries || entriesError) {
            console.error(`Error fetching entries for section ${section.id}:`, entriesError);
            return;
          }

          const entriesWithTeam = entries.filter(
            (entry) => teamIds.includes(entry.assignee_id) || entry.assignee_id === user.loopio_id
          );

          for (const entry of entriesWithTeam) {
            try {
              // Check if this entry has already been processed within the current conversion
              const { data: existingAnswer } = await supabase
                .from("ai_answers")
                .select("id")
                .eq("question_id", entry.id)
                .eq("conversion_id", conversionId)
                .single();

              // Add extra logic to check if the entry has been finalized across all conversions

              const { data: finalizedEntry } = await supabase
                .from("ai_answers")
                .select("id")
                .eq("question_id", entry.id)
                .eq("is_finalized", true)
                .single();

              
              if (existingAnswer) {
                console.log(`Entry ${entry.id} already processed. Skipping.`);
                continue;
              }

              if (finalizedEntry) {
                console.log(`Entry ${entry.id} already finalized. Skipping.`);
                continue;
              }

              const aiAnswer = await fetchAIAnswer(entry.query, section.context);

              await supabase
                .from("ai_answers")
                .insert({ question_id: entry.id, conversion_id: conversionId, content: aiAnswer })
                .select("*");

              totalProcessedEntries++;

              // Update progress every 10 entries

              await supabase
                .from("conversions")
                .update({ processed_questions: totalProcessedEntries })
                .eq("id", conversionId);
              console.log(`Processed ${totalProcessedEntries} entries for conversion ${conversionId}`);
            } catch (error) {
              console.error(`Error processing entry ${entry.id}:`, error);
              // Continue with the next entry instead of stopping the entire process
            }
          }
        });
      }

      console.log(`Completed processing all sections for conversionId: ${conversionId}`);

      await supabase
        .from("conversions")
        .update({
          status: "completed",
          completed_at: new Date().toISOString(),
          processed_questions: totalProcessedEntries,
        })
        .eq("id", conversionId);

      console.log(`Conversion completed successfully for conversionId: ${conversionId}`);

      await supabase.from("projects").update({ is_converted: true }).eq("id", projectId);

      return { success: true, totalProcessedEntries };
    } catch (error) {
      console.error(`Error converting questions for conversionId: ${conversionId}:`, error);
      await supabase
        .from("conversions")
        .update({ status: "failed", error_message: (error as Error).message })
        .eq("id", conversionId);
      throw error;
    }
  }
);

async function fetchAIAnswer(query: string, context: string): Promise<string> {
  try {
    const response = await fetch("http://localhost:3000/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        context,
        fileContent: "", // Add file content if needed
        options: defaultSettings, // Add any additional options if needed
        db: defaultDB, // Replace with the appropriate database name
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    let result = "";

    while (true) {
      const { done, value } = await reader?.read();
      if (done) break;
      result += new TextDecoder().decode(value);
    }
    return result;
  } catch (error) {
    console.error("Error fetching AI answer:", error);
    throw error;
  }
}
