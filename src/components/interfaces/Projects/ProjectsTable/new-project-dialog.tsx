"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Project } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import DBSwitcher from "../../Messages/db-switcher";
import { defaultDB } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploader } from "@/components/ui/file-uploader"; // Add this import

import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  database: z.object({
    label: z.string(),
    value: z.string(),
    avatar: z.string(),
  }),
  dataSource: z.enum(["file", "loopio"]),
  loopioId: z.string().optional(),
  document: z.instanceof(File).optional(),
});

export type FormData = z.infer<typeof formSchema>;

interface NewProjectProps {
  onCreateProject: (formData: FormData) => Promise<void>;
}

export function NewProjectDialog({ onCreateProject }: NewProjectProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      database: defaultDB,
      dataSource: "file",
    },
  });

  const dataSource = form.watch("dataSource");

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await onCreateProject(data);
    setIsLoading(false);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-full">
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new project</DialogTitle>
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
            <FormField
              control={form.control}
              name="database"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default database</FormLabel>
                  <FormControl>
                    <DBSwitcher variant="full-width" selectedDatabase={field.value} onDBChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Source</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="file" />
                        </FormControl>
                        <FormLabel className="font-normal">File Upload</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="loopio" />
                        </FormControl>
                        <FormLabel className="font-normal">Loopio</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {dataSource === "loopio" && (
              <FormField
                control={form.control}
                name="loopioId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loopio ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {dataSource === "file" && (
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Import document (optional)</FormLabel>
                    <FormControl>
                      <FileUploader
                        onFileSelect={(file) => field.onChange(file)}
                        acceptedFileTypes={[".epub", ".pdf", ".txt", ".html"]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="rounded-full" variant="default">
                {isLoading ? "Creating project..." : "Create project"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
