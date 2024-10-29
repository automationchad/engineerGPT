import { inngest } from "../client";
import { createClient } from "@/lib/services/supabase/server";
import { LoopioAPI } from "@/lib/services/loopio/api";

export const getLoopioData = inngest.createFunction(
  { id: "getLoopioData" },
  { event: "project/get-loopio-data" },
  async ({ event, step }) => {
    const { projectId, loopioId } = event.data;
    const supabase = createClient();
    const loopioApi = new LoopioAPI();

    let createdSections: any[] = [];
    let createdEntries: any[] = [];

    try {
      // Step 1: Get Loopio project sections
      await step.run("get-loopio-sections", async () => {
        let hasMore = true;
        let page = 1;
        while (hasMore) {
          const { items, totalPages, totalItems } = await loopioApi.getSections(loopioId, page);
          const { data: sections, error } = await supabase
            .from("sections")
            .insert(
              items.map((section) => ({
                name: section.name,
                project_id: projectId,
                loopio_id: section.id,
              }))
            )
            .select("*");

          if (error) {
            console.error("Error creating sections:", error);
            throw error;
          }
          createdSections.push(...sections);
          hasMore = totalPages > page;
          page = hasMore ? page + 1 : 1;
        }
      });

      // Step 2: Get Loopio entries
      await step.run("get-loopio-entries", async () => {
        let hasMore = true;
        let page = 1;
        while (hasMore) {
          const { items, totalPages, totalItems } = await loopioApi.getEntries(loopioId, page);
          console.log("ITEMS", items);
          const entriesData = await Promise.all(
            items.map(async (entry) => {
              const { data: section } = await supabase
                .from("sections")
                .select("id")
                .eq("loopio_id", entry.section.id)
                .limit(1)
                .single();
              return {
                query: entry.question,
                answer: entry.answer.text,
                section_id: section?.id,
                loopio_id: entry.id,
                assignee_id: entry.assignee?.id,
                reviewer_id: entry.reviewer?.id,
              };
            })
          );

          // Insert prepared entries
          const { error } = await supabase.from("entries").insert(entriesData).select();

          if (error) {
            console.error("Error creating entries:", error);
            throw error;
          }
          hasMore = totalPages > page;
          page = hasMore ? page + 1 : 1;
        }
      });

      // Step 3: Mark project as ready
      await step.run("update-project-status", async () => {
        const { error } = await supabase.from("projects").update({ status: "ready" }).eq("id", projectId);
        if (error) {
          console.error("Error updating project status:", error);
          throw error;
        }
      });
      return { success: true };
    } catch (error) {
      console.error("Error ingesting Loopio data:", error);
      // Update project status to 'error'
      await supabase.from("projects").update({ status: "error" }).eq("id", projectId);
      throw error;
    }
  }
);
