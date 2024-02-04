import crypto from "crypto";
import { z } from "zod";
import { db, t } from "../../central.config.js";
import { polyhook } from "../../types/polyhook.js";
import verifySession from "../../lib/auth/verifySession.js";

const polyhooks = db.collection<polyhook.Polyhook>("polyhooks")

// todo: authetication + account stuff
export default t.procedure
    .input(
        z.object({
            name: z.string(),
            urls: z.array(z.string()),
            sessionID: z.string(),
            projectID: z.string()
        })
    )
    .query(async ctx => {
        try {
            const user = await verifySession(ctx.input.sessionID)
            if (!user) return false
            const polyhookID = `polyhook_${crypto.randomBytes(16).toString("hex")}`
            const polyhook: polyhook.Polyhook = {
                analytics: {
                    runs: 0,
                    successful: 0
                },
                name: ctx.input.name,
                polyhookID,
                projectID: ctx.input.projectID,
                urls: ctx.input.urls.filter(url => url.length > 0)
            }
            await polyhooks.insertOne(polyhook)
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    })
