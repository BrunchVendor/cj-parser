/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest-setup.ts',
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'cj-parser-vue',
    },
    minify: false,
    rollupOptions: {
      external: [
        /@cj-parser.*/,
        'vue',
      ],
    },
  },
})
