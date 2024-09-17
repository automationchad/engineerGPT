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
  History,
  LetterText,
  CornerDownLeft,
  X,
  Play,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import DBSwitcher from "../Messages/db-switcher";
import MessageSettings from "../Messages/message-settings";
import { sanitizeHtml } from "@/lib/utils";

import { defaultSettings } from "../Messages/message-settings"; // Import defaultSettings

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

interface DB {
  label: string;
  value: string;
  avatar: string; 
}


export default function MessageDisplay({ item, onAnswerChange, aiAnswer }: QuestionDisplayProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDB, setSelectedDB] = useState<DB | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [context, setContext] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [originalAnswer, setOriginalAnswer] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [settings, setSettings] = useState(defaultSettings);

  const handleSettingsChange = (newSettings: typeof defaultSettings) => {
    setSettings(newSettings);
  };

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

  const handleRegenerate = () => {
    handleGenerateAnswer();
  };

  const handleDBChange = (db: DB) => {
    setSelectedDB(db);
    console.log("DB changed to:", db);
    // You can perform any additional actions here when the DB changes
  };

  const handleGenerateAnswer = async () => {
    if (!item) return;

    setIsGenerating(true);
    setEditedAnswer("");
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ query: item.question, context: context, fileContent: fileContent, options: settings, db: selectedDB }),
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
    <div className={`flex flex-col h-full`}>
      {item ? (
        <Tabs className="h-full flex flex-col" defaultValue="generate">
          <div className="flex items-center p-2 flex-row">
            <div className="flex items-center gap-2 ml-auto">
              <TabsList className="grid grid-cols-2 px-2">
                <TabsTrigger value="generate">
                  <span className="sr-only">Generate</span>
                  <LetterText className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="insert">
                  <span className="sr-only">Insert</span>
                  <History className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          <Separator />
          <TabsContent value="generate" className="flex-grow overflow-auto">
            <div className="flex flex-col h-full">
              <div className="flex-grow overflow-auto">
                <div className="flex items-start p-4" id="user-question">
                  <div className="flex items-start gap-4 text-sm text-muted-foreground">{item.question}</div>
                </div>
                <Separator />

                <div className="whitespace-pre-wrap flex flex-col p-4 text-sm gap-4" id="ai-answer">
                  {item.answer.text ? (
                    item.answer.text === "Not enough information to answer properly." ? (
                      <div className="text-sm text-destructive bg-destructive-foreground border border-destructive rounded-md p-4">
                        {sanitizeHtml(item.answer.text)}
                      </div>
                    ) : (
                      <div className="text-sm text-accent-foreground bg-accent border border-accent rounded-md p-4">
                        {sanitizeHtml(item.answer.text)}
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
              </div>
              <div className="mt-auto flex-shrink-0">
                <Separator className="" />
                <div className="p-4" id="user-input">
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
                      placeholder="Add an injection..."
                      className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                      maxLength={1000}
                      value={context}
                      disabled={isGenerating}
                      onChange={(e) => {
                        setContext(e.target.value);
                      }}
                    />
                    <div className="flex items-center p-3 pt-0">
                      <div className="flex items-center gap-1.5">
                        <DBSwitcher disabled={isGenerating} onDBChange={handleDBChange} />
                        <MessageSettings
                          onSettingsChange={handleSettingsChange}
                          onRegenerate={handleRegenerate}
                          disabled={isGenerating}
                        />
                        <div>
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
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 ml-auto">
                        <span className="text-sm text-muted-foreground">{context.length}/1000</span>
                        <Button type="submit" size="sm" className="rounded-full" disabled={isGenerating}>
                          <span className="relative">
                            Generate
                            {isGenerating && (
                              <span className="absolute inset-0 flex items-center justify-center">
                                <Loader className="h-4 w-4 animate-spin" />
                              </span>
                            )}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
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
