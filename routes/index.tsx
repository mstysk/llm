import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.4/mod.ts";

import Stream from "../islands/Stream.tsx";
import { verifyJWT } from "../util/jwt.ts";
import { Payload } from "https://deno.land/x/djwt@v2.7/mod.ts";

interface Data {
  query: string;
  payload: Payload;
}
export const handler: Handlers<Data, WithSession> = {
  async GET(req, ctx) {
    const jwt = ctx.state.session.get("jwt");
    if (!jwt) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      });
    }
    const payload = await verifyJWT(jwt);
    if (!payload) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      });
    }
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    return ctx.render({ query, payload });
  },
};

export default function Home({ data }: PageProps<Data>) {
  const { query, payload } = data;
  return (
    <main>
      <h1>Local LLM</h1>
      <p>This is a local LLM</p>
      <p>Hello {payload.name}</p>
      <Stream query={query} />
      <form>
        <textarea placeholder="Answer" name="q"></textarea>
        <button type="submit">Ask</button>
      </form>
    </main>
  );
}
