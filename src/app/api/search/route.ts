import { NextResponse, NextRequest } from "next/server";
import { chatCompletions } from "@/app/services/openai";
import { groundxSearchContent } from "@/app/services/groundx";

const CorsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "text/event-stream;charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  "X-Accel-Buffering": "no",
};

export async function POST(req: NextRequest) {
  try {
    const { query, context, fileContent, options, db } = await req.json();

    let searchContent;
    try {
      searchContent = await groundxSearchContent(query + context, db);
    } catch (searchError: any) {
      if (searchError.status === 402 && searchError.responseBody?.message) {
        return NextResponse.json({ error: searchError.responseBody.message }, { status: 402 });
      }
      throw searchError; // Re-throw if it's not the specific error we're handling
    }
    const stream = await chatCompletions(query, searchContent, context, fileContent, options);

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(new TextEncoder().encode(chunk.choices[0]?.delta?.content || ""));
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        ...CorsHeaders,
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (err: any) {
    console.log(err, "message");
    return NextResponse.json({ error: err.message });
  }
}
