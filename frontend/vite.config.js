// File: frontend/vite.config.js
// Purpose: Vite build tool configuration

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // When deploying, change this to your backend URL
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
