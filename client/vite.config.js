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
        target: process.env.VITE_APP_BACKEND_URI,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
