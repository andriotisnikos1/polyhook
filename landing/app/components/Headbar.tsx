import { Link1Icon } from "@radix-ui/react-icons";
import { Link } from "@remix-run/react";
import { createToast } from "vercel-toast";

export function Headbar() {
  return (
    <div className="flex w-full md:w-4/5 items-center justify-between border-b px-2 py-3">
      <Link to={"/"} className="flex items-center space-x-2">
        <Link1Icon height="20" width="20" />
        <h1 className="font-bold">Polyhook</h1>
      </Link>
      <div className="flex items-center space-x-2">
        <a
          href="/"
          className="px-3 py-1 rounded-full hover:bg-slate-100 font-semibold text-sm"
        >
          Home
        </a>
        {/* <a
          href="/pricing"
          className="px-3 py-1 rounded-full hover:bg-slate-100 font-semibold text-sm"
        >
          Pricing
        </a> */}
      </div>
      <div className="flex items-center space-x-2">
        <Link
          to={"https://dashboard.polyhook.me/login"}
          className="rounded-full px-3 py-1 text-sm"
        >
          Dashboard
        </Link>
        <Link
          to={"/"}
          className="rounded-full bg-black px-3 py-1 text-sm text-white"
        >
          Join Waitlist
        </Link>
      </div>
    </div>
  );
}
