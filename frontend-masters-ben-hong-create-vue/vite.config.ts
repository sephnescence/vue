import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // BTTODO - Apparently I'm not leveraging this. Not sure if it's better than relative paths
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
