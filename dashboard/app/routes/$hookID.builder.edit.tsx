
export default () => {
    return (
        <div className="w-full p-12 flex flex-col space-y-12 overflow-auto">
            <div className="flex flex-col space-y-4">
                <h2 className="text-lg font-bold">URLs (one under another)</h2>
                <textarea name="" className="w-full min-h-[300px] outline-none border rounded-lg p-2 text-sm"/>
            </div>
            <button className="px-3 py-1 bg-black text-white text-sm w-[max-content] rounded-lg">Save Changes</button>
        </div>
    )
}