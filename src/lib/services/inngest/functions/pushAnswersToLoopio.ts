import { inngest } from "../client";
import { createClient } from "@/lib/services/supabase/server";
import { LoopioAPI } from "@/lib/services/loopio/api";

export const pushAnswersToLoopio = inngest.createFunction(
  { id: "pushAnswersToLoopio" },
  { event: "project/push-answers-to-loopio" },
  async ({ event, step }) => {
    const { projectId, commitId } = event.data;
    const supabase = createClient();
    const loopioAPI = new LoopioAPI();

    try {
      console.log(`Starting push process for commitId: ${commitId}`);

      await supabase.from("commits").update({ status: "in_progress" }).eq("id", commitId);

      const { data: aiAnswers, error: aiAnswersError } = await supabase
        .from("ai_answers")
        .select("*, entries(id, query, loopio_id)")
        .eq("is_finalized", true)
        .eq("entries.project_id", projectId);

      console.log(aiAnswers);

      if (aiAnswersError) throw aiAnswersError;

      let totalProcessedAnswers = 0;

      for (const aiAnswer of aiAnswers) {
        await step.run(`push-answer-${aiAnswer.id}`, async () => {
          try {
            await loopioAPI.updateEntry(aiAnswer.entries.loopio_id, aiAnswer.content, aiAnswer.entries[0].query);
            // Delete the ai_answer record
            await supabase.from("ai_answers").delete().eq("id", aiAnswer.id);
            totalProcessedAnswers++;
            // Update progress every 10 answers
            if (totalProcessedAnswers % 10 === 0) {
              await supabase.from("commits").update({ processed_answers: totalProcessedAnswers }).eq("id", commitId);
              console.log(`Processed ${totalProcessedAnswers} answers for commit ${commitId}`);
            }
          } catch (error) {
            console.error(`Error pushing answer ${aiAnswer.id} to Loopio:`, error);
            // Continue with the next answer instead of stopping the entire process
          }
        });
      }

      console.log(`Completed pushing all answers for commitId: ${commitId}`);

      await supabase
        .from("commits")
        .update({
          status: "completed",
          completed_at: new Date().toISOString(),
          processed_answers: totalProcessedAnswers,
        })
        .eq("id", commitId);

      console.log(`Commit completed successfully for commitId: ${commitId}`);

      return { success: true, totalProcessedAnswers };
    } catch (error) {
      console.error(`Error pushing answers to Loopio for commitId: ${commitId}:`, error);
      await supabase
        .from("commits")
        .update({ status: "failed", error_message: (error as Error).message })
        .eq("id", commitId);
      throw error;
    }
  }
);
