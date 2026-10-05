import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Occupancy-Detection/' : '/',
  plugins: [react(), tailwindcss()],
}))
