import { type FreshContext } from "https://deno.land/x/fresh@1.6.8/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.4/mod.ts";

export async function run(
  req: Request,
  ctx: FreshContext<WithSession>,
): Promise<Response> {
  ctx.state.session.set("redirectUrl", req.url);
  return await ctx.next();
}
