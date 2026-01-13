import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/website': {
        target: 'https://api.foodly.pro',
        changeOrigin: true,
      },
      '/firebase-messaging-sw.js': {
        target: 'https://api.foodly.pro',
        changeOrigin: true,
        rewrite: (path) => '/api/website/firebase-messaging-sw.js'
      }
    }
  }
})
