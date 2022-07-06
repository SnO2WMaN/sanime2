import clsx from "clsx";
import React, { Suspense } from "react";

import { List } from "./List";
import { Users } from "./Users";

export const Page: React.FC = () => {
  return (
    <main className={clsx(["bg-gray-100"])}>
      <Users />
      <div className={clsx(["container"], ["mx-auto"], ["py-8"])}>
        <Suspense fallback={<h1>Loading</h1>}>
          <List />
        </Suspense>
      </div>
    </main>
  );
};
