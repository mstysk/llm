import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.4/mod.ts";
import { oauth2Client } from "./login.tsx";
import { create } from "https://deno.land/x/djwt@v2.9/mod.ts";

type User = {
    login: string;
    name: string;
    email: string;
}

interface Data {
    user: User;
}

export const handler: Handlers<Data, WithSession> = {
    async GET(req, ctx) {
        const codeVerifier = ctx.state.session.get("codeVerifier");
        console.log(`callback: ${codeVerifier}`)
        if (typeof codeVerifier !== "string") {
            return Response.redirect("/error")
        }
        const token = await oauth2Client.code.getToken(req.url, {
            codeVerifier,
        });

        const userResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
            }
        })

        const res = await userResponse.json();
        const user: User = {
            login: res.login,
            name: res.name,
            email: res.email,
        }

        const key = await crypto.subtle.generateKey(
        { name: "HMAC", hash: "SHA-512" },
        true,
        ["sign", "verify"]
        );
        console.log(key)

        const jwt = await create({alg: "HS512", typ: "JWT"}, user, key)

        ctx.state.session.set("jwt", jwt)

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        })
    }
}
