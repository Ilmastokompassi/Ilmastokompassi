import {
    defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        /* Proxy for development */
        proxy: {
            '/api': {
                /* https://github.com/nodejs/node/issues/40537 */
                target: 'http://127.0.0.1:5000',
                changeOrigin: true,
            }
        }
    }
})