import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default () => {
    const [fields, setFields] = useState<{value: string}[]>([]);
    const handleNew = () => {
        setFields([...fields, { value: "" }]);
    }
    const [editing, setEditing] = useState<boolean>(false);
    return (
        <div className="w-full p-12 flex flex-col space-y-12">
            <h2 className="text-lg font-bold">Actions</h2>
            <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-slate-100 w-[330px]">
                <input type="text" className="w-full bg-transparent outline-none" defaultValue={"hello world"} readOnly={editing} />
            </div>
            <div className="p-1 rounded-full border-[3px] border-slate-100 hover:border-black"><Pencil1Icon/></div>
            <div className="p-1 rounded-full border-[3px] border-slate-100 hover:border-black"><TrashIcon/></div>
            </div>
        </div>
    )
}