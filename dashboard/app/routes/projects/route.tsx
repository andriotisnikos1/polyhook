import { Link } from "@remix-run/react";

export default () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5 items-center justify-center">
      <div className="flex items-center space-x-4 text-3xl">
        <h1>Welcome Back</h1>
        <div className="flex items-center space-x-2">
          <img
            src="https://avatars.githubusercontent.com/u/67287051?v=4"
            alt="user_icon"
            width={30}
            height={30}
            className="rounded-full"
          />
          <p>Nikos Andriotis</p>
        </div>
      </div>
      <p>Select a project to get started</p>
      <Link
        to="/hello"
        className="rounded-lg border p-4 flex flex-col space-y-2 hover:border-black hover:cursor-pointer text-sm min-w-[200px]"
      >
        <p className="font-bold">Main</p>
        <p>Polyhooks: 5</p>
      </Link>
    </div>
  );
};
