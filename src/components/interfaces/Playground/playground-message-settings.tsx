import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SlidersVertical, TriangleAlert } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  model: z.string(),
  industry: z.string(),
  temperature: z.number().min(0).max(100),
  relevance: z.number().min(0).max(100),
  styleExaggeration: z.number().min(0).max(100),
  addExamples: z.boolean(),
});

export const defaultSettings = {
  model: "gpt-4o-mini",
  industry: "mining",
  temperature: 80,
  relevance: 70,
  styleExaggeration: 20,
  addExamples: true,
};

interface MessageSettingsProps {
  onSettingsChange: (settings: typeof defaultSettings) => void;
  onRegenerate: () => void;
  disabled: boolean;
}

const MessageSettings: React.FC<MessageSettingsProps> = ({ onSettingsChange, onRegenerate, disabled }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultSettings,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSettingsChange(values);
  };

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onSettingsChange(value as typeof defaultSettings);
    });
    return () => subscription.unsubscribe();
  }, [form, onSettingsChange]);

  return (
    <Form {...form}>
      <form className="space-y-6 w-full h-full">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="gpt-4o-mini">GPT-4o-mini</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="claude-3-5-sonnet">Claude 3.5 Sonnet</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="mining">Mining</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="banking">Banking</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="temperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stability</FormLabel>
              <div className="flex justify-between text-xs text-muted-foreground mt-1 mb-2">
                <span>More variable</span>
                <span>More stable</span>
              </div>
              <FormControl>
                <Slider
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  max={100}
                  min={0}
                  step={1}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="relevance"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Relevance
                {field.value < 30 && (
                  <span className="text-xs text-warning">
                    <TriangleAlert className="size-3" />
                  </span>
                )}
              </FormLabel>
              <div className="flex justify-between text-xs text-muted-foreground mt-1 mb-2">
                <span>Less relevant</span>
                <span>More relevant</span>
              </div>
              <FormControl>
                <Slider
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  max={100}
                  min={0}
                  step={1}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="styleExaggeration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Style Exaggeration
                {field.value > 50 && (
                  <span className="text-xs text-warning">
                    <TriangleAlert className="size-3" />
                  </span>
                )}
              </FormLabel>
              <div className="flex justify-between text-xs text-muted-foreground mt-1 mb-2">
                <span>None</span>
                <span>Exaggerated</span>
              </div>
              <FormControl>
                <Slider
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  max={100}
                  min={0}
                  step={1}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addExamples"
          render={({ field }) => (
            <FormItem className="flex items-start justify-start">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="ml-3 p-0">Answer boost</FormLabel>
            </FormItem>
          )}
        />

        <Separator className="my-4" />
        <div className="flex flex-row space-x-2 pt-4">
          <Button
            variant="outline"
            className="rounded-full shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              form.reset(defaultSettings);
            }}>
            To default settings
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MessageSettings;
