import clsx from "clsx";
import React, { useMemo } from "react";
import useSWR from "swr";

import { routeApiShows } from "~/api/routes";
import { useURLParams } from "~/hooks/useURLParams";
import { AnimeSeason, AnimeType, APIResponse, ServiceID } from "~/types";

import { AnimeComponent } from "./AnimeComponent";
import { TypeFilter } from "./types";

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

export const isVisible = ({ type }: { type: AnimeType | null }, typeFilter: TypeFilter) => {
  if (!typeFilter.TV && type === "TV") return false;
  if (!typeFilter.MOVIE && type === "MOVIE") return false;
  if (!typeFilter.OVA && type === "OVA") return false;
  if (!typeFilter.ONA && type === "ONA") return false;
  if (!typeFilter.OTHERS && type === "OTHERS") return false;
  return true;
};

export const List: React.FC<{ typeFilter: Record<AnimeType, boolean> }> = ({ typeFilter }) => {
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
  const formedAnimes = useMemo<
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
      visible: boolean;
    }[]
  >(
    () =>
      data && userStatuses
      && Object
        .values(data.animes)
        .map(({ id, title, idAniList, idAnnict, idMal, season, type, verticalCoverURL }) => {
          const watched = userStatuses
            .filter(({ status }) => isInclude(status.watched, { idAniList, idAnnict, idMal }))
            .map(({ id }) => id);
          const watching = userStatuses
            .filter(({ status }) => isInclude(status.watching, { idAniList, idAnnict, idMal }))
            .map(({ id }) => id);
          const want = userStatuses
            .filter(({ status }) => isInclude(status.want, { idAniList, idAnnict, idMal }))
            .map(({ id }) => id);
          const paused = userStatuses
            .filter(({ status }) => isInclude(status.paused, { idAniList, idAnnict, idMal }))
            .map(({ id }) => id);
          const dropped = userStatuses
            .filter(({ status }) => isInclude(status.dropped, { idAniList, idAnnict, idMal }))
            .map(({ id }) => id);

          return ({
            id,
            title,
            cover: verticalCoverURL || null,
            idAniList: idAniList || null,
            idAnnict: idAnnict || null,
            idMal: idMal || null,
            season,
            type,
            users: { watched, watching, want, paused, dropped },
            score:
              (watched.length * 2 + watching.length * 1 + want.length * 0.5 - paused.length * 0.5 - dropped.length * 1),
            visible: isVisible({ type }, typeFilter),
          });
        })
        .sort((a, b) => {
          if (0 < Math.abs(a.score - b.score)) return b.score - a.score;
          if (a.season && b.season) return b.season.year - a.season.year;
          return b.id < a.id ? 1 : -1;
        }),
    [data, typeFilter, userStatuses],
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
      {(usersInfo && formedAnimes)
        && formedAnimes.map(({ id, title, cover, season, type, idAniList, idAnnict, idMal, users, visible }) => (
          <AnimeComponent
            key={id}
            className={clsx({ hidden: !visible })}
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
