import { GitHubLogoIcon, Link1Icon } from "@radix-ui/react-icons";
import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import cookies from "~/scripts/cookies";
import worldapi from "~/scripts/worldapi";

interface LoaderData {
  auth: {
    github: string;
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const links = {
    auth: {
      github: worldapi.auth().getAuthURL("github"),
    },
  };
  const from_root = request.url.includes("from_root=true");
  if (from_root) return links
  const sessionID = await cookies.session.parse(request.headers.get("Cookie"));
  if (sessionID) return redirect("/");
  return links
};

export default function Login() {
  return (
    <div className="h-full w-full flex items-center">
      <LoginForm />
      <div className="w-1/2 h-full flex flex-col">
        <div className="w-full h-2/5 flex items-center justify-center">
          <div className="rounded-full w-[2px] bg-slate-200 h-full" />
        </div>
        <div className="w-full h-1/5 flex items-center justify-center space-x-2 scale-150">
          <Link1Icon />
          <p className="text-sm font-bold">Polyhook</p>
        </div>
        <div className="w-full h-2/5 flex items-center justify-center">
          <div className="rounded-full w-[2px] bg-slate-200 h-full" />
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const loaderData = useLoaderData<LoaderData>();
  if (!loaderData.auth) loaderData.auth = { github: "" };
  return (
    <div className="w-1/2 h-full flex items-center justify-center">
      <div className="flex flex-col w-1/2 p-5 space-y-5">
        <div className="flex flex-col space-y-1 font-montserrat">
          <h1 className="text-2xl tracking-wider">Sign In</h1>
          <p className="text-sm opacity-60">to your Polyhook account</p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-sm">Thrid Party</p>
          <div className="flex flex-col space-y-3">
            <a
              href={loaderData.auth.github}
              className="flex items-center justify-center space-x-2 border rounded-lg py-1 hover:bg-slate-100"
            >
              <GitHubLogoIcon />
              <p>Sign In with GitHub</p>
            </a>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-sm">Email</p>
          <p className="flex items-center border justify-center rounded-lg font-montserrat px-5 py-8">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}
