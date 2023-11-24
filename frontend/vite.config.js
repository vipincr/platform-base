import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // The port the dev server will run on
  },
  build: {
    outDir: 'build', // The directory for production build files
  },
});
