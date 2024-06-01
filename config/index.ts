import { CookieOptions } from "https://deno.land/x/fresh_session@0.2.0/src/stores/cookie_option.ts";

export const cookieOptions:CookieOptions = {
    secure: true,
    sameSite: "Strict",
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7,
} as const;
