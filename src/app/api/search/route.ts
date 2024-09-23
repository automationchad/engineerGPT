import { NextResponse, NextRequest } from "next/server";
import { chatCompletions } from "@/lib/services/openai";
import { groundxSearchContent } from "@/lib/services/groundx";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "text/event-stream;charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  "X-Accel-Buffering": "no",
};

export async function POST(req: NextRequest) {
  try {
    const { query, context, fileContent, options, db } = await req.json();

    // Handle search content
    const searchContent = await getSearchContent(query, db);

    // Get chat completions stream
    const stream = await chatCompletions(query, searchContent, context, fileContent, options);

    // Create readable stream from chat completions
    const readableStream = createReadableStream(stream);

    return new Response(readableStream, {
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (err: any) {
    console.error("Error in POST handler:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function getSearchContent(query: string, db: any) {
  try {
    return await groundxSearchContent(query, db);
  } catch (error: any) {
    if (error.status === 402 && error.responseBody?.message) {
      throw new Error(error.responseBody.message);
    }
    throw error;
  }
}

function createReadableStream(stream: any) {
  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        controller.enqueue(new TextEncoder().encode(chunk.choices[0]?.delta?.content || ""));
      }
      controller.close();
    },
  });
}
