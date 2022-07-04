import { rest } from "msw";

import { AnimeInfo, ServiceID, UserAnimeStatus } from "~/types";

export const handlers = [
  rest.get("/api/shows", (req, res, ctx) => {
    const users: UserAnimeStatus[] = [
      {
        id: "anilist:sno2wman",
        avatarUrl: "https://s4.anilist.co/file/anilistcdn/user/avatar/large/default.png",
        works: [
          {
            sourceServiceID: "anilist:107490",
            myAnimeListID: 39071,
            status: "WATCHED",
          },
          {
            sourceServiceID: "anilist:102680",
            myAnimeListID: 37993,
            status: "WATCHED",
          },
          {
            sourceServiceID: "anilist:5681",
            myAnimeListID: 5681,
            status: "WATCHED",
          },
          {
            sourceServiceID: "anilist:18679",
            myAnimeListID: 18679,
            status: "WATCHED",
          },
          {
            sourceServiceID: "anilist:1210",
            myAnimeListID: 1210,
            status: "WATCHING",
          },
        ],
      },
    ];
    const animes: Record<ServiceID, AnimeInfo> = {
      "mal:39071": {
        id: "mal:39071",
        idMal: 39071,
        idAniList: 107490,
        title: "まちカドまぞく",
        verticalCoverURL: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx107490-wolT0UvNSetx.png",
        type: "TV",
        season: {
          year: 2019,
          name: "SUMMER",
        },
      },
      "mal:37993": {
        id: "mal:37993",
        idMal: 37993,
        idAniList: 102680,
        title: "私に天使が舞い降りた！",
        verticalCoverURL: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx102680-75Mgrnn65PAg.png",
        type: "TV",
        season: {
          year: 2019,
          name: "WINTER",
        },
      },
      "mal:5681": {
        id: "mal:5681",
        idMal: 5681,
        idAniList: 5681,
        title: "サマーウォーズ",
        verticalCoverURL: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5681-3DmxUVn3grD0.jpg",
        type: "MOVIE",
        season: {
          year: 2009,
          name: "SUMMER",
        },
      },
      "mal:18679": {
        id: "mal:18679",
        idMal: 18679,
        idAniList: 18679,
        title: "キルラキル",
        verticalCoverURL: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx18679-zE07Y4SFaOiO.png",
        type: "TV",
        season: {
          year: 2013,
          name: "AUTUMN",
        },
      },
      "mal:1210": {
        id: "mal:1210",
        idMal: 1210,
        idAniList: 1210,
        title: "N・H・Kにようこそ！",
        verticalCoverURL: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1210-spaA00zoDoqr.jpg",
        type: "TV",
        season: {
          year: 2006,
          name: "SUMMER",
        },
      },
    };

    return res(
      ctx.status(200),
      ctx.json({ users, animes }),
    );
  }),
];
