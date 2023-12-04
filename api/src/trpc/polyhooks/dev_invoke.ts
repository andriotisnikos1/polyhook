import { z } from "zod";
import { db, t } from "../../central.config.js";

interface Polyhook {
    name: string,
    polyhookID: string,
    urls: string[],
}

const polyhooks = db.collection<Polyhook>("polyhooks")

export default t.procedure
    .input(
        z.object({
            polyhookID: z.string()
        })
    )
    .query(async ctx => {
        try {
            const polyhook = await polyhooks.findOne({ polyhookID: ctx.input.polyhookID })
            if (!polyhook) return null
            const result = polyhook.urls.map(async url => {
                const res = await fetch(url, {
                    method: "GET"
                })
                return {
                    url,
                    status: res.status
                }
            })
            return await Promise.all(result)
        } catch (error) {
            return null
        }
    })
