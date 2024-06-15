import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.4/mod.ts";
import Form from "../islands/Form.tsx";

import Stream from "../islands/Stream.tsx";

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

export default function Chat({ data }: PageProps<Data>) {
  return (
    <main>
      <Form />
      <Stream query={data.query} />
    </main>
  );
}
