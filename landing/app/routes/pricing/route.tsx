import { CheckCircledIcon } from "@radix-ui/react-icons";
import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Headbar } from "~/components/Headbar";

export const meta: MetaFunction = () => [
  { title: "Polyhook | Pricing" },
  {
    name: "description",
    content:
      "Polyhook's pricing is simple and easy to understand. We have a basic plan and a pro plan that caters to your needs.",
  },
  {
    name: "og:title",
    content: "Polyhook | Pricing",
  },
  {
    name: "og:description",
    content:
      "Polyhook's pricing is simple and easy to understand. We have a basic plan and a pro plan that caters to your needs.",
  },
  {
    name: "og:url",
    content: "https://polyhook.me/pricing",
  },
  {
    name: "twitter:title",
    content: "Polyhook | Pricing",
  },
  {
    name: "twitter:description",
    content:
      "Polyhook's pricing is simple and easy to understand. We have a basic plan and a pro plan that caters to your needs.",
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

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center space-y-16 pb-24">
      <Headbar />
      <Hero />
      <div className="flex flex-col space-y-5 md:!flex-row  md:items-center md:space-x-4">
        <BasicPlan />
        <ProPlan />
      </div>
    </div>
  );
}

function ProPlan() {
  return (
    <Link to={"https://dashboard.polyhook.me/login"} className="flex rounded-xl flex-col border-[2px] p-5 space-y-5 min-w-[250px] border-orange-400">
      <p className="text-sm font-semibold text-orange-400">Pro</p>
      <div className="flex items-center space-x-2">
        <span className="text-[30px] font-bold">Free</span>
        <div className="flex flex-col">
          <span className="text-xs">per month</span>
          <span className="text-xs">billed monthly</span>
        </div>
      </div>
      <button className="border-[2px] border-orange-400 rounded-full px-3 py-2 text-sm">
        💼 Pro it is
      </button>
      <div className="flex flex-col space-y-4 pt-6">
        <p className="text-xs font-semibold text-orange-400">Benefits</p>
        <div className="flex flex-col space-y-4">
          <Benefit label="Unlimited Projects" />
          <Benefit label="Unlimited Polyhooks" />
          <Benefit label="Unlimited Polyhook Connections" />
          <Benefit label="10,000 Executions Included" />
          <Benefit label="API Access (Soon)" />
          <Benefit label="Rate Limiting (Soon)" />
          <Benefit label="Premium Email Support" />
          <Benefit label="Access to Slack Community" />
        </div>
      </div>
    </Link>
  );
}
function BasicPlan() {
  return (
    <Link to={"https://dashboard.polyhook.me/login"} className="flex rounded-xl flex-col border-[2px] p-5 space-y-5 border-black min-w-[250px]">
      <p className="text-sm font-semibold">Basic</p>
      <div className="flex items-center space-x-2">
        <span className="text-[30px] font-bold">Free</span>
        <div className="flex flex-col">
          <span className="text-xs">per month</span>
          <span className="text-xs">billed monthly</span>
        </div>
      </div>
      <button className=" bg-black text-white rounded-full px-3 py-2 text-sm">
        🤪 Go Basic
      </button>
      <div className="flex flex-col space-y-4 pt-6">
        <p className="text-xs font-semibold">Benefits</p>
        <div className="flex flex-col space-y-4">
          <Benefit label="Unlimited Projects" />
          <Benefit label="Unlimited Polyhooks" />
          <Benefit label="Unlimited Polyhook Connections" />
          <Benefit label="500 Executions" />
          <Benefit label="Standard Email Support" />
        </div>
      </div>
    </Link>
  );
}

function Benefit({ label }: { label: string }) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <CheckCircledIcon className="text-green-400" />
      <p>{label}</p>
    </div>
  );
}

function Hero() {
  return (
    <div className="flex flex-col space-x-2 items-center justify-center">
      <h1 className="font-montserrat text-[40px] md:text-[50px] tracking-widest">
        Whatever works best
      </h1>
      <h1 className="font-montserrat text-[30px] md:text-[40px] tracking-widest">
        for your needs
      </h1>
    </div>
  );
}
