import { Handlers, PageProps } from "$fresh/server.ts";
import { User } from "../lib/domain/User.ts";
import { WithUser } from "../middlewares/authorize.ts";

type Data = {
  isLoggdedIn: boolean;
  user: User | null;
};

export const handler: Handlers<Data, WithUser> = {
  GET(_req, ctx) {
    const user = ctx.state.user;
    console.log(user);
    if (!user) {
      return ctx.render({
        isLoggdedIn: false,
        user: null,
      });
    }
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
            <p className="">Guest</p>
            <a href="/login">Login</a>
          </>
        )}
    </main>
  );
}
