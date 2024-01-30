import { redirect, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import cookies from "~/scripts/cookies";
import trpc from "~/scripts/trpc";
import worldapi from "~/scripts/worldapi";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const sessionID = await cookies.session.parse(request.headers.get("Cookie"));
  if (!sessionID) return redirect("/login?from_root=true");
  const user = await worldapi.auth().getUser(sessionID);
  if (!user) return redirect("/login?from_root=true");
  const final = await trpc.auth.finalize.query({ sessionID });
  if (!final) return redirect("/login?from_root=true");
  return redirect("/projects", {
    headers: {
      "Set-Cookie": await cookies.projects.serialize(final.projects),
      "set-cookie": await cookies.user.serialize(JSON.stringify(user)),
    },
  });
};

export default function Index() {
  return <></>
}
