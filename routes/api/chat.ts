import { FreshContext } from "$fresh/server.ts";
import {
  type ServerSentEventMessage,
  ServerSentEventStream,
} from "https://deno.land/std@0.209.0/http/server_sent_event_stream.ts";

import { Phi3 } from "../../src/services/Ph3.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  const query = new URL(req.url).searchParams.get("q") || "";
  if (query === "") {
    return new Response("No query provided", { status: 400 });
  }
  console.log(`Chat stream started q: ${query}`);
  const phi3 = new Phi3();
  const chat = await phi3.stream(query);
  const reader = chat.getReader();

  const body = new ReadableStream<ServerSentEventMessage>(
    {
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          controller.enqueue({ data: `${value}` });
        }
        reader.releaseLock();
        controller.close();
      },
    },
  ).pipeThrough(new ServerSentEventStream());
  return new Response(body, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      "connection": "keep-alive",
    },
  });
};
