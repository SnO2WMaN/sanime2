import { useMemo } from "react";

import { APIResponse, ServiceID } from "~/types";

export type UserStatuses = {
  id: ServiceID;
  status: Record<
    "watched" | "watching" | "want" | "dropped" | "paused",
    { sourceServiceID: ServiceID; myAnimeListID: number | undefined }[]
  >;
}[];

export const useCalcUserStatuses = ({ apiData: data }: { apiData: APIResponse | undefined }) =>
  useMemo(
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
