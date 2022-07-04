import { rest } from "msw";

import { AnimeInfo, ServiceID, UserAnimeStatus } from "~/types";

export const handlers = [
  rest.get("/api/shows", (req, res, ctx) => {
    const users: UserAnimeStatus[] = [];
    const animes: Record<ServiceID, AnimeInfo> = {};

    return res(
      ctx.status(200),
      ctx.json({ users, animes }),
    );
  }),
];
