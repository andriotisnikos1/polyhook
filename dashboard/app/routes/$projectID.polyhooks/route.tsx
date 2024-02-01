import { PlusIcon } from "@radix-ui/react-icons";
import { Link, useLoaderData, useParams } from "@remix-run/react";

interface Polyhook {
  polyhookID: string;
  name: string;
  actions: number;
}

export const loader = () => ({
  polyhooks: [
    {
      polyhookID: "1",
      name: "Hello World Polyhook",
      actions: 20
    }
  ]
})

export default function Route() {
  const loaderData = useLoaderData<{polyhooks: Polyhook[]}>()
  const polyhooks = loaderData.polyhooks ?? []
  return (
    <div className="flex flex-col w-full h-full overflow-auto space-y-8">
      <p className="text-2xl font-bold border-b p-5">Active Polyhooks</p>
        <div className="flex items-center justify-start w-full pl-7">
          <button className="text-white bg-black p-2 rounded-full"><PlusIcon/></button>
        </div>
      <div className="grid grid-cols-4 grid-flow-row px-8 gap-3">
        {polyhooks.map((polyhook) => (
          <Hook key={polyhook.polyhookID} polyhook={polyhook} />
        ))}
      </div>
    </div>
  );
}

function Hook({polyhook} : {polyhook: Polyhook}) {
  const params = useParams()
  const {projectID} = params
  if (!projectID) return null
  return (
    <Link
      to={`/${polyhook.polyhookID}/builder/summary?projectID=${projectID}`}
      className="border rounded-lg shadow-md flex flex-col space-y-5 min-w-[200px] p-4"
    >
      <p className="text-sm font-bold">
        {polyhook.name}
      </p>
      <p className="text-xs">
        {polyhook.actions} Actions</p>
    </Link>
  );
}
