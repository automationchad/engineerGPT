import React, { useState, MouseEvent } from "react";
import { ComponentProps } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Loader, Sparkles, Database, X, TriangleAlert } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pagination } from "@/components/ui/pagination";
import { ListItemIcon } from "@mui/material";
import { cn } from "@/lib/utils";
import { useMail } from "./use-mail";

interface Question {
  id: number;
  question: string;
  answer: {
    text: string | null;
  };
  aiAnswer?: string; // Add this line to include the AI-generated answer
  selected: boolean;
  labels: string[];
  reviewer: {
    name: string;
  };
  assignee: {
    name: string;
  };
}

interface QuestionListProps {
  items: Question[];
  editedAnswers: EditedAnswer[];
  aiAnswers: { [key: number]: string };
  selectedId: number;
  selectedQuestions: number[];
  onSelectQuestion: (id: number) => void;
  isGenerating: boolean;
  onSelectQuestions: (ids: number[]) => void;
}

const sanitizeHtml = (html: string) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

export default function QuestionList({
  items = [],
  selectedId,
  selectedQuestions,
  onSelectQuestion,
  onSelectQuestions,
  isGenerating,
  editedAnswers,
  aiAnswers,
}: QuestionListProps) {
  const [mail, setMail] = useMail();
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null);

  const getDisplayAnswer = (item: Question) => {
    const editedAnswer = editedAnswers.find((ea) => ea.id === item.id);
    if (editedAnswer) {
      return editedAnswer.answer;
    }
    return aiAnswers[item.id] || item.answer.text || "";
  };

  const handleItemClick = (item: Question) => {
    if (!isGenerating) {
      setMail({ ...mail, selected: item.id, aiAnswer: item.aiAnswer });
    }
  };

  const handleCheckboxChange = (item: Question, index: number, checked: boolean) => {
    if (!isGenerating) {
      if (lastSelectedIndex !== null && window.event && (window.event as MouseEvent).shiftKey) {
        const start = Math.min(lastSelectedIndex, index);
        const end = Math.max(lastSelectedIndex, index);
        const newSelectedQuestions = items.slice(start, end + 1).map((q) => q.id);
        onSelectQuestions(newSelectedQuestions);
      } else {
        onSelectQuestion(item.id);
        setLastSelectedIndex(index);
      }
    }
  };

  return (
    <ScrollArea className=" ">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items
          // .filter(question => !showEmptyOnly || question.answer.text)
          .map((item, index) => (
            <div key={item.id} className="relative">
              <button
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all w-full",
                  (selectedQuestions.includes(item.id)) && "bg-muted", 
                  item.id === selectedId && "bg-accent-foreground text-accent",
                  isGenerating && "pointer-events-none opacity-50"
                )}
                onClick={(event) => handleItemClick(item)}>
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{item.assignee.name || "No name"}</div>
                      {/* {item.question.length < 50 && !item.answer.text ? (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                        </span>
                      ) : item.question.length > 50 && !item.answer.text ? (
                        <span className="relative flex h-2 w-2">
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-warning"></span>
                        </span>
                      ) : null} */}
                    </div>
                    <div
                      className={cn(
                        "ml-auto text-xs",
                        mail.selected === item.id ? "text-foreground" : "text-muted-foreground"
                      )}>
                      {/* {formatDistanceToNow(new Date(item.date), {
                      addSuffix: true,
                    })} */}
                    </div>
                  </div>
                  <div className="text-xs font-medium">{item.question}</div>
                </div>
                <div className="line-clamp-2 text-xs text-muted-foreground">
                  {sanitizeHtml(editedAnswers[item.id] || item.answer.text || "").substring(0, 300)}
                </div>

                <div className="flex w-full items-center justify-end gap-2">
                  {item.answer.text?.includes("Not enough information to answer properly") && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="destructive" size="sm" className="text-xs text-white">
                            M
                          </Badge>
                        </TooltipTrigger>

                        <TooltipContent>
                          <div className="flex flex-col text-xs gap-2 p-1">
                            <div className="">Edited • Problems with the question</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {item.isEdited && !item.answer.text?.includes("Not enough information to answer properly") && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="default" size="sm" className="text-xs">
                            M
                          </Badge>
                        </TooltipTrigger>

                        <TooltipContent>
                          <div className="flex flex-col text-xs gap-2 p-1">
                            <div className="">Edited</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </button>
              <div className="absolute top-2 right-2">
                <Checkbox
                  checked={selectedQuestions.includes(item.id)}
                  onCheckedChange={(event) => handleCheckboxChange(item, index, event)}
                  onClick={(e) => e.stopPropagation()}
                  disabled={isGenerating}
                />
              </div>
            </div>
          ))}
      </div>
    </ScrollArea>
  );
}
