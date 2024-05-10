import { Handlers, PageProps } from "$fresh/server.ts";
import Stream from "../islands/Stream.tsx";

interface Data {
  query: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    return ctx.render({ query });
  },
};

export default function Home({ data }: PageProps<Data>) {
  const { query } = data;
  return (
    <main>
      <h1>Local LLM</h1>
      <p>This is a local LLM</p>
      <Stream query={query} />
      <form>
        <textarea placeholder="Answer" name="q"></textarea>
        <button type="submit">Ask</button>
      </form>
    </main>
  );
}
