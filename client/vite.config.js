import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, 
    proxy: {
      "/api": {
        target:https:"//blog-backend-hz1n.onrender.com",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
