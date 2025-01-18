import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { config } from 'dotenv';
import {TanStackRouterVite} from "@tanstack/router-plugin/vite";

config();

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'process.env': process.env
  }
});
