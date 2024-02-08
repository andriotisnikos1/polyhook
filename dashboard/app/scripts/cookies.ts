import { createCookie } from "@remix-run/node";

const sessionCookie = createCookie("sessionID", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60
})

const userCookie = createCookie("user", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60
})

const projectsCookie = createCookie("projects", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60
})

const projectIDCookie = createCookie("projectID", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60
})

export default {
    session: sessionCookie,
    user: userCookie,
    projects: projectsCookie,
    projectID: projectIDCookie
}