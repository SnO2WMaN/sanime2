export type WatchStatus =
  | "REPEATING" // 再視聴中
  | "WATCHED" // 視聴完了
  | "WATCHING" // 視聴中
  | "PAUSED" // 一時中断中
  | "WANT" // 視聴したい
  | "DROPPED" // 視聴断念
;
export type AnimeType =
  | "TV"
  | "MOVIE"
  | "OVA"
  | "ONA"
  | "OTHERS";
export type Season =
  | "WINTER"
  | "SPRING"
  | "SUMMER"
  | "AUTUMN";
export type ServiceID =
  | `mal:${string}` // MyAnimeList
  | `annict:${string}` // Annict
  | `anilist:${string}` // Anilist
;

export interface AnimeSeason {
  year: number;
  name: Season | null;
}

export interface AnimeInfo {
  id: ServiceID;
  idMal?: number;
  idAnnict?: number;
  idAniList?: number;
  title: string; // TODO: 「titleが無い」ことは無いだろう
  horizontalCoverURL?: string;
  verticalCoverURL?: string;
  type: AnimeType | null;
  season: AnimeSeason | null;
}
export interface AnimeStatus {
  sourceServiceID: ServiceID;
  myAnimeListID?: number;
  status: WatchStatus;
}
export interface UserAnimeStatus {
  id: ServiceID;
  avatarUrl?: string;
  works: AnimeStatus[];
}

export type APIResponse = {
  users: UserAnimeStatus[];
  animes: Record<ServiceID, AnimeInfo>;
};
