import clsx from "clsx";

import { OptionFilter } from "../types";

export const AnimeOptionFilter: React.FC<{
  className?: string;
  handleChange(of: OptionFilter): void;
  filter: OptionFilter;
}> = (
  { className, handleChange, filter },
) => {
  return (
    <div className={clsx(className)}>
      <label>
        <input
          type={"checkbox"}
          checked={filter.hiddenOnlyWanted}
          onChange={e => {
            handleChange({ ...filter, hiddenOnlyWanted: e.target.checked });
          }}
        >
        </input>
        <span className={clsx(["ml-2"], ["text-gray-300"], ["text-sm"])}>
          「見たい」のみのアニメを隠す
        </span>
      </label>
    </div>
  );
};
