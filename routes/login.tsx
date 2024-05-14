import { Handlers } from "$fresh/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.4/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v4.0.5/mod.ts";
import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";

export const oauth2Client = new OAuth2Client({
  clientId: Deno.env.get("CLIENT_ID")!,
  clientSecret: Deno.env.get("CLIENT_SECRET")!,
  authorizationEndpointUri: "https://github.com/login/oauth/authorize",
  tokenUri: "https://github.com/login/oauth/access_token",
  redirectUri: "http://localhost:8000/callback",
  defaults: {
    scope: "read:user",
  },
});

export type StateSession = {
  session: Session;
};

export const handler: Handlers<StateSession, WithSession> = {
  async GET(_req, ctx) {
    const { uri, codeVerifier } = await oauth2Client.code.getAuthorizationUri();
    console.log(`login: ${uri} ${codeVerifier}`);
    ctx.state.session.flash("codeVerifier", codeVerifier);
    ctx.state.session.set("codeVerifier", codeVerifier);
    return new Response(null, {
        status: 302,
        headers: new Headers({
            Location: uri.toString(),
        }),
    });
  },
};
