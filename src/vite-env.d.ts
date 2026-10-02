/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: "development" | "production" | "test";
  readonly VITE_BACKEND_URL: string;
}
