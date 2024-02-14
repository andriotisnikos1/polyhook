import { ActionFunction, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { User } from "node_modules/@worldapi/sdk/types/User";
import cookies from "~/scripts/cookies";
import * as Dialog from "@radix-ui/react-dialog";
import dialogCss from "~/styles/radix-ui/dialog.css";
import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import trpc from "~/scripts/trpc";
import { polyhook } from "~/types/project";

export const links = () => [{ rel: "stylesheet", href: dialogCss }];

export const loader: LoaderFunction = async ({ request }) => {
  const sessionID = await cookies.session.parse(request.headers.get("Cookie"));
  if (!sessionID) return redirect("/login");
  const user = await cookies.user.parse(request.headers.get("Cookie"))
  if (!user) return redirect("/login")
  const projects = await trpc.projects.list.query({ sessionID })
  return {
    user: JSON.parse(user),
    projects: projects ?? []
  }
}

export const action: ActionFunction = async ({ request }) => {
  const sessionID = await cookies.session.parse(request.headers.get("Cookie"));
  if (!sessionID) return redirect("/login");
  const formData = await request.formData();
  const project_name = formData.get("project_name")! as string;
  const project = await trpc.projects.create.query({ name: project_name, sessionID });
  if (!project) return redirect("/login");
  return redirect(`/${project.projectID}`);
}

export const meta: MetaFunction = ({ }) => [
  {
    name: "My Projects - Polyhook",
  }
]


export default () => {
  const loaderData = useLoaderData<{ user: User, projects: polyhook.Project[] }>();
  if (!loaderData.user || loaderData.projects == null) return null
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
        <NewProjectDialog />
      </div>
    </div>
  );
};

function NewProjectDialog() {
  const closeref = React.useRef<HTMLButtonElement>(null);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 hover:bg-slate-100 rounded-[6px] flex items-center space-x-2">
          <PlusIcon className="text-gray-400" />
          <p>New Project</p>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent !w-[400px]" >
          <Form method="post" className="flex flex-col space-y-4" >
            <h1>Create new project</h1>
            <div>
              <p className="text-xs font-semibold">Name</p>
              <div className="w-full border rounded-lg px-3 py-1" ><input required autoComplete="off" type="text" name="project_name" className="w-full text-sm outline-none" /></div>
            </div>
            <div className="flex items-center space-x-2">
              <button type="submit" className="text-sm bg-black px-3 py-1 rounded-md text-white w-[max-content]">Submit</button>
              <button onClick={() => closeref.current?.click()} className="text-sm px-3 py-1">Cancel</button>
            </div>
          </Form>
          <Dialog.Close hidden ref={closeref} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}


function Project({ project }: { project: polyhook.Project }) {
  return (
    <div className="flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 rounded-md">
      <p className="font-semibold text-lg">{project.name}</p>
      <p>{project.polyhooks} polyhooks</p>
    </div>
  )
}