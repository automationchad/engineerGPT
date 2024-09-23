"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface AIAnswerAreaProps {
  answer: string;
  isLoading: boolean;
}

const AIAnswerArea: React.FC<AIAnswerAreaProps> = ({ answer, isLoading }) => {
  return (
    <div className="ai-answer-area w-full h-full">
      <div className="bg-ai-foreground flex items-center border border-ai-border text-ai rounded-md p-4 relative">
        <div className="flex items-start justify-start w-full h-min">
          <h3 className="text-sm font-medium">
            <Sparkles className="mr-2 h-4 w-4" />
          </h3>
          <div className="text-sm w-full">
            {isLoading ? (
              <span className="inline-flex items-center">
                <span
                  className="animate-bounce mx-0.5 h-1 w-1 bg-ai rounded-full"
                  style={{ animationDelay: "0ms" }}></span>
                <span
                  className="animate-bounce mx-0.5 h-1 w-1 bg-ai rounded-full"
                  style={{ animationDelay: "150ms" }}></span>
                <span
                  className="animate-bounce mx-0.5 h-1 w-1 bg-ai rounded-full"
                  style={{ animationDelay: "300ms" }}></span>
              </span>
            ) : (
              answer
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnswerArea;
