import { defineConfig } from 'vitest/config'
// @ts-ignore
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' // Make sure this is imported

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    // UPDATED LINE BELOW: uses path.resolve to find the file correctly
    setupFiles: [resolve(__dirname, './vitest-setup.js')], 
    include: ['src/pages/unit_testing/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})