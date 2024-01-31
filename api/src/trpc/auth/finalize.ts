import { z } from "zod";
import { t } from "../../central.config.js";
import worldapi from "../../lib/integrations/worldapi.js";
import crypto from "crypto";

export default t.procedure
    .input(z.object({
        sessionID: z.string()
    }))
    .query(async ctx => {
        try {
            const user = await worldapi.auth().getUser(ctx.input.sessionID)
            if (!user || !user.email) return null
            const emailHash = crypto.createHash("sha256").update(user.email).digest("hex")
            return {
                projects: []
            }
        } catch (error) {
            console.error(error)
            return null
        }
    })