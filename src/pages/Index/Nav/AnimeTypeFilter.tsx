import clsx from "clsx";
import React from "react";

import { IconMovieAnime, IconONAAnime, IconOthersAnime, IconOVAAnime, IconTVAnime } from "~/components/Icon";

import { TypeFilter } from "../types";

const CheckBox: React.FC<{
  className?: string;
  Icon: React.FC<{ className?: string }>;
  label: string;
  checked: boolean;
  handleChange(checked: boolean): void;
}> = (
  { className, Icon, label, checked, handleChange },
) => (
  <label
    className={clsx(
      className,
      "block",
      "group",
      ["px-4"],
      ["py-2"],
      ["shadow"],
      ["rounded-md"],
      ["select-none"],
      "border",
      ["bg-opacity-50", "hover:bg-opacity-75"],
      checked && [
        "bg-blue-700",
        "hover:bg-blue-600",
        "border-blue-500",
        "hover:border-blue-400",
        "shadow-blue-700",
      ],
      !checked && [
        "bg-slate-700",
        "hover:bg-slate-600",
        "border-slate-500",
        "hover:border-slate-400",
        "shadow-slate-700",
      ],
    )}
  >
    <input
      className={clsx("hidden")}
      type={"checkbox"}
      checked={checked}
      onChange={(e) => handleChange(e.target.checked)}
    >
    </input>
    <Icon
      className={clsx(
        ["text-xl"],
        checked && ["text-blue-400", "group-hover:text-blue-300"],
        !checked && ["text-slate-400", "group-hover:text-slate-300"],
      )}
    />
    <span
      className={clsx(
        ["ml-2"],
        checked && ["text-blue-400", "group-hover:text-blue-300"],
        !checked && ["text-slate-400", "group-hover:text-slate-300"],
      )}
    >
      {label}
    </span>
  </label>
);

export const AnimeTypeFilter: React.FC<{
  className?: string;
  handleChange(filter: TypeFilter): void;
  filter: TypeFilter;
}> = (
  { className, handleChange, filter },
) => {
  return (
    <div
      className={clsx(className, ["flex"], ["space-x-2"])}
    >
      <CheckBox
        label="TV"
        Icon={IconTVAnime}
        checked={filter.TV}
        handleChange={(b) => {
          handleChange({ ...filter, TV: b });
        }}
      />
      <CheckBox
        label="MOVIE"
        Icon={IconMovieAnime}
        checked={filter.MOVIE}
        handleChange={(b) => {
          handleChange({ ...filter, MOVIE: b });
        }}
      />
      <CheckBox
        label="OVA"
        Icon={IconOVAAnime}
        checked={filter.OVA}
        handleChange={(b) => {
          handleChange({ ...filter, OVA: b });
        }}
      />
      <CheckBox
        label="ONA"
        Icon={IconONAAnime}
        checked={filter.ONA}
        handleChange={(b) => {
          handleChange({ ...filter, ONA: b });
        }}
      />
      <CheckBox
        label="その他"
        Icon={IconOthersAnime}
        checked={filter.OTHERS}
        handleChange={(b) => {
          handleChange({ ...filter, OTHERS: b });
        }}
      />
    </div>
  );
};
