import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "HauerMusic",
        short_name: "HauerMusic",
        description: "Aplicativo PWA de ranking de músicas",
        theme_color: "#121212",
        background_color: "#121212",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "logo.png",
            sizes: "192x192",
            type: "image/png"
          }
        ]
      }
    })
  ]
});