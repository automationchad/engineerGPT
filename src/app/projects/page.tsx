"use server";

import { columns } from "@/components/interfaces/Projects/ProjectsTable/ProjectsTable.constants";
import { DataTable } from "@/components/interfaces/Projects/ProjectsTable/ProjectsTable";
import { createClient } from "@/lib/services/supabase/server";
import { revalidatePath } from "next/cache";
import { Project } from "@/types";

const supabase = createClient();

async function getData(): Promise<Project[]> {
  const { data, error } = await supabase.from("project").select("*");
  return data as Project[];
}

export default async function ProjectsPage() {
  const projects = await getData();

  return (
    <div className="h-full">
      <header className="sticky top-0 z-10 flex h-[60px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-medium">Projects</h1>
      </header>
      <main className="h-full max-h-screen flex-grow overflow-hidden">
        <div className="col-span-6 h-full p-6">
          <DataTable columns={columns} data={projects} />
        </div>
      </main>
    </div>
  );
}
