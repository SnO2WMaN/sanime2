import { useMemo } from "react";

import { AnimeSeason, AnimeType, APIResponse, ServiceID } from "~/types";

import { TypeFilter } from "../types";
import { UserStatuses } from "./useCalcUserStatuses";

export interface FormedAnime {
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
}

export type SortedAnimes = FormedAnime[];
export const useSortAnimes = ({
  apiData: data,
  typeFilter,
  userStatuses,
}: {
  apiData: APIResponse | undefined;
  userStatuses: UserStatuses | undefined;
  typeFilter: Record<AnimeType, boolean>;
}): undefined | SortedAnimes =>
  useMemo(() =>
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
        if (0 < Math.abs(a.score - b.score)) {
          return b.score - a.score;
        }
        if (a.season && b.season) {
          return b.season.year - a.season.year;
        }
        return b.id < a.id ? 1 : -1;
      }), [data, typeFilter, userStatuses]);

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
