import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Store, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@/types";

const PlaygroundHistoryItem = ({ item, onClose }: { item: Message; onClose: () => void }) => {
  const truncatedLength = 200;
  const truncatedResponse =
    item.response?.length > truncatedLength ? item.response?.substring(0, truncatedLength) + "..." : item.response; // Truncate response
  const [isHovered, setIsHovered] = useState(false); // State to manage hover
  const [isCopied, setIsCopied] = useState(false); // State to manage copy icon
  const [showFullResponse, setShowFullResponse] = useState(false); // State to manage full response visibility
  let timer: NodeJS.Timeout | null = null; // Declare timer at the component level

  const handleCopy = () => {
    navigator.clipboard.writeText(item.response);
    setIsCopied(true); // Change icon to check
    setTimeout(() => setIsCopied(false), 3000); // Revert back after 3 seconds
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Start a timeout to show full response after 3 seconds
    timer = setTimeout(() => {
      setShowFullResponse(true); // Show full response after 3 seconds
    }, 2000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowFullResponse(false); // Hide full response on mouse leave
    if (timer) {
      clearTimeout(timer); // Clear the timer if mouse leaves
      timer = null; // Reset timer
    }
  };

  return (
    <Card className="w-full h-full m-0 rounded-none border-none px-6 py-4 space-y-6">
      <CardContent className="relative p-0 space-y-4">
        <div className="flex flex-row justify-between p-0">
          <div>
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={`/img/circle-${item.knowledgeId.avatar}.svg`}
                    alt={item.knowledgeId.label}
                    className=""
                  />
                  <AvatarFallback>{item.knowledgeId.label.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>{item.knowledgeId.label}</div>
              </div>

              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
              </div>
            </div>
          </div>
          <Button variant="outline" className="rounded-full p-1 h-8 w-8" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div
          className="flex flex-row gap-2 mb-6 relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <div className="relative w-full">
            <h2>{item.query}</h2>
            <p className="text-sm text-muted-foreground">{truncatedResponse}</p>
          </div>

          <button className={`p-1 ${isHovered ? "opacity-100" : "opacity-0"}`} disabled={isCopied} onClick={handleCopy}>
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {/* Change icon based on state */}
          </button>
        </div>
        <div
          className={`absolute -top-4 -left-4 w-full min-h-content bg-background/80 text-muted-foreground border-border transition-opacity duration-300 border rounded-md backdrop-blur-sm p-4 text-sm pointer-events-none ${
            showFullResponse ? "opacity-100" : "opacity-0"
          }`}>
          {item.response}
        </div>
        <Button variant="outline" className="w-full rounded-full">
          Restore text
        </Button>
      </CardContent>
      <Separator />
      <CardContent className="p-0">
        <h2 className="text-lg font-medium mb-2">Settings</h2>
        <ul className="space-y-2 text-muted-foreground mt-2 mb-6">
          <li className="text-sm flex-row flex justify-between">
            <span>Model:</span>
            <span>{item.settings.model}</span>
          </li>
          <li className="text-sm flex-row flex justify-between">
            <span>Stability:</span>
            <span>{item.settings.temperature}%</span>
          </li>
          <li className="text-sm flex-row flex justify-between">
            <span>Relevance:</span>
            <span>{item.settings.relevance}%</span>
          </li>
          <li className="text-sm flex-row flex justify-between">
            <span>Style Exaggeration:</span>
            <span>{item.settings.styleExaggeration}%</span>
          </li>
        </ul>
        <Button variant="outline" className="w-full rounded-full">
          Restore settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlaygroundHistoryItem;
