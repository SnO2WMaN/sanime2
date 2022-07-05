import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

// MSW (develop)
if (
  import.meta.env.DEV
  && import.meta.env.VITE_ENABLE_MSW === "true"
) {
  const { worker } = await import("./mocks/browsers");
  await worker.start();
}

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
