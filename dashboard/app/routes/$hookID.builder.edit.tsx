import { ActionFunction } from "@remix-run/node"
import { Form, useOutletContext } from "@remix-run/react"
import cookies from "~/scripts/cookies"
import trpc from "~/scripts/trpc"
import { polyhook } from "~/types/project"

export const action: ActionFunction = async ({ request, params }) => {
    const formData = await request.formData()
    const projectID = await cookies.projectID.parse(request.headers.get("Cookie"))
    const sessionID = await cookies.session.parse(request.headers.get("Cookie"))
    if (!projectID) return false
    const urls = (formData.get("urls") as string).split("\n").map(url => url.trim()).filter(url => url.length > 0)
    const res = await trpc.polyhooks.edit.query({ projectID, urls, polyhookID: params.hookID!, sessionID})
    return res
}

export default () => {
    const ctx = useOutletContext<polyhook.Polyhook>()
    return (
        <Form method="post" className="w-full p-12 flex flex-col space-y-12 overflow-auto">
            <div className="flex flex-col space-y-4">
                <h2 className="text-lg font-bold">URLs (one under another)</h2>
                <textarea name="urls" defaultValue={ctx.urls.join("\n")} className="w-full min-h-[300px] outline-none border rounded-lg p-2 text-sm"/>
            </div>
            <button type="submit" className="px-3 py-1 bg-black text-white text-sm w-[max-content] rounded-lg">Save Changes</button>
        </Form>
    )
}