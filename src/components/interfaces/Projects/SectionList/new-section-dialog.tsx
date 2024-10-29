import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DB } from "@/types";
import { Section } from "@/types"; // Add this import
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/services/supabase/client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, "Section name is required"),
});

type FormData = z.infer<typeof formSchema> & { document?: File };

interface NewSectionProps {
  onCreateSection: (section: Section) => Promise<void>;
}

const supabase = createClient();

export function NewSectionDialog({ onCreateSection }: NewSectionProps) {
  const [open, setOpen] = useState(false);
  const { project_id } = useParams();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const newSection = {
      name: data.name,
      project_id,
    };
    try {
      const { error: sectionError } = await supabase.from("sections").insert(newSection);

      if (sectionError) {
        throw sectionError;
      } else {
        // onCreateSection(sectionData);
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      console.error("Error creating section:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="add-btn">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new section</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <DialogFooter>
              <Button type="submit" className="rounded-full" variant="default">
                Create section
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
