import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./",
  build: {
    outDir: "dist",
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      extensions: [".js", ".cjs"]
    }
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
