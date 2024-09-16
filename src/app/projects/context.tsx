"use client";

import React, { useState, useEffect, createContext, useContext } from "react";

export interface Project {
  id: number;
  name: string;
  companyName: string;
  projectType: string;
  dueDate: string;
  // Add other project properties as needed
}

const ProjectsContext = createContext<Project[]>([]);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        // if (!response.ok) {
        //   throw new Error("Failed to fetch projects");
        // }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }

    fetchProjects();
  }, []);

  return <ProjectsContext.Provider value={projects}>{children}</ProjectsContext.Provider>;
}

export const useProjects = () => useContext(ProjectsContext);
