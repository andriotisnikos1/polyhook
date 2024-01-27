import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { User } from "node_modules/@worldapi/sdk/types/User";
import cookies from "~/scripts/cookies";

export const loader: LoaderFunction = async ({ request }) => {
  const sessionID = await cookies.session.parse(request.headers.get("Cookie"));
  if (!sessionID) return redirect("/login");
  const user = await cookies.user.parse(request.headers.get("Cookie"))
  return user ? { user } : redirect("/login")
}

export default () => {
  const loaderData = useLoaderData<{ user: User }>();
  if (!loaderData.user) return null
  const { user } = loaderData
  return (
    <div className="flex flex-col  h-full w-full space-y-10 items-center pt-20">
      <div className="flex items-center space-x-2">
        <img src={user.avatar ?? undefined} alt="avatar" height={35} width={35} className="rounded-full" />
        <p className="text-xl font-semibold">{user.name}'s Projects</p>
      </div>
      <Link to={"/hello"} className="w-2/5 flex flex-col space-y-2">
        <div className="flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 rounded-md">
          <p className="font-semibold text-lg">polyhook</p>
          <p>5 services</p>
        </div>
      </Link>
    </div>
  );
};
