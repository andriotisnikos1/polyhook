import {
  ArrowRightIcon,
  ChevronRightIcon,
  ExitIcon,
  Link1Icon,
  Link2Icon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { Link, Outlet, useParams } from "@remix-run/react";

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
        <div className="flex items-center border rounded-lg p-3 space-x-4">
          <ChevronRightIcon className="text-gray-400" />
          <p className="text-sm">No project selected</p>
        </div>
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
