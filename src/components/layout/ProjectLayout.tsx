"use client";

import React, { useState } from "react";
import SectionsList from "@/components/interfaces/Projects/Section/Sections";
import ProjectQuestionList from "@/components/interfaces/Projects/Question/ProjectQuestionList";
import { Section, User } from "@/types";

interface FilteredProjectQuestionsProps {
  sections: Section[];
  user: User;
}

const FilteredProjectQuestions: React.FC<FilteredProjectQuestionsProps> = ({ sections, user }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const filteredSections = selectedSectionId
    ? sections.filter((section) => section.id === selectedSectionId)
    : sections;

  const handleSectionClick = (sectionId: string) => {
    setSelectedSectionId(sectionId === selectedSectionId ? null : sectionId);
  };

  return (
    <>
    
      <div className="col-span-4 border-r h-full border-border overflow-y-auto flex flex-col p-4 pt-0">
        <ProjectQuestionList items={filteredSections} user={user} />
      </div>

      <div className="col-span-2 h-full flex flex-col gap-4 p-4 border-r border-muted overflow-hidden">
        <SectionsList sections={sections} onSectionClick={handleSectionClick} selectedSectionId={selectedSectionId} />
      </div>
    </>
  );
};

export default FilteredProjectQuestions;
