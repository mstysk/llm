import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.4/mod.ts";

import Stream from "../islands/Stream.tsx";
import { State } from "../lib/domain/State.ts";

interface Data {
  query: string;
}

export const handler: Handlers<Data, WithSession> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    return ctx.render({ query });
  },
};

export default function Chat({ data, state }: PageProps<Data, State>) {
  return (
    <main>
      <h1>Local LLM</h1>
      <p>This is a local LLM</p>
      <p>Hello {state.user.name}</p>
      <Stream query={data.query} />
      <form>
        <textarea placeholder="Answer" name="q"></textarea>
        <button type="submit">Ask</button>
      </form>
    </main>
  );
}
