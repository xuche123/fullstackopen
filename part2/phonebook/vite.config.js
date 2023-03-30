import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/people': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        rewriteHost: true,
      },
    },
  },
  plugins: [react()],
})
