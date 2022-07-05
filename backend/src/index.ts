import { App } from "piyo";

import { fetchAniListWatches } from "./fetchers/watchlists/anilist.js";
import { fetchAnnictWatches } from "./fetchers/watchlists/annict.js";

const app = new App();

export const isValidAnilistId = (id: string) => /anilist:[a-zA-Z0-9_-]{1,50}/.test(id);
export const isValidAnnictId = (id: string) => /annict:[a-zA-Z0-9_-]{1,50}/.test(id);

app.get("/api/show", async ctx => {
  let userIds = ctx.query.users;
  if (!userIds) {
    ctx.status = 400;
    ctx.body = "must users";
    return;
  } else if (typeof userIds === "string") {
    userIds = userIds.split(",");
  }

  if (userIds.length > 20) {
    ctx.status = 422;
    ctx.body = "Too many users";
    return;
  }

  for (const userId of userIds) {
    if (!isValidAnilistId(userId) && !isValidAnnictId(userId)) {
      ctx.status = 422;
      ctx.body = "Invalid user id";
      return;
    }
  }

  const annictUserNames = userIds
    .filter(u => u.startsWith("annict:"))
    .map(a => a.slice("annict:".length));
  const anilistUserNames = userIds
    .filter(u => u.startsWith("anilist:"))
    .map(a => a.slice("anilist:".length));

  const users = (
    await Promise.all([
      fetchAnnictWatches(annictUserNames),
      fetchAniListWatches(anilistUserNames),
    ])
  ).flat(1);

  console.dir(users);

  ctx.body = "オー";
});

app.listen(4000, () => {
  console.log("Listen on http://localhost:4000");
});
