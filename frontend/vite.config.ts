import pluginReact from "@vitejs/plugin-react";
import { dirname, join } from "path";
import { defineConfig } from "vite";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import pluginTSconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  root: join(dirname(new URL(import.meta.url).pathname), "src"),
  plugins: [
    pluginReact(),
    pluginTSconfigPaths(),
    pluginRewriteAll(),
  ],
});
