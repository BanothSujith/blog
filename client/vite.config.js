import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  server: {
<<<<<<< HEAD
    host: true,
=======
    host: true, 
    proxy: {
      "/api": {
        target: process.env.VITE_APP_BACKEND_URI, 
        secure: true,
        changeOrigin: true,
      },
    },
>>>>>>> f99cec8fe4790ead98e59cad7025df7163a15d25
  },
  plugins: [react()],
});
