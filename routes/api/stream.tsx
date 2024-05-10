import { FreshContext } from "$fresh/server.ts";
import {
  type ServerSentEventMessage,
  ServerSentEventStream,
} from "https://deno.land/std@0.209.0/http/server_sent_event_stream.ts";

const JOKES = [
  "Why do Java developers often wear glasses? They can't C#.",
  "A SQL query walks into a bar, goes up to two tables and says “can I join you?”",
  "Wasn't hard to crack Forrest Gump's password. 1forrest1.",
  "I love pressing the F5 key. It's refreshing.",
  "Called IT support and a chap from Australia came to fix my network connection.  I asked “Do you come from a LAN down under?”",
  "There are 10 types of people in the world. Those who understand binary and those who don't.",
  "Why are assembly programmers often wet? They work below C level.",
  "My favourite computer based band is the Black IPs.",
  "What programme do you use to predict the music tastes of former US presidential candidates? An Al Gore Rhythm.",
  "An SEO expert walked into a bar, pub, inn, tavern, hostelry, public house.",
];

export const handler = (_req: Request, _ctx: FreshContext): Response => {
  const stream = new ReadableStream<ServerSentEventMessage>(
    {
      start(controller) {
        const interval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * JOKES.length);
          const joke = JOKES[randomIndex];
          console.log(joke);
          controller.enqueue({ data: `${joke}` });
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      },
    },
  ).pipeThrough(new ServerSentEventStream());
  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      "connection": "keep-alive",
    },
  });
};
