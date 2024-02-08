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
            projectID: z.string()
        })
    )
    .query(async ctx => {
        try {
            const user = await verifySession(ctx.input.sessionID)
            if (!user) return null
            const project = await projects.findOne({ projectID: ctx.input.projectID, userID: user.userID })
            if (!project) return null
            const hooks = await polyhooks.find({ projectID: ctx.input.projectID }).toArray()
            return hooks
        } catch (error) {
            console.error(error)
            return null
        }
    })