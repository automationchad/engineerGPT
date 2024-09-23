export interface Conversion {
  id: string;
  project_id: string;
  status: "queued" | "in_progress" | "completed" | "failed";
  total_questions: number;
  processed_questions: number;
  created_at: string;
  completed_at: string | null;
  error_message: string | null;
}
