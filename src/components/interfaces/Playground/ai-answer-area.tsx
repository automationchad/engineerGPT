"use client";

import React, { useState } from "react";
import { Sparkles, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIAnswerAreaProps {
  answer: string;
  isLoading: boolean;
  sources: {
    url: string;
    relevance: number;
    content: string;
  }[];
}

const AIAnswerArea: React.FC<AIAnswerAreaProps> = ({ answer, isLoading, sources = [] }) => {
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
      <div className="mt-4">
        <h4 className="text-xs text-muted-foreground mb-2">References</h4>
        <div className="flex flex-col space-y-2">
          {sources.map((source, index) => (
            <div className="border border-gray-300 p-4 rounded-md space-y-2" key={index}>
              <div className="flex flex-row items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
                <span className="text-xs text-muted-foreground">90%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAnswerArea;
