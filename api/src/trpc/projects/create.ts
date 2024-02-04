import { z } from "zod";
import { db, t } from "../../central.config.js";
import verifySession from "../../lib/auth/verifySession.js";
import crypto from "crypto";

const projects = db.collection<{
    name: string,
    projectID: string,
    userID: string
}>("projects")

export default t.procedure
    .input(z.object({
        sessionID: z.string(),
        name: z.string(),
    }))
    .query(async ctx => {
        try {
            const user = await verifySession(ctx.input.sessionID)
            if (!user) return null
            const projectID = `project_${crypto.randomBytes(16).toString("hex")}`
            await projects.insertOne({
                name: ctx.input.name,
                projectID,
                userID: user?.userID
            })
            return {
                projectID
            }
        } catch (error) {
            return null
        }
    })