/// <reference types="vitest" />

import { defineConfig, loadEnv, type ServerOptions } from "vite";
import react from "@vitejs/plugin-react";
import tailwindCssConfig from "@tailwindcss/vite";
import type { TMode } from "./src/shared/models/env-model";
import type { AppEnv } from "./src/shared/models/app-env";
import { validateEnv, normalizePort } from "./src/utils/functions/vite-config";
import path from "path";

export default defineConfig(({ mode }) => {
  const envMode = mode as TMode;
  const env = loadEnv(envMode, process.cwd(), "") as unknown as AppEnv;

  validateEnv(envMode, env);
  const port = normalizePort(env.PORT);

  const config: ServerOptions = {
    port,
    open: true,
    proxy: {
      "/api": {
        target: env.BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => {
          // Remove /api prefix and keep the rest of the path
          const newPath = path.replace(/^\/api/, "");
          return newPath;
        },
      },
    },
  };

  return {
    plugins: [react(), tailwindCssConfig()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@shared": path.resolve(__dirname, "src/shared"),
      },
    },
    server: config,
    preview: config,
    build: {
      minify: true,
      sourcemap: true, // Always generate source maps for Sentry
      rollupOptions: {
        external: [/.*\.(test|spec)\.(js|ts|jsx|tsx)$/],
      },
    },
  };
});
