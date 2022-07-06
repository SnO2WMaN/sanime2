import clsx from "clsx";
import React, { useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { AnimeIcon } from "~/components/AnimeIcon";
import { AnimeSeason, AnimeType, ServiceID } from "~/types";
import { urlAnilistAnime, urlAnilistUser, urlAnnictAnime, urlAnnictUser, urlMyAnimeListAnime } from "~/utils/idToUrl";

export const Thumbnail: React.FC<{ className?: string; src: string }> = ({ className, src }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "960px 0px",
  });

  return (
    <div className={clsx(className, "bg-gray-50")} ref={ref}>
      <img
        className={clsx(["mx-auto"], ["h-full"])}
        src={inView ? src : undefined}
      >
      </img>
    </div>
  );
};

export const Season: React.FC<{ className?: string; season: AnimeSeason }> = ({ className, season }) => {
  return (
    <span className={clsx(className, ["leading-none"])}>
      <span className={clsx(["text-sm"], ["text-gray-500"])}>
        {`'${season.year.toString().slice(-2)}`}
      </span>
      {season.name && (
        <span className={clsx(["ml-1"], ["text-sm"], ["text-gray-500"])}>
          {season.name === "SPRING" && "春"}
          {season.name === "SUMMER" && "夏"}
          {season.name === "AUTUMN" && "秋"}
          {season.name === "WINTER" && "冬"}
        </span>
      )}
    </span>
  );
};

export const Type: React.FC<{ className?: string; type: AnimeType }> = ({ className, type }) => {
  return <AnimeIcon type={type} className={clsx(className, ["text-gray-500"], ["text-md"])} />;
};

export const AnimeComponent: React.FC<{
  className?: string;
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
  usersInfo: Map<ServiceID, { avatarUrl: string | null }>;
}> = ({ className, title, cover, season, type, idAniList, idAnnict, idMal, users, usersInfo }) => {
  return (
    <article className={clsx(className, ["flex"], ["shadow-lg"], ["bg-white"])}>
      <div
        className={clsx(
          ["w-32", "sm:w-36", "lg:w-40"],
          ["sm:h-40", "lg:h-48"],
          ["flex-shrink-0"],
        )}
      >
        {!!cover && <Thumbnail className={clsx("h-full")} src={cover} />}
      </div>
      <div
        className={clsx(
          ["py-4"],
          ["px-4"],
          ["flex-grow"],
        )}
      >
        <div
          className={clsx(
            ["float-right"],
            ["flex", ["items-center"]],
          )}
        >
          {season && <Season className={clsx()} season={season} />}
          {type && <Type className={clsx(["ml-2"])} type={type} />}
        </div>
        <h2 className={clsx(["text-md"], ["font-semibold"])}>{title}</h2>
        <ul className={clsx(["mt-1"], ["flex"], ["space-x-2"])}>
          {idAnnict && (
            <li>
              <a
                className={clsx(
                  ["text-sm"],
                  ["underline"],
                  ["text-blue-500", "visited:text-violet-500"],
                )}
                href={urlAnnictAnime(idAnnict)}
                target="_blank"
                rel="noreferrer"
              >
                Annict
              </a>
            </li>
          )}
          {idAniList && (
            <li>
              <a
                className={clsx(
                  ["text-sm"],
                  ["underline"],
                  ["text-blue-500", "visited:text-violet-500"],
                )}
                href={urlAnilistAnime(idAniList)}
                target="_blank"
                rel="noreferrer"
              >
                AniList
              </a>
            </li>
          )}
          {idMal && (
            <li>
              <a
                className={clsx(
                  ["text-sm"],
                  ["underline"],
                  ["text-blue-500", "visited:text-violet-500"],
                )}
                href={urlMyAnimeListAnime(idMal)}
                target="_blank"
                rel="noreferrer"
              >
                MyAnimeList
              </a>
            </li>
          )}
        </ul>
        <ul className={clsx(["mt-2"], ["flex", ["flex-wrap"]])}>
          {0 < users.watched.length && (
            <UsersStatus className={clsx("mr-2")} type={"WATCHED"} users={users.watched} usersInfo={usersInfo} />
          )}
          {0 < users.watching.length && (
            <UsersStatus className={clsx("mr-2")} type={"WATCHING"} users={users.watching} usersInfo={usersInfo} />
          )}
          {0 < users.want.length && (
            <UsersStatus className={clsx("mr-2")} type={"WANT"} users={users.want} usersInfo={usersInfo} />
          )}
          {0 < users.paused.length && (
            <UsersStatus className={clsx("mr-2")} type={"PAUSED"} users={users.paused} usersInfo={usersInfo} />
          )}
          {0 < users.dropped.length && (
            <UsersStatus className={clsx("mr-2")} type={"DROPPED"} users={users.dropped} usersInfo={usersInfo} />
          )}
        </ul>
      </div>
    </article>
  );
};

export const UsersStatus: React.FC<{
  className?: string;
  type: string;
  users: ServiceID[];
  usersInfo: Map<ServiceID, { avatarUrl: string | null }>;
}> = ({ className, type, usersInfo, users }) => {
  return (
    <li className={clsx(className, ["flex"], ["items-center"])}>
      <span className={clsx(["text-sm"], ["font-mono"], ["leading-none"])}>
        {type}({users.length}):
      </span>
      <ul className={clsx(["ml-1"], ["flex"], ["space-x-1"], ["flex-wrap"])}>
        {users.map((id) => {
          const avatarUrl = usersInfo.get(id)?.avatarUrl;
          return (
            <li key={id}>
              {<UserIcon avatarUrl={avatarUrl || null} className={clsx("w-6", "h-6")} id={id} />}
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export const UserIcon: React.FC<{ className?: string; id: string; avatarUrl: string | null }> = (
  { id, className, avatarUrl },
) => {
  const url = useMemo(() => {
    if (id.startsWith("annict:")) return urlAnnictUser(id.substring("annict:".length));
    if (id.startsWith("anilist:")) return urlAnilistUser(id.substring("anilist:".length));
  }, [id]);

  if (!url) {
    return (
      <span className={clsx(className, ["block"])}>
        {avatarUrl && <img loading="lazy" src={avatarUrl} className={clsx(["h-fit"], ["rounded-full"])}></img>}
        {!avatarUrl && <span>{id}</span>}
      </span>
    );
  }

  return (
    <a className={clsx(className, ["block"])} href={url} target="_blank" rel="noreferrer">
      {avatarUrl && <img loading="lazy" src={avatarUrl} className={clsx(["h-fit"], ["rounded-full"])}></img>}
      {!avatarUrl && <span>{id}</span>}
    </a>
  );
};
