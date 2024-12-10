import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this is set to 'dist'
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:3001`,
        changeOrigin: true,
      },
      '/auth': {
        target: `http://localhost:3001`,
        changeOrigin: true,
      },
    },
  },
});