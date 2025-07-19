import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
   base: '/logistico/',
  // base: '/Logitico_chatbot/',  // Nombre exacto de tu repositorio
  // build: {
  //   outDir: 'dist',
  //   assetsDir: 'assets'
  // }
})