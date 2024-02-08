import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import cookies from "~/scripts/cookies";
import trpc from "~/scripts/trpc";

export const action: ActionFunction = async ({request, params}) => {
    const projectID = await cookies.projectID.parse(request.headers.get("Cookie"))
    const sessionID = await cookies.session.parse(request.headers.get("Cookie"))
    const polyhookID = params.hookID
    if (!projectID || !polyhookID || !sessionID) return redirect("/projects")
    const confirmation = await trpc.polyhooks.delete.query({projectID, polyhookID, sessionID})
    if (!confirmation) return redirect("/projects")
    return redirect(`/${projectID}/polyhooks`)
}

export default function Settings() {
    return (
        <div className="w-full p-12 flex flex-col space-y-12 overflow-auto">
            <Form method="post" className="flex flex-col space-y-4 rounded-lg bg-slate-100 w-1/3 p-3">
                <h2 className="text-lg font-bold">Delete Hook</h2>
                <p className="text-sm opacity-60">This action cannot be undone.</p>
                <button type="submit" className="px-3 py-1 bg-black text-white text-sm w-[max-content] rounded-lg">Delete Hook</button>
            </Form>
        </div>
    )
}