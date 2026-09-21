import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          primary: { value: "#3182ce" },
        },
      },
      fonts: {
        heading: { value: "'Roboto', sans-serif" },
        body: { value: "'Roboto', sans-serif" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
