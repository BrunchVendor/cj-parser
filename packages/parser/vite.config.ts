import { defineConfig } from 'vite'
import { join } from 'node:path'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@cj-parser\/(.+)$/,
        replacement: join(__dirname, '..', '$1', 'index.ts'),
      },
    ],
  },
  build: {
    lib: {
      entry: './index.ts',
      name: 'parser',
    },
    minify: false,
    rollupOptions: {
      external: [ // 不把其他模块打包到这个包的产物里
        /@cj-parser.*/,
      ],
    },
  },
})
