import { defineConfig } from 'vite'
import react from '@vitejs/react-vite' // or whatever your react plugin import looks like

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  base: '/IEEE-Open-Source-Week-2026/', 
})
