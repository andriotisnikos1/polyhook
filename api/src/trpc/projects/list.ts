import { z } from "zod";
import { db, t } from "../../central.config.js";
import { polyhook } from "../../types/polyhook.js";
import verifySession from "../../lib/auth/verifySession.js";

const projects = db.collection<polyhook.Project>("projects")

export default t.procedure
    .input(z.object({
        sessionID: z.string()
    }))
    .query(async ctx => {
        try {
            const user = await verifySession(ctx.input.sessionID)
            if (!user) return null
            const userProjects = await projects.find({userID: user.userID}).toArray()
            return userProjects
        } catch (error) {
            console.error(error)
            return null
        }
    })
