import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/ui',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '_utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '_request': fileURLToPath(new URL('./src/utils/request', import.meta.url)),
      '_constant': fileURLToPath(new URL('./src/utils/constant', import.meta.url)),
      '_api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '_components': fileURLToPath(new URL('./src/components', import.meta.url)),
    }
  },
  server: {
    hmr: true, 
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
})
