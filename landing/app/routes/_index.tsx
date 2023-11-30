import { Link1Icon } from "@radix-ui/react-icons";
import type { ActionFunction, MetaFunction } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  await fetch("https://api.getwaitlist.com/api/v1/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      waitlist_id: 12211,
      email,
    }),
  });
  return null;
};

function Headbar() {
  return (
    <div className="flex w-4/5 items-center justify-between border-b px-2 py-3">
      <div className="flex items-center space-x-2">
        <Link1Icon height="20" width="20" />
        <h1 className="font-bold">Polyhook</h1>
      </div>
      <button className="rounded-full bg-black px-3 py-1 text-sm text-white">
        Join Waitlist
      </button>
    </div>
  );
}

function Hero() {
  return (
    <>
      <h1 className="font-montserrat text-[50px] tracking-widest">
        Important notifications
      </h1>
      <h1 className="font-montserrat text-[40px] tracking-widest">
        when you need them.
      </h1>
    </>
  );
}

function Waitlist() {
  return (
    <Form
      className="mt-10 flex items-center space-x-1 rounded-xl border p-1 mb-10"
      method="post"
    >
      <input
        type="email"
        name="email"
        className="bg-transparent pl-4 outline-none"
        placeholder="Your Email"
      />
      <button
        className="rounded-lg bg-black px-3 py-2 text-sm text-white"
        type="submit"
      >
        Join Waitlist
      </button>
    </Form>
  );
}

function AutoScale() {
  return (
    <div className="mx-2 my-2 flex flex-col rounded-lg bg-slate-100 p-5 pt-14 w-3/5">
      <div className="flex w-[max-content] items-center space-x-2 p-2 font-semibold">
        <img
          src="https://r2.world-api.net/radix-icons/magic-wand.svg"
          alt="magic-wand"
          height="20"
          width="20"
        />
        <p>Scales Auto-magically</p>
      </div>
      <p>
        With servers running on the edge, request hundreds of webhook executions{" "}
        <i>without worry</i>
      </p>
    </div>
  );
}

function PredictablePricing() {
  return (
    <div className="mx-2 my-2 flex w-2/5 flex-col rounded-lg bg-slate-100 p-5 pt-14">
      <div className="flex w-[max-content] items-center space-x-2 p-2 font-semibold">
        <img
          src="https://r2.world-api.net/radix-icons/magic-wand.svg"
          alt="magic-wand"
          height="20"
          width="20"
        />
        <p>Predictable Pricing</p>
      </div>
      <p>
        You get charged by the request. Know what you'll pay before you execute
        any requests
      </p>
    </div>
  );
}

function NoCode() {
  return (
    <div className="mx-2 my-2 flex w-2/5 flex-col rounded-lg bg-slate-100 p-5 pt-14">
      <div className="flex w-[max-content] items-center space-x-2 p-2 font-semibold">
        <img
          src="https://r2.world-api.net/radix-icons/check-circled.svg"
          alt="magic-wand"
          height="20"
          width="20"
        />
        <p>No-code friendly</p>
      </div>
      <p>
        No need to know how to code. Everything can be managed via the
        dashboard, other than code
      </p>
    </div>
  );
}

export default function Index() {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <Headbar />
      <p className="my-10 rounded-full border border-black px-2 text-sm">
        Product Hunt launch coming soon!
      </p>
      <Hero />
      <Waitlist />
      <AutoScale />
      <div className="flex items-center space-x-4 mt-4 justify-center">
        <PredictablePricing />
        <NoCode />
      </div>
    </div>
  );
}
