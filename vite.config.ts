import { defineConfig } from 'vite'
import { join } from 'node:path'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@cj-parser\/(.+)$/,
        replacement: join(__dirname, 'packages', '$1', 'index.ts'),
      },
    ],
  },
})
