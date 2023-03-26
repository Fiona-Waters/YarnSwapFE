import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    VitePWA({
      includeAssets: [
        "**/*","**/index-*.js"
      ],
      manifest: {
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "display": "standalone",
        "scope": "/",
        "start_url": "/",
        "name": "Yarn Swap",
        "short_name": "Yarn Swap",
        "description": "Yarn Swap Progressive Web Application",
        "icons": [
          {
            "src": "/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
          },
          {
            "src": "/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false,
        navigateFallbackAllowlist: [/^index.html$/],
        type: 'module',
      },
      injectRegister: 'script',
      workbox: {
        clientsClaim: true,
        globPatterns: ["**/*", "**/index-*.js"],
        maximumFileSizeToCacheInBytes: 5000000
      }
    })
  ],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  }
})
