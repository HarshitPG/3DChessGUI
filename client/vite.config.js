import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure Vite includes assets like fonts in the build output
    assetsInlineLimit: 0, // This prevents the inline assets (like fonts) from being turned into base64 URIs
  },
  server: {
    // Configure the server for handling assets
    fs: {
      allow: ["."],
    },
  },
});
