import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      // TODO validar este exclude para los test
      // TODO así estaba originalmente: exclude: [...configDefaults.exclude, 'e2e/**'],
      exclude: [...configDefaults.exclude, '__tests__/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
