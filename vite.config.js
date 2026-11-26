import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // Handle route fallback in development (good for SPAs)
    open: true, // Automatically open browser when the dev server starts
    port: 3000, // Specify server port (optional)
  },
  build: {
    sourcemap: true, // Generate sourcemaps in production for easier debugging
    chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit (in KB)
    minify: 'terser', // Minify the production build using Terser for better optimization
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split large libraries into separate chunks
          if (id.includes('node_modules')) {
            // For example, all node_modules go into the "vendor" chunk
            return 'vendor';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['some-large-dependency'], // Pre-bundle large dependencies for faster HMR
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'), // Add an alias for components
      '@assets': path.resolve(__dirname, './src/assets'), // Alias for assets
    },
  },
});
