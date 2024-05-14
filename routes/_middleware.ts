import { type FreshContext } from "https://deno.land/x/fresh@1.6.8/server.ts";

import {
  cookieSession,
  WithSession,
} from "https://deno.land/x/fresh_session@0.1.4/mod.ts";

export type State = WithSession;

export function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  return cookieSession(req, ctx);
}
