import clsx from "clsx";
import React, { useMemo } from "react";
import useSWR from "swr";

import { routeApiShows } from "~/api/routes";
import { useURLParams } from "~/hooks/useURLParams";
import { APIResponse } from "~/types";

import { AnimeComponent } from "./AnimeComponent";

export const List: React.FC = () => {
  const users = useURLParams("users");
  const { data } = useSWR<APIResponse>(users && routeApiShows(users.split(",")), { suspense: true });

  const formed = useMemo(
    () =>
      data
      && Object
        .values(data.animes)
        .map(({ id, title, idAniList, idAnnict, idMal, season, type, verticalCoverURL }) => ({
          id,
          title,
          cover: verticalCoverURL,
          idAniList,
          idAnnict,
          idMal,
          season,
          type,
        })),
    [data],
  );

  return (
    <div
      className={clsx([
        "grid",
        ["grid-cols-1", "lg:grid-cols-2", "xl:grid-cols-3"],
        ["gap-x-4"],
        ["gap-y-4"],
      ])}
    >
      {formed?.map(({ id, title, cover }) => <AnimeComponent key={id} title={title} cover={cover} />)}
    </div>
  );
};
