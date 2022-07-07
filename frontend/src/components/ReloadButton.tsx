import clsx from "clsx";
import React from "react";

import { IconReload } from "~/components/Icon";

export const ReloadButton: React.FC<{ className?: string; onClick(): void }> = ({ className, onClick }) => (
  <button
    className={clsx(
      className,
      ["rounded-md"],
      [
        ["bg-opacity-50", "hover:bg-opacity-75"],
        ["bg-green-700", "hover:bg-green-600"],
      ],
      ["border", ["border-green-500", "hover:border-green-400"]],
      ["shadow", ["shadow-green-700"]],
    )}
    onClick={() => {
      onClick();
    }}
  >
    <IconReload className={clsx(["m-auto"], ["text-green-400", "group-hover:text-green-300"])} />
  </button>
);
