import * as Dialog from "@radix-ui/react-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import React from "react";
import dialogCSS from "~/styles/radix-ui/dialog.css";

export const links = () => [{ rel: "stylesheet", href: dialogCSS }]

interface Polyhook {
  polyhookID: string;
  name: string;
  actions: string[]
  analytics: {
    runs: number
    successful: number
  }
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
  const loaderData = useLoaderData<{ polyhooks: Polyhook[] }>()
  const polyhooks = loaderData.polyhooks ?? []
  return (
    <div className="flex flex-col w-full h-full overflow-auto space-y-8">
      <p className="text-2xl font-bold border-b p-5">Active Polyhooks</p>
      <div className="flex items-center justify-start w-full pl-7">
        <NewPolyhookDialog />
      </div>
      <div className="grid grid-cols-4 grid-flow-row px-8 gap-3">
        {polyhooks.map((polyhook) => (
          <Hook key={polyhook.polyhookID} polyhook={polyhook} />
        ))}
      </div>
    </div>
  );
}

function Hook({ polyhook }: { polyhook: Polyhook }) {
  const params = useParams()
  const { projectID } = params
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

function NewPolyhookDialog() {
  const [urls, setUrls] = React.useState<string[]>([])
  const closeref = React.useRef<HTMLButtonElement>(null)
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="text-white bg-black p-2 rounded-full"><PlusIcon /></button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent !w-[600px]">
          <div className="flex flex-col space-y-8">
            <h1 className="font-semibold text-xl">New Polyhook</h1>
            <div className="flex flex-col space-y-1 items-start justify-center">
              <span className="text-xs font-bold">Name</span>
              <div className="border rounded-lg w-full"><input type="text" name="" className="px-3 py-1 text-sm w-[90%]" /></div>
            </div>
            <div className="flex flex-col space-y-1 items-start justify-center w-full">
              <span className="text-xs font-bold">URLs (one under the other)</span>
              <div className="flex flex-col space-y-2 w-full">
                <textarea name="" id="" className="outline-none p-2 text-sm border rounded-lg min-h-[400px]"></textarea>
              </div>
            </div>
            <div className="flex items-center justify-start space-x-4">
              <button className="text-white bg-black px-3 py-1 rounded-md">Create</button>
              
                <button className="px-3 py-1 rounded-md" onClick={() => {
                  setUrls([])
                  closeref.current?.click()
                }}>Cancel</button>
                <Dialog.Close ref={closeref}/>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
