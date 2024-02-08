import {
  BarChartIcon,
  CheckCircledIcon,
  ClockIcon,
  Link2Icon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { useOutletContext } from "@remix-run/react";
import { polyhook } from "~/types/project";


export default function Summary() {
  const ctx = useOutletContext<polyhook.Polyhook>()
  return (
    <div className="w-full p-12 flex flex-col space-y-12">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <BarChartIcon className="w-4 h-4" />
          <p className="text-sm font-bold">Analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Metric Icon={ClockIcon} title="Runs" value={ctx.analytics.runs.toString()} />
          <Metric Icon={CheckCircledIcon} title="Success Rate" value={ctx.analytics.runs == 0 ? "100%": ((ctx.analytics.successful/ctx.analytics.runs) * 100).toString() + "%"} />
        </div>
      </div>
    </div>
  );
}

function Metric({
  Icon,
  title,
  value,
}: {
  Icon: typeof BarChartIcon;
  title: string;
  value: string;
}) {
  return (
    <div className="flex flex-col p-3 border shadow-md rounded-lg space-y-4 min-w-[150px]">
      <div className="flex items-center space-x-2">
        <Icon className="w-4 h-4" />
        <p className="text-sm font-bold">{title}</p>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
