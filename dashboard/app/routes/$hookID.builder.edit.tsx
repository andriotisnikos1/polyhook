import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default () => {
    const [fields, setFields] = useState<{ value: string }[]>([]);
    const handleNew = () => {
        setFields([...fields, { value: "" }]);
    }
    const [editing, setEditing] = useState<boolean>(false);
    return (
        <div className="w-full p-12 flex flex-col space-y-12 overflow-auto">
            <div className="flex flex-col space-y-4">
                <h2 className="text-lg font-bold">Actions</h2>
                <div className="grid gap-2 w-full grid-cols-3 grid-flow-row">
                    <Action />
                    <Action />
                    <Action />
                    <Action />
                    <Action />
                </div>
            </div>
            <button className="px-3 py-1 bg-black text-white text-sm w-[max-content] rounded-lg">Save Changes</button>
        </div>
    )
}

function Action() {
    return (
        <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-slate-100 w-[330px]">
                <input type="text" className="w-full bg-transparent outline-none" defaultValue={"hello world"} />
            </div>
            <div className="p-1 rounded-full border-[3px] border-slate-100 hover:border-black"><Pencil1Icon /></div>
            <div className="p-1 rounded-full border-[3px] border-slate-100 hover:border-black"><TrashIcon /></div>
        </div>
    )
}