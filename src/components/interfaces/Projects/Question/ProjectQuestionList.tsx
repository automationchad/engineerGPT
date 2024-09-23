"use client";

import React, { useState } from "react";
import QuestionCard from "./ProjectQuestionCard";
import { Section } from "@/types";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { List, Filter } from "lucide-react";


interface Question {
  id: string;
  query: string;
  answer: string;
  status: "active" | "inactive";
}

interface ProjectQuestionListProps {
  items: Section[];
}

const ProjectQuestionList: React.FC<ProjectQuestionListProps> = ({ items, user }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAssignedOnly, setShowAssignedOnly] = useState(false);

  const teamIds = user.user_teams.map((userTeam) => userTeam.teams.loopio_id);
  
  const filteredItems = items
    .map((section) => ({
      ...section,
      entries: section.entries.filter(
        (question) =>
          question.query.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (!showAssignedOnly || teamIds.includes(question.assignee_id) || question.assignee_id === user.id)
      ),
    }))
    .filter((section) => section.entries.length > 0);
  return (
    <div className="relative">
      <div className="flex justify-between items-center gap-4 sticky top-0 inset-0 bg-background z-50 py-4">
        <Input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className=""
        />
        <Toggle
          variant="outline"
          aria-label="Toggle all"
          pressed={showAssignedOnly}
          onPressedChange={setShowAssignedOnly}>
          <Filter className="w-4 h-4" />
        </Toggle>
      </div>
      {filteredItems.map((section) => (
        <div key={section.id} className="flex flex-col gap-4">
          <h3>{section.name}</h3>
          {section.entries.map((question) => (
            <QuestionCard key={question.id} item={question} user={user} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectQuestionList;
