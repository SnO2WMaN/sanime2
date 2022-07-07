import clsx from "clsx";
import React, { Suspense, useState } from "react";

import { AnimesList } from "./AnimesList";
import { Nav } from "./Nav";
import { SeasonFilter, TypeFilter } from "./types";

export const Page: React.FC = () => {
  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>({ type: "RECENT" });
  const [typeFilter, setTypeFilter] = useState<TypeFilter>({
    TV: true,
    MOVIE: true,
    ONA: true,
    OVA: true,
    OTHERS: true,
  });
  return (
    <main className={clsx(["bg-slate-800"], ["min-h-screen"])}>
      <Nav className={clsx(["sticky", "top-0"])} handleChangeTypeFilter={(tf) => setTypeFilter(tf)} />
      <div className={clsx(["container"], ["h-full"], ["mx-auto"], ["py-8"])}>
        <Suspense fallback={<span>Loading</span>}>
          <AnimesList typeFilter={typeFilter} seasonFilter={seasonFilter} />
        </Suspense>
      </div>
    </main>
  );
};
