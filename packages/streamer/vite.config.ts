import { defineConfig, mergeConfig } from 'vite'
import rootConfig from '../../vite.config.js'

export default mergeConfig(
  rootConfig,
  defineConfig({
    build: {
      lib: {
        entry: './index.ts',
        name: 'streamer',
      },
      minify: false,
      rollupOptions: {
        external: [
          // 不把其他模块打包到这个包的产物里
          /@cj-parser.*/,
        ],
      },
    },
  }),
)
