import { defineConfig } from 'vite'
import { join } from 'node:path'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@cj-parser\/(.+)$/,
        replacement: join(__dirname, '$1', 'index.ts'),
      },
    ],
  },
})
