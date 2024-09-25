"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import AIAnswerArea from "@/components/interfaces/Projects/Question/AIAnswer";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/services/supabase/client";
import { Toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Lock, ShieldCheck, MoreHorizontal, User as UserIcon, Users, Sparkle } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { sanitizeHtml } from "@/lib/utils";
import { Question, User } from "@/types";

interface QuestionCardProps {
  item: Question;
  user: User;
  status: "active" | "inactive";
}

const QuestionCard: React.FC<QuestionCardProps> = ({ item, user }) => {
  // const handleDelete = async (id: string) => {
  //   const supabase = createClient();
  //   const { error } = await supabase.from("entries").delete().eq("id", id);
  // };

  const isProtected = !(
    item.assignee_id === user.loopio_id || user.user_teams.some((team) => team.teams.loopio_id === item.assignee_id)
  );

  const isTeamAssignment = user.user_teams.some((team) => team.teams.loopio_id === item.assignee_id);

  return (
    <Card className={`w-full shadow-sm overflow-hidden ${isProtected ? "border-muted" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-muted py-1 px-4">
        <div className="flex items-center space-x-2">
          {isProtected ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>This question is assigned to another user</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {isTeamAssignment ? (
                    <Users className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isTeamAssignment ? "Team assignment" : "Individual assignment"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <h3 className="text-sm max-w-4xl truncate">{item.query}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={isProtected} className="m-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Sparkle className="h-4 w-4 mr-2" />
              Generate answer
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => handleDelete(item.id)}>Delete</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent
        className={cn("p-4 text-sm flex flex-col items-start gap-4", {
          "opacity-70 text-muted-foreground": isProtected,
        })}>
        {item.answer && <p className="text-xs ">{item.answer}</p>}
        {item.ai_answers.map(({ id, content, is_finalized, created_at }, index) => (
          <AIAnswerArea key={index} id={id} is_finalized={is_finalized} answer={content} isLoading={false} />
        ))}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
