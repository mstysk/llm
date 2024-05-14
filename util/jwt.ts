import { Payload } from "https://deno.land/x/djwt@v2.7/mod.ts";
import { create, verify } from "https://deno.land/x/djwt@v2.9/mod.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

export async function createJWT(payload: Payload): Promise<string> {
  return await create({ alg: "HS512", typ: "JWT" }, payload, key);
}

export async function verifyJWT(jwt: string): Promise<Payload | null> {
  try {
    return await verify(jwt, key);
  } catch (e) {
    console.error(e);
    return null;
  }
}
