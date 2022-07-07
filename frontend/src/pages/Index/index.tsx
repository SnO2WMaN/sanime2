import clsx from "clsx";
import React, { Suspense, useMemo, useState } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { IconError } from "~/components/Icon";
import { ReloadButton } from "~/components/ReloadButton";
import { useURLParams } from "~/hooks/useURLParams";

import { AnimesList } from "./AnimesList";
import { Nav } from "./Nav";
import { OptionFilter, SeasonFilter, TypeFilter } from "./types";

const ErrorFallback: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  return (
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
      <ReloadButton
        className={clsx(
          "mt-4",
          ["w-8", "h-8"],
          ["text-md"],
        )}
        onClick={() => {
          resetErrorBoundary();
        }}
      />
    </div>
  );
};

export const Page: React.FC = () => {
  const queryUsers = useURLParams("users");
  const users = useMemo(() => queryUsers?.split(","), [queryUsers]);

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
        {users && (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<span>Loading</span>}>
              <AnimesList
                users={users}
                typeFilter={typeFilter}
                seasonFilter={seasonFilter}
                optionFilter={optionFilter}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </main>
  );
};
