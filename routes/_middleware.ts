import { type FreshContext } from "https://deno.land/x/fresh@1.6.8/server.ts";

import {
  cookieSession,
  WithSession,
} from "https://deno.land/x/fresh_session@0.1.4/mod.ts";

import {
  run as authoirzeMiddleware,
  WithUser,
} from "../middlewares/authorize.ts";

import { run as redirectMiddleware } from "../middlewares/redirect.ts";

type ProtectedRoutes = {
  path: string;
  autoRedirect: boolean;
};

const protectedRoutes: ProtectedRoutes[] = [
  {
    path: "/chat",
    autoRedirect: true,
  },
  {
    path: "/",
    autoRedirect: false,
  },
];

export const handler = [
  cookieSession,
  async function redirect(
    req: Request,
    ctx: FreshContext<WithSession>,
  ) {
    if (
      protectedRoutes.some((route) =>
        route.autoRedirect && route.path === new URL(req.url).pathname
      )
    ) {
      return await redirectMiddleware(req, ctx);
    }
    return await ctx.next();
  },
  async function authorize(
    req: Request,
    ctx: FreshContext<WithSession & WithUser>,
  ) {
    const route = protectedRoutes.find((route) =>
      route.path === new URL(req.url).pathname
    );
    if (!route) {
      return await ctx.next();
    }
    return await authoirzeMiddleware(req, ctx, route.autoRedirect);
  },
];
