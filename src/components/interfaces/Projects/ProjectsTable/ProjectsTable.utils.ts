"use server";

import { createClient } from "@/lib/services/supabase/server";
import { inngest } from "@/lib/services/inngest/client";
import { FormData } from "./new-project-dialog";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  console.log("createProject action called", formData);
  const supabase = createClient();

  try {
    const { name, database, dataSource, loopioId, document } = formData;

    console.log("Inserting project into Supabase");
    const { data: project, error } = await supabase
      .from("project")
      .insert({
        name,
        knowledgeId: database.value,
        dataSource: dataSource,
        loopioId: loopioId,
      });

    if (error) {
      console.error("Error creating project:", error);
      throw error;
    }

    console.log("Project created:", project);

    if (dataSource === "loopio" && loopioId) {
      console.log("Sending Inngest event");
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

    revalidatePath("/projects");
    redirect(`/projects/${project.id}`);

    return { project: JSON.parse(JSON.stringify(project)), error: null };
  } catch (error: any) {
    console.error("Error creating project:", error);
    return { project: null, error: error.message };
  }
}
