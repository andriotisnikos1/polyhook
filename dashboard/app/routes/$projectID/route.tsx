import {
  ChevronRightIcon,
  ExitIcon,
  Link1Icon,
  Link2Icon,
  PlusIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { Form, Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import dropdownCSS from "~/styles/radix-ui/dropdown.css";
import { LoaderFunction, redirect } from "@remix-run/node";
import cookies from "~/scripts/cookies";
import dialogCSS from "~/styles/radix-ui/dialog.css";
import { Project } from "~/types/project";
import React from "react";

export const links = () => [{ rel: "stylesheet", href: dropdownCSS }, { rel: "stylesheet", href: dialogCSS }];

export const loader: LoaderFunction = async ({ request }) => {
  const projects = await cookies.projects.parse(request.headers.get("Cookie"));
  if (!projects) return redirect("/login");
  return {
    projects: [
      {
        polyhooks: 5,
        name: "hello",
        projectID: "hello",
      },
    ],
  }
}

export const action = () => {
  console.log("action");
  return null;
}

export default () => {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="w-4/5 h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

function Sidebar() {
  const params = useParams();
  const projectID = params.projectID ?? "not found";

  return (
    <div className="h-full border-r w-1/5 flex flex-col p-5 justify-between">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <Link1Icon height={30} width={30} />
          <p className="font-bold text-lg">Polyhook</p>
        </div>
        <ProjectDropdown />
        <div
          className="flex flex-col space-y-2 w-full"
          hidden={projectID === "not found"}
        >
          <Link
            to={`/${projectID}/polyhooks`}
            className="flex items-center px-3 py-2 text-sm hover:bg-slate-100 space-x-2 rounded-lg"
          >
            <Link2Icon className="text-gray-400" />
            <p>Polyhooks</p>
          </Link>
          <Link
            to={`/${projectID}/billing`}
            className="flex items-center px-3 py-2 text-sm hover:bg-slate-100 space-x-2 rounded-lg"
          >
            <ReaderIcon className="text-gray-400" />
            <p>Billing</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full space-y-3">
        <div className="flex items-center px-3 pt-2 space-x-2">
          <img
            src="https://avatars.githubusercontent.com/u/67287051?v=4"
            alt="user_icon"
            className="h-8 w-8 rounded-full"
          />
          <p className="text-sm font-bold">Nikos Andriotis</p>
        </div>
        <button className="p-3 px-5 border-[2px] hover:border-black rounded-lg flex items-center space-x-2">
          <ExitIcon className="text-red-400" />
          <p className="text-sm">Logout</p>
        </button>
      </div>
    </div>
  );
}

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
          <Form method="post" className="flex flex-col space-y-4">
            <h1>Create new project</h1>
            <div>
              <p className="text-xs font-semibold">Name</p>
              <div className="w-full border rounded-lg px-3 py-1" ><input type="text" name="project_name" className="w-full text-sm outline-none" /></div>
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


function ProjectDropdown() {
  const projectID = useParams().projectID;
  const loaderData = useLoaderData<{ projects: Project.Project[] }>();
  if (!loaderData.projects) return null;
  const project = loaderData.projects.find((p) => p.projectID === projectID);
  if (!project) return null;
  const ProjectDisplay = (p: Project.Project) => <Link to={`/${p.projectID}`} className="px-4 py-2 hover:bg-slate-100 rounded-[6px]">{p.name}</Link>
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="flex items-center border rounded-lg p-3 space-x-4">
          <ChevronRightIcon className="text-gray-400" />
          <p className="text-sm">{project?.name}</p>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <div className="w-full h-full border rounded-[14px] flex flex-col space-y-2 p-2 ">
            {loaderData.projects.map((project) => (
              <ProjectDisplay key={project.projectID} {...project} />
            ))}
            <NewProjectDialog />
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}