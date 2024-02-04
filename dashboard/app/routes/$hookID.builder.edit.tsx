import { ActionFunction } from "@remix-run/node"
import { Form, useOutletContext } from "@remix-run/react"
import { polyhook } from "~/types/project"

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    const urls = (formData.get("urls") as string).split("\n").map(url => url.trim()).filter(url => url.length > 0)
    return null
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