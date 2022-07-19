import { AnimeSeason } from "~/types";

/**
 * だいたい今期以降のシーズンかを判定する。
 * watchingをwatched判定として扱うかに利用する
 */
export function isNearCurrentOrAfterSeason(season: AnimeSeason): boolean {
  let month: number;
  switch (season.name) {
    case null:
      month = 1;
      break;
    case "WINTER":
      month = 1;
      break;
    case "SPRING":
      month = 4;
      break;
    case "SUMMER":
      month = 7;
      break;
    case "AUTUMN":
      month = 11;
      break;
  }
  month--; // JavaScript Date's month is 0-indexed
  // ひょっとするとフライングするアニメもあるかもしれないので2週間くらい早めに判定しておく
  const startDate = new Date(season.year, month, -14);
  const endDate = new Date(
    season.year,
    // シーズン名が指定されていなかったら1年中あるものだということにする
    // TODO: 連続2クールのことをちゃんと考える (でもシーズン情報だけだとどうしようもない？)
    season.name == null ? 11 : month + 3,
    // いろいろなことがあって次シーズンに被ることがあるので、だいたい2週間くらいは多めに見る
    // 例: 式守さんは2022年春アニメだが7月10日に12話予定
    //     さらに最速以外の配信サイトは5日遅れなので15日だが…まあ1日くらいは気にしないことにする
    14,
  );
  const current = Date.now();
  return current > startDate.getTime() && endDate.getTime() > current;
}
