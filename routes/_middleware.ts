import { type FreshContext } from "https://deno.land/x/fresh@1.6.8/server.ts";

import {
  cookieSession,
  WithSession,
} from "https://deno.land/x/fresh_session@0.1.4/mod.ts";

import {
  run as authoirzeMiddleware,
  WithUser,
} from "../middlewares/authorize.ts";

export type State = WithSession;

const protectedRoutes = [
  "/",
  "/chat",
];

export const handler = [
  cookieSession,
  async function authorize(
    req: Request,
    ctx: FreshContext<WithSession & WithUser>,
  ) {
    if (protectedRoutes.includes(req.url)) {
      return authoirzeMiddleware(req, ctx);
    }
    return await ctx.next();
  },
];

//export function handler(
//  req: Request,
//  ctx: FreshContext<State>,
//) {
//}
