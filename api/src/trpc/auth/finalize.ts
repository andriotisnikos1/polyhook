import { z } from "zod";
import { db, t } from "../../central.config.js";
import worldapi from "../../lib/integrations/worldapi.js";
import crypto from "crypto";

const users = db.collection("users")

export default t.procedure
    .input(z.object({
        sessionID: z.string()
    }))
    .query(async ctx => {
        try {
            const user_auth = await worldapi.auth().getUser(ctx.input.sessionID)
            if (!user_auth || !user_auth.email) return null
            const emailHash = crypto.createHash("sha256").update(user_auth.email).digest("hex")
            const user = await users.findOne({emailHash})
            if (!user) {
                const userID = `user_${crypto.randomBytes(16).toString("hex")}`
                const user = {
                    userID,
                    emailHash
                }
                await users.insertOne(user)
            }
            return {
                projects: []
            }
        } catch (error) {
            console.error(error)
            return null
        }
    })