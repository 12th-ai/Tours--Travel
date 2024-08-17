import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginRequire from 'vite-plugin-require';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginRequire.default()
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Adjust according to your backend server's URL
    }
  }
});
