import worldapi from "../integrations/worldapi.js";

export default async (sessionID: string) => {
    try {
        const user = await worldapi.auth().getUser(sessionID)
        if (!user) return null;
        return user;
    } catch (error) {
        console.log(error)
        return null;
    }
}