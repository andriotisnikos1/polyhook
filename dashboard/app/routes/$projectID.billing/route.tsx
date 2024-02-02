export default function Route() {
  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <p className="text-2xl font-bold border-b p-5">Billing</p>
      <div className="p-5 flex flex-col w-full items-center ">
        <p className="mb-8 text-sm border-[2px] rounded-full px-3 border-green-400 text-green-400 bg-green-50">Why are you even here? I said its free!</p>
        <div className="flex items-center justify-evenly w-full px-8 pb-8 space-x-5">
          <div className="p-3 border shadow-md rounded-lg flex flex-col min-w-[150px] w-1/2 space-y-10">
            <p className=" font-bold">Plan</p>
            <p className="text-3xl font-semibold text-green-400">Pro</p>
          </div>
          <div className="p-3 border shadow-md rounded-lg flex flex-col min-w-[150px] space-y-10 w-1/2">
            <p className=" font-bold">Next month's bill</p>
            <p className="text-3xl font-semibold ">$0.00</p>
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
