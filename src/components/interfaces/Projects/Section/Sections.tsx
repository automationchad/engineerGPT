"use client";

import React from "react";

import { Section } from "@/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash, Settings, Plus, Filter } from "lucide-react";
import { SectionEditDialog } from "./section-edit-dialog";
import { NewSectionDialog } from "./new-section-dialog";
import { SectionDeleteDialog } from "./section-delete-dialog";

interface SectionsListProps {
  sections: Section[];
  onEdit: (sectionId: string) => void;
  onDelete: (sectionId: string) => void;
  onAddSection: () => void;
  onSectionClick: (sectionId: string) => void;
  selectedSectionId: string | null;
}

const SectionsList: React.FC<SectionsListProps> = ({
  sections,
  onEdit,
  onDelete,
  onAddSection,
  onSectionClick,
  selectedSectionId,
}) => {
  return (
    <div className="sections-list">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Sections ({sections.length})</h2>
        <NewSectionDialog onAddSection={onAddSection} />
      </div>
      <ul className="flex flex-col gap-4">
        {sections.map((section) => (
          <li
            key={section.id}
            className={`section-item border border-border rounded-md overflow-hidden ${
              selectedSectionId === section.id ? "border-2 border-secondary-foreground" : ""
            }`}>
            <div className="section-title border-b border-border p-2 rounded-none justify-between items-center flex flex-row text-sm w-full">
              {section.name}
              <Button
                variant="outline"  
                onClick={() => onSectionClick(section.id)}
                className={`${selectedSectionId === section.id ? "bg-muted" : "bg-transparent"} 'w-auto`}>
                <Filter className="w-3 h-3" />
              </Button>
            </div>
            <div className="section-actions w-full gap-2 flex h-10">
              <SectionEditDialog section={section} onEditSection={onEdit} onClick={(e) => e.stopPropagation()} />
              <Separator orientation="vertical" className="h-full bg-border" />
              <SectionDeleteDialog />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionsList;
