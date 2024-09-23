import { NextResponse } from "next/server";
import { inngest } from "@/lib/services/inngest/client";

export async function POST(request: Request) {
  const { conversionId } = await request.json();

  await inngest.send({
    name: "conversion/process",
    data: { conversionId },
  });

  return NextResponse.json({ success: true });
}
