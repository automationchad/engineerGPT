"use client";

import { useState, useEffect } from "react";
import { format, formatDistanceToNow, formatDistance, formatDuration, differenceInSeconds } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Loader, TriangleAlert, Octagon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Project, Conversion } from "@/types";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/services/supabase/client";
import { handleConvert } from "@/components/interfaces/Projects/ConversionDialog/ConvertDialog.utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConvertDialogProps {
  project: Project;
}

export function ConvertDialog({ project, user }: ConvertDialogProps) {
  const [isConverting, setIsConverting] = useState(false);
  const [conversion, setConversion] = useState<Conversion | null>(null);
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const supabase = createClient();

  const fetchConversions = async () => {
    const { data, error } = await supabase
      .from("conversions")
      .select("*")
      .eq("project_id", project.id)
      .order("started_at", { ascending: false })
      .limit(10); // Fetch the last 10 conversions

    if (data && !error) {
      setConversions(data);
      if (data[0]?.status === "in_progress") {
        setIsConverting(true);
      } else {
        setIsConverting(false);
      }
    }
  };

  useEffect(() => {
    fetchConversions();
    const interval = setInterval(fetchConversions, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [project.id, supabase]);

  const handleConvertProject = async () => {
    setIsConverting(true);
    try {
      const newConversion = await handleConvert(project, user);
      setConversion(newConversion);
      fetchConversions();
      setIsConverting(false);
    } catch (error) {
      console.error("Error starting conversion:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={project.is_converted ? "outline" : "default"}>Convert</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Convert project</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {conversions.length > 0 && (
            <div className="mt-4">
              <Table className="relative">
                <TableHeader className="sticky top-0">
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Ended</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="max-h-[200px] overflow-hidden">
                  {conversions.map((conv) => (
                    <TableRow key={conv.id}>
                      <TableCell>{getBadgeVariant(conv.status)}</TableCell>
                      <TableCell>{format(new Date(conv.started_at), "yyyy-MM-dd HH:mm")}</TableCell>
                      <TableCell>
                        {(() => {
                          if (conv.completed_at) {
                            return format(new Date(conv.completed_at), "yyyy-MM-dd HH:mm");
                          } else if (conv.status === "cancelled") {
                            // For cancelled conversions, show completed_at + 5 minutes
                            const estimatedCompletionTime = new Date(conv.started_at);
                            estimatedCompletionTime.setMinutes(estimatedCompletionTime.getMinutes() + 5);
                            return format(estimatedCompletionTime, "yyyy-MM-dd HH:mm");
                          } else if (conv.status === "in_progress") {
                            // For in-progress conversions, show the loader
                            return <Loader className="h-4 w-4 animate-spin" />;
                          } else {
                            // For other statuses (e.g., 'failed'), show a dash
                            return "-";
                          }
                        })()}
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const startDate = new Date(conv.started_at);
                          let endDate;

                          if (conv.completed_at) {
                            endDate = new Date(conv.completed_at);
                          } else if (conv.status === "cancelled") {
                            // For cancelled jobs, estimate end time as 5 minutes after start
                            endDate = new Date(startDate);
                            endDate.setMinutes(endDate.getMinutes() + 5);
                          } else {
                            // For in-progress or other statuses, use current time
                            endDate = new Date();
                          }

                          return formatDistance(endDate, startDate, {});
                        })()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <div className="flex items-center justify-end">
            <Button
              variant="default"
              size="sm"
              disabled={isConverting || conversion?.status === "in_progress"}
              onClick={handleConvertProject}>
              {isConverting ? "Converting..." : "Convert"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getBadgeVariant(status: string) {
  switch (status) {
    case "in_progress":
      return (
        <div className="flex items-center gap-2 text-blue-400">
          <span className="rounded-full bg-blue-800 border-blue-600 flex items-center justify-center border h-4 w-4">
            <Loader className="h-3 w-3 animate-spin" />
          </span>
          Running
        </div>
      );
    case "queued":
      return (
        <div className="flex items-center gap-2 text-blue-400">
          <span className="rounded-full bg-blue-800 border-blue-600 flex items-center justify-center border h-4 w-4">
            <Loader className="h-3 w-3 animate-spin" />
          </span>
          Running
        </div>
      );
    case "failed":
      return (
        <div className="flex items-center gap-2 text-red-400">
          <span className="rounded-full bg-red-800 border-red-600 border h-4 w-4 flex items-center justify-center">
            <TriangleAlert className="h-3 w-3" />
          </span>
          Failed
        </div>
      );
    case "completed":
      return (
        <div className="flex items-center gap-2 text-green-400">
          <span className="rounded-full bg-green-800 border-green-600 border h-4 w-4"></span>
          Completed
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-2 text-gray-400 capitalize">
          <span className="rounded-full bg-gray-800 border-gray-600 border h-4 w-4 flex items-center justify-center">
            <Octagon className="h-3 w-3" />
          </span>
          {status}
        </div>
      );
  }
}
