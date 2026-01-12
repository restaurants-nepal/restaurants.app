import type { TMode } from "./env-model";

export interface AppEnv {
  PORT: string;
  VITE_ENV: TMode;
  BACKEND_URL: string;
  SENTRY_TOKEN: string;
}
