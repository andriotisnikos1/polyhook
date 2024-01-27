import { Link } from "@remix-run/react";

export default function Route() {
  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <p className="text-2xl font-bold border-b p-5">Active Polyhooks</p>
      <div className="grid grid-cols-4 grid-flow-row p-8 gap-3 pt-16">
        <Hook />
        <Hook />
        <Hook />
        <Hook />
        <Hook />
        <Hook />
        <Hook />
        <Hook />
        <Hook />
        <Hook />
        <Hook />
        <Hook />
        <Hook />
        <Hook />
        <Hook />
      </div>
    </div>
  );
}

function Hook() {
  return (
    <Link
      to="/lmao/builder/summary"
      className="border rounded-lg shadow-md flex flex-col space-y-5 min-w-[200px] p-4"
    >
      <p className="text-sm font-bold">Hello World Polyhook</p>
      <p className="text-xs">20 Actions</p>
    </Link>
  );
}
