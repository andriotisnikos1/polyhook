import { z } from "zod";
import { db, t } from "../../central.config.js";
import verifySession from "../../lib/auth/verifySession.js";
import { polyhook } from "../../types/polyhook.js";

const polyhooks = db.collection<polyhook.Polyhook>("polyhooks");
const projects = db.collection<polyhook.Project>("projects");

export default t.procedure
    .input(z.object({
        sessionID: z.string(),
        polyhookID: z.string(),
        urls: z.array(z.string()),
        projectID: z.string(),
    }))
    .query(async ctx => {
        try {
            const user = await verifySession(ctx.input.sessionID);
            if (!user) return false
            const polyhook = await polyhooks.findOne({polyhookID: ctx.input.polyhookID, projectID: ctx.input.projectID})
            if (!polyhook) return false
            const project = await projects.findOne({projectID: ctx.input.projectID, userID: user.userID})
            if (!project) return false
            await polyhooks.updateOne({polyhookID: ctx.input.polyhookID, projectID: ctx.input.projectID}, {$set: {urls: ctx.input.urls}})
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    })