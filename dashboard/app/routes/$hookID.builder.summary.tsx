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
       <div className="grid grid-cols-4 gap-2 grid-flow-row w-[max-content]">
          <Action />
          <Action />
          <Action />
          <Action />
          <Action />
          <Action />
          <Action />
          <Action />
          <Action />
          <Action />
          <Action />
          <Action />
       </div>
      </div>
    </div>
  );
}

function Action() {
  return (
    <div className="flex items-center space-x-2 px-4 py-3 max-w-[330px] rounded-lg hover:bg-slate-100">
          <Link2Icon className="w-4 h-4" />
          <p className="text-sm font-bold truncate">https://my.webhook.example/hello_world</p>
        </div>
  )
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
