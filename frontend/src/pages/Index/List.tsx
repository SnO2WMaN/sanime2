import clsx from "clsx";
import React, { useMemo } from "react";
import useSWR from "swr";

import { routeApiShows } from "~/api/routes";
import { useURLParams } from "~/hooks/useURLParams";
import { AnimeSeason, AnimeType, APIResponse, ServiceID } from "~/types";

import { AnimeComponent } from "./AnimeComponent";

export const List: React.FC = () => {
  const users = useURLParams("users");
  const { data } = useSWR<APIResponse>(users && routeApiShows(users.split(",")), { suspense: true });

  const formed = useMemo<
    undefined | {
      id: ServiceID;
      title: string;
      cover: string | null;
      season: AnimeSeason | null;
      type: AnimeType | null;
      idAniList: number | null;
      idAnnict: number | null;
      idMal: number | null;
    }[]
  >(
    () =>
      data
      && Object
        .values(data.animes)
        .map(({ id, title, idAniList, idAnnict, idMal, season, type, verticalCoverURL }) => ({
          id,
          title,
          cover: verticalCoverURL || null,
          idAniList: idAniList || null,
          idAnnict: idAnnict || null,
          idMal: idMal || null,
          season,
          type,
        })),
    [data],
  );

  return (
    <div
      className={clsx([
        "grid",
        ["grid-cols-1", "lg:grid-cols-2", "2xl:grid-cols-3"],
        ["gap-x-4"],
        ["gap-y-4"],
      ])}
    >
      {formed?.map(({ id, title, cover, season, type, idAniList, idAnnict, idMal }) => (
        <AnimeComponent
          key={id}
          title={title}
          cover={cover}
          season={season}
          type={type}
          idAniList={idAniList}
          idAnnict={idAnnict}
          idMal={idMal}
        />
      ))}
    </div>
  );
};
