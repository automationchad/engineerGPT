"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash, Settings, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from "@/lib/services/supabase/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, "Section name is required"),
  context: z.string().min(1, "Section context is required"),
});

interface SectionEditDialogProps {
  section: Section;
  onEditSection: (section: Section) => void;
  onDialogClick?: (e: React.MouseEvent) => void;
}

export function SectionEditDialog({ section, onEditSection, onDialogClick }: SectionEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: section.name,
      context: section.context,
    } as const,
  });

  const onEdit = async (formData: FormData) => {
    setLoading(true);
    const { name, context } = formData;
    const supabase = createClient();
    const { error } = await supabase.from("sections").update({ name, context }).eq("id", section.id);
    if (error) {
      console.error(error);
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onDialogClick?.(e);
          }}
          className="edit-btn flex-1 hover:bg-transparent text-muted-foreground hover:text-primary">
          <Settings className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit section</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onEdit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Context</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="resize-none w-full h-24 border rounded-md p-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="rounded-full" variant="default" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
