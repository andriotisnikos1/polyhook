import { CheckCircledIcon } from "@radix-ui/react-icons";

export default function Route() {
  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <p className="text-2xl font-bold border-b p-5">Billing</p>
      <div className="p-5 flex flex-col w-full space-y-16 items-center">
        <div className="flex items-center justify-evenly w-full">
          <div className="p-3 border shadow-md rounded-lg flex flex-col min-w-[150px] space-y-4">
            <p className="text-xs font-bold">Plan</p>
            <p className="text-sm font-semibold text-blue-400">Basic</p>
          </div>
          <div className="p-3 border shadow-md rounded-lg flex flex-col min-w-[150px] space-y-4">
            <p className="text-xs font-bold">Next month's bill</p>
            <p className="text-sm font-semibold ">$3.00</p>
          </div>
        </div>
        <div className="flex items-center w-3/4 justify-between rounded-lg bg-slate-100 p-2">
          <p className="text-sm font-bold">Manage Plan</p>
          <button className="bg-black px-3 py-1 rounded-md text-sm text-white">
            Open Portal
          </button>
        </div>
      </div>
    </div>
  );
}
