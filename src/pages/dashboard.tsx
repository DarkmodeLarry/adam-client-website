import { trpc } from "../utils/trpc";
import type { FC } from "react";

interface dashboardProps {}

const dashboard: FC<dashboardProps> = ({}) => {
  const { mutate } = trpc.admin.sensitive.useMutation();
  return (
    <div>
      dashboard{" "}
      <button type="button" onClick={() => mutate()}>
        TOP SECRET ACTION
      </button>
    </div>
  );
};

export default dashboard;
