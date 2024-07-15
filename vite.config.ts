import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "/passive-aggressive-card-manager",
  resolve: {
    alias: {
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@core": path.resolve(__dirname, "./src/core"),
    },
  },
});
