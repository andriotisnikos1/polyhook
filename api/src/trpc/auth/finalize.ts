import { z } from "zod";
import { db, t } from "../../central.config.js";
import worldapi from "../../lib/integrations/worldapi.js";
import crypto from "crypto";
import { polyhook } from "../../types/polyhook.js";

const users = db.collection<polyhook.User>("users")

export default t.procedure
    .input(z.object({
        sessionID: z.string()
    }))
    .query(async ctx => {
        try {
            const user_auth = await worldapi.auth().getUser(ctx.input.sessionID)
            if (!user_auth || !user_auth.email) return null
            const emailHash = crypto.createHash("sha256").update(user_auth.email).digest("hex")
            let user = await users.findOne({emailHash}) as {userID: string, emailHash: string} | null
            if (!user) {
                const userID = `user_${crypto.randomBytes(16).toString("hex")}`
                user = {
                    userID,
                    emailHash
                }
                await users.insertOne(user)
            }
            return true
        } catch (error) {
            console.error(error)
            return null
        }
    })