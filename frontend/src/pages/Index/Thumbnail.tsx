import { css } from "@emotion/css";
import clsx from "clsx";
import React from "react";

export const Thumbnail: React.FC<{ className?: string; src: string }> = ({ className, src }) => {
  return (
    <div className={clsx(className)}>
      <img
        className={css({ height: "100%" })}
        src={src}
        loading="lazy"
      >
      </img>
    </div>
  );
};
