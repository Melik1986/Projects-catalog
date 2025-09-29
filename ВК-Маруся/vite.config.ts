import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
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
    // Безопасно определяем только нужные переменные окружения
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
        // Агрессивное tree-shaking
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      },
      output: {
        manualChunks: (id) => {
          // Простое разделение - меньше чанков, лучше кэширование
          if (id.includes('node_modules')) {
            // Всё в один vendor чанк для лучшего кэширования
            return 'vendor';
          }
          
          // Модули приложения
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
          // Специальные имена для lazy-loaded чанков
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
          // Организуем ассеты по типам
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
      // Внешние зависимости, которые не нужно включать в бандл
      external: (id) => {
        // Внешние CDN зависимости можем добавить сюда при необходимости
        return false;
      },
    },
    chunkSizeWarningLimit: 800, // Снижаем лимит для лучшего контроля
    sourcemap: false,
    reportCompressedSize: false,
    // Включаем CSS code splitting
    cssCodeSplit: true,
  },

  optimizeDeps: {
    include: [
      'prop-types',
      'fast-deep-equal/es6',
      'react-youtube',
      // Принудительно включаем часто используемые пакеты
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'axios'
    ],
    exclude: [
      // Исключаем только dev-зависимости
      '@vite/client', 
      '@react-refresh/runtime'
    ],
  },

  // Настройки для разработки
  server: {
    // Предварительно прогреваем часто используемые модули
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
    // Bundle analyzer - создаёт stats.html для анализа
    visualizer({
      filename: 'dist/stats.html',
      open: false, // Отключаем автооткрытие для CI/CD
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // 'treemap' | 'sunburst' | 'network'
    }) as any,
    VitePWA({
      registerType: 'autoUpdate',
      manifestFilename: 'manifest.webmanifest',
      useCredentials: false,
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,webp}'],
        globIgnores: ['**/sprite.svg', '**/stats.html', '**/*.gz', '**/*.br', 'sw.js', 'workbox-*.js'],
        maximumFileSizeToCacheInBytes: 1.5 * 1024 * 1024, // Снижаем лимит до 1.5MB
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,webp}'],
        globIgnores: ['**/sprite.svg', '**/stats.html', '**/*.gz', '**/*.br', 'sw.js', 'workbox-*.js'],
        maximumFileSizeToCacheInBytes: 1.5 * 1024 * 1024, // Снижаем лимит до 1.5MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cinemaguide\.skillbox\.cc\/.*\.(jpg|jpeg|png|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'movie-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
              },
            },
          },
          {
            urlPattern: /^https:\/\/cinemaguide\.skillbox\.cc\/api\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // 5 минут
              },
            },
          },
          {
            urlPattern: /\/sprite\.svg$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'sprite-cache',
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 год
              },
            },
          },
        ],
      },
      manifest: {
        name: 'ВК Маруся - Кинопортал',
        short_name: 'ВК Маруся',
        description: 'Кинопортал ВК Маруся',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#ff6b6b',
        lang: 'ru',
        scope: '/',
        orientation: 'portrait',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
