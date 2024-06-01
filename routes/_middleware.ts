import { type FreshContext } from "@fresh-server";
import { cookieSession, WithSession } from "@fresh-session";

import {
  run as authoirzeMiddleware,
  WithUser,
} from "../middlewares/authorize.ts";

import { run as redirectMiddleware } from "../middlewares/redirect.ts";
import { MiddlewareHandlerContext } from "https://deno.land/x/fresh@1.0.1/server.ts";
import { StateWithSession } from "../lib/domain/State.ts";
import { cookieOptions } from "../config/index.ts";

type ProtectedRoutes = {
  path: string;
  autoRedirect: boolean;
};

const session = cookieSession(cookieOptions)

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
  function sessionHandler(
    req: Request,
    ctx: MiddlewareHandlerContext<StateWithSession>,
  ) {
    return session(req, ctx);
  },
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
