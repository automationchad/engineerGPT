"use client";

import { Loader, Paperclip, X } from "lucide-react";

import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import DBSwitcher from "../Messages/db-switcher";

import { defaultSettings } from "../Messages/message-settings";

interface MessageAreaProps {
  onSubmit: (data: {
    query: string;
    context: string;
    fileContent: string;
    options: typeof defaultSettings;
    db: DB;
  }) => void;
  isGenerating: boolean;
}

interface DB {
  label: string;
  value: string;
  avatar: string;
}

const defaultDB: DB = {
  label: "sai360 - prod",
  value: "11279",
  avatar: "1",
};

export default function MessageArea({ onSubmit, isGenerating }: MessageAreaProps) {
   const [selectedDB, setSelectedDB] = useState<DB>(defaultDB);
   const [context, setContext] = useState("");
   const [fileName, setFileName] = useState("");
   const [fileContent, setFileContent] = useState("");
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [settings, setSettings] = useState(defaultSettings);

   // Load cached data on component mount
   useEffect(() => {
     const cachedContext = localStorage.getItem('cachedContext');
     const cachedFileName = localStorage.getItem('cachedFileName');
     const cachedFileContent = localStorage.getItem('cachedFileContent');
     
     if (cachedContext) setContext(cachedContext);
     if (cachedFileName) setFileName(cachedFileName);
     if (cachedFileContent) setFileContent(cachedFileContent);
   }, []);

   // Update cache when context, fileName, or fileContent changes
   useEffect(() => {
     localStorage.setItem('cachedContext', context);
     localStorage.setItem('cachedFileName', fileName);
     localStorage.setItem('cachedFileContent', fileContent);
   }, [context, fileName, fileContent]);

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

  const handleDBChange = (db: DB) => {
    setSelectedDB(db);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      query: context,
      context: context,
      fileContent: fileContent,
      options: settings,
      db: selectedDB,
    });
    // Clear cache after submission
    localStorage.removeItem('cachedContext');
    localStorage.removeItem('cachedFileName');
    localStorage.removeItem('cachedFileContent');
  };

  // const handleGenerateAnswer = async () => {
  //   if (!item) return;

  //   setIsGenerating(true);
  //   setEditedAnswer("");
  //   try {
  //     const response = await fetch("/api/search", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         query: item.question,
  //         context: context,
  //         fileContent: fileContent,
  //         options: settings,
  //         db: selectedDB,
  //       }),
  //     });

  //     if (!response.body) throw new Error("No response body");

  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder();

  //     let accumulatedAnswer = "";
  //     while (true) {
  //       const { done, value } = await reader.read();
  //       if (done) break;

  //       const chunk = decoder.decode(value, { stream: true });
  //       accumulatedAnswer += chunk;
  //       setEditedAnswer(accumulatedAnswer);
  //       setOriginalAnswer(accumulatedAnswer);
  //     }
  //     setIsGenerating(false);
  //   } catch (error) {
  //     console.error("Error generating answer:", error);
  //   }
  // };


  return (
    <div className="w-full flex-1 h-full">
      <form
        className="flex flex-col w-full h-full "
        onSubmit={handleSubmit}>
        <Textarea
          id="message"
          placeholder="Start typing here or paste any text you want to answer."
          className="p-4 flex-1 w-full bg-transparent border-transparent rounded-none focus-visible:ring-0 active:ring-0 focus-visible:outline-none text-primary text-md resize-none placeholder:text-light"
          maxLength={5000}
          value={context}
          disabled={isGenerating}
          onChange={(e) => {
            setContext(e.target.value);
          }}
        />
        <div className="flex w-full gap-2 items-center p-4 ">
          <div className="flex items-center gap-1.5">
            <DBSwitcher disabled={isGenerating} onDBChange={handleDBChange} selectedDatabase={selectedDB as DB} />
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
              <input type="file" ref={fileInputRef} className="hidden" accept=".md,.txt" onChange={handleFileChange} />
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
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-muted-foreground">{context.length}/5000</span>
            <Button type="submit" size="lg" className="rounded-full" disabled={isGenerating || !context}>
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
  );
}
