import { useMemo } from "react";

import { AnimeSeason, AnimeType, APIResponse, Season, ServiceID } from "~/types";
import { isNearCurrentOrAfterSeason } from "~/utils/isNearCurrentOrAfterSeason";

import { OptionFilter, SeasonFilter, TypeFilter } from "../types";
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
  seasonFilter,
  optionFilter,
  userStatuses,
}: {
  apiData: APIResponse | undefined;
  userStatuses: UserStatuses | undefined;
  typeFilter: TypeFilter;
  seasonFilter: SeasonFilter;
  optionFilter: OptionFilter;
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

        const users = { watched, watching, want, paused, dropped };

        return ({
          id,
          title,
          cover: verticalCoverURL || null,
          idAniList: idAniList || null,
          idAnnict: idAnnict || null,
          idMal: idMal || null,
          season,
          type,
          users,
          score:
            (watched.length * 2 + watching.length * 1 + want.length * 0.5 - paused.length * 0.5 - dropped.length * 1),
          visible: isVisible({ type, season, users }, { typeFilter, seasonFilter, optionFilter }),
        });
      })
      .sort((a, b) => {
        if (0 < Math.abs(a.score - b.score)) {
          return b.score - a.score;
        }
        if (a.season && b.season) {
          if (a.season.year != b.season.year) return b.season.year - a.season.year;
          else if (a.season.name && b.season.name) return seasonOrder(b.season.name) - seasonOrder(a.season.name);
          else if (a.season.name && !b.season.name) return -1;
          else return 1;
        }
        return b.id < a.id ? -1 : 1;
      }), [data, optionFilter, seasonFilter, typeFilter, userStatuses]);

export const seasonOrder = (s: Season) => {
  switch (s) {
    case "WINTER":
      return 1;
    case "SPRING":
      return 2;
    case "SUMMER":
      return 3;
    case "AUTUMN":
      return 4;
  }
};

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

export const isVisible = (
  { type, season, users }: Pick<FormedAnime, "users" | "season" | "type">,
  {
    typeFilter: tf,
    seasonFilter: sf,
    optionFilter: of,
  }: {
    typeFilter: TypeFilter;
    seasonFilter: SeasonFilter;
    optionFilter: OptionFilter;
  },
) => {
  if (
    of.hiddenOnlyWanted
    && (
      users.watched.length === 0
      && users.watching.length === 0
      && users.paused.length === 0
      && users.dropped.length === 0
    )
  ) {
    return false;
  }

  if (sf.type === "RECENT" && (!season || !isNearCurrentOrAfterSeason(season))) return false;
  if (
    sf.type === "SPECIFIC"
    && (
      !season || season.year !== sf.specify.year
      || (sf.specify.type !== "ALL" && (!season.name || season.name !== sf.specify.type))
    )
  ) {
    return false;
  }

  if (!tf.TV && type === "TV") return false;
  if (!tf.MOVIE && type === "MOVIE") return false;
  if (!tf.OVA && type === "OVA") return false;
  if (!tf.ONA && type === "ONA") return false;
  if (!tf.OTHERS && type === "OTHERS") return false;
  return true;
};
