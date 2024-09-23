"use server";

import { createClient } from "@/lib/services/supabase/server";
import { inngest } from "@/lib/services/inngest/client";

export async function createProject(formData: FormData) {
  console.log("createProject action called"); // Add this log
  const supabase = createClient();

  try {

    const name = formData.get("name") as string;
    const database = JSON.parse(formData.get("database") as string);
    const dataSource = formData.get("dataSource") as string;
    const loopioId = formData.get("loopioId") as string | null;
    const document = formData.get("document") as File | null;

    console.log("Inserting project into Supabase"); // Add this log
    const { data: project, error } = await supabase
      .from("projects")
      .insert({
        name,
        database: database.value,
        data_source: dataSource,
        document: document ? document.name : null,
        loopio_id: loopioId,
      })
      .select()
      .single();

    if (error) throw error;

    console.log("Project created:", project); // Add this log

    if (dataSource === "loopio" && loopioId) {
      console.log("Sending Inngest event"); // Add this log
      try {
        await inngest.send({
          name: "project/get-loopio-data",
          data: {
            projectId: project.id,
            loopioId: loopioId,
          },
        });
      } catch (inngestError) {
        console.error("Error sending Inngest event:", inngestError);
      }
    }

    return { project: JSON.parse(JSON.stringify(project)), error: null };
  } catch (error) {
    console.error("Error creating project:", error);
    return { project: null, error: error.message };
  }
}
