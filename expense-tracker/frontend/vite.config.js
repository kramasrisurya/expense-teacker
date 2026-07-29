// File: frontend/vite.config.js
// Purpose: Vite build tool configuration

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // When deploying, change this to your backend URL
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
