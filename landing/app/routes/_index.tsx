import { Link1Icon } from "@radix-ui/react-icons";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData, Link } from "@remix-run/react";
import { useEffect } from "react";
import { createToast } from "vercel-toast";
import { Headbar } from "~/components/Headbar";

export const meta: MetaFunction = () => {
  return [
    { title: "Polyhook | Important notifications, when you need them." },
    {
      name: "description",
      content:
        "Polyhook allows you to send emails and trigger multiple webhooks with the push of a button!",
    },
    {
      name: "og:title",
      content: "Polyhook | Important notifications, when you need them.",
    },
    {
      name: "og:description",
      content:
        "Polyhook allows you to send emails and trigger multiple webhooks with the push of a button!",
    },
    {
      name: "og:url",
      content: "https://polyhook.me",
    },
    {
      name: "twitter:title",
      content: "Polyhook | Important notifications, when you need them.",
    },
    {
      name: "twitter:description",
      content:
        "Polyhook allows you to send emails and trigger multiple webhooks with the push of a button!",
    },
    {
      name: "og:image",
      content: "https://polyhook.me/assets/images/social/banner.png",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:image",
      content: "https://polyhook.me/assets/images/social/banner.png",
    },
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
  return true;
};

export const loader: LoaderFunction = async ({ request }) => {
  const urlSearchParams = new URLSearchParams(request.url.split("?")[1]);
  const fromHeadbar = urlSearchParams.get("fromHeadbar");
  if (fromHeadbar === "true") return true;
  return false;
};

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
      className="mt-5 flex items-center space-x-1 rounded-xl border p-1 mb-10"
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
  const actionData = useActionData<boolean>();
  const loaderData = useLoaderData<boolean>();
  useEffect(() => {
    if (actionData) {
      createToast("You've been added to the waitlist!", {
        type: "success",
        timeout: 5000,
      });
    }
    if (loaderData && !actionData) {
      createToast("You can join the waitlist in this page.", {
        type: "dark",
        timeout: 5000,
      });
    }
  }, [actionData, loaderData]);
  return (
    <div className="flex h-full w-full flex-col items-center">
      <Headbar />
      <Link to="https://www.producthunt.com/@nikos_andriotis" className="my-10 rounded-full border border-black px-2 text-sm">
        Product Hunt launch coming soon!
      </Link>
      <Hero />
      <p className="mt-5">
        Polyhook allows you to send emails (soon) and trigger multiple webhooks with
        the push of a button!
      </p>
      <Waitlist />
      <AutoScale />
      <div className="flex items-center space-x-4 mt-4 justify-center">
        <PredictablePricing />
        <NoCode />
      </div>
    </div>
  );
}
