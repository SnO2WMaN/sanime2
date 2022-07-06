import clsx from "clsx";
import React, { useMemo } from "react";
import useSWR from "swr";

import { routeApiShows } from "~/api/routes";
import { useURLParams } from "~/hooks/useURLParams";
import { AnimeSeason, AnimeType, APIResponse, ServiceID } from "~/types";

import { AnimeComponent } from "./AnimeComponent";

export const isInclude = (
  p: {
    sourceServiceID: ServiceID;
    myAnimeListID: number | undefined;
  }[],
  { idAniList, idAnnict, idMal }: {
    idAniList?: number;
    idAnnict?: number;
    idMal?: number;
  },
): boolean => {
  return p.findIndex(({ myAnimeListID, sourceServiceID }) => {
    if ((myAnimeListID && idMal) && idMal === myAnimeListID) return true;
    const [prov, id] = sourceServiceID.split(":");
    if (prov === "anilist" && !!idAniList) return parseInt(id, 10) === idAniList;
    if (prov === "annict" && !!idAnnict) return parseInt(id, 10) === idAnnict;
    if (prov === "mal" && !!idMal) return parseInt(id, 10) === idMal;
    return false;
  }) != -1;
};

export const List: React.FC = () => {
  const queryUsers = useURLParams("users");
  const { data } = useSWR<APIResponse>(queryUsers && routeApiShows(queryUsers.split(",")), { suspense: true });

  const usersInfo = useMemo<
    | undefined
    | Map<ServiceID, { avatarUrl: string | null }>
  >(
    () => data ? new Map(data.users.map(({ id, avatarUrl }) => [id, { avatarUrl: avatarUrl || null }])) : undefined,
    [data],
  );
  const userStatuses = useMemo(
    () =>
      data?.users.map(({ id, works }) => ({
        id,
        status: {
          watched: works
            .filter(({ status }) => status === "WATCHED")
            .map(({ sourceServiceID, myAnimeListID }) => ({ sourceServiceID, myAnimeListID })),
          watching: works
            .filter(({ status }) => status === "WATCHING")
            .map(({ sourceServiceID, myAnimeListID }) => ({ sourceServiceID, myAnimeListID })),
          want: works
            .filter(({ status }) => status === "WANT")
            .map(({ sourceServiceID, myAnimeListID }) => ({ sourceServiceID, myAnimeListID })),
          dropped: works
            .filter(({ status }) => status === "DROPPED")
            .map(({ sourceServiceID, myAnimeListID }) => ({ sourceServiceID, myAnimeListID })),
          paused: works
            .filter(({ status }) => status === "PAUSED")
            .map(({ sourceServiceID, myAnimeListID }) => ({ sourceServiceID, myAnimeListID })),
        },
      })),
    [data],
  );
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
      users: {
        watched: ServiceID[];
        watching: ServiceID[];
        want: ServiceID[];
        paused: ServiceID[];
        dropped: ServiceID[];
      };
    }[]
  >(
    () =>
      data && userStatuses
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
          users: {
            watched: userStatuses
              .filter(({ status }) => isInclude(status.watched, { idAniList, idAnnict, idMal }))
              .map(({ id }) => id),
            watching: userStatuses
              .filter(({ status }) => isInclude(status.watching, { idAniList, idAnnict, idMal }))
              .map(({ id }) => id),
            want: userStatuses
              .filter(({ status }) => isInclude(status.want, { idAniList, idAnnict, idMal }))
              .map(({ id }) => id),
            paused: userStatuses
              .filter(({ status }) => isInclude(status.paused, { idAniList, idAnnict, idMal }))
              .map(({ id }) => id),
            dropped: userStatuses
              .filter(({ status }) => isInclude(status.dropped, { idAniList, idAnnict, idMal }))
              .map(({ id }) => id),
          },
        })),
    [data, userStatuses],
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
      {(usersInfo && formed)
        && formed.map(({ id, title, cover, season, type, idAniList, idAnnict, idMal, users }) => (
          <AnimeComponent
            key={id}
            title={title}
            cover={cover}
            season={season}
            type={type}
            idAniList={idAniList}
            idAnnict={idAnnict}
            idMal={idMal}
            users={users}
            usersInfo={usersInfo}
          />
        ))}
    </div>
  );
};
