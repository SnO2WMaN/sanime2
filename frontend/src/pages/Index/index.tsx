import clsx from "clsx";
import React, { Suspense, useState } from "react";

import { List } from "./List";
import { Nav } from "./Nav";
import { TypeFilter } from "./types";

export const Page: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>({
    TV: true,
    MOVIE: true,
    ONA: true,
    OVA: true,
    OTHERS: true,
  });
  return (
    <main className={clsx(["bg-gray-100"], ["min-h-screen"])}>
      <Nav className={clsx(["sticky", "top-0"])} handleChangeTypeFilter={(tf) => setTypeFilter(tf)} />
      <div className={clsx(["container"], ["h-full"], ["mx-auto"], ["py-8"])}>
        <Suspense fallback={<span>Loading</span>}>
          <List typeFilter={typeFilter} />
        </Suspense>
      </div>
    </main>
  );
};
