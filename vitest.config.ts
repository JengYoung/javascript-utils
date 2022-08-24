/// <reference types="vitest" />

import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx,vue}"],
  },
});
