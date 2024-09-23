import { serve } from "inngest/next";
import { inngest } from "@/lib/services/inngest/client";
import { getLoopioData } from "@/lib/services/inngest/functions/getLoopioData";
import { convertQuestions } from "@/lib/services/inngest/functions/convertQuestions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [getLoopioData, convertQuestions],
});
