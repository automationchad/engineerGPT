"use client";

import React, { useState } from "react";
import { Sparkles, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIAnswerAreaProps {
  answer: string;
  isLoading: boolean;
}

const AIAnswerArea: React.FC<AIAnswerAreaProps> = ({ answer, isLoading }) => {
  const [copied, setCopied] = useState(false); // State to track if copied

  const handleCopy = () => {
    navigator.clipboard.writeText(answer); // Copy answer to clipboard
    setCopied(true); // Set copied state to true
    setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
  };
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
          <button onClick={handleCopy} className="ml-12 disabled:opacity-50" disabled={copied || isLoading || !answer}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {/* Copy button with icon change */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAnswerArea;
