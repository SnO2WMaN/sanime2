import clsx from "clsx";
import React, { Suspense, useState } from "react";

import { ErrorBoundary } from "~/components/ErrorBoundary";
import { IconError } from "~/components/Icon";

import { AnimesList } from "./AnimesList";
import { Nav } from "./Nav";
import { OptionFilter, SeasonFilter, TypeFilter } from "./types";

export const Page: React.FC = () => {
  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>({ type: "UNKNOWN" });
  const [typeFilter, setTypeFilter] = useState<TypeFilter>({
    TV: true,
    MOVIE: true,
    ONA: true,
    OVA: true,
    OTHERS: true,
  });
  const [optionFilter, setOptionFilter] = useState<OptionFilter>({ hiddenOnlyWanted: true });
  return (
    <main className={clsx(["bg-slate-800"], ["min-h-screen"])}>
      <Nav
        className={clsx(["sticky", "top-0"])}
        handleChangeTypeFilter={(tf) => setTypeFilter(tf)}
        typeFilter={typeFilter}
        handleChangeSeasonFilter={(sf) => setSeasonFilter(sf)}
        seasonFilter={seasonFilter}
        handleChangeOptionFilter={(of) => setOptionFilter(of)}
        optionFilter={optionFilter}
      />
      <div className={clsx(["container"], ["h-full"], ["mx-auto"], ["py-8"])}>
        <ErrorBoundary
          fallback={
            <div className={clsx(["py-4"], ["flex", "flex-col", "items-center"])}>
              <IconError
                className={clsx(
                  ["text-rose-500"],
                  ["text-4xl"],
                )}
              />
              <p
                className={clsx(
                  "mt-2",
                  ["text-rose-400"],
                  ["text-lg"],
                )}
              >
                取得に失敗しました。IDなどを再確認してください。
              </p>
            </div>
          }
        >
          <Suspense fallback={<span>Loading</span>}>
            <AnimesList
              typeFilter={typeFilter}
              seasonFilter={seasonFilter}
              optionFilter={optionFilter}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
};
