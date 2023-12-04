import crypto from "crypto";
import { z } from "zod";
import { db, t } from "../../central.config.js";

interface Polyhook {
    name: string,
    polyhookID: string,
    urls: string[],
}

const polyhooks = db.collection<Polyhook>("polyhooks")

// todo: authetication + account stuff
export default t.procedure
    .input(
        z.object({
            name: z.string(),
            urls: z.array(z.string()),
        })
    )
    .query(async ctx => {
        try {
            const polyhookID = crypto.randomBytes(16).toString("hex")
            const polyhook = await polyhooks.insertOne({
                name: ctx.input.name,
                polyhookID,
                urls: ctx.input.urls,
            })
            return { polyhookID }
        } catch (error) {
            console.error(error)
            return { error: "internal server error" }
        }
    })
