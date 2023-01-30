import Link from "next/link";
import type { FC } from "react";

interface dashboardProps {}

const dashboard: FC<dashboardProps> = ({}) => {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-8 font-medium">
      <Link className="rounded-md bg-gray-100 p-2" href="/dashboard/opening">
        Opening hours
      </Link>
      <Link className="rounded-md bg-gray-100 p-2" href="/dashboard/menu">
        Opening hours
      </Link>
    </div>
  );
};

export default dashboard;
