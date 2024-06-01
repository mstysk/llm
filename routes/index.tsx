import { PageProps } from "$fresh/server.ts";
import { State } from "../lib/domain/State.ts";

export default function Index({ state }: PageProps<undefined, State>) {
  return (
    <main>
        <h1>Local LLM</h1>
        <p>This is a local LLM</p>
        {state.user ? (
            <p>Hello {state.user.name}</p>
        ) : (
            <p>Hello world</p>
        )}
    </main>
  );
}
