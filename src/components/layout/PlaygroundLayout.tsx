"use client";

import { useState, useEffect } from "react";
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MessageSettings from "@/components/interfaces/Playground/playground-message-settings";
import PlaygroundMessageHistory from "@/components/interfaces/Playground/playground-message-history";
import AIAnswerArea from "@/components/interfaces/Playground/ai-answer-area";
import MessageArea from "@/components/interfaces/Playground/message-area";
import { defaultSettings } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import { History } from "@/types";

export default function PlaygroundLayout({ history }: { history: History }) {
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [settings, setSettings] = useState(defaultSettings);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setAnswer("");
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ ...data, options: settings }),
      });
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let serverAnswer = "";

      if (reader) {
        setIsLoading(false);
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          serverAnswer += decoder.decode(value, { stream: true });
          setAnswer(serverAnswer);
        }
      }
    } catch (error) {
      console.error("Error in search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[200px] md:min-w-[450px]">
      <ResizablePanel defaultSize={25} minSize={25}>
        <div className="flex h-full w-full">
          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="rounded-none p-0 m-0 h-12 bg-transparent items-end">
              <TabsTrigger
                value="settings"
                className="m-0 rounded-none w-full data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Settings
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="m-0 rounded-none w-full data-[state=active]:border-b-2 data-[state=active]:border-primary">
                History
              </TabsTrigger>
            </TabsList>
            <Separator className="m-0 p-0" />
            <TabsContent value="settings" className="w-full p-6">
              <MessageSettings onSettingsChange={setSettings} onRegenerate={() => {}} disabled={isLoading} />
            </TabsContent>
            <TabsContent value="history" className="w-full">
              <PlaygroundMessageHistory history={history} />
            </TabsContent>
          </Tabs>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75} minSize={70}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={40} minSize={20}>
            <div className="flex h-full items-center justify-center p-6">
              <AIAnswerArea answer={answer} isLoading={isLoading} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60} minSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <MessageArea onSubmit={handleSubmit} isGenerating={isLoading} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
