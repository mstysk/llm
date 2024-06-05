import { Payload } from "https://deno.land/x/djwt@v2.7/mod.ts";
import { create, verify } from "https://deno.land/x/djwt@v2.9/mod.ts";
import { getKey } from "./cryptKey.ts";

export async function createJWT(payload: Payload): Promise<string> {
  const key = await getKey();
  return await create({ alg: "HS512", typ: "JWT" }, payload, key);
}

export async function verifyJWT(jwt: string): Promise<Payload | null> {
  try {
    const key = await getKey();
    return await verify(jwt, key);
  } catch (e) {
    console.error(e);
    return null;
  }
}
