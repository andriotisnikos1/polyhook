import { z } from "zod";
import { db, t } from "../../central.config.js";
import { polyhook } from "../../types/polyhook.js";
import verifySession from "../../lib/auth/verifySession.js";

const polyhooks = db.collection<polyhook.Polyhook>("polyhooks")
const projects = db.collection<polyhook.Project>("projects")

export default t.procedure
    .input(
        z.object({
            sessionID: z.string(),
            projectID: z.string(),
            polyhookID: z.string()
        })
    )
    .query(async ctx => {
        try {
            const user = await verifySession(ctx.input.sessionID)
            if (!user) return null
            const project = await projects.findOne({ projectID: ctx.input.projectID, userID: user.userID })
            if (!project) return null
            const hook = await polyhooks.findOne({ projectID: ctx.input.projectID, polyhookID: ctx.input.polyhookID})
            return hook
        } catch (error) {
            console.error(error)
            return null
        }
    })