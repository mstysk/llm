export const cookieOptions = {
    secure: true,
    sameSite: "Strict",
    httpOnly: false,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
} as const;
