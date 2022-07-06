import clsx from "clsx";
import React, { Suspense, useState } from "react";

import { AnimeTypeFilter } from "./AnimeTypeFilter";
import { List } from "./List";
import { TypeFilter } from "./types";
import { UsersSelector } from "./UsersSelector";
export const Page: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>({
    TV: true,
    MOVIE: true,
    ONA: true,
    OVA: true,
    OTHERS: true,
  });

  return (
    <main className={clsx(["bg-gray-100"], ["min-h-screen"])}>
      <div
        className={clsx(
          ["sticky", "top-0"],
          ["py-8"],
          ["bg-gray-900"],
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
              setTypeFilter(v);
            }}
          />
          <UsersSelector className={clsx("mt-4", ["w-full"])} />
        </div>
      </div>
      <div className={clsx(["container"], ["h-full"], ["mx-auto"], ["py-8"])}>
        <Suspense fallback={<span>Loading</span>}>
          <List typeFilter={typeFilter} />
        </Suspense>
      </div>
    </main>
  );
};
