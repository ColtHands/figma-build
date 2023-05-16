import { defineConfig } from 'vitest/config'
import path from 'path'

// const __dirname = path.resolve(new URL(import.meta.url).pathname)

console.log(__dirname)

export default defineConfig({
    test: {
        globals: true,
        // setupFiles: [path.resolve(__dirname, 'tests', 'utils', 'setup.ts')],
    }
})