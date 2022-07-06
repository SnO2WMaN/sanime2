import clsx from "clsx";
import React, { useEffect, useState } from "react";

import { IconMovieAnime, IconONAAnime, IconOthersAnime, IconOVAAnime, IconTVAnime } from "~/components/Icon";
import { AnimeType } from "~/types";

import { TypeFilter } from "./types";

const CheckBox: React.FC<{
  className?: string;
  Icon: React.FC<{ className?: string }>;
  label: string;
  checked: boolean;
  handleChange(): void;
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
        "bg-gray-700",
        "hover:bg-gray-600",
        "border-gray-500",
        "hover:border-gray-400",
        "shadow-gray-700",
      ],
    )}
  >
    <input
      className={clsx("hidden")}
      type={"checkbox"}
      checked={checked}
      onChange={() => handleChange()}
    >
    </input>
    <Icon
      className={clsx(
        ["text-xl"],
        checked && ["text-blue-400", "group-hover:text-blue-300"],
        !checked && ["text-gray-400", "group-hover:text-gray-300"],
      )}
    />
    <span
      className={clsx(
        ["ml-2"],
        checked && ["text-blue-400", "group-hover:text-blue-300"],
        !checked && ["text-gray-400", "group-hover:text-gray-300"],
      )}
    >
      {label}
    </span>
  </label>
);

export const AnimeTypeFilter: React.FC<{ className?: string; handleChange(filter: TypeFilter): void }> = (
  { className, handleChange },
) => {
  const [filter, setFilter] = useState<Record<AnimeType, boolean>>({
    TV: true,
    MOVIE: true,
    OVA: true,
    ONA: true,
    OTHERS: true,
  });
  useEffect(() => {
    handleChange(filter);
  }, [filter, handleChange]);

  return (
    <div
      className={clsx(className, ["flex"], ["space-x-2"])}
    >
      <CheckBox
        label="TV"
        Icon={IconTVAnime}
        checked={filter.TV}
        handleChange={() => {
          setFilter((prev) => ({ ...prev, TV: !prev.TV }));
        }}
      />
      <CheckBox
        label="MOVIE"
        Icon={IconMovieAnime}
        checked={filter.MOVIE}
        handleChange={() => {
          setFilter((prev) => ({ ...prev, MOVIE: !prev.MOVIE }));
        }}
      />
      <CheckBox
        label="OVA"
        Icon={IconOVAAnime}
        checked={filter.OVA}
        handleChange={() => {
          setFilter((prev) => ({ ...prev, OVA: !prev.OVA }));
        }}
      />
      <CheckBox
        label="ONA"
        Icon={IconONAAnime}
        checked={filter.ONA}
        handleChange={() => {
          setFilter((prev) => ({ ...prev, ONA: !prev.ONA }));
        }}
      />
      <CheckBox
        label="その他"
        Icon={IconOthersAnime}
        checked={filter.OTHERS}
        handleChange={() => {
          setFilter((prev) => ({ ...prev, OTHERS: !prev.OTHERS }));
        }}
      />
    </div>
  );
};
