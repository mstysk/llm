import { Request } from "https://deno.land/std@0.148.0/http/mod.ts";
import { type FreshContext } from "https://deno.land/x/fresh@1.6.8/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.4/mod.ts";
import { verifyJWT } from "../util/jwt.ts";
import { Payload } from "https://deno.land/x/djwt@v2.7/mod.ts";

export type User = {
  login: string;
  name: string;
  email: string;
};

export type WithUser = {
  user: User;
};

export async function run(
  _: Request,
  ctx: FreshContext<WithSession & WithUser>,
): Promise<Response | void> {
  const jwt = ctx.state.session.get("jwt");

  if (!jwt) {
      return loginRedirectResponse();
  }

  const payload = await verifyJWT(jwt);

  if (!payload) {
      return loginRedirectResponse();
  }

  if (!isUser(payload)) {
      return loginRedirectResponse();
  }

  ctx.state.user = payload;

  return await ctx.next();
}

const loginRedirectResponse = () =>  new Response(null, {
    status: 302,
    headers: {
        Location: "/login",
    },
});

function isUser(payload: Payload): payload is User {
    if (payload.login && payload.name && payload.email) {
        return true;
    }
    return false;
}
