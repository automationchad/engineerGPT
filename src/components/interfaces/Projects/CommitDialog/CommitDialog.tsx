"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { handleCommit } from "./CommitDialog.utils";

export function CommitConfirmDialog({
  projectId,
  disabled,
  onCommit,
}: {
  projectId: string;
  disabled: boolean;
  onCommit: () => void;
}) {
  const [isCommitting, setIsCommitting] = useState(false);

  const handleCommitClick = async () => {
    setIsCommitting(true);
    try {
      await handleCommit(projectId);
      onCommit();
    } catch (error) {
      console.error("Error during commit:", error);
    } finally {
      setIsCommitting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" className={cn("flex-1", disabled && "cursor-not-allowed")} disabled={disabled}>
          Commit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will replace the existing answers for related questions in Loopio with the staged AI-generated
            responses from this project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleCommitClick} variant="success" disabled={isCommitting}>
              {isCommitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Committing...
                </>
              ) : (
                "Commit"
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
