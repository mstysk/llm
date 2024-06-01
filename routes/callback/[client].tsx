import { Handlers } from "@fresh-server";
import { WithSession } from "@fresh-session";
import { getToken, getUserInfo, isClient } from "../login.tsx";
import { createJWT } from "../../util/jwt.ts";
import { convertFromClient } from "../../lib/domain/User.ts";

interface Data {
  client: string;
}

export const handler: Handlers<Data, WithSession> = {
  async GET(req, ctx) {
    try {
      const client = ctx.params.client;
      const codeVerifier = ctx.state.session.get("codeVerifier");

      if (typeof codeVerifier !== "string") {
        return Response.redirect("/error");
      }

      if (isClient(client) === false) {
        return new Response(null, {
          status: 400,
        });
      }

      const token = await getToken(client, req.url, codeVerifier);

      const userResponse = await getUserInfo(client, token);

      if (userResponse.status !== 200) {
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/error?error=failed_to_get_user_info",
          },
        });
      }
      const user = await userResponse.json();
      const jwt = await createJWT(
        convertFromClient(
          client,
          user,
        ),
      );

      ctx.state.session.set("user", user);
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
