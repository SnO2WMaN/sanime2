/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_ENDPOINT?: string;
  VITE_ENABLE_MSW?: "true";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
