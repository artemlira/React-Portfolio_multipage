import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import Pages from "vite-plugin-pages"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), Pages()],
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]_[local]__[hash:base64:5]",
    },
  },
})
