import clsx from "clsx";

import { OptionFilter, SeasonFilter, TypeFilter } from "../types";
import { AnimeOptionFilter } from "./AnimeOptionFilter";
import { AnimeSeasonFilter } from "./AnimeSeasonFilter";
import { AnimeTypeFilter } from "./AnimeTypeFilter";
import { UsersSelector } from "./UsersSelector";

export const Nav: React.FC<{
  className?: string;

  handleChangeTypeFilter(tf: TypeFilter): void;
  typeFilter: TypeFilter;

  handleChangeSeasonFilter(sf: SeasonFilter): void;
  seasonFilter: SeasonFilter;

  handleChangeOptionFilter(of: OptionFilter): void;
  optionFilter: OptionFilter;
}> = (
  {
    className,
    handleChangeTypeFilter,
    typeFilter,
    handleChangeOptionFilter,
    optionFilter,
    handleChangeSeasonFilter,
    seasonFilter,
  },
) => {
  return (
    <nav
      className={clsx(
        className,
        ["sticky", "top-0"],
        ["px-8"],
        ["py-8"],
        ["bg-slate-800"],
        ["shadow-xl"],
      )}
    >
      <div
        className={clsx(
          ["container"],
          ["mx-auto"],
          [
            "flex",
          ],
        )}
      >
        <div className={clsx("flex-grow", ["flex", "flex-col"])}>
          <AnimeTypeFilter
            handleChange={(v) => {
              handleChangeTypeFilter(v);
            }}
            filter={typeFilter}
          />
          <UsersSelector className={clsx("mt-4", ["w-full"])} />
        </div>
        <div className={clsx("flex-shrink-0", ["flex", "flex-col"])}>
          <AnimeOptionFilter
            handleChange={(v) => {
              handleChangeOptionFilter(v);
            }}
            filter={optionFilter}
          />
          <AnimeSeasonFilter
            className={clsx("mt-2")}
            handleChange={(v) => {
              handleChangeSeasonFilter(v);
            }}
            filter={seasonFilter}
          />
        </div>
      </div>
    </nav>
  );
};
