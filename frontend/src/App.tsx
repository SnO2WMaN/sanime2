import ky from "ky";
import React from "react";
import { SWRConfig } from "swr";

import { Page as ShowPage } from "./pages/Show";

export const App: React.FC = () => {
  return (
    <SWRConfig
      value={{
        fetcher: (res, init) => ky.get(res, { ...init, timeout: 15000 }).then((res) => res.json()),
      }}
    >
      <ShowPage />
    </SWRConfig>
  );
};
