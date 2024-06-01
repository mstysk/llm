import { type FreshContext } from "https://deno.land/x/fresh@1.6.8/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.4/mod.ts";
import { verifyJWT } from "../util/jwt.ts";
import { Payload } from "https://deno.land/x/djwt@v2.7/mod.ts";
import { User } from "../lib/domain/User.ts";

export type WithUser = {
  user: User;
};

export async function run(
  _: Request,
  ctx: FreshContext<WithSession & WithUser>,
  redirect = true,
): Promise<Response> {
  console.log("authorize");
  const jwt = ctx.state.session.get("jwt");

  if (!jwt) {
    return redirect ? loginRedirectResponse() : await ctx.next();
  }

  const payload = await verifyJWT(jwt);
  console.log(payload);

  if (!payload) {
    return redirect ? loginRedirectResponse() : await ctx.next();
  }

  if (!isUser(payload)) {
    return redirect ? loginRedirectResponse() : await ctx.next();
  }

  ctx.state.user = payload;
  return await ctx.next();
}

const loginRedirectResponse = () =>
  new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
    },
  });

function isUser(payload: Payload): payload is User {
  return (payload.login && payload.name && payload.email) ? true : false;
}
