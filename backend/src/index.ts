import { App } from "piyo";

import { fetchAniListAnimes } from "./fetchers/animes/anilist.js";
import { fetchAnnictAnimes } from "./fetchers/animes/annict.js";
import { fetchAniListWatches } from "./fetchers/watchlists/anilist.js";
import { fetchAnnictWatches } from "./fetchers/watchlists/annict.js";
import { AnimeInfo, malIdIfPossible, ServiceID } from "./type.js";
import { isNotNull } from "./utils/is-not-null.js";

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
  const allWorks = users.map(u => u.works).flat(1);
  const needsToFetch = new Set(allWorks.map(w => malIdIfPossible(w)));
  const worksMap = new Map<ServiceID, AnimeInfo>();
  const warns = [];
  // We have a Annict Data & AniList Data, and we need to merge them
  // First, extract ALL MAL IDs Animes, and fetch it from AniList
  console.log("anilist check...");
  const malWorkIds = allWorks.map(w => w.myAnimeListID).filter(isNotNull);
  const anilistMALWorks = await fetchAniListAnimes(Array.from(new Set(malWorkIds)), true);
  const anilistTitles = new Map<ServiceID, string>();
  for (const work of anilistMALWorks) {
    if (worksMap.has(work.id)) {
      warns.push(`Duplicate AniList ID ${work.id}`);
    } else if (work.title != null) {
      anilistTitles.set(work.id, work.title);
    }
    worksMap.set(work.id, work);
    needsToFetch.delete(work.id);
  }
  // Then, Fetch some AniList Only things
  console.log("anilist only check...");
  const anilistIds = allWorks
    .map(w => (w.myAnimeListID != null ? null : w.sourceServiceID))
    .filter(isNotNull)
    .filter(i => i.startsWith("anilist:"))
    .map(a => parseInt(a.slice("anilist:".length), 10));
  const anilistWorks = await fetchAniListAnimes(anilistIds, false);
  for (const work of anilistWorks) {
    if (worksMap.has(work.id)) {
      warns.push(`Duplicate AniList ID ${work.id}`);
    } else if (work.title != null) {
      anilistTitles.set(work.id, work.title);
    }
    worksMap.set(work.id, work);
    needsToFetch.delete(work.id);
  }
  // Then, Fetch All Annict IDs
  console.log("annict check...");
  const annictWorkIds = Array.from(
    new Set(
      allWorks
        .filter(w => w.sourceServiceID.startsWith("annict:"))
        .map(w => parseInt(w.sourceServiceID.slice("annict:".length), 10)),
    ),
  );
  const annictWorks = await fetchAnnictAnimes(annictWorkIds);
  for (const work of annictWorks) {
    const oldWork = worksMap.get(work.id);
    if (oldWork != null) {
      if (oldWork.idAnnict != null && work.idAnnict != null) {
        warns.push(
          `Annict ID collision! ${work.id} old: ${oldWork.idAnnict}, new: ${work.idAnnict}`,
        );
        const anilistTitle = anilistTitles.get(work.id);
        if (anilistTitle != null) {
          work.title = anilistTitle;
          warns.push(`Use AniList title: ${anilistTitle}`);
        } else {
          warns.push("Want to use AniList title, but it isn't available...");
        }
      } else {
        if (work.season != null) oldWork.season = work.season;
      }
      oldWork.idAnnict ??= work.idAnnict;
      if (work.title != null) oldWork.title = work.title;
      oldWork.horizontalCoverURL ??= work.horizontalCoverURL;
      if (work.type != null) oldWork.type = work.type;
    } else {
      worksMap.set(work.id, work);
    }
    needsToFetch.delete(work.id);
  }

  if (needsToFetch.size > 0) {
    console.error(needsToFetch);
    ctx.status = 500;
    ctx.body = `Internal Server Error\n\nFailed to fetch some animes info:\n${
      Array.from(
        needsToFetch,
      ).join("\n")
    }`;
    return;
  }

  ctx.body = {
    users,
    animes: Object.fromEntries(worksMap.entries()),
  };
});

app.listen(4000, () => {
  console.log("Listen on http://localhost:4000");
});