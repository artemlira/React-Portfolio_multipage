import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), Pages()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined;
          }

          if (id.includes("swiper")) {
            return "swiper-vendor";
          }

          if (id.includes("framer-motion") || id.includes("gsap")) {
            return "animation-vendor";
          }

          return undefined;
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]_[local]__[hash:base64:5]",
    },
  },
});
