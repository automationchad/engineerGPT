"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Pencil, Trash2, BadgeCheck } from "lucide-react";
import { createClient } from "@/lib/services/supabase/client";

interface AIAnswerAreaProps {
  answer: string;
  isLoading: boolean;
  id: string;
  is_finalized: boolean;
}

const AIAnswerArea: React.FC<AIAnswerAreaProps> = ({ id, is_finalized, answer, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(answer);
  const [isAccepted, setIsAccepted] = useState(is_finalized);
  const [isRejected, setIsRejected] = useState(false);

  const isDisabled = isAccepted || is_finalized;

  const handleAcceptAnswer = async (id: string) => {
    setIsEditing(false);
    setEditedAnswer(editedAnswer);

    try {
      const supabase = createClient();
      const { error } = await supabase.from("ai_answers").update({ is_finalized: true }).eq("id", id);
      if (error) {
        console.error(error);
      }
      setIsAccepted(true);
    } catch (error) {
      setIsAccepted(false);
      console.error(error);
    }
  };

  const handleRejectAnswer = async (id: string) => {
    setIsEditing(false);
    const supabase = createClient();
    const { data, error } = await supabase.from("ai_answers").delete().eq("id", id);
    // make answer blank
    setIsRejected(true);
    setEditedAnswer("");
  };

  if (isRejected) {
    return null; // Or return a placeholder component if you prefer
  } else
    return (
      <div className="ai-answer-area w-full h-full">
        <div className="bg-ai-foreground flex items-center border border-ai-border text-ai rounded-md p-4 relative">
          <div className="flex items-start justify-start w-full h-min gap-2">
            {/* <h3 className="text-sm font-medium">
              <Sparkles className="mr-2 h-4 w-4" />
            </h3> */}
            <div className="text-sm w-full">
              {isEditing ? (
                <Textarea
                  value={editedAnswer}
                  onChange={(e) => setEditedAnswer(e.target.value)}
                  className="w-full min-h-content leading-normal m-0 bg-transparent border-none p-0 resize-none focus:ring-0 focus:outline-none active:outline-none active:ring-0"
                />
              ) : (
                editedAnswer || answer
              )}
            </div>
            <div className="flex flex-col items-center gap-1">
              {isAccepted ? (
                <div className="rounded-md p-0.5 bg-success-foreground border border-success/20">
                  <BadgeCheck className="h-4 w-4 text-success" />
                </div>
              ) : isEditing ? (
                <>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedAnswer(editedAnswer);
                    }}
                    className="hover:bg-success-foreground">
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedAnswer(answer);
                    }}
                    className="hover:bg-destructive-foreground">
                    <X className="h-3 w-3" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => handleAcceptAnswer(id)}
                    className="hover:bg-success-foreground">
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button size="xs" variant="outline" onClick={() => setIsEditing(true)} className="hover:bg-accent">
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => handleRejectAnswer(id)}
                    className="hover:bg-destructive-foreground">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default AIAnswerArea;
