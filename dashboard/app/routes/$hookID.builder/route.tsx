import { useClipboard } from "@mantine/hooks";
import { ArrowLeftIcon, CheckIcon, ClipboardIcon, Link1Icon } from "@radix-ui/react-icons";
import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import cookies from "~/scripts/cookies";
import trpc from "~/scripts/trpc";
import { polyhook } from "~/types/project";

export const loader: LoaderFunction = async ({request,params}) => {
  const sessionID = await cookies.session.parse(request.headers.get("Cookie"))
  const sp = new URLSearchParams(request.url.split("?")[1] || "")
  let projectID = sp.get("projectID")
  if(!sessionID) return redirect("/login")
  if (!projectID) projectID = await cookies.projectID.parse(request.headers.get("Cookie") || "")
  if (!projectID) return redirect("/projects")
  const polyhook = await trpc.polyhooks.fetch.query({projectID, sessionID, polyhookID: params.hookID!})
  if (!polyhook) return redirect(`/${projectID}`)
  return json({projectID, polyhook}, {headers: {"Set-Cookie": await cookies.projectID.serialize(projectID)}})
}


export default function Route() {
  const loaderData = useLoaderData<{projectID: string, polyhook: polyhook.Polyhook}>()
  const clipboard = useClipboard()
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex p-3">
        <a href={`/${loaderData.projectID}`} className="px-3 py-1 bg-black text-white flex items-center space-x-2 rounded-md">
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text-sm">Dashboard</span>
        </a>
      </div>
      <div className="flex items-center space-x-4 p-8">
        <Link1Icon className="w-8 h-8" />
        <div className="flex flex-col space-y-1">
          <p className="text-2xl font-extrabold">{loaderData.polyhook.name}</p>
          <p className="text-sm opacity-60">{loaderData.polyhook.urls.length} Actions</p>
        </div>
        <div onClick={() => clipboard.copy(`https://runner.polyhook.me/${loaderData.polyhook.polyhookID}`)} className="ml-2 flex items-center space-x-2 rounded-lg hover:bg-slate-100 p-2">
          {clipboard.copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-4 h-4" />}
          <p className="text-sm">https://runner.polyhook.me/{loaderData.polyhook.polyhookID}</p>
        </div>
      </div>
      <div className="w-full px-5 flex items-center space-x-2 border-b pb-3">
        <Link to={`summary`} className="px-3 py-2 text-sm hover:bg-slate-100 data-[active=true]:bg-slate-100 rounded-lg">
          Summary
        </Link>
        <Link to={'edit'} className="px-3 py-2 text-sm hover:bg-slate-100 data-[active=true]:bg-slate-100 rounded-lg">
          <p>Edit</p>
        </Link>
        <Link to={'settings'} className="px-3 py-2 text-sm hover:bg-slate-100 data-[active=true]:bg-slate-100 rounded-lg">
          Settings
        </Link>
      </div>
      <Outlet context={loaderData.polyhook} />
    </div>
  );
}
