import clsx from "clsx";
import React from "react";

import { AnimeIcon } from "~/components/AnimeIcon";
import { AnimeSeason, AnimeType } from "~/types";

export const Thumbnail: React.FC<{ className?: string; src: string }> = ({ className, src }) => {
  return (
    <div className={clsx(className, "bg-gray-50")}>
      <img
        className={clsx(["mx-auto"], ["h-full"])}
        src={src}
        loading="lazy"
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
}> = ({ className, title, cover, season, type, idAniList, idAnnict, idMal }) => {
  return (
    <article className={clsx(className, ["flex"], ["shadow-lg"], ["bg-white"])}>
      <div
        className={clsx(
          ["w-32", "sm:w-36", "lg:w-48"],
          ["sm:h-36", "lg:h-48"],
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
                href={`https://annict.com/works/${idAnnict}`}
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
                href={`https://anilist.co/anime/${idAniList}`}
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
                href={`https://myanimelist.net/anime/${idMal}`}
                target="_blank"
                rel="noreferrer"
              >
                MyAnimeList
              </a>
            </li>
          )}
        </ul>
      </div>
    </article>
  );
};
