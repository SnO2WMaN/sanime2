import { AnimeType, Season } from "~/types";

export type TypeFilter = Record<AnimeType, boolean>;
export type SeasonFilter =
  | { type: "ALL" }
  | { type: "RECENT" }
  | { type: "SPECIFIC"; specify: { year: number; type: "ALL" | Season } }
  | { type: "UNKNOWN" };
export type OptionFilter = {
  hiddenOnlyWanted: boolean;
};
