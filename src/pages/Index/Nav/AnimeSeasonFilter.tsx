import clsx from "clsx";
import { useId, useState } from "react";

import { Season } from "~/types";

import { SeasonFilter } from "../types";

export const AnimeSeasonFilter: React.FC<{
  className?: string;
  handleChange(of: SeasonFilter): void;
  filter: SeasonFilter;
}> = (
  { className, handleChange, filter },
) => {
  const group = useId();

  const [spYear, setSpYear] = useState(new Date().getFullYear());
  const [spType, setSpType] = useState<"ALL" | Season>("ALL");

  return (
    <div className={clsx(className, ["flex", ["flex-col"]])}>
      <label>
        <input
          type="radio"
          name={group}
          checked={filter.type === "ALL"}
          onChange={() => handleChange({ type: "ALL" })}
        >
        </input>
        <span className={clsx(["ml-2"], ["text-gray-300"], ["text-sm"])}>
          時期問わず
        </span>
      </label>
      <label>
        <input
          type="radio"
          name={group}
          checked={filter.type === "RECENT"}
          onChange={() => handleChange({ type: "RECENT" })}
        >
        </input>
        <span className={clsx(["ml-2"], ["text-gray-300"], ["text-sm"])}>だいたい最近のアニメのみ</span>
      </label>
      <label>
        <input
          type="radio"
          name={group}
          checked={filter.type === "UNKNOWN"}
          onChange={() => handleChange({ type: "UNKNOWN" })}
        >
        </input>
        <span className={clsx(["ml-2"], ["text-gray-300"], ["text-sm"])}>シーズンが不明のアニメのみ</span>
      </label>
      <label>
        <input
          type="radio"
          name={group}
          checked={filter.type === "SPECIFIC"}
          onChange={() => handleChange({ type: "SPECIFIC", specify: { type: spType, year: spYear } })}
        >
        </input>
        <span className={clsx(["ml-2"], ["text-gray-300"], ["text-sm"])}>特定シーズンのアニメのみ</span>
        <span className={clsx("mt-1", ["flex", "items-stretch"])}>
          <input
            className={clsx(
              ["px-2"],
              ["py-0.5"],
              ["bg-slate-700", "disabled:bg-slate-900"],
              ["text-sm", ["text-slate-400", "disabled:text-slate-700"]],
            )}
            type="number"
            value={spYear}
            onChange={(e) => {
              const p = parseInt(e.target.value, 10);
              setSpYear(p);
              handleChange({ type: "SPECIFIC", specify: { type: spType, year: p } });
            }}
            width={4}
            disabled={filter.type !== "SPECIFIC"}
          >
          </input>
          <select
            className={clsx(
              "ml-1",
              ["px-1"],
              ["py-0.5"],
              ["bg-slate-700", "disabled:bg-slate-900"],
              ["text-sm", ["text-slate-400", "disabled:text-slate-700"]],
            )}
            disabled={filter.type !== "SPECIFIC"}
            onChange={(e) => {
              const p = e.target.value as "ALL" | Season;
              setSpType(p);
              handleChange({ type: "SPECIFIC", specify: { type: p, year: spYear } });
            }}
          >
            <option value="ALL">全期</option>
            <option value="WINTER">冬</option>
            <option value="SPRING">春</option>
            <option value="SUMMER">夏</option>
            <option value="AUTUMN">秋</option>
          </select>
        </span>
      </label>
    </div>
  );
};
