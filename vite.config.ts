import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  root: "./src",
  build: {
    outDir: '../dist'
  },
  server: {
    https: {
      key: "./ssl/swiggy-privateKey.key",
      cert: "./ssl/swiggy.crt"
    }
  }
})
