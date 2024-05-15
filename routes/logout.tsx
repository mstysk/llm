import { Handlers } from "$fresh/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.4/mod.ts";

export const handler: Handlers<unknown, WithSession> = {
  GET(_req, ctx) {
    ctx.state.session.clear();
    return new Response(null, {
      status: 302,
      headers: new Headers({
        Location: "/",
      }),
    });
  },
};
