import {
  BarChartIcon,
  CheckCircledIcon,
  ClockIcon,
  Link2Icon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";

export default function Summary() {
  return (
    <div className="w-full p-12 flex flex-col space-y-12">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <BarChartIcon className="w-4 h-4" />
          <p className="text-sm font-bold">Analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Metric Icon={ClockIcon} title="Runs" value="250" />
          <Metric Icon={CheckCircledIcon} title="Success Rate" value="56.9%" />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <MixerHorizontalIcon className="w-4 h-4" />
          <p className="text-sm font-bold">Actions</p>
        </div>
        <div className="grid grid-cols-4 grid-flow-row w-[max-content] max-w-full gap-4 p-4 border rounded-xl">
          <div className="flex items-center p-2 rounded-lg border space-x-2">
            <Link2Icon className="!w-5 !h-5" />
            <p className="text-sm font-bold truncate">
              https://my.webhook.example/hello_world
            </p>
          </div>
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
      <p className="text-2xl font-extrabold">{value}</p>
    </div>
  );
}
