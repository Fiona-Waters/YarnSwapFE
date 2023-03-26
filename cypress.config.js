import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "wn6qi7",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true,
  },
});
