import { redirect, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import cookies from "~/scripts/cookies";
import worldapi from "~/scripts/worldapi";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const sessionID = await cookies.session.parse(request.headers.get("Cookie"));
  if (!sessionID) return redirect("/login");
  const user = await worldapi.auth().getUser(sessionID);
  return user ? redirect("/projects", {
    headers: {
      "Set-Cookie": await cookies.user.serialize(user),
    },
  }) : redirect("/login");
};

export default function Index() {
  return <></>
}
