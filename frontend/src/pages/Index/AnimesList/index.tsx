import clsx from "clsx";
import React, { useMemo } from "react";
import useSWR from "swr";

import { routeApiShows } from "~/api/routes";
import { useURLParams } from "~/hooks/useURLParams";
import { AnimeType, APIResponse, ServiceID } from "~/types";

import { ListItem } from "./ListItem";
import { useCalcUserStatuses } from "./useCalcUserStatuses";
import { useSortAnimes } from "./useSortAnimes";

export const AnimesList: React.FC<{ typeFilter: Record<AnimeType, boolean> }> = ({ typeFilter }) => {
  const queryUsers = useURLParams("users");
  const { data: apiData } = useSWR<APIResponse>(queryUsers && routeApiShows(queryUsers.split(",")), {
    suspense: true,
  });

  const usersInfo = useMemo<
    | undefined
    | Map<ServiceID, { avatarUrl: string | null }>
  >(
    () =>
      apiData
        ? new Map(apiData.users.map(({ id, avatarUrl }) => [id, { avatarUrl: avatarUrl || null }]))
        : undefined,
    [apiData],
  );
  const userStatuses = useCalcUserStatuses({ apiData });
  const sortedAnimes = useSortAnimes({ apiData, typeFilter, userStatuses });

  return (
    <div
      className={clsx([
        "grid",
        ["grid-cols-1", "lg:grid-cols-2", "2xl:grid-cols-3"],
        ["gap-x-4"],
        ["gap-y-4"],
      ])}
    >
      {(usersInfo && sortedAnimes)
        && sortedAnimes.map(({ id, title, cover, season, type, idAniList, idAnnict, idMal, users, visible }) => (
          <ListItem
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
