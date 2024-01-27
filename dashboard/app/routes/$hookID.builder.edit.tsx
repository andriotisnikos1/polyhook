import { useState } from "react";

export default () => {
    const [fields, setFields] = useState<{value: string}[]>([]);
    const handleNew = () => {
        setFields([...fields, { value: "" }]);
    }
    return (
        <div className="flex flex-col p-5">
            {fields.map((field, i) => (<input key={i} className="border" />))}
            <button onClick={handleNew} className="px-3 py-1 rounded-md bg-black text-white">new</button>
        </div>
    )
}