/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx,vue}"],
  },
});
