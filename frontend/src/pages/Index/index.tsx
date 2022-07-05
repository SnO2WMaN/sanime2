import { css } from "@emotion/css";
import React, { Suspense, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useSWR from "swr";

import { routeApiShows } from "~/api/routes";
import { APIResponse } from "~/types";

import { Thumbnail } from "./Thumbnail";

export const Page: React.FC = () => {
  return (
    <main>
      <Users />
      <Suspense fallback={<h1>Loading</h1>}>
        <List />
      </Suspense>
    </main>
  );
};

export const Users: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState<string[]>(new URLSearchParams(search).get("users")?.split(",") || []);
  const query = useMemo(() => new URLSearchParams({ users: users.join(",") }).toString(), [users]);

  return (
    <div>
      <button
        onClick={() => {
          navigate(`?${query}`);
        }}
      >
        Reload
      </button>
      <div>
        {Array.from(users).map((user) => (
          <div key={user}>
            <span>{user}</span>
            <button
              onClick={() => {
                setUsers((prev) => prev.filter((p) => p != user));
              }}
            >
              delete
            </button>
          </div>
        ))}
        <UserInput
          handleAdd={(id) => {
            if (!users.includes(id)) setUsers((prev) => [...prev, id]);
          }}
        />
      </div>
    </div>
  );
};

export const UserInput: React.FC<{ handleAdd(id: string): void }> = ({ handleAdd }) => {
  const [provider, setProvider] = useState<"anilist" | "annict">();
  const [id, setId] = useState<string>("");

  return (
    <div>
      <select
        onChange={(e) => {
          setProvider(e.target.value as "anilist" | "annict");
        }}
      >
        <option value="anilist">Anilist</option>
        <option value="annict">Annict</option>
      </select>
      <input onChange={(e) => setId(e.target.value)}></input>
      <button onClick={() => handleAdd(`${provider}:${id}`)}>Add</button>
    </div>
  );
};

export const useURLParams = (key: string) => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search).get(key), [search, key]);
};

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
