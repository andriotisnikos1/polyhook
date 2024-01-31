import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { User } from "node_modules/@worldapi/sdk/types/User";
import cookies from "~/scripts/cookies";
import { Project as ProjectT } from "~/types/project";

export const loader: LoaderFunction = async ({ request }) => {
  const sessionID = await cookies.session.parse(request.headers.get("Cookie"));
  if (!sessionID) return redirect("/login");
  const user = await cookies.user.parse(request.headers.get("Cookie"))
  if (!user) return redirect("/login")
  const projects = await cookies.projects.parse(request.headers.get("Cookie"))
  return{
    user: JSON.parse(user),
    projects: [
      {
        polyhooks: 5,
        name: "hello",
        projectID: "hello"
      }
    ]
  }
}

export default () => {
  const loaderData = useLoaderData<{ user: User, projects: ProjectT.Project[] }>();
  if (!loaderData.user || !loaderData.projects) return null
  const { user } = loaderData
  return (
    <div className="flex flex-col  h-full w-full space-y-10 items-center pt-20">
      <div className="flex items-center space-x-2">
        <img src={user.avatar ?? undefined} alt="avatar" height={35} width={35} className="rounded-full" />
        <p className="text-xl font-semibold">{user.name}'s Projects</p>
      </div>
      <div className="flex flex-col space-y-5 w-full items-center">
        {loaderData.projects.map((project) => (
          <Link to={`/${project.projectID}`} key={project.projectID} className="w-2/5">
            <Project project={project} />
          </Link>
        ))}
        </div>
    </div>
  );
};


function Project({ project }: { project: ProjectT.Project }) {
  return (
    <div className="flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 rounded-md">
          <p className="font-semibold text-lg">{project.name}</p>
          <p>{project.polyhooks} polyhooks</p>
        </div>
  )
}