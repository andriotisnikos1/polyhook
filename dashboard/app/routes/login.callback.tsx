import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import cookies from "~/scripts/cookies";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  let sessionID = url.searchParams.get("sessionID");
  return redirect("/", {
    headers: {
      "Set-Cookie": cookies.session.serialize(sessionID || ""),
    },
  });
};

export default () => {
  return null;
};
