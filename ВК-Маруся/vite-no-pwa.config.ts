import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'fast-deep-equal': 'fast-deep-equal/es6',
    },
  },

  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },

  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production',
        pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log', 'console.info', 'console.debug', 'console.warn'] : [],
        passes: 2,
        unsafe: false,
        unsafe_comps: false,
        unsafe_math: false,
      },
      mangle: {
        toplevel: false,
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      },
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('/modules/')) {
            return 'modules';
          }
          if (id.includes('/pages/')) {
            return 'pages';
          }
          if (id.includes('/shared/')) {
            return 'shared';
          }
        },
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name.includes('LoginForm') || chunkInfo.name.includes('RegisterForm')) {
            return 'assets/js/auth-forms-[hash].js';
          }
          if (chunkInfo.name.includes('TrailerModal')) {
            return 'assets/js/trailer-[hash].js';
          }
          return 'assets/js/[name]-[hash].js';
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (assetInfo.name?.match(/\.(woff|woff2|eot|ttf|otf)$/)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          if (assetInfo.name?.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    chunkSizeWarningLimit: 800,
    sourcemap: false,
    reportCompressedSize: false,
    cssCodeSplit: true,
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
