"use server";

import { ConvertDialog } from "@/components/interfaces/Projects/ConversionDialog/ConvertDialog";
import { createClient } from "@/lib/services/supabase/server";
import { Button } from "@/components/ui/button";
import GroupAnswerSettings from '@/components/interfaces/Messages/ProjectSettings'
import ProjectLoading from "@/components/layout/Loading/ProjectLoading";
import { Project } from "@/types";
import { CommitConfirmDialog } from "@/components/interfaces/Projects/CommitDialog/CommitDialog";
import FilteredProjectQuestions from "@/components/layout/ProjectLayout";

async function getProject(project_id: string): Promise<Project> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*, sections(*, entries(*, ai_answers(*)))")
    .eq("id", project_id)
    .limit(1)
    .single();
  console.log("PROJECT DATA", data);
  return data;
}

async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const { data: loopioData, error: loopioError } = await supabase
    .from("users")
    .select("*, user_teams(*, teams(*))")
    .eq("id", user.id)
    .limit(1)
    .single();
  return loopioData;
}


export default async function ProjectPage({ params }: { params: { project_id: string } }) {
  const project = await getProject(params.project_id as string);
  const user = await getUser();

  // Return true or false if ALL of the entries are marked as finalized
  const allEntriesFinalized = project.sections.every((section) =>
    section.entries.every((entry) => entry.ai_answers.every((answer) => answer.is_finalized))
  );

  return (
    <>
      <div className="h-screen overflow-hidden flex flex-col">
        <header className="top-0 z-10 flex justify-between h-[60px] flex-shrink-0 items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-medium">{project.name || "Project"}</h1>
          <div className="flex gap-2">
            
            {project.is_converted && (
              <CommitConfirmDialog projectId={project.id} disabled={!allEntriesFinalized || project.status === 'processing'} onCommit={null} />
            )}
            <GroupAnswerSettings disabled={project.status === 'processing'}/>
            <ConvertDialog project={project} user={user} disabled={project.status === 'processing'}/>
          </div>
        </header>
        <main className="flex-grow overflow-hidden">
          <div className="col-span-6 grid grid-cols-6 h-full bg-background">
            {project.status !== "processing" ? (
              <FilteredProjectQuestions sections={project.sections} user={user} />
            ) : (
              <div className="flex items-center col-span-6 justify-center h-full">
                <ProjectLoading />
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
