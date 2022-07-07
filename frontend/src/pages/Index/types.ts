import { AnimeType, Season } from "~/types";

export type TypeFilter = Record<AnimeType, boolean>;
export type SeasonFilter =
  | { type: "ALL" }
  | { type: "RECENT" }
  | { type: "SPECIFIC"; specify: { year: number; type: "ALL" | Season } };
export type OptionFilter = {
  hiddenOnlyWanted: boolean;
};
