import type { TMode } from "./env-model";

export interface AppEnv {
  PORT: string;
  VITE_ENV: TMode;
  VITE_BACKEND_URL: string;
}
