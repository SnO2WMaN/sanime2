import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const Users: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState<string[]>(new URLSearchParams(search).get("users")?.split(",") || []);
  const query = useMemo(() => new URLSearchParams({ users: users.join(",") }).toString(), [users]);

  return (
    <div>
      <button
        onClick={() => {
          navigate(`?${query}`);
        }}
      >
        Reload
      </button>
      <div>
        {Array.from(users).map((user) => (
          <div key={user}>
            <span>{user}</span>
            <button
              onClick={() => {
                setUsers((prev) => prev.filter((p) => p != user));
              }}
            >
              delete
            </button>
          </div>
        ))}
        <UserInput
          handleAdd={(id) => {
            if (!users.includes(id)) {
              setUsers((prev) => [...prev, id]);
            }
          }}
        />
      </div>
    </div>
  );
};

export const UserInput: React.FC<{ handleAdd(id: string): void }> = ({ handleAdd }) => {
  const [provider, setProvider] = useState<"anilist" | "annict">();
  const [id, setId] = useState<string>("");

  return (
    <div>
      <select
        onChange={(e) => {
          setProvider(e.target.value as "anilist" | "annict");
        }}
      >
        <option value="anilist">Anilist</option>
        <option value="annict">Annict</option>
      </select>
      <input onChange={(e) => setId(e.target.value)}></input>
      <button onClick={() => handleAdd(`${provider}:${id}`)}>Add</button>
    </div>
  );
};
