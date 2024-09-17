import React, { useState, useCallback, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersVertical, TriangleAlert } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const defaultSettings = {
  model: "gpt-4o-mini",
  temperature: 80,
  relevance: 70,
  styleExaggeration: 20,
  // speakerBoost: true,
};

interface MessageSettingsProps {
  onSettingsChange: (settings: typeof defaultSettings) => void;
  onRegenerate: () => void; // Add this prop
  disabled: boolean;
}

const MessageSettings: React.FC<MessageSettingsProps> = ({ onSettingsChange, onRegenerate, disabled }) => {
  const [settings, setSettings] = useState(defaultSettings);

  const handleSettingChange = (key: keyof typeof defaultSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleSliderChange = (key: keyof typeof defaultSettings, value: number[]) => {
    handleSettingChange(key, value[0]);
  };

  const handleModelChange = (value: string) => {
    handleSettingChange("model", value);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    onSettingsChange(defaultSettings);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-full">
          Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h3 className="font-semibold mb-2 flex items-center">
          <SlidersVertical className="size-4 mr-2" /> Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Model</label>
            <Select onValueChange={handleModelChange} value={settings.model}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o-mini">GPT-4o-mini</SelectItem>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                <SelectItem value="claude-3-5-sonnet">Claude 3.5 Sonnet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Stability</label>
            <div className="flex justify-between text-xs text-muted-foreground mt-1 mb-2">
              <span>More variable</span>
              <span>More stable</span>
            </div>
            <div className="relative">
              <Slider
                value={[settings.temperature]}
                onValueChange={(value) => handleSliderChange("temperature", value)}
                max={100}
                min={0}
                step={1}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Relevance
              {settings.relevance < 30 && (
                <span className="ml-1 text-xs mt-1 text-warning">
                  <TriangleAlert className="size-3" />
                </span>
              )}
            </label>
            <div className="flex justify-between text-xs text-muted-foreground mt-1 mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>Low</span>
                  </TooltipTrigger>
                  <TooltipContent className="text-xs max-w-[200px]">
                    <span>
                      Lower relevance means that the answer will likely be less deterministic and talk about the product
                      in more detail.
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>High</span>
                  </TooltipTrigger>
                  <TooltipContent className="text-xs max-w-[200px]">
                    <span>
                      High relevance means that the answer will likely be more deterministic and focused on the question
                      at hand.
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              value={[settings.relevance]}
              onValueChange={(value) => handleSliderChange("relevance", value)}
              max={100}
              min={0}
              step={1}
            />
          </div>

          <div className="flex flex-col pt-2 pb-4">
            <label className="text-sm font-medium flex items-center justify-between">
              Style Exaggeration
              {settings.styleExaggeration > 50 && (
                <span className="ml-1 text-xs mt-1 text-warning">
                  <TriangleAlert className="size-3" />
                </span>
              )}
            </label>
            <div className="flex justify-between text-xs text-muted-foreground mt-1 mb-2">
              <span>None</span>
              <span>Exaggerated</span>
            </div>
            <Slider
              value={[settings.styleExaggeration]}
              onValueChange={(value) => handleSliderChange("styleExaggeration", value)}
              max={100}
              min={0}
              step={1}
            />
          </div>

          <Separator className="my-4" />
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>

            <Button variant="default" className="flex-grow" onClick={onRegenerate} disabled={disabled}>
              Regenerate
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MessageSettings;
