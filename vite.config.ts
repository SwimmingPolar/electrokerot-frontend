import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      '/v1': {
        target: 'http://localhost:5611',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})
