import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'fast-deep-equal': 'fast-deep-equal/es6',
    },
  },

  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },

  build: {
    target: 'es2015',
    minify: 'terser',
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },

  optimizeDeps: {
    include: [
      'prop-types',
      'fast-deep-equal/es6',
      'react-youtube',
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'axios'
    ],
    exclude: [
      '@vite/client', 
      '@react-refresh/runtime'
    ],
  },

  server: {
    warmup: {
      clientFiles: ['./src/main.tsx', './src/app/App.tsx', './src/shared/ui/index.ts'],
    },
  },

  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ],
      },
    }),
    tsconfigPaths(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
      filter: /\.(js|css|html|txt|xml|json)$/,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
      filter: /\.(js|css|html|txt|xml|json)$/,
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }) as any,
  ],
});
