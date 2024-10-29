import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ListCollapse, Text } from "lucide-react";
import { History } from "@/types";

interface HistoryItem {
  id: number;
  query: string;
  response: string;
  createdAt: string;
}

const PlaygroundMessageHistory: React.FC<{ history: History[]; handleShowHistoryItem: (item: History) => void }> = ({
  history,
  handleShowHistoryItem,
}) => {
  return (
    <div className="message-history w-full">
      <ul className="w-full">
        {history?.map((item: HistoryItem) => (
          <li key={item.id} className="w-full hover:bg-muted/20 px-6 py-4 rounded-none cursor-pointer">
            <div className="flex items-start space-x-2">
              <div className="flex-grow min-w-0 ">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="block truncate max-w-[300px] text-left w-full text-sm sm:text-base">
                      {item.response}
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[300px]">{item.query}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="text-muted-foreground text-xs sm:text-sm">
                  {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                </span>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0"
                onClick={() => handleShowHistoryItem(item)}>
                <Text className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaygroundMessageHistory;
