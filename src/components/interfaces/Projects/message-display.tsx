import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Database,
  Reply,
  ReplyAll,
  Trash2,
  Pencil,
  Loader,
  Sparkles,
  Check,
  Paperclip,
  CornerDownLeft,
  X,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

interface QuestionDisplayProps {
  question: item | null;
  onAnswerChange: (id: string, answer: string) => void;
  aiAnswer?: string;
  isGenerating: boolean; // Add this prop
  onGenerateAnswer: (id: string) => void; // Add this prop
}


interface item {
  question: string;
  id: string;
  answer: {
    text: string | null;
  };
}

export default function MessageDisplay({ item, onAnswerChange, aiAnswer }: QuestionDisplayProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [context, setContext] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [originalAnswer, setOriginalAnswer] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (item) {
      setContext("");
      setEditedAnswer(aiAnswer || "");
      setOriginalAnswer(aiAnswer || "");
      setIsEditing(false);
      setFileName("");
      setFileContent("");
    }
  }, [item, aiAnswer]);

  useEffect(() => {
    if (item) {
      setContext("");
      setEditedAnswer(aiAnswer || "");
      setIsEditing(false);
    }
  }, [item, aiAnswer]);

  const handleAcceptAnswer = () => {
    if (item) {
      onAnswerChange(item.id, editedAnswer);
      setIsEditing(false);
    }
  };

  const handleFileAttach = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const content = await readFileContent(file);
    setFileContent(content);
    setFileName(file.name);
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const clearFileAttachment = () => {
    setFileContent("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGenerateAnswer = async () => {
    if (!item) return;

    setIsGenerating(true);
    setEditedAnswer("");
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ query: item.question, context: context, fileContent: fileContent }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let accumulatedAnswer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedAnswer += chunk;
        setEditedAnswer(accumulatedAnswer);
        setOriginalAnswer(accumulatedAnswer);
      }
      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating answer:", error);
    }
  };
  return (
    <div className={`flex flex-col justify-between h-full`}>
      {item ? (
        <>
          <div className="flex items-center p-2 flex-row">
            <div className="flex items-center gap-2 ml-auto mr-4">
              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={!mail}>
                      <Reply className="h-4 w-4" />
                      <span className="sr-only">Reply</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reply</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={!mail}>
                      <ReplyAll className="h-4 w-4" />
                      <span className="sr-only">Reply all</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reply all</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={!mail}>
                      <Forward className="h-4 w-4" />
                      <span className="sr-only">Forward</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Forward</TooltipContent>
                </Tooltip>
              </TooltipProvider> */}
              <Tabs className="flex-1">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="complete">
                    <span className="sr-only">Complete</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                      <rect x="4" y="3" width="12" height="2" rx="1" fill="currentColor"></rect>
                      <rect x="4" y="7" width="12" height="2" rx="1" fill="currentColor"></rect>
                      <rect x="4" y="11" width="3" height="2" rx="1" fill="currentColor"></rect>
                      <rect x="4" y="15" width="3" height="2" rx="1" fill="currentColor"></rect>
                      <rect x="8.5" y="11" width="3" height="2" rx="1" fill="currentColor"></rect>
                      <rect x="8.5" y="15" width="3" height="2" rx="1" fill="currentColor"></rect>
                      <rect x="13" y="11" width="3" height="2" rx="1" fill="currentColor"></rect>
                    </svg>
                  </TabsTrigger>
                  <TabsTrigger value="insert">
                    <span className="sr-only">Insert</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
                        fill="currentColor"></path>
                      <rect x="4" y="15" width="3" height="2" rx="1" fill="currentColor"></rect>
                      <rect x="8.5" y="15" width="3" height="2" rx="1" fill="currentColor"></rect>
                      <rect x="13" y="15" width="3" height="2" rx="1" fill="currentColor"></rect>
                    </svg>
                  </TabsTrigger>
                  <TabsTrigger value="edit">
                    <span className="sr-only">Edit</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                      <rect x="4" y="3" width="12" height="2" rx="1" fill="currentColor"></rect>
                      <rect x="4" y="7" width="12" height="2" rx="1" fill="currentColor"></rect>
                      <rect x="4" y="11" width="3" height="2" rx="1" fill="currentColor"></rect>
                      <rect x="4" y="15" width="4" height="2" rx="1" fill="currentColor"></rect>
                      <rect x="8.5" y="11" width="3" height="2" rx="1" fill="currentColor"></rect>
                      <path
                        d="M17.154 11.346a1.182 1.182 0 0 0-1.671 0L11 15.829V17.5h1.671l4.483-4.483a1.182 1.182 0 0 0 0-1.671Z"
                        fill="currentColor"></path>
                    </svg>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Separator orientation="vertical" className="mx-2 h-6" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!item}>
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                <DropdownMenuItem>Star thread</DropdownMenuItem>
                <DropdownMenuItem>Add label</DropdownMenuItem>
                <DropdownMenuItem>Mute thread</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Separator />
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col">
              <div className="flex items-start p-4">
                <div className="flex items-start gap-4 text-sm text-muted-foreground">{item.question}</div>
              </div>
              <Separator />
              <div className="flex-1 whitespace-pre-wrap p-4 text-sm space-y-4">
                {item.answer.text ? (
                  item.answer.text === "Not enough information to answer properly." ? (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-4">
                      {item.answer.text}
                    </div>
                  ) : (
                    <div className="text-sm text-sky-900 bg-sky-50 border border-sky-200 rounded-md p-4">
                      {item.answer.text}
                    </div>
                  )
                ) : (
                  <div className="text-sm p-4 bg-muted/50 border text-muted-foreground border-secondary rounded-md">
                    😭 No answer here yet... maybe you can help?
                  </div>
                )}

                {(isGenerating || editedAnswer) && (
                  <div
                    className={`bg-ai-foreground flex items-center border border-purple-200 text-ai rounded-md p-4 relative ${
                      isEditing ? "pb-8" : ""
                    }`}>
                    <div className="flex items-start justify-start w-full h-min">
                      <h3 className="text-sm font-medium">
                        <Sparkles className="mr-2 h-4 w-4" />
                      </h3>
                      <div className="text-sm w-full">
                        {isEditing ? (
                          <Textarea
                            value={editedAnswer}
                            onChange={(e) => setEditedAnswer(e.target.value)}
                            className="w-full min-h-content leading-normal m-0 bg-transparent border-none p-0 resize-none focus:ring-0 focus:outline-none active:outline-none active:ring-0"
                          />
                        ) : (
                          editedAnswer || ""
                        )}
                        {isGenerating && (
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
                        )}
                      </div>
                    </div>
                    {isEditing && (
                      <Badge className="bg-ai-foreground text-ai text-xs absolute bottom-2 right-2" variant="outline">
                        Editing
                      </Badge>
                    )}
                    {!isGenerating && (
                      <div className="flex flex-col items-center gap-2 ml-2">
                        {isEditing ? (
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
                                setEditedAnswer(originalAnswer);
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
                              onClick={handleAcceptAnswer}
                              className="hover:bg-success-foreground">
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button
                              size="xs"
                              variant="outline"
                              onClick={() => setIsEditing(true)}
                              className="hover:bg-accent">
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              size="xs"
                              variant="outline"
                              onClick={() => setEditedAnswer("")}
                              className="hover:bg-destructive-foreground">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Separator className="mt-auto" />
              <div className="p-4">
                <form
                  className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleGenerateAnswer();
                  }}>
                  <Label htmlFor="message" className="sr-only">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Add some context..."
                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                    value={context}
                    disabled={isGenerating}
                    onChange={(e) => {
                      setContext(e.target.value);
                    }}
                  />
                  <div className="flex items-center p-3 pt-0">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button" // Change to type="button"
                            variant="ghost"
                            size="icon"
                            disabled={isGenerating}
                            onClick={handleFileAttach}>
                            <Paperclip className="size-4" />
                            <span className="sr-only">Attach file</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Attach File</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".md,.txt"
                      onChange={handleFileChange}
                    />
                    {fileName && (
                      <span className="text-sm text-gray-500 ml-2 flex items-center">
                        {fileName}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="ml-1 h-4 w-4"
                          onClick={clearFileAttachment}>
                          <X className="h-3 w-3" />
                        </Button>
                      </span>
                    )}
                    <Button type="submit" size="sm" className="ml-auto gap-1.5" disabled={isGenerating}>
                      {isGenerating ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          Generate response
                          <CornerDownLeft className="size-3.5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col w-full h-full">
          <div className="flex items-start p-4 w-full h-full">
            <div className="flex items-start gap-4 text-sm text-gray-500">No question selected</div>
          </div>
        </div>
      )}
    </div>
  );
}
