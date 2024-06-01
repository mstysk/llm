import { Handlers } from "$fresh/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.4/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v4.0.5/mod.ts";
import { OAuth2Client, Tokens } from "https://deno.land/x/oauth2_client/mod.ts";
import { AuthorizationUriWithVerifier } from "https://deno.land/x/oauth2_client@v1.0.2/src/authorization_code_grant.ts";

interface OAuthClient {
  client: OAuth2Client;
  userInfoUrl: string;
}

export type OAuthClients = "github" | "gitlab";

export const isClient = (client: unknown): client is OAuthClients => {
  if (typeof client !== "string") {
    return false;
  }
  return ["github", "gitlab"].includes(client);
};

export const clients: Record<OAuthClients, OAuthClient> = {
  github: {
    client: new OAuth2Client({
      clientId: Deno.env.get("GITHUB_CLIENT_ID")!,
      clientSecret: Deno.env.get("GITHUB_CLIENT_SECRET")!,
      authorizationEndpointUri: Deno.env.get("GITHUB_ENDPOINT")!,
      tokenUri: Deno.env.get("GITHUB_TOKEN_URL")!,
      redirectUri: "http://localhost:8000/callback/github",
      defaults: {
        scope: "openid read:user",
      },
    }),
    userInfoUrl: Deno.env.get("GITHUB_USERINFO_URL")!,
  },
  gitlab: {
    client: new OAuth2Client({
      clientId: Deno.env.get("GITLAB_CLIENT_ID")!,
      clientSecret: Deno.env.get("GITLAB_CLIENT_SECRET")!,
      authorizationEndpointUri: Deno.env.get("GITLAB_ENDPOINT")!,
      tokenUri: Deno.env.get("GITLAB_TOKEN_URL")!,
      redirectUri: "http://localhost:8000/callback/gitlab",
      defaults: {
        scope: "openid email profile",
      },
    }),
    userInfoUrl: Deno.env.get("GITLAB_USERINFO_URL")!,
  },
};

export type StateSession = {
  session: Session;
};

export const handler: Handlers<StateSession, WithSession> = {
  async POST(req, ctx) {
    const formData = await req.formData();
    const client = formData.get("client");

    if (isClient(client) === false) {
      return new Response(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const { uri, codeVerifier } = await getAuthorizationUri(client);

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

export default function Login() {
  return (
    <main>
      <h1>Local LLM</h1>
      <p>This is a local LLM</p>
      <form method="post">
        <button type="submit" name="client" value="github">
          Login with GitHub
        </button>
        <button type="submit" name="client" value="gitlab">
          Login with Gitlab
        </button>
      </form>
    </main>
  );
}

const getAuthorizationUri = async (
  client: OAuthClients,
): Promise<AuthorizationUriWithVerifier> => {
  return await clients[client].client.code.getAuthorizationUri();
};

export const getToken = async (
  client: OAuthClients,
  url: string,
  codeVerifier: string,
): Promise<Tokens> => {
  return await clients[client].client.code.getToken(url, { codeVerifier });
};

export const getUserInfo = async (
  client: OAuthClients,
  token: Tokens,
): Promise<Response> => {
  return await fetch(clients[client].userInfoUrl, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
};
