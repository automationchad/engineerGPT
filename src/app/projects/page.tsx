"use client";

import React, { useMemo, useContext } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { useProjects } from "./context";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const description =
  "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.";

interface Project {
  id: number;
  name: string;
  description: string;
  updated_at: string;
  dueDate: string;
  companyName: string;
  projectType: string;
}

export default function ProjectsPage() {
  const projects = useProjects();

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [projects]);

  return (
    <div className="h-full">
      <header className="sticky top-0 z-10 flex h-[60px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-medium">Projects</h1>
      </header>
      <main className="h-full max-h-screen flex-grow overflow-hidden">
        <div className="col-span-6 h-full p-6">
          <Table className="h-full border rounded">
            <TableHeader className="bg-muted rounded-md">
              <TableRow className="rounded-md">
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="rounded-md">
              {sortedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Link href={`/projects/${project.id}`} className="font-medium hover:underline">
                      {project.companyName}
                    </Link>
                  </TableCell>
                  <TableCell>{project.projectType}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {format(new Date(project.dueDate), "MMM dd, yyyy")}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
