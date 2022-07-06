import clsx from "clsx";
import React from "react";

import { Thumbnail } from "./Thumbnail";

export const AnimeComponent: React.FC<{
  className?: string;
  cover?: string;
  title: string;
}> = ({ className, title, cover }) => {
  return (
    <div className={clsx(className, ["flex"], ["shadow-lg"], ["bg-white"])}>
      <div
        className={clsx(
          ["w-32", "sm:w-36", "lg:w-48"],
          ["sm:h-36", "lg:h-48"],
          ["flex-shrink-0"],
        )}
      >
        {!!cover && (
          <Thumbnail
            className={clsx("h-full")}
            src={cover}
          />
        )}
      </div>
      <div
        className={clsx(
          ["py-4"],
          ["px-4"],
          ["flex-grow"],
        )}
      >
        <span className={clsx(["text-md"], ["font-semibold"])}>{title}</span>
      </div>
    </div>
  );
};
