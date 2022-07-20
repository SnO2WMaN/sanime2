import clsx from "clsx";

import { OptionFilter, SeasonFilter, TypeFilter } from "../types";
import { AnimeOptionFilter } from "./AnimeOptionFilter";
import { AnimeSeasonFilter } from "./AnimeSeasonFilter";
import { AnimeTypeFilter } from "./AnimeTypeFilter";

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
        ["px-6", "sm:px-8"],
        ["py-8", "sm:py-8"],
        ["bg-slate-800"],
        ["shadow-xl"],
      )}
    >
      <div
        className={clsx(
          ["container"],
          ["mx-auto"],
          [
            "grid",
            ["gap-x-2"],
            ["gap-y-2"],
          ],
        )}
      >
        <AnimeTypeFilter
          className={clsx(
            ["row-start-1"],
            ["col-start-1"],
          )}
          handleChange={(v) => {
            handleChangeTypeFilter(v);
          }}
          filter={typeFilter}
        />
        {
          /*        <UsersSelector
          className={clsx(
            ["md:row-start-2"],
            ["w-full"],
          )}
          /> */
        }
        <div
          className={clsx(
            ["row-start-2"],
            ["md:row-span-2"],
            ["flex", "flex-col"],
          )}
        >
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
