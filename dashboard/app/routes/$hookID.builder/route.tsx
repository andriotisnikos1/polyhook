import { ArrowLeftIcon, Link1Icon } from "@radix-ui/react-icons";
import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export const loader:LoaderFunction = async ({ params }) => ({hookID: params.hookID})

export default function Route() {
  const loaderData = useLoaderData<{ hookID: string }>();
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex p-3">
        <button className="px-3 py-1 bg-black text-white flex items-center space-x-2 rounded-md">
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text-sm">Dashboard</span>
        </button>
      </div>
      <div className="flex items-center space-x-4 p-8">
        <Link1Icon className="w-8 h-8" />
        <div className="flex flex-col space-y-1">
          <p className="text-2xl font-extrabold">Hello World</p>
          <p className="text-sm opacity-60">20 Actions</p>
        </div>
      </div>
      <div className="w-full px-5 flex items-center space-x-2 border-b pb-3">
        <Link to={`summary`} className="px-3 py-2 text-sm hover:bg-slate-100 data-[active=true]:bg-slate-100 rounded-lg">
          Summary
        </Link>
        <button className="px-3 py-2 text-sm hover:bg-slate-100 data-[active=true]:bg-slate-100 rounded-lg">
          Edit
        </button>
        <button className="px-3 py-2 text-sm hover:bg-slate-100 data-[active=true]:bg-slate-100 rounded-lg">
          Settings
        </button>
      </div>
      <Outlet />
    </div>
  );
}
