import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',  // Change to '/subfolder/' if needed
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },  
})
