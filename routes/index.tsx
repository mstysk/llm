import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.4/mod.ts";
import { User } from "./callback.tsx";
import { verifyJWT } from "../util/jwt.ts";

type Data = {
  isLoggdedIn: boolean;
  user: User | null;
};

export const handler: Handlers<Data, WithSession> = {
  async GET(_req, ctx) {
    const jwt = ctx.state.session.get("jwt");
    if (!jwt) {
      return ctx.render({
        isLoggdedIn: false,
        user: null,
      });
    }

    console.log(jwt);
    const payload = await verifyJWT(jwt);

    console.log(payload);

    if (!payload) {
      return ctx.render({
        isLoggdedIn: false,
        user: null,
      });
    }

    const user = payload as User;
    console.log(user);

    return ctx.render({
      isLoggdedIn: true,
      user,
    });
  },
};

export default function Index({ data }: PageProps<Data>) {
  return (
    <main>
      <h1>Local LLM</h1>
      <p>This is a local LLM</p>
      <p>Hello</p>
      {data.isLoggdedIn
        ? (
          <>
            <p>{data.user?.name}</p>
            <a href="/logout">Logout</a>
            <a href="/chat">Chat</a>
          </>
        )
        : (
          <>
            <p>Guest</p>
            <a href="/login">Login</a>
          </>
        )}
    </main>
  );
}
