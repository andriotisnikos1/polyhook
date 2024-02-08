import { LoaderFunction, redirect } from "@remix-run/node"
import cookies from "~/scripts/cookies"
import worldapi from "~/scripts/worldapi"

export const loader: LoaderFunction = async ({request}) => {
    const sessionID = await cookies.session.parse(request.headers.get("Cookie"))
    if (sessionID) await worldapi.auth().logOut(sessionID)
    return redirect("/", {headers: {"Set-Cookie": await cookies.session.serialize(null)}})
}

export default function Route() {
    return <></>
}