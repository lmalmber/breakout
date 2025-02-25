import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    base: '/breakout/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
    },
})
