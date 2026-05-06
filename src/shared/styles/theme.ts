import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          primary: {
            value: "#6275d3",
          },
          secondary: {
            value: "#ebedf9",
          },
          primaryDark: {
            value: "#16214f",
          },
          white: {
            value: "#ffff",
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
