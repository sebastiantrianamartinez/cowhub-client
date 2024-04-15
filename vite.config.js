import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8099,
    proxy: {
      '/api': { // Ruta de prefijo para las solicitudes al backend
        target: 'http://localhost:8021', // URL del servidor Express
        changeOrigin: false, // Indica a Vite que modifique el origen de las solicitudes
        secure: false, // Indica a Vite que acepte conexiones no seguras (opcional)
      },
    },
  },
})
