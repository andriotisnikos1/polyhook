export default function Settings() {
    return (
        <div className="w-full p-12 flex flex-col space-y-12 overflow-auto">
            <div className="flex flex-col space-y-4 rounded-lg bg-slate-100 w-1/3 p-3">
                <h2 className="text-lg font-bold">Delete Hook</h2>
                <p className="text-sm opacity-60">This action cannot be undone.</p>
                <button className="px-3 py-1 bg-black text-white text-sm w-[max-content] rounded-lg">Delete Hook</button>
            </div>
        </div>
    )
}