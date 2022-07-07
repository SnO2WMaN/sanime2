import clsx from "clsx";

import { TypeFilter } from "../types";
import { AnimeTypeFilter } from "./AnimeTypeFilter";
import { UsersSelector } from "./UsersSelector";

export const Nav: React.FC<{
  className?: string;
  handleChangeTypeFilter(tf: TypeFilter): void;
}> = ({ className, handleChangeTypeFilter }) => {
  return (
    <nav
      className={clsx(
        className,
        ["sticky", "top-0"],
        ["py-8"],
        ["bg-slate-800"],
        ["shadow-xl"],
      )}
    >
      <div
        className={clsx(
          ["container"],
          ["mx-auto"],
        )}
      >
        <AnimeTypeFilter
          handleChange={(v) => {
            handleChangeTypeFilter(v);
          }}
        />
        <UsersSelector className={clsx("mt-4", ["w-full"])} />
      </div>
    </nav>
  );
};
