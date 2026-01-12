import type { AppEnv } from "../../shared/models/app-env";
import type { TMode } from "../../shared/models/env-model";

export const validateEnv = (envMode: TMode, env: AppEnv) => {
  const requiredVars: (keyof AppEnv)[] = ["PORT", "VITE_ENV", "BACKEND_URL"];
  if (envMode === "production") {
    requiredVars.push("SENTRY_TOKEN");
  }
  const missingVars = requiredVars.filter((varName) => !(varName in env));

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables for .env.${envMode} mode: ${missingVars.join(
        ", ",
      )}`,
    );
  }
};

export const normalizePort = (port: string) => {
  const parsedPort = parseInt(port, 10);
  if (isNaN(parsedPort) || parsedPort <= 0) {
    throw new Error(`Invalid PORT value: ${port}`);
  }
  return parsedPort;
};
