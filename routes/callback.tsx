import { Handlers } from "$fresh/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.4/mod.ts";
import { oauth2Client } from "./login.tsx";
import { createJWT } from "../util/jwt.ts";
import { User } from "../lib/domain/User.ts";

interface Data {
  user: User;
}

export const handler: Handlers<Data, WithSession> = {
  async GET(req, ctx) {
    try {
      const codeVerifier = ctx.state.session.get("codeVerifier");

      if (typeof codeVerifier !== "string") {
        return Response.redirect("/error");
      }
      const token = await oauth2Client.code.getToken(req.url, {
        codeVerifier,
      });

      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });

      const res = await userResponse.json();
      console.log(res);

      const user: User = {
        login: res.login,
        name: res.name,
        email: res.email,
        avatar_url: res.avatar_url,
      };

      const jwt = await createJWT(user);

      ctx.state.session.set("jwt", jwt);

      const redirect = ctx.state.session.get("redirectUrl");
      return new Response(null, {
        status: 302,
        headers: {
          Location: redirect || "/",
        },
      });
    } catch (e) {
      console.log(e);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/error",
        },
      });
    }
  },
};
