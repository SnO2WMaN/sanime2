import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { IconAdd, IconDelete, IconReload } from "~/components/Icon";

export const UsersSelector: React.FC<{ className?: string }> = ({ className }) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState<string[]>(new URLSearchParams(search).get("users")?.split(",") || []);
  const query = useMemo(() => new URLSearchParams({ users: users.join(",") }).toString(), [users]);

  return (
    <div className={clsx(className, ["flex"])}>
      <button
        className={clsx(
          ["w-8", "h-8"],
          ["rounded-md"],
          ["bg-opacity-50", "hover:bg-opacity-75"],
          ["bg-green-700", "hover:bg-green-600"],
          "border",
          ["border-green-500", "hover:border-green-400"],
          "shadow",
          ["shadow-green-700"],
        )}
        onClick={() => {
          navigate(`?${query}`);
        }}
      >
        <IconReload
          className={clsx(
            ["m-auto"],
            ["text-md"],
            ["text-green-400", "group-hover:text-green-300"],
          )}
        />
      </button>
      <div
        className={clsx(
          ["ml-4"],
          ["flex", ["flex-grow"], ["items-center"], ["flex-wrap"]],
          ["space-x-2"],
        )}
      >
        {Array.from(users).map((user) => (
          <User
            id={user}
            key={user}
            handleDelete={(id) => {
              setUsers((prev) => prev.filter((p) => p != id));
            }}
          />
        ))}
        <UserInput
          handleAdd={(id) => {
            if (!users.includes(id)) setUsers((prev) => [...prev, id]);
          }}
        />
      </div>
    </div>
  );
};

export const User: React.FC<{ id: string; handleDelete(id: string): void }> = ({ id, handleDelete }) => {
  const isAnnict = useMemo(() => id.startsWith("annict"), [id]);
  const isAnilist = useMemo(() => id.startsWith("anilist"), [id]);

  return (
    <div
      key={id}
      className={clsx(
        ["flex", "items-stretch"],
        "border",
        "shadow",
        "rounded-md",
        isAnilist && [
          ["border-anilist-500", "hover:border-anilist-400"],
          ["shadow-anilist-700"],
        ],
        isAnnict && [
          ["border-annict-500", "hover:border-annict-400"],
          ["shadow-annict-700"],
        ],
      )}
    >
      <div
        className={clsx(
          "group",
          ["flex", "items-center"],
          ["bg-opacity-50" /* "hover:bg-opacity-75" */],
          isAnilist && ["bg-anilist-700" /* "hover:bg-anilist-600" */],
          isAnnict && ["bg-annict-700" /* "hover:bg-annict-600" */],
        )}
      >
        <span
          className={clsx(
            "text-sm",
            ["px-4"],
            isAnilist && ["text-anilist-400" /* "group-hover:text-anilist-300" */],
            isAnnict && ["text-annict-400" /* "group-hover:text-annict-300" */],
          )}
        >
          {id}
        </span>
      </div>
      <button
        className={clsx(
          "group",
          "h-full",
          "border-l",
          ["px-2"],
          ["bg-opacity-10", "hover:bg-opacity-50"],
          isAnilist && [
            ["border-l-anilist-700"],
            ["bg-anilist-600", "hover:bg-anilist-500"],
          ],
          isAnnict && [
            ["border-l-annict-700"],
            ["bg-annict-600", "hover:bg-annict-500"],
          ],
        )}
        onClick={() => {
          handleDelete(id);
        }}
      >
        <IconDelete
          className={clsx(
            "icon-sm",
            ["m-auto"],
            isAnilist && ["text-anilist-400", "group-hover:text-anilist-300"],
            isAnnict && ["text-annict-400", "group-hover:text-annict-300"],
          )}
        />
      </button>
    </div>
  );
};

export const UserInput: React.FC<{ className?: string; handleAdd(id: string): void }> = ({ className, handleAdd }) => {
  const [provider, setProvider] = useState<"anilist" | "annict">();
  const [id, setId] = useState<string>("");

  return (
    <div
      className={clsx(
        className,
        ["group"],
        ["flex", "items-stretch"],
        "border",
        "shadow",
        "rounded-md",
        ["border-gray-600", "hover:border-gray-500"],
        ["shadow-gray-700"],
        ["overflow-hidden"],
      )}
    >
      <select
        className={clsx(
          ["px-2"],
          ["py-0.5"],
          ["bg-gray-700"],
          ["text-sm"],
          ["text-gray-400"],
        )}
        onChange={(e) => {
          setProvider(e.target.value as "anilist" | "annict");
        }}
      >
        <option className={clsx("text-anilist-300")} value="anilist">
          Anilist
        </option>
        <option className={clsx("text-annict-300")} value="annict">
          Annict
        </option>
      </select>
      <input
        className={clsx(
          ["px-2"],
          ["bg-opacity-50", "hover:bg-opacity-60"],
          "border-l",
          ["border-l-gray-500", "hover:border-l-gray-400"],
          ["bg-gray-600", "hover:bg-gray-600"],
          ["text-sm"],
          ["text-gray-400"],
        )}
        onChange={(e) => setId(e.target.value)}
        value={id}
      >
      </input>
      <button
        className={clsx(
          ["px-2"],
          ["bg-opacity-10", "hover:bg-opacity-50"],
          "border-l",
          ["bg-gray-600", "hover:bg-gray-500"],
          ["border-l-gray-500", "hover:border-l-gray-400"],
        )}
        onClick={() => {
          if (id === "") return;
          handleAdd(`${provider}:${id}`);
          setId("");
        }}
      >
        <IconAdd
          className={clsx(
            ["m-auto"],
            ["text-md"],
            ["text-gray-400", "group-hover:text-gray-300"],
          )}
        />
      </button>
    </div>
  );
};
