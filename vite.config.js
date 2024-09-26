import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  build: {
    sourcemap: false
    // rollupOptions: {
    //   input: {
    //     main: 'index.html',
    //     // Include the service worker file in the build
    //     serviceWorker: '/public/service-worker.js'
    //   }
    // }
  },
  server: {
    port: 3001,
    // https: true
    host: '0.0.0.0'
  },
  plugins: [
    react(),
    // reactRefresh(),
    svgr({
      include: '**/*.svg?react'
    }),
    VitePWA({
      registerType: 'autoUpdate',
      srcDir: 'src',
      filename: 'sw.js', // Custom name for the VitePWA service worker
      includeAssets: ['favicon.ico', 'robots.txt', '/icons/apple-touch-icon.png'],
      manifest: {
        short_name: 'TaskManager',
        name: 'Task Manager App',
        description: 'app for manage your tasks and projects',
        icons: [
          {
            src: '/icons/logo192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/icons/logo144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/icons/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'favicon.ico',
            sizes: '256x256',
            type: 'image/x-icon'
          },
          {
            src: '/icons/favicon-32x32.ico',
            sizes: '32x32',
            type: 'image/x-icon'
          },
          {
            src: '/icons/favicon-16x16.ico',
            sizes: '16x16',
            type: 'image/x-icon'
          },
          {
            src: '/icons/logo192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: '/icons/logo512.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ],
        screenshots: [
          {
            src: '/icons/task-manager-wide.gif',
            sizes: '664x448',
            type: 'image/gif',
            form_factor: 'wide',
            label: 'Wonder Widgets'
          },
          {
            src: '/icons/task-manager.gif',
            sizes: '440x824',
            type: 'image/gif',
            form_factor: 'narrow',
            label: 'Wonder Widgets'
          }
        ],
        start_url: '/',
        id: '/',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
        lang: 'fa'
      },
      workbox: {
        // Additional Workbox options if needed
      },
      // Listen for updates
      devOptions: {
        enabled: true,
        type: 'module'
      },
      onUpdate: async (registration) => {
        if (registration && registration.waiting) {
          // Notify the user
          console.log('update found');
        }
      }
    })
  ]
  // css: {
  //   postcss: './postcss.config.cjs',
  // },
});
