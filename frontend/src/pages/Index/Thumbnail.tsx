import clsx from "clsx";
import React from "react";

export const Thumbnail: React.FC<{ className?: string; src: string }> = ({ className, src }) => {
  return (
    <div
      className={clsx(
        className,
        "bg-gray-50",
      )}
    >
      <img
        className={clsx(["mx-auto"], ["h-full"])}
        src={src}
        loading="lazy"
      >
      </img>
    </div>
  );
};
