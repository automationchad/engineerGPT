"use client";

import React from "react";
import Sidebar from "@/components/interfaces/Projects/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  params: { project_id?: string };
}

function SettingsLayoutContent({ children, params }: LayoutProps) {
  return (
    <div className="hidden flex-col md:flex h-full">
      <div className="grid w-full h-full pl-[56px]">
        <Sidebar />
        <div className="flex flex-col h-full">{children}</div>
      </div>
    </div>
  );
}

export default function ProjectsLayout(props: LayoutProps) {
  return <SettingsLayoutContent {...props} />;
}
