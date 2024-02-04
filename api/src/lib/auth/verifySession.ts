import { db } from "../../central.config.js";
import worldapi from "../integrations/worldapi.js";
import crypto from "crypto";

const users = db.collection<{
    userID: string,
    emailHash: string
}>("users")

export default async (sessionID: string) => {
    try {
        const user = await worldapi.auth().getUser(sessionID)
        if (!user || !user.email) return null;
        const emailHash = crypto.createHash("sha256").update(user.email).digest("hex");
        const dbUser = await users.findOne({emailHash});
        return Object.assign({}, user, dbUser);
    } catch (error) {
        console.log(error)
        return null;
    }
}