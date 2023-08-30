import { defineConfig } from 'vite'

export default defineConfig({
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
