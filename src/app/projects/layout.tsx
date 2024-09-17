"use client";

import React from "react";
import Sidebar from "@/components/interfaces/Projects/Sidebar";
import { ProjectsProvider, useProjects } from "./context";

interface LayoutProps {
  children: React.ReactNode;
  params: { project_id?: string };
}

function ProjectsLayoutContent({ children, params }: LayoutProps) {
  const projects = useProjects();
  const { project_id } = params;

  console.log("Projects", projects);

  const currentProject = project_id ? projects.find((p) => p.id.toString() === project_id) : null;
  console.log("Current Project", currentProject);

  return (
    <div className="hidden flex-col md:flex h-full">
      <div className="grid w-full h-full pl-[56px]">
        <Sidebar />
        <div className="flex flex-col h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsLayout(props: LayoutProps) {
  return (
    <ProjectsProvider>
      <ProjectsLayoutContent {...props} />
    </ProjectsProvider>
  );
}
