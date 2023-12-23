import { createCookie } from "@remix-run/node";

const sessionCookie = createCookie("sessionID", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60
})

export default {
    session: sessionCookie
}