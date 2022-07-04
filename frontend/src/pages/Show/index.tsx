import { css } from "@emotion/css";
import React, { Suspense, useMemo } from "react";
import useSWR from "swr";

import { APIResponse } from "~/types";

import { Thumbnail } from "./Thumbnail";

export const Page: React.FC = () => {
  return (
    <main>
      <Suspense fallback={<h1>Loading</h1>}>
        <List />
      </Suspense>
    </main>
  );
};

export const List: React.FC = () => {
  const { data } = useSWR<APIResponse>("/api/shows", { suspense: true });

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
    <ul>
      {formed?.map(({ id, title, cover }) => (
        <li key={id}>
          {!!cover && <Thumbnail src={cover} className={css({ height: "160px" })} />}
          <span>{id}</span>
          <p>{title}</p>
        </li>
      ))}
    </ul>
  );
};
